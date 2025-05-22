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
    node: { style: { fill: '#873bf4' } },
    edge: { style: { stroke: '#8b9baf' } },
    behaviors: [
      {
        type: 'drag-element',
        key: 'drag-element',
      },
    ],
    plugins: [{ type: 'grid-line', size: 30 }],
    animation: true,
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    const options = {
      key: 'drag-element',
      type: 'drag-element',
      animation: true,
      enable: 'node,combo',
      dropEffect: 'move',
      state: 'selected',
      hideEdge: 'none',
      shadow: false,
    };
    const optionFolder = gui.addFolder('DragElement Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'animation');
    optionFolder.add(options, 'enable', {
      'node,combo': (event) => ['node', 'combo'].includes(event.targetType),
      node: (event) => ['node'].includes(event.targetType),
      combo: (event) => ['combo'].includes(event.targetType),
      none: false,
    });
    optionFolder.add(options, 'dropEffect', ['link', 'move', 'none']);
    optionFolder.add(options, 'hideEdge', ['none', 'all', 'in', 'out', 'both']);
    optionFolder.add(options, 'shadow');

    optionFolder.onChange(({ property, value }) => {
      graph.updateBehavior({
        key: 'drag-element',
        [property]: value,
      });
      graph.render();
    });
  },
);
```
