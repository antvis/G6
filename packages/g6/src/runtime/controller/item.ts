import { Graph as GraphLib, GraphChange, ID } from "@antv/graphlib";
import { ComboModel, IGraph } from "../../types";
import { registery } from '../../stdlib';
import { getExtension } from "../../util/extension";
import { DisplayGraphCore, GraphCore } from "../../types/data";
import { NodeDisplayModel, NodeDisplayModelData, NodeEncode, NodeModel, NodeModelData } from "../../types/node";
import { EdgeDisplayModel, EdgeDisplayModelData, EdgeEncode, EdgeModel, EdgeModelData } from "../../types/edge";
import Node from "../../item/node";
import Edge from "../../item/edge";
import Combo from "../../item/combo";
import { Group } from "@antv/g";
import { ITEM_TYPE } from "../../types/item";
import { ComboDisplayModel, ComboDisplayModelData, ComboEncode } from "../../types/combo";
import { isFunction } from "_@antv_util@3.3.2@@antv/util";

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
  // public graphCore: DisplayGraphCore;

  /**
   * Node / edge / combo items map
   */
  private nodeMap: { [id: ID]: Node } = {};
  private edgeMap: { [id: ID]: Edge } = {};
  private comboMap: { [id: ID]: Combo } = {};
  private itemMap: { [id: ID]: Node | Edge | Combo } = {};

  /**
   * node / edge / combo 's mapper in graph config
   */
  private nodeMapper: ((data: NodeModel) => NodeDisplayModel) | NodeEncode;
  private edgeMapper: ((data: EdgeModel) => EdgeDisplayModel) | EdgeEncode;
  private comboMapper: ((data: ComboModel) => ComboDisplayModel) | ComboEncode;

  private nodeGroup: Group;
  private edgeGroup: Group;
  // TODO: combo? not a independent group

  constructor(graph: IGraph<any>) {
    this.graph = graph;
    // this.graphCore = new GraphLib<NodeDisplayModelData, EdgeDisplayModelData>();
    // get mapper for node / edge/ combo
    const spec = graph.getSpecification();
    const { node, edge, combo } = spec;
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
    const extensions = this.getExtensions();
    this.nodeExtensions = extensions.node;
    this.edgeExtensions = extensions.edge;
    this.comboExtensions = extensions.combo;
    this.graph.hooks.render.tap(this.onRender.bind(this));
    this.graph.hooks.itemchange.tap(this.onChange.bind(this));
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
    const { graph, edgeExtensions, comboExtensions } = this;
    // TODO: 0. clear groups on canvas, and create new groups
    graph.canvas.removeChildren();
    const edgeGroup = new Group({ id: 'edge-group' });
    const nodeGroup = new Group({ id: 'node-group' });
    graph.canvas.appendChild(edgeGroup);
    graph.canvas.appendChild(nodeGroup);
    this.nodeGroup = nodeGroup;
    this.edgeGroup = edgeGroup;

    // TODO: 1. create node / edge / combo items, classes from ../../item, and element drawing and updating fns from node/edge/comboExtensions
    const nodeModels = graphCore.getAllNodes();
    const edgeModels = graphCore.getAllEdges();
    // const combos = graphCore.getAllCombos();

    this.addNodes(nodeModels);
    this.addEdges(edgeModels);
    // TODO: combo
  }

  private onChange(param: { type: ITEM_TYPE, changes: GraphChange<NodeModelData, EdgeModelData>[], graphCore: GraphCore }) {
    const { changes, graphCore } = param;
    const groupedChanges = {
      'NodeRemoved': [],
      'EdgeRemoved': [],
      'NodeAdded': [],
      'EdgeAdded': [],
      'NodeDataUpdated': [],
      'EdgeUpdated': [],
      'EdgeDataUpdated': []
    }
    changes.forEach(change => {
      const { type: changeType } = change;
      groupedChanges[changeType].push(change);
    });
    const { itemMap, nodeMap, edgeMap, comboMap, nodeMapper, edgeMapper, comboMapper } = this;
    // change items according to the order of the keys in groupedChanges
    // === 1. remove edges; 2. remove nodes ===
    const removedChanges = groupedChanges.EdgeRemoved.concat(groupedChanges.NodeRemoved);
    removedChanges.forEach(({ value }) => {
      const { id } = value;
      const item = itemMap[id];
      if (item) {
        item.destroy();
        delete itemMap[id];

        const itemType = item.getType();
        const map = this[`${itemType}Map`];
        if (map) delete map[id];
      }
    });
    // === 3. add nodes ===
    if (groupedChanges.NodeAdded.length) {
      this.addNodes(Object.values(groupedChanges.NodeAdded).map(change => change.value));
    }
    // === 4. add edges ===
    if (groupedChanges.EdgeAdded.length) {
      this.addEdges(Object.values(groupedChanges.EdgeAdded).map(change => change.value));
    }

    // === 5. update nodes ===
    // merge changes for each node
    if (groupedChanges.NodeDataUpdated?.length) {
      const nodeUpdate = {};
      groupedChanges.NodeDataUpdated.forEach((change) => {
        const { id, propertyName, newValue, oldValue } = change;
        nodeUpdate[id] = nodeUpdate[id] || { oldData: {}, newData: {} };
        if (!propertyName) {
          nodeUpdate[id] = {
            isReplace: true,
            oldData: oldValue,
            newData: newValue
          }
        } else {
          nodeUpdate[id].oldData[propertyName] = oldValue;
          nodeUpdate[id].newData[propertyName] = newValue;
        }
      });
      const edgeToUpdate = {};
      Object.keys(nodeUpdate).forEach(id => {
        const { isReplace, newData, oldData } = nodeUpdate[id];
        const item = nodeMap[id];
        const innerModel = graphCore.getNode(id);
        if (isReplace) {
          item.update(innerModel, { newData, oldData });
        } else {
          item.update(innerModel, { newData, oldData }, Object.keys(nodeUpdate[id]));
        }
        const relatedEdgeInnerModels = graphCore.getRelatedEdges(id);
        relatedEdgeInnerModels.forEach(edge => edgeToUpdate[edge.id] = edge);
      });
      Object.keys(edgeToUpdate).forEach(edgeId => {
        const item = edgeMap[edgeId];
        item.forceUpdate();
      });
    }

    // === 6. update edges' data ===

    // === 7. update edges' source target ===

  }

  private addNodes(models: NodeModel[]) {
    const { nodeExtensions, nodeGroup } = this;
    models.forEach(node => {
      // TODO: get mapper from theme controller which is analysed from graph spec
      const extension = nodeExtensions.find(ext => ext.type === node.data?.type || 'circle-node')
      const item = new Node({
        model: node,
        renderExt: new extension(),
        containerGroup: nodeGroup,
        mapper: this.nodeMapper,
      }); // pass extension to node?
      this.nodeMap[node.id] = item;
      this.itemMap[node.id] = item;
    });
  }

  private addEdges(models: EdgeModel[]) {
    const { edgeExtensions, edgeGroup, nodeMap, edgeMap, itemMap } = this;
    models.forEach(edge => {
      const { source, target, id } = edge;
      // TODO: get mapper from theme controller which is analysed from graph spec
      const extension = edgeExtensions.find(ext => ext.type === edge.data?.type || 'line-edge');
      const sourceItem = nodeMap[source];
      const targetItem = nodeMap[target];
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
        mapper: this.edgeMapper,
        sourceItem,
        targetItem,
      });
      edgeMap[id] = item;
      itemMap[id] = item;
    })
  }
}