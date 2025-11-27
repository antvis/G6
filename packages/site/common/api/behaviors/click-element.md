```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        { id: 'node-1', style: { x: 280, y: 60, fill: '#E4504D', labelText: 'degree: 0' } },
        { id: 'node-2-1', style: { x: 330, y: 140, fill: '#FFC40C', labelText: 'degree: 1' } },
        { id: 'node-2-2', style: { x: 230, y: 140, fill: '#FFC40C', labelText: 'degree: 1' } },
        { id: 'node-3-1', style: { x: 380, y: 220, fill: '#0f0', labelText: 'degree: 2' } },
        { id: 'node-3-2', style: { x: 180, y: 220, fill: '#0f0', labelText: 'degree: 2' } },

        {
          id: 'degree引导',
          style: {
            x: 525,
            y: 110,
            fill: null,
            labelText: '这里可以修改degree ->',
            labelFontWeight: 700,
            labelFontSize: 10,
          },
        },
      ],
      edges: [
        { source: 'node-1', target: 'node-2-1' },
        { source: 'node-1', target: 'node-2-2' },
        { source: 'node-2-1', target: 'node-3-1' },
        { source: 'node-2-2', target: 'node-3-2' },
      ],
    },
    node: {
      style: { label: true, labelFill: '#666', labelFontSize: 14, labelPlacement: 'bottom' },
      state: {
        custom: { fill: '#ffa940' },
      },
    },
    edge: {
      stroke: '#8b9baf',
      state: {
        custom: { stroke: '#ffa940' },
      },
    },
    behaviors: [
      {
        type: 'click-select',
        key: 'click-select',
      },
    ],
    plugins: [{ type: 'grid-line', size: 30 }],
    animation: true,
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      key: 'click-select',
      type: 'click-select',
      animation: true,
      enable: true,
      multiple: false,
      trigger: 'shift+click',
      state: 'selected',
      unselectedState: undefined,
      degree: 0,
    };
    const optionFolder = gui.addFolder('Click Select Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'animation');
    optionFolder.add(options, 'enable');
    optionFolder.add(options, 'degree', 0, 2, 1);
    optionFolder.add(options, 'state', ['active', 'selected', 'custom']);
    optionFolder.add(options, 'unselectedState', [undefined, 'inactive']);
    const trigger = optionFolder
      .add(options, 'trigger', {
        'shift+click': ['shift'],
        'meta+click': ['Meta'],
      })
      .hide();
    optionFolder.add(options, 'multiple').onChange((v) => trigger.show(v));

    optionFolder.onChange(({ property, value }) => {
      graph.updateBehavior({
        key: 'click-select',
        [property]: value,
      });
      graph.render();
    });
  },
);
```
