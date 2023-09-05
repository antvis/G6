import { Canvas } from '@antv/g';
import { RendererName } from '../../src/types/render';

export type TestCaseContext<ExtendedParams = any> = Partial<{
  container: HTMLElement;
  renderer: RendererName;
  canvas: Canvas;
  transientCanvas: Canvas;
  backgroundCanvas: Canvas;
  width: number;
  height: number;
  extendedParams: ExtendedParams;
}>;
