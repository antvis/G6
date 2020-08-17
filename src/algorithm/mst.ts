import { IGraph } from '../interface/graph';
import { IEdge } from '../interface/item';
import UnionFind from './structs/union-find';
import MinBinaryHeap from './structs/binary-heap';

/**
 * Prim algorithm，use priority queue，复杂度 O(E+V*logV), V: 节点数量，E: 边的数量
 * refer: https://en.wikipedia.org/wiki/Prim%27s_algorithm
 * @param graph
 * @param weight 指定用于作为边权重的属性，若不指定，则认为所有边权重一致
 */
const primMST = (graph: IGraph, weight?: string) => {
  const selectedEdges = [];
  const nodes = graph.getNodes();
  if (nodes.length === 0) {
    return selectedEdges;
  }

  // 从nodes[0]开始
  const currNode = nodes[0];
  const visited = new Set();
  visited.add(currNode);

  // 用二叉堆维护距已加入节点的其他节点的边的权值
  const compareWeight = (a: IEdge, b: IEdge) => {
    if (weight) {
      return (a.getModel()[weight] as number) - (b.getModel()[weight] as number);
    } 
      return 0;
    
  };
  const edgeQueue = new MinBinaryHeap(compareWeight);
  currNode.getEdges().forEach((edge) => {
    edgeQueue.insert(edge);
  });

  while (!edgeQueue.isEmpty()) {
    // 选取与已加入的结点之间边权最小的结点
    // console.log(edgeQueue.list.map(edge => edge.getModel().weight))
    const currEdge = edgeQueue.delMin();
    const source = currEdge.getSource();
    const target = currEdge.getTarget();
    if (visited.has(source) && visited.has(target)) continue;
    selectedEdges.push(currEdge);

    if (!visited.has(source)) {
      visited.add(source);
      source.getEdges().forEach((edge) => {
        edgeQueue.insert(edge);
      });
    }
    if (!visited.has(target)) {
      visited.add(target);
      target.getEdges().forEach((edge) => {
        edgeQueue.insert(edge);
      });
    }
  }
  return selectedEdges;
};

/**
 * Kruskal algorithm，复杂度 O(E*logE), E: 边的数量
 * refer: https://en.wikipedia.org/wiki/Kruskal%27s_algorithm
 * @param graph
 * @param weight 指定用于作为边权重的属性，若不指定，则认为所有边权重一致
 * @return IEdge[] 返回构成MST的边的数组
 */
const kruskalMST = (graph: IGraph, weight?: string): IEdge[] => {
  const selectedEdges = [];
  if (graph.getNodes().length === 0) {
    return selectedEdges;
  }

  // 若指定weight，则将所有的边按权值从小到大排序
  const edges = graph.getEdges().map((edge) => edge);
  if (weight) {
    edges.sort((a, b) => {
      return (a.getModel()[weight] as number) - (b.getModel()[weight] as number);
    });
  }
  const disjointSet = new UnionFind(graph.getNodes().map((n) => n.get('id')));

  // 从权值最小的边开始，如果这条边连接的两个节点于图G中不在同一个连通分量中，则添加这条边
  // 直到遍历完所有点或边
  while (edges.length > 0) {
    const curEdge = edges.shift();
    const source = curEdge.getSource().get('id');
    const target = curEdge.getTarget().get('id');
    if (!disjointSet.connected(source, target)) {
      selectedEdges.push(curEdge);
      disjointSet.union(source, target);
    }
  }
  return selectedEdges;
};

/**
 * 最小生成树
 * refer: https://en.wikipedia.org/wiki/Kruskal%27s_algorithm
 * @param graph
 * @param weight 指定用于作为边权重的属性，若不指定，则认为所有边权重一致
 * @param algo 'prim' | 'kruskal' 算法类型
 * @return IEdge[] 返回构成MST的边的数组
 */
export default function mst(graph: IGraph, weight?: string, algo?: string) {
  const algos = {
    prim: primMST,
    kruskal: kruskalMST,
  };
  if (!algo) return kruskalMST(graph, weight);

  return algos[algo](graph, weight);
}
