```js | ob { pin: false }
createGraph(
  {
    data: { nodes: [{ id: 'node-1' }] },
    node: { style: { fill: '#7e3feb' } },
    edge: { style: { stroke: '#8b9baf' } },
    layout: { type: 'force' },
    behaviors: ['drag-canvas'],
    plugins: [{ type: 'watermark', key: 'watermark', text: 'G6: Graph Visualization' }],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const options = {
      type: 'watermark',
      width: 200,
      height: 100,
      opacity: 0.2,
      rotate: Math.PI / 12,
      text: 'G6: Graph Visualization',
    };
    const optionFolder = gui.addFolder('Watermark Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'width', 1, 1280, 1);
    optionFolder.add(options, 'height', 1, 800, 1);
    optionFolder.add(options, 'opacity', 0, 1, 0.1);
    optionFolder.add(options, 'rotate', 0, 2 * Math.PI, Math.PI / 12);
    optionFolder.add(options, 'text');

    optionFolder.onChange(({ property, value }) => {
      graph.updatePlugin({
        key: 'watermark',
        [property]: value,
      });
      graph.render();
    });
  },
);
```
