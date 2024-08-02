import { Graph } from '@antv/g6';

export const viewportFit: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: '1', style: { x: 200, y: 250 } },
        { id: '2', style: { x: 300, y: 250 } },
        { id: '3', style: { x: 250, y: 200 } },
        { id: '4', style: { x: 250, y: 300 } },
      ],
    },
    node: {
      style: {
        size: 50,
        fill: (d) => (d.id === '1' ? '#d4414c' : '#2f363d'),
      },
    },
    behaviors: ['zoom-canvas', 'drag-canvas'],
    plugins: [],
  });

  await graph.render();

  viewportFit.form = (panel) => {
    const config = {
      x: 0,
      y: 0,
      zoom: 1,
      fitView: () => graph.fitView(),
      fitCenter: () => graph.fitCenter(),
      focusElement: () => graph.focusElement('1'),
    };
    return [
      panel.add(config, 'x', -100, 100, 1).onChange((x: number) => graph.translateTo([x, config.y], false)),
      panel.add(config, 'y', -100, 100, 1).onChange((y: number) => graph.translateTo([config.x, y], false)),
      panel.add(config, 'zoom', 0.01, 10, 0.1).onChange((zoom: number) => graph.zoomTo(zoom, false)),
      panel.add(config, 'fitView'),
      panel.add(config, 'fitCenter'),
      panel.add(config, 'focusElement'),
    ];
  };

  return graph;
};
