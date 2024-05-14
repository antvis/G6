import { Graph } from '@/src';

export const perfFCP: TestCase = async (context) => {
  const data = {
    nodes: new Array(1000).fill(undefined).map((_, i) => ({ id: `${i}` })),
  };

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

  const timeStart = performance.now();

  await graph.render();

  const timeElapsed = performance.now() - timeStart;
  console.log('timeElapsed', timeElapsed);

  return graph;
};
