import type { ElementDatum, IElementEvent } from '@antv/g6';
import { Graph } from '@antv/g6';

export const pluginTooltipAsync: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [{ id: 'node1', style: { x: 150, y: 100 }, data: { desc: 'get content async test' } }],
    },
    node: {
      style: {
        labelText: (d) => d.id,
      },
    },
    plugins: [
      {
        key: 'tooltip',
        type: 'tooltip',
        trigger: 'click',
        getContent: (evt: IElementEvent, items: ElementDatum[]) => {
          return new Promise((resolve) => {
            resolve(items[0].data?.desc || '');
          });
        },
      },
    ],
  });

  await graph.render();

  return graph;
};
