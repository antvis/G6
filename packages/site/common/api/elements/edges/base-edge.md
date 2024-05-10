```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        { id: 'node1', style: { x: 150, y: 250 } },
        { id: 'node2', style: { x: 400, y: 250 } },
      ],
      edges: [{ id: 'edge1', source: 'node1', target: 'node2', style: { labelText: 'node1 👉 node2' } }],
    },
    node: { style: { labelText: (d) => d.id } },
    behaviors: ['drag-canvas', 'drag-element'],
    plugins: ['grid-line'],
  },
  { width: 600, height: 500 },
  (gui, graph) => {
    const options = {
      lineWidth: 1,
      opacity: 1,
      stroke: '#99add1',

      startArrow: false,
      startArrowSize: 8,
      startArrowType: 'triangle',

      endArrow: false,
      endArrowSize: 8,
      endArrowType: 'triangle',

      label: true,
      labelAutoRotate: true,
      labelMaxWidth: '80%',
      labelOffsetX: 0,
      labelOffsetY: 0,
      labelPadding: 0,
      labelPlacement: 'center',
      labelText: 'node1 👉 node2',

      labelBackground: false,
      labelBackgroundFill: '#fff',
      labelBackgroundStroke: '#fff',
      labelBackgroundLineDash: 0,
      labelBackgroundLineWidth: 0,
      labelBackgroundOpacity: 0.5,
      labelBackgroundRadius: 0,

      halo: false,
      haloLineDash: 0,
      haloLineWidth: 12,
      haloStrokeOpacity: 0.25,
    };
    const optionFolder = gui.addFolder('edge.style');

    optionFolder.add(options, 'lineWidth', 0, 20);
    optionFolder.add(options, 'opacity', 0, 1);
    optionFolder.addColor(options, 'stroke');

    // startArrow
    optionFolder.add(options, 'startArrow').onChange((v) => {
      startArrowSize.show(v);
      startArrowType.show(v);
    });
    const startArrowSize = optionFolder.add(options, 'startArrowSize', 0, 20).hide();
    const startArrowType = optionFolder
      .add(options, 'startArrowType', ['triangle', 'circle', 'diamond', 'vee', 'rect', 'triangleRect', 'simple'])
      .hide();

    // endArrow
    optionFolder.add(options, 'endArrow').onChange((v) => {
      endArrowSize.show(v);
      endArrowType.show(v);
    });
    const endArrowSize = optionFolder.add(options, 'endArrowSize', 0, 20).hide();
    const endArrowType = optionFolder
      .add(options, 'endArrowType', ['triangle', 'circle', 'diamond', 'vee', 'rect', 'triangleRect', 'simple'])
      .hide();

    // label
    optionFolder.add(options, 'label').onChange((v) => {
      [labelAutoRotate, labelMaxWidth, labelOffsetX, labelOffsetY, labelPadding, labelPlacement, labelText].forEach(
        (i) => i.show(v),
      );
    });
    const labelAutoRotate = optionFolder.add(options, 'labelAutoRotate');
    const labelMaxWidth = optionFolder.add(options, 'labelMaxWidth', ['80%', '20px', '200%']);
    const labelOffsetX = optionFolder.add(options, 'labelOffsetX', 0, 50);
    const labelOffsetY = optionFolder.add(options, 'labelOffsetY', 0, 50);
    const labelPadding = optionFolder.add(options, 'labelPadding', 0, 20);
    const labelPlacement = optionFolder.add(options, 'labelPlacement', ['start', 'center', 'end', 0.2, 0.8]);
    const labelText = optionFolder.add(options, 'labelText');

    const labelBackground = optionFolder.add(options, 'labelBackground').onChange((v) => {
      [
        labelBackgroundFill,
        labelBackgroundStroke,
        labelBackgroundLineDash,
        labelBackgroundLineWidth,
        labelBackgroundOpacity,
        labelBackgroundRadius,
      ].forEach((i) => i.show(v));
    });
    const labelBackgroundFill = optionFolder.addColor(options, 'labelBackgroundFill').hide();
    const labelBackgroundStroke = optionFolder.addColor(options, 'labelBackgroundStroke').hide();
    const labelBackgroundLineDash = optionFolder.add(options, 'labelBackgroundLineDash', 0, 10).hide();
    const labelBackgroundLineWidth = optionFolder.add(options, 'labelBackgroundLineWidth', 0, 10).hide();
    const labelBackgroundOpacity = optionFolder.add(options, 'labelBackgroundOpacity', 0, 1).hide();
    const labelBackgroundRadius = optionFolder.add(options, 'labelBackgroundRadius', 0, 30).hide();

    const halo = optionFolder.add(options, 'halo').onChange((v) => {
      [haloStrokeOpacity, haloLineDash, haloLineWidth].forEach((i) => i.show(v));
    });
    const haloStrokeOpacity = optionFolder.addColor(options, 'haloStrokeOpacity', 0, 1).hide();
    const haloLineDash = optionFolder.add(options, 'haloLineDash', 0, 10).hide();
    const haloLineWidth = optionFolder.add(options, 'haloLineWidth', 0, 10).hide();

    optionFolder.onChange(({ property, value }) => {
      graph.updateEdgeData([{ id: 'edge1', style: { [property]: value } }]);
      graph.render();
    });
  },
);
```
