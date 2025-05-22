```js | ob { pin: false }
createGraph(
  {
    autoFit: 'center',
    data: { nodes: [{ id: 'node1', style: { size: 40, fill: '#7e3feb' } }] },
    node: { type: 'star' },
    plugins: [{ type: 'grid-line', size: 30 }],
  },
  { width: 600, height: 220 },
  (gui, graph) => {
    gui.add({ type: 'star' }, 'type').disable();

    const options = {
      size: 40,
      innerR: 0,
    };
    const optionFolder = gui.addFolder('star.style');
    optionFolder.add(options, 'size', 0, 100, 1);
    optionFolder.add(options, 'innerR', 0, 100);

    optionFolder.onChange(({ property, value }) => {
      graph.updateNodeData([{ id: 'node1', style: { [property]: value } }]);
      graph.render();
    });
  },
);
```

设置 `node.type` 为 `star` 以使用星形节点。
