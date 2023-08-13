import Graph from '../../../src/runtime/graph';
import { JSDOM } from 'jsdom';

export function triggerEvent(
  graph: Graph<any, any>,
  type: string,
  clientX: number,
  clientY: number,
) {
  const dom = new JSDOM();
  // TODO: TouchEvent
  // const isMouseEvent = type.startsWith('mouse');
  // const isTouchEvent = type.startsWith('touch');

  const event = new dom.window.MouseEvent(type, {
    clientX,
    clientY,
  });

  // event.target is a readonly property.
  Object.defineProperty(event, 'target', {
    value: graph.canvas.getContextService().getDomElement(),
  });
  const renderingService = graph.canvas.getRenderingService();

  if (type === 'mousedown') {
    renderingService.hooks.pointerDown.call(event);
  } else if (type === 'mouseup') {
    renderingService.hooks.pointerUp.call(event);
  } else if (type === 'mousemove') {
    renderingService.hooks.pointerMove.call(event);
  } else if (type === 'mouseout') {
    renderingService.hooks.pointerOut.call(event);
  } else if (type === 'mouseover') {
    renderingService.hooks.pointerOver.call(event);
  }
}
