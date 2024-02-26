import type { Canvas } from '@/src/runtime/canvas';
import type { IAnimation } from '@antv/g';

type TestCaseContext = {
  canvas: Canvas;
  animation: boolean;
  /**
   * <zh/> 测试用例断言
   *
   * <en/> Test case assertion
   */
  expect?: jest.Expect;
  /**
   * <zh/> 测试用例手动比对快照
   *
   * <en/> Manually compare snapshots of test cases
   */
  toMatchSVGSnapshot?: (suffix: string) => Promise<void>;
  /**
   * <zh/> 测试用例环境
   *
   * <en/> Test case environment
   */
  env: 'test' | 'dev';
  /**
   * <zh/> 测试用例主题
   *
   * <en/> Test case theme
   */
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
  /**
   * <zh/> 在测试用例执行前执行的函数
   *
   * <en/> Function to be executed before the test case is executed
   * @returns
   */
  preprocess?: () => Promise<void>;
  /**
   * <zh/> 在测试用例执行后执行的函数
   *
   * <en/> Function to be executed after the test case is executed
   * @returns
   */
  postprocess?: () => Promise<void>;
  form?: { label?: string; type: string; options?: Record<string, unknown>; onload?: (el: HTMLElement) => void }[];
}
