import type { G6Spec } from '@/src';
import { Graph as G6Graph } from '@/src';
import { Renderer as SVGRenderer } from '@antv/g-svg';

export class Graph extends G6Graph {
  static defaultOptions: G6Spec = {
    ...G6Graph.defaultOptions,
    renderer: () => new SVGRenderer() as any,
  };
}
