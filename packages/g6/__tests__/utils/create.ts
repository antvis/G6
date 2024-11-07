import { resetEntityCounter } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import type { CanvasConfig, GraphOptions, Node, Point } from '@antv/g6';
import { Canvas, Circle, Graph } from '@antv/g6';
import { OffscreenCanvasContext } from './offscreen-canvas-context';

function getRenderer(renderer: string) {
  switch (renderer) {
    case 'svg':
      return new SVGRenderer();
    case 'webgl':
      return new WebGLRenderer();
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
 * @param options - options
 * @returns instance
 */
export function createGraphCanvas(
  dom?: null | HTMLElement,
  width: number = 500,
  height: number = 500,
  renderer: string = 'svg',
  options?: Partial<CanvasConfig>,
) {
  const container = dom || document.createElement('div');

  resetEntityCounter();

  const extraOptions: Record<string, unknown> = {
    ...options,
  };

  if (globalThis.process) {
    const offscreenNodeCanvas = {
      getContext: () => context,
    } as unknown as HTMLCanvasElement;
    const context = new OffscreenCanvasContext(offscreenNodeCanvas);
    // 下列参数仅在 node 环境下需要传入 / These parameters only need to be passed in the node environment
    Object.assign(extraOptions, {
      document: container.ownerDocument,
      offscreenCanvas: offscreenNodeCanvas,
    });
  }

  const offscreenNodeCanvas = {
    getContext: () => context,
  } as unknown as HTMLCanvasElement;
  const context = new OffscreenCanvasContext(offscreenNodeCanvas);

  return new Canvas({
    container,
    width,
    height,
    renderer: () => getRenderer(renderer),
    ...extraOptions,
  });
}

/**
 * <zh/> 一个会连接到圆心的节点
 *
 * <en/> A node that will connect to the center
 */
class CenterConnectCircle extends Circle {
  public getIntersectPoint(): Point {
    const bounds = this.getShape('key').getBounds();
    return bounds.center;
  }
}

export function createEdgeNode(point: Point): Node {
  return new CenterConnectCircle({
    style: {
      x: point[0],
      y: point[1],
    },
  });
}

export async function createDemoGraph(demo: TestCase, context?: Partial<TestContext>): Promise<Graph> {
  const container = createGraphCanvas(document.getElementById('container'));
  return demo({ animation: false, container, theme: 'light', ...context });
}

export function createGraph(options: GraphOptions) {
  const container = createGraphCanvas(document.getElementById('container'));
  return new Graph({
    container,
    animation: false,
    theme: 'light',
    ...options,
  });
}
