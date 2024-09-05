```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [{ id: 'node1' }, { id: 'node2' }],
      edges: [{ id: 'edge1', source: 'node1', target: 'node2', text: 'quadratic' }],
    },
    node: {
      style: {
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        lineWidth: 1,
      },
    },
    edge: {
      type: 'quadratic',
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
    layout: { type: 'grid', cols: 2 },
    plugins: [{ type: 'grid-line', size: 30 }],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    gui.add({ type: 'quadratic' }, 'type').disable();

    const options = {
      curveOffset: 30,
      curvePosition: 0.5,
    };
    const optionFolder = gui.addFolder('quadratic.style');
    optionFolder.add(options, 'curveOffset', 0, 100);
    optionFolder.add(options, 'curvePosition', 0, 1);

    optionFolder.onChange(({ property, value }) => {
      graph.updateEdgeData([{ id: 'edge1', style: { [property]: value } }]);
      graph.render();
    });
  },
);
```
