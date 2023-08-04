import { AABB, Canvas, DisplayObject, Group } from '@antv/g';
import { GraphChange, GraphView, ID } from '@antv/graphlib';
import {
  debounce,
  isArray,
  isObject,
  throttle,
  uniq,
  uniqueId,
} from '@antv/util';
import { DirectionalLight, AmbientLight } from '@antv/g-plugin-3d';
import registry from '../../stdlib';
import {
  ComboModel,
  IGraph,
  NodeModel,
  NodeDisplayModel,
  NodeEncode,
  NodeModelData,
} from '../../types';
import { ComboDisplayModel, ComboEncode } from '../../types/combo';
import { GraphCore } from '../../types/data';
import {
  EdgeDisplayModel,
  EdgeEncode,
  EdgeModel,
  EdgeModelData,
} from '../../types/edge';
import Node from '../../item/node';
import Edge from '../../item/edge';
import Combo from '../../item/combo';
import { getCombinedBoundsByData, upsertShape } from '../../util/shape';
import { getExtension } from '../../util/extension';
import { upsertTransientItem } from '../../util/item';
import {
  ITEM_TYPE,
  ShapeStyle,
  SHAPE_TYPE,
  LodStrategyObj,
} from '../../types/item';
import {
  ThemeSpecification,
  NodeThemeSpecifications,
  EdgeThemeSpecifications,
  NodeStyleSet,
  EdgeStyleSet,
  ComboThemeSpecifications,
  ComboStyleSet,
} from '../../types/theme';
import { ViewportChangeHookParams } from '../../types/hook';
import { formatLodStrategy } from '../../util/zoom';
import {
  deconstructData,
  graphComboTreeDfs,
  graphCoreTreeDfs,
  traverseAncestors,
  traverseAncestorsAndSucceeds,
  traverseGraphAncestors,
} from '../../util/data';

/**
 * Manages and stores the node / edge / combo items.
 */
export class ItemController {
  public graph: IGraph;
  public nodeExtensions = [];
  public edgeExtensions = [];
  public comboExtensions = [];

