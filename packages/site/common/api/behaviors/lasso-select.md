```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        { id: 'node-1', style: { x: 200, y: 100 } },
        { id: 'node-2', style: { x: 360, y: 100 } },
        { id: 'node-3', style: { x: 280, y: 220 } },
      ],
      edges: [
        { source: 'node-1', target: 'node-2' },
        { source: 'node-1', target: 'node-3' },
        { source: 'node-2', target: 'node-3' },
      ],
    },
    node: {
      state: {
        custom: {
          fill: '#D580FF',
          halo: true,
        },
      },
    },
    edge: {
      state: {
        custom: {
          stroke: '#D580FF',
          halo: true,
        },
      },
    },
    behaviors: [
      {
        type: 'lasso-select',
        key: 'lasso-select',
      },
    ],
    plugins: ['grid-line'],
    animation: true,
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      key: 'lasso-select',
      type: 'lasso-select',
      animation: false,
      enable: true,
      enableElements: ['node', 'edge', 'combo'],
      immediately: false,
      mode: 'default',
      state: 'selected',
      trigger: 'shift+drag',
    };
    const optionFolder = gui.addFolder('LassoSelect Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'animation');
    optionFolder.add(options, 'enable');
    optionFolder.add(options, 'enableElements', [
      ['node', 'edge', 'combo'],
      ['node', 'edge'],
      ['node', 'combo'],
      ['combo', 'edge'],
      ['node'],
      ['edge'],
      ['combo'],
    ]);
    optionFolder.add(options, 'trigger', {
      'shift+drag': ['shift'],
      drag: [],
    });
    optionFolder.add(options, 'state', ['active', 'selected', 'custom']);
    optionFolder.add(options, 'mode', ['union', 'intersect', 'diff', 'default']).onChange((e) => {
      immediately.show(e === 'default');
    });
    const immediately = optionFolder.add(options, 'immediately');

    optionFolder.onChange(({ property, value }) => {
      graph.updateBehavior({
        key: 'lasso-select',
        [property]: value,
      });
      graph.render();
    });
  },
);
```
