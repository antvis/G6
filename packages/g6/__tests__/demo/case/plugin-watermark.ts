import { Graph } from '@/src';
import data from '@@/dataset/cluster.json';
import type { STDTestCase } from '../types';

export const pluginWatermark: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoResize: true,
    data,
    layout: { type: 'd3force' },
    plugins: [{ type: 'watermark', text: 'hello, \na watermark.', fontSize: 36 }],
  });

  await graph.render();

  pluginWatermark.form = (panel) => {
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
