import data from '@@/dataset/element-nodes.json';
import { Graph } from '@antv/g6';

export const elementNodeImage: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    node: {
      type: 'image', // 👈🏻 Node shape type.
      style: {
        size: 40,
        labelText: (d) => d.id!,
        src: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
        iconSrc: '',
        haloStroke: '#227eff',
      },
      state: {
        inactive: {
          fillOpacity: 0.5,
        },
        disabled: {
          fillOpacity: 0.2,
        },
      },
    },
    layout: {
      type: 'grid',
    },
  });

  await graph.render();

  return graph;
};
