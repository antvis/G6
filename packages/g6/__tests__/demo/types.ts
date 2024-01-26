import type { Canvas } from '../../src/runtime/canvas';

type TestCaseContext = {
  canvas: Canvas;
};

export type TestCase = {
  (context: TestCaseContext): Promise<void>;
  only?: boolean;
  skip?: boolean;
  preprocess?: () => Promise<void>;
  postprocess?: () => Promise<void>;
};
