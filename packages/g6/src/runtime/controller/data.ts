import { Graph as GraphLib, ID } from '@antv/graphlib';
import { clone, isArray, isFunction, isNumber, isObject, isString } from '@antv/util';
import { registery as registry } from '../../stdlib';
import { ComboModel, ComboUserModel, GraphData, IGraph } from '../../types';
import { ComboUserModelData } from '../../types/combo';
import { DataChangeType, GraphCore } from '../../types/data';
import { EdgeModel, EdgeModelData, EdgeUserModel, EdgeUserModelData } from '../../types/edge';
import { ITEM_TYPE } from '../../types/item';
import { NodeModel, NodeModelData, NodeUserModel, NodeUserModelData } from '../../types/node';
import { getExtension } from '../../util/extension';

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

  constructor(graph: IGraph<any, any>) {
    this.graph = graph;
    this.tap();
  }

  public findData(
    type: ITEM_TYPE,
    condition: ID[] | Function,
  ): EdgeModel[] | NodeModel[] | ComboModel[] {
    const { graphCore } = this;
    if (isString(condition) || isNumber(condition) || isArray(condition)) {
      const ids = isArray(condition) ? condition : [condition];
      switch (type) {
        case 'node':
          return ids.map((id) => (graphCore.hasNode(id) ? graphCore.getNode(id) : undefined));
        case 'edge':
          return ids.map((id) => (graphCore.hasEdge(id) ? graphCore.getEdge(id) : undefined));
        case 'combo':
          // TODO;
          return;
      }
    } else if (isFunction(condition)) {
      const getDatas = type === 'node' ? graphCore.getAllNodes : graphCore.getAllEdges;
      if (type === 'combo') {
        // TODO getDatas = ?
      }
      const datas = getDatas() as any;
      return datas.filter((data) => condition(data));
    }
  }

  public findAllData(type: ITEM_TYPE): EdgeModel[] | NodeModel[] | ComboModel[] {
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

  public findRelatedEdgeIds(nodeId: ID, direction: 'in' | 'out' | 'both' = 'both') {
    return this.graphCore.getRelatedEdges(nodeId, direction);
  }
  public findNeighborNodeIds(nodeId: ID, direction: 'in' | 'out' | 'both' = 'both') {
    if (direction === 'in') return this.graphCore.getAncestors(nodeId);
    if (direction === 'out') return this.graphCore.getSuccessors(nodeId);
    return this.graphCore.getNeighbors(nodeId);
  }

  /**
   * Subscribe the lifecycle of graph.
   */
  private tap() {
    this.extensions = this.getExtensions();
    this.graph.hooks.datachange.tap(this.onDataChange.bind(this));
  }

  /**
   * Get the extensions from useLib.
   */
  private getExtensions() {
    const { transform = [] } = this.graph.getSpecification();
    return transform
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
  private onDataChange(param: { data: GraphData; type: DataChangeType }) {
    const { data, type: changeType } = param;
    const change = () => {
      switch (changeType) {
        case 'remove':
          this.removeData(data);
          break;
        case 'update':
          this.updateData(data);
          break;
        default:
          // 'replace' | 'mergeReplace' | 'union'
          this.changeData(data, changeType);
          break;
      }
    };
    const { userGraphCore } = this;
    if (userGraphCore) {
      userGraphCore.batch(change);
    } else {
      change();
    }
  }

  /**
   * Change data by replace, merge repalce, or union.
   * @param data new data
   * @param changeType type of data change, 'replace' means discard the old data. 'mergeReplace' means merge the common part. 'union' means merge whole sets of old and new one
   */
  private changeData(data: GraphData, changeType: 'replace' | 'mergeReplace' | 'union') {
    const { userGraphCore } = this;
    if (changeType === 'replace') {
      this.userGraphCore = new GraphLib<NodeUserModelData, EdgeUserModelData>({
        ...data,
        onChanged: (event) => this.updateGraphCore(event),
      });
      const { data: transformedData } = this.transformData();
      this.graphCore = new GraphLib<NodeModelData, EdgeModelData>({ ...transformedData });
    } else {
      const prevNodes = userGraphCore.getAllNodes();
      const { nodes, edges, combos } = data;
      // TODO: distinguish combos
      if (!prevNodes.length) {
        userGraphCore.addNodes(nodes);
      } else {
        if (changeType === 'mergeReplace') {
          // remove the nodes which are not in data but in userGraphCore
          const nodeIds = nodes.map((node) => node.id);
          prevNodes.forEach((prevNode) => {
            if (!nodeIds.includes(prevNode.id)) userGraphCore.removeNode(prevNode.id);
          });
        }
        // add or update node
        nodes.forEach((node) => {
          if (userGraphCore.hasNode(node.id)) {
            // update node which is in the graphCore
            userGraphCore.mergeNodeData(node.id, node.data);
          } else {
            // add node which is in data but not in graphCore
            userGraphCore.addNode(node);
          }
        });
      }

      const prevEdges = userGraphCore.getAllEdges();
      if (!prevEdges.length) {
        userGraphCore.addEdges(edges);
      } else {
        if (changeType === 'mergeReplace') {
          // remove the edges which are not in data but in userGraphCore
          const edgeIds = edges.map((edge) => edge.id);
          prevEdges.forEach((prevEdge) => {
            if (!edgeIds.includes(prevEdge.id)) userGraphCore.removeEdge(prevEdge.id);
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
  }

  /**
   * Remove part of old data.
   * @param data data to be removed which is part of old one
   */
  private removeData(data: GraphData) {
    const { userGraphCore } = this;
    const { nodes, edges, combos } = data;
    const prevNodes = userGraphCore.getAllNodes();
    const prevEdges = userGraphCore.getAllEdges();
    // TODO: distinguish combos
    if (prevNodes.length && nodes.length) {
      // remove the node
      userGraphCore.removeNodes(nodes.map((node) => node.id));
    }
    if (prevEdges.length && edges.length) {
      // add or update edge
      userGraphCore.removeEdges(edges.map((edge) => edge.id));
    }
    // TODO: combo
  }

  /**
   * Update part of old data.
   * @param data data to be updated which is part of old one
   */
  private updateData(data: GraphData) {
    const { userGraphCore } = this;
    const { nodes, edges, combos } = data;
    const prevNodes = userGraphCore.getAllNodes();
    const prevEdges = userGraphCore.getAllEdges();
    // TODO: distinguish combos
    if (prevNodes.length) {
      // update node
      nodes.forEach((newModel) => {
        const { id, data } = newModel;
        if (data) {
          const mergedData = mergeOneLevelData(userGraphCore.getNode(id), newModel);
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
        if (source && oldModel.source !== source) userGraphCore.updateEdgeSource(id, source);
        if (target && oldModel.target !== target) userGraphCore.updateEdgeTarget(id, target);
        if (data) {
          const mergedData = mergeOneLevelData(userGraphCore.getEdge(id), newModel);
          userGraphCore.mergeEdgeData(id, mergedData);
        }
      });
    }
    // TODO: combo
  }

  /**
   * Update graphCore with transformed userGraphCore data.
   */
  private updateGraphCore(event) {
    const { graphCore } = this;

    // === step 1: clone data from userGraphCore (userData) ===
    // === step 2: transform the data with transform extensions, output innerData and idMaps ===
    const { data: transformedData, idMaps } = this.transformData();
    const { nodes, edges, combos } = transformedData;

    const prevNodes = graphCore.getAllNodes();

    // function to update one data in graphCore with different model type ('node' or 'edge')
    const syncUpdateToGraphCore = (id, newValue, oldValue, isNode, diff = []) => {
      if (isNode) {
        if (newValue.data) graphCore.updateNodeData(id, newValue.data);
      } else {
        if (diff.includes('data')) graphCore.updateEdgeData(id, newValue.data);
        // source and target may be changed
        if (diff.includes('source')) graphCore.updateEdgeSource(id, newValue.source);
        if (diff.includes('target')) graphCore.updateEdgeTarget(id, newValue.target);
      }
      // TODO: combo
    };

    graphCore.batch(() => {
      // === step 3: sync to graphCore according to the changes in userGraphCore ==
      if (!idMaps?.length || idMaps.length !== this.extensions.length) {
        // situation 1: not every extension has corresponding idMap, use default mapping: suppose id is not changed by transforms
        // and diff the value in graphCore whose id is not in userGraphCore
        const newModelMap: {
          [id: string]: {
            type: 'node' | 'edge' | 'combo';
            model: NodeModel | EdgeModel | ComboModel;
          };
        } = {};
        nodes.forEach((model) => (newModelMap[model.id] = { type: 'node', model }));
        edges.forEach((model) => (newModelMap[model.id] = { type: 'edge', model }));
        prevNodes.forEach((prevNode) => {
          const { id } = prevNode;
          const { model: newModel } = newModelMap[id] || {};
          // remove
          if (!newModel) graphCore.removeNode(id);
          // update
          else if (diffAt(newModel, prevNode, true)?.length)
            syncUpdateToGraphCore(id, newModel, prevNode, true);
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
            if (diff?.length) syncUpdateToGraphCore(id, newModel, prevEdge, false, diff);
          }
          // delete from the map indicates this model is visited
          delete newModelMap[id];
        });
        // add
        Object.values(newModelMap).forEach(({ type, model }) => {
          if (type === 'node') graphCore.addNode(model);
          else if (type === 'edge') graphCore.addEdge(model as EdgeModel);
          // TODO: combo
        });
      } else {
        // situation 2: idMaps is complete
        // calculate the final idMap which maps the ids from final transformed data to their comes from ids in userData
        const finalIdMap = {};
        const newModelMap = {};
        const prevModelMap = {};
        nodes.concat(edges).forEach((model) => {
          finalIdMap[model.id] = getComesFromLinkedList(model.id, idMaps);
          newModelMap[model.id] = model;
        });
        prevNodes.concat(graphCore.getAllEdges()).forEach((model) => {
          prevModelMap[model.id] = model;
        });
        // TODO: combo

        // map changes for search
        const changeMap = {};
        const { changes } = event;
        changes.forEach((change) => {
          const { value, id, type } = change;
          // TODO: temporary skip. how to handle tree change events?
          if (
            ['TreeStructureAttached', 'TreeStructureDetached', 'TreeStructureChanged'].includes(
              type,
            )
          )
            return;
          const dataId = id || value.id;
          changeMap[dataId] = changeMap[dataId] || [];
          changeMap[dataId].push(type.toLawerCase());
        });

        // 1. remove or add model to userGraphCore according the existence
        // 2. update or keep unchanged according to the source models' changes in userGraphCore
        //    if source models have any change, update the data in graphcore. Kepp unchanged otherwise
        Object.keys(newModelMap).forEach((newId) => {
          const comesFromIds = finalIdMap[newId];
          const newValue = newModelMap[newId];
          const oldValue = prevModelMap[newId];
          const isNode = graphCore.hasNode(newId);
          if (newValue && !oldValue) {
            const addFunc = isNode ? graphCore.addNode : graphCore.addEdge;
            addFunc(newValue);
          } else if (!newValue && oldValue) {
            const removeFunc = isNode ? graphCore.removeNode : graphCore.removeEdge;
            removeFunc(newId);
          } else {
            if (!comesFromIds?.length) {
              // no comesForm, find same id in userGraphCore to follow the change, if it not found, diff new and old data value of graphCore (inner data)
              const diff = diffAt(newValue, oldValue, isNode);
              if (diff?.length) syncUpdateToGraphCore(newId, newValue, oldValue, isNode, diff);
            } else {
              // follow the corresponding data event in userGraphCore
              const comesFromChanges = changeMap[comesFromIds[0]];
              if (comesFromChanges?.length)
                syncUpdateToGraphCore(newId, newValue, oldValue, isNode);
            }
          }
        });
      }
    });
  }

  /**
   * Clone data from userGraphCore, and run transforms
   * @returns transformed data and the id map list
   */
  private transformData() {
    const { userGraphCore } = this;
    // === step 1: clone data from userGraphCore (userData) ===
    const userData = {
      // TODO: should be deepClone
      nodes: userGraphCore.getAllNodes(),
      edges: userGraphCore.getAllEdges(),
      // combos:
    };
    let dataCloned: GraphData = clone(userData);

    // === step 2: transform the data with transform extensions, output innerData and idMaps ===
    const idMaps = [];
    this.extensions.forEach(({ func, config }) => {
      const result = func(dataCloned, config);
      dataCloned = result.data;
      const idMap = result.idMap;
      if (idMap) idMaps.push(idMap);
    });
    return { data: dataCloned, idMaps };
  }
}

/**
 * Get the source id list of the id from tail to head in linkedList.
 * @param id target id to find its source id list
 * @param linkedList id map list
 * @param index index in linkedList to start from, from the tail by defailt
 * @returns source id list
 */
const getComesFromLinkedList = (id, linkedList, index = linkedList.length - 1) => {
  let comesFrom = [];
  linkedList[index][id]?.forEach((comesFromId) => {
    if (index === 0) comesFrom.push(comesFromId);
    else comesFrom = comesFrom.concat(getComesFromLinkedList(comesFromId, linkedList, index - 1));
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
const diffAt = (newModel, oldModel, isNode): ('data' | 'source' | 'target')[] => {
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
      if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) return diff.concat('data');
      else continue;
    }
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
    if (isObject(prevData[key]) && isObject(newData[key])) {
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
