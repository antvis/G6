import { Canvas } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { isString } from '@antv/util';

/**
 * Create a canvas
 * @param { 'canvas' | 'svg' | 'webgl' } rendererType
 * @param {string | HTMLElement} container
 * @param {number} width
 * @param {number} height
 * @param {number} pixelRatio optional
 * @param {boolean} customCanvasTag whether create a <canvas /> for multiple canvas under the container
 * @returns
 */
export const createCanvas = (
  rendererType: 'canvas' | 'svg' | 'webgl',
  container: string | HTMLElement,
  width: number,
  height: number,
  pixelRatio?: number,
  customCanvasTag: boolean = true,
  style: any = {},
) => {
  let Renderer;
  switch (rendererType.toLowerCase()) {
    case 'svg':
      Renderer = SVGRenderer;
      break;
    case 'webgl':
      Renderer = WebGLRenderer;
      break;
    default:
      Renderer = CanvasRenderer;
      break;
  }
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
    const containerDOM = isString(container) ? document.getElementById('container') : container;
    containerDOM!.appendChild(canvasTag);
    return new Canvas({
      canvas: canvasTag,
      devicePixelRatio: pixelRatio,
      renderer: new Renderer(),
    });
  }
  return new Canvas({
    container,
    width,
    height,
    devicePixelRatio: pixelRatio,
    renderer: new Renderer()
  });
}
