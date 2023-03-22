import { Canvas } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Plugin as PluginControl } from '@antv/g-plugin-control';
import { Plugin as Plugin3D } from '@antv/g-plugin-3d';
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
  container: HTMLElement,
  width: number,
  height: number,
  pixelRatio?: number,
  customCanvasTag = true,
  style: any = {},
) => {
  let renderer;
  switch (rendererType.toLowerCase()) {
    case 'svg':
      renderer = new SVGRenderer();
      break;
    case 'webgl':
      renderer = new WebGLRenderer();
      renderer.registerPlugin(new Plugin3D());
      renderer.registerPlugin(new PluginControl());
      break;
    default:
      renderer = new CanvasRenderer();
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
    container!.appendChild(canvasTag);
    return new Canvas({
      canvas: canvasTag,
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
