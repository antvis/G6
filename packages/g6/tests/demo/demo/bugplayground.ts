import { Graph as BaseGraph, extend, Extensions } from '../../../src/index';
import { container, height, width } from '../../datasets/const';

const Graph = extend(BaseGraph, {
  behaviors: {
    'hover-activate': Extensions.HoverActivate,
    'brush-select': Extensions.BrushSelect,
  },
});
export default () => {
  const data = {
    nodes: [
      {
        id: 1,
        data: {
          x: 100,
          y: 100,
          type: 'circle-node',
        },
      },
      {
        id: 2,
        data: {
          x: 200,
          y: 100,
          type: 'rect-node',
        },
      },
      {
        id: 3,
        data: {
          x: 100,
          y: 200,
          type: 'rect-node',
        },
      },
      {
        id: 4,
        data: {
          x: 200,
          y: 200,
          type: 'rect-node',
        },
      },
    ],
    edges: [
      {
        source: 1,
        target: 2,
        data: {},
      },
    ],
  };

  const graph = new Graph({
    container,
    width,
    height,
    data,
    modes: {
      default: [
        'click-select',
        'hover-activate',
        'drag-canvas',
        'zoom-canvas',
        'drag-node',
      ],
    },
    autoFit: 'view',
    // theme: {
    //   type: 'spec',
    //   base: 'light',
    //   specification: {
    //     node: {
    //       dataTypeField: 'type',
    //       palette: { 'circle-node': '#f00', 'rect-node': '#0f0' },
    //     },
    //   },
    // },
  });

  graph.on('canvas:click', (e) => {
    graph.focusItem(1);
    graph.setItemState(1, 'selected', true);
    // setTimeout(() => {
    //   graph.setItemState(1, 'selected', true);
    // }, 1000);
  });

  // // 在平移过的基础上再 fitView 带动画，位置不对
  // let transformed = true;
  // graph.on('canvas:click', (e) => {
  //   graph.fitView({}, transformed ? { duration: 500 } : undefined);
  //   // transformed = !transformed;
  // });
  // graph.on('canvas:contextmenu', (e) => {
  //   e.preventDefault();
  //   graph.translate({ dx: 100, dy: 100 });
  // });

  return graph;
};
