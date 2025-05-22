```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: new Array(25).fill(0).map((_, index) => ({
        id: `node-${index}`,
        data: {
          timestamp: new Date('2023-08-01').getTime() + (index % 5) * 3600 * 24 * 1000,
          value: index % 10,
          label: new Date(new Date('2023-08-01').getTime() + (index % 5) * 3600 * 24 * 1000).toLocaleString(),
        },
      })),
      edges: new Array(25).fill(0).map((_, i) => ({
        id: `edge-${i}`,
        source: `node-${i % 12}`,
        target: `node-${(i % 10) + 15}`,
        data: {
          edgeType: 'e1',
        },
      })),
    },
    layout: { type: 'grid', cols: 5 },
    node: {
      style: { size: 24, fill: '#7e3feb' },
      palette: { field: 'cluster' },
    },
    edge: { style: { stroke: '#8b9baf' } },
    behaviors: ['drag-canvas'],
    plugins: [
      'grid-line',
      {
        type: 'timebar',
        key: 'timebar',
        data: [10, 2, 3, 4, 15].map((value, index) => ({
          time: new Date(new Date('2023-08-01').getTime() + index * 3600 * 24 * 1000),
          value,
          label: new Date(new Date('2023-08-01').getTime() + index * 3600 * 24 * 1000).toLocaleString(),
        })),
        timebarType: 'time',
        height: 100,
      },
    ],
    autoFit: 'view',
    padding: [10, 0, 100, 0],
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    const options = {
      type: 'timebar',
      position: 'bottom',
      enable: true,
      timebarType: 'time',
      className: 'g6-timebar',
      width: 450,
      height: 100,
      zIndex: 3,
      elementTypes: ['node'],
      mode: 'modify',
      loop: false,
    };
    const optionFolder = gui.addFolder('Timebar Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'height', 40, 100, 1);
    optionFolder.add(options, 'width', 200, 800, 1);
    optionFolder.add(options, 'position', ['bottom', 'top']);
    optionFolder.add(options, 'timebarType', ['time', 'chart']);
    optionFolder.add(options, 'loop');

    optionFolder.onChange(({ property, value }) => {
      graph.updatePlugin({
        key: 'timebar',
        [property]: value,
      });
      graph.render();
    });

    const apiFolder = gui.addFolder('Timebar API');
    const instance = graph.getPluginInstance('timebar');
    apiFolder.add(instance, 'play');
    apiFolder.add(instance, 'pause');
    apiFolder.add(instance, 'forward');
    apiFolder.add(instance, 'backward');
    apiFolder.add(instance, 'reset');
  },
);
```
