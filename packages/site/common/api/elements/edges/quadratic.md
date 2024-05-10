```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        { id: 'node1', style: { x: 150, y: 150 } },
        { id: 'node2', style: { x: 350, y: 150 } },
      ],
      edges: [{ id: 'edge1', source: 'node1', target: 'node2' }],
    },
    edge: { type: 'quadratic' },
    behaviors: ['drag-canvas', 'drag-element'],
    plugins: ['grid-line'],
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
