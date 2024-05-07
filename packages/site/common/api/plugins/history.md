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
      },
    },
    behaviors: ['drag-element'],
    plugins: ['grid-line', { type: 'history', key: 'history' }],
  },
  { width: 800, height: 300 },
  (gui, graph) => {
    const options = {
      type: 'history',
      stackSize: 0,
    };
    const optionFolder = gui.addFolder('History Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'stackSize', 0, 10, 1);
    optionFolder.onChange((e) => {
      graph.updatePlugin({
        key: 'history',
        ...e.object,
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
