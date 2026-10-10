---
title: "水平三次贝塞尔曲线边 CubicHorizontal"
description: "水平三次贝塞尔曲线边 CubicHorizontal"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/manual/element/edge/CubicHorizontal/"
version: "5.1.1"
---

## 概述

水平三次贝塞尔曲线是一种平滑的曲线，其控制点主要沿水平方向分布，适合在水平方向上连接节点。

使用场景：

- 适用于水平布局的图，如流程图、层次结构图。

- 当需要强调水平方向的连接关系时使用。

> 特别注意，计算控制点时主要考虑 x 轴上的距离，忽略 y 轴的变化

## 在线体验



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    autoFit: 'center',
    data: {
      nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }, { id: 'node6' }],
      edges: [
        { source: 'node1', target: 'node2' },
        { source: 'node1', target: 'node3' },
        { source: 'node1', target: 'node4', text: 'cubic-horizontal' },
        { source: 'node1', target: 'node5' },
        { source: 'node1', target: 'node6' },
      ],
    },
    node: {
      style: {
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        lineWidth: 1,
        port: true,
        ports: [{ placement: 'left' }, { placement: 'right' }],
      },
    },
    edge: {
      type: 'cubic-horizontal',
      style: {
        stroke: '#7e3feb',
        lineWidth: 2,
        labelText: (d) => d.text,
        labelBackground: true,
        labelBackgroundFill: '#f9f0ff',
        labelBackgroundOpacity: 1,
        labelBackgroundLineWidth: 2,
        labelBackgroundStroke: '#7e3feb',
        labelPadding: [1, 10],
        labelBackgroundRadius: 4,
      },
    },
    behaviors: ['drag-canvas', 'drag-element'],
    layout: {
      type: 'antv-dagre',
      rankdir: 'LR',
      nodesep: 15,
      ranksep: 100,
    },
    plugins: [{ type: 'grid-line', size: 30 }],
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    gui.add({ type: 'cubic-horizontal' }, 'type').disable();

    const options = {
      curveOffset: 20,
      curvePosition: 0.5,
    };
    const optionFolder = gui.addFolder('cubic-horizontal.style');
    optionFolder.add(options, 'curveOffset', 0, 100);
    optionFolder.add(options, 'curvePosition', 0, 1);

    optionFolder.onChange(({ property, value }) => {
      graph.updateEdgeData((prev) => prev.map((edge) => ({ ...edge, style: { [property]: value } })));
      graph.render();
    });
  },
);
```


设置 `edge.type` 为 `cubic-horizontal` 以使用水平方向的三次贝塞尔曲线。

## 样式配置

> 如果元素有其特定的属性，我们将在下面列出。对于所有的通用样式属性，见 [BaseEdge](/zh/manual/element/edge/BaseEdge/)

| 属性          | 描述                                                 | 类型                   | 默认值    | 必选 |
| ------------- | ---------------------------------------------------- | ---------------------- | --------- | ---- |
| curvePosition | 控制点在两端点连线上的相对位置，范围为`0-1`          | number &#124; number[] | [0.5,0.5] |      |
| curveOffset   | 控制点距离两端点连线的距离，可理解为控制边的弯曲程度 | number &#124; number[] | [0,0]     |      |

## 示例

### 内置水平三次贝塞尔曲线边效果



```ts

import { Graph } from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
    },
    {
      id: 'node2',
    },
    {
      id: 'node3',
    },
    {
      id: 'node4',
    },
    {
      id: 'node5',
    },
    {
      id: 'node6',
    },
  ],
  edges: [
    {
      id: 'line-default',
      source: 'node1',
      target: 'node2',
    },
    {
      id: 'line-active',
      source: 'node1',
      target: 'node3',
      states: ['active'],
    },
    {
      id: 'line-selected',
      source: 'node1',
      target: 'node4',
      states: ['selected'],
    },
    {
      id: 'line-highlight',
      source: 'node1',
      target: 'node5',
      states: ['highlight'],
    },
    {
      id: 'line-inactive',
      source: 'node1',
      target: 'node6',
      states: ['inactive'],
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      port: true,
      ports: [{ placement: 'right' }, { placement: 'left' }],
    },
  },
  edge: {
    type: 'cubic-horizontal',
    style: {
      labelText: (d) => d.id,
      labelBackground: true,
      endArrow: true,
    },
  },
  layout: {
    type: 'antv-dagre',
    rankdir: 'LR',
    nodesep: 20,
    ranksep: 120,
  },
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
