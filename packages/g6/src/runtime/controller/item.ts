import { AABB, Canvas, DisplayObject, Group } from '@antv/g';
import { GraphChange, ID } from '@antv/graphlib';
import { isArray, isObject, clone } from '@antv/util';
import Combo from '../../item/combo';
import Edge from '../../item/edge';
import Node from '../../item/node';
import registry from '../../stdlib';
import { ComboModel, IGraph } from '../../types';
import { ComboDisplayModel, ComboEncode } from '../../types/combo';
import { GraphCore } from '../../types/data';
import { EdgeDisplayModel, EdgeEncode, EdgeModel, EdgeModelData } from '../../types/edge';
import { ITEM_TYPE, ShapeStyle, SHAPE_TYPE } from '../../types/item';
import { ItemStyleSet, ItemThemeSpecifications, ThemeSpecification } from '../../types/theme';
import { getExtension } from '../../util/extension';
import { upsertTransientItem } from '../../util/item';
import { upsertShape } from '../../util/shape';

/**
 * Manages and stores the node / edge / combo items.
 */
export class ItemController {
  public graph: IGraph;
  public nodeExtensions = [];
  public edgeExtensions = [];
  public comboExtensions = [];

  /**
   * Node / edge / combo items map
   */
  private itemMap: { [id: ID]: Node | Edge | Combo } = {};

  /**
   * node / edge / combo 's mapper in graph config
   */
  private nodeMapper: ((data: NodeModel) => NodeDisplayModel) | NodeEncode;
  private edgeMapper: ((data: EdgeModel) => EdgeDisplayModel) | EdgeEncode;
  private comboMapper: ((data: ComboModel) => ComboDisplayModel) | ComboEncode;

  private nodeStateMapper: {
    [stateName: string]: ((data: NodeModel) => NodeDisplayModel) | NodeEncode;
  };
  private edgeStateMapper: {
    [stateName: string]: ((data: EdgeModel) => EdgeDisplayModel) | EdgeEncode;
  };
  private comboStateMapper: {
    [stateName: string]: ((data: ComboModel) => ComboDisplayModel) | ComboEncode;
  };

  private nodeGroup: Group;
  private edgeGroup: Group;
  private transientNodeGroup: Group;
  private transientEdgeGroup: Group;
  // TODO: combo? not a independent group

  private nodeDataTypeSet: Set<string> = new Set();
  private edgeDataTypeSet: Set<string> = new Set();

  // The G shapes or groups on transient map drawn by this controller
  private transientObjectMap: {
    [id: string]: DisplayObject;
  } = {};
  private transientItemMap: {
    [id: string]: Node | Edge | Combo;
  } = {};

  constructor(graph: IGraph<any, any>) {
    this.graph = graph;
    // get mapper for node / edge / combo
    const { node, edge, combo, nodeState, edgeState, comboState } = graph.getSpecification();
    this.nodeMapper = node;
    this.edgeMapper = edge;
    this.comboMapper = combo;
    this.nodeStateMapper = nodeState;
    this.edgeStateMapper = edgeState;
    this.comboStateMapper = comboState;

    this.tap();
  }

  /**
   * Subscribe the lifecycle of graph.
   */
  private tap() {
    // item extensions are node / edge / combo type registrations
    const extensions = this.getExtensions();
    this.nodeExtensions = extensions.node;
    this.edgeExtensions = extensions.edge;
    this.comboExtensions = extensions.combo;
    this.graph.hooks.render.tap(this.onRender.bind(this));
    this.graph.hooks.itemchange.tap(this.onChange.bind(this));
    this.graph.hooks.itemstatechange.tap(this.onItemStateChange.bind(this));
    this.graph.hooks.itemvisibilitychange.tap(this.onItemVisibilityChange.bind(this));
    this.graph.hooks.transientupdate.tap(this.onTransientUpdate.bind(this));
  }

  /**
   * Get the extensions from useLib, stdLib is a subset of useLib.
   */
  private getExtensions() {
    // TODO: user need to config using node/edge/combo types from useLib to spec?
    const { node, edge, combo } = this.graph.getSpecification();

    const nodeTypes = Object.keys(registry.useLib.nodes);
    const edgeTypes = Object.keys(registry.useLib.edges);
    const comboTypes = Object.keys(registry.useLib.combos);
    return {
      node: nodeTypes
        .map((config) => getExtension(config, registry.useLib, 'node'))
        .filter(Boolean),
      edge: edgeTypes
        .map((config) => getExtension(config, registry.useLib, 'edge'))
        .filter(Boolean),
      combo: comboTypes
        .map((config) => getExtension(config, registry.useLib, 'combo'))
        .filter(Boolean),
    };
  }

