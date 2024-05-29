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
        direction: (d: any) => (d.id === 'ports' ? 'left' : undefined),
        labelText: (d) => d.id!,
        iconSrc: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
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
