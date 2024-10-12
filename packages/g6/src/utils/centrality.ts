import { findShortestPath, pageRank } from '@antv/algorithm';
import type { EdgeData, GraphData } from '../spec';
import type { EdgeDirection, ID, NodeCentralityOptions } from '../types';
import { idOf } from './id';

export type CentralityResult = Map<ID, number>;

export const getNodeCentralities = (
  graphData: GraphData,
  getRelatedEdgesData: (id: ID, direction?: EdgeDirection) => EdgeData[],
  centrality: NodeCentralityOptions,
) => {
  switch (centrality.type) {
    case 'degree': {
      const centralityResult = new Map<ID, number>();
      graphData.nodes?.forEach((node) => {
        const degree = getRelatedEdgesData(idOf(node), centrality.direction).length;
        centralityResult.set(idOf(node), degree);
      });
      return centralityResult;
    }
    case 'betweenness':
      return computeNodeBetweennessCentrality(graphData, centrality.directed, centrality.weightPropertyName);
    case 'closeness':
      return computeNodeClosenessCentrality(graphData, centrality.directed, centrality.weightPropertyName);
    case 'eigenvector':
      return computeNodeEigenvectorCentrality(graphData, centrality.directed);
    case 'pagerank':
      return computeNodePageRankCentrality(graphData, centrality.epsilon, centrality.linkProb);
    default:
      return initCentralityResult(graphData);
  }
};

export const initCentralityResult = (graphData: GraphData): CentralityResult => {
  const centralityResult = new Map<ID, number>();
  graphData.nodes?.forEach((node) => {
    centralityResult.set(idOf(node), 0);
  });
  return centralityResult;
};

/**
 * <zh/> 计算图中每个节点的中介中心性
 *
 * <en/> Calculate the betweenness centrality for each node in the graph
 * @param graphData - <zh/> 图数据 | <en/>Graph data
 * @param directed - <zh/> 是否为有向图 | <en/>Whether the graph is directed
 * @param weightPropertyName - <zh/> 边的权重属性名 | <en/>The weight property name of the edge
 * @returns <zh/> 每个节点的中介中心性值 | <en/>The betweenness centrality for each node
 */
export const computeNodeBetweennessCentrality = (
  graphData: GraphData,
  directed?: boolean,
  weightPropertyName?: string,
): CentralityResult => {
  const centralityResult = initCentralityResult(graphData);
  const { nodes = [] } = graphData;
  nodes.forEach((source) => {
    nodes.forEach((target) => {
      if (source !== target) {
        const { allPath } = findShortestPath(graphData, idOf(source), idOf(target), directed, weightPropertyName);
        const pathCount = allPath.length;
        (allPath as ID[][]).flat().forEach((nodeId) => {
          if (nodeId !== idOf(source) && nodeId !== idOf(target)) {
            centralityResult.set(nodeId, centralityResult.get(nodeId)! + 1 / pathCount);
          }
        });
      }
    });
  });
  return centralityResult;
};

/**
 * <zh/> 计算图中每个节点的接近中心性
 *
 * <en/> Calculate the closeness centrality for each node in the graph
 * @param graphData - <zh/> 图数据 | <en/>Graph data
 * @param directed - <zh/> 是否为有向图 | <en/>Whether the graph is directed
 * @param weightPropertyName - <zh/> 边的权重属性名 | <en/>The weight property name of the edge
 * @returns <zh/> 每个节点的接近中心性值 | <en/>The closeness centrality for each node
 */
export const computeNodeClosenessCentrality = (
  graphData: GraphData,
  directed?: boolean,
  weightPropertyName?: string,
): CentralityResult => {
  const centralityResult = new Map<ID, number>();
  const { nodes = [] } = graphData;
  nodes.forEach((source) => {
    const totalLength = nodes.reduce((acc, target) => {
      if (source !== target) {
        const { length } = findShortestPath(graphData, idOf(source), idOf(target), directed, weightPropertyName);
        acc += length;
      }
      return acc;
    }, 0);
    centralityResult.set(idOf(source), 1 / totalLength);
  });
  return centralityResult;
};