  /**
   * Listener of runtime's render hook.
   * @param param contains inner data stored in graphCore structure
   */
  private onRender(param: { graphCore: GraphCore; theme: ThemeSpecification, transientCanvas: Canvas }) {
    const { graphCore, theme = {}, transientCanvas } = param;
    const { graph } = this;
    // TODO: 0. clear groups on canvas, and create new groups
    graph.canvas.removeChildren();
    const edgeGroup = new Group({ id: 'edge-group' });
    const nodeGroup = new Group({ id: 'node-group' });
    graph.canvas.appendChild(edgeGroup);
    graph.canvas.appendChild(nodeGroup);
    this.nodeGroup = nodeGroup;
    this.edgeGroup = edgeGroup;

    // Also create transient groups on transient canvas.
    transientCanvas.removeChildren();
    this.transientEdgeGroup = new Group({ id: 'edge-group' });
    this.transientNodeGroup = new Group({ id: 'node-group' });
    transientCanvas.appendChild(this.transientEdgeGroup);
    transientCanvas.appendChild(this.transientNodeGroup);

    // TODO: 1. create node / edge / combo items, classes from ../../item, and element drawing and updating fns from node/edge/comboExtensions
    const nodeModels = graphCore.getAllNodes();
    const edgeModels = graphCore.getAllEdges();
    // const combos = graphCore.getAllCombos();

    this.renderNodes(nodeModels, theme.node);
    this.renderEdges(edgeModels, theme.edge);
    // TODO: combo
  }

  /**
   * Listener of runtime's itemchange lifecycle hook.
   * @param param
   */
  private onChange(param: {
    type: ITEM_TYPE;
    changes: GraphChange<NodeModelData, EdgeModelData>[];
    graphCore: GraphCore;
    theme: ThemeSpecification;
  }) {
    const { changes, graphCore, theme = {} } = param;
    const groupedChanges = {
      NodeRemoved: [],
      EdgeRemoved: [],
      NodeAdded: [],
      EdgeAdded: [],
      NodeDataUpdated: [],
      EdgeUpdated: [],
      EdgeDataUpdated: [],
    };
    changes.forEach((change) => {
      const { type: changeType } = change;
      groupedChanges[changeType].push(change);
    });
    const { itemMap } = this;
    // change items according to the order of the keys in groupedChanges

    // === 1. remove edges; 2. remove nodes ===
    groupedChanges.EdgeRemoved.concat(groupedChanges.NodeRemoved).forEach(({ value }) => {
      const { id } = value;
      const item = itemMap[id];
      if (item) {
        item.destroy();
        delete itemMap[id];
      }
    });

    const { node: nodeTheme = {}, edge: edgeTheme = {} } = theme;

    // === 3. add nodes ===
    if (groupedChanges.NodeAdded.length) {
      this.renderNodes(
        groupedChanges.NodeAdded.map((change) => change.value),
        nodeTheme,
      );
    }
    // === 4. add edges ===
    if (groupedChanges.EdgeAdded.length) {
      this.renderEdges(
        groupedChanges.EdgeAdded.map((change) => change.value),
        edgeTheme,
      );
    }

    // === 5. update nodes's data ===
    // merge changes for each node
    if (groupedChanges.NodeDataUpdated.length) {
      const nodeUpdate = {};
      groupedChanges.NodeDataUpdated.forEach((change) => {
        const { id, propertyName, newValue, oldValue } = change;
        nodeUpdate[id] = nodeUpdate[id] || { previous: {}, current: {} };
        if (!propertyName) {
          nodeUpdate[id] = {
            isReplace: true, // whether replace the whole data
            previous: oldValue,
            current: newValue,
          };
        } else {
          nodeUpdate[id].previous[propertyName] = oldValue;
          nodeUpdate[id].current[propertyName] = newValue;
        }
      });
      const { dataTypeField: nodeDataTypeField } = nodeTheme;
      const edgeToUpdate = {};
      Object.keys(nodeUpdate).forEach((id) => {
        const { isReplace, previous, current } = nodeUpdate[id];
        // update the theme if the dataType value is changed
        let themeStyles;
        if (previous[nodeDataTypeField] !== current[nodeDataTypeField]) {
          themeStyles = getThemeStyles(
            this.nodeDataTypeSet,
            nodeDataTypeField,
            current[nodeDataTypeField],
            nodeTheme,
          );
        }
        const item = itemMap[id];
        const innerModel = graphCore.getNode(id);
        item.update(innerModel, { previous, current }, isReplace, themeStyles);
        const relatedEdgeInnerModels = graphCore.getRelatedEdges(id);
        relatedEdgeInnerModels.forEach((edge) => (edgeToUpdate[edge.id] = edge));
      });
      Object.keys(edgeToUpdate).forEach((id) => {
        const item = itemMap[id] as Edge;
        item.forceUpdate();
      });
    }

    // === 6. update edges' data ===
    if (groupedChanges.EdgeDataUpdated.length) {
      const edgeUpdate = {};
      groupedChanges.EdgeDataUpdated.forEach((change) => {
        const { id, propertyName, newValue, oldValue } = change;
        edgeUpdate[id] = edgeUpdate[id] || { previous: {}, current: {} };
        if (!propertyName) {
          edgeUpdate[id] = {
            isReplace: true, // whether replace the whole data
            previous: oldValue,
            current: newValue,
          };
        } else {
          edgeUpdate[id].previous[propertyName] = oldValue;
          edgeUpdate[id].current[propertyName] = newValue;
        }
      });

      const { dataTypeField: edgeDataTypeField } = edgeTheme;
      Object.keys(edgeUpdate).forEach((id) => {
        const { isReplace, current, previous } = edgeUpdate[id];
        // update the theme if the dataType value is changed
        let themeStyles;
        if (previous[edgeDataTypeField] !== current[edgeDataTypeField]) {
          themeStyles = getThemeStyles(
            this.edgeDataTypeSet,
            edgeDataTypeField,
            current[edgeDataTypeField],
            edgeTheme,
          );
        }
        const item = itemMap[id];
        const innerModel = graphCore.getEdge(id);
        item.update(innerModel, { current, previous }, isReplace, themeStyles);
      });
    }

    // === 7. update edges' source target ===
    if (groupedChanges.EdgeUpdated.length) {
      const edgeUpdate = {};
      groupedChanges.EdgeUpdated.forEach((change) => {
        // propertyName is 'source' or 'target'
        const { id, propertyName, newValue } = change;
        edgeUpdate[id] = edgeUpdate[id] || {};
        edgeUpdate[id][propertyName] = newValue;
      });

      Object.keys(edgeUpdate).forEach((id) => {
        const { source, target } = edgeUpdate[id];
        const item = itemMap[id] as Edge;
        if (source !== undefined) item.updateEnd('source', this.itemMap[source] as Node);
        if (target !== undefined) item.updateEnd('target', this.itemMap[target] as Node);
      });
    }
  }

