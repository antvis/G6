```js | ob { pin: false }
createGraph(
  {
    autoFit: 'center',
    data: { nodes: [{ id: 'node1', style: { size: [48, 24], fill: '#7e3feb' } }] },
    node: { type: 'diamond' },
    plugins: [{ type: 'grid-line', size: 30 }],
  },
  { width: 600, height: 220 },
  (gui, graph) => {
    gui.add({ type: 'diamond' }, 'type').disable();

    const options = { 'size[0]': 48, 'size[1]': 24 };

    const optionFolder = gui.addFolder('diamond.style');
    optionFolder.add(options, 'size[0]', 0, 100, 1);
    optionFolder.add(options, 'size[1]', 0, 100, 1);

    optionFolder.onChange(({ object }) => {
      graph.updateNodeData([{ id: 'node1', style: { size: [object['size[0]'], object['size[1]']] } }]);
      graph.render();
    });
  },
);
```

设置 `node.type` 为 `diamond` 以使用菱形节点。
