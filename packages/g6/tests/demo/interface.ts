import { Canvas } from '@antv/g';
import { RendererName } from '../../src/types/render';

export type TestCaseParams = Partial<{
  container: HTMLElement;
  renderer: RendererName;
  canvas: Canvas;
  transientCanvas: Canvas;
  backgroundCanvas: Canvas;
  width: number;
  height: number;
}>;
