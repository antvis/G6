```js | ob { pin: false }
createGraph(
  {
    autoFit: 'view',
    data: {
      nodes: [
        { id: '0' },
        { id: '1' },
        { id: '2' },
        { id: '3' },
        { id: '4' },
        { id: '5' },
        { id: '6' },
        { id: '7' },
        { id: '8' },
        { id: '9' },
        { id: '10' },
        { id: '11' },
        { id: '12' },
        { id: '13' },
        { id: '14' },
        { id: '15' },
        { id: '16' },
        { id: '17' },
        { id: '18' },
        { id: '19' },
        { id: '20' },
        { id: '21' },
        { id: '22' },
        { id: '23' },
        { id: '24' },
        { id: '25' },
        { id: '26' },
        { id: '27' },
        { id: '28' },
        { id: '29' },
        { id: '30' },
        { id: '31' },
        { id: '32' },
        { id: '33' },
      ],
      edges: [
        { source: '0', target: '1' },
        { source: '0', target: '2' },
        { source: '0', target: '3' },
        { source: '0', target: '4' },
        { source: '0', target: '5' },
        { source: '0', target: '7' },
        { source: '0', target: '8' },
        { source: '0', target: '9' },
        { source: '0', target: '10' },
        { source: '0', target: '11' },
        { source: '0', target: '13' },
        { source: '0', target: '14' },
        { source: '0', target: '15' },
        { source: '0', target: '16' },
        { source: '2', target: '3' },
        { source: '4', target: '5' },
        { source: '4', target: '6' },
        { source: '5', target: '6' },
        { source: '7', target: '13' },
        { source: '8', target: '14' },
        { source: '10', target: '22' },
        { source: '10', target: '14' },
        { source: '10', target: '12' },
        { source: '10', target: '24' },
        { source: '10', target: '21' },
        { source: '10', target: '20' },
        { source: '11', target: '24' },
        { source: '11', target: '22' },
        { source: '11', target: '14' },
        { source: '12', target: '13' },
        { source: '16', target: '17' },
        { source: '16', target: '18' },
        { source: '16', target: '21' },
        { source: '16', target: '22' },
        { source: '17', target: '18' },
        { source: '17', target: '20' },
        { source: '18', target: '19' },
        { source: '19', target: '20' },
        { source: '19', target: '33' },
        { source: '19', target: '22' },
        { source: '19', target: '23' },
        { source: '20', target: '21' },
        { source: '21', target: '22' },
        { source: '22', target: '24' },
        { source: '22', target: '26' },
        { source: '22', target: '23' },
        { source: '22', target: '28' },
        { source: '22', target: '30' },
        { source: '22', target: '31' },
        { source: '22', target: '32' },
        { source: '22', target: '33' },
        { source: '23', target: '28' },
        { source: '23', target: '27' },
        { source: '23', target: '29' },
        { source: '23', target: '30' },
        { source: '23', target: '31' },
        { source: '23', target: '33' },
        { source: '32', target: '33' },
      ],
    },
    node: {
      style: {
        labelFill: '#fff',
        labelPlacement: 'center',
        labelText: (d) => d.id,
      },
    },
    layout: {
      type: 'radial',
      nodeSize: 32,
      unitRadius: 100,
      linkDistance: 200,
    },
    behaviors: ['drag-canvas', 'drag-element'],
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    const options = {
      nodeSize: 32,
      unitRadius: 100,
      linkDistance: 200,
      preventOverlap: false,
      strictRadial: true,
      sortBy: undefined,
      sortStrength: 10,
    };
    const optionFolder = gui.addFolder('Radial Layout Options');
    optionFolder.add(options, 'nodeSize', 1, 100, 1);
    optionFolder.add(options, 'unitRadius', 10, 300, 1);
    optionFolder.add(options, 'linkDistance', 10, 400, 1);
    optionFolder.add(options, 'preventOverlap');
    optionFolder.add(options, 'strictRadial');
    optionFolder.add(options, 'sortStrength', 1, 100, 1);
    optionFolder.add(options, 'sortBy', [undefined, 'data', 'id']);
    optionFolder.onChange(async ({ property, value }) => {
      graph.setLayout(
        Object.assign({}, graph.getLayout(), {
          [property]: value,
        }),
      );
      await graph.layout();
      graph.fitView();
    });
  },
);
```
