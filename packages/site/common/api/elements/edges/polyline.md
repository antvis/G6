```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        {
          id: 'node1',
          style: { x: 150, y: 150 },
        },
        {
          id: 'node2',
          style: {
            x: 400,
            y: 150,
            labelText: 'Drag Me!',
            labelPadding: [1, 5],
            labelBackground: true,
            labelBackgroundRadius: 10,
            labelBackgroundFill: '#99add1',
          },
        },
      ],
      edges: [
        {
          id: 'edge1',
          source: 'node1',
          target: 'node2',
          text: 'polyline',
        },
      ],
    },
    node: {
      style: {
        fill: '#f8f8f8',
        stroke: '#8b9baf',
        lineWidth: 1,
      },
    },
    edge: {
      type: 'polyline',
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
        router: { type: 'orth' },
      },
    },
    behaviors: ['drag-canvas', 'drag-element'],
    plugins: [{ type: 'grid-line', size: 30 }],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    gui.add({ type: 'polyline' }, 'type').disable();

    let index = 3;
    const options = {
      radius: 0,
      router: {
        type: 'orth',
      },
      random: () => {
        const x = Math.floor(Math.random() * 600);
        const y = Math.floor(Math.random() * 300);
        graph.addNodeData([
          {
            id: `node-${index}`,
            style: {
              size: 5,
              fill: '#7e3feb',
              x,
              y,
            },
          },
        ]);
        index++;
        graph.updateEdgeData((prev) => {
          const targetEdgeData = prev.find((edge) => edge.id === 'edge1');
          const controlPoints = [...(targetEdgeData.style.controlPoints || [])];
          controlPoints.push([x, y]);
          return [{ ...targetEdgeData, style: { ...targetEdgeData.style, controlPoints } }];
        });
        graph.render();
      },
    };
    const optionFolder = gui.addFolder('polyline.style');
    optionFolder.add(options, 'radius', 0, 100, 1);
    optionFolder.add(options, 'router');
    optionFolder.add(options, 'random').name('Add random node as control points');

    optionFolder.onChange(({ property, value }) => {
      if (property === 'random') return;
      graph.updateEdgeData([{ id: 'edge1', style: { [property]: value } }]);
      graph.render();
    });
  },
);
```

设置 `edge.type` 为 `polyline` 以使用折线。
