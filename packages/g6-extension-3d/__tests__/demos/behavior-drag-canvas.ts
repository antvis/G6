import { CameraSetting, ExtensionCategory, Graph, register } from '@antv/g6';
import { DragCanvas3D, Light, Line3D, Sphere, renderer } from '../../src';
import data from '../dataset/cubic.json';

export const behaviorDragCanvas: TestCase = async (context) => {
  register(ExtensionCategory.PLUGIN, '3d-light', Light);
  register(ExtensionCategory.NODE, 'sphere', Sphere);
  register(ExtensionCategory.EDGE, 'line3d', Line3D);
  register(ExtensionCategory.BEHAVIOR, 'drag-canvas-3d', DragCanvas3D);
  register(ExtensionCategory.PLUGIN, 'camera-setting', CameraSetting);

  const graph = new Graph({
    ...context,
    renderer,
    data,
    node: {
      type: 'sphere',
      style: {
        materialType: 'phong',
        labelText: '',
        x: (d) => +d.style!.x! + 250,
        y: (d) => +d.style!.y! + 250,
      },
      palette: 'spectral',
    },
    edge: {
      type: 'line3d',
    },
    behaviors: [
      'drag-canvas-3d',
      {
        type: 'drag-canvas-3d',
        trigger: {
          up: ['ArrowUp'],
          down: ['ArrowDown'],
          right: ['ArrowRight'],
          left: ['ArrowLeft'],
        },
      },
    ],
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
