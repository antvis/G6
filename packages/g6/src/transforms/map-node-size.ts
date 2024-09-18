import { findShortestPath, pageRank } from '@antv/algorithm';
import { deepMix } from '@antv/util';
import type { RuntimeContext } from '../runtime/types';
import type { GraphData } from '../spec';
import type { EdgeDirection, ID, Node, Size, STDSize } from '../types';
import { idOf } from '../utils/id';
import { linear, log, pow, sqrt } from '../utils/scale';
import { parseSize } from '../utils/size';
import { reassignTo } from '../utils/transform';
import type { BaseTransformOptions } from './base-transform';
import { BaseTransform } from './base-transform';
import type { DrawData } from './types';

export interface MapNodeSizeOptions extends BaseTransformOptions {
  /**
   * <zh/> 节点中心性的度量方法
   * - `'degree'`：度中心性，通过节点的度数（连接的边的数量）来衡量其重要性。度中心性高的节点通常具有较多的直接连接，在网络中可能扮演着重要的角色
   * - `'betweenness'`：介数中心性，通过节点在所有最短路径中出现的次数来衡量其重要性。介数中心性高的节点通常在网络中起到桥梁作用，控制着信息的流动
   * - `'closeness'`：接近中心性，通过节点到其他所有节点的最短路径长度总和的倒数来衡量其重要性。接近中心性高的节点通常能够更快地到达网络中的其他节点
   * - `'eigenvector'`：特征向量中心性，通过节点与其他中心节点的连接程度来衡量其重要性。特征向量中心性高的节点通常连接着其他重要节点
   * - `'pagerank'`：PageRank 中心性，通过节点被其他节点引用的次数来衡量其重要性，常用于有向图。PageRank 中心性高的节点通常在网络中具有较高的影响力，类似于网页排名算法
   * - 自定义中心性计算方法：`(graphData: GraphData) => CentralityResult`，其中 `graphData` 为图数据，`CentralityResult` 为节点 ID 到中心性值的映射
   *
   * <en/> The method of measuring the node centrality
   * - `'degree'`: Degree centrality, measures centrality by the degree (number of connected edges) of a node. Nodes with high degree centrality usually have more direct connections and may play important roles in the network
   * - `'betweenness'`: Betweenness centrality, measures centrality by the number of times a node appears in all shortest paths. Nodes with high betweenness centrality usually act as bridges in the network, controlling the flow of information
   * - `'closeness'`: Closeness centrality, measures centrality by the reciprocal of the average shortest path length from a node to all other nodes. Nodes with high closeness centrality usually can reach other nodes in the network more quickly
   * - `'eigenvector'`: Eigenvector centrality, measures centrality by the degree of connection between a node and other central nodes. Nodes with high eigenvector centrality usually connect to other important nodes
   * - `'pagerank'`: PageRank centrality, measures centrality by the number of times a node is referenced by other nodes, commonly used in directed graphs. Nodes with high PageRank centrality usually have high influence in the network, similar to the page ranking algorithm
   * - Custom centrality calculation method: `(graphData: GraphData) => Map<ID, number>`, where `graphData` is the graph data, and `Map<ID, number>` is the mapping from node ID to centrality value
   * @defaultValue `{ type: 'eigenvector' }`
   */
  centrality?:
    | { type: 'degree'; direction?: EdgeDirection }
    | { type: 'betweenness'; directed?: boolean; weightPropertyName?: string }
    | { type: 'closeness'; directed?: boolean; weightPropertyName?: string }
    | { type: 'eigenvector'; directed?: boolean }
    | { type: 'pagerank'; epsilon?: number; linkProb?: number }
    | ((graphData: GraphData) => Map<ID, number>);
  /**
   * <zh/> 节点最大尺寸
   *
   * <en/> The maximum size of the node
   * @defaultValue `80`
   */
  maxSize?: Size;
  /**
   * <zh/> 节点最小尺寸
   *
   * <en/> The minimum size of the node
   * @defaultValue `20`
   */
  minSize?: Size;
  /**
   * <zh/> 插值函数，用于将节点中心性映射到节点大小
   * - `'linear'`：线性插值函数，将一个值从一个范围线性映射到另一个范围，常用于处理中心性值的差异较小的情况
   * - `'log'`：对数插值函数，将一个值从一个范围对数映射到另一个范围，常用于处理中心性值的差异较大的情况
   * - `'pow'`：幂律插值函数，将一个值从一个范围幂律映射到另一个范围，常用于处理中心性值的差异较大的情况
   * - `'sqrt'`：平方根插值函数，将一个值从一个范围平方根映射到另一个范围，常用于处理中心性值的差异较大的情况
   * - 自定义插值函数：`(value: number, domain: [number, number], range: [number, number]) => number`，其中 `value` 为需要映射的值，`domain` 为输入值的范围，`range` 为输出值的范围
   *
   * <en/> Scale type
   * - `'linear'`: Linear scale, maps a value from one range to another range linearly, commonly used for cases where the difference in centrality values is small
   * - `'log'`: Logarithmic scale, maps a value from one range to another range logarithmically, commonly used for cases where the difference in centrality values is large
   * - `'pow'`: Power-law scale, maps a value from one range to another range using power law, commonly used for cases where the difference in centrality values is large
   * - `'sqrt'`: Square root scale, maps a value from one range to another range using square root, commonly used for cases where the difference in centrality values is large
   * - Custom scale: `(value: number, domain: [number, number], range: [number, number]) => number`，where `value` is the value to be mapped, `domain` is the input range, and `range` is the output range
   * @defaultValue `'log'`
   */
  scale?:
    | 'linear'
    | 'log'
    | 'pow'
    | 'sqrt'
    | ((value: number, domain: [number, number], range: [number, number]) => number);
}

