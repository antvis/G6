import { Graph } from '@/src';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';

export const canvasSwitchRenderer: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: Array.from({ length: 10 }).map((_, i) => ({ id: `node-${i}` })),
    },
    layout: {
      type: 'grid',
    },
  });

  await graph.render();

  canvasSwitchRenderer.form = (panel) => {
    panel.add({ renderer: 'canvas' }, 'renderer', ['canvas', 'svg', 'webgl']).onChange((name: string) => {
      graph.setOptions({
        renderer: () => {
          if (name === 'svg') return new SVGRenderer();
          if (name === 'webgl') return new WebGLRenderer();
          return new CanvasRenderer();
        },
      });
    });
    return [];
  };

  return graph;
};