  public zoom: number;

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
    [stateName: string]:
      | ((data: ComboModel) => ComboDisplayModel)
      | ComboEncode;
  };

  // if the graph has combos, nodeGroup/edgeGroup/comboGroup point to the same group, so as transient groups.
  private nodeGroup: Group;
  private edgeGroup: Group;
  private comboGroup: Group;
  private transientNodeGroup: Group;
  private transientEdgeGroup: Group;
  private transientComboGroup: Group;

  private nodeDataTypeSet: Set<string> = new Set();
  private edgeDataTypeSet: Set<string> = new Set();
  private comboDataTypeSet: Set<string> = new Set();

  // The G shapes or groups on transient map drawn by this controller
  private transientObjectMap: {
    [id: string]: DisplayObject;
  } = {};
  private transientItemMap: {
    [id: string]: Node | Edge | Combo | Group;
  } = {};

  // private comboTreeView: GraphView<any, any>;

  constructor(graph: IGraph<any, any>) {
    this.graph = graph;
    // get mapper for node / edge / combo
    const { node, edge, combo, nodeState, edgeState, comboState } =
      graph.getSpecification();
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
    this.graph.hooks.itemvisibilitychange.tap(
      this.onItemVisibilityChange.bind(this),
    );
    this.graph.hooks.itemzindexchange.tap(this.onItemZIndexChange.bind(this));
    this.graph.hooks.transientupdate.tap(this.onTransientUpdate.bind(this));
    this.graph.hooks.viewportchange.tap(this.onViewportChange.bind(this));
    this.graph.hooks.themechange.tap(this.onThemeChange.bind(this));
    this.graph.hooks.destroy.tap(this.onDestroy.bind(this));
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
  private onRender(param: {
    graphCore: GraphCore;
    theme: ThemeSpecification;
    transientCanvas: Canvas;
  }) {
    const { graphCore, theme = {}, transientCanvas } = param;
    const { graph } = this;

    // 0. clear groups on canvas, and create new groups
    graph.canvas.removeChildren();
    const comboGroup = new Group({ id: 'combo-group' });
    const edgeGroup = new Group({ id: 'edge-group' });
    const nodeGroup = new Group({ id: 'node-group' });
    graph.canvas.appendChild(comboGroup);
    graph.canvas.appendChild(edgeGroup);
    graph.canvas.appendChild(nodeGroup);
    this.nodeGroup = nodeGroup;
    this.edgeGroup = edgeGroup;
    this.comboGroup = comboGroup;

    // Also create transient groups on transient canvas.
    transientCanvas.removeChildren();
    this.transientComboGroup = new Group({ id: 'combo-group' });
    this.transientEdgeGroup = new Group({ id: 'edge-group' });
    this.transientNodeGroup = new Group({ id: 'node-group' });
    transientCanvas.appendChild(this.transientComboGroup);
    transientCanvas.appendChild(this.transientEdgeGroup);
    transientCanvas.appendChild(this.transientNodeGroup);

    // 1. create lights for webgl 3d rendering
    if (graph.rendererType === 'webgl-3d') {
      const ambientLight = new AmbientLight({
        style: {
          fill: 'white',
          intensity: Math.PI * 2,
        },
      });
      const light = new DirectionalLight({
        style: {
          fill: 'white',
          direction: [-1, 0, 1],
          intensity: Math.PI * 0.7,
        },
      });
      graph.canvas.appendChild(ambientLight);
      graph.canvas.appendChild(light);
      const { width, height } = graph.canvas.getConfig();
      graph.canvas.getCamera().setPerspective(0.1, 50000, 45, width / height);
    }

    // 2. create node / edge / combo items, classes from ../../item, and element drawing and updating fns from node/edge/comboExtensions
    const { nodes, edges, combos } = deconstructData({
      nodes: graphCore.getAllNodes(),
      edges: graphCore.getAllEdges(),
    });

    this.renderNodes(nodes, theme.node);
    this.renderCombos(combos, theme.combo, graphCore);
    this.renderEdges(edges, theme.edge);
    this.sortByComboTree(graphCore);
    if (graphCore.hasTreeStructure('combo')) {
      graphCoreTreeDfs(
        graphCore,
        graphCore.getRoots('combo'),
        (child) => {
          if (child.data.collapsed) this.collapseCombo(graphCore, child);
        },
        'BT',
      );
    }
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
    upsertAncestors?: boolean;
    action?: 'updatePosition';
  }) {
    const {
      changes,
      graphCore,
      action,
      upsertAncestors = true,
      theme = {},
    } = param;
    const groupedChanges = {
      NodeRemoved: [],
      EdgeRemoved: [],
      NodeAdded: [],
      EdgeAdded: [],
      NodeDataUpdated: [],
      EdgeUpdated: [],
      EdgeDataUpdated: [],
      TreeStructureChanged: [],
    };
    changes.forEach((change) => {
      const { type: changeType } = change;
      groupedChanges[changeType].push(change);
    });
    const { itemMap } = this;
    // change items according to the order of the keys in groupedChanges

    // === 1. remove edges; 2. remove nodes ===
    groupedChanges.EdgeRemoved.concat(groupedChanges.NodeRemoved).forEach(
      ({ value }) => {
        const { id } = value;
        const item = itemMap[id];
        if (item) {
          item.destroy();
          delete itemMap[id];
        }
      },
    );

    const {
      node: nodeTheme = {},
      edge: edgeTheme = {},
      combo: comboTheme = {},
    } = theme;

    // === 3. add nodes ===
    if (groupedChanges.NodeAdded.length) {
      const newNodes = [];
      const newCombos = [];
      groupedChanges.NodeAdded.map((change) => change.value).forEach(
        (model) => {
          if (model.data._isCombo) newCombos.push(model);
          else newNodes.push(model);
        },
      );
      if (newNodes.length) {
        this.renderNodes(newNodes, nodeTheme);
      }
      if (newCombos.length) {
        this.renderCombos(newCombos, comboTheme, graphCore);
      }
    }
    // === 4. add edges ===
    if (groupedChanges.EdgeAdded.length) {
      this.renderEdges(
        groupedChanges.EdgeAdded.map((change) => change.value),
        edgeTheme,
      );
    }

    // === 5. update nodes's data ===
    // merge changes for each node or combo
    if (groupedChanges.NodeDataUpdated.length) {
      const nodeComboUpdate = {};
      groupedChanges.NodeDataUpdated.forEach((change) => {
        const { id, propertyName, newValue, oldValue } = change;
        nodeComboUpdate[id] = nodeComboUpdate[id] || {
          previous: {},
          current: {},
        };
        if (!propertyName) {
          nodeComboUpdate[id] = {
            isReplace: true, // whether replace the whole data
            previous: oldValue,
            current: newValue,
          };
        } else {
          nodeComboUpdate[id].previous[propertyName] = oldValue;
          nodeComboUpdate[id].current[propertyName] = newValue;
        }
      });
      const { dataTypeField: nodeDataTypeField } = nodeTheme;
      const edgeToUpdate = {};
      const comboToUpdate = {};
      const updateRelates = throttle(
        (edgeMap) => {
          Object.keys(comboToUpdate)
            .concat(Object.keys(edgeMap || edgeToUpdate))
            .forEach((id) => {
              const item = itemMap[id] as Edge | Combo;
              if (item && !item.destroyed) item.forceUpdate();
            });
        },
        16,
        {
          leading: true,
          trailing: true,
        },
      );
      Object.keys(nodeComboUpdate).forEach((id) => {
        if (!graphCore.hasNode(id)) return;
        const { isReplace, previous, current } = nodeComboUpdate[id];
        const onlyMove = action === 'updatePosition';
        const item = itemMap[id] as Node | Combo;
        const type = item.getType();
        if (onlyMove && type === 'node' && isNaN(current.x) && isNaN(current.y))
          return;
        // update the theme if the dataType value is changed
        let itemTheme;
        if (
          nodeDataTypeField &&
          previous[nodeDataTypeField] !== current[nodeDataTypeField]
        ) {
          itemTheme = getItemTheme(
            this.nodeDataTypeSet,
            nodeDataTypeField,
            current[nodeDataTypeField],
            nodeTheme,
          );
        }
        const innerModel = graphCore.getNode(id);
        const relatedEdgeInnerModels = graphCore.getRelatedEdges(id);
        const nodeRelatedToUpdate = {};
        relatedEdgeInnerModels.forEach((edge) => {
          edgeToUpdate[edge.id] = edge;
          nodeRelatedToUpdate[edge.id] = edge;
        });

        const previousParentId = item.displayModel.data.parentId;

        item.onframe = () => {
          updateRelates(nodeRelatedToUpdate);
        };
        item.update(
          innerModel,
          { previous, current },
          isReplace,
          itemTheme,
          onlyMove,
          // call after updating finished
          () => {
            item.onframe();
            item.onframe = undefined;
          },
        );

        if (graphCore.hasTreeStructure('combo')) {
          if (type === 'combo' && current.collapsed !== previous.collapsed) {
            if (current.collapsed) {
              this.collapseCombo(graphCore, innerModel as ComboModel);
            } else if (current.collapsed === false) {
              this.expandCombo(graphCore, innerModel as ComboModel);
            }
          }

          // update the current parent combo tree
          // if the node has previous parent, related previous parent combo should be updated to
          if (upsertAncestors) {
            const begins = [innerModel];
            if (
              previousParentId &&
              previousParentId !== current.parentId &&
              graphCore.hasNode(previousParentId as ID)
            ) {
              begins.push(graphCore.getNode(previousParentId as ID));
            }
            // ancestors and suceeds combos should be updated
            traverseAncestorsAndSucceeds(
              this.graph,
              graphCore,
              begins,
              (treeItem) => {
                if (treeItem.data._isCombo && treeItem.id !== innerModel.id)
                  comboToUpdate[treeItem.id] = treeItem;
                const relatedEdges = graphCore.getRelatedEdges(treeItem.id);
                relatedEdges.forEach((edge) => {
                  edgeToUpdate[edge.id] = edge;
                  nodeRelatedToUpdate[edge.id] = edge;
                });
              },
            );
          } else if (type === 'combo') {
            // only the succeed combos should be updated
            graphComboTreeDfs(this.graph, [innerModel], (child) => {
              const relatedEdges = graphCore.getRelatedEdges(child.id);
              relatedEdges.forEach((edge) => {
                edgeToUpdate[edge.id] = edge;
                nodeRelatedToUpdate[edge.id] = edge;
              });
              if (child.data._isCombo && child.id !== innerModel.id)
                comboToUpdate[child.id] = child;
            });
          }
        }
        const parentItem = this.itemMap[current.parentId];
        if (current.parentId && parentItem?.model.data.collapsed) {
          this.graph.hideItem(innerModel.id);
        }
      });
      updateRelates();
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
        let itemTheme;
        if (previous[edgeDataTypeField] !== current[edgeDataTypeField]) {
          itemTheme = getItemTheme(
            this.edgeDataTypeSet,
            edgeDataTypeField,
            current[edgeDataTypeField],
            edgeTheme,
          );
        }
        const item = itemMap[id];
        const innerModel = graphCore.getEdge(id);
        item.update(innerModel, { current, previous }, isReplace, itemTheme);
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
        if (source !== undefined)
          item.updateEnd('source', this.itemMap[source] as Node);
        if (target !== undefined)
          item.updateEnd('target', this.itemMap[target] as Node);
      });
    }

    // === 8. combo tree structure change, resort the shapes ===
    if (groupedChanges.TreeStructureChanged.length) {
      this.sortByComboTree(graphCore);
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
  private onItemStateChange(param: {
    ids: ID[];
    states: string[];
    value: boolean;
  }) {
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

  private onItemVisibilityChange(param: {
    ids: ID[];
    value: boolean;
    graphCore: GraphCore;
    animate?: boolean;
  }) {
    const { ids, value, graphCore, animate = true } = param;
    ids.forEach((id) => {
      const item = this.itemMap[id];
      if (!item) {
        console.warn(
          `Fail to set visibility for item ${id}, which is not exist.`,
        );
        return;
      }
      const type = item.getType();
      if (value) {
        if (type === 'edge') {
          item.show(animate);
        } else {
          let anccestorCollapsed = false;
          traverseAncestors(graphCore, [item.model], (model) => {
            if (model.data.collapsed) anccestorCollapsed = true;
            return anccestorCollapsed;
          });
          if (anccestorCollapsed) return;
          const relatedEdges = graphCore.getRelatedEdges(id);

          item.show(animate);
          relatedEdges.forEach(({ id: edgeId, source, target }) => {
            if (this.getItemVisible(source) && this.getItemVisible(target))
              this.itemMap[edgeId]?.show();
          });
        }
      } else {
        item.hide(animate);
        if (type !== 'edge') {
          const relatedEdges = graphCore.getRelatedEdges(id);
          relatedEdges.forEach(({ id: edgeId }) => {
            this.itemMap[edgeId]?.hide();
          });
        }
      }
    });
  }

  private onItemZIndexChange(params: {
    ids: ID[];
    action: 'front' | 'back';
    graphCore: GraphCore;
  }) {
    const { ids = [], action, graphCore } = params;
    ids.forEach((id) => {
      const item = this.itemMap[id];
      if (!item) return;
      if (action === 'front') {
        if (graphCore.hasTreeStructure('combo')) {
          graphComboTreeDfs(
            this.graph,
            [item.model],
            (model) => {
              if (model.data._isCombo) {
                const subCombo = this.itemMap[model.id];
                subCombo && subCombo.toFront();
              }
            },
            'TB',
          );
        } else {
          item.toFront();
        }
      } else {
        item.toBack();
        if (graphCore.hasTreeStructure('combo')) {
          traverseGraphAncestors(this.graph, [item.model], (model) => {
            this.itemMap[model.id]?.toBack();
          });
        }
      }
    });
  }

  private onViewportChange = debounce(
    ({ transform, effectTiming }: ViewportChangeHookParams) => {
      const { zoom } = transform;
      if (zoom) {
        const zoomRatio = this.graph.getZoom();
        Object.values(this.itemMap).forEach((item) =>
          item.updateZoom(zoomRatio),
        );
        this.zoom = zoomRatio;
      }
    },
    500,
    false,
  );

  private onThemeChange = ({ theme }) => {
    if (!theme) return;
    const { nodeDataTypeSet, edgeDataTypeSet } = this;
    const { node: nodeTheme, edge: edgeTheme } = theme;
    Object.values(this.itemMap).forEach((item) => {
      const itemTye = item.getType();
      const usingTheme = itemTye === 'node' ? nodeTheme : edgeTheme;
      const usingTypeSet =
        itemTye === 'node' ? nodeDataTypeSet : edgeDataTypeSet;
      const { dataTypeField } = usingTheme;
      let dataType;
      if (dataTypeField) dataType = item.model.data[dataTypeField] as string;
      const itemTheme = getItemTheme(
        usingTypeSet,
        dataTypeField,
        dataType,
        usingTheme,
      );
      item.update(
        item.model,
        undefined,
        false,
        itemTheme as {
          styles: NodeStyleSet;
          lodStrategy: LodStrategyObj;
        },
      );
    });
  };

  private onDestroy = () => {
    Object.values(this.itemMap).forEach((item) => item.destroy());
  };

  private onTransientUpdate(param: {
    type: ITEM_TYPE | SHAPE_TYPE;
    id: ID;
    config: {
      style?: ShapeStyle;
      // Data to be merged into the transient item.
      data?: Record<string, any>;
      action: 'remove' | 'add' | 'update' | undefined;
      onlyDrawKeyShape?: boolean;
      upsertAncestors?: boolean;
      [shapeConfig: string]: unknown;
    };
    canvas: Canvas;
    graphCore: GraphCore;
  }) {
    const { transientObjectMap } = this;
    const { type, id, config = {}, canvas, graphCore } = param;
    const {
      style = {},
      data = {},
      capture,
      action,
      onlyDrawKeyShape,
      upsertAncestors,
    } = config as any;
    const isItemType = type === 'node' || type === 'edge' || type === 'combo';

    // Removing
    if (action === 'remove') {
      if (isItemType) {
        const transientItem = this.transientItemMap[id];
        if (type === 'combo') {
          // remove children from bottom to top
          graphCoreTreeDfs(
            graphCore,
            [graphCore.getNode(id)],
            (child) => {
              const transientChild = this.transientItemMap[child.id];
              if (transientChild && !transientChild.destroyed) {
                transientChild.destroy();
              }
              delete this.transientItemMap[child.id];
            },
            'BT',
          );
        }
        if (transientItem && !transientItem.destroyed) {
          transientItem.destroy();
        }
        delete this.transientItemMap[id];
        return;
      } else {
        const preObj = transientObjectMap[id];
        if (preObj && !preObj.destroyed) preObj.destroy();
        delete transientObjectMap[id];
        return;
      }
    }

    // Adding / Updating
    if (isItemType) {
      const item = this.itemMap[id];
      if (!item) {
        console.warn(
          `Fail to draw transient item of ${id}, which is not exist.`,
        );
        return;
      }
      const transientItem = upsertTransientItem(
        item,
        this.transientNodeGroup,
        this.transientEdgeGroup,
        this.transientComboGroup,
        this.transientItemMap,
        this.itemMap,
        graphCore,
        onlyDrawKeyShape,
        upsertAncestors,
      );
      if (onlyDrawKeyShape) {
        // only update node positions to cloned node container(group)
        if (
          (type === 'node' || type === 'combo') &&
          data.hasOwnProperty('x') &&
          data.hasOwnProperty('y')
        ) {
          const { x, y } = data;
          (transientItem as Group).setPosition([x, y]);
        }
        // TODO: edge onlyDrawKeyShape?
      } else {
        const transItem = transientItem as Node | Edge | Combo;
        const positionChanged =
          data.hasOwnProperty('x') && data.hasOwnProperty('y');
        if (type === 'combo' && positionChanged) {
          const { x, y } = data;
          const { x: ox = x, y: oy = y } = transItem.displayModel.data;
          const dx = x - ox;
          const dy = y - oy;
          // move combo = move children nodes from bottom to top
          graphCoreTreeDfs(
            graphCore,
            [transItem.model],
            (node) => {
              const transChild = this.transientItemMap[node.id] as Node;
              if (!transChild) return;
              const { x: childX, y: childY } = transChild.model
                .data as NodeModelData;

              transChild?.update({
                ...transChild.model,
                data: {
                  ...transChild.model.data,
                  x: childX + dx,
                  y: childY + dy,
                },
              });
            },
            'BT',
          );
        }

        if (type !== 'edge' && positionChanged) {
          // force update ancestor combos in the sametime
          let currentAncestor = graphCore.getParent(
            transItem.model.id,
            'combo',
          );
          while (currentAncestor) {
            const ancestorItem = this.transientItemMap[currentAncestor.id];
            if (ancestorItem) (ancestorItem as Combo).forceUpdate();
            currentAncestor = graphCore.getParent(currentAncestor.id, 'combo');
          }
        }

        // Update the target combo's posiiton and other props
        transItem.update({
          ...transItem.model,
          data: {
            ...transItem.model.data,
            ...data,
          },
        });
      }
      return;
    }

    const shape = upsertShape(type, String(id), style, transientObjectMap);
    shape.style.pointerEvents = capture ? 'auto' : 'none';
    canvas.getRoot().appendChild(shape);
  }
  public getTransient(id: string) {
    return this.transientObjectMap[id];
  }

  /**
   * Create nodes with inner data to canvas.
   * @param models nodes' inner datas
   */
  private renderNodes(
    models: NodeModel[],
    nodeTheme: NodeThemeSpecifications = {},
  ) {
    const { nodeExtensions, nodeGroup, nodeDataTypeSet, graph } = this;
    const { dataTypeField } = nodeTheme;
    const zoom = graph.getZoom();
    models.forEach((node) => {
      // get the base styles from theme
      let dataType;
      if (dataTypeField) dataType = node.data[dataTypeField] as string;
      const itemTheme = getItemTheme(
        nodeDataTypeSet,
        dataTypeField,
        dataType,
        nodeTheme,
      );

      this.itemMap[node.id] = new Node({
        model: node,
        renderExtensions: nodeExtensions,
        containerGroup: nodeGroup,
        mapper: this.nodeMapper,
        stateMapper: this.nodeStateMapper,
        zoom,
        theme: itemTheme as {
          styles: NodeStyleSet;
          lodStrategy: LodStrategyObj;
        },
        device:
          graph.rendererType === 'webgl-3d'
            ? // TODO: G type
              (graph.canvas.context as any).deviceRendererPlugin.getDevice()
            : undefined,
      });
    });
  }

  private renderCombos(
    models: ComboModel[],
    comboTheme: ComboThemeSpecifications = {},
    graphCore: GraphCore,
  ) {
    const { comboExtensions, comboGroup, comboDataTypeSet, graph, itemMap } =
      this;
    const { dataTypeField } = comboTheme;
    const zoom = graph.getZoom();
    models.forEach((combo) => {
      // get the base styles from theme
      let dataType;
      if (dataTypeField) dataType = combo.data[dataTypeField] as string;
      const itemTheme = getItemTheme(
        comboDataTypeSet,
        dataTypeField,
        dataType,
        comboTheme,
      );

      itemMap[combo.id] = new Combo({
        model: combo,
        getCombinedBounds: () => {
          //  calculate the position of the combo according to its children
          const childModels = graphCore.getChildren(combo.id, 'combo');
          return getCombinedBoundsByData(graph, childModels);
        },
        getChildren: () => {
          const childModels = graphCore.getChildren(combo.id, 'combo');
          return childModels.map(({ id }) => itemMap[id]) as (Node | Combo)[];
        },
        renderExtensions: comboExtensions,
        containerGroup: comboGroup,
        mapper: this.comboMapper,
        stateMapper: this.comboStateMapper,
        zoom,
        theme: itemTheme as {
          styles: ComboStyleSet;
          lodStrategy: LodStrategyObj;
        },
        device:
          graph.rendererType === 'webgl-3d'
            ? (graph.canvas.context as any).deviceRendererPlugin.getDevice()
            : undefined,
      });
    });
  }

  /**
   * Create edges with inner data to canvas.
   * @param models edges' inner datas
   */
  private renderEdges(
    models: EdgeModel[],
    edgeTheme: EdgeThemeSpecifications = {},
  ) {
    const { edgeExtensions, edgeGroup, itemMap, edgeDataTypeSet, graph } = this;
    const { dataTypeField } = edgeTheme;
    const zoom = graph.getZoom();
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
      const itemTheme = getItemTheme(
        edgeDataTypeSet,
        dataTypeField,
        dataType,
        edgeTheme,
      );

      itemMap[id] = new Edge({
        model: edge,
        renderExtensions: edgeExtensions,
        containerGroup: edgeGroup,
        mapper: this.edgeMapper,
        stateMapper: this.edgeStateMapper,
        sourceItem,
        targetItem,
        zoom,
        theme: itemTheme as {
          styles: EdgeStyleSet;
          lodStrategy: LodStrategyObj;
        },
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
  public findIdByState(
    itemType: ITEM_TYPE,
    state: string,
    value: string | boolean = true,
  ): ID[] {
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
      console.warn(
        `Fail to get item state, the item with id ${id} does not exist.`,
      );
      return false;
    }
    return item.hasState(state);
  }

  public getItemById(id: ID) {
    return this.itemMap[id];
  }

  public getItemBBox(
    id: ID,
    isKeyShape = false,
    isTransient = false,
  ): AABB | false {
    const item = isTransient ? this.transientItemMap[id] : this.itemMap[id];
    if (!item) {
      console.warn(
        `Fail to get item bbox, the item with id ${id} does not exist.`,
      );
      return false;
    }
    if (item instanceof Group) return item.getRenderBounds();
    return isKeyShape ? item.getKeyBBox() : item.getBBox();
  }

  public getItemVisible(id: ID) {
    const item = this.itemMap[id];
    if (!item) {
      console.warn(
        `Fail to get item visible, the item with id ${id} does not exist.`,
      );
      return false;
    }
    return item.isVisible();
  }

  public sortByComboTree(graphCore: GraphCore) {
    if (!graphCore.hasTreeStructure('combo')) return;
    graphCoreTreeDfs(graphCore, graphCore.getRoots('combo'), (node) => {
      const nodeItem = this.itemMap[node.id];
      if (node.data._isCombo && nodeItem) {
        nodeItem.toFront();
      }
    });
  }

  private collapseCombo(graphCore: GraphCore, comboModel: ComboModel) {
    let relatedEdges = [];
    const succeedIds = [];
    // hide the succeeds
    graphComboTreeDfs(this.graph, [comboModel], (child) => {
      if (child.id !== comboModel.id) this.graph.hideItem(child.id);
      relatedEdges = relatedEdges.concat(graphCore.getRelatedEdges(child.id));
      succeedIds.push(child.id);
    });
    const virtualEdges = [];
    const groupedEdges = new Map();
    uniq(relatedEdges).forEach((edge) => {
      const { source: s, target: t, data } = edge;
      if (data._virtual) return;
      const sourceIsSucceed = succeedIds.includes(s);
      const targetIsSucceed = succeedIds.includes(t);
      // do not add virtual edge if the source and target are both the succeed
      if (sourceIsSucceed && targetIsSucceed) return;
      const source = sourceIsSucceed ? comboModel.id : s;
      const target = targetIsSucceed ? comboModel.id : t;
      const key = `${source}_${target}`;
      const group = groupedEdges.get(key) || { edges: [], source, target };
      group.edges.push(edge);
      groupedEdges.set(key, group);
    });
    // each item in groupedEdges is a virtual edge
    groupedEdges.forEach((group) => {
      const { source, target, edges } = group;
      virtualEdges.push({
        id: `virtual-${uniqueId()}`,
        source,
        target,
        data: {
          _virtual: true,
          keyShape: {
            lineWidth: edges.length,
          },
        },
      });
    });
    this.graph.addData('edge', virtualEdges);
  }

  private expandCombo(graphCore: GraphCore, comboModel: ComboModel) {
    let isAncestorCollapsed = false;
    traverseAncestors(graphCore, [comboModel], (anccestor) => {
      if (anccestor.data.collapsed) {
        isAncestorCollapsed = true;
        return true;
      }
      return false;
    });
    if (isAncestorCollapsed) return;
    const relatedVirtualEdgeIds = [];
    // show the succeeds
    graphComboTreeDfs(this.graph, [comboModel], (child) => {
      graphCore.getRelatedEdges(child.id).forEach((edge) => {
        if (edge.data._virtual) relatedVirtualEdgeIds.push(edge.id);
      });
      if (child.id !== comboModel.id) {
        if (!graphCore.getNode(child.data.parentId).data.collapsed) {
          this.graph.showItem(child.id);
        }
        // re-add collapsed succeeds' virtual edges by calling collapseCombo
        if (child.data._isCombo && child.data.collapsed) {
          this.collapseCombo(graphCore, child);
        }
      }
    });
    // remove related virtual edges
    this.graph.removeData('edge', uniq(relatedVirtualEdgeIds));
  }
}

const getItemTheme = (
  dataTypeSet: Set<string>,
  dataTypeField: string,
  dataType: string,
  itemTheme:
    | NodeThemeSpecifications
    | EdgeThemeSpecifications
    | ComboThemeSpecifications,
): {
  styles: NodeStyleSet | EdgeStyleSet;
  lodStrategy: LodStrategyObj;
} => {
  const { styles: themeStyles = {}, lodStrategy } = itemTheme;
  const formattedLodStrategy = formatLodStrategy(lodStrategy);
  if (!dataTypeField) {
    // dataType field is not assigned
    const styles = isArray(themeStyles)
      ? themeStyles[0]
      : Object.values(themeStyles)[0];
    return { styles, lodStrategy: formattedLodStrategy };
  }
  dataTypeSet.add(dataType as string);
  let themeStyle;
  if (isArray(themeStyles)) {
    const themeStylesLength = themeStyles.length;
    const idx = Array.from(dataTypeSet).indexOf(dataType);
    themeStyle = themeStyles[idx % themeStylesLength];
  } else if (isObject(themeStyles)) {
    themeStyle = themeStyles[dataType] || themeStyles.others;
  }
  return {
    styles: themeStyle,
    lodStrategy: formattedLodStrategy,
  };
};
