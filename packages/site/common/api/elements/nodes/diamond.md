```js | ob { pin: false }
createGraph(
  {
    data: { nodes: [{ id: 'node1', style: { x: 300, y: 110, size: 40 } }] },
    node: { type: 'diamond' },
    plugins: ['grid-line'],
  },
  { width: 600, height: 220 },
  (gui, graph) => {
    gui.add({ type: 'diamond' }, 'type').disable();

    const options = { size: 40 };
    const optionFolder = gui.addFolder('diamond.style');
    optionFolder.add(options, 'size', 0, 100, 1);

    optionFolder.onChange(({ property, value }) => {
      graph.updateNodeData([{ id: 'node1', style: { [property]: value } }]);
      graph.render();
    });
  },
);
```
