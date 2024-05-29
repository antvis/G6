import data from '@@/dataset/element-nodes.json';
import { Graph } from '@antv/g6';

export const elementNodeCircle: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    node: {
      type: 'circle', // 👈🏻 Node shape type.
      style: {
        size: 40,
        labelText: (d) => d.id!,
        iconHeight: 20,
        iconWidth: 20,
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
