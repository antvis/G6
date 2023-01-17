import { Graph as GraphLib } from "@antv/graphlib";
import { GraphData, IGraph } from "../../types";
import { registery } from '../../stdlib';
import { getExtension } from "../../util/extension";
import { clone } from "@antv/util";
import { NodeModelData } from "../../types/node";
import { EdgeModelData } from "../../types/edge";
import { GraphCore } from "../../types/data";

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

  /**
   * Subscribe the lifecycle of graph.
   */
  private tap() {
    this.extensions = this.getExtensions();
    this.graph.hooks.datachange.tap(this.onDataChange);
  }

  /**
   * Get the extensions from useLib.
   */
  private getExtensions() {
    const { transform = [] } = this.graph.getSpecification();
    return transform.map(config => getExtension(config, registery.useLib, 'transform')).filter(transformer => !!transformer);
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
    this.extensions.forEach(ext => {
      dataCloned = ext(dataCloned,); // TODO: configs
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
}