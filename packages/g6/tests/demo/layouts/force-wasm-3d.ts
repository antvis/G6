import { supportsThreads, initThreads, ForceLayout } from '@antv/layout-wasm';
import { Graph, Extensions, extend } from '../../../src/index';
import { container, height, width } from '../../datasets/const';
import { loadDataset } from '../../datasets/legacy-format';

export default async () => {
  const data = await loadDataset(
    'https://gw.alipayobjects.com/os/basement_prod/da5a1b47-37d6-44d7-8d10-f3e046dabf82.json',
  );
  const supported = await supportsThreads();
  const threads = await initThreads(supported);

  // Register custom layout
  const ExtGraph = extend(Graph, {
    layouts: {
      'force-wasm': Extensions.ForceLayout,
    },
    nodes: {
      'sphere-node': Extensions.SphereNode,
    },
    behaviors: {
      'orbit-canvas-3d': Extensions.OrbitCanvas3D,
      'zoom-canvas-3d': Extensions.ZoomCanvas3D,
    },
  });
  return new ExtGraph({
    container,
    width,
    height,
    data: JSON.parse(JSON.stringify(data)),
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
    layout: {
      type: 'force-wasm',
      threads,
      dimensions: 3,
      maxIteration: 100,
      minMovement: 0.4,
      distanceThresholdMode: 'mean',
      height,
      width,
      center: [width / 2, height / 2, 0],
      factor: 1,
      gravity: 10,
      linkDistance: 200,
      edgeStrength: 200,
      nodeStrength: 1000,
      coulombDisScale: 0.005,
      damping: 0.9,
      maxSpeed: 1000,
      interval: 0.02,
    },
    edge: {
      type: 'line-edge',
      keyShape: {
        lineWidth: 1,
        stroke: 'grey',
        strokeOpacity: 0.6,
      },
    },
    node: (innerModel) => {
      return {
        ...innerModel,
        data: {
          ...innerModel.data,
          type: 'sphere-node',
          keyShape: {
            r: 10,
            opacity: 0.6,
          },
          labelShape: {
            text: innerModel.id,
            fill: 'white',
            maxWidth: '400%',
            lod: -1,
            offsetY: 20,
            wordWrap: false, // FIXME: mesh.getBounds() returns an empty AABB
            isBillboard: true,
          },
        },
      };
    },
    nodeState: {
      selected: {
        keyShape: {
          fill: '#f00',
        },
        labelShape: {
          fontSize: 20,
        },
      },
    },
  });
};
