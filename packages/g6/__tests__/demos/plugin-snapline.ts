import { Graph } from '@antv/g6';

export const pluginSnapline: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: 'node1', style: { x: 100, y: 100 } },
        { id: 'node2', style: { x: 300, y: 300 } },
        { id: 'node3', style: { x: 120, y: 200 } },
      ],
    },
    node: {
      type: (datum) => (datum.id === 'node3' ? 'circle' : 'rect'),
      style: {
        size: (datum) => (datum.id === 'node3' ? 40 : [60, 30]),
        fill: 'transparent',
        lineWidth: 2,
        labelText: (datum) => datum.id,
      },
    },
    behaviors: ['drag-element'],
    plugins: [
      {
        type: 'snapline',
        key: 'snapline',
        verticalLineStyle: { stroke: '#F08F56', lineWidth: 2 },
        horizontalLineStyle: { stroke: '#17C76F', lineWidth: 2 },
        auto: false,
      },
    ],
  });

  await graph.render();

  const config = {
    filter: false,
    offset: 20,
  };

  pluginSnapline.form = (panel) => {
    return [
      panel
        .add(config, 'filter')
        .name('Add Filter(exclude circle)')
        .onChange((filter: boolean) => {
          graph.updatePlugin({
            key: 'snapline',
            filter: (nodeId: string) => (filter ? nodeId !== 'node3' : true),
          });
          graph.render();
        }),
      panel
        .add(config, 'offset', [0, 20, Infinity])
        .name('Offset')
        .onChange((offset: string) => {
          graph.updatePlugin({
            key: 'snapline',
            offset,
          });
          graph.render();
        }),
    ];
  };
  return graph;
};
