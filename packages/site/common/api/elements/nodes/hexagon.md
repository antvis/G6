```js | ob { pin: false }
createGraph(
  {
    data: { nodes: [{ id: 'node1', style: { x: 300, y: 110, size: 40 } }] },
    node: { type: 'hexagon' },
    plugins: ['grid-line'],
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
