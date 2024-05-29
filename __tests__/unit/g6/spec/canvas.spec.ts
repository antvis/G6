import { Renderer } from '@antv/g-canvas';
import type { CanvasOptions } from '@antv/g6';

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
