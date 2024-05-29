import data from '@@/dataset/cluster.json';
import { Graph } from '@antv/g6';

export const layoutMDS: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    padding: 20,
    autoFit: 'view',
    data,
    node: {
      style: {
        labelText: (d) => d.id,
        labelPlacement: 'center',
      },
    },
    layout: {
      type: 'mds',
      linkDistance: 100,
    },
    behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas', 'click-select'],
  });

  await graph.render();

  layoutMDS.form = (panel) => {
    const config = {
      linkDistance: 100,
    };
    return [
      panel.add(config, 'linkDistance', 50, 120, 10).onChange((v: number) => {
        graph.setLayout({ type: 'mds', linkDistance: v });
        graph.layout();
      }),
    ];
  };

  return graph;
};
