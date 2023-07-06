---
title: React 中使用 G6
order: 11
---

### 概述

G6 是一款纯 JavaScript 库，可与任何框架无缝结合，因此可以在各种前端框架（例如 React、Vue、Angular 等）中使用。我们提供了一个 G6 在 React 中使用的演示示例以供参考。

我们期待社区中有开发者能够提供 G6 在 Vue 和 Angular 中使用的示例，供其他开发者学习和参考，非常感谢！

在 Demo 中，我们以一个简单的流程图为例，实现如下的效果。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*L8pRS5HCPXUAAAAAAAAAAABkARQnAQ' width=800 alt='img'/>

### 功能及实现

Demo 包括以下功能点：

- 自定义节点；
- 自定义边；
- 节点的 tooltip；
- 边的 tooltip；
- 节点上面弹出右键菜单；
- tooltip 及 ContextMenu 如何渲染自定义的 React 组件。


```tsx
import React, { useEffect } from 'react';
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: '1', label: '公司1' },
    { id: '2', label: '公司2' },
    // 节点数据 ...
  ],
  edges: [
    {
      source: '1',
      target: '2',
      data: { type: 'name1', amount: '100,000,000,00 元', date: '2019-08-03' },
    },
    // 边数据 ...
  ],
};

export default () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const graphRef = React.useRef<Graph>();

  useEffect(() => {
    if (graphRef.current || !containerRef.current) return;

    const graph = new Graph({
      container: containerRef.current,
      width: 1200,
      height: 800,
      modes: { default: ['drag-canvas'] },
      layout: { type: 'dagre', direction: 'LR' },
      defaultNode: {
        type: 'node',
        labelCfg: {
          style: { fill: '#000000A6', fontSize: 10 },
        },
        style: { stroke: '#72CC4A', width: 150 },
      },
      defaultEdge: { type: 'polyline' },
    });

    // 绑定数据
    graph.data(data);
    // 渲染图
    graph.render();

    graphRef.current = graph;
  }, []);

  return <div ref={containerRef}></div>;
};
```

### G6 中渲染 React 组件

节点和边的 tooltip、节点上的右键菜单，G6 中内置的很难满足样式上的需求，这个时候我们就可以通过渲染自定义的 React 组件来实现。Tooltip 和 ContextMenu 都是普通的 React 组件，样式完全由用户控制。交互过程中，在 G6 中需要做的事情就是确定何时渲染组件，以及渲染到何处。在 G6 中获取到是否渲染组件的标识值和渲染位置后，这些值就可以使用 React state 进行管理，后续的所有工作就全部由 React 负责了。

```javascript
// 边 tooltip 坐标
const [showNodeTooltip, setShowNodeTooltip] = useState(false);
const [nodeTooltipX, setNodeToolTipX] = useState(0);
const [nodeTooltipY, setNodeToolTipY] = useState(0);

// 监听 node 上面 mouse 事件
graph.on('node:mouseenter', (evt) => {
  const { item } = evt;
  const model = item.getModel();
  const { x, y } = model;
  const point = graph.getCanvasByPoint(x, y);

  setNodeToolTipX(point.x - 75);
  setNodeToolTipY(point.y + 15);
  setShowNodeTooltip(true);
});

// 节点上面触发 mouseleave 事件后隐藏 tooltip 和 ContextMenu
graph.on('node:mouseleave', () => {
  setShowNodeTooltip(false);
});

return <div ref={ref}>{showNodeTooltip && <NodeTooltips x={nodeTooltipX} y={nodeTooltipY} />}</div>;
```

完整的 Demo 源码请戳 「<a href='https://github.com/baizn/g6-in-react' target='_blank'>这里</a>」。
