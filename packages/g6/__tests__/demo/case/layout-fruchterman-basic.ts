import { Graph } from '@/src';
import data from '@@/dataset/cluster.json';
import type { STDTestCase } from '../types';

export const layoutFruchtermanBasic: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    behaviors: ['drag-canvas', 'drag-node'],
    layout: {
      type: 'fruchterman',
      gravity: 5,
      speed: 5,
    },
    node: {
      style: {
        size: 30,
        stroke: '#5B8FF9',
        fill: '#C6E5FF',
        lineWidth: 1,
        labelPlacement: 'center',
        labelText: (d: any) => d.id,
        labelBackground: false,
      },
    },
  });

  await graph.render();

  layoutFruchtermanBasic.form = () => {
    return [];
  };

  return graph;
};
