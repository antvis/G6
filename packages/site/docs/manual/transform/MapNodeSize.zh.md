---
title: 动态调整节点大小 MapNodeSize
order: 1
---

## 概述

在图可视化中，节点的大小通常用于传达节点的重要性或影响力。通过根据节点中心性调整节点的大小，我们可以更直观地展示网络中各个节点的重要性，从而帮助用户更好地理解和分析复杂的网络结构。

## 使用场景

需要通过节点大小来突出节点的重要性和影响力时，可使用此数据处理。

以下为常见的场景：

- **社交网络分析**：比如分析社交媒体平台中用户的活跃度与影响力，通过节点大小突出高互动用户。

- **金融风险传导网络**：比如识别金融系统中承担关键资金流转职能的机构，预防系统性风险。

- **交通枢纽规划**：比如优化城市地铁网络设计，识别换乘压力点。

## 配置项

| 属性         | 描述                                                       | 类型                                                                                                                               | 默认值               | 必选 |
| ------------ | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ---- |
| type         | 数据处理类型                                               | map-node-size                                                                                                                      | -                    | ✓    |
| centrality   | 节点中心性的度量方法，[配置项](#centrality)                | [NodeCentralityOptions](#nodecentralityoptions) \| ((graphData: [GraphData](/manual/data#图数据graphdata)) => Map<string, number>) | `{ type: 'degree' }` |      |
| mapLabelSize | 是否同步调整标签大小                                       | boolean \| [number, number]                                                                                                        | false                |      |
| maxSize      | 节点最大尺寸                                               | number \| [number, number] \| [number, number, number]                                                                             | 80                   |      |
| minSize      | 节点最小尺寸                                               | number \| [number, number] \| [number, number, number]                                                                             | 20                   |      |
| scale        | 插值函数，用于将节点中心性映射到节点大小，[配置项](#scale) | `linear` \| `log` \| `pow` \| `sqrt` \| ((value: number, domain: [number, number], range: [number, number]) => number)             | `log`                |      |

### centrality

节点中心性的度量方法

- `'degree'`：度中心性，通过节点的度数（连接的边的数量）来衡量其重要性。度中心性高的节点通常具有较多的直接连接，在网络中可能扮演着重要的角色
- `'betweenness'`：介数中心性，通过节点在所有最短路径中出现的次数来衡量其重要性。介数中心性高的节点通常在网络中起到桥梁作用，控制着信息的流动
- `'closeness'`：接近中心性，通过节点到其他所有节点的最短路径长度总和的倒数来衡量其重要性。接近中心性高的节点通常能够更快地到达网络中的其他节点
- `'eigenvector'`：特征向量中心性，通过节点与其他中心节点的连接程度来衡量其重要性。特征向量中心性高的节点通常连接着其他重要节点
- `'pagerank'`：PageRank 中心性，通过节点被其他节点引用的次数来衡量其重要性，常用于有向图。PageRank 中心性高的节点通常在网络中具有较高的影响力，类似于网页排名算法
- 自定义中心性计算方法：`(graphData: GraphData) => Map<ID, number>`，其中 `graphData` 为图数据，`Map<ID, number>` 为节点 ID 到中心性值的映射

**示例：**

```typescript {6-9}
const graph = new Graph({
  // 其他配置...
  transforms: [
    {
      type: 'map-node-size',
      centrality: {
        type: 'degree',
        direction: 'both',
      },
    },
  ],
});
```

效果如下（可切换度量方法查看不同效果，示例中节点 label 为`${节点 id } - ${节点大小}`）：

<embed src="@/common/api/transforms/map-node-size-centrality.md"></embed>

#### NodeCentralityOptions

```typescript
type NodeCentralityOptions =
  | { type: 'degree'; direction?: 'in' | 'out' | 'both' }
  | { type: 'betweenness'; directed?: boolean; weightPropertyName?: string }
  | { type: 'closeness'; directed?: boolean; weightPropertyName?: string }
  | { type: 'eigenvector'; directed?: boolean }
  | { type: 'pagerank'; epsilon?: number; linkProb?: number };
```

`direction`：表示统计哪些方向的边，`in` -入边、 `out` -出边、 `both` -入边和出边都考虑进去

`directed`：是否为有向图

`weightPropertyName`：边的权重属性名

`epsilon`：PageRank 算法的收敛容差

`linkProb`：PageRank 算法的阻尼系数，指任意时刻，用户访问到某节点后继续访问该节点链接的下一个节点的概率，经验值 0.85

### scale

- `'linear'`：线性插值函数，将一个值从一个范围线性映射到另一个范围，常用于处理中心性值的差异较小的情况
- `'log'`：对数插值函数，将一个值从一个范围对数映射到另一个范围，常用于处理中心性值的差异较大的情况
- `'pow'`：幂律插值函数，将一个值从一个范围幂律映射到另一个范围，常用于处理中心性值的差异较大的情况
- `'sqrt'`：平方根插值函数，将一个值从一个范围平方根映射到另一个范围，常用于处理中心性值的差异较大的情况
- 自定义插值函数：`(value: number, domain: [number, number], range: [number, number]) => number`，其中 `value` 为需要映射的值，`domain` 为输入值的范围，`range` 为输出值的范围

**示例：**

```typescript {9}
const graph = new Graph({
  // 其他配置...
  transforms: [
    {
      type: 'map-node-size',
      centrality: {
        type: 'degree',
      },
      scale: 'linear',
    },
  ],
});
```

效果如下（该示例为基于度中心性 `degree` ，可切换插值函数查看不同效果，示例中节点 label 为`${节点 id } - ${节点大小}`）：

<embed src="@/common/api/transforms/map-node-size-scale.md"></embed>

## 实际案例

- [场景案例：独角兽和他们的投资者](/examples/feature/default/#unicorns-investors)
