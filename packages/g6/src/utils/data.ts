import { connectedComponent, depthFirstSearch } from '@antv/algorithm';
import { ID, TreeData } from '@antv/graphlib';
import { isArray } from '@antv/util';
import { NodeModel, NodeUserModel } from '../types';
import { DataLifecycleType, GraphCore, GraphData } from '../types/data';
import { Graph } from '../types/graph';
import { NodeUserModelData } from '../types/node';
import { warn } from './invariant';

/**
 * Deconstruct data and distinguish nodes and combos from graphcore data.
 * @param data data from graphcore
 * @returns
 */
export const deconstructData = (data) => {
  const { nodes: nodesAndCombos = [], edges = [] } = data;
  const nodes = [];
  const combos = [];
  nodesAndCombos.forEach((item) => {
    if (item.data._isCombo) combos.push(item);
    else nodes.push(item);
  });
  return {
    nodes,
    edges,
    combos,
  };
};

/**
 * Depth first search begin from nodes in graphCore data.
 * @param graphCore graphlib data structure
 * @param nodes begin nodes
 * @param fn will be called while visiting each node
 * @param mode 'TB' - visit from top to bottom; 'BT' - visit from bottom to top;
 * @param treeKey
 * @param stopFns
 * @param stopFns.stopBranchFn
 * @param stopFns.stopAllFn
 */
export const graphCoreTreeDfs = (
  graphCore: GraphCore,
  nodes: NodeUserModel[],
  fn,
  mode: 'TB' | 'BT' = 'TB',
  treeKey = 'combo',
  stopFns: {
    stopBranchFn?: (node: NodeUserModel) => boolean;
    stopAllFn?: (node: NodeUserModel) => boolean;
  } = {},
) => {
  if (!nodes?.length) return;
  const { stopBranchFn, stopAllFn } = stopFns;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (!graphCore.hasNode(node.id)) continue;
    if (stopBranchFn?.(node)) continue; // Stop this branch
    if (stopAllFn?.(node)) return; // Stop all
    if (mode === 'TB') fn(node); // Traverse from top to bottom
    graphCoreTreeDfs(graphCore, graphCore.getChildren(node.id, treeKey), fn, mode, treeKey, stopFns);
    if (mode !== 'TB') fn(node); // Traverse from bottom to top
  }
};

/**
 * Depth first search begin from nodes in g6 graph data.
 * @param graph G6 graph instance
 * @param nodes begin nodes
 * @param fn will be called while visiting each node
 * @param mode 'TB' - visit from top to bottom; 'BT' - visit from bottom to top;
 */
export const graphComboTreeDfs = (graph: Graph, nodes: NodeUserModel[], fn, mode: 'TB' | 'BT' = 'TB') => {
  if (!nodes?.length) return;
  nodes.forEach((node) => {
    if (mode === 'TB') fn(node); // Traverse from top to bottom
    graphComboTreeDfs(graph, graph.getComboChildrenData(node.id), fn, mode);
    if (mode !== 'TB') fn(node); // Traverse from bottom to top
  });
};

/**
 * Depth first search begin from nodes in g6 graph data, and then search the ancestors from begin nodes.
 * @param graph G6 graph instance
 * @param graphCore graphlib data structure
 * @param nodes begin nodes
 * @param fn will be called while visiting each node
 * @param mode 'TB' - visit from top to bottom; 'BT' - visit from bottom to top;
 */
export const traverseAncestorsAndSucceeds = (
  graph: Graph,
  graphCore: GraphCore,
  nodes: NodeUserModel[],
  fn,
  mode: 'TB' | 'BT' = 'TB',
) => {
  if (!nodes?.length) return;
  graphComboTreeDfs(graph, nodes, fn, mode);
  traverseAncestors(graphCore, nodes, fn);
  return;
};

export const traverseGraphAncestors = (graph: Graph, nodes: NodeUserModel[], fn) => {
  if (!nodes?.length) return;
  nodes.forEach((node) => {
    if (!node.data.parentId) return;
    let ancestor = graph.getComboData(node.data.parentId);
    while (ancestor) {
      if (fn(ancestor)) return;
      if (!ancestor.data.parentId) return;
      ancestor = graph.getComboData(ancestor.data.parentId);
    }
  });
};

/**
 * Traverse the ancestors from the begin nodes.
 * @param graphCore graphlib data structure
 * @param nodes begin nodes
 * @param fn will be called while visiting each node
 */
export const traverseAncestors = (graphCore, nodes, fn) => {
  nodes.forEach((node) => {
    let ancestor = graphCore.getParent(node.id, 'combo');
    while (ancestor) {
      if (fn(ancestor)) return;
      ancestor = graphCore.getParent(ancestor.id, 'combo');
    }
  });
};

/**
 * Whether the test succeed is a parent of the test parent.
 * @param graph G6 graph instance
 * @param testParent id of the node to be the parent
 * @param parentId id of the node to be the succeed
 * @param testSucceed
 * @returns
 */
export const isSucceed = (graph, testParent, testSucceed): boolean => {
  const succeedIds = [];
  if (graph.getNodeData(testParent)) return false;
  graphComboTreeDfs(graph, [graph.getComboData(testParent)], (node) => {
    succeedIds.push(node.id);
  });
  if (succeedIds.includes(testSucceed)) return true;
  return false;
};

