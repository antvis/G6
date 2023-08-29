import { Graph as GraphLib, ID } from '@antv/graphlib';
import { clone, isArray, isObject } from '@antv/util';
import { registery as registry } from '../../stdlib';
import { ComboModel, ComboUserModel, GraphData, IGraph } from '../../types';
import { ComboUserModelData } from '../../types/combo';
import {
  DataChangeType,
  DataConfig,
  FetchDataConfig,
  GraphCore,
  InlineGraphDataConfig,
  InlineTreeDataConfig,
} from '../../types/data';
import {
  EdgeModel,
  EdgeModelData,
  EdgeUserModel,
  EdgeUserModelData,
} from '../../types/edge';
import { ITEM_TYPE } from '../../types/item';
import {
  NodeModel,
  NodeModelData,
  NodeUserModel,
  NodeUserModelData,
} from '../../types/node';
import {
  deconstructData,
  graphComboTreeDfs,
  graphData2TreeData,
  traverse,
  treeData2GraphData,
  validateComboStrucutre,
} from '../../util/data';
import { getExtension } from '../../util/extension';
import { convertToNumber } from '../../util/type';
import { isTreeLayout } from '../../util/layout';
import { hasTreeBehaviors } from '../../util/behavior';

/**
 * Manages the data transform extensions;
 * Storages user data and inner data.
 */
export class DataController {
  public graph: IGraph;
  public extensions = [];
  /**
   * User input data.
   */
  public userGraphCore: GraphCore;
  /**
   * Inner data stored in graphCore structure.
   */
  public graphCore: GraphCore;

  /**
   * A flag to note whether the tree data structure should be recalculated and establish.
   */
  private treeDirtyFlag: boolean;

  constructor(graph: IGraph<any, any>) {
    this.graph = graph;
    this.tap();
  }

  public findData(
    type: ITEM_TYPE,
    condition: ID[] | Function,
  ): EdgeModel[] | NodeModel[] | ComboModel[] {
    const { graphCore } = this;
    const conditionType = typeof condition;
    const conditionIsArray = isArray(condition);
    if (
      conditionType === 'string' ||
      conditionType === 'number' ||
      conditionIsArray
    ) {
      const ids = conditionIsArray ? condition : [condition];
      switch (type) {
        case 'node':
          return ids.map((id) => {
            if (!graphCore.hasNode(id)) return undefined;
            const model = graphCore.getNode(id);
            if (model.data._isCombo) return undefined;
            return model;
          });
        case 'edge':
          return ids.map((id) =>
            graphCore.hasEdge(id) ? graphCore.getEdge(id) : undefined,
          );
        case 'combo':
          return ids.map((id) => {
            if (!graphCore.hasNode(id)) return undefined;
            const model = graphCore.getNode(id);
            if (!model.data._isCombo) return undefined;
            return model;
          });
      }
    } else if (conditionType === 'function') {
      const getDatas =
        type === 'node' ? graphCore.getAllNodes : graphCore.getAllEdges;
      if (type === 'combo') {
        // TODO getDatas = ?
      }
      const datas = getDatas() as any;
      return datas.filter((data) => condition(data));
    }
  }

  public findAllData(
    type: ITEM_TYPE,
  ): EdgeModel[] | NodeModel[] | ComboModel[] {
    if (!this.graphCore) return [];
    switch (type) {
      case 'node':
        return this.graphCore.getAllNodes();
      case 'edge':
        return this.graphCore.getAllEdges();
      // case 'combo':
      // TODO
      default:
        return [];
    }
  }

  public findRelatedEdges(
    nodeId: ID,
    direction: 'in' | 'out' | 'both' = 'both',
  ) {
    return this.graphCore.getRelatedEdges(nodeId, direction);
  }
  public findNeighborNodes(
    nodeId: ID,
    direction: 'in' | 'out' | 'both' = 'both',
  ) {
    if (direction === 'in') return this.graphCore.getAncestors(nodeId);
    if (direction === 'out') return this.graphCore.getSuccessors(nodeId);
    return this.graphCore.getNeighbors(nodeId);
  }

