import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Plugin as Plugin3D } from '@antv/g-plugin-3d';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import type { CanvasOptions } from '@antv/g6';

export const renderer: CanvasOptions['renderer'] = (layer) => {
  if (layer === 'label') {
    return new CanvasRenderer();
  }

  const renderer = new WebGLRenderer();

  if (layer === 'main') {
    renderer.registerPlugin(new Plugin3D());
  }

  return renderer;
};
