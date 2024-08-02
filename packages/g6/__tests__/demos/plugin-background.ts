import data from '@@/dataset/cluster.json';
import { Graph } from '@antv/g6';

export const pluginBackground: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoResize: true,
    data,
    layout: { type: 'd3-force' },
    behaviors: ['drag-canvas', 'drag-element'],
    plugins: [
      {
        type: 'background',
        key: 'background',
        backgroundImage:
          'url(https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*0Qq0ToQm1rEAAAAAAAAAAAAADmJ7AQ/original)',
      },
    ],
  });

  await graph.render();

  pluginBackground.form = (panel) => {
    const config = {
      backgroundSize: 'cover',
    };
    return [
      panel
        .add(config, 'backgroundSize', {
          Cover: 'cover',
          Contain: 'contain',
        })
        .name('backgroundSize')
        .onChange((backgroundSize: string) => {
          graph.updatePlugin({
            key: 'background',
            backgroundSize,
          });
        }),
    ];
  };

  return graph;
};
