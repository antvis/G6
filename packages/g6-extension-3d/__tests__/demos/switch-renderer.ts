import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import type { NodeData } from '@antv/g6';
import { ExtensionCategory, Graph, register } from '@antv/g6';
import { Light, Line3D, ObserveCanvas3D, Sphere, ZoomCanvas3D, renderer } from '../../src';

export const switchRenderer: TestCase = async (context) => {
  register(ExtensionCategory.PLUGIN, '3d-light', Light);
  register(ExtensionCategory.NODE, 'sphere', Sphere);
  register(ExtensionCategory.EDGE, 'line3d', Line3D);
  register(ExtensionCategory.BEHAVIOR, 'observe-canvas-3d', ObserveCanvas3D);
  register(ExtensionCategory.BEHAVIOR, 'zoom-canvas-3d', ZoomCanvas3D);

  const nodes: NodeData[] = [{ id: '1' }, { id: '2' }];

  const graph = new Graph({
    ...context,
    data: {
      nodes,
    },
    layout: {
      type: 'grid',
    },
  });

  await graph.render();

  switchRenderer.form = (panel) => {
    panel.add({ renderer: '2d' }, 'renderer', ['2d', '3d']).onChange((name: string) => {
      if (name === '2d') {
        graph.setOptions({
          renderer: () => new CanvasRenderer(),
          behaviors: [
            'zoom-canvas',
            'drag-canvas',
            'drag-element',
            {
              type: 'hover-activate',
              degree: 1,
              state: 'highlight',
            },
          ],
          node: {
            type: 'circle',
            state: {
              highlight: {
                fill: '#D580FF',
              },
            },
          },
          edge: {
            style: {
              labelBackgroundFill: '#FFF',
              labelBackground: true,
            },
          },
          layout: {
            type: 'force',
            preventOverlap: true,
            animation: false,
          },
        });
      } else {
        graph.setOptions({
          renderer,
          node: {
            type: 'sphere',
            style: {
              materialType: 'phong',
            },
          },
          edge: {
            type: 'line3d',
          },
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
            {
              type: 'background',
              backgroundImage:
                'url(https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*M_OaRrzIZOEAAAAAAAAAAAAADmJ7AQ/original)',
              backgroundPosition: 'center',
            },
          ],
          behaviors: ['observe-canvas-3d', 'zoom-canvas-3d'],
        });
      }

      graph.draw();
    });
    return [];
  };

  return graph;
};
