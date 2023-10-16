import { Graph as BaseGraph, extend, Extensions } from '../../../src/index';
import { container, height, width } from '../../datasets/const';

const Graph = extend(BaseGraph, {
  behaviors: {
    'hover-activate': Extensions.HoverActivate,
    'brush-select': Extensions.BrushSelect,
  },
  plugins: {
    legend: Extensions.Legend,
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
    data: {
      nodes: [
        { id: 'node1', data: { x: 100, y: 200, nodeType: 'a' } },
        { id: 'node2', data: { x: 200, y: 250, nodeType: 'b' } },
        { id: 'node3', data: { x: 200, y: 350, nodeType: 'b' } },
        { id: 'node4', data: { x: 300, y: 250, nodeType: 'c' } },
      ],
      edges: [
        {
          id: 'edge1',
          source: 'node1',
          target: 'node2',
          data: { edgeType: 'e1' },
        },
        {
          id: 'edge2',
          source: 'node2',
          target: 'node3',
          data: { edgeType: 'e2' },
        },
        {
          id: 'edge3',
          source: 'node3',
          target: 'node4',
          data: { edgeType: 'e3' },
        },
        {
          id: 'edge4',
          source: 'node1',
          target: 'node4',
          data: { edgeType: 'e3' },
        },
      ],
    },
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
    plugins: [
      {
        type: 'legend',
        key: 'legend1',
        size: 'fit-content',
        renderer: 'canvas',
        background: '#ccc',
        orientation: 'horizontal',
        node: {
          enable: true,
          padding: [20, 20],
          title: 'node-legend',
          typeField: 'nodeType',
          rows: 1,
          cols: 4,
          labelStyle: {
            spacing: 8,
            fontSize: 20,
          },
          markerStyle: {
            shape: 'circle',
            size: (type) => {
              return type === 'a' ? 10 : 20;
            },
            color: (type) => {
              return type === 'a' ? '#f00' : '#00f';
            },
          },
        },
        edge: {
          enable: true,
          padding: [10, 20],
          title: 'edge-legend',
          typeField: 'edgeType',
          markerStyle: {
            color: (type) => {
              switch (type) {
                case 'e1':
                  return '#00f';
                case 'e2':
                  return '#f0f';
                case 'e3':
                  return '#0ff';
              }
            },
          },
        },
      },
    ],
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
    graph.addData('node', {
      id: 'ewnnode',
      data: {
        x: 100,
        y: 300,
        nodeType: 'd',
      },
    });
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
