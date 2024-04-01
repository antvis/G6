import { Graph, register } from '@/src';
import data from '@@/dataset/cluster.json';
import { Minimap } from '../../../src/plugins';
import type { STDTestCase } from '../types';

export const pluginMinimap: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoResize: true,
    data,
    layout: { type: 'd3force' },
    behaviors: ['drag-canvas'],
    plugins: [{ type: 'minimap', mode: 'delegate' }],
  });
  register('plugin', 'minimap', Minimap);

  await graph.render();
  return graph;
};

pluginMinimap.form = () => [];
