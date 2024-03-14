import { Graph } from '@/src';
import data from '@@/dataset/gene.json';
import type { STDTestCase } from '../types';

export const layoutConcentric: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoFit: 'center',
    data,
    behaviors: ['zoom-canvas', 'drag-canvas', 'drag-node'],
    layout: {
      type: 'concentric',
      maxLevelDiff: 0.5,
      preventOverlap: true,
    },
    node: {
      style: {
        size: 5,
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
    animation: false,
  });

  await graph.render();

  layoutConcentric.form = () => {
    return [];
  };
  return graph;
};
