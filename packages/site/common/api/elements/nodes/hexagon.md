```js | ob { pin: false }
createGraph(
  {
    autoFit: 'center',
    data: { nodes: [{ id: 'node1', style: { size: 40, fill: '#7e3feb' } }] },
    node: { type: 'hexagon' },
    plugins: [{ type: 'grid-line', size: 30 }],
  },
  { width: 600, height: 220 },
  (gui, graph) => {
    gui.add({ type: 'hexagon' }, 'type').disable();

    const options = {
      size: 40,
      outerR: 0,
    };
    const optionFolder = gui.addFolder('hexagon.style');
    optionFolder.add(options, 'size', 0, 100, 1);
    optionFolder.add(options, 'outerR', 0, 100);

    optionFolder.onChange(({ property, value }) => {
      graph.updateNodeData([{ id: 'node1', style: { [property]: value } }]);
      graph.render();
    });
  },
);
```
