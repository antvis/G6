import { Graph } from '@antv/g6';

export const transformMapNodeSize: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [{ id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }, { id: 'node-4' }, { id: 'node-5' }],
      edges: [
        { source: 'node-1', target: 'node-2' },
        { source: 'node-1', target: 'node-3' },
        { source: 'node-1', target: 'node-4' },
        { source: 'node-4', target: 'node-5' },
      ],
    },
    node: {
      style: {
        labelText: (d) => d.id,
      },
    },
    layout: {
      type: 'grid',
    },
    transforms: [
      {
        key: 'map-node-size',
        type: 'map-node-size',
        scale: 'log',
      },
    ],
    animation: false,
  });

  await graph.render();

  const config = { 'centrality.type': 'degree', mapLabelSize: false };

  transformMapNodeSize.form = (panel) => [
    panel
      .add(config, 'centrality.type', ['degree', 'betweenness', 'closeness', 'eigenvector', 'pagerank'])
      .name('Centrality Type')
      .onChange((type: string) => {
        graph.updateTransform({ key: 'map-node-size', centrality: { type } });
        graph.draw();
      }),
    panel
      .add(config, 'mapLabelSize')
      .name('Sync To Label Size')
      .onChange((mapLabelSize: boolean) => {
        graph.updateTransform({ key: 'map-node-size', mapLabelSize });
        graph.draw();
      }),
  ];

  return graph;
};
