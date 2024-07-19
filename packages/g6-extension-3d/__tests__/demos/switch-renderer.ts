import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import type { NodeData } from '@antv/g6';
import { ExtensionCategory, Graph, register } from '@antv/g6';
import { Light, Sphere, renderer } from '../../src';

export const switchRenderer: TestCase = async (context) => {
  register(ExtensionCategory.PLUGIN, '3d-light', Light);
  register(ExtensionCategory.NODE, 'sphere', Sphere);

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
          node: {
            type: 'circle',
          },
          plugins: [],
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
          plugins: [
            {
              type: '3d-light',
              directional: {
                direction: [0, 0, 1],
              },
            },
          ],
        });
      }

      graph.draw();
    });
    return [];
  };

  return graph;
};
