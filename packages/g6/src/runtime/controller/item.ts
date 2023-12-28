import { AABB, Canvas, DisplayObject, Group } from '@antv/g';
import { AmbientLight, DirectionalLight } from '@antv/g-plugin-3d';
import { GraphChange, ID } from '@antv/graphlib';
import { debounce, isArray, isNumber, isObject, uniq, uniqueId } from '@antv/util';
import Combo from '../../item/combo';
import Edge from '../../item/edge';
import Node from '../../item/node';
import registry from '../../stdlib';
import { BaseEdge } from '../../stdlib/item/edge/base';
import { BaseNode } from '../../stdlib/item/node/base';
import {
  ComboModel,
  IGraph,
  NodeDisplayModel,
  NodeEncode,
  NodeModel,
  NodeModelData,
  NodeShapesEncode,
} from '../../types';
import { ComboDisplayModel, ComboEncode, ComboShapesEncode } from '../../types/combo';
import { GraphCore } from '../../types/data';
import { EdgeDisplayModel, EdgeEncode, EdgeModel, EdgeModelData, EdgeShapesEncode } from '../../types/edge';
import { ViewportChangeHookParams } from '../../types/hook';
import { DisplayMapper, ITEM_TYPE, LodLevelRanges, SHAPE_TYPE, ShapeStyle } from '../../types/item';
import {
  ComboStyleSet,
  ComboThemeSpecifications,
  EdgeStyleSet,
  EdgeThemeSpecifications,
  NodeStyleSet,
  NodeThemeSpecifications,
  ThemeSpecification,
} from '../../types/theme';
import { isBBoxInBBox, isPointInBBox } from '../../util/bbox';
import {
  deconstructData,
  graphComboTreeDfs,
  graphCoreTreeDfs,
  traverseAncestors,
  traverseAncestorsAndSucceeds,
  traverseGraphAncestors,
} from '../../util/data';
import { getGroupedChanges } from '../../util/event';
import { getExtension } from '../../util/extension';
import { upsertTransientItem } from '../../util/item';
import { isPointPreventPolylineOverlap, isPolylineWithObstacleAvoidance } from '../../util/polyline';
import { getCombinedBoundsByData, intersectBBox, upsertShape } from '../../util/shape';
import { convertToNumber } from '../../util/type';
import { formatLodLevels } from '../../util/zoom';

enum WARN_TYPE {
  FAIL_GET_BBOX,
  FAIL_GET_VISIBLE,
  FAIL_SET_STATE,
  FAIL_GET_STATE,
  FAIL_SET_VISIBLE,
  FAIL_DRAW_TRANSIENT,
  SOURCE_NOT_EXIST,
  TARGET_NOT_EXIST,
}

const getWarnMsg = {
  [WARN_TYPE.FAIL_GET_BBOX]: (ids) => `Fail to get items' bboxes, the items with ids ${ids.join(', ')} do not exist.`,
  [WARN_TYPE.FAIL_GET_VISIBLE]: (ids) =>
    `Fail to get items' visible, the items with ids ${ids.join(', ')} do not exist.`,
  [WARN_TYPE.FAIL_SET_STATE]: (ids) => `Fail to set states for items ${ids.join(', ')}, which do not exist.`,
  [WARN_TYPE.FAIL_SET_VISIBLE]: (ids) => `Fail to set visibility for items ${ids.join(', ')}, which do not exist.`,
  [WARN_TYPE.FAIL_DRAW_TRANSIENT]: (ids) => `Fail to draw transient items of ${ids}, which do not exist.`,
  [WARN_TYPE.SOURCE_NOT_EXIST]: (params) =>
    `The source nodes ${params.map((p) => p.source).join(', ')} do not exist in the graph for edges ${params
      .map((p) => p.id)
      .join(', ')}, please add the nodes first`,
  [WARN_TYPE.TARGET_NOT_EXIST]: (params) =>
    `The target nodes ${params.map((p) => p.target).join(', ')} do not exist in the graph for edges ${params
      .map((p) => p.id)
      .join(', ')}, please add the nodes first`,
  [WARN_TYPE.FAIL_GET_STATE]: (ids) => `Fail to get items' states, the items with ids ${ids.join(', ')} do not exist.`,
};
/**
 * Manages and stores the node / edge / combo items.
 */
export class ItemController {
  public graph: IGraph;
  public nodeExtensions: BaseNode[] = [];
  public edgeExtensions: BaseEdge[] = [];
  public comboExtensions: BaseNode[] = [];

  public zoom: number;

  /**
   * Node / edge / combo items map
   */
  private itemMap: Map<ID, Node | Edge | Combo> = new Map<ID, Node | Edge | Combo>();

  /**
   * node / edge / combo 's mapper in graph config
   */
  private nodeMapper: ((data: NodeModel) => NodeDisplayModel) | NodeEncode | undefined;
  private edgeMapper: ((data: EdgeModel) => EdgeDisplayModel) | EdgeEncode | undefined;
  private comboMapper: ((data: ComboModel) => ComboDisplayModel) | ComboEncode | undefined;

  private nodeStateMapper: {
    [stateName: string]: ((data: NodeModel) => NodeDisplayModel) | NodeEncode;
  };
  private edgeStateMapper: {
    [stateName: string]: ((data: EdgeModel) => EdgeDisplayModel) | EdgeEncode;
  };
  private comboStateMapper: {
    [stateName: string]: ((data: ComboModel) => ComboDisplayModel) | ComboEncode;
  };

  // if the graph has combos, nodeGroup/edgeGroup/comboGroup point to the same group, so as transient groups.
  private nodeGroup: Group;
  private nodeLabelGroup: Group;
  private edgeLabelGroup: Group;
  private edgeGroup: Group;
  private comboGroup: Group;
  private transientNodeGroup: Group;
  private transientEdgeGroup: Group;
  private transientComboGroup: Group;
  private transientNodeLabelGroup: Group;
  private transientEdgeLabelGroup: Group;

  private nodeDataTypeSet: Set<string> = new Set();
  private edgeDataTypeSet: Set<string> = new Set();
  private comboDataTypeSet: Set<string> = new Set();

  // The G shapes or groups on transient map drawn by this controller
  private transientObjectMap: Map<ID, DisplayObject> = new Map<ID, DisplayObject>();
  private transientItemMap: Map<ID, Node | Edge | Combo | Group> = new Map<ID, Node | Edge | Combo | Group>();
  /** Caches */
  private nearEdgesCache: Map<ID, EdgeModel[]> = new Map<ID, EdgeModel[]>();

  private cacheViewItems: {
    inView: (Node | Edge | Combo)[];
    outView: (Node | Edge | Combo)[];
  };

  private cacheWarnMsg = {};

  constructor(graph: IGraph<any, any>) {
    this.graph = graph;
    // get mapper for node / edge / combo
    const { node, edge, combo, nodeState = {}, edgeState = {}, comboState = {} } = graph.getSpecification();
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
    this.graph.hooks.itemstateconfigchange.tap(this.onItemStateConfigChange.bind(this));
    this.graph.hooks.itemvisibilitychange.tap(this.onItemVisibilityChange.bind(this));
    this.graph.hooks.itemzindexchange.tap(this.onItemZIndexChange.bind(this));
    this.graph.hooks.transientupdate.tap(this.onTransientUpdate.bind(this));
    this.graph.hooks.viewportchange.tap(this.onViewportChange.bind(this));
    this.graph.hooks.themechange.tap(this.onThemeChange.bind(this));
    this.graph.hooks.mapperchange.tap(this.onMapperChange.bind(this));
    this.graph.hooks.treecollapseexpand.tap(this.onTreeCollapseExpand.bind(this));
    this.graph.hooks.destroy.tap(this.onDestroy.bind(this));
  }

