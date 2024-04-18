import { CameraSetting, ExtensionCategory, Graph, register } from '@antv/g6';
import { DragCanvas3D, Light, Line3D, Sphere, renderer } from '../../src';

export const positionValidate: TestCase = async (context) => {
  register(ExtensionCategory.PLUGIN, '3d-light', Light);
  register(ExtensionCategory.NODE, 'sphere', Sphere);
  register(ExtensionCategory.EDGE, 'line3d', Line3D);
  register(ExtensionCategory.BEHAVIOR, 'drag-canvas-3d', DragCanvas3D);
  register(ExtensionCategory.PLUGIN, 'camera-setting', CameraSetting);

  const graph = new Graph({
    ...context,
    renderer,
    data: {
      nodes: [
        { id: '0', style: { labelText: 'center' } },
        { id: '1', style: { x: -50, y: -50, z: -50, labelText: '(-1, -1, -1)' } },
        { id: '2', style: { x: -50, y: 50, z: -50, labelText: '(-1, 1, -1)' } },
        { id: '3', style: { x: 50, y: 50, z: -50, labelText: '(1, 1, -1)' } },
        { id: '4', style: { x: 50, y: -50, z: -50, labelText: '(1, -1, -1)' } },
        { id: '5', style: { x: -50, y: -50, z: 50, labelText: '(-1, -1, 1)' } },
        { id: '6', style: { x: -50, y: 50, z: 50, labelText: '(-1, 1, 1)' } },
        { id: '7', style: { x: 50, y: 50, z: 50, labelText: '(1, 1, 1)' } },
        { id: '8', style: { x: 50, y: -50, z: 50, labelText: '(1, -1, 1)' } },
      ],
      edges: [
        // { source: '1', target: '2' },
        // { source: '2', target: '3' },
        // { source: '1', target: '3' },
      ],
    },
    node: {
      type: 'sphere',
      style: {
        materialType: 'phong',
        labelText: '',
      },
      palette: 'spectral',
    },
    edge: {
      type: 'line3d',
    },
    behaviors: ['drag-canvas-3d'],
    plugins: [
      {
        type: '3d-light',
        directional: {
          direction: [0, 0, 1],
        },
      },
      {
        type: 'camera-setting',
        projectionMode: 'perspective',
        near: 0.1,
        far: 1000,
        fov: 45,
        aspect: 1,
      },
    ],
  });

  await graph.render();

  return graph;
};
