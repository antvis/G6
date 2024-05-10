```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }, { id: 'node6' }],
      edges: [
        { source: 'node1', target: 'node2' },
        { source: 'node1', target: 'node3' },
        { source: 'node1', target: 'node4' },
        { source: 'node1', target: 'node5' },
        { source: 'node1', target: 'node6' },
      ],
    },
    node: {
      style: { port: true, ports: [{ placement: 'left' }, { placement: 'right' }] },
    },
    edge: { type: 'cubic-horizontal' },
    behaviors: ['drag-canvas', 'drag-element'],
    plugins: ['grid-line'],
    layout: {
      type: 'antv-dagre',
      begin: [100, 50],
      rankdir: 'LR',
      nodesep: 15,
      ranksep: 100,
    },
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    gui.add({ type: 'cubic-horizontal' }, 'type').disable();

    const options = {
      curveOffset: 20,
      curvePosition: 0.5,
    };
    const optionFolder = gui.addFolder('cubic-horizontal.style');
    optionFolder.add(options, 'curveOffset', 0, 100);
    optionFolder.add(options, 'curvePosition', 0, 1);

    optionFolder.onChange(({ property, value }) => {
      graph.updateEdgeData((prev) => prev.map((edge) => ({ ...edge, style: { [property]: value } })));
      graph.render();
    });
  },
);
```
