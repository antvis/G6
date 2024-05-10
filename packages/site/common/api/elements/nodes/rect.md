```js | ob { pin: false }
createGraph(
  {
    data: { nodes: [{ id: 'node1', style: { x: 300, y: 110 } }] },
    node: { type: 'rect' },
    plugins: ['grid-line'],
  },
  { width: 600, height: 220 },
  (gui, graph) => {
    gui.add({ type: 'rect' }, 'type').disable();

    const options = { 'size[0]': 48, 'size[1]': 24 };

    const optionFolder = gui.addFolder('rect.style');
    optionFolder.add(options, 'size[0]', 0, 100, 1);
    optionFolder.add(options, 'size[1]', 0, 100, 1);

    optionFolder.onChange(({ object }) => {
      graph.updateNodeData([{ id: 'node1', style: { size: [object['size[0]'], object['size[1]']] } }]);
      graph.render();
    });
  },
);
```
