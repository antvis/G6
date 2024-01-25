import { AABB, Canvas, DisplayObject, Group } from '@antv/g';
import { AmbientLight, DirectionalLight } from '@antv/g-plugin-3d';
import { ID } from '@antv/graphlib';
import { debounce, isArray, isNumber, isObject, uniq, uniqueId } from '@antv/util';
import { getPlugins } from '../../../plugin/register';
import type { ComboData, EdgeData, NodeData } from '../../../spec/data';
import { ComboOptions, EdgeOptions, NodeOptions } from '../../../spec/element';
import { ComboModel, Graph, NodeDisplayModel, NodeModel, NodeModelData, NodeShapesEncode } from '../../../types';
import { ComboDisplayModel, ComboShapesEncode } from '../../../types/combo';
import { DataModel } from '../../../types/data';
import { EdgeDisplayModel, EdgeModel, EdgeRegistry, EdgeShapesEncode } from '../../../types/edge';
import { DisplayMapper, ItemType, LodLevelRanges, SHAPE_TYPE, ShapeStyle } from '../../../types/item';
import { NodeRegistry } from '../../../types/node';
import { EdgeStyleSet, NodeStyleSet } from '../../../types/theme';
import { isBBoxInBBox, isPointInBBox } from '../../../utils/bbox';
import {
  graphComboTreeDFS,
  graphCoreTreeDFS,
  traverseAncestors,
  traverseAncestorsAndSucceeds,
  traverseGraphAncestors,
} from '../../../utils/data';
import { getGroupedChanges } from '../../../utils/event';
import { warn } from '../../../utils/invariant';
import { upsertTransientItem } from '../../../utils/item';
import { getCombinedBoundsByData, intersectBBox, upsertShape } from '../../../utils/shape';
import { convertToNumber } from '../../../utils/type';
import { formatLodLevels } from '../../../utils/zoom';
import type {
  ItemChangeParams,
  ItemStateChangeParams,
  ItemZIndexChangeParams,
  MapperChangeParams,
  RenderParams,
  RuntimeContext,
  ViewportChangeParams,
} from '../../hooks';
import type { ComboManager } from './manager/combo';
import type { EdgeManager } from './manager/edge';
import type { NodeManager } from './manager/node';

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
  public graph: Graph;
  public nodeExtensions: NodeRegistry = {};
  public edgeExtensions: EdgeRegistry = {};
  public comboExtensions: NodeRegistry = {};

  public zoom: number;

  /**
   * Node / edge / combo items map
   */
  private itemMap: Map<ID, NodeManager | EdgeManager | ComboManager> = new Map<
    ID,
    NodeManager | EdgeManager | ComboManager
  >();

  /**
   * node / edge / combo 's mapper in graph config
   */
  private nodeMapper: NodeOptions;
  private edgeMapper: EdgeOptions;
  private comboMapper: ComboOptions;

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
  private transientItemMap: Map<ID, NodeManager | EdgeManager | ComboManager | Group> = new Map<
    ID,
    NodeManager | EdgeManager | ComboManager | Group
  >();
  /** Caches */
  private nearEdgesCache: Map<ID, EdgeModel[]> = new Map<ID, EdgeModel[]>();

  private cacheViewItems: {
    inView: (NodeManager | EdgeManager | ComboManager)[];
    outView: (NodeManager | EdgeManager | ComboManager)[];
  };

  private cacheWarnMsg = {};

  constructor(graph: Graph) {
    this.graph = graph;
    // get mapper for node / edge / combo
    const { node, edge, combo } = graph.getOptions();
    this.nodeMapper = node;
    this.edgeMapper = edge;
    this.comboMapper = combo;

    this.tap();
  }

  /**
   * Subscribe the lifecycle of graph.
   */
  private tap() {
    // item extensions are node / edge / combo type registrations
    this.nodeExtensions = getPlugins('node');
    this.edgeExtensions = getPlugins('edge');
    this.comboExtensions = getPlugins('combo');
    this.graph.hooks.render.tap(this.onRender.bind(this));
    // this.graph.hooks.itemchange.tap(this.onChange.bind(this));
    this.graph.hooks.itemstatechange.tap(this.onItemStateChange.bind(this));
    // itemstateconfigchange 合并到 mapperchange
    // this.graph.hooks.itemstateconfigchange.tap(this.onItemStateConfigChange.bind(this));
    this.graph.hooks.itemvisibilitychange.tap(this.onItemVisibilityChange.bind(this));
    this.graph.hooks.itemzindexchange.tap(this.onItemZIndexChange.bind(this));
    this.graph.hooks.transientupdate.tap(this.onTransientUpdate.bind(this));
    this.graph.hooks.viewportchange.tap(this.onViewportChange.bind(this));
    this.graph.hooks.themechange.tap(this.onThemeChange.bind(this));
    this.graph.hooks.mapperchange.tap(this.onMapperChange.bind(this));
    this.graph.hooks.treecollapseexpand.tap(this.onTreeCollapseExpand.bind(this));
    this.graph.hooks.destroy.tap(this.onDestroy.bind(this));
  }

  private init() {}

  /**
   * Listener of runtime's render hook.
   * @param params
   * @params params contains inner data stored in graphCore structure
   */
  private async onRender(params: RenderParams) {
    console.log('render');
    const { context } = params;
    const { controller } = context;
    const dataController = controller.data;
    const dataModel = dataController.model;
    const { graph } = this;

    const { main, label, transient, transientLabel } = graph.canvas;

    // 0. clear groups on canvas, and create new groups
    graph.canvas.forEach((_, canvas) => {
      canvas.removeChildren();
    });

    this.itemMap.forEach((item) => item.destroy());
    this.itemMap.clear();
    this.comboGroup = main.appendChild(new Group({ id: 'combo-group', style: { zIndex: 0 } }));
    this.edgeGroup = main.appendChild(new Group({ id: 'edge-group', style: { zIndex: 1 } }));
    this.nodeGroup = main.appendChild(new Group({ id: 'node-group', style: { zIndex: 2 } }));
    this.edgeLabelGroup = label.appendChild(new Group({ id: 'node-label-group', style: { zIndex: 0 } }));
    this.nodeLabelGroup = label.appendChild(new Group({ id: 'node-label-group', style: { zIndex: 1 } }));

    // Also create transient groups on transient canvas.
    this.transientComboGroup = transient.appendChild(new Group({ id: 'combo-group', style: { zIndex: 0 } }));
    this.transientEdgeGroup = transient.appendChild(new Group({ id: 'edge-group', style: { zIndex: 1 } }));
    this.transientNodeGroup = transient.appendChild(new Group({ id: 'node-group', style: { zIndex: 2 } }));

    this.transientEdgeLabelGroup = transientLabel.appendChild(
      new Group({ id: 'node-label-group', style: { zIndex: 0 } }),
    );
    this.transientNodeLabelGroup = transientLabel.appendChild(
      new Group({ id: 'node-label-group', style: { zIndex: 1 } }),
    );

    // 1. create lights for webgl 3d rendering
    if (graph.canvas.getRendererType() === 'gpu') {
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

    const renderNodesPromise = this.renderNodes(graph.getNodeData(), context);

    // let nodesInView;
    // if (renderNodesPromise) {
    //   nodesInView = await renderNodesPromise;
    // }
    // this.renderCombos(graph.getComboData(), context);
    // const renderEdgesPromise = this.renderEdges(dataController.getEdgeData(), context, nodesInView);
    // if (renderEdgesPromise) {
    //   await renderEdgesPromise;
    // }
    // this.sortByComboTree(dataModel);
    // // collapse the combos which has 'collapsed' in initial data
    // if (dataModel.hasTreeStructure('combo')) {
    //   graphCoreTreeDfs(
    //     dataModel,
    //     dataModel.getRoots('combo'),
    //     (child) => {
    //       if (child.data.collapsed) this.collapseCombo(dataModel, child);
    //     },
    //     'BT',
    //     'combo',
    //   );
    // }
    // // collapse the sub tree which has 'collapsed' in initial data
    // if (dataModel.hasTreeStructure('tree')) {
    //   const collapseNodes = [];
    //   graphCoreTreeDfs(
    //     dataModel,
    //     dataModel.getRoots('tree'),
    //     (child) => {
    //       if (child.data.collapsed) collapseNodes.push(child);
    //     },
    //     'BT',
    //     'tree',
    //   );
    //   this.collapseSubTree(collapseNodes, dataModel, false);
    // }
  }

  /**
   * Listener of runtime's itemchange lifecycle hook.
   * @param param
   */
  private onChange(param: ItemChangeParams) {
    const { changes, context, action, animate = true, updateAncestors = true, callback = () => {} } = param;
    const { controller } = context;
    const dataController = controller.data;
    const dataModel = controller.data.model;
    const groupedChanges = getGroupedChanges(controller.data.model, changes);
    const { itemMap } = this;
    // change items according to the order of the keys in groupedChanges
    console.log(changes);
    // === 1. remove edges; 2. remove nodes ===
    [...groupedChanges.EdgeRemoved, ...groupedChanges.NodeRemoved].forEach(({ value }) => {
      const { id } = value;
      const item = itemMap.get(id);
      if (item) {
        item.destroy();
        itemMap.delete(id);
      }
    });

    // === 3. add nodes ===
    if (groupedChanges.NodeAdded.length) {
      const newNodes: NodeData[] = [];
      const newCombos: ComboData[] = [];
      groupedChanges.NodeAdded.map((change) => change.value.data).forEach((model) => {
        if (controller.data.isCombo(model.id)) newCombos.push(model as ComboData);
        else newNodes.push(model);
      });
      if (newNodes.length) {
        this.renderNodes(newNodes, context);
      }
      if (newCombos.length) {
        this.renderCombos(newCombos, context);
      }
    }
    // === 4. add edges ===
    if (groupedChanges.EdgeAdded.length) {
      this.renderEdges(
        groupedChanges.EdgeAdded.map((change) => change.value.data),
        context,
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

      const edgeIdsToUpdate: Set<ID> = new Set<ID>();
      const comboIdsToUpdate: Set<ID> = new Set<ID>();
      const updateRelates = (param: { edgeIds?: Set<ID>; callback?: any }) => {
        const { edgeIds, callback } = param;
        edgeIds.forEach((nid) => {
          const item = itemMap.get(nid) as EdgeManager | ComboManager;
          if (item && !item.destroyed) item.forceUpdate();
        });
        callback?.();
      };
      const updateAllRelates = () => {
        [...comboIdsToUpdate, ...edgeIdsToUpdate].forEach((nid) => {
          const item = itemMap.get(nid) as EdgeManager | ComboManager;
          if (item && !item.destroyed) item.forceUpdate();
        });
      };
      const debounceUpdateAllRelates = debounce(updateAllRelates, 16, false);
      const debounceUpdateRelates = debounce(updateRelates, 16, false);

      Object.values(nodeComboUpdate).forEach((updateObj: any) => {
        const { isReplace, previous, current, id } = updateObj;
        if (!controller.data.hasNode(id)) return;
        const onlyMove = action === 'updatePosition';
        const item = itemMap.get(id) as NodeManager | ComboManager;
        if (!item || item.destroyed) return;
        const type = item.getType();
        const [datum] = controller.data.getNodeData([id]);
        if (type === 'node' && onlyMove) {
          const { x, y, fx, fy } = current;
          if (isNaN(x) && isNaN(y) && isNaN(fx) && isNaN(fy)) {
            callback(datum, true);
            return;
          }
        }

        const nodeRelatedIdsToUpdate: Set<ID> = new Set<ID>();
        // collapse and expand
        if (controller.data.model.hasTreeStructure('combo')) {
          if (type === 'combo' && current.collapsed !== previous.collapsed) {
            if (current.collapsed) {
              this.collapseCombo(dataModel, datum);
            } else if (current.collapsed === false) {
              this.expandCombo(dataModel, datum);
            }
          }
          const previousParentId = item.displayModel.data.parentId || previous.parentId;
          // update the current parent combo tree
          // if the node has previous parent, related previous parent combo should be updated to
          if (updateAncestors) {
            const begins = [datum];
            if (
              previousParentId &&
              previousParentId !== current.parentId &&
              dataModel.hasNode(previousParentId as ID)
            ) {
              begins.push(dataController.getNodeData([previousParentId as ID]));
            }
            // ancestors and suceeds combos should be updated
            traverseAncestorsAndSucceeds(this.graph, dataModel, begins, (treeItem) => {
              if (treeItem.data._isCombo && treeItem.id !== datum.id) comboIdsToUpdate.add(treeItem.id);
              const relatedEdges = dataModel.getRelatedEdges(treeItem.id);
              relatedEdges.forEach((edge) => {
                edgeIdsToUpdate.add(edge.id);
                nodeRelatedIdsToUpdate.add(edge.id);
              });
            });
          } else if (type === 'combo') {
            // only the succeed combos should be updated
            graphComboTreeDFS(this.graph, [datum], (child) => {
              const relatedEdges = dataModel.getRelatedEdges(child.id);
              relatedEdges.forEach((edge) => {
                edgeIdsToUpdate.add(edge.id);
                nodeRelatedIdsToUpdate.add(edge.id);
              });
              if (child.data._isCombo && child.id !== datum.id) comboIdsToUpdate.add(child.id);
            });
          }
        }

        // update the theme if the dataType value is changed

        const adjacentEdgeInnerModels = dataModel.getRelatedEdges(id);

        // if (isPointPreventPolylineOverlap(innerModel)) {
        //   const newNearEdges = this.graph.getNearEdgesData(id, (edge) => isPolylineWithObstacleAvoidance(edge));
        //   const prevNearEdges = this.nearEdgesCache.get(id) || [];
        //   adjacentEdgeInnerModels.push(...newNearEdges);
        //   adjacentEdgeInnerModels.push(...prevNearEdges);
        //   this.nearEdgesCache.set(id, newNearEdges);
        // }

        adjacentEdgeInnerModels.forEach((edge) => {
          edgeIdsToUpdate.add(edge.id);
          nodeRelatedIdsToUpdate.add(edge.id);
        });

        item.onframe = () => updateRelates({ edgeIds: nodeRelatedIdsToUpdate });
        let statesCache;
        if (datum.data._isCombo && previous.collapsed !== current.collapsed) {
          statesCache = this.graph.getItemAllStates(id);
          this.graph.clearItemState(id);
        }
        item.update(
          datum,
          { previous, current },
          isReplace,
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
              callback: () => callback(datum, canceled),
            });
          },
        );

        const parentItem = this.itemMap.get(current.parentId);
        if (current.parentId && parentItem?.model.data.collapsed) {
          this.graph.hideItem(datum.id, { disableAnimate: false });
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
        const innerModel = controller.data.getEdgeData(id);
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
        const item = itemMap.get(id) as EdgeManager;
        if (source !== undefined) item.updateEnd('source', this.itemMap.get(source) as NodeManager);
        if (target !== undefined) item.updateEnd('target', this.itemMap.get(target) as NodeManager);
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

  private onItemStateChange(param: ItemStateChangeParams) {
    const { value } = param;
    Object.entries(value).forEach(([id, states]) => {
      const item = this.itemMap.get(id);
      if (item) {
        item.setState(states);
      }
    });
  }

  private onItemStateConfigChange(param: {
    itemType: ItemType;
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
    this.graph.getNodeData().forEach((node) => {
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
    graphCore: DataModel;
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
          (item as EdgeManager).forceUpdate();
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
            if (this.getItemVisibility(source) && this.getItemVisibility(target))
              this.itemMap.get(edgeId)?.show(animate);
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

  private onItemZIndexChange(params: ItemZIndexChangeParams) {
    const { ids = [], value, controller } = params;
    ids.forEach((id) => {
      const item = this.itemMap.get(id);
      if (!item) return;
      if (value === 'top') {
        item.toFront();
        if (controller.data.model.hasTreeStructure('combo')) {
          graphComboTreeDFS(
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
      } else if (value === 'bottom') {
        item.toBack();
        if (controller.data.model.hasTreeStructure('combo')) {
          traverseGraphAncestors(this.graph, [item.model], (model) => {
            this.itemMap.get(model.id)?.toBack();
          });
        }
      } else {
        // TODO value is number
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
        // @ts-expect-error TODO: Need to fix the type
        if (containFunc(renderBounds, range, 0.4)) itemsInView.push(item);
        else itemsOutView.push(item);
      });
    } else if (ratio < 1) {
      // zoom-out
      itemsOutView.forEach((item) => {
        const { keyShape } = item.shapeMap;
        if (!keyShape) return;
        const renderBounds = keyShape.getRenderBounds();
        // @ts-expect-error TODO: Need to fix the type
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
        // @ts-expect-error TODO: Need to fix the type
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
    ({ transform, effectTiming, tileLodSize = 1000 }: ViewportChangeParams) => {
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

  private onMapperChange = ({ type, mapper }: MapperChangeParams) => {
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
    type: ItemType | SHAPE_TYPE;
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
      updateAncestors?: boolean;
      visible?: boolean;
      [shapeConfig: string]: unknown;
    };
    canvas: Canvas;
    graphCore: DataModel;
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
      updateAncestors,
      visible = true,
    } = config as any;
    const isItemType = type === 'node' || type === 'edge' || type === 'combo';
    // Removing
    if (action === 'remove') {
      if (isItemType) {
        const transientItem = this.transientItemMap.get(id);
        if (type === 'combo') {
          // remove children from bottom to top
          graphCoreTreeDFS(
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
          if (!(transientItem as NodeManager | EdgeManager | ComboManager).getType?.()) {
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
        updateAncestors,
      );
      if (shapeIds) {
        // only update node positions to cloned node container(group)
        if ((type === 'node' || type === 'combo') && 'x' in data && 'y' in data) {
          const { x, y } = data;
          (transientItem as Group).setPosition([x, y]);
        }
        // TODO: edge onlyDrawKeyShape?
      } else {
        const transItem = transientItem as NodeManager | EdgeManager | ComboManager;
        const positionChanged = 'x' in data && 'y' in data;
        if (type === 'combo' && positionChanged) {
          const { x, y } = data;
          const { x: ox = x, y: oy = y } = transItem.displayModel.data;
          const dx = x - ox;
          const dy = y - oy;
          // move combo = move children nodes from bottom to top
          graphCoreTreeDFS(
            graphCore,
            [transItem.model],
            (node) => {
              const transChild = this.transientItemMap.get(node.id) as NodeManager;
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
            if (ancestorItem) (ancestorItem as ComboManager).forceUpdate();
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
            const transientEdge = this.transientItemMap.get(relatedEdge.id) as EdgeManager;
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
   * @param nodes
   * @param context
   */
  private async renderNodes(nodes: NodeData[], context: RuntimeContext): Promise<void> {
    console.log('render nodes');
    const { options, controller, graph } = context;

    const { nodeExtensions, nodeGroup, nodeLabelGroup } = this;
    const { tileFirstRender, tileFirstRenderSize = 1000 } = options?.optimize || {};
    const zoom = graph.getZoom();
    const delayFirstDraw = isNumber(tileFirstRender) ? nodes.length > tileFirstRender : tileFirstRender;
    const itemsInView = [];
    const itemsOutView = [];
    const viewRange = this.graph.getCanvasRange();
    nodes.forEach((node) => {
      // get the base styles from theme

      const nodeItem = new NodeManager({
        graph,
        delayFirstDraw,
        model: node,
        renderExtensions: nodeExtensions,
        containerGroup: nodeGroup,
        labelContainerGroup: nodeLabelGroup,
        mapper: this.nodeMapper,
        // stateMapper: this.nodeStateMapper,
        zoom,
        device: graph.canvas.getDevice(),
      });

      this.itemMap.set(node.id, nodeItem);
      const { x, y } = nodeItem.model.data;
      // @ts-expect-error TODO: Need to fix the type
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

  private async renderCombos(combos: ComboData[], context: RuntimeContext): Promise<void> {
    const { controller } = context;
    const dataModel = controller.data.model;

    const { comboExtensions, comboGroup, comboDataTypeSet, graph, itemMap } = this;
    const zoom = graph.getZoom();
    combos.forEach((combo) => {
      // get the base styles from theme

      const getCombinedBounds = () => {
        //  calculate the position of the combo according to its children
        return getCombinedBoundsByData(
          graph,
          dataModel
            .getChildren(combo.id, 'combo')
            .map(({ id }) => itemMap.get(id))
            .filter(Boolean) as (NodeManager | ComboManager)[],
        );
      };
      const getChildren = () => {
        const childModels = dataModel.getChildren(combo.id, 'combo');
        return childModels.map(({ id }) => itemMap.get(id)) as (NodeManager | ComboManager)[];
      };
      const comboItem = new ComboManager({
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
        // theme: itemTheme as {
        //   styles: ComboStyleSet;
        //   lodLevels: LodLevelRanges;
        // },
        device: graph.canvas.getDevice(),
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
   * @param edges edges' inner data
   * @param edgeTheme
   * @param tileOptimize
   * @param tileOptimize.tileFirstRender
   * @param tileOptimize.tileFirstRenderSize
   * @param context
   * @param nodesInView
   */
  private renderEdges(
    edges: EdgeData[],
    context: RuntimeContext,
    nodesInView?: NodeManager[],
  ): Promise<any> | undefined {
    const { edgeExtensions, edgeGroup, edgeLabelGroup, itemMap, edgeDataTypeSet } = this;
    const { graph, options } = context;
    const { tileFirstRender, tileFirstRenderSize = 1000 } = options?.optimize || {};
    const zoom = graph.getZoom();
    const nodeMap = filterItemMapByType(itemMap, 'node') as Map<ID, NodeManager>;
    const delayFirstDraw = isNumber(tileFirstRender) ? edges.length > tileFirstRender : tileFirstRender;
    const nodesInViewIds = new Set(nodesInView?.map((node) => node.getID()));
    const edgesInView = [];
    const edgesOutView = [];
    edges.forEach((edge) => {
      const { source, target, id } = edge;
      const sourceItem = itemMap.get(source) as NodeManager;
      const targetItem = itemMap.get(target) as NodeManager;
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

      const edgeItem = new EdgeManager({
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
        // theme: itemTheme as {
        //   styles: EdgeStyleSet;
        //   lodLevels: LodLevelRanges;
        // },
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
  public findIdByState(itemType: ItemType, state: string, value: string | boolean = true): ID[] {
    const ids: ID[] = [];
    this.itemMap.forEach((item) => {
      if (item.getType() !== itemType) return;
      if (item.hasState(state) === value) ids.push(item.getID());
    });
    return ids;
  }

  public getItemState(id: ID) {
    const item = this.itemMap.get(id);
    if (!item) return [];
    return item.getStates();
  }

  public getItemById(id: ID) {
    return this.itemMap.get(id);
  }

  public getItemBBox(id: ID): AABB {
    const item = this.itemMap.get(id);
    if (!item) {
      throw new Error(`The item with id ${id} does not exist.`);
    }
    if (item instanceof Group) return item.getRenderBounds();
    return item.getBBox();
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
      warn(msg);
      this.cacheWarnMsg[type] = [];
    },
    16,
    false,
  );

  public getItemVisibility(id: ID) {
    const item = this.itemMap.get(id);
    if (!item) {
      return 'hidden';
    }
    const transientItem = this.transientItemMap.get(id);

    if (transientItem) return transientItem.isVisible() ? 'visible' : 'hidden';

    return item.isVisible() ? 'visible' : 'hidden';
  }

  public sortByComboTree(graphCore: DataModel) {
    if (!graphCore.hasTreeStructure('combo')) return;
    graphCoreTreeDFS(graphCore, graphCore.getRoots('combo'), (node) => {
      const nodeItem = this.itemMap.get(node.id);
      if (node.data._isCombo && nodeItem) {
        nodeItem.toFront();
      }
    });
  }

  private collapseCombo(graphCore: DataModel, comboModel: ComboData) {
    let relatedEdges: EdgeModel[] = [];
    const succeedIds: ID[] = [];
    // find the succeeds in collapsed
    graphComboTreeDFS(this.graph, [comboModel], (child) => {
      if (child.id !== comboModel.id) {
        this.graph.hideItem(child.id, { disableAnimate: false });
      }
      relatedEdges = relatedEdges.concat(graphCore.getRelatedEdges(child.id));
      succeedIds.push(child.id);
    });
    const pairs = [];
    uniq(relatedEdges).forEach((edge) => {
      const { id, source: s, target: t } = edge;
      if (!this.graph.getItemVisibility(id)) return;
      const sourceIsSucceed = succeedIds.includes(s);
      const targetIsSucceed = succeedIds.includes(t);
      // do not add virtual edge if the source and target are both the succeed
      if (sourceIsSucceed && targetIsSucceed) return;
      const source = sourceIsSucceed ? comboModel.id : s;
      const target = targetIsSucceed ? comboModel.id : t;
      pairs.push({ source, target });
    });
    // each item in groupedEdges is a virtual edge
    this.graph.addData('edge', groupVirtualEdges(pairs));
  }

  private expandCombo(graphCore: DataModel, comboModel: ComboData) {
    let isAncestorCollapsed = false;
    traverseAncestors(graphCore, [comboModel], (ancestor) => {
      if (ancestor.data.collapsed) {
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
    graphComboTreeDFS(this.graph, [comboModel], (child) => {
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
          source: this.graph.getItemVisibility(source) || nodesToShow.includes(source),
          target: this.graph.getItemVisibility(target) || nodesToShow.includes(target),
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
                if (this.graph.getItemVisibility(ancestor.id) || nodesToShow.includes(ancestor.id))
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
    this.graph.removeData('edge', uniq(relatedVirtualEdgeIds));
    this.graph.showItem(edgesToShow.concat(nodesToShow));
    // add virtual edges by grouping visible ancestor edges
    this.graph.addData('edge', groupVirtualEdges(virtualPairs));
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
    graphCore: DataModel;
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
  private collapseSubTree(rootModels: NodeModel[], graphCore: DataModel, animate = true) {
    let positions = [];
    rootModels.forEach((root) => {
      let shouldCollapse = true;
      const nodes = [];
      graphCoreTreeDFS(
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
  private async expandSubTree(rootModels: NodeModel[], graphCore: DataModel, animate = true) {
    let allNodeIds = [];
    let allEdgeIds = [];
    rootModels.forEach((root) => {
      const nodeIds = [];
      graphCoreTreeDFS(graphCore, [root], (node) => nodeIds.push(node.id), 'TB', 'tree', {
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
  itemTheme: any,
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
  itemMap: Map<ID, NodeManager | EdgeManager | ComboManager>,
  type: ItemType | ItemType[],
): Map<ID, NodeManager | EdgeManager | ComboManager | Group> => {
  const filteredMap = new Map<ID, NodeManager | EdgeManager | ComboManager | Group>();
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
