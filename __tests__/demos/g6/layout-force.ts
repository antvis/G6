import data from '@@/dataset/force.json';
import { Graph } from '@antv/g6';

export const layoutForce: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    padding: 20,
    autoFit: 'view',
    behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element', 'click-select'],
    layout: {
      type: 'force',
    },
    node: {
      style: {
        labelText: (d) => d.id,
        labelMaxWidth: '300%',
      },
      palette: {
        type: 'group',
        field: 'cluster',
        color: [
          '#1783FF',
          '#00C9C9',
          '#F08F56',
          '#D580FF',
          '#7863FF',
          '#DB9D0D',
          '#60C42D',
          '#FF80CA',
          '#2491B3',
          '#17C76F',
        ],
      },
    },
  });

  await graph.render();

  return graph;
};
