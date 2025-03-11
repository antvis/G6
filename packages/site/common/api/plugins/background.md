```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        { id: 'node-0' },
        { id: 'node-1' },
        { id: 'node-2' },
        { id: 'node-3' },
        { id: 'node-4' },
        { id: 'node-5' },
      ],
      edges: [
        { source: 'node-0', target: 'node-1' },
        { source: 'node-0', target: 'node-2' },
        { source: 'node-0', target: 'node-3' },
        { source: 'node-0', target: 'node-4' },
        { source: 'node-1', target: 'node-0' },
        { source: 'node-2', target: 'node-0' },
        { source: 'node-3', target: 'node-0' },
        { source: 'node-4', target: 'node-0' },
        { source: 'node-5', target: 'node-0' },
      ],
    },
    node: { style: { fill: '#7e3feb' } },
    edge: { style: { stroke: '#8b9baf' } },
    layout: { type: 'grid' },
    behaviors: ['drag-canvas'],
    plugins: [
      {
        type: 'background',
        key: 'background',
        backgroundColor: '#f0f2f5',
      },
    ],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      type: 'background',
      backgroundSize: 'contain',
    };
    const optionFolder = gui.addFolder('Background Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'backgroundSize', ['cover', 'contain', 'auto', '50%']);

    optionFolder.onChange(({ property, value }) => {
      graph.updatePlugin({
        key: 'background',
        [property]: value,
      });
      graph.render();
    });
  },
);
```
