import { idOf } from '@/src/utils/id';
import { Graph } from '@antv/g6';

export const elementPort: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: 'node-1', style: { x: 80, y: 200 } },
        { id: 'node-2', style: { x: 250, y: 200 } },
      ],
      edges: [
        {
          id: 'edge-1',
          source: 'node-1',
          target: 'node-2',
        },
        {
          id: 'edge-2',
          source: 'node-1',
          target: 'node-2',
        },
        { id: 'edge-3', source: 'node-1', target: 'node-2' },
      ],
    },
    node: {
      type: (d) => (d.id === 'node-1' ? 'circle' : 'rect'),
      style: {
        size: (d) => (d.id === 'node-1' ? 30 : [50, 150]),
        port: true,
        ports: (d) =>
          d.id === 'node-2'
            ? [
                { key: 'port-1', placement: [0, 0.15] },
                { key: 'port-2', placement: 'left' },
                { key: 'port-3', placement: [0, 0.85] },
              ]
            : [],
      },
    },
    edge: {
      style: {
        endArrow: true,
        targetPort: (d) => `port-${idOf(d).toString().split('-')[1]}`,
      },
    },
  });

  await graph.render();

  const config = {
    showPort: false,
    linkToCenter: false,
  };

  elementPort.form = (panel) => {
    const updatePort = (attr: string, value: any) => {
      graph.updateNodeData((prev) => {
        const node2Data = prev.find((node: any) => node.id === 'node-2')!;
        return [
          ...prev.filter((node: any) => node.id !== 'node-2'),
          {
            ...node2Data,
            style: {
              ...node2Data!.style,
              [attr]: value,
            },
          },
        ];
      });
    };
    return [
      panel.add(config, 'showPort').onChange((showPort: boolean) => {
        updatePort('portR', showPort ? 3 : 0);
        graph.draw();
      }),
      panel.add(config, 'linkToCenter').onChange((linkToCenter: boolean) => {
        updatePort('portLinkToCenter', linkToCenter);
        graph.draw();
      }),
    ];
  };

  return graph;
};
