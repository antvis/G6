import type { G6Spec, Graph } from '@/src';
import type { Controller, GUI } from 'lil-gui';

declare global {
  export interface TestCase {
    (context: G6Spec): Promise<Graph>;
    form?: (gui: GUI) => Controller[];
  }

  export type TestContext = G6Spec;

  export module '*.svg' {
    const content: string;
    export default content;
  }
}
