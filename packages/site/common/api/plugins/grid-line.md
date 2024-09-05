```js | ob { pin: false }
createGraph(
  {
    data: { nodes: [{ id: 'node-1' }] },
    node: { style: { fill: '#7e3feb' } },
    edge: { style: { stroke: '#8b9baf' } },
    layout: { type: 'force' },
    behaviors: ['drag-canvas'],
    plugins: [{ type: 'grid-line', size: 30 }],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const LINE_STYLE = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];
    const options = {
      type: 'grid-line',
      border: true,
      borderLineWidth: 1,
      borderStroke: '#eee',
      borderStyle: 'solid',
      follow: false,
      lineWidth: 1,
      size: 20,
      stroke: '#eee',
    };
    const optionFolder = gui.addFolder('Gird Line Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'size', 1, 50, 1);
    optionFolder.add(options, 'lineWidth', 1, 10, 1);
    optionFolder.addColor(options, 'stroke');
    optionFolder.add(options, 'border');
    optionFolder.add(options, 'borderLineWidth', 1, 10, 1);
    optionFolder.add(options, 'borderStyle', LINE_STYLE);
    optionFolder.addColor(options, 'borderStroke');
    optionFolder.add(options, 'follow');

    optionFolder.onChange(({ property, value }) => {
      graph.updatePlugin({
        key: 'grid-line',
        [property]: value,
      });
      graph.render();
    });
  },
);
```
