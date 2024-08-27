import type { Graph } from '@/src';
import { CommonEvent } from '@/src';

export function emitWheelEvent(
  graph: Graph,
  options?: { deltaX: number; deltaY: number; clientX: number; clientY: number },
) {
  const dom = graph.getCanvas().getContextService().getDomElement();
  dom?.dispatchEvent(new WheelEvent(CommonEvent.WHEEL, options));
}
