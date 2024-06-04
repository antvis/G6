import { Graph } from '@/src';
import data from '@@/dataset/element-nodes.json';

export const elementNodeRect: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    node: {
      type: 'rect', // 👈🏻 Node shape type.
      style: {
        radius: 4, // 👈🏻 Set the radius.
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
