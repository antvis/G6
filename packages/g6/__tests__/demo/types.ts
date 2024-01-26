import type { IRenderer } from '@antv/g';
import type { Canvas } from '../../src/runtime/canvas';
import type { CanvasLayer } from '../../src/types/canvas';

type TestCaseContext = {
  canvas?: Canvas;
  container: HTMLElement;
  renderer?: (layer: CanvasLayer) => IRenderer;
  width: number;
  height: number;
};

export type TestCase = {
  (context: TestCaseContext): Promise<void>;
  only?: boolean;
  skip?: boolean;
  preprocess?: () => Promise<void>;
  postprocess?: () => Promise<void>;
};
