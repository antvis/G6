import { Graph } from '@/src';
import data from '@@/dataset/relations.json';
import type { STDTestCase } from '../types';

export const layoutFruchtermanFix: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    behaviors: ['drag-canvas', 'drag-node'],
    layout: {
      type: 'fruchterman',
      speed: 10,
      maxIteration: 500,
    },
    node: {
      style: {
        size: 15,
        stroke: '#5B8FF9',
        fill: '#C6E5FF',
        lineWidth: 1,
      },
    },
    edge: {
      style: {
        stroke: '#E2E2E2',
      },
    },
  });

  graph.on('node:dragstart', function () {
    graph.stopLayout();
  });

  graph.on('node:dragend', function () {
    // FIXME: 不应该完全重新布局，而是以当前画布数据进行布局
    graph.layout();
  });

  await graph.render();

  layoutFruchtermanFix.form = () => {
    return [];
  };

  return graph;
};
