```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        { id: 'node1', style: { x: 250, y: 150, parentId: 'combo1' } },
        { id: 'node2', style: { x: 350, y: 150, parentId: 'combo1' } },
        { id: 'node3', style: { x: 250, y: 300, parentId: 'combo2' } },
      ],
      edges: [],
      combos: [
        { id: 'combo1', style: { parentId: 'combo2' } },
        { id: 'combo2', style: {} },
      ],
    },
    behaviors: [
      {
        type: 'collapse-expand',
        key: 'collapse-expand',
      },
    ],
    plugins: ['grid-line'],
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
