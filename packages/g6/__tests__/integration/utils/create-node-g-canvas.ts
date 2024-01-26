import { resetEntityCounter } from '@antv/g';
import { Plugin as DragAndDropPlugin } from '@antv/g-plugin-dragndrop';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Canvas } from '../../../src/runtime/canvas';
import { OffscreenCanvasContext } from './offscreen-canvas-context';

export function createNodeGCanvas(dom?: HTMLDivElement, width = 500, height = 500) {
  const container = dom || document.createElement('div');
  container.style.width = `${width}px`;
  container.style.height = `${height}px`;

  resetEntityCounter();
  const offscreenNodeCanvas = {
    getContext: () => context,
  } as unknown as HTMLCanvasElement;
  const context = new OffscreenCanvasContext(offscreenNodeCanvas);

  const renderer = new SVGRenderer();
  renderer.registerPlugin(new DragAndDropPlugin({ dragstartDistanceThreshold: 10 }));
  return new Canvas({
    container,
    width,
    height,
    renderer: () => new SVGRenderer(),
    // @ts-expect-error offscreenCanvas is not in the type definition
    document: container.ownerDocument,
    offscreenCanvas: offscreenNodeCanvas,
  });
}
