```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [{ id: 'node1' }, { id: 'node2' }],
      edges: [{ id: 'edge1', source: 'node1', target: 'node2', text: 'line' }],
    },
    node: {
      style: {
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        lineWidth: 1,
      },
    },
    edge: {
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
    layout: { type: 'grid', cols: 2 },
    plugins: [{ type: 'grid-line', size: 30 }],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    gui.add({ type: 'line' }, 'type').disable();
  },
);
```

设置 `edge.type` 为 `line` 以使用直线。
