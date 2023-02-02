import { Graph as GraphLib } from "@antv/graphlib";
import { IGraph } from "../../types";
import { registery } from '../../stdlib';
import { getExtension } from "../../util/extension";
import { DisplayGraphCore, GraphCore } from "../../types/data";
import { NodeDisplayModelData } from "../../types/node";
import { EdgeDisplayModelData } from "../../types/edge";
import Edge from "../../item/edge";
import Combo from "../../item/combo";

/**
 * Manages and stores the node / edge / combo items.
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

  constructor(graph: IGraph<any>) {
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
   * Get the extensions from useLib, stdLib is a subset of useLib.
   */
  private getExtensions() {
    const { transform = [] } = this.graph.getSpecification();
    return {
      node: transform.map(config => getExtension(config, registery.useLib, 'node')).filter(transformer => !!transformer),
      edge: transform.map(config => getExtension(config, registery.useLib, 'edge')).filter(transformer => !!transformer),
      combo: transform.map(config => getExtension(config, registery.useLib, 'combo')).filter(transformer => !!transformer),
    }
  }

  /**
   * Listener of graph's render hook.
   * @param param contains inner data stored in graphCore structure
   */
  private onRender(param: { graphCore: GraphCore }) {
    const { graphCore } = param;
    // TODO: 1. create node / edge / combo items, classes from ../../item, and element drawing and updating fns from node/edge/comboExtensions
    // TODO: 2. draw them
  }
}