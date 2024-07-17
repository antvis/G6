import { Graph } from '@/src';
import data from '@@/dataset/cluster.json';

export const behaviorOptimizeCanvas: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    layout: {
      type: 'd3-force',
    },
    node: {
      style: {
        iconSrc: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
        labelFontSize: 8,
        labelText: (datum) => datum.id,
        size: 20,
      },
    },
    edge: {
      style: {
        labelFontSize: 8,
        labelText: (datum) => datum.id,
      },
    },
    behaviors: ['drag-canvas', 'zoom-canvas', 'scroll-canvas', 'optimize-canvas'],
  });

  await graph.render();

  return graph;
};