  /**
   * Get the extensions from useLib, stdLib is a subset of useLib.
   */
  private getExtensions() {
    // TODO: user need to config using node/edge/combo types from useLib to spec?
    const { node, edge, combo } = this.graph.getSpecification();

    const nodeTypes = Object.keys(registry.useLib.nodes || {});
    const edgeTypes = Object.keys(registry.useLib.edges || {});
    const comboTypes = Object.keys(registry.useLib.combos || {});
    return {
      node: nodeTypes.map((config) => getExtension(config, registry.useLib, 'node')).filter(Boolean),
      edge: edgeTypes.map((config) => getExtension(config, registry.useLib, 'edge')).filter(Boolean),
      combo: comboTypes.map((config) => getExtension(config, registry.useLib, 'combo')).filter(Boolean),
    };
  }

  /**
   * Listener of runtime's render hook.
   * @param param contains inner data stored in graphCore structure
   * @param param.graphCore
   * @param param.theme
   * @param param.transientCanvas
   * @param param.transientLabelCanvas
   * @param param.tileOptimize
   * @param param.tileOptimize.tileFirstRender
   * @param param.tileOptimize.tileFirstRenderSize
   */
  private async onRender(param: {
    graphCore: GraphCore;
    theme: ThemeSpecification;
    transientCanvas: Canvas;
    transientLabelCanvas: Canvas;
    tileOptimize?: {
      tileFirstRender?: boolean | number;
      tileFirstRenderSize?: number;
    };
  }) {
    const { graphCore, theme = {}, transientCanvas, transientLabelCanvas, tileOptimize = {} } = param;
    const { graph } = this;

    // 0. clear groups on canvas, and create new groups
    graph.canvas.removeChildren();
    graph.labelCanvas.removeChildren();
    graph.transientCanvas.removeChildren();
    this.itemMap.forEach((item) => item.destroy());
    this.itemMap.clear();
    this.comboGroup = new Group({ id: 'combo-group', style: { zIndex: 0 } });
    this.edgeGroup = new Group({ id: 'edge-group', style: { zIndex: 1 } });
    this.nodeGroup = new Group({ id: 'node-group', style: { zIndex: 2 } });
    this.edgeLabelGroup = new Group({
      id: 'node-label-group',
      style: { zIndex: 0 },
    });
    this.nodeLabelGroup = new Group({
      id: 'node-label-group',
      style: { zIndex: 1 },
    });
    graph.canvas.appendChild(this.comboGroup);
    graph.canvas.appendChild(this.edgeGroup);
    graph.canvas.appendChild(this.nodeGroup);
    graph.labelCanvas.appendChild(this.edgeLabelGroup);
    graph.labelCanvas.appendChild(this.nodeLabelGroup);

    // Also create transient groups on transient canvas.
    transientCanvas.removeChildren();
    this.transientComboGroup = new Group({
      id: 'combo-group',
      style: { zIndex: 0 },
    });
    this.transientEdgeGroup = new Group({
      id: 'edge-group',
      style: { zIndex: 1 },
    });
    this.transientNodeGroup = new Group({
      id: 'node-group',
      style: { zIndex: 2 },
    });
    transientCanvas.appendChild(this.transientComboGroup);
    transientCanvas.appendChild(this.transientEdgeGroup);
    transientCanvas.appendChild(this.transientNodeGroup);
    this.transientEdgeLabelGroup = new Group({
      id: 'node-label-group',
      style: { zIndex: 0 },
    });
    this.transientNodeLabelGroup = new Group({
      id: 'node-label-group',
      style: { zIndex: 1 },
    });
    transientLabelCanvas.appendChild(this.transientEdgeLabelGroup);
    transientLabelCanvas.appendChild(this.transientNodeLabelGroup);

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
      // @ts-ignore
      graph.canvas.appendChild(ambientLight);
      // @ts-ignore
      graph.canvas.appendChild(light);
      const { width, height } = graph.canvas.getConfig();
      graph.canvas.getCamera().setPerspective(0.1, 50000, 45, width / height);
    }

    // 2. create node / edge / combo items, classes from ../../item, and element drawing and updating fns from node/edge/comboExtensions
    const { nodes, edges, combos } = deconstructData({
      nodes: graphCore.getAllNodes(),
      edges: graphCore.getAllEdges(),
    });

