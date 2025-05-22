```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        { id: 'node1', combo: 'combo1', style: { x: 250, y: 150 } },
        { id: 'node2', combo: 'combo1', style: { x: 350, y: 150 } },
        { id: 'node3', combo: 'combo2', style: { x: 250, y: 300 } },
      ],
      combos: [
        { id: 'combo1', combo: 'combo2' },
        { id: 'combo2', style: {} },
      ],
    },
    node: { style: { fill: '#7e3feb' } },
    combo: { type: 'rect' },
    behaviors: ['collapse-expand'],
    plugins: [{ type: 'grid-line', size: 30 }],
    animation: true,
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    gui.add({ type: 'rect' }, 'type').disable();
  },
);
```

设置 `combo.type` 为 `rect` 以使用矩形组合。
