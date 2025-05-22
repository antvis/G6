```js | ob { pin: false }
createGraph(
  {
    data: { nodes: [{ id: 'node-1' }] },
    layout: { type: 'force' },
    behaviors: [
      {
        type: 'drag-canvas',
        key: 'drag-canvas',
      },
    ],
    node: { style: { fill: '#7e3feb' } },
    edge: { style: { stroke: '#8b9baf' } },
    plugins: [{ type: 'grid-line', size: 30 }],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      key: 'drag-canvas',
      type: 'drag-canvas',
      enable: true,
      sensitivity: 1,
      trigger: 'Use cursor by default',
    };
    const optionFolder = gui.addFolder('ZoomCanvas Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'enable');
    optionFolder.add(options, 'sensitivity', 0, 10, 1);
    optionFolder.add(options, 'trigger', {
      'Use cursor by default': [],
      'Shift+Arrow Key': {
        up: ['Shift', 'ArrowUp'],
        down: ['Shift', 'ArrowDown'],
        left: ['Shift', 'ArrowLeft'],
        right: ['Shift', 'ArrowRight'],
      },
    });
    optionFolder.onChange(({ property, value }) => {
      graph.updateBehavior({
        key: 'drag-canvas',
        [property]: value,
      });
      graph.render();
    });
  },
);
```
