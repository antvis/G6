import { Graph as GraphLib } from "@antv/graphlib";
import { NodeUserModel, EdgeUserModel, ComboUserModel, GraphData, IGraph } from "../../types";
import { registery } from '../../stdlib';
import { getExtension } from "../../util/extension";
import { clone, isArray, isNumber, isString } from "@antv/util";
import { NodeModelData } from "../../types/node";
import { EdgeModelData } from "../../types/edge";
import { GraphCore } from "../../types/data";
import { ITEM_TYPE } from "../../types/item";
import { isFunction } from "@antv/g-lite/dist/utils";

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
  public userData: GraphData;
  /**
   * Inner data stored in graphCore structure.
   */
  public graphCore: GraphCore;

  constructor(graph: IGraph<any>) {
    this.graph = graph;
    this.graphCore = new GraphLib<NodeModelData, EdgeModelData>();
    this.tap();
  }

  public findData(type: ITEM_TYPE, condition: string | number | (string | number)[] | Function) {
    const { graphCore } = this;
    if (isString(condition) || isNumber(condition) || isArray(condition)) {
      const ids = isArray(condition) ? condition : [condition];
      switch (type) {
        case 'node':
          return ids.map(id => graphCore.getNode(id));
        case 'edge':
          return ids.map(id => graphCore.getEdge(id));
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
    this.graph.hooks.datachange.tap(this.onDataChange);
    this.graph.hooks.additems.tap(this.onAdd);
    this.graph.hooks.removeitems.tap(this.onRemove);
    this.graph.hooks.updateitems.tap(this.onUpdate);
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
   * @param param contains new graph data
   */
  private onDataChange(param: { data: GraphData }) {
    const { data } = param;
    this.userData = data;
    let dataCloned: GraphData = clone(data);
    const { graphCore } = this;

    // Transform the data.
    this.extensions.forEach(({ func, config }) => {
      dataCloned = func(dataCloned, config);
    })

    // Input and store in graphcore.
    const { nodes = [], edges = [], combos = [] } = dataCloned;
    // TODO: distinguish combos
    if (!graphCore.getAllNodes().length) {
      graphCore.addNodes(nodes);
    } else {
      nodes.forEach(node => {
        if (graphCore.hasNode(node.id)) {
          graphCore.mergeNodeData(node.id, node.data);
        } else {
          graphCore.addNode(node);
        }
      });
    }

    if (!graphCore.getAllEdges().length) {
      graphCore.addEdges(edges);
    } else {
      edges.forEach(edge => {
        if (graphCore.hasEdge(edge.id)) {
          graphCore.mergeEdgeData(edge.id, edge.data);
        } else {
          graphCore.addEdge(edge);
        }
      });
    }
  }

  /**
   * Add models to graphCore.
   * @param param item type and model list
   */
  private onAdd(param: { type: ITEM_TYPE, models: NodeUserModel[] | EdgeUserModel[] | ComboUserModel[] }) {
    const { type, models } = param;
    const { userData } = this;
    // merge new models into userData, and format the whole dataset with extensions
    const useModels = (userData[`${type}s`] as any).concat(models);
    let dataCloned: GraphData = clone(userData);
    this.extensions.forEach(({ func, config }) => {
      dataCloned = func(dataCloned, config);
    });
    const addIds = models.map(model => model.id);
    const formattedModels = (dataCloned[`${type}s`] as any).filter(model => addIds.includes(model.id));

    // add to graphCore
    // TODO: batch
    switch (type) {
      case 'node':
        this.graphCore.addNodes(formattedModels as NodeUserModel[]);
        break;
      case 'edge':
        this.graphCore.addEdges(formattedModels as EdgeUserModel[]);
        break;
      case 'combo':
        //TODO
        break;
      default:
        break;
    }
  }

  /**
   * Remove models from graphCore.
   * @param param item type and id list
   */
  private onRemove(param: { type: ITEM_TYPE, ids: (string | number)[] }) {
    const { type, ids } = param;
    const { userData } = this;
    // remove models from userData, and format the whole dataset with extensions
    userData[`${type}s`] = (userData[`${type}s`] as any).filter(model => !ids.includes(model.id));
    let dataCloned: GraphData = clone(userData);
    this.extensions.forEach(({ func, config }) => {
      dataCloned = func(dataCloned, config);
    });

    // remove from graphCore
    // TODO: batch
    switch (type) {
      case 'node':
        this.graphCore.removeNodes(ids);
        break;
      case 'edge':
        this.graphCore.removeEdges(ids);
        break;
      case 'combo':
        //TODO
        break;
      default:
        break;
    }
  }

  private onUpdate(param: { type: ITEM_TYPE, models: NodeUserModel[] | EdgeUserModel[] | ComboUserModel[] }) {
    const { type, models } = param;
    const { userData } = this;
    // update models in userData, and format the whole dataset with extensions
    userData[`${type}s`] = userData[`${type}s`].map(useModel => {
      const model = (models as any).find(item => item.id === useModel);
      if (model) {
        useModel.data = {
          ...useModel.data,
          ...model.data
        }
      }
      return useModel;
    })
    let dataCloned: GraphData = clone(userData);
    this.extensions.forEach(({ func, config }) => {
      dataCloned = func(dataCloned, config);
    });

    const updateIds = models.map(model => model.id);
    const formattedModels = (dataCloned[`${type}s`] as any).filter(model => updateIds.includes(model.id));

    // TODO: batch
    switch (type) {
      case 'node':
        formattedModels.forEach(model => {
          this.graphCore.mergeNodeData(model.id, model.data);
        });
        break;
      case 'edge':
        formattedModels.forEach(model => {
          this.graphCore.mergeEdgeData(model.id, model.data);
        });
        break;
      case 'combo':
        //TODO
        break;
      default:
        break;
    }
  }
}