import { Graph as GraphLib } from "@antv/graphlib";
import { IGraph } from "../../types";
import stdlib from '../../stdlib';
import { getExtension } from "../../util/extension";
import { DisplayGraphCore, GraphCore } from "../../types/data";
import { NodeDisplayModelData } from "../../types/node";
import { EdgeDisplayModelData } from "../../types/edge";

/**
 * Manages the data transform extensions;
 * Storages user data and inner data.
 */
export class ItemController {
  public graph: IGraph;
  public nodeExtensions = [];
  public edgeExtensions = [];
  public comboExtensions = [];
  /**
   * Display data stored in graphCore structure.
   */
  public graphCore: DisplayGraphCore;

  /**
   * Node / edge / combo items array
   */
  public nodes: Node[];
  public edges: Edge[];
  public combos: Combo[];

  constructor(graph: IGraph) {
    this.graph = graph;
    this.graphCore = new GraphLib<NodeDisplayModelData, EdgeDisplayModelData>();
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
    this.graph.hooks.render.tap(this.onRender);
  }

  /**
   * Get the extensions from stdlib.
   */
  private getExtensions() {
    const { transform } = this.graph.getSpec();
    return {
      node: transform.map(config => getExtension(config, stdlib, 'node')).filter(transformer => !!transformer),
      edge: transform.map(config => getExtension(config, stdlib, 'edge')).filter(transformer => !!transformer),
      combo: transform.map(config => getExtension(config, stdlib, 'combo')).filter(transformer => !!transformer),
    }
  }

  /**
   * Listener of graph's render hook.
   * @param param contains inner data stored in graphCore structure
   */
  private onRender(param: { graphCore: GraphCore }) {
    const { graphCore } = param;
    // TODO: 1. create node / edge / combo items, classes from node/edge/comboExtensions
    // TODO: 2. draw them
  }
}