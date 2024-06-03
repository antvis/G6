```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: Array.from({ length: 10 }).map((_, i) => ({ id: `node-${i}` })),
      edges: Array.from({ length: 9 }).map((_, i) => ({ source: `node-0`, target: `node-${i + 1}` })),
    },
    node: {
      style: {
        size: 20,
        fill: 'pink',
      },
    },
    edge: {
      style: {
        stroke: 'lightgreen',
      },
    },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
    layout: {
      type: 'd3-force',
    },
  },
  { width: 200, height: 200 },
);
```
