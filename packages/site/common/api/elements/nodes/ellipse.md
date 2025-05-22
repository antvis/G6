```js | ob { pin: false }
createGraph(
  {
    autoFit: 'center',
    data: { nodes: [{ id: 'node1', style: { size: 40, fill: '#7e3feb' } }] },
    node: { type: 'ellipse' },
    plugins: [{ type: 'grid-line', size: 30 }],
  },
  { width: 600, height: 220 },
  (gui, graph) => {
    gui.add({ type: 'ellipse' }, 'type').disable();

    const options = { 'size[0]': 80, 'size[1]': 40 };

    const optionFolder = gui.addFolder('ellipse.style');
    optionFolder.add(options, 'size[0]', 0, 100, 1);
    optionFolder.add(options, 'size[1]', 0, 100, 1);

    optionFolder.onChange(({ object }) => {
      graph.updateNodeData([{ id: 'node1', style: { size: [object['size[0]'], object['size[1]']] } }]);
      graph.render();
    });
  },
);
```

设置 `node.type` 为 `ellipse` 以使用椭圆形节点。