  public findChildren(comboId: ID, treeKey: string) {
    if (!this.graphCore.hasNode(comboId)) return;
    return this.graphCore.getChildren(comboId, treeKey);
  }

  /**
   * Subscribe the lifecycle of graph.
   */
  private tap() {
    this.extensions = this.getExtensions();
    this.graph.hooks.datachange.tap(this.onDataChange.bind(this));
    this.graph.hooks.treecollapseexpand.tap(
      this.onTreeCollapseExpand.bind(this),
    );

    // check whether use tree layout or behaviors
    // if so, establish tree structure for graph
    this.graph.hooks.layout.tap(this.onLayout.bind(this));
    this.graph.hooks.init.tap(this.onGraphInit.bind(this));
    this.graph.hooks.behaviorchange.tap(this.onBehaviorChange.bind(this));
    this.graph.hooks.modechange.tap(this.onModeChange.bind(this));
  }

  /**
   * Get the extensions from useLib.
   */
  private getExtensions() {
    const { transform = [] } = this.graph.getSpecification();
    const requiredTransformers = ['validate-data'];
    return [...transform, ...requiredTransformers]
      .map((config) => ({
        config,
        func: getExtension(config, registry.useLib, 'transform'),
      }))
      .filter((ext) => !!ext.func);
  }

  /**
   * Listener of graph's datachange hook.
   * @param param contains new graph data and type of data change
   */
  private onDataChange(param: { data: DataConfig; type: DataChangeType }) {
    const { data, type: changeType } = param;
    const { userGraphCore } = this;
    const change = () => {
      switch (changeType) {
        case 'remove':
          this.removeData(data as GraphData);
          break;
        case 'update':
          this.updateData(data);
          break;
        case 'moveCombo':
          this.moveCombo(data as GraphData);
          break;
        case 'addCombo':
          this.addCombo(data as GraphData);
          break;
        default:
          // changeType is 'replace' | 'mergeReplace' | 'union'
          this.changeData(data, changeType);
          break;
      }
    };
    if (userGraphCore) {
      userGraphCore.batch(change);
    } else {
      change();
    }
  }

  private onTreeCollapseExpand(params: {
    ids: ID[];
    action: 'collapse' | 'expand';
  }) {
    const { ids, action } = params;
    ids.forEach((id) => {
      this.userGraphCore.mergeNodeData(id, {
        collapsed: action === 'collapse',
      });
    });
  }

  private onLayout({ options }) {
    if (this.treeDirtyFlag && isTreeLayout(options)) {
      this.establishUserGraphCoreTree();
    }
  }

  private onGraphInit() {
    const { modes = {} } = this.graph.getSpecification();
    const mode = this.graph.getMode() || 'default';
    if (hasTreeBehaviors(modes[mode])) {
      this.establishUserGraphCoreTree();
    }
  }

  private onBehaviorChange(param: {
    action: 'update' | 'add' | 'remove';
    modes: string[];
    behaviors: (string | { type: string; key: string })[];
  }) {
    const { action, modes, behaviors } = param;
    const mode = this.graph.getMode() || 'default';
    if (action !== 'add' || !modes.includes(mode)) return;
    if (hasTreeBehaviors(behaviors)) {
      this.establishUserGraphCoreTree();
    }
  }

  private onModeChange(param: { mode: string }) {
    const { modes = {} } = this.graph.getSpecification();
    if (hasTreeBehaviors(modes[param.mode])) {
      this.establishUserGraphCoreTree();
    }
  }

  private establishUserGraphCoreTree() {
    if (!this.treeDirtyFlag) return;
    const nodes = this.userGraphCore.getAllNodes();
    const edges = this.userGraphCore.getAllEdges();
    this.userGraphCore.batch(() => {
      // graph data to tree structure and storing
      const rootIds = nodes
        .filter((node) => node.data.isRoot)
        .map((node) => node.id);
      graphData2TreeData({}, { nodes, edges }, rootIds).forEach((tree) => {
        traverse(tree, (node) => {
          node.children?.forEach((child) => {
            this.userGraphCore.setParent(child.id, node.id, 'tree');
          });
        });
      });
    });
    this.treeDirtyFlag = true;
  }

