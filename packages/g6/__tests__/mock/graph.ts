import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Graph as G6Graph, G6Spec } from '../../src';

export class Graph extends G6Graph {
  static defaultOptions: G6Spec = {
    ...G6Graph.defaultOptions,
    renderer: () => new SVGRenderer() as any,
  };
}
