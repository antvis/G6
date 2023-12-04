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
const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const getDegrees = (data) => {
  const degrees = {};
  data.edges.forEach((edge) => {
    const { source, target } = edge;
    degrees[source] = degrees[source] || 0;
    degrees[target] = degrees[target] || 0;
    degrees[source]++;
    degrees[target]++;
  });
  return degrees;
};

fetch('https://assets.antv.antgroup.com/g6/eva-3d-data.json')
  .then((res) => res.json())
  .then((data) => {
    const degrees = getDegrees(data);
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
              lineWidth: 0.4,
              opacity: 0.4,
              stroke: '#fff',
            },
            type: 'line-edge',
          },
        };
      },
      node: (innerModel) => {
        const isCube = ['c148', 'c498', 'c41', 'c254'].includes(innerModel.data.cluster);
        return {
          ...innerModel,
          data: {
            ...innerModel.data,
            type: isCube ? 'cube-node' : 'sphere-node',
            keyShape: isCube
              ? {
                  width: 400,
                  height: 400,
                  depth: 400,
                }
              : {
                  r: 12 + degrees[innerModel.id] / 2,
                },
            labelShape:
              degrees[innerModel.id] > 20
                ? {
                    text: innerModel.data.label,
                    fontSize: 100,
                    lod: -1,
                    fill: 'rgba(255,255,255,0.85)',
                    wordWrap: false,
                    isBillboard: true,
                  }
                : undefined,
          },
        };
      },
      data,
    });
    let frame;
    graph.on('afterlayout', () => {
      const camera = graph.canvas.getCamera();
      let counter = 0;
      const tick = () => {
        if (counter < 80) {
          camera.dolly(4);
        }
        camera.rotate(0.4, 0);
        counter++;
        frame = requestAnimationFrame(tick);
        if (counter > 160 && frame) {
          cancelAnimationFrame(frame);
        }
      };
      tick();
    });
    graph.on('pointerdown', (e) => {
      console.log('frame', frame);
      if (frame) cancelAnimationFrame(frame);
    });
        window.graph = graph;
  });
