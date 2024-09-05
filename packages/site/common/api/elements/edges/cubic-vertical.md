```js | ob { pin: false }
createGraph(
  {
    autoFit: 'center',
    data: {
      nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }, { id: 'node6' }],
      edges: [
        { source: 'node1', target: 'node2' },
        { source: 'node1', target: 'node3' },
        { source: 'node1', target: 'node4', text: 'cubic-vertical' },
        { source: 'node1', target: 'node5' },
        { source: 'node1', target: 'node6' },
      ],
    },
    node: {
      style: {
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        lineWidth: 1,
        port: true,
        ports: [{ placement: 'top' }, { placement: 'bottom' }],
      },
    },
    edge: {
      type: 'cubic-vertical',
      style: {
        stroke: '#7e3feb',
        lineWidth: 2,
        labelText: (d) => d.text,
        labelBackground: true,
        labelBackgroundFill: '#f9f0ff',
        labelBackgroundOpacity: 1,
        labelBackgroundLineWidth: 2,
        labelBackgroundStroke: '#7e3feb',
        labelPadding: [1, 10],
        labelBackgroundRadius: 4,
      },
    },
    behaviors: ['drag-canvas', 'drag-element'],
    layout: {
      type: 'antv-dagre',
      rankdir: 'TB',
      nodesep: 25,
      ranksep: 80,
    },
    plugins: [{ type: 'grid-line', size: 30 }],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    gui.add({ type: 'cubic-vertical' }, 'type').disable();

    const options = {
      curveOffset: 20,
      curvePosition: 0.5,
    };
    const optionFolder = gui.addFolder('cubic-vertical.style');
    optionFolder.add(options, 'curveOffset', 0, 100);
    optionFolder.add(options, 'curvePosition', 0, 1);

    optionFolder.onChange(({ property, value }) => {
      graph.updateEdgeData((prev) => prev.map((edge) => ({ ...edge, style: { [property]: value } })));
      graph.render();
    });
  },
);
```
