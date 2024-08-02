import data from '@@/dataset/element-nodes.json';
import { Graph } from '@antv/g6';

export const elementNodeHexagon: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    node: {
      type: 'hexagon', // 👈🏻 Node shape type.
      style: {
        size: 40,
        labelText: (d) => d.id!,
        iconFontFamily: 'iconfont',
        iconText: '\ue602',
      },
    },
    layout: {
      type: 'grid',
    },
  });

  await graph.render();

  return graph;
};
