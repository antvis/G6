import { Graph } from '../../src';

export const elementEdgeCustomArrow: TestCase = async (context) => {
  const data = {
    nodes: new Array(6).fill(0).map((_, i) => ({ id: `node${i + 1}` })),
    edges: [
      {
        id: 'custom-arrow-1',
        source: 'node1',
        target: 'node2',
        style: {
          endArrowPath: 'M0,0 L10,4 L14,14 L18,4 L28,0 L18,-4 L14,-14 L10,-4 Z',
          endArrowOffset: 14,
        },
      },
      {
        id: 'custom-arrow-2',
        source: 'node3',
        target: 'node4',
        style: {
          endArrowPath: 'M 3,-5 L 3,5 L 15,10 L 15,-10 Z',
          endArrowOffset: 10,
        },
      },
      {
        id: 'image-arrow',
        source: 'node5',
        target: 'node6',
        style: {
          endArrowSrc: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
          endArrowSize: 28,
          endArrowTransform: 'rotate(90deg)',
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
  });

  await graph.render();

  return graph;
};
