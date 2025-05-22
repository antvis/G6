```js | ob { pin: false }
createGraph(
  {
    autoFit: 'center',
    data: {
      nodes: [
        {
          id: 'node1',
          style: {
            fill: 'transparent',
            size: 60,
            donuts: [30, 30, 20, 20],
            donutPalette: ['#1783FF', '#00C9C9', '#F08F56', '#D580FF'],
          },
        },
      ],
    },
    node: { type: 'donut' },
    plugins: [{ type: 'grid-line', size: 30 }],
  },
  { width: 600, height: 220 },
  (gui, graph) => {
    gui.add({ type: 'donut' }, 'type').disable();

    const options = {
      size: 60,
      innerR: 50,
      donutPalette: ['#1783FF', '#00C9C9', '#F08F56', '#D580FF'],
    };
    const optionFolder = gui.addFolder('donut.style');
    optionFolder.add(options, 'size', 0, 100, 1);
    optionFolder.add(options, 'innerR', 0, 100, 1).name('innerR(%)');
    optionFolder.add(options, 'donutPalette', ['spectral', 'tableau', ['#1783FF', '#00C9C9', '#F08F56', '#D580FF']]);

    optionFolder.onChange(({ property, value }) => {
      if (property === 'innerR') value = value + '%';
      graph.updateNodeData([{ id: 'node1', style: { [property]: value } }]);
      graph.render();
    });
  },
);
```

设置 `node.type` 为 `donut` 以使用甜甜圈节点。
