import GraphLib from "@antv/graphlib";
import { GraphData, IGraph } from "../../types";
import stdlib from '../../stdlib';
import { getExtension } from "../../util/extension";
import { clone } from "@antv/util";

/**
 * Manage the data transform extensions; storage user data and inner data
 */
export class DataController {
  public graph: IGraph;
  public extensions = [];
  /**
   * user input data
   */
  public userData: GraphData;
  /**
   * inner data stored in graphCore structure
   */
  public graphCore;

  constructor(graph: IGraph) {
    this.graph = graph;
    this.graphCore = new GraphLib();
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
   * Get the extensions from stdlib.
   */
  private getExtensions() {
    const { transform } = this.graph.getSpec();
    return transform.map(config => getExtension(config, stdlib, 'transform')).filter(transformer => !!transformer);
  }

  /**
   * Listener of graph's datachange hook.
   * @param param contains new graph data
   */
  private onDataChange(param: { data: GraphData }) {
    const { data } = param;
    this.userData = data;
    let dataCloned = clone(data);
    const { graphCore } = this;

    // transform the data
    this.extensions.forEach(ext => {
      dataCloned = ext(dataCloned);
    })

    // input and store in graphcore
    const { nodes = [], edges = [], combos = [] } = dataCloned;
    // TODO: distinguish combos
    if (!graphCore.getAllNodes().length) {
      graphCore.addNodes(nodes);
    } else {
      data.nodes.forEach(node => {
        if (graphCore.hasNode(node.id)) {
          graphCore.mergeNodeData(node.id, node);
        } else {
          graphCore.addNode(node);
        }
      });
    }

    if (!graphCore.getAllEdges().length) {
      graphCore.addEdges(edges);
    } else {
      data.edges.forEach(edge => {
        if (graphCore.hasEdge(edge.id)) {
          graphCore.mergeEdgeData(edge.id, edge);
        } else {
          graphCore.addEdge(edge);
        }
      });
    }
  }
}