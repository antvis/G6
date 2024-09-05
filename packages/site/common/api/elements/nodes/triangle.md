```js | ob { pin: false }
createGraph(
  {
    autoFit: 'center',
    data: { nodes: [{ id: 'node1', style: { size: 40, fill: '#7e3feb' } }] },
    node: { type: 'triangle' },
    plugins: [{ type: 'grid-line', size: 30 }],
  },
  { width: 600, height: 220 },
  (gui, graph) => {
    gui.add({ type: 'triangle' }, 'type').disable();

    const options = {
      size: 40,
      direction: 'up',
    };
    const optionFolder = gui.addFolder('triangle.style');
    optionFolder.add(options, 'size', 0, 100, 1);
    optionFolder.add(options, 'direction', ['up', 'left', 'right', 'down']);

    optionFolder.onChange(({ property, value }) => {
      graph.updateNodeData([{ id: 'node1', style: { [property]: value } }]);
      graph.render();
    });
  },
);
```
