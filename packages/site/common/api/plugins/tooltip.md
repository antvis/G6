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
    plugins: ['grid-line', { type: 'tooltip', key: 'tooltip' }],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      type: 'tooltip',
      trigger: 'hover',
      enable: 'always',
      position: 'top-left',
      enterable: false,
    };
    const optionFolder = gui.addFolder('Tooltip Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'trigger', ['click', 'hover']);
    optionFolder.add(options, 'enable', ['always', 'node', 'edge']);
    optionFolder.add(options, 'position', [
      'top',
      'bottom',
      'left',
      'right',
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right',
    ]);
    optionFolder.add(options, 'enterable');

    optionFolder.onChange((e) => {
      const { enable, ...rest } = e.object;
      let enableFn = () => true;
      if ((enable === 'node') | (enable === 'edge')) {
        enableFn = (e) => e.targetType === enable;
      }
      graph.updatePlugin({
        key: 'tooltip',
        enable: enableFn,
        ...rest,
      });
      graph.render();
    });
    // const apiFolder = gui.addFolder('Contextmenu API');
    // const instance = graph.getPluginInstance('contextmenu');
    // apiFolder.add(instance, 'hide');
  },
);
```
