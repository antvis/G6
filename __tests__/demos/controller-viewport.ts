import { Graph } from '@antv/g6';

export const controllerViewport: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: 'node-1', style: { x: 200, y: 200 } },
        { id: 'node-2', style: { x: 300, y: 300 } },
      ],
      edges: [{ source: 'node-1', target: 'node-2' }],
    },
  });

  await graph.render();

  controllerViewport.form = (panel) => {
    const animation = { duration: 500 };
    const config = {
      translateBy: () => graph.translateBy([10, 10], animation),
      translateTo: () => graph.translateTo([0, 0], animation),
      rotateBy: () => graph.rotateBy(45, animation),
      rotateTo: () => graph.rotateTo(0, animation),
      zoomBy: () => graph.zoomBy(1.1, animation),
      zoomTo: () => graph.zoomTo(1, animation),
    };
    return [
      panel.add(config, 'translateBy'),
      panel.add(config, 'translateTo'),
      panel.add(config, 'rotateBy'),
      panel.add(config, 'rotateTo'),
      panel.add(config, 'zoomBy'),
      panel.add(config, 'zoomTo'),
    ];
  };

  return graph;
};
