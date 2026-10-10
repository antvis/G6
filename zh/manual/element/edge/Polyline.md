---
title: "折线边 Polyline"
description: "折线边 Polyline"
language: "zh"
canonical: "https://g6.antv.antgroup.com/zh/manual/element/edge/Polyline/"
version: "5.1.1"
---

## 概述

折线是由多条直线段组成的边，适合在复杂布局中绕过障碍物连接节点。

使用场景：

- 适用于复杂布局的图，如电路图、管道图。

- 当需要绕过其他节点或障碍物时使用。

## 在线体验



```ts
import { createGraph } from '/demo-runtime.ts';

createGraph(
  {
    data: {
      nodes: [
        {
          id: 'node1',
          style: { x: 150, y: 150 },
        },
        {
          id: 'node2',
          style: {
            x: 400,
            y: 150,
            labelText: 'Drag Me!',
            labelPadding: [1, 5],
            labelBackground: true,
            labelBackgroundRadius: 10,
            labelBackgroundFill: '#99add1',
          },
        },
      ],
      edges: [
        {
          id: 'edge1',
          source: 'node1',
          target: 'node2',
          text: 'polyline',
        },
      ],
    },
    node: {
      style: {
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        lineWidth: 1,
      },
    },
    edge: {
      type: 'polyline',
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
        router: { type: 'orth' },
      },
    },
    behaviors: ['drag-canvas', 'drag-element'],
    plugins: [{ type: 'grid-line', size: 30 }],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    gui.add({ type: 'polyline' }, 'type').disable();

    let index = 3;
    const options = {
      radius: 0,
      router: {
        type: 'orth',
      },
      random: () => {
        const x = Math.floor(Math.random() * 600);
        const y = Math.floor(Math.random() * 300);
        graph.addNodeData([
          {
            id: `node-${index}`,
            style: {
              size: 5,
              fill: '#7e3feb',
              x,
              y,
            },
          },
        ]);
        index++;
        graph.updateEdgeData((prev) => {
          const targetEdgeData = prev.find((edge) => edge.id === 'edge1');
          const controlPoints = [...(targetEdgeData.style.controlPoints || [])];
          controlPoints.push([x, y]);
          return [{ ...targetEdgeData, style: { ...targetEdgeData.style, controlPoints } }];
        });
        graph.render();
      },
    };
    const optionFolder = gui.addFolder('polyline.style');
    optionFolder.add(options, 'radius', 0, 100, 1);
    optionFolder.add(options, 'router');
    optionFolder.add(options, 'random').name('Add random node as control points');

    optionFolder.onChange(({ property, value }) => {
      if (property === 'random') return;
      graph.updateEdgeData([{ id: 'edge1', style: { [property]: value } }]);
      graph.render();
    });
  },
);
```


设置 `edge.type` 为 `polyline` 以使用折线。

## 样式配置

> 如果元素有其特定的属性，我们将在下面列出。对于所有的通用样式属性，见 [BaseEdge](/zh/manual/element/edge/BaseEdge/)

| 属性          | 描述                             | 类型                                                                                    | 默认值 | 必选 |
| ------------- | -------------------------------- | --------------------------------------------------------------------------------------- | ------ | ---- |
| controlPoints | 控制点数组，用于定义折线的转折点 | [Point](#point)[]                                                                       | []     |      |
| radius        | 转折点圆角半径                   | number                                                                                  | 0      |      |
| router        | 是否启用路由                     | false &#124; [OrthRouter](#orthrouter) &#124; [ShortestPathRouter](#shortestpathrouter) | false  |      |

### OrthRouter

| 属性    | 描述                                                                   | 类型                | 默认值 |
| ------- | ---------------------------------------------------------------------- | ------------------- | ------ |
| type    | 正交路由，通过在路径上添加额外的控制点，使得边的每一段都保持水平或垂直 | `'orth'`            | -      |
| padding | 节点连接点与转角的最小距离                                             | [Padding](#padding) | `0`    |

### ShortestPathRouter

| 属性                      | 描述                                                                                                                                              | 类型                                                                   | 默认值 |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------ |
| type                      | 最短路径路由，是正交路由 `'orth'` 的智能版本。该路由由水平或垂直的正交线段组成。采用 A\* 算法计算最短路径，并支持自动避开路径上的其他节点（障碍） | `'shortest-path'`                                                      | -      |
| offset                    | 节点锚点与转角的最小距离                                                                                                                          | [Padding](#padding)                                                    | 0      |
| gridSize                  | grid 格子大小                                                                                                                                     | number                                                                 | 0      |
| maxAllowedDirectionChange | 支持的最大旋转角度（弧度）                                                                                                                        | number                                                                 | 0      |
| startDirections           | 节点的可能起始方向                                                                                                                                | [Direction](#direction)[]                                              | 0      |
| endDirections             | 节点的可能结束方向                                                                                                                                | [Direction](#direction)[]                                              | 0      |
| directionMap              | 指定可移动的方向                                                                                                                                  | \{ [key in [Direction](#direction)]: \{ stepX: number; stepY: number \} \} | 0      |
| penalties                 | 表示在路径搜索过程中某些路径的额外代价。key 为弧度值，value 为代价                                                                                | \{ [key: string]: number \}                                              | 0      |
| distFunc                  | 指定计算两点之间距离的函数                                                                                                                        | (p1: [Point](#point), p2: [Point](#point)) => number                   | 0      |
| maximumLoops              | 最大迭代次数                                                                                                                                      | number                                                                 | 0      |
| enableObstacleAvoidance   | 是否开启避障                                                                                                                                      | boolean                                                                | false  |

#### Direction

```typescript
type Direction = 'left' | 'right' | 'top' | 'bottom';
```

#### Point

```typescript
type Point = [number, number] | [number, number, number] | Float32Array;
```

#### Padding

```typescript
type Padding = number | [number, number] | [number, number, number, number];
```

## 示例

### 内置折线边效果



```ts

import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: 'node-1', style: { x: 200, y: 200 } },
    { id: 'node-2', style: { x: 350, y: 120 } },
  ],
  edges: [
    {
      id: 'edge-1',
      source: 'node-1',
      target: 'node-2',
      controlPoints: [[300, 190]],
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  edge: {
    type: 'polyline',
    style: {
      controlPoints: (d) => d.controlPoints,
    },
  },
  behaviors: [{ type: 'drag-element' }],
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