  /**
   * Change data by replace, merge repalce, or union.
   * @param data new data
   * @param changeType type of data change, 'replace' means discard the old data. 'mergeReplace' means merge the common part. 'union' means merge whole sets of old and new one
   */
  private changeData(
    dataConfig: DataConfig,
    changeType: 'replace' | 'mergeReplace' | 'union',
  ) {
    const { type: dataType, data } = this.formatData(dataConfig) || {};
    if (!dataType) return;

    const { nodes = [], edges = [], combos = [] } = this.transformData(data);

    if (changeType === 'replace') {
      this.userGraphCore = new GraphLib<NodeUserModelData, EdgeUserModelData>({
        nodes: nodes.concat(
          combos?.map((combo) => ({
            id: combo.id,
            data: { ...combo.data, _isCombo: true },
          })) || [],
        ),
        edges,
        onChanged: (event) => this.updateGraphCore(event),
      });
      this.graphCore = new GraphLib<NodeModelData, EdgeModelData>(
        clone({
          nodes: nodes.concat(
            combos?.map((combo) => ({
              id: combo.id,
              data: { ...combo.data, _isCombo: true },
            })) || [],
          ),
          edges,
        }),
      );
      if (combos?.length) {
        this.graphCore.attachTreeStructure('combo');
        nodes.forEach((node) => {
          if (node.data.parentId) {
            if (
              validateComboStrucutre(this.graph, node.id, node.data.parentId)
            ) {
              this.graphCore.setParent(
                node.id,
                node.data.parentId as ID,
                'combo',
              );
            } else {
              this.graphCore.mergeNodeData(node.id, { parentId: undefined });
            }
          }
        });
        combos.forEach((combo) => {
          if (combo.data.parentId) {
            if (
              validateComboStrucutre(this.graph, combo.id, combo.data.parentId)
            ) {
              this.graphCore.setParent(combo.id, combo.data.parentId, 'combo');
            } else {
              this.graphCore.mergeNodeData(combo.id, { parentId: undefined });
            }
          }
        });
      }
    } else {
      const { userGraphCore } = this;
      const prevData = deconstructData({
        nodes: userGraphCore.getAllNodes(),
        edges: [],
      });
      const nodesAndCombos = nodes.concat(
        combos.map((combo) => ({
          id: combo.id,
          data: { ...combo.data, _isCombo: true },
        })),
      );

      // =========== node & combos ============
      if (!prevData.nodes.length) {
        userGraphCore.addNodes(nodesAndCombos);
      } else {
        if (changeType === 'mergeReplace') {
          // remove the nodes which are not in data but in userGraphCore
          const nodeAndComboIds = nodesAndCombos.map((node) => node.id);
          prevData.nodes.forEach((prevNode) => {
            if (!nodeAndComboIds.includes(prevNode.id))
              userGraphCore.removeNode(prevNode.id);
          });
        }
        // add or update node
        nodesAndCombos.forEach((item) => {
          if (userGraphCore.hasNode(item.id)) {
            // update node which is in the graphCore
            userGraphCore.mergeNodeData(item.id, item.data);
          } else {
            // add node which is in data but not in graphCore
            userGraphCore.addNode(item);
          }
        });
      }

      // =========== edge ============
      prevData.edges = userGraphCore.getAllEdges();
      if (!prevData.edges.length) {
        userGraphCore.addEdges(edges);
      } else {
        if (changeType === 'mergeReplace') {
          // remove the edges which are not in data but in userGraphCore
          const edgeIds = edges.map((edge) => edge.id);
          prevData.edges.forEach((prevEdge) => {
            if (!edgeIds.includes(prevEdge.id))
              userGraphCore.removeEdge(prevEdge.id);
          });
        }
        // add or update edge
        edges.forEach((edge) => {
          if (userGraphCore.hasEdge(edge.id)) {
            // update edge which is in the graphCore
            userGraphCore.mergeEdgeData(edge.id, edge.data);
          } else {
            // add edge which is in data but not in graphCore
            userGraphCore.addEdge(edge);
          }
        });
      }
    }

    if (data.edges?.length) {
      const { userGraphCore } = this;
      // convert and store tree structure to graphCore
      this.updateTreeGraph(dataType, {
        nodes: userGraphCore.getAllNodes(),
        edges: userGraphCore.getAllEdges(),
      });
    }
  }

