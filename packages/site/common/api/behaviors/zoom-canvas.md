```js | ob { pin: false }
createGraph(
  {
    data: { nodes: [{ id: 'node-1' }] },
    layout: { type: 'force' },
    behaviors: [
      {
        type: 'zoom-canvas',
        key: 'zoom-canvas',
      },
    ],
    node: { style: { fill: '#873bf4' } },
    edge: { style: { stroke: '#8b9baf' } },
    plugins: [{ type: 'grid-line', size: 30 }],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      key: 'zoom-canvas',
      type: 'zoom-canvas',
      animation: true,
      enable: true,
      sensitivity: 1,
      trigger: 'Use wheel by default',
    };
    const optionFolder = gui.addFolder('ZoomCanvas Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'animation');
    optionFolder.add(options, 'enable');
    optionFolder.add(options, 'sensitivity', 0, 10, 1);
    optionFolder.add(options, 'trigger', {
      'Use wheel by default': [],
      'Control+Wheel': ['Control'],
      'zoomIn:Ctrl+1 zoomOut:Ctrl+2 reset:Ctrl+0': {
        zoomIn: ['Control', '1'],
        zoomOut: ['Control', '2'],
        reset: ['Control', '0'],
      },
    });
    optionFolder.onChange(({ property, value }) => {
      graph.updateBehavior({
        key: 'zoom-canvas',
        [property]: value,
      });
      graph.render();
    });
  },
);
```
