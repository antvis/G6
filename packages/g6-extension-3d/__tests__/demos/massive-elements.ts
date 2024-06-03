import { CameraSetting, ExtensionCategory, Graph, register } from '@antv/g6';
import { Light, Line3D, ObserveCanvas3D, Sphere, ZoomCanvas3D, renderer } from '../../src';

export const massiveElements: TestCase = async (context) => {
  register(ExtensionCategory.PLUGIN, '3d-light', Light);
  register(ExtensionCategory.NODE, 'sphere', Sphere);
  register(ExtensionCategory.EDGE, 'line3d', Line3D);
  register(ExtensionCategory.PLUGIN, 'camera-setting', CameraSetting);
  register(ExtensionCategory.BEHAVIOR, 'zoom-canvas-3d', ZoomCanvas3D);
  register(ExtensionCategory.BEHAVIOR, 'observe-canvas-3d', ObserveCanvas3D);

  const data = await fetch('https://assets.antv.antgroup.com/g6/eva-3d-data.json').then((res) => res.json());

  const graph = new Graph({
    ...context,
    animation: false,
    renderer,
    data,
    node: {
      type: 'sphere',
      style: {
        materialType: 'phong',
        size: 50,
        x: (d) => d.data!.x,
        y: (d) => d.data!.y,
        z: (d) => d.data!.z,
      },
      palette: {
        color: 'tableau',
        type: 'group',
        field: 'cluster',
      },
    },
    edge: {
      type: 'line3d',
    },
    behaviors: ['observe-canvas-3d', 'zoom-canvas-3d'],
    plugins: [
      {
        type: 'camera-setting',
        projectionMode: 'orthographic',
        near: 1,
        far: 10000,
        fov: 45,
        aspect: 1,
      },
      {
        type: '3d-light',
        directional: {
          direction: [0, 0, 1],
        },
      },
    ],
  });

  console.time('time');

  await graph.draw();

  console.timeEnd('time');

  return graph;
};
