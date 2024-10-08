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
    behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
    plugins: [
      {
        type: 'toolbar',
        key: 'toolbar',
        position: 'top-left',
        onClick: (item) => {
          alert('item clicked:' + item);
        },
        getItems: () => {
          // G6 内置了 9 个 icon，分别是 zoom-in、zoom-out、redo、undo、edit、delete、auto-fit、export、reset
          return [
            { id: 'zoom-in', value: 'zoom-in' },
            { id: 'zoom-out', value: 'zoom-out' },
            { id: 'redo', value: 'redo' },
            { id: 'undo', value: 'undo' },
            { id: 'edit', value: 'edit' },
            { id: 'delete', value: 'delete' },
            { id: 'auto-fit', value: 'auto-fit' },
            { id: 'export', value: 'export' },
            { id: 'reset', value: 'reset' },
          ];
        },
      },
    ],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      type: 'toolbar',
      position: 'top-left',
    };
    const optionFolder = gui.addFolder('Toolbar Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'position', [
      'left-top',
      'left-bottom',
      'right-top',
      'right-bottom',
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right',
    ]);

    optionFolder.onChange(({ property, value }) => {
      graph.updatePlugin({
        key: 'toolbar',
        [property]: value,
      });
      graph.render();
    });
  },
);
```
