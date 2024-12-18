import { Renderer } from '@antv/g-canvas';
import { Canvas as G6Canvas } from '@antv/g6';
import type { Canvas as NodeCanvas } from 'canvas';
import { createCanvas as createNodeCanvas, Image as NodeImage } from 'canvas';
import type { Options } from './types';

/**
 * <zh/> 创建画布
 *
 * <en/> create canvas
 * @param options <zh/> options 画布配置 | <en/> options canvas configuration
 * @returns <zh/> [G6 画布, NodeCanvas 画布] | <en/> [G6Canvas, NodeCanvas]
 */
export function createCanvas(options: Options): [G6Canvas, NodeCanvas] {
  const { width, height, background = 'white', outputType, devicePixelRatio = 2 } = options;
  const nodeCanvas = createNodeCanvas(width, height, outputType as any);
  const offscreenNodeCanvas = createNodeCanvas(1, 1);

  const g6Canvas = new G6Canvas({
    width,
    height,
    background,
    // @ts-expect-error missing types
    canvas: nodeCanvas as any,
    offscreenCanvas: offscreenNodeCanvas as any,
    devicePixelRatio,
    enableMultiLayer: false,
    createImage: () => new NodeImage(),
    renderer: () => {
      const renderer = new Renderer();
      const htmlRendererPlugin = renderer.getPlugin('html-renderer');
      const domInteractionPlugin = renderer.getPlugin('dom-interaction');
      renderer.unregisterPlugin(htmlRendererPlugin);
      renderer.unregisterPlugin(domInteractionPlugin);
      return renderer;
    },
  });

  return [g6Canvas, nodeCanvas];
}