    const renderNodesPromise = this.renderNodes(nodes, theme.node, tileOptimize);
    let nodesInView;
    if (renderNodesPromise) {
      nodesInView = await renderNodesPromise;
    }
    this.renderCombos(combos, theme.combo, graphCore);
    const renderEdgesPromise = this.renderEdges(edges, theme.edge, tileOptimize, nodesInView);
    if (renderEdgesPromise) {
      await renderEdgesPromise;
    }
    this.sortByComboTree(graphCore);
    // collapse the combos which has 'collapsed' in initial data
    if (graphCore.hasTreeStructure('combo')) {
      graphCoreTreeDfs(
        graphCore,
        graphCore.getRoots('combo'),
        (child) => {
          if (child.data.collapsed) this.collapseCombo(graphCore, child);
        },
        'BT',
        'combo',
      );
    }
    // collapse the sub tree which has 'collapsed' in initial data
    if (graphCore.hasTreeStructure('tree')) {
      const collapseNodes = [];
      graphCoreTreeDfs(
        graphCore,
        graphCore.getRoots('tree'),
        (child) => {
          if (child.data.collapsed) collapseNodes.push(child);
        },
        'BT',
        'tree',
      );
      this.collapseSubTree(collapseNodes, graphCore, false);
    }
  }

  /**
   * Listener of runtime's itemchange lifecycle hook.
   * @param param
   * @param param.type
   * @param param.changes
   * @param param.graphCore
   * @param param.theme
   * @param param.upsertAncestors
   * @param param.animate
   * @param param.action
   * @param param.callback
   */
  private onChange(param: {
    type: ITEM_TYPE;
    changes: GraphChange<NodeModelData, EdgeModelData>[];
    graphCore: GraphCore;
    theme: ThemeSpecification;
    upsertAncestors?: boolean;
    animate?: boolean;
    action?: 'updatePosition';
    callback?: (model: NodeModel | EdgeModel | ComboModel, canceled?: boolean) => void;
  }) {
    const {
      changes,
      graphCore,
      action,
      animate = true,
      upsertAncestors = true,
      theme = {},
      callback = () => {},
    } = param;
    const groupedChanges = getGroupedChanges(graphCore, changes);
    const { itemMap } = this;
    // change items according to the order of the keys in groupedChanges

    // === 1. remove edges; 2. remove nodes ===
    [...groupedChanges.EdgeRemoved, ...groupedChanges.NodeRemoved].forEach(({ value }) => {
      const { id } = value;
      const item = itemMap.get(id);
      if (item) {
        item.destroy();
        itemMap.delete(id);
      }
    });

    const { node: nodeTheme = {}, edge: edgeTheme = {}, combo: comboTheme = {} } = theme;

    // === 3. add nodes ===
    if (groupedChanges.NodeAdded.length) {
      const newNodes: NodeModel[] = [];
      const newCombos: ComboModel[] = [];
      groupedChanges.NodeAdded.map((change) => change.value).forEach((model) => {
        if (model.data._isCombo) newCombos.push(model as ComboModel);
        else newNodes.push(model);
      });
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
      const nodeComboUpdate: any = {};
      groupedChanges.NodeDataUpdated.forEach((change) => {
        const { id, propertyName, newValue, oldValue } = change;
        nodeComboUpdate[id] = nodeComboUpdate[id] || {
          id,
          previous: {},
          current: {},
        };
        if (!propertyName) {
          nodeComboUpdate[id] = {
            id,
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
      const edgeIdsToUpdate: Set<ID> = new Set<ID>();
      const comboIdsToUpdate: Set<ID> = new Set<ID>();
      const updateRelates = (param: { edgeIds?: Set<ID>; callback?: any }) => {
        const { edgeIds, callback } = param;
        edgeIds.forEach((nid) => {
          const item = itemMap.get(nid) as Edge | Combo;
          if (item && !item.destroyed) item.forceUpdate();
        });
        callback?.();
      };
      const updateAllRelates = () => {
        [...comboIdsToUpdate, ...edgeIdsToUpdate].forEach((nid) => {
          const item = itemMap.get(nid) as Edge | Combo;
          if (item && !item.destroyed) item.forceUpdate();
        });
      };
      const debounceUpdateAllRelates = debounce(updateAllRelates, 16, false);
      const debounceUpdateRelates = debounce(updateRelates, 16, false);

      Object.values(nodeComboUpdate).forEach((updateObj: any) => {
        const { isReplace, previous, current, id } = updateObj;
        if (!graphCore.hasNode(id)) return;
        const onlyMove = action === 'updatePosition';
        const item = itemMap.get(id) as Node | Combo;
        if (!item || item.destroyed) return;
        const type = item.getType();
        const innerModel = graphCore.getNode(id);
        if (type === 'node' && onlyMove) {
          const { x, y, fx, fy } = current;
          if (isNaN(x) && isNaN(y) && isNaN(fx) && isNaN(fy)) {
            callback(innerModel, true);
            return;
          }
        }

        const nodeRelatedIdsToUpdate: Set<ID> = new Set<ID>();
        // collapse and expand
        if (graphCore.hasTreeStructure('combo')) {
          if (type === 'combo' && current.collapsed !== previous.collapsed) {
            if (current.collapsed) {
              this.collapseCombo(graphCore, innerModel as ComboModel);
            } else if (current.collapsed === false) {
              this.expandCombo(graphCore, innerModel as ComboModel);
            }
          }
          const previousParentId = item.displayModel.data.parentId || previous.parentId;
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
            traverseAncestorsAndSucceeds(this.graph, graphCore, begins, (treeItem) => {
              if (treeItem.data._isCombo && treeItem.id !== innerModel.id) comboIdsToUpdate.add(treeItem.id);
              const relatedEdges = graphCore.getRelatedEdges(treeItem.id);
              relatedEdges.forEach((edge) => {
                edgeIdsToUpdate.add(edge.id);
                nodeRelatedIdsToUpdate.add(edge.id);
              });
            });
          } else if (type === 'combo') {
            // only the succeed combos should be updated
            graphComboTreeDfs(this.graph, [innerModel], (child) => {
              const relatedEdges = graphCore.getRelatedEdges(child.id);
              relatedEdges.forEach((edge) => {
                edgeIdsToUpdate.add(edge.id);
                nodeRelatedIdsToUpdate.add(edge.id);
              });
              if (child.data._isCombo && child.id !== innerModel.id) comboIdsToUpdate.add(child.id);
            });
          }
        }

        // update the theme if the dataType value is changed
        let itemTheme;
        if (nodeDataTypeField && previous[nodeDataTypeField] !== current[nodeDataTypeField]) {
          itemTheme = getItemTheme(this.nodeDataTypeSet, nodeDataTypeField, current[nodeDataTypeField], nodeTheme);
        }

        const adjacentEdgeInnerModels = graphCore.getRelatedEdges(id);

        if (isPointPreventPolylineOverlap(innerModel)) {
          const newNearEdges = this.graph.getNearEdgesData(id, (edge) => isPolylineWithObstacleAvoidance(edge));
          const prevNearEdges = this.nearEdgesCache.get(id) || [];
          adjacentEdgeInnerModels.push(...newNearEdges);
          adjacentEdgeInnerModels.push(...prevNearEdges);
          this.nearEdgesCache.set(id, newNearEdges);
        }

        adjacentEdgeInnerModels.forEach((edge) => {
          edgeIdsToUpdate.add(edge.id);
          nodeRelatedIdsToUpdate.add(edge.id);
        });

        item.onframe = () => updateRelates({ edgeIds: nodeRelatedIdsToUpdate });
        let statesCache;
        if (innerModel.data._isCombo && previous.collapsed !== current.collapsed) {
          statesCache = this.graph.getItemAllStates(id);
          this.graph.clearItemState(id);
        }
        item.update(
          innerModel,
          { previous, current },
          isReplace,
          itemTheme,
          onlyMove,
          animate,
          // call after updating finished
          (_, canceled) => {
            item.onframe = undefined;
            if (statesCache) {
              statesCache.forEach((state) => this.graph.setItemState(id, state, true));
            }
            // @ts-ignore
            debounceUpdateRelates({
              edgeIds: nodeRelatedIdsToUpdate,
              callback: () => callback(innerModel, canceled),
            });
          },
        );

        const parentItem = this.itemMap.get(current.parentId);
        if (current.parentId && parentItem?.model.data.collapsed) {
          this.graph.executeWithNoStack(() => {
            this.graph.hideItem(innerModel.id, { disableAnimate: false });
          });
        }
      });
      debounceUpdateAllRelates();
    }
    // === 6. update edges' data ===
    if (groupedChanges.EdgeDataUpdated.length) {
      const edgeUpdate = {};
      groupedChanges.EdgeDataUpdated.forEach((change) => {
        const { id, propertyName, newValue, oldValue } = change;
        edgeUpdate[id] = edgeUpdate[id] || { id, previous: {}, current: {} };
        if (!propertyName) {
          edgeUpdate[id] = {
            id,
            isReplace: true, // whether replace the whole data
            previous: oldValue,
            current: newValue,
          };
        } else {
          edgeUpdate[id].previous[propertyName] = oldValue;
          edgeUpdate[id].current[propertyName] = newValue;
        }
      });

      const { dataTypeField: edgeDataTypeField = '' } = edgeTheme;
      Object.values(edgeUpdate).forEach((updateObj: any) => {
        const { isReplace, current, previous, id } = updateObj;
        // update the theme if the dataType value is changed
        let itemTheme;
        if (previous[edgeDataTypeField] !== current[edgeDataTypeField]) {
          itemTheme = getItemTheme(this.edgeDataTypeSet, edgeDataTypeField, current[edgeDataTypeField], edgeTheme);
        }
        const item = itemMap.get(id);
        const innerModel = graphCore.getEdge(id);
        if (!item || item.destroyed) return;
        item.update(innerModel, { current, previous }, isReplace, itemTheme, undefined, animate, (_, canceled) =>
          callback(innerModel, canceled),
        );
      });
    }
    // === 7. update edges' source target ===
    if (groupedChanges.EdgeUpdated.length) {
      const edgeUpdate = {};
      groupedChanges.EdgeUpdated.forEach((change) => {
        // propertyName is 'source' or 'target'
        const { id, propertyName, newValue } = change;
        edgeUpdate[id] = edgeUpdate[id] || { id };
        edgeUpdate[id][propertyName] = newValue;
      });

      Object.values(edgeUpdate).forEach((updateObj: any) => {
        const { source, target, id } = updateObj;
        const item = itemMap.get(id) as Edge;
        if (source !== undefined) item.updateEnd('source', this.itemMap.get(source) as Node);
        if (target !== undefined) item.updateEnd('target', this.itemMap.get(target) as Node);
      });
    }
    // === 8. combo tree structure change, resort the shapes ===
    if (groupedChanges.ComboStructureChanged.length) {
      this.sortByComboTree(graphCore);
    }
    // === 9. tree data structure change, hide the new node and edge while one of the ancestor is collapsed ===
    if (groupedChanges.TreeStructureChanged.length) {
      groupedChanges.TreeStructureChanged.forEach((change) => {
        const { nodeId } = change;
        // hide it when an ancestor is collapsed
        let parent = graphCore.getParent(nodeId, 'tree');
        while (parent) {
          if (parent.data.collapsed) {
            this.graph.hideItem(nodeId, { disableAnimate: true });
            break;
          }
          parent = graphCore.getParent(parent.id, 'tree');
        }
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
   * @param param.ids
   * @param param.states
   * @param param.value
   */
  private onItemStateChange(param: { ids: ID[]; states: string[]; value: boolean }) {
    const { ids, states, value } = param;
    ids.forEach((id) => {
      const item = this.itemMap.get(id);
      if (!item) {
        this.cacheWarnMsg[WARN_TYPE.FAIL_SET_STATE] = this.cacheWarnMsg[WARN_TYPE.FAIL_SET_STATE] || [];
        this.cacheWarnMsg[WARN_TYPE.FAIL_SET_STATE].push(id);
        // @ts-ignore
        this.debounceWarn(WARN_TYPE.FAIL_SET_STATE);
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

  private onItemStateConfigChange(param: {
    itemType: ITEM_TYPE;
    stateConfig:
      | {
          [stateName: string]: ((data: NodeModel) => NodeDisplayModel) | NodeShapesEncode;
        }
      | {
          [stateName: string]: ((data: EdgeModel) => EdgeDisplayModel) | EdgeShapesEncode;
        }
      | {
          [stateName: string]: ((data: ComboModel) => ComboDisplayModel) | ComboShapesEncode;
        };
  }) {
    const { itemType, stateConfig } = param;
    const fieldName = `${itemType}StateMapper`;
    this[fieldName] = stateConfig;
    this.graph.getAllNodesData().forEach((node) => {
      const item = this.itemMap.get(node.id);
      if (item) {
        item.stateMapper = stateConfig;
      }
    });
  }

  private onItemVisibilityChange(param: {
    ids: ID[];
    shapeIds: string[];
    value: boolean;
    graphCore: GraphCore;
    animate?: boolean;
    keepKeyShape?: boolean;
    keepRelated?: boolean;
  }) {
    const { ids, shapeIds, value, graphCore, animate = true, keepKeyShape = false, keepRelated = false } = param;
    ids.forEach((id) => {
      const item = this.itemMap.get(id);
      if (!item) {
        this.cacheWarnMsg[WARN_TYPE.FAIL_SET_VISIBLE] = this.cacheWarnMsg[WARN_TYPE.FAIL_SET_VISIBLE] || [];
        this.cacheWarnMsg[WARN_TYPE.FAIL_SET_VISIBLE].push(id);
        // @ts-ignore
        this.debounceWarn(WARN_TYPE.FAIL_SET_VISIBLE);
        return;
      }
      if (shapeIds?.length) {
        if (value) {
          item.show(animate, shapeIds);
        } else {
          item.hide(animate, false, shapeIds);
        }
        return;
      }
      const type = item.getType();
      if (value) {
        if (type === 'edge') {
          item.show(animate);
          (item as Edge).forceUpdate();
        } else {
          if (graphCore.hasTreeStructure('combo')) {
            let anccestorCollapsed = false;
            traverseAncestors(graphCore, [item.model], (model) => {
              if (model.data.collapsed) anccestorCollapsed = true;
              return anccestorCollapsed;
            });
            if (anccestorCollapsed) return;
          }
          const relatedEdges = graphCore.getRelatedEdges(id);
          item.show(animate);
          relatedEdges.forEach(({ id: edgeId, source, target }) => {
            if (this.getItemVisible(source) && this.getItemVisible(target)) this.itemMap.get(edgeId)?.show(animate);
          });
        }
      } else {
        item.hide(animate, keepKeyShape);
        if (type !== 'edge' && !keepRelated) {
          const relatedEdges = graphCore.getRelatedEdges(id);
          relatedEdges.forEach(({ id: edgeId }) => {
            this.itemMap.get(edgeId)?.hide(animate);
          });
        }
      }
    });
  }

  private onItemZIndexChange(params: { ids: ID[]; action: 'front' | 'back'; graphCore: GraphCore }) {
    const { ids = [], action, graphCore } = params;
    ids.forEach((id) => {
      const item = this.itemMap.get(id);
      if (!item) return;
      if (action === 'front') {
        item.toFront();
        if (graphCore.hasTreeStructure('combo')) {
          graphComboTreeDfs(
            this.graph,
            [item.model],
            (model) => {
              if (model.data._isCombo) {
                const subCombo = this.itemMap.get(model.id);
                subCombo && subCombo.toFront();
              }
            },
            'TB',
          );
        }
      } else {
        item.toBack();
        if (graphCore.hasTreeStructure('combo')) {
          traverseGraphAncestors(this.graph, [item.model], (model) => {
            this.itemMap.get(model.id)?.toBack();
          });
        }
      }
    });
  }

  /**
   * get the items inside viewport
   * @param containType
   * @param ratio
   * @returns
   */
  private groupItemsByView = (containType: 'inside' | 'intersect' = 'inside', ratio: number = 1) => {
    const range = this.graph.getCanvasRange();
    const items = Array.from(this.itemMap, ([key, value]) => value);
    const containFunc = containType === 'intersect' ? intersectBBox : isBBoxInBBox;
    let { inView: itemsInView, outView: itemsOutView } = this.cacheViewItems || {};
    if (!ratio || ratio === 1 || !this.cacheViewItems) {
      itemsInView = [];
      itemsOutView = [];
      items.forEach((item) => {
        const { keyShape } = item.shapeMap;
        if (!keyShape) return;
        const renderBounds = keyShape.getRenderBounds();
        if (containFunc(renderBounds, range, 0.4)) itemsInView.push(item);
        else itemsOutView.push(item);
      });
    } else if (ratio < 1) {
      // zoom-out
      itemsOutView.forEach((item) => {
        const { keyShape } = item.shapeMap;
        if (!keyShape) return;
        const renderBounds = keyShape.getRenderBounds();
        if (containFunc(renderBounds, range, 0.4)) {
          itemsInView.push(item);
        }
      });
    } else if (ratio > 1) {
      // zoom-in
      itemsInView.forEach((item) => {
        const { keyShape } = item.shapeMap;
        if (!keyShape) return;
        const renderBounds = keyShape.getRenderBounds();
        if (!containFunc(renderBounds, range, 0.4)) {
          itemsOutView.push(item);
        }
      });
    }
    this.cacheViewItems = { inView: itemsInView, outView: itemsOutView };
    return {
      items,
      inView: itemsInView,
      outView: itemsOutView,
    };
  };

  private onViewportChange = debounce(
    ({ transform, effectTiming, tileLodSize = 1000 }: ViewportChangeHookParams) => {
      const { zoom } = transform;
      if (zoom) {
        const zoomRatio = this.graph.getZoom();
        const { items, inView: itemsInview, outView: itemsOutView } = this.groupItemsByView();
        const sortedItems = itemsInview.concat(itemsOutView);
        const sections = Math.ceil(items.length / tileLodSize);
        const itemSections = Array.from({ length: sections }, (v, i) =>
          sortedItems.slice(i * tileLodSize, i * tileLodSize + tileLodSize),
        );
        let requestId;
        const update = () => {
          if (!itemSections.length) {
            cancelAnimationFrame(requestId);
            return;
          }
          itemSections.shift().forEach((item) => item.updateZoom(zoomRatio));
          requestId = requestAnimationFrame(update);
        };
        requestId = requestAnimationFrame(update);
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
    this.itemMap.forEach((item) => {
      const itemTye = item.getType();
      const usingTheme = itemTye === 'node' ? nodeTheme : edgeTheme;
      const usingTypeSet = itemTye === 'node' ? nodeDataTypeSet : edgeDataTypeSet;
      const { dataTypeField } = usingTheme;
      let dataType;
      if (dataTypeField) dataType = item.model.data[dataTypeField] as string;
      const itemTheme = getItemTheme(usingTypeSet, dataTypeField, dataType, usingTheme);
      item.update(
        item.model,
        undefined,
        false,
        itemTheme as {
          styles: NodeStyleSet;
          lodLevels: LodLevelRanges;
        },
      );
    });
  };

  private onMapperChange = ({ type, mapper }) => {
    if (!mapper) return;
    /** update this.nodeMapper or this.edgeMapper */
    this[`${type}Mapper`] = mapper;
    this.itemMap.forEach((item) => {
      const itemTye = item.getType();
      if (itemTye !== type) return;
      item.mapper = mapper;
      item.update(item.model, undefined, false);
    });
  };

  private onDestroy = () => {
    Object.values(this.itemMap).forEach((item) => item.destroy());
    // Fix OOM problem, since this map will hold all the refs of items.
    this.itemMap.clear();
  };

  private onTransientUpdate(param: {
    type: ITEM_TYPE | SHAPE_TYPE;
    id: ID;
    config: {
      action: 'remove' | 'add' | 'update' | undefined;
      style?: ShapeStyle;
      /** Data to be merged into the transient item. */
      data?: Record<string, any>;
      shapeIds?: string[];
      /** For type: 'edge' */
      drawSource?: boolean;
      /** For type: 'edge' */
      drawTarget?: boolean;
      upsertAncestors?: boolean;
      visible?: boolean;
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
      shapeIds,
      drawSource,
      drawTarget,
      upsertAncestors,
      visible = true,
    } = config as any;
    const isItemType = type === 'node' || type === 'edge' || type === 'combo';
    // Removing
    if (action === 'remove') {
      if (isItemType) {
        const transientItem = this.transientItemMap.get(id);
        if (type === 'combo') {
          // remove children from bottom to top
          graphCoreTreeDfs(
            graphCore,
            [graphCore.getNode(id)],
            (child) => {
              const transientChild = this.transientItemMap.get(child.id);
              if (transientChild && !transientChild.destroyed) {
                transientChild.destroy();
              }
              this.transientItemMap.delete(child.id);
            },
            'BT',
          );
        }
        if (transientItem && !transientItem.destroyed) {
          if (!(transientItem as Node | Edge | Combo).getType?.()) {
            (transientItem as Group).remove();
          }
          transientItem.destroy();
        }
        this.transientItemMap.delete(id);
        return;
      } else {
        const preObj = transientObjectMap.get(id);
        if (preObj && !preObj.destroyed) preObj.destroy();
        transientObjectMap.delete(id);
        return;
      }
    }
    // Adding / Updating
    if (isItemType) {
      const item = this.itemMap.get(id);
      if (!item) {
        this.cacheWarnMsg[WARN_TYPE.FAIL_DRAW_TRANSIENT] = this.cacheWarnMsg[WARN_TYPE.FAIL_DRAW_TRANSIENT] || [];
        this.cacheWarnMsg[WARN_TYPE.FAIL_DRAW_TRANSIENT].push(id);
        // @ts-ignore
        this.debounceWarn(WARN_TYPE.FAIL_DRAW_TRANSIENT);
        return;
      }
      const transientItem = upsertTransientItem(
        item,
        this.transientNodeGroup,
        this.transientEdgeGroup,
        this.transientComboGroup,
        this.transientNodeLabelGroup,
        this.transientEdgeLabelGroup,
        this.transientItemMap,
        this.itemMap,
        graphCore,
        { shapeIds, drawSource, drawTarget, visible },
        upsertAncestors,
      );
      if (shapeIds) {
        // only update node positions to cloned node container(group)
        if ((type === 'node' || type === 'combo') && 'x' in data && 'y' in data) {
          const { x, y } = data;
          (transientItem as Group).setPosition([x, y]);
        }
        // TODO: edge onlyDrawKeyShape?
      } else {
        const transItem = transientItem as Node | Edge | Combo;
        const positionChanged = 'x' in data && 'y' in data;
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
              const transChild = this.transientItemMap.get(node.id) as Node;
              if (!transChild) return;
              const { x: childX = 0, y: childY = 0 } = transChild.model.data as NodeModelData;

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

        if (graphCore.hasTreeStructure('combo') && type !== 'edge' && positionChanged) {
          // force update ancestor combos in the sametime
          let currentAncestor = graphCore.getParent(transItem.model.id, 'combo');
          while (currentAncestor) {
            const ancestorItem = this.transientItemMap.get(currentAncestor.id);
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
        if (type !== 'edge') {
          const relatedEdges = graphCore.getRelatedEdges(transItem.model.id);
          relatedEdges.forEach((relatedEdge) => {
            const transientEdge = this.transientItemMap.get(relatedEdge.id) as Edge;
            if (transientEdge) transientEdge.forceUpdate();
          });
        }
      }
      return;
    }

    const idStr = String(id);
    const shape = upsertShape(type, idStr, style, {
      shapeMap: Object.fromEntries(transientObjectMap),
    });
    transientObjectMap.set(idStr, shape);
    shape.style.pointerEvents = capture ? 'auto' : 'none';
    if (shape.parentNode === null) canvas.getRoot().appendChild(shape);
  }
  public getTransient(id: string) {
    return this.transientObjectMap.get(id);
  }

  public getTransientItem(id: ID) {
    return this.transientItemMap.get(id);
  }

  public getItemMap() {
    return this.itemMap;
  }

  public findDisplayModel(id: ID): NodeDisplayModel | EdgeDisplayModel | ComboDisplayModel {
    const item = this.itemMap.get(id);
    if (!item) return { id, data: {} };
    return {
      id,
      data: {
        ...item.displayModel.data,
        ...item.renderExt.mergedStyles,
        lodLevels: item.lodLevels,
      },
    };
  }

  /**
   * Create nodes with inner data to canvas.
   * @param models nodes' inner data
   * @param nodeTheme
   * @param tileOptimize
   * @param tileOptimize.tileFirstRender
   * @param tileOptimize.tileFirstRenderSize
   */
  private async renderNodes(
    models: NodeModel[],
    nodeTheme: NodeThemeSpecifications = {},
    tileOptimize?: {
      tileFirstRender?: boolean | number;
      tileFirstRenderSize?: number;
    },
  ): Promise<any> | undefined {
    const { nodeExtensions, nodeGroup, nodeLabelGroup, nodeDataTypeSet, graph } = this;
    const { dataTypeField = '' } = nodeTheme;
    const { tileFirstRender, tileFirstRenderSize = 1000 } = tileOptimize || {};
    const zoom = graph.getZoom();
    const delayFirstDraw = isNumber(tileFirstRender) ? models.length > tileFirstRender : tileFirstRender;
    const itemsInView = [];
    const itemsOutView = [];
    const viewRange = this.graph.getCanvasRange();
    models.forEach((node) => {
      // get the base styles from theme
      let dataType;
      if (dataTypeField) dataType = node.data[dataTypeField] as string;
      const itemTheme = getItemTheme(nodeDataTypeSet, dataTypeField, dataType, nodeTheme);

      const nodeItem = new Node({
        graph,
        delayFirstDraw,
        model: node,
        renderExtensions: nodeExtensions,
        containerGroup: nodeGroup,
        labelContainerGroup: nodeLabelGroup,
        mapper: this.nodeMapper,
        stateMapper: this.nodeStateMapper,
        zoom,
        theme: itemTheme as {
          styles: NodeStyleSet;
          lodLevels: LodLevelRanges;
        },
        device:
          graph.rendererType === 'webgl-3d'
            ? // TODO: G type
              (graph.canvas.context as any).deviceRendererPlugin.getDevice()
            : undefined,
      });

      this.itemMap.set(node.id, nodeItem);
      const { x, y } = nodeItem.model.data;
      if (delayFirstDraw && isPointInBBox({ x: convertToNumber(x), y: convertToNumber(y) }, viewRange)) {
        itemsInView.push(nodeItem);
      } else {
        itemsOutView.push(nodeItem);
      }
    });
    if (delayFirstDraw) {
      let requestId;
      const sectionNum = Math.ceil(itemsOutView.length / tileFirstRenderSize);
      const sections = Array.from({ length: sectionNum }, (v, i) =>
        itemsOutView.slice(i * tileFirstRenderSize, i * tileFirstRenderSize + tileFirstRenderSize),
      );
      sections.unshift(itemsInView);
      const update = (resolve) => {
        if (!sections.length) {
          cancelAnimationFrame(requestId);
          return resolve(itemsInView);
        }
        sections
          .shift()
          .forEach((item) =>
            item.draw(
              item.displayModel as NodeDisplayModel | ComboDisplayModel,
              undefined,
              undefined,
              !item.displayModel.data.disableAnimate,
            ),
          );
        requestId = requestAnimationFrame(() => update(resolve));
      };
      return new Promise((resolve) => {
        requestId = requestAnimationFrame(() => update(resolve));
      });
    }
  }

  private async renderCombos(models: ComboModel[], comboTheme: ComboThemeSpecifications = {}, graphCore: GraphCore) {
    const { comboExtensions, comboGroup, comboDataTypeSet, graph, itemMap } = this;
    const { dataTypeField = '' } = comboTheme;
    const zoom = graph.getZoom();
    models.forEach((combo) => {
      // get the base styles from theme
      let dataType;
      if (dataTypeField) dataType = combo.data[dataTypeField] as string;
      const itemTheme = getItemTheme(comboDataTypeSet, dataTypeField, dataType, comboTheme);

      const getCombinedBounds = () => {
        //  calculate the position of the combo according to its children
        return getCombinedBoundsByData(
          graph,
          graphCore
            .getChildren(combo.id, 'combo')
            .map(({ id }) => itemMap.get(id))
            .filter(Boolean) as (Node | Combo)[],
        );
      };
      const getChildren = () => {
        const childModels = graphCore.getChildren(combo.id, 'combo');
        return childModels.map(({ id }) => itemMap.get(id)) as (Node | Combo)[];
      };
      const comboItem = new Combo({
        model: combo,
        graph: this.graph,
        getCombinedBounds,
        getChildren,
        renderExtensions: comboExtensions,
        containerGroup: comboGroup,
        labelContainerGroup: this.nodeLabelGroup,
        mapper: this.comboMapper as DisplayMapper,
        stateMapper: this.comboStateMapper as {
          [stateName: string]: DisplayMapper;
        },
        zoom,
        theme: itemTheme as {
          styles: ComboStyleSet;
          lodLevels: LodLevelRanges;
        },
        device:
          graph.rendererType === 'webgl-3d'
            ? (graph.canvas.context as any).deviceRendererPlugin.getDevice()
            : undefined,
      });
      // ------- for integration tests -------
      comboItem.getCombinedBounds = getCombinedBounds;
      comboItem.getChildren = getChildren;
      comboItem.type = 'combo';
      // ------- for integration tests end-------

      itemMap.set(combo.id, comboItem);
    });
  }

  /**
   * Create edges with inner data to canvas.
   * @param models edges' inner data
   * @param edgeTheme
   * @param tileOptimize
   * @param tileOptimize.tileFirstRender
   * @param tileOptimize.tileFirstRenderSize
   * @param nodesInView
   */
  private renderEdges(
    models: EdgeModel[],
    edgeTheme: EdgeThemeSpecifications = {},
    tileOptimize?: {
      tileFirstRender?: boolean | number;
      tileFirstRenderSize?: number;
    },
    nodesInView?: Node[],
  ): Promise<any> | undefined {
    const { edgeExtensions, edgeGroup, edgeLabelGroup, itemMap, edgeDataTypeSet, graph } = this;
    const { dataTypeField = '' } = edgeTheme;
    const { tileFirstRender, tileFirstRenderSize = 1000 } = tileOptimize || {};
    const zoom = graph.getZoom();
    const nodeMap = filterItemMapByType(itemMap, 'node') as Map<ID, Node>;
    const delayFirstDraw = isNumber(tileFirstRender) ? models.length > tileFirstRender : tileFirstRender;
    const nodesInViewIds = new Set(nodesInView?.map((node) => node.getID()));
    const edgesInView = [];
    const edgesOutView = [];
    models.forEach((edge) => {
      const { source, target, id } = edge;
      const sourceItem = itemMap.get(source) as Node;
      const targetItem = itemMap.get(target) as Node;
      if (!sourceItem) {
        this.cacheWarnMsg[WARN_TYPE.SOURCE_NOT_EXIST] = this.cacheWarnMsg[WARN_TYPE.SOURCE_NOT_EXIST] || [];
        this.cacheWarnMsg[WARN_TYPE.SOURCE_NOT_EXIST].push({ id, source });
        // @ts-ignore
        this.debounceWarn(WARN_TYPE.SOURCE_NOT_EXIST);
        return;
      }
      if (!targetItem) {
        this.cacheWarnMsg[WARN_TYPE.TARGET_NOT_EXIST] = this.cacheWarnMsg[WARN_TYPE.TARGET_NOT_EXIST] || [];
        this.cacheWarnMsg[WARN_TYPE.TARGET_NOT_EXIST].push({ id, source });
        // @ts-ignore
        this.debounceWarn(WARN_TYPE.TARGET_NOT_EXIST);
        return;
      }
      // get the base styles from theme
      let dataType;
      if (dataTypeField) dataType = edge.data[dataTypeField] as string;
      const itemTheme = getItemTheme(edgeDataTypeSet, dataTypeField, dataType, edgeTheme);
      const edgeItem = new Edge({
        graph,
        delayFirstDraw,
        model: edge,
        renderExtensions: edgeExtensions,
        containerGroup: edgeGroup,
        labelContainerGroup: edgeLabelGroup,
        mapper: this.edgeMapper as DisplayMapper,
        stateMapper: this.edgeStateMapper as {
          [stateName: string]: DisplayMapper;
        },
        sourceItem,
        targetItem,
        nodeMap,
        zoom,
        theme: itemTheme as {
          styles: EdgeStyleSet;
          lodLevels: LodLevelRanges;
        },
      });

      itemMap.set(id, edgeItem);
      if (nodesInViewIds.has(source) || nodesInViewIds.has(target)) edgesInView.push(edgeItem);
      else edgesOutView.push(edgeItem);
      return edgeItem;
    });

    if (delayFirstDraw) {
      let requestId;
      const sectionNum = Math.ceil(edgesOutView.length / tileFirstRenderSize);
      const sections = Array.from({ length: sectionNum }, (v, i) =>
        edgesOutView.slice(i * tileFirstRenderSize, i * tileFirstRenderSize + tileFirstRenderSize),
      );
      sections.unshift(edgesInView);
      const update = (resolve) => {
        if (!sections.length) {
          cancelAnimationFrame(requestId);
          return resolve();
        }
        sections.shift().forEach((item) => item.draw(item.displayModel));
        requestId = requestAnimationFrame(() => update(resolve));
      };
      return new Promise((resolve) => {
        requestId = requestAnimationFrame(() => update(resolve));
      });
    }
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
    this.itemMap.forEach((item) => {
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
    const item = this.itemMap.get(id);
    if (!item) {
      this.cacheWarnMsg[WARN_TYPE.FAIL_GET_STATE] = this.cacheWarnMsg[WARN_TYPE.FAIL_GET_STATE] || [];
      this.cacheWarnMsg[WARN_TYPE.FAIL_GET_STATE].push(id);
      // @ts-ignore
      this.debounceWarn(WARN_TYPE.FAIL_GET_STATE);
      return false;
    }
    return item.hasState(state);
  }

  public getItemAllStates(id: ID): string[] {
    const item = this.itemMap.get(id);
    if (!item) {
      this.cacheWarnMsg[WARN_TYPE.FAIL_GET_STATE] = this.cacheWarnMsg[WARN_TYPE.FAIL_GET_STATE] || [];
      this.cacheWarnMsg[WARN_TYPE.FAIL_GET_STATE].push(id);
      // @ts-ignore
      this.debounceWarn(WARN_TYPE.FAIL_GET_STATE);
      return [];
    }
    return item
      .getStates()
      .filter(({ value }) => value)
      .map(({ name }) => name);
  }

  public getItemById(id: ID) {
    return this.itemMap.get(id);
  }

  public getItemBBox(id: ID, isKeyShape = false, isTransient = false): AABB | false {
    const item = isTransient ? this.transientItemMap.get(id) : this.itemMap.get(id);
    if (!item) {
      this.cacheWarnMsg[WARN_TYPE.FAIL_GET_BBOX] = this.cacheWarnMsg[WARN_TYPE.FAIL_GET_BBOX] || [];
      this.cacheWarnMsg[WARN_TYPE.FAIL_GET_BBOX].push(id);
      // @ts-ignore
      this.debounceWarn(WARN_TYPE.FAIL_GET_BBOX);
      return false;
    }
    if (item instanceof Group) return item.getRenderBounds();
    return isKeyShape ? item.getKeyBBox() : item.getBBox();
  }

  public getItemVisibleShapeIds(id: ID) {
    const item = this.itemMap.get(id);
    const shapeIds = [];
    Object.keys(item.shapeMap).forEach((shapeId) => {
      if (item.shapeMap[shapeId]?.attributes.visibility !== 'hidden') shapeIds.push(shapeId);
    });
    return shapeIds;
  }

  private debounceWarn = debounce(
    (type) => {
      const msg = getWarnMsg[type](this.cacheWarnMsg[type]);
      console.warn(msg);
      this.cacheWarnMsg[type] = [];
    },
    16,
    false,
  );

  public getItemVisible(id: ID) {
    const item = this.itemMap.get(id);
    if (!item) {
      this.cacheWarnMsg[WARN_TYPE.FAIL_GET_VISIBLE] = this.cacheWarnMsg[WARN_TYPE.FAIL_GET_VISIBLE] || [];
      this.cacheWarnMsg[WARN_TYPE.FAIL_GET_VISIBLE].push(id);
      // @ts-ignore
      this.debounceWarn(WARN_TYPE.FAIL_GET_VISIBLE);

      return false;
    }
    const transientVisible = this.transientItemMap.get(id);
    return item.isVisible() || transientVisible?.isVisible();
  }

  public sortByComboTree(graphCore: GraphCore) {
    if (!graphCore.hasTreeStructure('combo')) return;
    graphCoreTreeDfs(graphCore, graphCore.getRoots('combo'), (node) => {
      const nodeItem = this.itemMap.get(node.id);
      if (node.data._isCombo && nodeItem) {
        nodeItem.toFront();
      }
    });
  }

  private collapseCombo(graphCore: GraphCore, comboModel: ComboModel) {
    let relatedEdges: EdgeModel[] = [];
    const succeedIds: ID[] = [];
    // find the succeeds in collapsed
    graphComboTreeDfs(this.graph, [comboModel], (child) => {
      if (child.id !== comboModel.id) {
        this.graph.executeWithNoStack(() => {
          this.graph.hideItem(child.id, { disableAnimate: false });
        });
      }
      relatedEdges = relatedEdges.concat(graphCore.getRelatedEdges(child.id));
      succeedIds.push(child.id);
    });
    const pairs = [];
    uniq(relatedEdges).forEach((edge) => {
      const { id, source: s, target: t } = edge;
      if (!this.graph.getItemVisible(id)) return;
      const sourceIsSucceed = succeedIds.includes(s);
      const targetIsSucceed = succeedIds.includes(t);
      // do not add virtual edge if the source and target are both the succeed
      if (sourceIsSucceed && targetIsSucceed) return;
      const source = sourceIsSucceed ? comboModel.id : s;
      const target = targetIsSucceed ? comboModel.id : t;
      pairs.push({ source, target });
    });
    // each item in groupedEdges is a virtual edge
    this.graph.executeWithNoStack(() => {
      this.graph.addData('edge', groupVirtualEdges(pairs));
    });
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
    const relatedVirtualEdgeIds: ID[] = [];
    let edgesToShow: ID[] = [];
    const nodesToShow: ID[] = [];
    // show the succeeds and remove the related virtual edges, including the succeeds' related edges
    graphComboTreeDfs(this.graph, [comboModel], (child) => {
      graphCore.getRelatedEdges(child.id).forEach((edge) => {
        if (edge.data._virtual) relatedVirtualEdgeIds.push(edge.id);
        else edgesToShow.push(edge.id);
      });
      if (child.id !== comboModel.id) {
        if (!graphCore.getNode(child.data.parentId).data.collapsed) {
          nodesToShow.push(child.id);
        }
        // re-add collapsed succeeds' virtual edges by calling collapseCombo
        if (child.data._isCombo && child.data.collapsed) {
          this.collapseCombo(graphCore, child);
        }
      }
    });
    const virtualPairs = [];
    const visibleAncestorMap = new Map();
    edgesToShow = uniq(
      edgesToShow.filter((eid) => {
        const { source, target } = graphCore.getEdge(eid);
        const ends = { source, target };
        const endsVisible = {
          source: this.graph.getItemVisible(source) || nodesToShow.includes(source),
          target: this.graph.getItemVisible(target) || nodesToShow.includes(target),
        };
        // actual edges to show
        if (endsVisible.source && endsVisible.target) return true;

        // add virtual edges by finding the visible ancestor
        const virtualEnds = { source: undefined, target: undefined };
        Object.keys(virtualEnds).forEach((end) => {
          if (!endsVisible[end]) {
            if (!visibleAncestorMap.get(ends[end])) {
              traverseAncestors(graphCore, [graphCore.getNode(ends[end])], (ancestor) => {
                if (visibleAncestorMap.has(ends[end])) return;
                if (this.graph.getItemVisible(ancestor.id) || nodesToShow.includes(ancestor.id))
                  visibleAncestorMap.set(ends[end], ancestor.id);
              });
            }
            virtualEnds[end] = visibleAncestorMap.get(ends[end]);
          } else {
            virtualEnds[end] = ends[end];
          }
        });
        if (virtualEnds.source !== undefined && virtualEnds.target !== undefined) {
          virtualPairs.push(virtualEnds);
        }
        return false;
      }),
    );

    // remove related virtual edges
    this.graph.executeWithNoStack(() => {
      this.graph.removeData('edge', uniq(relatedVirtualEdgeIds));
      this.graph.showItem(edgesToShow.concat(nodesToShow));
      // add virtual edges by grouping visible ancestor edges
      this.graph.addData('edge', groupVirtualEdges(virtualPairs));
    });
  }

  /**
   * Collapse or expand a sub tree according to action
   * @param params
   * @param params.ids
   * @param params.animate
   * @param params.action
   * @param params.graphCore
   */
  private onTreeCollapseExpand(params: {
    ids: ID[];
    animate: boolean;
    action: 'collapse' | 'expand';
    graphCore: GraphCore;
  }) {
    const { ids, animate, action, graphCore } = params;
    const rootModels = ids.map((id) => graphCore.getNode(id));
    switch (action) {
      case 'collapse':
        this.collapseSubTree(rootModels, graphCore, animate);
        break;
      case 'expand':
      default:
        this.expandSubTree(rootModels, graphCore, animate);
        break;
    }
  }

  /**
   * Collapse sub tree(s).
   * @param rootModels The root node models of sub trees
   * @param graphCore
   * @param animate Whether enable animations for expanding, true by default
   */
  private collapseSubTree(rootModels: NodeModel[], graphCore: GraphCore, animate = true) {
    let positions = [];
    rootModels.forEach((root) => {
      let shouldCollapse = true;
      const nodes = [];
      graphCoreTreeDfs(
        graphCore,
        [root],
        (node) => {
          if (node.id === root.id) return;
          const neighbors = graphCore.getNeighbors(node.id);
          if (!graphCore.getChildren(node.id, 'tree')?.length && neighbors.length > 1) {
            shouldCollapse = false;
          }
          nodes.push(node);
        },
        'TB',
        'tree',
        {
          stopAllFn: () => !shouldCollapse,
        },
      );
      if (shouldCollapse) {
        positions = positions.concat(
          nodes.map((node) => ({
            id: node.id,
            data: { x: root.data.x, y: root.data.y },
          })),
        );
      }
    });
    if (!positions.length) return;
    this.graph.updateNodePosition(positions, undefined, !animate, (model, canceled) => {
      positions.forEach((position) => {
        this.graph.hideItem(position.id, { disableAnimate: canceled });
      });
    });
  }

  /**
   * Expand sub tree(s).
   * @param rootModels The root node models of sub trees.
   * @param graphCore
   * @param animate Whether enable animations for expanding, true by default.
   * @returns
   */
  private async expandSubTree(rootModels: NodeModel[], graphCore: GraphCore, animate = true) {
    let allNodeIds = [];
    let allEdgeIds = [];
    rootModels.forEach((root) => {
      const nodeIds = [];
      graphCoreTreeDfs(graphCore, [root], (node) => nodeIds.push(node.id), 'TB', 'tree', {
        stopBranchFn: (node) => {
          const shouldStop = node.id !== root.id && (node.data.collapsed as boolean);
          if (shouldStop) nodeIds.push(node.id);
          return shouldStop;
        },
      });
      allEdgeIds = allEdgeIds.concat(
        graphCore
          .getAllEdges()
          .filter((edge) => nodeIds.includes(edge.source) && nodeIds.includes(edge.target))
          .map((edge) => edge.id),
      );
      allNodeIds = allNodeIds.concat(nodeIds.filter((id) => id !== root.id));
    });
    const ids = uniq(allNodeIds.concat(allEdgeIds));
    this.graph.showItem(ids, { disableAnimate: !animate });
    await this.graph.layout(undefined, !animate);
  }
}

const getItemTheme = (
  dataTypeSet: Set<string>,
  dataTypeField: string,
  dataType: string,
  itemTheme: NodeThemeSpecifications | EdgeThemeSpecifications | ComboThemeSpecifications,
): {
  styles: NodeStyleSet | EdgeStyleSet;
  lodLevels?: LodLevelRanges;
} => {
  const { styles: themeStyles = [], lodLevels } = itemTheme;
  const formattedLodLevels = formatLodLevels(lodLevels);
  if (!dataTypeField) {
    // dataType field is not assigned
    const styles = isArray(themeStyles) ? themeStyles[0] : Object.values(themeStyles)[0];
    return { styles, lodLevels: formattedLodLevels };
  }
  dataTypeSet.add(dataType as string);
  let themeStyle;
  if (isArray(themeStyles)) {
    const themeStylesLength = themeStyles.length as number;
    const idx = Array.from(dataTypeSet).indexOf(dataType);
    themeStyle = themeStyles[idx % themeStylesLength];
  } else if (isObject(themeStyles)) {
    themeStyle = themeStyles[dataType] || (themeStyles as { [dataTypeValue: string]: NodeStyleSet }).others;
  }
  return {
    styles: themeStyle,
    lodLevels: formattedLodLevels,
  };
};

const filterItemMapByType = (
  itemMap: Map<ID, Node | Edge | Combo>,
  type: ITEM_TYPE | ITEM_TYPE[],
): Map<ID, Node | Edge | Combo | Group> => {
  const filteredMap = new Map<ID, Node | Edge | Combo | Group>();
  itemMap.forEach((value, key) => {
    if (value.type === type) {
      filteredMap.set(key, value);
    }
  });
  return filteredMap;
};

const groupVirtualEdges = (pairs) => {
  const groupedVirtualEdges = new Map();
  pairs.forEach((edge) => {
    const { source, target } = edge;
    const key = `${source}_${target}`;
    const group = groupedVirtualEdges.get(key) || {
      edges: [],
      source,
      target,
    };
    group.edges.push(edge);
    groupedVirtualEdges.set(key, group);
  });
  // each item in groupedEdges is a virtual edge
  const virtualEdges: EdgeModel[] = [];
  groupedVirtualEdges.forEach((group) => {
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
  return virtualEdges;
};
