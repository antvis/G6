import type { CanvasOptions } from '@/src';
import { Renderer } from '@antv/g-canvas';

describe('spec canvas', () => {
  it('canvas', () => {
    const canvas: CanvasOptions = {
      width: 100,
      height: 100,
      renderer: () => new Renderer(),
      autoResize: true,
    };

    expect(canvas).toBeTruthy();
  });
});