  /**
   * The listener for item state changing.
   * @param param
   * {
   *   ids: ids of the items to be set state
   *   states: state names to set
   *   value: state value
   * }
   */
  private onItemStateChange(param: { ids: ID[]; states: string[]; value: boolean }) {
    const { ids, states, value } = param;
    ids.forEach((id) => {
      const item = this.itemMap[id];
      if (!item) {
        console.warn(`Fail to set state for item ${id}, which is not exist.`);
        return;
      }
      if (!states || !value) {
        // clear all the states
        item.clearStates(states);
      } else {
        states.forEach((state) => item.setState(state, value));
      }
    });
  }

  private onItemVisibilityChange(param: { ids: ID[], value: boolean }) {
    const { ids, value } = param;
    ids.forEach(id => {
      const item = this.itemMap[id];
      if (!item) {
        console.warn(`Fail to set visibility for item ${id}, which is not exist.`);
        return;
      }
      if (value) {
        item.show();
      } else {
        item.hide();
      }
    });
  }

  private onTransientUpdate(param: {
    type: ITEM_TYPE | SHAPE_TYPE;
    id: ID;
    config: {
      style?: ShapeStyle;
      // Data to be merged into the transient item.
      data?: Record<string, any>,
      action: 'remove' | 'add' | 'update' | undefined;
      [shapeConfig: string]: unknown;
    };
    canvas: Canvas;
  }) {
    const { transientObjectMap } = this;
    const { type, id, config = {}, canvas } = param;
    const { style = {}, data = {}, capture, action } = config as any;
    const isItemType = type === 'node' || type === 'edge' || type === 'combo';

    // Removing
    if (action === 'remove') {
      if (isItemType) {
        const transientItem = this.transientItemMap[id];
        if (transientItem && !transientItem.destroyed) {
          transientItem.destroy();
        };
        delete this.transientItemMap[id];
        return;
      } else {
        const preObj = transientObjectMap[id];
        if (preObj && !preObj.destroyed) {
          // @ts-ignore
          preObj.remove(true);
        }
        delete transientObjectMap[id];
        return;
      }
    }

    // Adding / Updating
    if (isItemType) {
      const item = this.itemMap[id];
      if (!item) {
        console.warn(`Fail to draw transient item of ${id}, which is not exist.`);
        return;
      };
      const transientItem = upsertTransientItem(
        item,
        this.transientNodeGroup,
        this.transientEdgeGroup,
        this.transientItemMap
      );
      transientItem.update({
        ...transientItem.model,
        data: {
          ...transientItem.model.data,
          ...data,
        },
      });
      return;
    } else {
      const shape = upsertShape(type, String(id), style, transientObjectMap);
      shape.style.pointerEvents = capture ? 'auto' : 'none';
      canvas.getRoot().appendChild(shape);
    }

  }
  public getTransient(id: string) {
    return this.transientObjectMap[id];
  }