  /**
   * Remove part of old data.
   * @param data data to be removed which is part of old one
   */
  private removeData(data: GraphData) {
    const { userGraphCore } = this;
    const { nodes = [], edges = [], combos = [] } = data;
    const nodesAndCombos = nodes.concat(combos);
    const prevNodesAndCombos = userGraphCore.getAllNodes();
    const prevEdges = userGraphCore.getAllEdges();
    if (prevNodesAndCombos.length && nodesAndCombos.length) {
      // update the parentId
      if (this.graphCore.hasTreeStructure('combo')) {
        nodesAndCombos.forEach((item) => {
          const { parentId } = item.data;
          this.graphCore.getChildren(item.id, 'combo').forEach((child) => {
            userGraphCore.mergeNodeData(child.id, { parentId });
          });
        });
      }
      // remove the node
      userGraphCore.removeNodes(nodesAndCombos.map((node) => node.id));
    }
    if (prevEdges.length && edges.length) {
      // add or update edge
      const ids = edges
        .map((edge) => edge.id)
        .filter((id) => userGraphCore.hasEdge(id));
      userGraphCore.removeEdges(ids);
    }
  }

  /**
   * Update part of old data.
   * @param data data to be updated which is part of old one
   */
  private updateData(dataConfig: DataConfig) {
    const { userGraphCore } = this;
    const { type: dataType, data } = this.formatData(dataConfig);
    if (!dataType) return;
    const { nodes = [], edges = [], combos = [] } = data; //this.transformData(data as GraphData);
    const {
      nodes: prevNodes,
      edges: prevEdges,
      combos: prevCombos,
    } = deconstructData({
      nodes: userGraphCore.getAllNodes(),
      edges: userGraphCore.getAllEdges(),
    });
    if (prevNodes.length) {
      // update node
      nodes.forEach((newModel) => {
        const { id, data } = newModel;
        if (data) {
          const mergedData = mergeOneLevelData(
            userGraphCore.getNode(id),
            newModel,
          );
          userGraphCore.mergeNodeData(id, mergedData);
        }
      });
    }
    if (prevEdges.length) {
      // update edge
      edges.forEach((newModel) => {
        const oldModel = userGraphCore.getEdge(newModel.id);
        if (!oldModel) return;
        const { id, source, target, data } = newModel;
        if (source && oldModel.source !== source)
          userGraphCore.updateEdgeSource(id, source);
        if (target && oldModel.target !== target)
          userGraphCore.updateEdgeTarget(id, target);
        if (data) {
          const mergedData = mergeOneLevelData(
            userGraphCore.getEdge(id),
            newModel,
          );
          userGraphCore.mergeEdgeData(id, mergedData);
        }
      });
    }
    if (prevCombos.length) {
      // update combos
      const modelsToMove = [];
      combos.forEach((newModel) => {
        const { id, data } = newModel;
        const { x: comboNewX, y: comboNewY, ...others } = data;
        if (comboNewX !== undefined || comboNewY !== undefined) {
          if (this.graphCore.getChildren(id, 'combo').length) {
            // combo's position is updated, update the succeed nodes' positions
            const oldBounds = this.graph.getRenderBBox(id, true);
            if (!oldBounds) return;
            const [comboOldX, comboOldY] = oldBounds.center;
            const dx = (comboNewX as number) - comboOldX;
            const dy = (comboNewY as number) - comboOldY;
            graphComboTreeDfs(
              this.graph,
              [newModel],
              (succeed) => {
                const { x, y, _isCombo } = succeed.data;
                if (!_isCombo) {
                  modelsToMove.push({
                    id: succeed.id,
                    data: {
                      x: x + dx,
                      y: y + dy,
                    },
                  });
                }
              },
              'BT',
            );
          } else {
            // empty combo, modify the position directly
            modelsToMove.push({
              id,
              data: {
                x: comboNewX,
                y: comboNewY,
              },
            });
          }
        }
        // update other properties
        if (Object.keys(others).length) {
          const mergedData = mergeOneLevelData(userGraphCore.getNode(id), {
            id,
            data: others,
          });
          userGraphCore.mergeNodeData(id, mergedData);
        }
      });
      // update succeed nodes
      modelsToMove.forEach((newModel) => {
        const { id, data } = newModel;
        userGraphCore.mergeNodeData(id, data);
      });
    }

    if (
      edges?.filter(
        (edge) =>
          edge.hasOwnProperty('source') || edge.hasOwnProperty('target'),
      ).length
    ) {
      // convert and store tree structure to graphCore
      this.updateTreeGraph(dataType, {
        nodes: this.userGraphCore.getAllNodes(),
        edges: this.userGraphCore.getAllEdges(),
      });
    }
  }

