import { Graph, Extensions, extend } from '@antv/g6';

const ExtGraph = extend(Graph, {
  nodes: {
    'sphere-node': Extensions.SphereNode,
    'plane-node': Extensions.PlaneNode,
  },
  behaviors: {
    'orbit-canvas-3d': Extensions.OrbitCanvas3D,
    'zoom-canvas-3d': Extensions.ZoomCanvas3D,
  },
});

const colors = ['rgb(240, 134, 82)', 'rgb(30, 160, 230)', 'rgb(122, 225, 116)'];
const sphereR = 15;

const planeGroup = Array.from({ length: 3 }).map((_, i) => ({
  id: `plane-${i}`,
  data: {
    type: 'plane-node',
    x: 0,
    y: -300 + 300 * i + sphereR,
    z: 0,
    layer: i + 1,
  },
}));

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

fetch('https://assets.antv.antgroup.com/g6/3-layer-top.json')
  .then((res) => res.json())
  .then((result) => {
    const nodes = result.nodes
      .map(({ name, pos, layer }) => ({
        id: name,
        data: {
          type: 'sphere-node',
          ...pos,
          layer,
        },
      }))
      .concat(planeGroup);

    const edges = result.edges.map((edge, index) => ({ id: `edge-${index}`, ...edge }));

    const graph = new ExtGraph({
      container,
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
      theme: {
        type: 'spec',
        base: 'dark',
      },
      data: { nodes, edges },
      node: {
        keyShape: {
          fill: { fields: ['layer'], formatter: (model) => colors[model.data.layer - 1] },
          r: sphereR,
          width: {
            fields: ['type'],
            formatter: (model) => (model.data.type === 'plane-node' ? 10000 : 0),
          },
          depth: {
            fields: ['type'],
            formatter: (model) => (model.data.type === 'plane-node' ? 10000 : 0),
          },
          materialProps: {
            fields: ['type'],
            formatter: (model) =>
              model.data.type === 'plane-node'
                ? {
                    wireframe: true,
                    cullMode: 0,
                    wireframeColor: '#797979',
                  }
                : undefined,
          },
        },
      },
      edge: {
        keyShape: {
          lineWidth: 2,
          stroke: '#f6e432', // 边主图形描边颜色
        },
      },
    });

    graph.on('afterrender', () => {
      const canvas = graph.canvas;
      const camera = canvas.getCamera();
      camera.createLandmark('reset', {
        position: [0, -400, 2000],
        focalPoint: [0, 0, 0],
        zoom: 1,
      });
      camera.gotoLandmark('reset', {
        duration: 1000,
        easing: 'ease-in',
        onfinish: () => {
          canvas.addEventListener('afterrender', () => {
            graph.canvas.getRoot().rotate(0, 0.3, 0);
          });
        },
      });
    });

    window.graph = graph;
  });
