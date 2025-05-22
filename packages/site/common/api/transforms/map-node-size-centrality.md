```js | ob { pin: false }
createGraph(
  {
    autoFit: 'center',
    data: {
      nodes: [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }, { id: 'node4' }, { id: 'node5' }],
      edges: [
        { source: 'node1', target: 'node2' },
        { source: 'node2', target: 'node3' },
        { source: 'node3', target: 'node4' },
        { source: 'node4', target: 'node5' },
        { source: 'node1', target: 'node4' },
        { source: 'node1', target: 'node3' },
      ],
    },
    node: {
      type: 'circle',
      style: {
        labelText: (d) => d.id + ' - ' + d.style.size[0].toFixed(0),
      },
    },
    layout: {
      type: 'circular',
      radius: 180,
    },
    behaviors: ['drag-canvas'],
    transforms: [
      {
        key: 'map-node-size',
        type: 'map-node-size',
        centrality: {
          type: 'pagerank',
        },
      },
    ],
  },
  { width: 600, height: 460 },
  (gui, graph) => {
    const options = {
      type: 'degree',
    };
    const optionFolder = gui.addFolder('Centrality Options');
    optionFolder.add(options, 'type', ['degree', 'betweenness', 'closeness', 'eigenvector', 'pagerank']);
    optionFolder.onChange(async ({ property, value }) => {
      graph.updateTransform({
        key: 'map-node-size',
        centrality: {
          [property]: value,
        },
      });
      graph.render();
    });
  },
);
```
