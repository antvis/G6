import type { ID } from '@antv/graphlib';
import { omit } from '@antv/util';
import type { EdgeData, GraphData, NodeData } from '../spec';
import type { TreeData } from '../types';
import { dfs } from './traverse';

type GraphDataGetter = {
  getID?: (datum: NodeData) => ID;
  getTreeNodeData?: (datum: NodeData) => TreeData;
};

/**
 * <zh/> 将图数据转换为树数据
 *
 * <en/> Convert graph data to tree data
 * @param graphData - <zh/> 图数据 | <en/> Graph data
 * @param getter - <zh/> 获取 ID 和树节点数据的方法 | <en/> Methods to get ID and tree node data
 * @returns <zh/> 树数据 | <en/> Tree data
 */
export function transformGraphDataToTreeData(graphData: GraphData, getter?: GraphDataGetter): TreeData[] {
  const { nodes = [], edges = [] } = graphData;
  const { getID = (datum: NodeData) => datum.id, getTreeNodeData = (datum: NodeData) => datum as TreeData } =
    getter || {};

  const nodeIdToChildren: Record<ID, NodeData[]> = {};

  for (const edge of edges) {
    const { source, target } = edge;
    if (!(source in nodeIdToChildren)) {
      nodeIdToChildren[source] = [];
    }
    nodeIdToChildren[source].push(nodes.find((node) => node.id === target)!);
  }

  const treeData: TreeData[] = [];
  const visited: Set<ID> = new Set();

  for (const node of nodes) {
    if (!visited.has(getID(node))) {
      const tree: TreeData = { ...getTreeNodeData(node), children: [] };
      dfs(
        node,
        (n) => {
          if (node === n) return;
          visited.add(getID(n));
          tree.children!.push(getTreeNodeData(n));
        },
        (n: NodeData) => nodeIdToChildren[getID(n)],
        'TB',
      );
      treeData.push(tree);
    }
  }

  return treeData;
}

type TreeDataGetter = {
  getNodeData?: (datum: TreeData) => NodeData;
  getEdgeData?: (source: TreeData, target: TreeData) => EdgeData;
  getChildren?: (datum: TreeData) => TreeData[];
};

/**
 * <zh/> 将树数据转换为图数据
 *
 * <en/> Convert tree data to graph data
 * @param treeData - <zh/> 树数据 | <en/> Tree data
 * @param getter - <zh/> 获取节点和边的方法 | <en/> Methods to get nodes and edges
 * @returns <zh/> 图数据 | <en/> Graph data
 */
export function transformTreeDataToGraphData(treeData: TreeData, getter?: TreeDataGetter): GraphData {
  const {
    getNodeData = (datum: TreeData) => omit(datum, ['children']) as NodeData,
    getEdgeData = (source: TreeData, target: TreeData) => ({ source: source.id, target: target.id }),
    getChildren = (datum: TreeData) => datum.children || [],
  } = getter || {};

  const nodes: NodeData[] = [];
  const edges: EdgeData[] = [];

  dfs(
    treeData,
    (node) => {
      nodes.push(getNodeData(node));
      const children = getChildren(node);
      for (const child of children) {
        edges.push(getEdgeData(node, child));
      }
    },
    (node) => getChildren(node),
    'TB',
  );

  return { nodes, edges };
}
