import data from '@@/dataset/cluster.json';
import type { DisplayObject } from '@antv/g';
import type { ElementType } from '@antv/g6';
import { Graph } from '@antv/g6';

export const behaviorOptimizeViewportTransform: TestCase = async (context) => {
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
        startArrow: true,
      },
    },
    behaviors: [
      'drag-canvas',
      'zoom-canvas',
      'scroll-canvas',
      {
        key: 'optimize-viewport-transform',
        type: 'optimize-viewport-transform',
        shapes: (type: ElementType, shape: DisplayObject) => type === 'node' && shape.className === 'key',
      },
    ],
    animation: false,
  });

  await graph.render();

  return graph;
};
