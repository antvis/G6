---
title: "标签自适应显示 AutoAdaptLabel"
description: "标签自适应显示 AutoAdaptLabel"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/manual/behavior/AutoAdaptLabel/"
version: "5.1.1"
---

## 概述

标签自适应显示是一种动态标签管理策略，旨在根据当前可视范围的空间分配、节点重要性等因素，智能调整哪些标签应显示或隐藏。通过对可视区域的实时分析，确保用户在不同的交互场景下获得最相关最清晰的信息展示，同时避免视觉过载和信息冗余。

## 使用场景

这一交互主要用于：

- 节点尺寸变化
- 图形缩放

## 在线体验



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    data: {
      nodes: [
        { id: 'node1', style: { x: 200, y: 100, labelText: '短标签' } },
        { id: 'node2', style: { x: 360, y: 100, labelText: '中等长度的标签' } },
        { id: 'node3', style: { x: 280, y: 220, labelText: '这是一个非常非常长的标签，需要自适应显示' } },
      ],
      edges: [
        { source: 'node1', target: 'node2' },
        { source: 'node1', target: 'node3' },
        { source: 'node2', target: 'node3' },
      ],
    },
    node: {
      style: { label: true, fill: '#7e3feb', labelFill: '#666', labelFontSize: 14, labelPlacement: 'bottom' },
      state: {
        custom: { fill: '#ffa940' },
      },
    },
    edge: {
      stroke: '#8b9baf',
      state: {
        custom: { stroke: '#ffa940' },
      },
    },
    behaviors: ['zoom-canvas', 'drag-canvas', { key: 'auto-adapt-label', type: 'auto-adapt-label' }],
    plugins: [{ type: 'grid-line', size: 30 }],
    animation: true,
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    const options = {
      key: 'auto-adapt-label',
      type: 'auto-adapt-label',
      animation: true,
      enable: true,
      throttle: 100,
      padding: 0,
    };
    const optionFolder = gui.addFolder('CollapseExpand Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'animation');
    optionFolder.add(options, 'enable');
    optionFolder.add(options, 'throttle', 0, 900, 100);
    optionFolder.add(options, 'padding', 0, 20, 1);
    optionFolder.onChange(({ property, value }) => {
      graph.updateBehavior({
        key: 'auto-adapt-label',
        [property]: value,
      });
      graph.render();
    });
  },
);
```



## 基本用法

在图配置中添加这一交互

**1. 快速配置（静态）**

使用字符串形式直接声明，这种方式简洁但仅支持默认配置，且配置后不可动态修改：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: ['auto-adapt-label'],
});
```

**2. 对象配置（推荐）**

使用对象形式进行配置，支持自定义参数，且可以在运行时动态更新配置：

```javascript
const graph = new Graph({
  // 其他配置...
  behaviors: [
    {
      type: 'auto-adapt-label',
      throttle: 200, // 节流时间
      padding: 10, // 检测重叠时的额外间距
    },
  ],
});
```

## 配置项

| 配置项    | 说明                                                                                                                                                                                        | 类型                                                                                                                                   | 默认值             | 必选 |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---- |
| type      | 交互类型名称                                                                                                                                                                                | string                                                                                                                                 | `auto-adapt-label` | √    |
| enable    | 是否启用该交互                                                                                                                                                                              | boolean \| ((event: [Event](/zh/api/event/#事件对象属性)) => boolean)                                                                      | true               |      |
| throttle  | 标签更新节流时间（ms）                                                                                                                                                                      | number                                                                                                                                 | 100                |      |
| padding   | 标签检测重叠时的额外间距                                                                                                                                                                    | number \| number[]                                                                                                                     | 0                  |      |
| sort      | 自定义排序函数，根据元素的重要性从高到低排序，重要性越高的元素其标签显示优先级越高。一般情况下 combo > node > edge                                                                          | (a: ElementDatum, b: ElementDatum) => -1 \| 0 \| 1                                                                                     |                    |      |
| sortNode  | 根据节点的重要性从高到低排序，重要性越高的节点其标签显示优先级越高。内置几种[中心性算法](#nodecentralityoptions)，也可以自定义排序函数。需要注意，如果设置了 `sort`，则 `sortNode` 不会生效 | [NodeCentralityOptions](#nodecentralityoptions) \| (nodeA: [NodeData](/zh/manual/data/#节点数据nodedata), nodeB: NodeData => -1 \| 0 \| 1) | `type: 'degree'`   |      |
| sortEdge  | 根据边的重要性从高到低排序，重要性越高的边其标签显示优先级越高。默认按照数据先后进行排序。需要注意，如果设置了 `sort`，则 `sortEdge` 不会生效                                               | (edgeA: [EdgeData](/zh/manual/data/#边数据edgedata), edgeB: EdgeData) => -1 \| 0 \| 1                                                      |                    |      |
| sortCombo | 根据群组的重要性从高到低排序，重要性越高的群组其标签显示优先级越高。默认按照数据先后进行排序。需要注意，如果设置了 `sort`，则 `sortCombo` 不会生效                                          | (comboA: [ComboData](/zh/manual/data/#组合数据combodata), comboB: ComboData) => -1 \| 0 \| 1                                               |                    |      |

### NodeCentralityOptions

节点中心性的度量方法

- `'degree'`：度中心性，通过节点的度数（连接的边的数量）来衡量其重要性。度中心性高的节点通常具有较多的直接连接，在网络中可能扮演着重要的角色
- `'betweenness'`：介数中心性，通过节点在所有最短路径中出现的次数来衡量其重要性。介数中心性高的节点通常在网络中起到桥梁作用，控制着信息的流动
- `'closeness'`：接近中心性，通过节点到其他所有节点的最短路径长度总和的倒数来衡量其重要性。接近中心性高的节点通常能够更快地到达网络中的其他节点
- `'eigenvector'`：特征向量中心性，通过节点与其他中心节点的连接程度来衡量其重要性。特征向量中心性高的节点通常连接着其他重要节点
- `'pagerank'`：PageRank 中心性，通过节点被其他节点引用的次数来衡量其重要性，常用于有向图。PageRank 中心性高的节点通常在网络中具有较高的影响力，类似于网页排名算法

```typescript
type NodeCentralityOptions =
  | { type: 'degree'; direction?: 'in' | 'out' | 'both' }
  | { type: 'betweenness'; directed?: boolean; weightPropertyName?: string }
  | { type: 'closeness'; directed?: boolean; weightPropertyName?: string }
  | { type: 'eigenvector'; directed?: boolean }
  | { type: 'pagerank'; epsilon?: number; linkProb?: number };
```

## 实际案例



```ts

import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', style: { x: 200, y: 100, labelText: '短标签' } },
    { id: 'node2', style: { x: 360, y: 100, labelText: '中等长度的标签' } },
    { id: 'node3', style: { x: 280, y: 220, labelText: '这是一个非常非常长的标签，需要自适应显示' } },
  ],
  edges: [
    { source: 'node1', target: 'node2' },
    { source: 'node1', target: 'node3' },
    { source: 'node2', target: 'node3' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  behaviors: [
    'zoom-canvas',
    'drag-canvas',
    {
      key: 'auto-adapt-label',
      type: 'auto-adapt-label',
      padding: 0,
      throttle: 200,
    },
  ],
  plugins: [{ type: 'grid-line', size: 30 }],
  animation: true,
});

graph.render();
```
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
