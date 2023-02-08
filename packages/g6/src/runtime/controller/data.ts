import { Graph as GraphLib } from "@antv/graphlib";
import { GraphData, IGraph, ComboModel } from "../../types";
import { registery } from '../../stdlib';
import { getExtension } from "../../util/extension";
import { clone, isArray, isNumber, isString, isFunction, isObject } from "@antv/util";
import { NodeModel, NodeModelData, NodeUserModelData } from "../../types/node";
import { EdgeModel, EdgeModelData, EdgeUserModelData } from "../../types/edge";
import { DataChangeType, GraphCore } from "../../types/data";
import { ITEM_TYPE } from "../../types/item";

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

  constructor(graph: IGraph<any>) {
    this.graph = graph;
    // this.graphCore = new GraphLib<NodeModelData, EdgeModelData>();
    // this.userGraphCore = new GraphLib<NodeUserModelData, EdgeUserModelData>();
    // this.userGraphCore.onChanged(event => this.updateGraphCore(event));
    this.tap();
  }

  public findData(type: ITEM_TYPE, condition: string | number | (string | number)[] | Function) {
    const { graphCore } = this;
    if (isString(condition) || isNumber(condition) || isArray(condition)) {
      const ids = isArray(condition) ? condition : [condition];
      switch (type) {
        case 'node':
          return ids.map(id => graphCore.hasNode(id) ? graphCore.getNode(id) : undefined);
        case 'edge':
          return ids.map(id => graphCore.hasEdge(id) ? graphCore.getEdge(id) : undefined);
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
      return datas.find(data => condition(data));
    }
  }

  /**
   * Subscribe the lifecycle of graph.
   */
  private tap() {
    this.extensions = this.getExtensions();
    this.graph.hooks.datachange.tap(this.onDataChange.bind(this));
    // this.graph.hooks.additems.tap(this.onAdd.bind(this));
    // this.graph.hooks.removeitems.tap(this.onRemove.bind(this));
    // this.graph.hooks.updateitems.tap(this.onUpdate.bind(this));
  }

  /**
   * Get the extensions from useLib.
   */
  private getExtensions() {
    const { transform = [] } = this.graph.getSpecification();
    return transform.map(config => ({
      config,
      func: getExtension(config, registery.useLib, 'transform')
    })).filter(ext => !!ext.func);
  }

  /**
   * Listener of graph's datachange hook.
   * @param param contains new graph data and type of data change
   */
  private onDataChange(param: { data: GraphData, type: DataChangeType }) {
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
    }
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
        onChanged: event => this.updateGraphCore(event)
      });
      const { data: transformedData } = this.transformData();
      this.graphCore = new GraphLib<NodeModelData, EdgeModelData>({ ...transformedData });
    } else {
      const prevNodes = userGraphCore.getAllNodes();
      const prevEdges = userGraphCore.getAllEdges();
      const { nodes, edges, combos } = data;
      // TODO: distinguish combos
      if (!prevNodes.length) {
        userGraphCore.addNodes(nodes);
      } else {
        if (changeType === 'mergeReplace') {
          // remove the nodes which are not in data but in userGraphCore
          const nodeIds = nodes.map(node => node.id);
          prevNodes.forEach(prevNode => {
            if (!nodeIds.includes(prevNode.id)) userGraphCore.removeNode(prevNode.id);
          });
        }
        // add or update node
        nodes.forEach(node => {
          if (userGraphCore.hasNode(node.id)) {
            // update node which is in the graphCore
            userGraphCore.mergeNodeData(node.id, node.data);
          } else {
            // add node which is in data but not in graphCore
            userGraphCore.addNode(node);
          }
        });
      }

      if (!prevEdges.length) {
        userGraphCore.addEdges(edges);
      } else {
        if (changeType === 'mergeReplace') {
          // remove the edges which are not in data but in userGraphCore
          const edgeIds = edges.map(edge => edge.id);
          prevEdges.forEach(prevEdge => {
            if (!edgeIds.includes(prevEdge.id)) userGraphCore.removeNode(prevEdge.id);
          });
        }
        // add or update edge
        edges.forEach(edge => {
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
    // this.updateGraphCore();
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
      userGraphCore.removeNodes(nodes.map(node => node.id));
    }
    if (prevEdges.length && edges.length) {
      // add or update edge
      userGraphCore.removeEdges(edges.map(edge => edge.id));
    }
    // TODO: combo

    // this.updateGraphCore();
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
      nodes.forEach(newModel => {
        userGraphCore.mergeNodeData(newModel.id, newModel.data);
      });
    }
    if (prevEdges.length) {
      // update edge
      edges.forEach(newModel => {
        const oldModel = userGraphCore.getEdge(newModel.id);
        if (!oldModel) return;
        if (oldModel.source !== newModel.source) userGraphCore.updateEdgeSource(newModel.id, newModel.source);
        if (oldModel.target !== newModel.target) userGraphCore.updateEdgeTarget(newModel.id, newModel.target);
        userGraphCore.mergeEdgeData(newModel.id, newModel.data);
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
    const { data: transformedData, idMaps } = this.transformData()
    const { nodes, edges, combos } = transformedData;

    const prevNodes = graphCore.getAllNodes();
    const prevEdges = graphCore.getAllEdges();

    // function to update one data in graphCore with different model type ('node' or 'edge')
    const syncUpdateToGraphCore = (id, newValue, oldValue, isNode) => {
      if (isNode) {
        graphCore.updateNodeData(id, newValue.data);
      } else {
        graphCore.updateEdgeData(id, newValue.data);
        // source and target may be changed
        if (newValue.source !== oldValue.source) graphCore.updateEdgeSource(id, newValue.source);
        if (newValue.target !== oldValue.target) graphCore.updateEdgeTarget(id, newValue.target);
      }
      // TODO: combo
    }

    // === step 3: sync to graphCore according to the changes in userGraphCore ==
    if (!idMaps?.length || idMaps.length !== this.extensions.length) {
      // situation 1: not every extension has corresponding idMap, use default mapping: suppose id is not changed by transforms
      // and diff the value in graphCore whose id is not in userGraphCore
      const newModelMap: {
        [id: string]: { type: 'node' | 'edge' | 'combo', model: NodeModel | EdgeModel | ComboModel }
      } = {};
      nodes.forEach(model => newModelMap[model.id] = { type: 'node', model });
      edges.forEach(model => newModelMap[model.id] = { type: 'edge', model });
      // edge first, in case of related edges are removed when removing node
      prevEdges.forEach(prevEdge => {
        const { id } = prevEdge;
        const { model: newModel } = newModelMap[id] || {};
        // remove
        if (!newModel) graphCore.removeEdge(id);
        // update
        else if (hasDiff(newModel, prevEdge, false)) syncUpdateToGraphCore(id, newModel, prevEdge, false);
        // delete from the map indicates this model is visited
        delete newModelMap[id];
      });
      prevNodes.forEach(prevNode => {
        const { id } = prevNode;
        const { model: newModel } = newModelMap[id] || {};
        // remove
        if (!newModel) graphCore.removeNode(id);
        // update
        else if (hasDiff(newModel, prevNode, true)) syncUpdateToGraphCore(id, newModel, prevNode, true);
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
      (nodes.concat(edges)).forEach(model => {
        finalIdMap[model.id] = getComesFromLinkedList(model.id, idMaps);
        newModelMap[model.id] = model;
      });
      (prevNodes.concat(prevEdges)).forEach(model => {
        prevModelMap[model.id] = model;
      });
      // TODO: combo

      // map changes for search
      const changeMap = {};
      const { changes } = event;
      changes.forEach(change => {
        const { value, id, type } = change;
        // TODO: temporary skip. how to handle tree change events?
        if (['TreeStructureAttached', 'TreeStructureDetached', 'TreeStructureChanged'].includes(type)) return;
        const dataId = id || value.id;
        changeMap[dataId] = changeMap[dataId] || [];
        changeMap[dataId].push(type.toLawerCase());
      });

      // 1. remove or add model to userGraphCore according the existence
      // 2. update or keep unchanged according to the source models' changes in userGraphCore
      //    if source models have any change, update the data in graphcore. Kepp unchanged otherwise
      Object.keys(newModelMap).forEach(newId => {
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
            if (hasDiff(newValue, oldValue, isNode)) syncUpdateToGraphCore(newId, newValue, oldValue, isNode);
          } else {
            // follow the corresponding data event in userGraphCore
            const comesFromChanges = changeMap[comesFromIds[0]];
            if (comesFromChanges?.length) syncUpdateToGraphCore(newId, newValue, oldValue, isNode)
          }
        }
      });
    }
  }

  /**
   * Clone data from userGraphCore, and run transforms
   * @returns transformed data and the id map list
   */
  private transformData() {
    const { userGraphCore } = this;
    // === step 1: clone data from userGraphCore (userData) ===
    const userData = { // TODO: should be deepClone
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
    return { data: dataCloned, idMaps }
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
  linkedList[index][id]?.forEach(comesFromId => {
    if (index === 0) comesFrom.push(comesFromId);
    else comesFrom = comesFrom.concat(getComesFromLinkedList(comesFromId, linkedList, index - 1));
  });
  return comesFrom;
}

/**
 * Diff new and old model.
 * @param newModel
 * @param oldModel 
 * @param isNode 
 * @returns whether they are different
 */
const hasDiff = (newModel, oldModel, isNode) => {
  // edge's source or target is changed
  if (!isNode && (newModel.source !== oldModel.source || newModel.target !== oldModel.target)) return true;
  // value in data is chagned
  const newKeys = Object.keys(newModel.data);
  const oldKeys = Object.keys(oldModel.data);
  if (oldKeys.length !== newKeys.length) return true;
  for (let i = 0; i < newKeys.length; i++) {
    const key = newKeys[i];
    const newValue = newModel.data[key];
    const oldValue = oldModel.data[key];
    const newValueIsObject = isObject(newValue);
    const oldValueIsObject = isObject(oldValue);
    if (newValueIsObject !== oldValueIsObject) return true;
    if (newValueIsObject && oldValueIsObject) {
      if (JSON.stringify(newModel) !== JSON.stringify(oldValue)) return true;
      else continue;
    }
    if (newValue !== oldValue) return true;
  }
  return false;
}