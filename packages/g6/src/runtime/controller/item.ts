import { Graph as GraphLib } from "@antv/graphlib";
import { IGraph } from "../../types";
import { registery } from '../../stdlib';
import { getExtension } from "../../util/extension";
import { DisplayGraphCore, GraphCore } from "../../types/data";
import { NodeDisplayModelData } from "../../types/node";
import { EdgeDisplayModelData } from "../../types/edge";
import Node from "../../item/node";
import Edge from "../../item/edge";
import Combo from "../../item/combo";
import { CanvasEvent, Group } from "@antv/g";

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
  public nodes: Node[] = [];
  public edges: Edge[] = [];
  public combos: Combo[] = [];

  private nodeMap: { [id: string | number]: Node } = {};
  private edgeMap: { [id: string | number]: Edge } = {};
  private comboMap: { [id: string | number]: Combo } = {};

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
    this.graph.hooks.render.tap(this.onRender.bind(this));
    this.graph.hooks.additems.tap(this.onAdd.bind(this));
    this.graph.hooks.removeitems.tap(this.onRemove.bind(this));
    this.graph.hooks.updateitems.tap(this.onUpdate.bind(this));
  }

  /**
   * Get the extensions from useLib, stdLib is a subset of useLib.
   */
  private getExtensions() {
    // TODO: user need to config using node/edge/combo types from useLib to spec?
    // const { transform = [] } = this.graph.getSpecification();
    const nodeTypes = ['circle-node', 'rect-node',]; // TODO: WIP
    const edgeTypes = ['line-edge', 'polyline-edge',]; // TODO: WIP
    const comboTypes = ['circle-combo', 'rect-combo',]; // TODO: WIP
    return {
      node: nodeTypes.map(config => getExtension(config, registery.useLib, 'node')).filter(Boolean),
      edge: edgeTypes.map(config => getExtension(config, registery.useLib, 'edge')).filter(Boolean),
      combo: comboTypes.map(config => getExtension(config, registery.useLib, 'combo')).filter(Boolean),
    }
  }

  /**
   * Listener of graph's render hook.
   * @param param contains inner data stored in graphCore structure
   */
  private onRender(param: { graphCore: GraphCore }) {
    const { graphCore } = param;
    const { graph, nodes, edges, nodeExtensions, edgeExtensions, comboExtensions } = this;
    // TODO: 0. clear groups on canvas, and create new groups
    graph.canvas.removeChildren();
    const edgeGroup = new Group({ id: 'edge-group' });
    const nodeGroup = new Group({ id: 'node-group' });
    graph.canvas.appendChild(edgeGroup);
    graph.canvas.appendChild(nodeGroup);

    // TODO: 1. create node / edge / combo items, classes from ../../item, and element drawing and updating fns from node/edge/comboExtensions
    const nodeModels = graphCore.getAllNodes();
    const edgeModels = graphCore.getAllEdges();
    // const combos = graphCore.getAllCombos();
    nodeModels.forEach(node => {
      // TODO: get mapper from theme controller which is analysed from graph spec
      const mapper = node => node;
      const extension = nodeExtensions.find(ext => ext.type === node.data?.type || 'circle-node')
      const item = new Node({
        model: node,
        renderExt: new extension(),
        containerGroup: nodeGroup,
        mapper
      }); // pass extension to node?
      nodes.push(item);
      this.nodeMap[node.id] = item;
    })
    edgeModels.forEach(edge => {
      const { source, target, id } = edge;
      // TODO: get mapper from theme controller which is analysed from graph spec
      const mapper = edge => edge;
      const extension = edgeExtensions.find(ext => ext.type === edge.data?.type || 'line-edge');
      const sourceItem = this.nodeMap[source];
      const targetItem = this.nodeMap[target];
      if (!sourceItem) {
        console.warn(`The source node ${source} is not exist in the graph for edge ${id}, please add the node first`);
      }
      if (!targetItem) {
        console.warn(`The source node ${source} is not exist in the graph for edge ${id}, please add the node first`);
      }
      const item = new Edge({
        model: edge,
        renderExt: new extension(),
        containerGroup: edgeGroup,
        mapper,
        sourceItem,
        targetItem,
      });
      edges.push(item)
    })
    // TODO: combo
  }
  private onAdd() { }
  private onUpdate() {

  }
  private onRemove() { }
}