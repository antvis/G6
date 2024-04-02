import { Graph } from '@/src';
import data from '@@/dataset/gene.json';

export const layoutConcentric: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoFit: 'view',
    data,
    layout: {
      type: 'concentric',
      maxLevelDiff: 0.5,
      preventOverlap: true,
    },
    behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
    animation: false,
  });

  await graph.render();

  return graph;
};
