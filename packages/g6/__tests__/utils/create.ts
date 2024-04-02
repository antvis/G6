import type { G6Spec } from '@/src';
import { Graph } from '@/src';
import { Circle } from '@/src/elements';
import { Canvas } from '@/src/runtime/canvas';
import type { Node, Point } from '@/src/types';
import type { IRenderer } from '@antv/g';
import { resetEntityCounter } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Plugin as Plugin3D } from '@antv/g-plugin-3d';
import { Plugin as PluginControl } from '@antv/g-plugin-control';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { OffscreenCanvasContext } from './offscreen-canvas-context';

function getRenderer(renderer: string) {
  switch (renderer) {
    case 'webgl': {
      const instance = new WebGLRenderer();
      instance.registerPlugin(new Plugin3D());
      instance.registerPlugin(new PluginControl());
      return instance;
    }
    case 'svg':
      return new SVGRenderer();
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

export async function createGraph(options: G6Spec) {
  const container = createGraphCanvas(document.getElementById('container'));
  return new Graph({
    container,
    animation: false,
    theme: 'light',
    ...options,
  });
}
