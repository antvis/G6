import { Graph } from '@antv/g6';

export const elementEdgePolylineAnimation: TestCase = async (context) => {
  const data = {
    nodes: [
      { id: 'node-1', style: { x: 200, y: 200 } },
      { id: 'node-2', style: { x: 350, y: 120 } },
    ],
    edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
  };

  const graph = new Graph({
    ...context,
    data,
    edge: {
      type: 'polyline',
    },
    behaviors: [{ type: 'drag-element' }],
  });

  await graph.render();

  elementEdgePolylineAnimation.form = (panel) => {
    const config = {
      radius: 0,
      enableRouter: false,
      controlPoints: false,
    };
    const updateEdgeStyle = (id: string, attr: string, value: any) => {
      graph.updateEdgeData((prev) => {
        const edgeData = prev.find((edge: any) => edge.id === id)!;
        return [
          ...prev.filter((edge: any) => edge.id !== id),
          {
            ...edgeData,
            style: {
              ...edgeData?.style,
              [attr]: value,
            },
          },
        ];
      });
      graph.render();
    };
    return [
      panel.add(config, 'radius', 0, 100, 1).onChange((val: number) => {
        updateEdgeStyle('edge-1', 'radius', val);
      }),
      panel.add(config, 'enableRouter').onChange((val: boolean) => {
        updateEdgeStyle('edge-1', 'router', val);
      }),
      panel.add(config, 'controlPoints').onChange((val: boolean) => {
        updateEdgeStyle('edge-1', 'controlPoints', val ? [[300, 190]] : []);
      }),
    ];
  };

  return graph;
};
