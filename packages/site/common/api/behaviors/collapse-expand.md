```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        { id: 'node1', combo: 'combo1', style: { x: 250, y: 150 } },
        { id: 'node2', combo: 'combo1', style: { x: 350, y: 150 } },
        { id: 'node3', combo: 'combo2', style: { x: 250, y: 300 } },
      ],
      edges: [],
      combos: [
        { id: 'combo1', combo: 'combo2' },
        { id: 'combo2', style: {} },
      ],
    },
    node: { style: { fill: '#7e3feb' } },
    edge: { style: { stroke: '#8b9baf' } },
    behaviors: [
      {
        type: 'collapse-expand',
        key: 'collapse-expand',
      },
    ],
    plugins: [{ type: 'grid-line', size: 30 }],
    animation: true,
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    const options = {
      key: 'collapse-expand',
      type: 'collapse-expand',
      animation: true,
      enable: true,
    };
    const optionFolder = gui.addFolder('CollapseExpand Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'animation');
    optionFolder.add(options, 'enable');

    optionFolder.onChange(({ property, value }) => {
      graph.updateBehavior({
        key: 'collapse-expand',
        [property]: value,
      });
      graph.render();
    });
  },
);
```
