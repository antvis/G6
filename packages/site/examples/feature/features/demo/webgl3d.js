import { Graph, Extensions, extend } from '@antv/g6';
const ExtGraph = extend(Graph, {
  nodes: {
    'sphere-node': Extensions.SphereNode,
  },
  behaviors: {
    'orbit-canvas-3d': Extensions.OrbitCanvas3D,
    'zoom-canvas-3d': Extensions.ZoomCanvas3D,
  },
});
const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const graph = new ExtGraph({
  container: 'container',
  width,
  height,
  renderer: 'webgl-3d',
  modes: {
    default: ['drag-canvas', 'drag-node', 'zoom-canvas'],
  },
  modes: {
    default: [
      {
        type: 'orbit-canvas-3d',
        trigger: 'drag',
      },
      'zoom-canvas-3d',
    ],
  },
  theme: {
    type: 'spec',
    base: 'dark',
    specification: {
      node: {
        dataTypeField: 'cluster',
      },
    },
  },
  edge: (innerModel) => {
    return {
      ...innerModel,
      data: {
        ...innerModel.data,
        keyShape: {
          lineWidth: 0.6,
          opacity: 0.6,
          stroke: '#fff',
        },
        type: 'line-edge',
      },
    };
  },
  node: (innerModel) => {
    return {
      ...innerModel,
      data: {
        ...innerModel.data,
        type: 'sphere-node',
        keyShape: {
          r: 12 + degrees[innerModel.id] / 2,
        },
        // labelShape:
        //   degrees[innerModel.id] > 20
        //     ? {
        //         text: innerModel.data.label,
        //         fontSize: 100,
        //         lod: -1,
        //         fill: 'rgba(255,255,255,0.85)',
        //         wordWrap: false, // FIXME: mesh.getBounds() returns an empty AABB
        //         isBillboard: true,
        //       }
        //     : undefined,
      },
    };
  },
});

fetch('https://assets.antv.antgroup.com/g6/eva-3d.json')
  .then((res) => res.json())
  .then((data) => {
    graph.read(data);
  });

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight - 160]);
  };
