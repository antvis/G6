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
        type: 'click-element',
        key: 'click-element',
      },
    ],
    plugins: ['grid-line'],
    animation: true,
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      key: 'click-element',
      type: 'click-element',
      animation: true,
      enable: true,
      multiple: false,
      trigger: 'shift+click',
      selectedState: 'selected',
      unselectedState: undefined,
      degree: 0,
    };
    const optionFolder = gui.addFolder('ZoomCanvas Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'animation');
    optionFolder.add(options, 'enable');
    optionFolder.add(options, 'degree', 0, 2, 1);
    optionFolder.add(options, 'selectedState', ['active', 'selected', 'custom']);
    optionFolder.add(options, 'unselectedState', [undefined, 'inactive']);
    optionFolder.add(options, 'multiple').onChange((v) => trigger.show(v));
    const trigger = optionFolder
      .add(options, 'trigger', {
        'shift+click': ['shift'],
        'meta+click': ['Meta'],
      })
      .hide();

    optionFolder.onChange(({ property, value }) => {
      graph.updateBehavior({
        key: 'click-element',
        [property]: value,
      });
      graph.render();
    });
  },
);
```