/**
 * <zh/> 计算图中每个节点的 PageRank 中心性
 *
 * <en/> Calculate the PageRank centrality for each node in the graph
 * @param graphData - <zh/> 图数据 | <en/>Graph data
 * @param epsilon - <zh/> PageRank 算法的收敛容差 | <en/>The convergence tolerance of the PageRank algorithm
 * @param linkProb - <zh/> PageRank 算法的阻尼系数，指任意时刻，用户访问到某节点后继续访问该节点链接的下一个节点的概率，经验值 0.85 | <en/>The damping factor of the PageRank algorithm, which refers to the probability that a user will continue to visit the next node linked to a node at any time, with an empirical value of 0.85
 * @returns <zh/> 每个节点的 PageRank 中心性值 | <en/>The PageRank centrality for each node
 */
export const computeNodePageRankCentrality = (
  graphData: GraphData,
  epsilon?: number,
  linkProb?: number,
): CentralityResult => {
  const centralityResult = new Map<ID, number>();
  const data = pageRank(graphData, epsilon, linkProb);
  graphData.nodes?.forEach((node) => {
    centralityResult.set(idOf(node), data[idOf(node)]);
  });
  return centralityResult;
};

/**
 * <zh/> 计算图中每个节点的特征向量中心性
 *
 * <en/> Calculate the eigenvector centrality for each node in the graph.
 * @param graphData - <zh/> 图数据 | <en/>Graph data
 * @param directed - <zh/> 是否为有向图 | <en/>Whether the graph is directed
 * @returns 每个节点的特征向量中心性值 The eigenvector centrality for each node.
 */
export const computeNodeEigenvectorCentrality = (graphData: GraphData, directed?: boolean): CentralityResult => {
  const { nodes = [] } = graphData;
  const adjacencyMatrix = createAdjacencyMatrix(graphData, directed);
  const eigenvector = powerIteration(adjacencyMatrix, nodes.length);

  const centralityResult = new Map<ID, number>();
  nodes.forEach((node, index) => {
    centralityResult.set(idOf(node), eigenvector[index]);
  });

  return centralityResult;
};

/**
 * <zh/> 创建图的邻接矩阵
 *
 * <en/> Create the adjacency matrix for the graph.
 * @param graphData - <zh/> 图数据 | <en/>Graph data
 * @param directed - <zh/> 是否为有向图 | <en/>Whether the graph is directed
 * @returns <zh/> 邻接矩阵 | <en/>The adjacency matrix
 */
export const createAdjacencyMatrix = (graphData: GraphData, directed?: boolean): number[][] => {
  const { nodes = [], edges = [] } = graphData;
  const matrix: number[][] = Array(nodes.length)
    .fill(null)
    .map(() => Array(nodes.length).fill(0));

  edges.forEach(({ source, target }) => {
    const uIndex = nodes.findIndex((node) => idOf(node) === source);
    const vIndex = nodes.findIndex((node) => idOf(node) === target);
    if (directed) {
      matrix[uIndex][vIndex] = 1;
    } else {
      matrix[uIndex][vIndex] = 1;
      matrix[vIndex][uIndex] = 1;
    }
  });

  return matrix;
};

/**
 * <zh/> 使用幂迭代法计算主特征向量
 *
 * <en/> Calculate the principal eigenvector using the power iteration method
 * @see https://en.wikipedia.org/wiki/Eigenvalues_and_eigenvectors
 * @param matrix - <zh/> 邻接矩阵 | <en/> The adjacency matrix
 * @param numNodes - <zh/> 节点数量 | <en/> The number of nodes
 * @param maxIterations - <zh/> 最大迭代次数 | <en/> The maximum number of iterations
 * @param tolerance - <zh/> 收敛容差 | <en/> The convergence tolerance
 * @returns <zh/> 主特征向量 | <en/> The principal eigenvector
 */
const powerIteration = (matrix: number[][], numNodes: number, maxIterations = 100, tolerance = 1e-6): number[] => {
  let eigenvector = Array(numNodes).fill(1);
  let diff = Infinity;

  for (let iter = 0; iter < maxIterations && diff > tolerance; iter++) {
    const newEigenvector = Array(numNodes).fill(0);

    for (let i = 0; i < numNodes; i++) {
      for (let j = 0; j < numNodes; j++) {
        newEigenvector[i] += matrix[i][j] * eigenvector[j];
      }
    }

    const norm = Math.sqrt(newEigenvector.reduce((sum, val) => sum + val * val, 0));
    for (let i = 0; i < numNodes; i++) {
      newEigenvector[i] /= norm;
    }

    diff = Math.sqrt(newEigenvector.reduce((sum, val, index) => sum + (val - eigenvector[index]) * val, 0));
    eigenvector = newEigenvector;
  }

  return eigenvector;
};
