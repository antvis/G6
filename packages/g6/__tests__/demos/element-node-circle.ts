import { Graph } from '@/src';
import data from '@@/dataset/element-nodes.json';

export const elementNodeCircle: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    node: {
      type: 'circle', // 👈🏻 Node shape type.
      style: {
        iconFontFamily: 'iconfont',
        iconText: '\ue602',
        labelText: (d) => d.id!,
        size: 40,
      },
    },
    layout: {
      type: 'grid',
    },
  });

  await graph.render();

  return graph;
};
