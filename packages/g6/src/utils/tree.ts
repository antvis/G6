import type { EdgeData, GraphData, NodeData } from '../spec';
import type { TreeData } from '../types';
import { dfs } from './traverse';

type TreeDataGetter = {
  getNodeData?: (datum: TreeData, depth: number) => NodeData;
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
export function treeToGraphData(treeData: TreeData, getter?: TreeDataGetter): GraphData {
  const {
    getNodeData = (datum: TreeData, depth: number) => {
      datum.depth = depth;
      if (!datum.children) return datum as NodeData;
      const { children, ...restDatum } = datum;
      return { ...restDatum, children: children.map((child) => child.id) } as NodeData;
    },
    getEdgeData = (source: TreeData, target: TreeData) => ({ source: source.id, target: target.id }),
    getChildren = (datum: TreeData) => datum.children || [],
  } = getter || {};

  const nodes: NodeData[] = [];
  const edges: EdgeData[] = [];

  dfs(
    treeData,
    (node, depth) => {
      nodes.push(getNodeData(node, depth));
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
