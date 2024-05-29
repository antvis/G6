import type { IRenderer } from '@antv/g';
import { resetEntityCounter } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import type { GraphOptions, Node, Point } from '@antv/g6';
import { Circle, Graph } from '@antv/g6';
import { Canvas } from '../../packages/g6/src/runtime/canvas';
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

  const instance = getRenderer(renderer) as any as IRenderer;
  return new Canvas({
    container,
    width,
    height,
    renderer: () => instance,
    // @ts-expect-error document offscreenCanvas is not in the type definition
    document: container.ownerDocument,
    offscreenCanvas: offscreenNodeCanvas,
  });
}

/**
 * <zh/> 一个会连接到圆心的节点
 *
 * <en/> A node that will connect to the center
 */
class CenterConnectCircle extends Circle {
  public getIntersectPoint(): Point {
    const bounds = this.getKey().getBounds();
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
