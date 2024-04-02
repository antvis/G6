import { Graph } from '@/src';
import { idOf } from '@/src/utils/id';

export const elementNodeHexagon: TestCase = async (context) => {
  const data = {
    nodes: [
      { id: 'hexagon' },
      { id: 'hexagon-halo' },
      { id: 'hexagon-badges' },
      { id: 'hexagon-ports' },
      { id: 'hexagon-active' },
      { id: 'hexagon-selected' },
      { id: 'hexagon-highlight' },
      { id: 'hexagon-inactive' },
      { id: 'hexagon-disabled' },
    ],
  };

  const graph = new Graph({
    ...context,
    data,
    node: {
      style: {
        type: 'hexagon', // 👈🏻 Node shape type.
        size: 40,
        labelText: (d) => d.id!,
        iconSrc: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
        halo: (d) => idOf(d).toString().includes('halo'),
        portR: 3,
        ports: (d) =>
          idOf(d).toString().includes('ports')
            ? [{ placement: 'left' }, { placement: 'right' }, { placement: 'top' }, { placement: 'bottom' }]
            : [],
        badges: (d) =>
          idOf(d).toString().includes('badges')
            ? [
                { text: 'A', placement: 'right-top' },
                { text: 'Important', placement: 'right' },
                { text: 'Notice', placement: 'right-bottom' },
              ]
            : [],
        badgeFontSize: 8,
        badgePadding: [1, 4],
      },
    },
    layout: {
      type: 'grid',
    },
  });

  await graph.render();

  graph.setElementState('hexagon-active', 'active');
  graph.setElementState('hexagon-selected', 'selected');
  graph.setElementState('hexagon-highlight', 'highlight');
  graph.setElementState('hexagon-inactive', 'inactive');
  graph.setElementState('hexagon-disabled', 'disabled');

  return graph;
};
