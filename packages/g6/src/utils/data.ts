import { connectedComponent, depthFirstSearch } from '@antv/algorithm';
import { Edge, ID, Node, TreeData } from '@antv/graphlib';
import { isArray } from '@antv/util';
import type { Graph } from '../runtime/graph';
import { ComboData, DataOptions, EdgeData, NodeData } from '../spec/data';
import { NodeModel } from '../types';
import { DataModel, GraphData } from '../types/data';
import { NodeUserModelData } from '../types/node';
import { idOf } from './id';
import { warn } from './invariant';

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
  graphCore: DataModel,
  nodes: NodeData[],
  fn: (node: NodeData) => void,
  mode: 'TB' | 'BT' = 'TB',
  treeKey = 'combo',
  stopFns: {
    stopBranchFn?: (node: NodeData) => boolean;
    stopAllFn?: (node: NodeData) => boolean;
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
 * @param callback
 * @param mode 'TB' - visit from top to bottom; 'BT' - visit from bottom to top;
 */
export const graphComboTreeDfs = (
  graph: Graph,
  nodes: NodeData[],
  callback: (node: NodeData) => void,
  mode: 'TB' | 'BT' = 'TB',
) => {
  if (!nodes?.length) return;
  nodes.forEach((node) => {
    if (mode === 'TB') callback(node); // Traverse from top to bottom
    graphComboTreeDfs(graph, graph.getComboChildrenData(node.id), callback, mode);
    if (mode !== 'TB') callback(node); // Traverse from bottom to top
  });
};

/**
 * Depth first search begin from nodes in g6 graph data, and then search the ancestors from begin nodes.
 * @param graph G6 graph instance
 * @param dataModel graphlib data structure
 * @param nodes begin nodes
 * @param fn will be called while visiting each node
 * @param mode 'TB' - visit from top to bottom; 'BT' - visit from bottom to top;
 */
export const traverseAncestorsAndSucceeds = (
  graph: Graph,
  dataModel: DataModel,
  nodes: NodeData[],
  fn: (node: NodeData) => void,
  mode: 'TB' | 'BT' = 'TB',
) => {
  if (!nodes?.length) return;
  graphComboTreeDfs(graph, nodes, fn, mode);
  traverseAncestors(dataModel, nodes, fn);
  return;
};

export const traverseGraphAncestors = (graph: Graph, nodes: NodeData[], fn) => {
  if (!nodes?.length) return;
  nodes.forEach((node) => {
    if (!node?.style?.parentId) return;
    let [ancestor] = graph.getComboData([node?.style?.parentId]);
    while (ancestor) {
      if (fn(ancestor)) return;
      if (!ancestor?.style?.parentId) return;
      ancestor = graph.getComboData([ancestor?.style?.parentId])[0];
    }
  });
};

/**
 * Traverse the ancestors from the begin nodes.
 * @param dataModel graphlib data structure
 * @param nodes begin nodes
 * @param fn will be called while visiting each node
 */
export const traverseAncestors = (dataModel: DataModel, nodes: NodeData[], fn: (data: NodeData) => void | boolean) => {
  nodes.forEach((node) => {
    let ancestor = dataModel.getParent(node.id, 'combo');
    while (ancestor) {
      if (fn(ancestor.data)) return;
      ancestor = dataModel.getParent(ancestor.id, 'combo');
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

/**
 * Whether the graph is empty.
 * @param graph graph instance.
 * @param excludeInvisible whether exclude invisible. true means the function should test without visible items.
 * @returns graph is empty or not.
 */
export const isEmptyGraph = (graph, excludeInvisible = false): boolean => {
  const nodes = graph.getNodeData();
  const combos = graph.getComboData();
  if (nodes.length === 0 && combos.length === 0) return true;

  if (excludeInvisible) {
    const edges = graph.getEdgeData();
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

export function transformSpecDataToGraphlibData<T extends EdgeData>(datums: T[]): Edge<T>[];
export function transformSpecDataToGraphlibData<T extends NodeData | ComboData>(datums: T[]): Node<T>[];
/**
 * <zh/> 将 NodeSpec | EdgeSpec | ComboSpec 转换为 graphlib 的数据结构
 *
 * <en/> Transform NodeSpec | EdgeSpec | ComboSpec to graphlib data structure
 * @param datums - <zh/> 用户数据 | <en/> user data
 * @returns <zh/> graphlib 数据 | <en/> graphlib data
 */
export function transformSpecDataToGraphlibData<T extends NodeData | EdgeData | ComboData>(
  datums: T[],
): (Node<T> | Edge<T>)[] {
  if (!datums.length) return [];
  if ('source' in datums[0] && 'target' in datums[0]) {
    return (datums as EdgeData[]).map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      data: edge,
    })) as Edge<T>[];
  }
  return datums.map((datum) => ({ id: datum.id, data: datum })) as Node<T>[];
}

/**
 * <zh/> 获取节点/边/Combo 的 ID
 *
 * <en/> Get the ID of node/edge/combo
 * @param data - <zh/> 节点/边/Combo 的数据 | <en/> data of node/edge/combo
 * @returns - <zh/> 节点/边/Combo 的 ID | <en/> ID of node/edge/combo
 */
export function dataIdOf(data: DataOptions) {
  const { nodes = [], edges = [], combos = [] } = data;
  return {
    nodes: nodes.map(idOf),
    edges: edges.map(idOf),
    combos: combos.map(idOf),
  };
}
