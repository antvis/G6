import { createCanvas, Image as CanvasImage } from 'canvas';
import { JSDOM } from 'jsdom';
import GL from 'gl';
import { Canvas, IRenderer, Rectangle } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Plugin as DragAndDropPlugin } from '@antv/g-plugin-dragndrop';
import { RendererName } from '../../../src/types/render';

function unregisterDomInteractionPlugin(renderer: IRenderer) {
  const domInteractionPlugin = renderer.getPlugin('dom-interaction');
  renderer.unregisterPlugin(domInteractionPlugin);
  renderer.registerPlugin(
    new DragAndDropPlugin({ dragstartDistanceThreshold: 10 }),
  );
}

export function createNodeGCanvas(
  rendererName: RendererName,
  width: number,
  height: number,
): Canvas {
  // A standalone offscreen canvas for text metrics
  const offscreenNodeCanvas = createCanvas(1, 1);

  if (rendererName === 'canvas') {
    // Create a node-canvas instead of HTMLCanvasElement
    const nodeCanvas = createCanvas(width, height);
    const renderer = new CanvasRenderer();
    unregisterDomInteractionPlugin(renderer);
    return new Canvas({
      width,
      height,
      canvas: nodeCanvas as any,
      renderer,
      offscreenCanvas: offscreenNodeCanvas as any,
      supportsMutipleCanvasesInOneContainer: true,
      isMouseEvent: (e): e is MouseEvent => {
        return e.type.startsWith('mouse');
      },
      isTouchEvent: (e): e is TouchEvent => {
        return e.type.startsWith('touch');
      },
      createImage: () => {
        const image = new CanvasImage();
        return image as any;
      },
    });
  } else if (rendererName === 'svg') {
    const id = Math.random().toString(36);
    const dom = new JSDOM(`
<div id="${id}">
</div>
`);

    const renderer = new SVGRenderer();
    // @ts-ignore
    renderer.dom = dom;
    unregisterDomInteractionPlugin(renderer);
    return new Canvas({
      container: id,
      width,
      height,
      renderer,
      document: dom.window.document,
      requestAnimationFrame: dom.window.requestAnimationFrame,
      cancelAnimationFrame: dom.window.cancelAnimationFrame,
      supportsMutipleCanvasesInOneContainer: true,
      createImage: () => {
        const image = new CanvasImage();
        return image as any;
      },
    });
  } else {
    const gl = GL(width, height, {
      antialias: true,
      preserveDrawingBuffer: true,
      stencil: true,
    });
    const mockCanvas = {
      width,
      height,
      getContext: () => {
        // @ts-ignore
        gl.canvas = mockCanvas;
        // 模拟 DOM API，返回小程序 context，它应当和 CanvasRenderingContext2D 一致
        // @see https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/getContext
        return gl;
      },
      getBoundingClientRect: () => {
        // 模拟 DOM API，返回小程序 context 相对于视口的位置
        // @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
        return new Rectangle(0, 0, width, height);
      },
    };

    const renderer = new WebGLRenderer();
    unregisterDomInteractionPlugin(renderer);
    return new Canvas({
      width,
      height,
      canvas: mockCanvas as any, // use headless-gl
      renderer,
      offscreenCanvas: offscreenNodeCanvas as any,
      supportsMutipleCanvasesInOneContainer: true,
    });
  }
}
