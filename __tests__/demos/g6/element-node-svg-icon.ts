import comment from '@@/assets/comment.svg';
import user from '@@/assets/user.svg';
import { Graph } from '@antv/g6';

export const elementNodeSVGIcon: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: 'user', data: { type: 'user' }, style: { x: 50, y: 50 } },
        { id: 'comment', data: { type: 'comment' }, style: { x: 100, y: 50 } },
      ],
    },
    node: {
      style: {
        size: 40,
        fill: 'transparent',
        iconSrc: (d) => (d?.data?.type === 'user' ? user : comment),
        iconWidth: 40,
        iconHeight: 40,
      },
    },
    behaviors: ['drag-element'],
  });

  await graph.render();

  return graph;
};
