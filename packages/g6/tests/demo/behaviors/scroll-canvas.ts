import { extend, Extensions, Graph } from '../../../src/index';
import { TestCaseContext } from '../interface';

export default (context: TestCaseContext) => {
  const ExtGraph = extend(Graph, {
    behaviors: {
      'scroll-canvas': Extensions.ScrollCanvas,
    },
  });
  return new ExtGraph({
    ...context,
    type: 'graph',
    layout: {
      type: 'grid',
    },
    node: {
      labelShape: {
        text: {
          fields: ['id'],
          formatter: (model) => model.id,
        },
      },
    },
    data: {
      nodes: [
        { id: 'node1', data: {} },
        { id: 'node2', data: {} },
        { id: 'node3', data: {} },
        { id: 'node4', data: {} },
        { id: 'node5', data: {} },
      ],
      edges: [
        { id: 'edge1', source: 'node1', target: 'node2', data: {} },
        { id: 'edge2', source: 'node1', target: 'node3', data: {} },
        { id: 'edge3', source: 'node1', target: 'node4', data: {} },
        { id: 'edge4', source: 'node2', target: 'node3', data: {} },
        { id: 'edge5', source: 'node3', target: 'node4', data: {} },
        { id: 'edge6', source: 'node4', target: 'node5', data: {} },
      ],
    },
    modes: {
      default: [
        {
          type: 'scroll-canvas',
          enableOptimize: true,
          zoomRatio: 0.2,
          // scalableRange: 0.5,
          // direction: 'y',
          // optimizeZoom: 0.5,
        },
      ],
    },
  });
};
