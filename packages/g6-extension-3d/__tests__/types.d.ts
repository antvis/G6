import type { G6Spec, Graph } from '@antv/g6';
import type { Controller, GUI } from 'lil-gui';

declare global {
  export interface TestCase {
    (context: G6Spec): Promise<Graph>;
    form?: (gui: GUI) => Controller[];
  }

  export type TestContext = G6Spec;
}
