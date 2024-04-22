import { Graph } from '@/src';
import { idOf } from '@/src/utils/id';

export const elementNodeCircle: TestCase = async (context) => {
  const data = {
    nodes: [
      { id: 'circle' },
      { id: 'circle-halo' },
      { id: 'circle-badges' },
      { id: 'circle-ports' },
      { id: 'circle-active' },
      { id: 'circle-selected' },
      { id: 'circle-highlight' },
      { id: 'circle-inactive' },
      { id: 'circle-disabled' },
    ],
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

  graph.setElementState({
    'circle-active': 'active',
    'circle-selected': 'selected',
    'circle-highlight': 'highlight',
    'circle-inactive': 'inactive',
    'circle-disabled': 'disabled',
  });

  return graph;
};
