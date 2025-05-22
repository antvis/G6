```js | ob { pin: false }
createGraph(
  {
    autoFit: 'center',
    data: {
      nodes: new Array(16).fill(0).map((_, i) => ({ id: `${i}` })),
      edges: new Array(15).fill(0).map((_, i) => ({ source: `${i}`, target: `${i + 1}` })),
    },
    node: {
      style: {
        labelFill: '#fff',
        labelPlacement: 'center',
        labelText: (d) => d.id,
      },
    },
    behaviors: ['drag-canvas'],
    layout: {
      type: 'snake',
      clockwise: true,
      cols: 4,
      colGap: 30,
      rowGap: 30,
      padding: 15,
      nodeSize: 30,
    },
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    const options = {
      type: 'snake',
      clockwise: true,
      cols: 4,
      colGap: 30,
      rowGap: 30,
      padding: 15,
      nodeSize: 30,
    };

    const optionFolder = gui.addFolder('Grid Layout Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'cols', 2, 10, 1);
    optionFolder.add(options, 'colGap', 10, 150, 1);
    optionFolder.add(options, 'rowGap', 10, 150, 1);
    optionFolder.add(options, 'padding', 5, 100, 1);
    optionFolder.add(options, 'nodeSize', 10, 50, 30);
    optionFolder.add(options, 'clockwise');

    optionFolder.onChange(({ property, value }) => {
      graph.setLayout({
        type: 'snake',
        [property]: value,
      });
      graph.layout();
    });
  },
);
```
