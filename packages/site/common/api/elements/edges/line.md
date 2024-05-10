```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        { id: 'node1', style: { x: 150, y: 150 } },
        { id: 'node2', style: { x: 350, y: 150 } },
      ],
      edges: [{ id: 'edge1', source: 'node1', target: 'node2' }],
    },
    behaviors: ['drag-canvas', 'drag-element'],
    plugins: ['grid-line'],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    gui.add({ type: 'line' }, 'type').disable();
  },
);
```
