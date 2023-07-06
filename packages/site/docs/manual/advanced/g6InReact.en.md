---
title: G6 in React
order: 11
---

### Introduction

G6 is a pure JavaScript library that seamlessly integrates with any framework, allowing it to be used in various frontend frameworks such as React, Vue, Angular, and more. We have provided a demonstration example of using G6 in React for reference.

We look forward to developers in the community providing examples of using G6 in Vue and Angular, which would be greatly appreciated as a valuable resource for other developers to learn and reference. Thank you very much!

In this demo, we will implement a simple flow diagram as the figure below:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*L8pRS5HCPXUAAAAAAAAAAABkARQnAQ' width=800 alt='img'/>

### Implementation

The demo includes these functions:

- Register a custom node;
- Register a custom edge;
- Utilize node tooltip;
- Utilize edge tooltip;
- Utilize the context menu on node;
- Render the custom React components of tooltip and ContextMenu.

In React, you can fetch the DOM element by `ReactDOM.findDOMNode(ref.current)`.

```tsx
import React, { useEffect } from 'react';
import { Graph } from '@antv/g6';

const data = {
  nodes: [
    { id: '1', label: 'Company1' },
    { id: '2', label: 'Company2' },
    // nodes data ...
  ],
  edges: [
    {
      source: '1',
      target: '2',
      data: { type: 'name1', amount: '100,000,000,00 Yuan', date: '2019-08-03' },
    },
    // edges data ...
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

    // Binding data
    graph.data(data);
    // Rendering
    graph.render();

    graphRef.current = graph;
  }, []);

  return <div ref={containerRef}></div>;
};
```

### Render the React Components

The styles of the built-in tooltips on nodes/edges and thecontext menu on nodes are too simple to satisfy the complex requirements. Now we show how to customize React components for these tools, then the styles of them can be controlled by users. During the interaction, G6 defines the render timing and position of these components. When the timing and the position are available, they can be managed by React state.

```javascript
// The coordinate of node tooltip
const [showNodeTooltip, setShowNodeTooltip] = useState(false);
const [nodeTooltipX, setNodeToolTipX] = useState(0);
const [nodeTooltipY, setNodeToolTipY] = useState(0);

// Listen to the mouse event on node
graph.on('node:mouseenter', (evt) => {
  const { item } = evt;
  const model = item.getModel();
  const { x, y } = model;
  const point = graph.getCanvasByPoint(x, y);

  setNodeToolTipX(point.x - 75);
  setNodeToolTipY(point.y + 15);
  setShowNodeTooltip(true);
});

// Hide the tooltip and the contextMenu when the mouseleave event is activated on the node
graph.on('node:mouseleave', () => {
  setShowNodeTooltip(false);
});

return <div ref={ref}>{showNodeTooltip && <NodeTooltips x={nodeTooltipX} y={nodeTooltipY} />}</div>;
```

The complete code of this demo 「<a href='https://github.com/baizn/g6-in-react' target='_blank'>HERE</a>」.
