import { Graph } from '@/src';
import { idOf } from '@/src/utils/id';

export const elementNodeRect: TestCase = async (context) => {
  const data = {
    nodes: [
      { id: 'rect' },
      { id: 'rect-halo' },
      { id: 'rect-badges' },
      { id: 'rect-ports' },
      { id: 'rect-active' },
      { id: 'rect-selected' },
      { id: 'rect-highlight' },
      { id: 'rect-inactive' },
      { id: 'rect-disabled' },
    ],
  };

  const graph = new Graph({
    ...context,
    data,
    node: {
      type: 'rect', // 👈🏻 Node shape type.
      style: {
        radius: 4, // 👈🏻 Set the radius.
        size: 40,
        labelText: (d) => d.id!,
        iconWidth: 20,
        iconHeight: 20,
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
    'rect-active': 'active',
    'rect-selected': 'selected',
    'rect-highlight': 'highlight',
    'rect-inactive': 'inactive',
    'rect-disabled': 'disabled',
  });

  return graph;
};
