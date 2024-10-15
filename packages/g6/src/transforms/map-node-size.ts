import { deepMix, pick } from '@antv/util';
import type { RuntimeContext } from '../runtime/types';
import type { GraphData, NodeData } from '../spec';
import type { NodeStyle } from '../spec/element/node';
import type { ID, Node, NodeCentralityOptions, Size, STDSize } from '../types';
import type { CentralityResult } from '../utils/centrality';
import { getNodeCentralities } from '../utils/centrality';
import { idOf } from '../utils/id';
import { getVerticalPadding } from '../utils/padding';
import { linear, log, pow, sqrt } from '../utils/scale';
import { parseSize } from '../utils/size';
import type { BaseTransformOptions } from './base-transform';
import { BaseTransform } from './base-transform';
import type { DrawData } from './types';
import { isStyleEqual, reassignTo } from './utils';

export interface MapNodeSizeOptions extends BaseTransformOptions {
  /**
   * <zh/> 节点中心性的度量方法
   * - `'degree'`：度中心性，通过节点的度数（连接的边的数量）来衡量其重要性。度中心性高的节点通常具有较多的直接连接，在网络中可能扮演着重要的角色
   * - `'betweenness'`：介数中心性，通过节点在所有最短路径中出现的次数来衡量其重要性。介数中心性高的节点通常在网络中起到桥梁作用，控制着信息的流动
   * - `'closeness'`：接近中心性，通过节点到其他所有节点的最短路径长度总和的倒数来衡量其重要性。接近中心性高的节点通常能够更快地到达网络中的其他节点
   * - `'eigenvector'`：特征向量中心性，通过节点与其他中心节点的连接程度来衡量其重要性。特征向量中心性高的节点通常连接着其他重要节点
   * - `'pagerank'`：PageRank 中心性，通过节点被其他节点引用的次数来衡量其重要性，常用于有向图。PageRank 中心性高的节点通常在网络中具有较高的影响力，类似于网页排名算法
   * - 自定义中心性计算方法：`(graphData: GraphData) => Map<ID, number>`，其中 `graphData` 为图数据，`Map<ID, number>` 为节点 ID 到中心性值的映射
   *
   * <en/> The method of measuring the node centrality
   * - `'degree'`: Degree centrality, measures centrality by the degree (number of connected edges) of a node. Nodes with high degree centrality usually have more direct connections and may play important roles in the network
   * - `'betweenness'`: Betweenness centrality, measures centrality by the number of times a node appears in all shortest paths. Nodes with high betweenness centrality usually act as bridges in the network, controlling the flow of information
   * - `'closeness'`: Closeness centrality, measures centrality by the reciprocal of the average shortest path length from a node to all other nodes. Nodes with high closeness centrality usually can reach other nodes in the network more quickly
   * - `'eigenvector'`: Eigenvector centrality, measures centrality by the degree of connection between a node and other central nodes. Nodes with high eigenvector centrality usually connect to other important nodes
   * - `'pagerank'`: PageRank centrality, measures centrality by the number of times a node is referenced by other nodes, commonly used in directed graphs. Nodes with high PageRank centrality usually have high influence in the network, similar to the page ranking algorithm
   * - Custom centrality calculation method: `(graphData: GraphData) => Map<ID, number>`, where `graphData` is the graph data, and `Map<ID, number>` is the mapping from node ID to centrality value
   * @defaultValue { type: 'eigenvector' }
   */
  centrality?: NodeCentralityOptions | ((graphData: GraphData) => Map<ID, number>);
  /**
   * <zh/> 节点最大尺寸
   *
   * <en/> The maximum size of the node
   * @defaultValue 80
   */
  maxSize?: Size;
  /**
   * <zh/> 节点最小尺寸
   *
   * <en/> The minimum size of the node
   * @defaultValue 20
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
   * @defaultValue 'log'
   */
  scale?:
    | 'linear'
    | 'log'
    | 'pow'
    | 'sqrt'
    | ((value: number, domain: [number, number], range: [number, number]) => number);
  /**
   * <zh/> 是否同步调整标签大小
   *
   * <en/> Whether to map label size synchronously
   * @defaultValue false
   */
  mapLabelSize?: boolean | [number, number];
}

/**
 * <zh/> 根据节点重要性调整节点的大小
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
    scale: 'linear',
    mapLabelSize: false,
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

      const style: NodeStyle = { size };
      this.assignLabelStyle(style, size, datum, element);

      if (!element || !isStyleEqual(style, element.attributes)) {
        reassignTo(input, element ? 'update' : 'add', 'node', deepMix(datum, { style }), true);
      }
    });
    return input;
  }

  private assignLabelStyle(style: NodeStyle, size: STDSize, datum: NodeData, element?: Node) {
    const configStyle = element ? element.config.style : this.context.element?.getElementComputedStyle('node', datum);

    Object.assign(style, pick(configStyle, ['labelFontSize', 'labelLineHeight']));

    if (this.options.mapLabelSize) {
      const fontSize = this.getLabelSizeByNodeSize(size, Infinity, Number(style.labelFontSize));
      Object.assign(style, {
        labelFontSize: fontSize,
        labelLineHeight: fontSize + getVerticalPadding(style.labelPadding),
      });
    }
    return style;
  }

  private getLabelSizeByNodeSize(size: STDSize, defaultMaxFontSize: number, defaultMinFontSize: number): number {
    const fontSize = Math.min(...size) / 2;
    const [minFontSize, maxFontSize] = !Array.isArray(this.options.mapLabelSize)
      ? [defaultMinFontSize, defaultMaxFontSize]
      : this.options.mapLabelSize;
    return Math.min(maxFontSize, Math.max(fontSize, minFontSize));
  }

  private getCentralities(centrality: Required<MapNodeSizeOptions>['centrality']): CentralityResult {
    const { model } = this.context;
    const graphData = model.getData();

    if (typeof centrality === 'function') return centrality(graphData);

    const getRelatedEdgesData = model.getRelatedEdgesData.bind(model);
    return getNodeCentralities(graphData, getRelatedEdgesData, centrality);
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
