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
        type: 'hover-activate',
        key: 'hover-activate',
      },
    ],
    plugins: ['grid-line'],
    animation: true,
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      key: 'hover-activate',
      type: 'hover-activate',
      animation: true,
      enable: true,
      degree: 0,
      state: 'active',
      inactiveState: undefined,
    };
    const optionFolder = gui.addFolder('ZoomCanvas Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'animation');
    optionFolder.add(options, 'enable');
    optionFolder.add(options, 'degree', 0, 2, 1);
    optionFolder.add(options, 'state', ['active', 'selected', 'custom']);
    optionFolder.add(options, 'inactiveState', [undefined, 'inactive']);

    optionFolder.onChange(({ property, value }) => {
      graph.updateBehavior({
        key: 'hover-activate',
        [property]: value,
      });
      graph.render();
    });
  },
);
```
