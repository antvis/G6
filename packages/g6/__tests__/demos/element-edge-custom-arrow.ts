import { Graph } from '@antv/g6';

export const elementEdgeCustomArrow: TestCase = async (context) => {
  const data = {
    nodes: new Array(6).fill(0).map((_, i) => ({ id: `node${i + 1}` })),
    edges: [
      {
        id: 'custom-arrow-1',
        source: 'node1',
        target: 'node2',
        style: {
          endArrowD: 'M-14,0 L-4,-4 L0,-14 L4,-4 L14,0 L4,4 L0,14 L-4,4 Z',
          endArrowOffset: 14,
        },
      },
      {
        id: 'custom-arrow-2',
        source: 'node3',
        target: 'node4',
        style: {
          endArrowD: 'M -6,-5 L -6,5 L 6,10 L 6,-10 Z',
          endArrowOffset: 20,
        },
      },
      {
        id: 'image-arrow',
        source: 'node5',
        target: 'node6',
        style: {
          endArrowSrc: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
          endArrowSize: 28,
          endArrowTransform: [['rotate', 90]],
          endArrowX: -14,
          endArrowY: -14,
        },
      },
    ],
  };

  const graph = new Graph({
    ...context,
    data,
    edge: {
      type: 'line', // 👈🏻 Edge shape type.
      style: {
        stroke: '#F6BD16',
        labelText: (d) => d.id!,
        labelBackground: true,
        endArrow: true,
      },
    },
    layout: {
      type: 'grid',
      cols: 2,
    },
    behaviors: ['drag-element'],
  });

  await graph.render();

  return graph;
};