  private formatData(dataConfig: DataConfig): {
    data: GraphData;
    type: 'graphData' | 'treeData' | 'fetch';
  } {
    const { type, value } = dataConfig as
      | InlineGraphDataConfig
      | InlineTreeDataConfig
      | FetchDataConfig;
    let data = value;
    if (!type) {
      data = dataConfig as GraphData;
    } else if (type === 'treeData') {
      data = treeData2GraphData(value);
    } else if (type === 'fetch') {
      // TODO: fetch
    } else if (!(data as GraphData).nodes) {
      console.warn(
        'Input data type is invalid, the type shuold be "graphData", "treeData", or "fetch".',
      );
      return;
    }

    return {
      type: type || 'graphData',
      data: data as GraphData,
    };
  }

  /**
   * Relatively move the position of combo a dinstance (dx and dy in combo data).
   * @param data graph data which contains the combo dx dy info
   */
  private moveCombo(data: GraphData) {
    const { combos = [] } = data;
    const succeedNodesModels = [];
    combos.forEach((newModel) => {
      const { dx = 0, dy = 0 } = newModel.data;
      if (!dx && !dy) return;
      if (this.graphCore.getChildren(newModel.id, 'combo').length) {
        // combo's position is updated, update the succeed nodes' positions
        graphComboTreeDfs(
          this.graph,
          [newModel],
          (succeed) => {
            const { x, y, _isCombo } = succeed.data;
            if (
              !_isCombo ||
              !this.graphCore.getChildren(succeed.id, 'combo').length
            ) {
              succeedNodesModels.push({
                id: succeed.id,
                data: {
                  x: x + dx,
                  y: y + dy,
                },
              });
            }
          },
          'BT',
        );
      } else {
        // empty combo, move it directly
        const comboModel = this.graphCore.getNode(newModel.id);
        const { x = 0, y = 0 } = comboModel.data;
        succeedNodesModels.push({
          id: newModel.id,
          data: {
            x: (x as number) + (dx as number),
            y: (y as number) + (dy as number),
          },
        });
      }
    });
    // update succeed nodes
    const { userGraphCore } = this;
    succeedNodesModels.forEach((newModel) => {
      const { id, data } = newModel;
      if (data) {
        const mergedData = mergeOneLevelData(
          userGraphCore.getNode(id),
          newModel,
        );
        userGraphCore.mergeNodeData(id, mergedData);
      }
    });
  }

