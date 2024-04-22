import { Graph, Extensions, extend } from '@antv/g6';
const ExtGraph = extend(Graph, {
  nodes: {
    'sphere-node': Extensions.SphereNode,
    'cube-node': Extensions.CubeNode,
  },
  behaviors: {
    'orbit-canvas-3d': Extensions.OrbitCanvas3D,
    'zoom-canvas-3d': Extensions.ZoomCanvas3D,
  },
});

const data = {
  nodes: [
    {
      id: 'sphere-node',
      data: {
        type: 'sphere-node',
        x: 100,
        y: 100,
        z: 0,
        keyShape: {
          r: 16,
        },
        labelShape: {
          text: 'sphere-node',
          wordWrap: false,
          isBillboard: true,
        },
      },
    },
    {
      id: 'cube-node',
      data: {
        type: 'cube-node',
        x: 250,
        y: 250,
        z: 50,
        keyShape: {
          width: 400,
          height: 400,
          depth: 400,
        },
        labelShape: {
          text: 'cube-node',
          wordWrap: false,
          isBillboard: true,
        },
      },
    },
  ],
  edges: [
    {
      id: 'edge1',
      source: 'sphere-node',
      target: 'cube-node',
      data: {},
    },
  ],
};

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new ExtGraph({
  container: 'container',
  width,
  height,
  renderer: 'webgl-3d',
  modes: {
    default: [
      {
        type: 'orbit-canvas-3d',
        trigger: 'drag',
      },
      'zoom-canvas-3d',
    ],
  },
  data,
});

// graph.on('afterrender', (e) => {
//   graph.setItemState('circle-active', 'active', true);
//   graph.setItemState('circle-selected', 'selected', true);
//   graph.setItemState('circle-highlight', 'highlight', true);
//   graph.setItemState('circle-inactive', 'inactive', true);
// });

window.graph = graph;