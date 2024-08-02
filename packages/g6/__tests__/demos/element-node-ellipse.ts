import data from '@@/dataset/element-nodes.json';
import { Graph } from '@antv/g6';

export const elementNodeEllipse: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    node: {
      type: 'ellipse', // 👈🏻 Node shape type.
      style: {
        size: [45, 35],
        labelText: (d) => d.id!,
        iconHeight: 20,
        iconWidth: 20,
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
