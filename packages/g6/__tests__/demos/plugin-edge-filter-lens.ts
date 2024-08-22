import data from '@@/dataset/relations.json';
import { Graph } from '@antv/g6';

export const pluginEdgeFilterLens: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    node: {
      style: { size: 22 },
      palette: {
        field: (datum) => Math.floor((datum.style?.y as number) / 50),
      },
    },
    edge: {
      style: {
        label: false,
        labelText: (d) => d.value?.toString(),
        stroke: '#ccc',
      },
    },
    plugins: [
      {
        key: 'edge-filter-lens',
        type: 'edge-filter-lens',
      },
    ],
    autoFit: 'view',
  });

  await graph.render();

  return graph;
};
