```js | ob { pin: false }
createGraph(
  {
    data: { nodes: [{ id: 'node1', style: { x: 300, y: 110 } }] },
    node: { type: 'triangle' },
    plugins: ['grid-line'],
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
