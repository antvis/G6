import data from '@@/dataset/element-nodes.json';
import { Graph } from '@antv/g6';

export const elementNodeTriangle: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    node: {
      type: 'triangle', // 👈🏻 Node shape type.
      style: {
        size: 40,
        direction: (d: any) => (d.id === 'ports' ? 'left' : 'up'),
        labelText: (d) => d.id!,
        iconFontFamily: 'iconfont',
        iconText: '\ue602',
        ports: (d) => (d.id === 'ports' ? [{ placement: 'left' }, { placement: 'top' }, { placement: 'bottom' }] : []),
      },
    },
    layout: {
      type: 'grid',
    },
  });

  await graph.render();

  return graph;
};
