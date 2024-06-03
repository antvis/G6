import { CameraSetting, ExtensionCategory, Graph, register } from '@antv/g6';
import { D3Force3DLayout, Light, Line3D, ObserveCanvas3D, Sphere, ZoomCanvas3D, renderer } from '../../src';
import data from '../dataset/force-3d.json';

export const layoutD3Force3D: TestCase = async (context) => {
  register(ExtensionCategory.PLUGIN, '3d-light', Light);
  register(ExtensionCategory.NODE, 'sphere', Sphere);
  register(ExtensionCategory.EDGE, 'line3d', Line3D);
  register(ExtensionCategory.LAYOUT, 'd3-force-3d', D3Force3DLayout);
  register(ExtensionCategory.PLUGIN, 'camera-setting', CameraSetting);
  register(ExtensionCategory.BEHAVIOR, 'zoom-canvas-3d', ZoomCanvas3D);
  register(ExtensionCategory.BEHAVIOR, 'observe-canvas-3d', ObserveCanvas3D);

  const graph = new Graph({
    ...context,
    animation: true,
    renderer,
    data,
    layout: {
      type: 'd3-force-3d',
    },
    node: {
      type: 'sphere',
      style: {
        materialType: 'phong',
      },
      palette: {
        color: 'tableau',
        type: 'group',
        field: 'group',
      },
    },
    edge: {
      type: 'line3d',
    },
    behaviors: ['observe-canvas-3d', 'zoom-canvas-3d'],
    plugins: [
      {
        type: 'camera-setting',
        projectionMode: 'perspective',
        near: 0.1,
        far: 1000,
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

  await graph.render();
  return graph;
};
