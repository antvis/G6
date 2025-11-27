```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        { id: 'node1', style: { x: 200, y: 100, labelText: 'node1' } },
        { id: 'node2', style: { x: 360, y: 100, labelText: 'node2' } },
        { id: 'node3', style: { x: 280, y: 220, labelText: 'node3' } },
      ],
      edges: [
        { source: 'node1', target: 'node2' },
        { source: 'node1', target: 'node3' },
        { source: 'node2', target: 'node3' },
      ],
    },
    node: {
      style: { label: true, labelFill: '#666', labelFontSize: 14, labelPlacement: 'bottom' },
      state: {
        custom: { fill: '#ffa940' },
      },
    },
    edge: {
      stroke: '#8b9baf',
      state: {
        custom: { stroke: '#ffa940' },
      },
    },
    behaviors: ['zoom-canvas', 'drag-canvas', { key: 'fix-element-size', type: 'fix-element-size' }],
    plugins: [{ type: 'grid-line', size: 30 }],
    animation: true,
  },
  { width: 800, height: 400 },
  (gui, graph) => {
    const options = {
      key: 'fix-element-size',
      type: 'fix-element-size',
      animation: true,
      enable: true,
      reset: true,
    };
    const optionFolder = gui.addFolder('CollapseExpand Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'animation');
    optionFolder.add(options, 'enable');
    optionFolder.add(options, 'reset');
    optionFolder.onChange(({ property, value }) => {
      graph.updateBehavior({
        key: 'fix-element-size',
        [property]: value,
      });
      graph.render();
    });
  },
);
```
