import data from '@@/dataset/language-tree.json';
import { Graph, IPointerEvent, type Element } from '@antv/g6';

export const behaviorAutoAdaptLabel: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    padding: 20,
    theme: 'light',
    data,
    node: {
      style: {
        labelText: (d) => d.id,
        labelBackground: true,
        labelFontFamily: 'Gill Sans',
        labelFill: '#333',
      },
      state: {
        active: {
          label: true,
        },
      },
      palette: {
        type: 'group',
        color: 'tableau',
        field: 'group',
      },
    },
    edge: {
      style: {
        stroke: '#E2E3E1',
        endArrow: true,
      },
    },
    behaviors: [
      'drag-canvas',
      'zoom-canvas',
      function () {
        return {
          type: 'hover-activate',
          degree: 0,
          onHover: (e: IPointerEvent<Element>) => {
            this.frontElement(e.target.id);
          },
        };
      },
      {
        key: 'auto-adapt-label',
        type: 'auto-adapt-label',
      },
    ],
    layout: {
      type: 'd3-force',
      manyBody: { strength: -200 },
      x: {},
      y: {},
    },
    transforms: [
      {
        key: 'map-node-size',
        type: 'map-node-size',
        maxSize: 60,
        minSize: 12,
        scale: 'linear',
        mapLabelSize: true,
      },
    ],
    plugins: [{ type: 'background', background: '#fff' }],
    animation: false,
  });

  await graph.render();

  return graph;
};
