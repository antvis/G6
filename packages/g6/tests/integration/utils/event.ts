import { Graph } from '../../../src/runtime/graph';

/**
 *
 * @param graph
 * @param type
 * @param clientX
 * @param clientY
 */
export function triggerEvent(graph: Graph<any, any>, type: string, clientX: number, clientY: number) {
  // TODO: TouchEvent
  // const isMouseEvent = type.startsWith('mouse');
  // const isTouchEvent = type.startsWith('touch');

  const event = new document.defaultView!.MouseEvent(type, {
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
