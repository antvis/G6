import { ExtensionCategory, Graph, register } from '@antv/g6';
import {
  Capsule,
  Cone,
  Cube,
  Cylinder,
  Light,
  ObserveCanvas3D,
  Plane,
  Sphere,
  Torus,
  renderer,
} from '@antv/g6-extension-3d';

register(ExtensionCategory.PLUGIN, '3d-light', Light);
register(ExtensionCategory.NODE, 'sphere', Sphere);
register(ExtensionCategory.NODE, 'plane', Plane);
register(ExtensionCategory.NODE, 'cylinder', Cylinder);
register(ExtensionCategory.NODE, 'cone', Cone);
register(ExtensionCategory.NODE, 'cube', Cube);
register(ExtensionCategory.NODE, 'capsule', Capsule);
register(ExtensionCategory.NODE, 'torus', Torus);
register(ExtensionCategory.BEHAVIOR, 'observe-canvas-3d', ObserveCanvas3D);

const nodes = [
  {
    id: 'node-1',
    type: 'sphere',
    style: {
      texture: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*cdTdTI2bNl8AAAAAAAAAAAAADmJ7AQ/original',
    },
  },
  { id: 'node-2', type: 'plane', style: { size: 50 } },
  { id: 'node-3', type: 'cylinder' },
  { id: 'node-4', type: 'cone' },
  {
    id: 'node-5',
    type: 'cube',
    style: {
      texture: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*8TlCRIsKeUkAAAAAAAAAAAAAARQnAQ',
    },
  },
  { id: 'node-6', type: 'capsule' },
  { id: 'node-7', type: 'torus' },
];

const graph = new Graph({
  container: 'container',
  renderer,
  data: {
    nodes,
  },
  node: {
    style: {
      materialType: 'phong',
      labelText: (d) => d.id,
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

graph.render();
