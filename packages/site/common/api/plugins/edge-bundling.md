```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        { id: 'node-1' },
        { id: 'node-2' },
        { id: 'node-3' },
        { id: 'node-4' },
        { id: 'node-5' },
        { id: 'node-6' },
        { id: 'node-7' },
        { id: 'node-8' },
        { id: 'node-9' },
        { id: 'node-10' },
      ],
      edges: [
        { source: 'node-1', target: 'node-2' },
        { source: 'node-1', target: 'node-3' },
        { source: 'node-1', target: 'node-4' },
        { source: 'node-1', target: 'node-5' },
        { source: 'node-2', target: 'node-4' },
        { source: 'node-2', target: 'node-6' },
        { source: 'node-2', target: 'node-8' },
        { source: 'node-3', target: 'node-5' },
        { source: 'node-3', target: 'node-7' },
        { source: 'node-3', target: 'node-9' },
        { source: 'node-4', target: 'node-6' },
        { source: 'node-4', target: 'node-10' },
        { source: 'node-5', target: 'node-7' },
        { source: 'node-5', target: 'node-8' },
        { source: 'node-6', target: 'node-8' },
        { source: 'node-6', target: 'node-9' },
        { source: 'node-7', target: 'node-9' },
        { source: 'node-7', target: 'node-10' },
        { source: 'node-8', target: 'node-10' },
        { source: 'node-9', target: 'node-1' },
        { source: 'node-10', target: 'node-2' },
        { source: 'node-10', target: 'node-3' },
        { source: 'node-10', target: 'node-4' },
        { source: 'node-10', target: 'node-5' },
        { source: 'node-10', target: 'node-6' },
        { source: 'node-10', target: 'node-7' },
        { source: 'node-10', target: 'node-8' },
        { source: 'node-10', target: 'node-9' },
      ],
    },
    node: { style: { fill: '#7e3feb' } },
    edge: { style: { stroke: '#8b9baf' } },
    layout: { type: 'circular' },
    behaviors: ['drag-canvas', 'zoom-canvas'],
    plugins: [
      {
        type: 'edge-bundling',
        key: 'edge-bundling',
        bundleThreshold: 0.6,
        cycles: 6,
        divisions: 3,
        divRate: 2,
        iterations: 90,
        iterRate: 2 / 3,
        K: 0.1,
        lambda: 0.1,
      },
    ],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      type: 'edge-bundling',
      bundleThreshold: 0.6,
      cycles: 6,
      divisions: 1,
      divRate: 2,
      iterations: 90,
      iterRate: 2 / 3,
      K: 0.1,
      lambda: 0.1,
    };
    const optionFolder = gui.addFolder('Edge Bundling Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'bundleThreshold', 0, 1, 0.01);
    optionFolder.add(options, 'cycles', 1, 20, 1);
    optionFolder.add(options, 'divisions', 1, 10, 1);
    optionFolder.add(options, 'divRate', 1, 5, 0.1);
    optionFolder.add(options, 'iterations', 10, 200, 10);
    optionFolder.add(options, 'iterRate', 0.1, 1, 0.01);
    optionFolder.add(options, 'K', 0.01, 1, 0.01);
    optionFolder.add(options, 'lambda', 0.01, 1, 0.01);

    optionFolder.onChange(({ property, value }) => {
      graph.updatePlugin({
        key: 'edge-bundling',
        [property]: value,
      });
      graph.render();
    });
  },
);
```
