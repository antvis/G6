---
title: "动态调整节点大小 MapNodeSize"
description: "动态调整节点大小 MapNodeSize"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/manual/transform/MapNodeSize/"
version: "5.1.1"
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
| centrality   | 节点中心性的度量方法，[配置项](#centrality)                | [NodeCentralityOptions](#nodecentralityoptions) \| ((graphData: [GraphData](/zh/manual/data/#图数据graphdata)) => Map&lt;string, number&gt;) | `{ type: 'degree' }` |      |
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



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    autoFit: 'center',
    data: {
      nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }],
      edges: [
        { source: 'node1', target: 'node2' },
        { source: 'node2', target: 'node3' },
        { source: 'node3', target: 'node4' },
        { source: 'node4', target: 'node5' },
        { source: 'node1', target: 'node4' },
        { source: 'node1', target: 'node3' },
      ],
    },
    node: {
      type: 'circle',
      style: {
        labelText: (d) => d.id + ' - ' + d.style.size[0].toFixed(0),
      },
    },
    layout: {
      type: 'circular',
      radius: 180,
    },
    behaviors: ['drag-canvas'],
    transforms: [
      {
        key: 'map-node-size',
        type: 'map-node-size',
        centrality: {
          type: 'pagerank',
        },
      },
    ],
  },
  { width: 600, height: 460 },
  (gui, graph) => {
    const options = {
      type: 'degree',
    };
    const optionFolder = gui.addFolder('Centrality Options');
    optionFolder.add(options, 'type', ['degree', 'betweenness', 'closeness', 'eigenvector', 'pagerank']);
    optionFolder.onChange(async ({ property, value }) => {
      graph.updateTransform({
        key: 'map-node-size',
        centrality: {
          [property]: value,
        },
      });
      graph.render();
    });
  },
);
```



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



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    autoFit: 'center',
    data: {
      nodes: [
        { id: 'node1' },
        { id: 'node2' },
        { id: 'node3' },
        { id: 'node4' },
        { id: 'node5' },
        { id: 'node6' },
        { id: 'node7' },
      ],
      edges: [
        { source: 'node1', target: 'node2' },
        { source: 'node1', target: 'node3' },
        { source: 'node1', target: 'node4' },
        { source: 'node2', target: 'node5' },
        { source: 'node3', target: 'node6' },
        { source: 'node4', target: 'node7' },
      ],
    },
    node: {
      type: 'circle',
      style: {
        labelText: (d) => d.id + ' - ' + d.style.size[0].toFixed(0),
      },
    },
    layout: {
      type: 'antv-dagre',
    },
    behaviors: ['drag-canvas'],
    transforms: [
      {
        key: 'map-node-size',
        type: 'map-node-size',
        centrality: {
          type: 'degree',
        },
        scale: 'log',
      },
    ],
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    const options = {
      scale: 'log',
    };
    const optionFolder = gui.addFolder('MapNodeSize Options');
    optionFolder.add(options, 'scale', ['log', 'linear', 'pow', 'sqrt']);
    optionFolder.onChange(async ({ property, value }) => {
      graph.updateTransform({
        key: 'map-node-size',
        [property]: value,
      });
      graph.render();
    });
  },
);
```



## 实际案例

- [场景案例：独角兽和他们的投资者](/zh/examples/feature/default/unicorns-investors/)
### demo-runtime.ts

```ts
import { Graph } from '@antv/g6';
import GUI from 'lil-gui';

export function addPanel(renderPanel: (gui: GUI) => void) {
  const gui = new GUI({ container: document.body });
  gui.title('Control');
  Object.assign(gui.domElement.style, { position: 'absolute', top: '0', right: '0', zIndex: '10' });
  renderPanel(gui);
  addEventListener('pagehide', () => gui.destroy(), { once: true });
}

export async function createGraph(
  options: ConstructorParameters<typeof Graph>[0],
  size: { width?: number; height?: number } = {},
  renderPanel?: (gui: GUI, graph: Graph) => void,
) {
  const container = document.createElement('div');
  Object.assign(container.style, {
    width: '100%',
    maxWidth: `${size.width || 600}px`,
    height: `${size.height || 400}px`,
  });
  document.getElementById('container')!.append(container);
  const graph = new Graph({ ...size, ...options, width: container.clientWidth, container, autoResize: true });
  addEventListener('pagehide', () => graph.destroy(), { once: true });
  await graph.render();
  if (renderPanel) addPanel((gui) => renderPanel(gui, graph));
  return container;
}
```
