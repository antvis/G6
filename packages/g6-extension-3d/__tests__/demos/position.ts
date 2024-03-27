import { Graph, register } from '@antv/g6';
import { Light, Line3D, Sphere, renderer } from '../../src';

export const positionValidate = async (context) => {
  register('plugin', '3d-light', Light);
  register('node', 'sphere', Sphere);
  register('edge', 'line3d', Line3D);

  const graph = new Graph({
    ...context,
    renderer,
    data: {
      nodes: [
        { id: '1', style: { x: 100, y: 100 } },
        { id: '2', style: { x: 200, y: 200 } },
        { id: '3', style: { x: 200, y: 100, z: 150 } },
      ],
      edges: [
        { source: '1', target: '2' },
        { source: '2', target: '3' },
        { source: '1', target: '3' },
      ],
    },
    node: {
      style: { type: 'sphere', materialType: 'phong' },
    },
    edge: {
      style: {
        type: 'line3d',
      },
    },
    plugins: [
      {
        type: '3d-light',
        directional: {
          direction: [0, 0, 1],
        },
      },
    ],
  });

  await graph.render();
};
