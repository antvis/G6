```js | ob { pin: false }
createGraph(
  {
    autoFit: 'center',
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
          id: 'edge-0',
          source: 'node-0',
          target: 'node-2',
        },
        {
          id: 'edge-1',
          source: 'node-1',
          target: 'node-2',
        },
        {
          id: 'edge-2',
          source: 'node-2',
          target: 'node-3',
        },
        {
          id: 'edge-3',
          source: 'node-3',
          target: 'node-4',
        },
        {
          id: 'edge-4',
          source: 'node-3',
          target: 'node-5',
        },
        {
          id: 'edge-5',
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
        type: 'bubble-sets',
        key: 'bubble-sets',
        members: ['node-0', 'node-1', 'node-2', 'node-3'],
        labelText: 'bubblesets-a',
        fill: '#7e3feb',
        fillOpacity: 0.1,
        stroke: '#7e3feb',
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
      type: 'bubble-sets',
      members: ['node-0', 'node-1', 'node-2', 'node-3'],
      avoidMembers: [],
      // style
      fill: '#7e3feb',
      fillOpacity: 0.1,
      stroke: '#7e3feb',
      strokeOpacity: 1,
      // label
      label: true,
      labelCloseToPath: true,
      labelAutoRotate: true,
      labelOffsetX: 0,
      labelOffsetY: 0,
      labelPlacement: 'bottom',
      // bubblesets
      maxRoutingIterations: 100,
      maxMarchingIterations: 20,
      pixelGroup: 4,
      edgeR0: 10,
      edgeR1: 20,
      nodeR0: 15,
      nodeR1: 50,
      morphBuffer: 10,
      threshold: 1,
      memberInfluenceFactor: 1,
      edgeInfluenceFactor: 1,
      nonMemberInfluenceFactor: -0.8,
      virtualEdges: true,
    };

    const optionFolder = gui.addFolder('Bubblesets Options');
    optionFolder.add(options, 'type').disable();
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
    optionFolder.add(options, 'maxRoutingIterations', 0, 200, 1);
    optionFolder.add(options, 'maxMarchingIterations', 0, 40, 1);
    optionFolder.add(options, 'pixelGroup', 0, 20, 1);
    optionFolder.add(options, 'edgeR0', 0, 50, 1);
    optionFolder.add(options, 'edgeR1', 0, 50, 1);
    optionFolder.add(options, 'nodeR0', 0, 50, 1);
    optionFolder.add(options, 'nodeR1', 0, 50, 1);
    optionFolder.add(options, 'morphBuffer', 0, 20, 1);
    optionFolder.add(options, 'threshold', -1, 1, 0.1);
    optionFolder.add(options, 'memberInfluenceFactor', -1, 1, 0.1);
    optionFolder.add(options, 'edgeInfluenceFactor', -1, 1, 0.1);
    optionFolder.add(options, 'nonMemberInfluenceFactor', -1, 1, 0.1);
    optionFolder.add(options, 'virtualEdges');

    optionFolder.onChange(({ property, value }) => {
      graph.updatePlugin({
        key: 'bubble-sets',
        [property]: value,
      });
      graph.render();
    });

    const apiConfig = {
      member: 'node-1',
      avoidMember: 'node-1',
    };
    const apiFolder = gui.addFolder('Bubblesets API');
    const instance = graph.getPluginInstance('bubble-sets');
    const nodeIds = graph.getData().nodes.map((node) => node.id);
    const edgeIds = graph.getData().edges.map((edge) => edge.id);
    apiFolder.add(apiConfig, 'member', [...nodeIds, ...edgeIds]);
    apiFolder.add({ addMember: () => instance.addMember(apiConfig.member) }, 'addMember').name('add member');
    apiFolder
      .add({ removeMember: () => instance.removeMember(apiConfig.member) }, 'removeMember')
      .name('remove member');
    apiFolder
      .add({ removeMember: () => alert('Members in Bubblesets: ' + instance.getMember()) }, 'removeMember')
      .name('get member');
    apiFolder.add(apiConfig, 'avoidMember', nodeIds);
    apiFolder
      .add({ addAvoidMember: () => instance.addAvoidMember(apiConfig.avoidMember) }, 'addAvoidMember')
      .name('add avoid member');
    apiFolder
      .add({ removeAvoidMember: () => instance.removeAvoidMember(apiConfig.avoidMember) }, 'removeAvoidMember')
      .name('remove avoid member');
    apiFolder
      .add({ removeMember: () => alert('Avoid members in Bubblesets: ' + instance.getAvoidMember()) }, 'removeMember')
      .name('get avoid member');
  },
);
```