  private addCombo(data: GraphData) {
    const { combos = [] } = data;
    if (!combos?.length) return;
    const { userGraphCore } = this;
    const { id, data: comboData } = combos[0];
    const { _children = [], ...others } = comboData;

    // add or update combo
    if (userGraphCore.hasNode(id)) {
      // update node which is in the graphCore
      userGraphCore.mergeNodeData(id, { ...others, _isCombo: true });
    } else {
      // add node which is in data but not in graphCore
      userGraphCore.addNode({ id, data: { ...others, _isCombo: true } });
    }

    // update strucutre
    (_children as ID[]).forEach((childId) => {
      if (!this.graphCore.hasNode(childId)) {
        console.warn(
          `Adding child ${childId} to combo ${id} failed. The child ${childId} does not exist`,
        );
        return;
      }
      userGraphCore.mergeNodeData(childId, { parentId: id });
    });
  }

  /**
   * Update graphCore with transformed userGraphCore data.
   */
  private updateGraphCore(event) {
    const { graphCore } = this;

    const {
      nodes = [],
      edges = [],
      combos = [],
    } = deconstructData({
      nodes: this.userGraphCore.getAllNodes(),
      edges: this.userGraphCore.getAllEdges(),
    });

    const prevNodesAndCombos = graphCore.getAllNodes();

    // function to update one data in graphCore with different model type ('node' or 'edge')
    const syncUpdateToGraphCore = (
      id,
      newValue,
      oldValue,
      isNodeOrCombo,
      diff = [],
    ) => {
      if (isNodeOrCombo) {
        if (newValue.data) graphCore.updateNodeData(id, { ...newValue.data });
      } else {
        if (diff.includes('data'))
          graphCore.updateEdgeData(id, { ...newValue.data });
        // source and target may be changed
        if (diff.includes('source'))
          graphCore.updateEdgeSource(id, newValue.source);
        if (diff.includes('target'))
          graphCore.updateEdgeTarget(id, newValue.target);
      }
    };

    graphCore.batch(() => {
      // === step 3: sync to graphCore according to the changes in userGraphCore ==
      const newModelMap: {
        [id: string]: {
          type: 'node' | 'edge' | 'combo';
          model: NodeModel | EdgeModel | ComboModel;
        };
      } = {};
      const parentMap: {
        [id: string]: {
          new: ID;
          old?: ID;
        };
      } = {};
      const changeMap: {
        [id: string]: boolean;
      } = {};
      const treeChanges = [];
      event.changes.forEach((change) => {
        const id = change.id || change.value?.id;
        if (id !== undefined) {
          changeMap[id] = true;
          return;
        }
        if (
          [
            'TreeStructureAttached',
            'TreeStructureChanged',
            'TreeStructureChanged',
          ].includes(change.type)
        ) {
          treeChanges.push(change);
        }
      });
      nodes.forEach((model) => {
        newModelMap[model.id] = { type: 'node', model };
        if (model.data.hasOwnProperty('parentId')) {
          parentMap[model.id] = {
            new: model.data.parentId,
            old: undefined,
          };
        }
      });
      edges.forEach(
        (model) => (newModelMap[model.id] = { type: 'edge', model }),
      );
      combos.forEach((model) => {
        newModelMap[model.id] = { type: 'combo', model };
        if (model.data.hasOwnProperty('parentId')) {
          parentMap[model.id] = {
            new: model.data.parentId,
            old: undefined,
          };
        }
      });
      prevNodesAndCombos.forEach((prevModel) => {
        const { id } = prevModel;
        if (
          parentMap[id]?.new !== undefined ||
          prevModel.data.parentId !== undefined
        ) {
          parentMap[id] = {
            new: parentMap[id]?.new,
            old: prevModel.data.parentId,
          };
        } else {
          delete parentMap[id];
        }
        const { model: newModel } = newModelMap[id] || {};
        // remove
        if (!newModel) {
          // remove a combo, put the children to upper parent
          if (prevModel.data._isCombo) {
            graphCore.getChildren(id, 'combo').forEach((child) => {
              parentMap[child.id] = {
                ...parentMap[child.id],
                new: prevModel.data.parentId,
              };
            });
          }
          // if it has combo parent, remove it from the parent's children list
          if (prevModel.data.parentId) {
            graphCore.setParent(id, undefined, 'combo');
          }

          // for tree graph view, show the succeed nodes and edges
          const succeedIds = [];
          if (graphCore.hasTreeStructure('tree')) {
            graphCore.dfsTree(
              id,
              (child) => {
                succeedIds.push(child.id);
              },
              'tree',
            );
            const succeedEdgeIds = graphCore
              .getAllEdges()
              .filter(
                ({ source, target }) =>
                  succeedIds.includes(source) && succeedIds.includes(target),
              )
              .map((edge) => edge.id);
            this.graph.showItem(
              succeedIds
                .filter((succeedId) => succeedId !== id)
                .concat(succeedEdgeIds),
            );

            // for tree graph view, remove the node from the parent's children list
            graphCore.setParent(id, undefined, 'tree');
            // for tree graph view, make the its children to be roots
            graphCore
              .getChildren(id, 'tree')
              .forEach((child) =>
                graphCore.setParent(child.id, undefined, 'tree'),
              );
          }
          // remove the node data
          graphCore.removeNode(id);
          delete parentMap[prevModel.id];
        }
        // update
        //  || diffAt(newModel, prevModel, true)?.length
        else if (changeMap[id])
          syncUpdateToGraphCore(id, newModel, prevModel, true);
        // delete from the map indicates this model is visited
        delete newModelMap[id];
      });
      graphCore.getAllEdges().forEach((prevEdge) => {
        const { id } = prevEdge;
        const { model: newModel } = newModelMap[id] || {};
        // remove
        if (!newModel) graphCore.removeEdge(id);
        // update
        else {
          const diff = diffAt(newModel, prevEdge, false);
          if (diff?.length)
            syncUpdateToGraphCore(id, newModel, prevEdge, false, diff);
        }
        // delete from the map indicates this model is visited
        delete newModelMap[id];
      });
      // add
      Object.values(newModelMap).forEach(({ type, model }) => {
        if (type === 'node' || type === 'combo') graphCore.addNode(model);
        else if (type === 'edge') graphCore.addEdge(model as EdgeModel);
      });
      // update parents after adding all items
      Object.keys(parentMap).forEach((id) => {
        if (parentMap[id].new === parentMap[id].old) return;
        if (!validateComboStrucutre(this.graph, id, parentMap[id].new)) {
          graphCore.mergeNodeData(id, { parentId: parentMap[id].old });
          return;
        }
        graphCore.mergeNodeData(id, { parentId: parentMap[id].new });
        graphCore.setParent(id, parentMap[id].new, 'combo');
        // after remove from parent's children list, check whether the parent is empty
        // if so, update parent's position to be the child's
        if (parentMap[id].old !== undefined) {
          const parentChildren = graphCore.getChildren(
            parentMap[id].old,
            'combo',
          );
          const {
            x = 0,
            y = 0,
            z = 0,
          } = this.graph.getDisplayModel(parentMap[id].old)?.data;
          if (!parentChildren.length) {
            graphCore.mergeNodeData(parentMap[id].old, {
              x: convertToNumber(x),
              y: convertToNumber(y),
              z: convertToNumber(z),
            });
          }
        }
      });

      // update tree structure
      treeChanges.forEach((change) => {
        const { type, treeKey, nodeId, newParentId } = change;
        if (type === 'TreeStructureAttached') {
          graphCore.attachTreeStructure(treeKey);
          return;
        } else if (type === 'TreeStructureChanged') {
          graphCore.setParent(nodeId, newParentId, treeKey);
          return;
        } else if (type === 'TreeStructureDetached') {
          graphCore.detachTreeStructure(treeKey);
          return;
        }
      });
    });
  }

