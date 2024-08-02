import { Graph } from '@antv/g6';

export const perfFCP: TestCase = async (context) => {
  const data = {
    nodes: new Array(1000).fill(undefined).map((_, i) => ({ id: `${i}` })),
  };

  const graph = new Graph({
    ...context,
    animation: false,
    data,
    node: {
      type: 'circle', // 👈🏻 Node shape type.
      style: {
        size: 40,
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

  const timeStart = performance.now();

  await graph.render();

  const timeElapsed = performance.now() - timeStart;
  console.log('timeElapsed', timeElapsed);

  return graph;
};
