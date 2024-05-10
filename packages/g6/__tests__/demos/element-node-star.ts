import { Graph } from '@/src';
import data from '@@/dataset/element-nodes.json';

export const elementNodeStar: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    node: {
      type: 'star', // 👈🏻 Node shape type.
      style: {
        size: 40,
        labelText: (d) => d.id!,
        iconSrc: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      },
    },
    layout: {
      type: 'grid',
    },
  });

  await graph.render();

  return graph;
};
