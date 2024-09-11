import data from '@@/dataset/flare.json';
import { Graph, treeToGraphData } from '@antv/g6';

export const caseRadialDendrogram: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoFit: 'view',
    data: treeToGraphData(data),
    node: {
      style: {
        size: 14,
        labelText: (d) => d.id,
        labelBackground: true,
      },
      state: {
        active: {
          fill: '#00C9C9',
        },
      },
    },
    edge: {
      type: 'cubic-radial',
      style: {
        lineWidth: 2,
      },
      state: {
        active: {
          stroke: '#009999',
        },
      },
    },
    layout: [
      {
        type: 'dendrogram',
        radial: true,
        nodeSep: 30,
        rankSep: 200,
      },
    ],
    behaviors: [
      'drag-canvas',
      'zoom-canvas',
      'drag-element',
      {
        key: 'hover-activate',
        type: 'hover-activate',
        degree: 5,
        direction: 'in',
        inactiveState: 'inactive',
      },
    ],
    transforms: ['place-radial-labels'],
  });

  await graph.render();

  return graph;
};
