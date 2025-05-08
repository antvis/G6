import data from '@@/dataset/dagre-combo.json';
import { Graph } from '@antv/g6';

export const imageNodeHaloTest: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoFit: 'center',
    data,
    node: {
      type: (d) => (Number(d.id) % 2 === 0 ? 'image' : 'rect'),
      style: {
        src: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
        size: [60, 30],
        radius: 8,
        labelText: (d) => d.id,
        labelBackground: true,
        ports: [{ placement: 'top' }, { placement: 'bottom' }],
      },
      state: {
        selected: {
          haloStroke: '#111',
          haloLineWidth: 80,
        },
      },
      palette: {
        field: (d) => d.combo,
      },
    },
    edge: {
      type: 'cubic-vertical',
      style: {
        endArrow: true,
      },
    },
    combo: {
      type: 'rect',
      style: {
        radius: 8,
        labelText: (d) => d.id,
      },
    },
    layout: {
      type: 'antv-dagre',
      ranksep: 50,
      nodesep: 5,
      sortByCombo: true,
    },
    behaviors: ['drag-element', 'drag-canvas', 'zoom-canvas', 'click-select'],
  });

  await graph.render();

  return graph;
};
