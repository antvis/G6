import { resetEntityCounter } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Graph } from '@antv/g6';
import { OffscreenCanvasContext } from './offscreen-canvas-context';

function getRenderer(renderer: string) {
  switch (renderer) {
    case 'svg':
      return new SVGRenderer();
    case 'webgl':
    case 'canvas':
      return new CanvasRenderer();
    default:
      return new SVGRenderer();
  }
}

/**
 * Create graph canvas with config.
 * @param dom - dom
 * @param width - width
 * @param height - height
 * @param renderer - render
 * @returns instance
 */
export function createGraphCanvas(
  dom?: null | HTMLElement,
  width: number = 500,
  height: number = 500,
  renderer: string = 'svg',
) {
  const container = dom || document.createElement('div');
  container.style.width = `${width}px`;
  container.style.height = `${height}px`;

  resetEntityCounter();
  const offscreenNodeCanvas = {
    getContext: () => context,
  } as unknown as HTMLCanvasElement;
  const context = new OffscreenCanvasContext(offscreenNodeCanvas);

  return {
    container,
    width,
    height,
    renderer: () => getRenderer(renderer),
    document: container.ownerDocument,
    offscreenCanvas: offscreenNodeCanvas,
  };
}

export async function createDemoGraph(demo: TestCase, context?: Partial<TestContext>): Promise<Graph> {
  const canvasOptions = createGraphCanvas(document.getElementById('container'));
  return demo({ animation: false, ...canvasOptions, theme: 'light', ...context });
}