/**
 * Check the validation if move the child into the subtree of parent. e.g. If the new parent (toBeAncestorId) is a succeed of new child (toBeSucceedId), it is invalid.
 * @param graph G6 graph instance
 * @param toBeSucceedId id of the new child to check if it is valid to be a child of the node with id toBeAncestorId
 * @param toBeAncestorId id of the new parent to check if it is valid to be a parent of the node with id toBeSucceedId
 * @returns
 */
export const validateComboStructure = (graph, toBeSucceedId, toBeAncestorId): boolean => {
  if (toBeAncestorId && !graph.getComboData(toBeAncestorId)) {
    warn(`Setting parent combo failed. The parent combo with id ${toBeAncestorId} does not exist`);
    return false;
  }
  if (toBeSucceedId === toBeAncestorId) {
    warn(`Setting parent combo failed. Cannot set combo/node with id ${toBeSucceedId} to be the child of itself.`);
    return false;
  }
  if (toBeAncestorId && isSucceed(graph, toBeSucceedId, toBeAncestorId)) {
    warn(
      `Setting parent combo failed, since the parent combo with id ${toBeAncestorId} is a succeed of the combo with id ${toBeSucceedId}.`,
    );
    return false;
  }
  return true;
};

/**
 * Transform tree graph data into graph data. Edges from parent-child structure.
 * @param treeData Tree structured data or an array of it.
 * @returns Graph formatted data object with nodes, edges and combos.
 */
export const treeData2GraphData = (treeData: TreeData<NodeUserModelData> | TreeData<NodeUserModelData>[]) => {
  const graphData = {
    nodes: [],
    edges: [],
    combos: [],
  };
  const trees = isArray(treeData) ? treeData : [treeData];
  trees.forEach((tree) => {
    traverse(tree, (child) => {
      const { id, children, data, ...others } = child;
      graphData.nodes.push({
        id: child.id,
        data: {
          childrenIds: child.children?.map((c) => c.id) || [],
          ...others,
          ...data,
        },
      });
      child.children?.forEach((subChild) => {
        graphData.edges.push({
          id: `tree-edge-${child.id}-${subChild.id}`,
          source: child.id,
          target: subChild.id,
          data: {},
        });
      });
    });
  });
  return graphData;
};

/**
 * Transform graph data into tree graph data.
 * @param nodeMap This function will cache the nodes into nodeMap
 * @param graphData Graph data.
 * @param propRootIds Ids of root nodes. There should be at least one node for each connected component, or the first node in a connected component will be added to the roots array.
 * @returns
 */
export const graphData2TreeData = (nodeMap: { [id: string]: any }, graphData: GraphData, propRootIds: ID[] = []) => {
  const trees = [];
  const graphDataWithoutCombos = {
    nodes: graphData.nodes?.filter((node) => !node.data._isCombo),
    edges: graphData.edges,
  };
  const connectedComponents = connectedComponent(graphDataWithoutCombos as any, false) as NodeModel[][];
  const rootIds = [];
  const componentsNodeIds: ID[][] = [];
  connectedComponents.forEach((com, i) => {
    componentsNodeIds[i] = com.map((node) => node.id);
    if (propRootIds.length) {
      const root = componentsNodeIds[0].find((id) => propRootIds.includes(id));
      rootIds.push(root !== undefined ? root : com[0].id);
    } else {
      rootIds.push(com[0].id);
    }
  });

  rootIds.forEach((id, i) => {
    nodeMap[id] = { id, children: [] };
    trees.push(nodeMap[id]);
    depthFirstSearch(
      graphData as any,
      id,
      {
        enter: ({ previous, current }) => {
          if (!previous || current === id || !componentsNodeIds[i].includes(current)) return;
          nodeMap[previous] = nodeMap[previous] || {
            id: previous,
            children: [],
          };
          nodeMap[current] = { id: current, children: [] };
          nodeMap[previous].children.push(nodeMap[current]);
        },
      },
      false,
    );
  });
  return trees;
};

/**
 * Traverse a tree data from top to bottom.
 * @param treeData
 * @param callback
 */
export const traverse = (treeData, callback) => {
  callback(treeData);
  if (treeData.children) {
    treeData.children.forEach((child) => {
      if (child) traverse(child, callback);
    });
  }
};

export const DEFAULT_ACTIVE_DATA_LIFECYCLE = 'all';

export const AVAILABLE_DATA_LIFECYCLE = ['read', 'changeData', 'updateData', 'addData', 'removeData'];

export const dataLifecycleMap: Record<string, DataLifecycleType> = {
  replace: 'read',
  mergeReplace: 'changeData',
  union: 'addData',
  remove: 'removeData',
  update: 'updateData',
  updatePosition: 'updatePosition',
};

/**
 * Whether the graph is empty.
 * @param graph graph instance.
 * @param excludeInvisible whether exclude invisible. true means the function should test without visible items.
 * @returns graph is empty or not.
 */
export const isEmptyGraph = (graph, excludeInvisible = false): boolean => {
  const nodes = graph.getAllNodesData();
  const combos = graph.getAllCombosData();
  if (nodes.length === 0 && combos.length === 0) return true;

  if (excludeInvisible) {
    const edges = graph.getAllEdgesData();
    if (nodes.find((node) => graph.getItemVisible(node.id))) return false;
    if (edges.find((edge) => graph.getItemVisible(edge.id))) return false;
    if (combos.find((combo) => graph.getItemVisible(combo.id))) return false;
    return true;
  }
  return false;
};

/**
 * Clone an object by JSON stringify and parse
 * @param obj
 * @returns
 */
export const cloneJSON = (obj) => {
  if (!obj) return obj;
  return JSON.parse(JSON.stringify(obj));
};