  /**
   * Clone data from userGraphCore, and run transforms
   * @returns transformed data and the id map list
   */
  private transformData(data): GraphData {
    let dataCloned: GraphData = clone(data);
    //  transform the data with transform extensions, output innerData and idMaps ===
    this.extensions.forEach(({ func, config }) => {
      dataCloned = func(dataCloned, config, this.userGraphCore);
    });
    return dataCloned;
  }

  /**
   * convert and store tree structure to graphCore
   * @param dataType
   * @param data
   */
  private updateTreeGraph(dataType, data) {
    this.userGraphCore.attachTreeStructure('tree');
    if (dataType === 'treeData') {
      // tree structure storing
      data.edges.forEach((edge) => {
        const { source, target } = edge;
        this.userGraphCore.setParent(target, source, 'tree');
      });
    } else {
      this.treeDirtyFlag = true;
    }
  }
}

/**
 * Get the source id list of the id from tail to head in linkedList.
 * @param id target id to find its source id list
 * @param linkedList id map list
 * @param index index in linkedList to start from, from the tail by defailt
 * @returns source id list
 */
const getComesFromLinkedList = (
  id,
  linkedList,
  index = linkedList.length - 1,
) => {
  let comesFrom = [];
  linkedList[index][id]?.forEach((comesFromId) => {
    if (index === 0) comesFrom.push(comesFromId);
    else
      comesFrom = comesFrom.concat(
        getComesFromLinkedList(comesFromId, linkedList, index - 1),
      );
  });
  return comesFrom;
};

