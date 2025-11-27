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
    layout: { type: 'grid' },
    behaviors: ['drag-canvas', 'drag-element'],
    plugins: [
      { type: 'grid-line', key: 'grid-line', size: 30 },
      {
        type: 'snapline',
        key: 'snapline',
        tolerance: 5,
        offset: 20,
        verticalLineStyle: { stroke: '#F08F56', lineWidth: 2 },
        horizontalLineStyle: { stroke: '#17C76F', lineWidth: 2 },
      },
    ],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      type: 'snapline',
      tolerance: 5,
      offset: 20,
      autoSnap: true,
    };
    const optionFolder = gui.addFolder('Snapline Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'tolerance', 1, 20, 1);
    optionFolder.add(options, 'offset', 1, 50, 1);
    optionFolder.add(options, 'autoSnap');

    optionFolder.onChange(({ property, value }) => {
      graph.updatePlugin({
        key: 'snapline',
        [property]: value,
      });
      graph.render();
    });
  },
);
```