  /**
   * Create nodes with inner data to canvas.
   * @param models nodes' inner datas
   */
  private renderNodes(models: NodeModel[], nodeTheme: ItemThemeSpecifications = {}) {
    const { nodeExtensions, nodeGroup, nodeDataTypeSet } = this;
    const { dataTypeField } = nodeTheme;
    models.forEach((node) => {
      // get the base styles from theme
      let dataType;
      if (dataTypeField) dataType = node.data[dataTypeField] as string;
      const themeStyle = getThemeStyles(nodeDataTypeSet, dataTypeField, dataType, nodeTheme);

      this.itemMap[node.id] = new Node({
        model: node,
        renderExtensions: nodeExtensions,
        containerGroup: nodeGroup,
        mapper: this.nodeMapper,
        stateMapper: this.nodeStateMapper,
        themeStyles: themeStyle,
      });
    });
  }

  /**
   * Create edges with inner data to canvas.
   * @param models edges' inner datas
   */
  private renderEdges(models: EdgeModel[], edgeTheme: ItemThemeSpecifications = {}) {
    const { edgeExtensions, edgeGroup, itemMap, edgeDataTypeSet } = this;
    const { dataTypeField } = edgeTheme;
    models.forEach((edge) => {
      const { source, target, id } = edge;
      const sourceItem = itemMap[source] as Node;
      const targetItem = itemMap[target] as Node;
      if (!sourceItem) {
        console.warn(
          `The source node ${source} is not exist in the graph for edge ${id}, please add the node first`,
        );
      }
      if (!targetItem) {
        console.warn(
          `The source node ${source} is not exist in the graph for edge ${id}, please add the node first`,
        );
      }
      // get the base styles from theme
      let dataType;
      if (dataTypeField) dataType = edge.data[dataTypeField] as string;
      const themeStyle = getThemeStyles(edgeDataTypeSet, dataTypeField, dataType, edgeTheme);

      itemMap[id] = new Edge({
        model: edge,
        renderExtensions: edgeExtensions,
        containerGroup: edgeGroup,
        mapper: this.edgeMapper,
        stateMapper: this.edgeStateMapper,
        sourceItem,
        targetItem,
        themeStyles: themeStyle,
      });
    });
  }

  /**
   * Get the id of the item which have the state with true value
   * @param itemType item's type
   * @param state state name
   * @param value state value, true by default
   * @returns
   */
  public findIdByState(itemType: ITEM_TYPE, state: string, value: string | boolean = true): ID[] {
    const ids: ID[] = [];
    Object.values(this.itemMap).forEach((item) => {
      if (item.getType() !== itemType) return;
      if (item.hasState(state) === value) ids.push(item.getID());
    });
    return ids;
  }

  /**
   * Get the state value for the item with id
   * @param id item' id
   * @param state state name
   * @returns {boolean | string} the state value
   */
  public getItemState(id: ID, state: string) {
    const item = this.itemMap[id];
    if (!item) {
      console.warn(`Fail to get item state, the item with id ${id} does not exist.`);
      return false;
    }
    return item.hasState(state);
  }

  public getItemById(id: ID) {
    return this.itemMap[id];
  }

  public getItemBBox(id: ID, isKeyShape: boolean = false): AABB | false {
    const item = this.itemMap[id];
    if (!item) {
      console.warn(`Fail to get item bbox, the item with id ${id} does not exist.`);
      return false;
    }
    return isKeyShape ? item.getKeyBBox() : item.getBBox();
  }

  public getItemVisible(id: ID) {
    const item = this.itemMap[id];
    if (!item) {
      console.warn(`Fail to get item visible, the item with id ${id} does not exist.`);
      return false;
    }
    return item.isVisible();
  }
}

const getThemeStyles = (
  dataTypeSet: Set<string>,
  dataTypeField: string,
  dataType: string,
  itemTheme: ItemThemeSpecifications,
): ItemStyleSet => {
  const { styles: themeStyles } = itemTheme;
  if (!dataTypeField) {
    // dataType field is not assigned
    return isArray(themeStyles) ? themeStyles[0] : Object.values(themeStyles)[0];
  }
  dataTypeSet.add(dataType as string);
  let themeStyle;
  if (isArray(themeStyles)) {
    const themeStylesLength = themeStyles.length;
    let idx = Array.from(dataTypeSet).indexOf(dataType);
    themeStyle = themeStyles[idx % themeStylesLength];
  } else if (isObject(themeStyles)) {
    themeStyle = themeStyles[dataType] || themeStyles.others;
  }
  return themeStyle;
};

