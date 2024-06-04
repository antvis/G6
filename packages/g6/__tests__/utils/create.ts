import type { GraphOptions } from '@/src';
import { Graph } from '@/src';
import { Circle } from '@/src/elements';
import { Canvas } from '@/src/runtime/canvas';
import type { Node, Point } from '@/src/types';
import type { IRenderer } from '@antv/g';
import { resetEntityCounter } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Renderer as SVGRenderer } from '@antv/g-svg';
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

  let extraOptions = {};

  if (globalThis.process) {
    const offscreenNodeCanvas = {
      getContext: () => context,
    } as unknown as HTMLCanvasElement;
    const context = new OffscreenCanvasContext(offscreenNodeCanvas);
    // 下列参数仅在 node 环境下需要传入 / These parameters only need to be passed in the node environment
    extraOptions = {
      document: container.ownerDocument,
      offscreenCanvas: offscreenNodeCanvas,
    };
  }

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
