import { Canvas } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';

type Options = {
  container: HTMLElement;
  renderer: string;
  width: number;
  height: number;
};

/**
 * create g-canvas instance
 * @param options canvas options
 * @returns g-canvas
 */
export function createGCanvas(options: Options): Canvas {
  const { container, renderer, width, height } = options;
  const getRenderer = () => {
    switch (renderer) {
      case 'webgl':
        return new WebGLRenderer();
      case 'svg':
        return new SVGRenderer();
      default:
        return new CanvasRenderer();
    }
  };

  return new Canvas({
    container,
    width,
    height,
    renderer: getRenderer(),
    document: container.ownerDocument,
  });
}
