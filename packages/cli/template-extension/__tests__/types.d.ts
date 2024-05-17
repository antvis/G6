import type { Graph, GraphOptions } from '@antv/g6';
import type { Controller, GUI } from 'lil-gui';

declare global {
  export interface TestCase {
    (context: GraphOptions): Promise<Graph>;
    form?: (gui: GUI) => Controller[];
  }

  export type TestContext = GraphOptions;
}
