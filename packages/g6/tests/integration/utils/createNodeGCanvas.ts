import { Canvas, resetEntityCounter } from '@antv/g';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Plugin as DragAndDropPlugin } from '@antv/g-plugin-dragndrop';
import { OffscreenCanvasContext, measureText } from './offscreenCanvasContext';

export function createNodeGCanvas(
  dom: HTMLDivElement,
  width: number,
  height: number,
): Canvas {
  resetEntityCounter();
  // setMockMeasureTextWidth(measureText);
  const offscreenNodeCanvas = {
    getContext: () => context,
  } as unknown as HTMLCanvasElement;
  const context = new OffscreenCanvasContext(offscreenNodeCanvas);

  const renderer = new SVGRenderer();
  // Remove html plugin to ssr.
  const htmlRendererPlugin = renderer.getPlugin('html-renderer');
  renderer.unregisterPlugin(htmlRendererPlugin);
  const domInteractionPlugin = renderer.getPlugin('dom-interaction');
  renderer.unregisterPlugin(domInteractionPlugin);
  renderer.registerPlugin(
    new DragAndDropPlugin({ dragstartDistanceThreshold: 10 }),
  );
  return new Canvas({
    container: dom,
    width,
    height,
    // @ts-ignore
    renderer,
    document: dom.ownerDocument,
    offscreenCanvas: offscreenNodeCanvas as any,
  });
}