type CentralityResult = Map<ID, number>;

/**
 * <zh/> 根据节点中心性调整节点的大小
 *
 * <en/> Map node size based on node importance
 * @remarks
 * <zh/> 在图可视化中，节点的大小通常用于传达节点的重要性或影响力。通过根据节点中心性调整节点的大小，我们可以更直观地展示网络中各个节点的重要性，从而帮助用户更好地理解和分析复杂的网络结构。
 *
 * <en/> In graph visualization, the size of a node is usually used to convey the importance or influence of the node. By adjusting the size of the node based on the centrality of the node, we can more intuitively show the importance of each node in the network, helping users better understand and analyze complex network structures.
 */
export class MapNodeSize extends BaseTransform<MapNodeSizeOptions> {
  static defaultOptions: Partial<MapNodeSizeOptions> = {
    centrality: { type: 'degree' },
    maxSize: 80,
    minSize: 20,
    scale: 'log',
  };

  constructor(context: RuntimeContext, options: MapNodeSizeOptions) {
    super(context, deepMix({}, MapNodeSize.defaultOptions, options));
  }

  public beforeDraw(input: DrawData): DrawData {
    const { model } = this.context;
    const nodes = model.getNodeData();

    const maxSize = parseSize(this.options.maxSize);
    const minSize = parseSize(this.options.minSize);

    const centralities = this.getCentralities(this.options.centrality);

    const maxCentrality = centralities.size > 0 ? Math.max(...centralities.values()) : 0;
    const minCentrality = centralities.size > 0 ? Math.min(...centralities.values()) : 0;
    nodes.forEach((datum) => {
      const size = this.assignSizeByCentrality(
        centralities.get(idOf(datum)) || 0,
        minCentrality,
        maxCentrality,
        minSize,
        maxSize,
        this.options.scale,
      );
      const element = this.context.element?.getElement<Node>(idOf(datum));
      reassignTo(input, element ? 'update' : 'add', 'node', deepMix(datum, { style: { size } }));
    });
    return input;
  }

  private getCentralities(centrality: Required<MapNodeSizeOptions>['centrality']): CentralityResult {
    const { model } = this.context;
    const graphData = model.getData();

    if (typeof centrality === 'function') return centrality(graphData);

    switch (centrality.type) {
      case 'degree': {
        const centralityResult = new Map<ID, number>();
        graphData.nodes?.forEach((node) => {
          const degree = model.getRelatedEdgesData(idOf(node), centrality.direction).length;
          centralityResult.set(idOf(node), degree);
        });
        return centralityResult;
      }
      case 'betweenness':
        return calculateBetweennessCentrality(graphData, centrality.directed, centrality.weightPropertyName);
      case 'closeness':
        return calculateClosenessCentrality(graphData, centrality.directed, centrality.weightPropertyName);
      case 'eigenvector':
        return calculateEigenvectorCentrality(graphData, centrality.directed);
      case 'pagerank':
        return calculatePageRankCentrality(graphData, centrality.epsilon, centrality.linkProb);
      default:
        return initCentralityResult(graphData);
    }
  }

  private assignSizeByCentrality = (
    centrality: number,
    minCentrality: number,
    maxCentrality: number,
    minSize: STDSize,
    maxSize: STDSize,
    scale: MapNodeSizeOptions['scale'],
  ): STDSize => {
    const domain: [number, number] = [minCentrality, maxCentrality];
    const rangeX: [number, number] = [minSize[0], maxSize[0]];
    const rangeY: [number, number] = [minSize[1], maxSize[1]];
    const rangeZ: [number, number] = [minSize[2], maxSize[2]];

    const interpolate = (centrality: number, range: [number, number]): number => {
      if (typeof scale === 'function') {
        return scale(centrality, domain, range);
      }
      switch (scale) {
        case 'linear':
          return linear(centrality, domain, range);
        case 'log':
          return log(centrality, domain, range);
        case 'pow':
          return pow(centrality, domain, range, 2);
        case 'sqrt':
          return sqrt(centrality, domain, range);
        default:
          return range[0];
      }
    };

    return [interpolate(centrality, rangeX), interpolate(centrality, rangeY), interpolate(centrality, rangeZ)];
  };
}

const initCentralityResult = (graphData: GraphData): CentralityResult => {
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
const calculateBetweennessCentrality = (
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
const calculateClosenessCentrality = (
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
const calculatePageRankCentrality = (graphData: GraphData, epsilon?: number, linkProb?: number): CentralityResult => {
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
const calculateEigenvectorCentrality = (graphData: GraphData, directed?: boolean): CentralityResult => {
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
const createAdjacencyMatrix = (graphData: GraphData, directed?: boolean): number[][] => {
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