/**
 * Diff new and old model.
 * @param newModel
 * @param oldModel
 * @param isNode
 * @returns false for no different, ['data'] for data different
 */
const diffAt = (
  newModel,
  oldModel,
  isNode,
): ('data' | 'source' | 'target')[] => {
  // edge's source or target is changed
  const diff = [];
  if (!isNode) {
    if (newModel.source !== oldModel.source) diff.push('source');
    if (newModel.target !== oldModel.target) diff.push('target');
  }
  if (!newModel.data) return diff;
  // value in data is changed
  const newKeys = Object.keys(newModel.data);
  const oldKeys = Object.keys(oldModel.data);
  if (oldKeys.length === 0 && oldKeys.length === newKeys.length) return diff;
  if (oldKeys.length !== newKeys.length) return diff.concat('data');
  for (let i = 0; i < newKeys.length; i++) {
    const key = newKeys[i];
    const newValue = newModel.data[key];
    const oldValue = oldModel.data[key];
    const newValueIsObject = isObject(newValue);
    const oldValueIsObject = isObject(oldValue);
    if (newValueIsObject !== oldValueIsObject) return diff.concat('data');
    if (newValueIsObject && oldValueIsObject) {
      if (JSON.stringify(newValue) !== JSON.stringify(oldValue))
        return diff.concat('data');
      else continue;
    }
    if (
      typeof newValue === 'number' &&
      typeof oldValue === 'number' &&
      isNaN(newValue) &&
      isNaN(oldValue)
    )
      return;
    if (newValue !== oldValue) return diff.concat('data');
  }
  return diff;
};

/**
 * Merge the first level fields in data of model
 * @param prevModel previous model
 * @param newModel incoming new model
 * @returns merged model data
 */
const mergeOneLevelData = (
  prevModel: NodeUserModel | EdgeUserModel | ComboUserModel,
  newModel: NodeUserModel | EdgeUserModel | ComboUserModel,
): NodeUserModelData | EdgeUserModelData | ComboUserModelData => {
  const { data: newData } = newModel;
  const { data: prevData } = prevModel;
  const mergedData = {};
  Object.keys(newData).forEach((key) => {
    if (isArray(prevData[key]) || isArray(newData[key])) {
      mergedData[key] = newData[key];
    } else if (
      typeof prevData[key] === 'object' &&
      typeof newData[key] === 'object'
    ) {
      mergedData[key] = {
        ...(prevData[key] as object),
        ...(newData[key] as object),
      };
    } else {
      mergedData[key] = newData[key];
    }
  });
  return mergedData;
};
