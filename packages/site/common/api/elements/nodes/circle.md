```js | ob { pin: false }
createGraph(
  {
    autoFit: 'center',
    data: {
      nodes: [{ id: 'node1', style: { size: 40, fill: '#7e3feb' } }],
    },
    node: {
      type: 'circle',
    },
    plugins: [{ type: 'grid-line', size: 30 }],
  },
  { width: 600, height: 220 },
  (gui, graph) => {
    gui.add({ type: 'circle' }, 'type').disable();

    const options = { size: 40 };
    const optionFolder = gui.addFolder('circle.style');
    optionFolder.add(options, 'size', 0, 100, 1);

    optionFolder.onChange(({ property, value }) => {
      graph.updateNodeData([{ id: 'node1', style: { [property]: value } }]);
      graph.render();
    });
  },
);
```
