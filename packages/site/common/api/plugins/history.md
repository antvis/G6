```js | ob { pin: false }
createGraph(
  {
    data: { nodes: [{ id: 'node-1' }] },
    layout: { type: 'force' },
    node: {
      style: {
        size: 60,
        labelText: 'Drag Me!',
        labelPlacement: 'middle',
        labelFill: '#fff',
        fill: '#7e3feb',
      },
    },
    edge: { style: { stroke: '#8b9baf' } },
    behaviors: ['drag-element'],
    plugins: ['grid-line', { type: 'history', key: 'history' }],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      type: 'history',
      stackSize: 0,
    };
    const optionFolder = gui.addFolder('History Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'stackSize', 0, 10, 1);
    optionFolder.onChange(({ property, value }) => {
      graph.updatePlugin({
        key: 'history',
        [property]: value,
      });
      graph.render();
    });

    const apiFolder = gui.addFolder('History API');
    const instance = graph.getPluginInstance('history');
    apiFolder.add(instance, 'undo');
    apiFolder.add(instance, 'redo');
    apiFolder.add(instance, 'clear');
  },
);
```
