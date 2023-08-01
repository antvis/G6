import { Canvas, CanvasLike } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Plugin as Plugin3D } from '@antv/g-plugin-3d';
import { Plugin as DragNDropPlugin } from '@antv/g-plugin-dragndrop';
import { RendererName } from '../types/render';

/**
 * Create a canvas
 * @param {RendererName} rendererType
 * @param {string | HTMLElement} container
 * @param {number} width
 * @param {number} height
 * @param {number} pixelRatio optional
 * @param {boolean} customCanvasTag whether create a <canvas /> for multiple canvas under the container
 * @returns
 */
export const createCanvas = (
  rendererType: RendererName,
  container: HTMLElement,
  width: number,
  height: number,
  pixelRatio?: number,
  customCanvasTag = true,
  style: any = {},
): Canvas => {
  let renderer;
  switch (rendererType.toLowerCase()) {
    case 'svg':
      renderer = new SVGRenderer();
      break;
    case 'webgl-3d':
    case 'webgl':
      renderer = new WebGLRenderer();
      renderer.registerPlugin(new Plugin3D());
      break;
    default:
      renderer = new CanvasRenderer();
      break;
  }
  renderer.registerPlugin(
    new DragNDropPlugin({
      isDocumentDraggable: true,
      isDocumentDroppable: true,
      dragstartDistanceThreshold: 10,
      dragstartTimeThreshold: 100,
    }),
  );

  if (typeof document !== 'undefined' && customCanvasTag) {
    const canvasTag = document.createElement('canvas');
    const dpr = pixelRatio || window.devicePixelRatio;
    canvasTag.width = dpr * width;
    canvasTag.height = dpr * height;
    canvasTag.style.width = `${width}px`;
    canvasTag.style.height = `${height}px`;
    canvasTag.style.position = 'fixed';
    canvasTag.style.outline = 'none';
    canvasTag.tabIndex = 1; // Enable keyboard events
    Object.assign(canvasTag.style, style);
    container!.appendChild(canvasTag);
    return new Canvas({
      canvas: canvasTag as CanvasLike,
      devicePixelRatio: pixelRatio,
      renderer,
    });
  }
  return new Canvas({
    container,
    width,
    height,
    devicePixelRatio: pixelRatio,
    renderer,
  });
};

/**
 * Change renderer type for the canvas.
 * @param rendererType renderer type
 * @param canvas Canvas instance
 * @returns
 */
export const changeRenderer = (
  rendererType: RendererName,
  canvas: Canvas,
): Canvas => {
  let renderer;
  switch (rendererType.toLowerCase()) {
    case 'svg':
      renderer = new SVGRenderer();
      break;
    case 'webgl-3d':
    case 'webgl':
      renderer = new WebGLRenderer();
      renderer.registerPlugin(new Plugin3D());
      break;
    default:
      renderer = new CanvasRenderer();
      break;
  }
  renderer.registerPlugin(new DragNDropPlugin());
  canvas.setRenderer(renderer);
  return canvas;
};
