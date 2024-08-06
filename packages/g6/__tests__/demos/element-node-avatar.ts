import { Graph } from '@antv/g6';

const avatar = 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*_Do9Tq7MxFQAAAAAAAAAAAAADmJ7AQ/original';
const logo = 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*AzSISZeq81IAAAAAAAAAAAAADmJ7AQ/original';

export const elementNodeAvatar: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        {
          id: 'node-1',
          type: 'circle',
          style: { iconSrc: avatar, iconWidth: 30, iconHeight: 30, iconRadius: 15, size: 40 },
        },
        {
          id: 'node-2',
          type: 'image',
          style: { src: avatar, size: 40, radius: 20, iconSrc: logo, iconWidth: 40, iconHeight: 40, iconRadius: 20 },
        },
      ],
    },
    layout: {
      type: 'grid',
    },
    behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas'],
  });

  await graph.render();

  return graph;
};
