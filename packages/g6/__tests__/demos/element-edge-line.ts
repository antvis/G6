import data from '@@/dataset/element-edges.json';
import { Graph } from '@antv/g6';

export const elementEdgeLine: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    edge: {
      type: 'line', // 👈🏻 Edge shape type.
      style: {
        labelText: (d) => d.id!,
        labelBackground: true,
        endArrow: true,
        badge: true,
        badgeText: '\ue603',
        badgeFontFamily: 'iconfont',
        badgeBackgroundWidth: 12,
        badgeBackgroundHeight: 12,
      },
    },
    layout: {
      type: 'radial',
      unitRadius: 220,
      linkDistance: 220,
    },
  });

  await graph.render();

  return graph;
};
