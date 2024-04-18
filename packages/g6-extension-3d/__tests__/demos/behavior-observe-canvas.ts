import { CameraSetting, ExtensionCategory, Graph, register } from '@antv/g6';
import { Light, Line3D, ObserveCanvas3D, Sphere, ZoomCanvas3D, renderer } from '../../src';
import data from '../dataset/cubic.json';

export const behaviorObserveCanvas: TestCase = async (context) => {
  register(ExtensionCategory.PLUGIN, '3d-light', Light);
  register(ExtensionCategory.NODE, 'sphere', Sphere);
  register(ExtensionCategory.EDGE, 'line3d', Line3D);
  register(ExtensionCategory.BEHAVIOR, 'observe-canvas-3d', ObserveCanvas3D);
  register(ExtensionCategory.BEHAVIOR, 'zoom-canvas-3d', ZoomCanvas3D);
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
    behaviors: ['zoom-canvas-3d', { key: 'observe-canvas-3d', type: 'observe-canvas-3d' }],
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

  behaviorObserveCanvas.form = (panel) => [
    panel.add({ mode: 'orbiting' }, 'mode', ['orbiting', 'exploring', 'tracking']).onChange((mode: string) => {
      graph.updateBehavior({
        key: 'observe-canvas-3d',
        type: 'observe-canvas-3d',
        mode,
      });
    }),
  ];

  return graph;
};
