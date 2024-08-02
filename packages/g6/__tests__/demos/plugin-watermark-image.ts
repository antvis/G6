import data from '@@/dataset/cluster.json';
import { Graph } from '@antv/g6';

export const pluginWatermarkImage: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoResize: true,
    data,
    layout: { type: 'd3-force' },
    plugins: [
      {
        type: 'watermark',
        width: 100,
        height: 100,
        imageURL: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7svFR6wkPMoAAAAAAAAAAAAADmJ7AQ/original',
      },
    ],
  });

  await graph.render();

  pluginWatermarkImage.form = (panel) => {
    const config = {
      width: 200,
      height: 100,
      fontSize: 20,
      textFill: 'red',
    };
    return [
      panel
        .add(config, 'width', 150, 400, 10)
        .name('Width')
        .onChange(() => {}),
      panel
        .add(config, 'height', 100, 200, 10)
        .name('Width')
        .onChange(() => {}),
      panel
        .add(config, 'fontSize', 10, 32, 1)
        .name('FontSize')
        .onChange(() => {}),
    ];
  };

  return graph;
};
