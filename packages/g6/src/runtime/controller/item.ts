import { GraphChange, ID } from "@antv/graphlib";
import { ComboModel, IGraph } from "../../types";
import { registery } from '../../stdlib';
import { getExtension } from "../../util/extension";
import { GraphCore } from "../../types/data";
import { NodeDisplayModel, NodeEncode, NodeModel, NodeModelData } from "../../types/node";
import { EdgeDisplayModel, EdgeEncode, EdgeModel, EdgeModelData } from "../../types/edge";
import Node from "../../item/node";
import Edge from "../../item/edge";
import Combo from "../../item/combo";
import { Group } from "@antv/g";
import { ITEM_TYPE } from "../../types/item";
import { ComboDisplayModel, ComboEncode } from "../../types/combo";

/**
 * Manages and stores the node / edge / combo items.
 */
export class ItemController {
  public graph: IGraph;
  public nodeExtensions = [];
  public edgeExtensions = [];
  public comboExtensions = [];

  /**
   * Node / edge / combo items map
   */
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
    // get mapper for node / edge / combo
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
   * Listener of runtime's render hook.
   * @param param contains inner data stored in graphCore structure
   */
  private onRender(param: { graphCore: GraphCore }) {
    const { graphCore } = param;
    const { graph } = this;
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

    this.renderNodes(nodeModels);
    this.renderEdges(edgeModels);
    // TODO: combo
  }

  /**
   * Listener of runtime's itemchange lifecycle hook.
   * @param param 
   */
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
    const { itemMap } = this;
    // change items according to the order of the keys in groupedChanges

    // === 1. remove edges; 2. remove nodes ===
    groupedChanges.EdgeRemoved.concat(groupedChanges.NodeRemoved).forEach(({ value }) => {
      const { id } = value;
      const item = itemMap[id];
      if (item) {
        item.destroy();
        delete itemMap[id];
      }
    });
    // === 3. add nodes ===
    if (groupedChanges.NodeAdded.length) {
      this.renderNodes(groupedChanges.NodeAdded.map(change => change.value));
    }
    // === 4. add edges ===
    if (groupedChanges.EdgeAdded.length) {
      this.renderEdges(groupedChanges.EdgeAdded.map(change => change.value));
    }

    // === 5. update nodes's data ===
    // merge changes for each node
    if (groupedChanges.NodeDataUpdated.length) {
      const nodeUpdate = {};
      groupedChanges.NodeDataUpdated.forEach((change) => {
        const { id, propertyName, newValue, oldValue } = change;
        nodeUpdate[id] = nodeUpdate[id] || { oldData: {}, newData: {} };
        if (!propertyName) {
          nodeUpdate[id] = {
            isReplace: true, // whether replace the whole data
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
        const item = itemMap[id];
        const innerModel = graphCore.getNode(id);
        item.update(innerModel, { newData, oldData }, isReplace ? undefined : Object.keys(nodeUpdate[id]));
        const relatedEdgeInnerModels = graphCore.getRelatedEdges(id);
        relatedEdgeInnerModels.forEach(edge => edgeToUpdate[edge.id] = edge);
      });
      Object.keys(edgeToUpdate).forEach(edgeId => {
        const item = itemMap[edgeId] as Edge;
        item.forceUpdate();
      });
    }

    // === 6. update edges' data ===
    if (groupedChanges.EdgeDataUpdated.length) {
      const edgeUpdate = {};
      groupedChanges.EdgeDataUpdated.forEach(change => {
        const { id, propertyName, newValue, oldValue } = change;
        edgeUpdate[id] = edgeUpdate[id] || { oldData: {}, newData: {} };
        if (!propertyName) {
          edgeUpdate[id] = {
            isReplace: true, // whether replace the whole data
            oldData: oldValue,
            newData: newValue
          }
        } else {
          edgeUpdate[id].oldData[propertyName] = oldValue;
          edgeUpdate[id].newData[propertyName] = newValue;
        }
      });

      Object.keys(edgeUpdate).forEach(id => {
        const { isReplace, newData, oldData } = edgeUpdate[id];
        const item = itemMap[id];
        const innerModel = graphCore.getEdge(id);
        item.update(innerModel, { newData, oldData }, isReplace ? undefined : Object.keys(edgeUpdate[id]));
      });
    }

    // === 7. update edges' source target ===
    if (groupedChanges.EdgeUpdated.length) {
      const edgeUpdate = {};
      groupedChanges.EdgeUpdated.forEach(change => {
        // propertyName is 'source' or 'target'
        const { id, propertyName, newValue } = change;
        edgeUpdate[id] = edgeUpdate[id] || {};
        edgeUpdate[id][propertyName] = newValue;
      });

      Object.keys(edgeUpdate).forEach(id => {
        const { source, target } = edgeUpdate[id];
        const item = itemMap[id] as Edge;
        if (source !== undefined) item.updateEnd('source', this.itemMap[source] as Node);
        if (target !== undefined) item.updateEnd('target', this.itemMap[target] as Node);
      });
    }

  }

  /**
   * Create nodes with inner data to canvas.
   * @param models nodes' inner datas
   */
  private renderNodes(models: NodeModel[]) {
    const { nodeExtensions, nodeGroup } = this;
    models.forEach(node => {
      // TODO: get mapper from theme controller which is analysed from graph spec
      const extension = nodeExtensions.find(ext => ext.type === node.data?.type || 'circle-node')
      this.itemMap[node.id] = new Node({
        model: node,
        renderExt: new extension(),
        containerGroup: nodeGroup,
        mapper: this.nodeMapper,
      });
    });
  }

  /**
   * Create edges with inner data to canvas.
   * @param models edges' inner datas
   */
  private renderEdges(models: EdgeModel[]) {
    const { edgeExtensions, edgeGroup, itemMap } = this;
    models.forEach(edge => {
      const { source, target, id } = edge;
      // TODO: get mapper from theme controller which is analysed from graph spec
      const extension = edgeExtensions.find(ext => ext.type === edge.data?.type || 'line-edge');
      const sourceItem = itemMap[source] as Node;
      const targetItem = itemMap[target] as Node;
      if (!sourceItem) {
        console.warn(`The source node ${source} is not exist in the graph for edge ${id}, please add the node first`);
      }
      if (!targetItem) {
        console.warn(`The source node ${source} is not exist in the graph for edge ${id}, please add the node first`);
      }
      itemMap[id] = new Edge({
        model: edge,
        renderExt: new extension(),
        containerGroup: edgeGroup,
        mapper: this.edgeMapper,
        sourceItem,
        targetItem,
      });
    });
  }
}