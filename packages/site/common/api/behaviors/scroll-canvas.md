```js | ob { pin: false }
createGraph(
  {
    data: { nodes: [{ id: 'node-1' }] },
    layout: { type: 'force' },
    behaviors: [
      {
        type: 'scroll-canvas',
        key: 'scroll-canvas',
      },
    ],
    node: { style: { fill: '#873bf4' } },
    edge: { style: { stroke: '#8b9baf' } },
    plugins: [{ type: 'grid-line', size: 30 }],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      key: 'scroll-canvas',
      type: 'scroll-canvas',
      direction: 'No limit',
      enable: true,
      sensitivity: 1,
      trigger: 'Use wheel by default',
    };
    const optionFolder = gui.addFolder('ZoomCanvas Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'direction', {
      'No limit': '',
      'Only allow horizontal scrolling': 'x',
      'Only allow vertical scrolling': 'y',
    });
    optionFolder.add(options, 'enable');
    optionFolder.add(options, 'sensitivity', 0, 10, 1);
    optionFolder.add(options, 'trigger', {
      'Use wheel by default': [],
      'Shift+Arrow Key': {
        up: ['Shift', 'ArrowUp'],
        down: ['Shift', 'ArrowDown'],
        left: ['Shift', 'ArrowLeft'],
        right: ['Shift', 'ArrowRight'],
      },
    });
    optionFolder.onChange(({ property, value }) => {
      graph.updateBehavior({
        key: 'scroll-canvas',
        [property]: value,
      });
      graph.render();
    });
  },
);
```
