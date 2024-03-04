import type { G6Spec } from '@/src';
import { Graph } from '@/src';
import type { Canvas } from '@/src/runtime/canvas';
import type { IAnimation } from '@antv/g';
import type { Controller, GUI } from 'lil-gui';

type TestCaseContext = {
  container: Canvas;
  animation: boolean;
  theme: string;
};

export type TestCase = StaticTestCase | AnimationTestCase;

export interface StaticTestCase extends BaseTestCase {
  (context: TestCaseContext): Promise<void>;
}

export interface AnimationTestCase extends BaseTestCase {
  (context: TestCaseContext): Promise<IAnimation | null>;
  /**
   * <zh/> 检查的动画时间
   *
   * <en/> Animation time to check
   */
  times: number[];
}

export interface BaseTestCase {
  only?: boolean;
  skip?: boolean;
  form?: (gui: GUI) => Controller[];
}

export interface STDTestCase extends BaseTestCase {
  (context: STDTestCaseContext): Promise<Graph>;
}

export type STDTestCaseContext = G6Spec;
