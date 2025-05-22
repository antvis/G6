```js | ob { pin: false }
createGraph(
  {
    data: {
      nodes: [
        {
          id: 'node-0',
          data: { cluster: 'a' },
          style: { x: 555, y: 151 },
        },
        {
          id: 'node-1',
          data: { cluster: 'a' },
          style: { x: 532, y: 323 },
        },
        {
          id: 'node-2',
          data: { cluster: 'a' },
          style: { x: 473, y: 227 },
        },
        {
          id: 'node-3',
          data: { cluster: 'a' },
          style: { x: 349, y: 212 },
        },
        {
          id: 'node-4',
          data: { cluster: 'b' },
          style: { x: 234, y: 201 },
        },
        {
          id: 'node-5',
          data: { cluster: 'b' },
          style: { x: 338, y: 333 },
        },
        {
          id: 'node-6',
          data: { cluster: 'b' },
          style: { x: 365, y: 91 },
        },
      ],
      edges: [
        {
          source: 'node-0',
          target: 'node-2',
        },
        {
          source: 'node-1',
          target: 'node-2',
        },
        {
          source: 'node-2',
          target: 'node-3',
        },
        {
          source: 'node-3',
          target: 'node-4',
        },
        {
          source: 'node-3',
          target: 'node-5',
        },
        {
          source: 'node-3',
          target: 'node-6',
        },
      ],
    },
    node: {
      style: { labelText: (d) => d.id },
      palette: { field: 'cluster', color: ['#7e3feb', '#ffa940'] },
    },
    behaviors: ['drag-canvas', 'drag-element'],
    plugins: [
      'grid-line',
      {
        type: 'hull',
        key: 'hull-a',
        members: ['node-0', 'node-1', 'node-2', 'node-3'],
        labelText: 'hull-a',
        fill: '#7e3feb',
        stroke: '#7e3feb',
        fillOpacity: 0.1,
        strokeOpacity: 1,
        labelFill: '#fff',
        labelPadding: 2,
        labelBackgroundFill: '#7e3feb',
        labelBackgroundRadius: 5,
      },
    ],
  },
  { width: 600, height: 450 },
  (gui, graph) => {
    const options = {
      type: 'hull',
      members: ['node-0', 'node-1', 'node-2', 'node-3'],
      concavity: Infinity,
      corner: 'rounded',
      padding: 10,
      // style
      fill: '#7e3feb',
      stroke: '#7e3feb',
      fillOpacity: 0.1,
      strokeOpacity: 1,
      // label
      label: true,
      labelCloseToPath: true,
      labelAutoRotate: true,
      labelOffsetX: 0,
      labelOffsetY: 0,
      labelPlacement: 'bottom',
    };

    const optionFolder = gui.addFolder('Hull Options');
    optionFolder.add(options, 'type').disable();
    optionFolder.add(options, 'concavity', 0, 200, 1);
    optionFolder.add(options, 'corner', ['rounded', 'smooth', 'sharp']);
    optionFolder.add(options, 'padding', 0, 20, 1);
    optionFolder.addColor(options, 'fill');
    optionFolder.addColor(options, 'stroke');
    optionFolder.add(options, 'fillOpacity', 0, 1, 0.1);
    optionFolder.add(options, 'strokeOpacity', 0, 1, 0.1);
    optionFolder.add(options, 'label');
    optionFolder.add(options, 'labelCloseToPath');
    optionFolder.add(options, 'labelAutoRotate');
    optionFolder.add(options, 'labelOffsetX', 0, 20, 1);
    optionFolder.add(options, 'labelOffsetY', 0, 20, 1);
    optionFolder.add(options, 'labelPlacement', ['left', 'right', 'top', 'bottom', 'center']);

    optionFolder.onChange(({ property, value }) => {
      graph.updatePlugin({
        key: 'hull-a',
        [property]: value,
      });
      graph.render();
    });

    const apiConfig = {
      member: 'node-1',
    };
    const apiFolder = gui.addFolder('Hull API');
    const instance = graph.getPluginInstance('hull-a');
    apiFolder.add(
      apiConfig,
      'member',
      new Array(7).fill(0).map((_, index) => `node-${index}`),
    );
    apiFolder.add({ addMember: () => instance.addMember(apiConfig.member) }, 'addMember').name('add member');
    apiFolder
      .add({ removeMember: () => instance.removeMember(apiConfig.member) }, 'removeMember')
      .name('remove member');
    apiFolder
      .add({ removeMember: () => alert('Members in Hull-a: ' + instance.getMember()) }, 'removeMember')
      .name('get member');
  },
);
```
