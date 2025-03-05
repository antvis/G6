---
title: MapNodeSize 动态调整节点大小
---

在图可视化中，节点的大小通常用于传达节点的重要性或影响力。通过根据节点中心性调整节点的大小，我们可以更直观地展示网络中各个节点的重要性，从而帮助用户更好地理解和分析复杂的网络结构。

**参考示例**：

- [场景案例：独角兽和他们的投资者](/examples/feature/default/#unicorns-investors)

## 配置项

### type

> _`map-node-size` \| string_

此数据处理已内置，你可以通过 `type: 'map-node-size'` 来使用它。

### centrality

> [NodeCentralityOptions](#nodecentralityoptions) \| ((graphData: [GraphData](/manual/data#图数据graphdata)) => Map<string, number>) **Default:** `type: 'eigenvector'`

节点中心性的度量方法

- `'degree'`：度中心性，通过节点的度数（连接的边的数量）来衡量其重要性。度中心性高的节点通常具有较多的直接连接，在网络中可能扮演着重要的角色
- `'betweenness'`：介数中心性，通过节点在所有最短路径中出现的次数来衡量其重要性。介数中心性高的节点通常在网络中起到桥梁作用，控制着信息的流动
- `'closeness'`：接近中心性，通过节点到其他所有节点的最短路径长度总和的倒数来衡量其重要性。接近中心性高的节点通常能够更快地到达网络中的其他节点
- `'eigenvector'`：特征向量中心性，通过节点与其他中心节点的连接程度来衡量其重要性。特征向量中心性高的节点通常连接着其他重要节点
- `'pagerank'`：PageRank 中心性，通过节点被其他节点引用的次数来衡量其重要性，常用于有向图。PageRank 中心性高的节点通常在网络中具有较高的影响力，类似于网页排名算法
- 自定义中心性计算方法：`(graphData: GraphData) => Map<ID, number>`，其中 `graphData` 为图数据，`Map<ID, number>` 为节点 ID 到中心性值的映射

#### NodeCentralityOptions

```typescript
type NodeCentralityOptions =
  | { type: 'degree'; direction?: 'in' | 'out' | 'both' }
  | { type: 'betweenness'; directed?: boolean; weightPropertyName?: string }
  | { type: 'closeness'; directed?: boolean; weightPropertyName?: string }
  | { type: 'eigenvector'; directed?: boolean }
  | { type: 'pagerank'; epsilon?: number; linkProb?: number };
```

### mapLabelSize

> _boolean \| [number, number]_ **Default:** `false`

是否同步调整标签大小

### maxSize

> _number \| [number, number] \| [number, number, number]_ **Default:** `80`

节点最大尺寸

### minSize

> _number \| [number, number] \| [number, number, number]_ **Default:** `20`

节点最小尺寸

### scale

> _'linear' \| 'log' \| 'pow' \| 'sqrt' \| ((value: number, domain: [number, number], range: [number, number]) => number)_ **Default:** `'log'`

插值函数，用于将节点中心性映射到节点大小

- `'linear'`：线性插值函数，将一个值从一个范围线性映射到另一个范围，常用于处理中心性值的差异较小的情况
- `'log'`：对数插值函数，将一个值从一个范围对数映射到另一个范围，常用于处理中心性值的差异较大的情况
- `'pow'`：幂律插值函数，将一个值从一个范围幂律映射到另一个范围，常用于处理中心性值的差异较大的情况
- `'sqrt'`：平方根插值函数，将一个值从一个范围平方根映射到另一个范围，常用于处理中心性值的差异较大的情况
- 自定义插值函数：`(value: number, domain: [number, number], range: [number, number]) => number`，其中 `value` 为需要映射的值，`domain` 为输入值的范围，`range` 为输出值的范围
