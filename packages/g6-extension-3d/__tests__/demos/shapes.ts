import { Graph, register } from '@antv/g6';
import { Capsule, Cone, Cube, Cylinder, Light, Plane, Sphere, Torus, renderer } from '../../src';

export const shapes: TestCase = async (context) => {
  register('plugin', '3d-light', Light);
  register('node', 'sphere', Sphere);
  register('node', 'plane', Plane);
  register('node', 'cylinder', Cylinder);
  register('node', 'cone', Cone);
  register('node', 'cube', Cube);
  register('node', 'capsule', Capsule);
  register('node', 'torus', Torus);

  const graph = new Graph({
    ...context,
    renderer,
    data: {
      nodes: [
        {
          id: '1',
          style: {
            type: 'sphere',
            texture: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*cdTdTI2bNl8AAAAAAAAAAAAADmJ7AQ/original',
          },
        },
        { id: '2', style: { type: 'plane', size: 50 } },
        { id: '3', style: { type: 'cylinder' } },
        { id: '4', style: { type: 'cone' } },
        {
          id: '5',
          style: {
            type: 'cube',
            texture: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*8TlCRIsKeUkAAAAAAAAAAAAAARQnAQ',
          },
        },
        { id: '6', style: { type: 'capsule' } },
        { id: '7', style: { type: 'torus' } },
      ],
    },
    node: {
      style: {
        materialType: 'phong',
        x: (_, i) => 100 + (i % 5) * 100,
        y: (_, i) => 100 + Math.floor(i / 5) * 100,
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

  return graph;
};
