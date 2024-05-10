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
    behaviors: ['collapse-expand'],
    plugins: ['grid-line'],
    animation: true,
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    gui.add({ type: 'circle' }, 'type').disable();
  },
);
```
