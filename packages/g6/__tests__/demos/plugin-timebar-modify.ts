import { Graph } from '@/src';

export const pluginTimeBarModifyBuildIn: TestCase = async (context) => {
  const startTime = new Date('2023-08-01').getTime();
  const diff = 3600 * 24 * 1000;
  const timebarData = [10, 2, 3, 4, 15, 10, 5, 0, 3, 1].map((value, index) => ({
    time: new Date(startTime + index * diff),
    value,
    label: new Date(startTime + index * diff).toLocaleString(),
  }));
  const graphData = {
    nodes: new Array(49).fill(0).map((_, index) => ({
      id: `node-${index}`,
      data: {
        timestamp: startTime + (index % 10) * diff,
        value: index % 20,
        label: new Date(startTime + (index % 10) * diff).toLocaleString(),
        parentId: index < 2 ? `combo-${index}` : null,
      },
    })),
    edges: new Array(49).fill(0).map((_, i) => ({
      id: `edge-${i}`,
      source: `node-${i % 30}`,
      target: `node-${(i % 20) + 29}`,
      data: {
        edgeType: 'e1',
      },
    })),
    combo: [
      {
        id: 'combo-0',
        data: {
          timestamp: startTime + diff,
          value: 1,
          label: new Date(startTime + diff).toLocaleString(),
        },
      },
      {
        id: 'combo-1',
        data: {
          timestamp: startTime + 3 * diff,
          value: 3,
          label: new Date(startTime + 3 * diff).toLocaleString(),
        },
      },
    ],
  };

  const graph = new Graph({
    ...context,
    data: graphData,
    layout: {
      type: 'grid',
    },
    plugins: [
      {
        type: 'timebar',
        key: 'timebar',
        data: timebarData,
        mode: 'modify',
      },
    ],
  });

  await graph.render();

  return graph;
};
