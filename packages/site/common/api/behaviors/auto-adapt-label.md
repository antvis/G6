```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        { id: 'node1', style: { x: 200, y: 100, labelText: '短标签' } },
        { id: 'node2', style: { x: 360, y: 100, labelText: '中等长度的标签' } },
        { id: 'node3', style: { x: 280, y: 220, labelText: '这是一个非常非常长的标签，需要自适应显示' } },
      ],
      edges: [
        { source: 'node1', target: 'node2' },
        { source: 'node1', target: 'node3' },
        { source: 'node2', target: 'node3' },
      ],
    },
    node: {
      style: { label: true, fill: '#7e3feb', labelFill: '#666', labelFontSize: 14, labelPlacement: 'bottom' },
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
    behaviors: ['zoom-canvas', 'drag-canvas', { key: 'auto-adapt-label', type: 'auto-adapt-label' }],
    plugins: [{ type: 'grid-line', size: 30 }],
    animation: true,
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    const options = {
      key: 'auto-adapt-label',
      type: 'auto-adapt-label',
      animation: true,
      enable: true,
      throttle: 100,
      padding: 0
    };
    const optionFolder = gui.addFolder('CollapseExpand Options');
    optionFolder.add(options, 'type').disable(true);
    optionFolder.add(options, 'animation');
    optionFolder.add(options, 'enable');
    optionFolder.add(options, 'throttle', 0, 900, 100);
    optionFolder.add(options, 'padding', 0, 20, 1);
    optionFolder.onChange(({ property, value }) => {
      graph.updateBehavior({
        key: 'auto-adapt-label',
        [property]: value,
      });
      graph.render();
    });
  }
);
```