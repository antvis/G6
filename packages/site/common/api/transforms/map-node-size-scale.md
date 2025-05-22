```js | ob { pin: false }
createGraph(
  {
    autoFit: 'center',
    data: {
      nodes: [
        { id: 'node1' },
        { id: 'node2' },
        { id: 'node3' },
        { id: 'node4' },
        { id: 'node5' },
        { id: 'node6' },
        { id: 'node7' },
      ],
      edges: [
        { source: 'node1', target: 'node2' },
        { source: 'node1', target: 'node3' },
        { source: 'node1', target: 'node4' },
        { source: 'node2', target: 'node5' },
        { source: 'node3', target: 'node6' },
        { source: 'node4', target: 'node7' },
      ],
    },
    node: {
      type: 'circle',
      style: {
        labelText: (d) => d.id + ' - ' + d.style.size[0].toFixed(0),
      },
    },
    layout: {
      type: 'antv-dagre',
    },
    behaviors: ['drag-canvas'],
    transforms: [
      {
        key: 'map-node-size',
        type: 'map-node-size',
        centrality: {
          type: 'degree',
        },
        scale: 'log',
      },
    ],
  },
  { width: 600, height: 400 },
  (gui, graph) => {
    const options = {
      scale: 'log',
    };
    const optionFolder = gui.addFolder('MapNodeSize Options');
    optionFolder.add(options, 'scale', ['log', 'linear', 'pow', 'sqrt']);
    optionFolder.onChange(async ({ property, value }) => {
      graph.updateTransform({
        key: 'map-node-size',
        [property]: value,
      });
      graph.render();
    });
  },
);
```
