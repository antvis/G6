import type { Graph } from '@/src';
import { CustomEvent } from '@antv/g';

export function dispatchCanvasEvent(graph: Graph, type: string, data?: any) {
  // @ts-expect-error private method
  const canvas = graph.context.canvas.document;
  canvas.dispatchEvent(new CustomEvent(type, data));
}
