import { ForceLayout, initThreads, supportsThreads } from '@antv/layout-wasm';
import { Extensions, Graph, register } from '../../../src/index';
import { loadDataset } from '../../datasets/legacy-format';
import { TestCaseContext } from '../interface';

register('layout', 'force-wasm', ForceLayout);
register('node', 'sphere-node', Extensions.SphereNode);
register('behavior', 'orbit-canvas-3d', Extensions.OrbitCanvas3D);
register('behavior', 'zoom-canvas-3d', Extensions.ZoomCanvas3D);

export default async (context: TestCaseContext) => {
  const { width, height } = context;

  const data = await loadDataset(
    'https://gw.alipayobjects.com/os/basement_prod/da5a1b47-37d6-44d7-8d10-f3e046dabf82.json',
  );
  const supported = await supportsThreads();
  const threads = await initThreads(supported);

  return new Graph({
    ...context,
    data: JSON.parse(JSON.stringify(data)),
    renderer: 'webgl-3d',
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
