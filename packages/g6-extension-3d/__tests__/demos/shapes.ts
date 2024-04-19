import type { NodeData } from '@antv/g6';
import { ExtensionCategory, Graph, register } from '@antv/g6';
import { Capsule, Cone, Cube, Cylinder, Light, ObserveCanvas3D, Plane, Sphere, Torus, renderer } from '../../src';

export const shapes: TestCase = async (context) => {
  register(ExtensionCategory.PLUGIN, '3d-light', Light);
  register(ExtensionCategory.NODE, 'sphere', Sphere);
  register(ExtensionCategory.NODE, 'plane', Plane);
  register(ExtensionCategory.NODE, 'cylinder', Cylinder);
  register(ExtensionCategory.NODE, 'cone', Cone);
  register(ExtensionCategory.NODE, 'cube', Cube);
  register(ExtensionCategory.NODE, 'capsule', Capsule);
  register(ExtensionCategory.NODE, 'torus', Torus);
  register(ExtensionCategory.BEHAVIOR, 'observe-canvas-3d', ObserveCanvas3D);

  const nodes: NodeData[] = [
    {
      id: '1',
      type: 'sphere',
      style: {
        texture: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*cdTdTI2bNl8AAAAAAAAAAAAADmJ7AQ/original',
      },
    },
    { id: '2', type: 'plane', style: { size: 50 } },
    { id: '3', type: 'cylinder' },
    { id: '4', type: 'cone' },
    {
      id: '5',
      type: 'cube',
      style: {
        texture: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*8TlCRIsKeUkAAAAAAAAAAAAAARQnAQ',
      },
    },
    { id: '6', type: 'capsule' },
    { id: '7', type: 'torus' },
  ];

  const graph = new Graph({
    ...context,
    renderer,
    data: {
      nodes,
    },
    node: {
      style: {
        materialType: 'phong',
        x: (d) => 100 + (nodes.findIndex((n) => n.id === d.id) % 5) * 100,
        y: (d) => 100 + Math.floor(nodes.findIndex((n) => n.id === d.id) / 5) * 100,
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
    behaviors: ['observe-canvas-3d'],
  });

  await graph.render();

  return graph;
};
