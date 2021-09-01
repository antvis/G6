// import { Canvas as GCanvas } from '@antv/g-canvas';
import { Canvas } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { AbstractGraph } from '../../src';

export default class Graph extends AbstractGraph {
  constructor(cfg) {
    super(cfg);
  }

  initEventController() {}

  initLayoutController() {}

  initCanvas() {
    let container: string | HTMLElement | Element | null = this.get('container');
    if (typeof container === 'string') {
      container = document.getElementById(container);
      this.set('container', container);
    }

    if (!container) {
      throw new Error('invalid container');
    }

    const { clientWidth, clientHeight } = container;

    const width: number = this.get('width') || clientWidth;
    const height: number = this.get('height') || clientHeight;

    const canvasCfg: any = {
      container,
      width,
      height,
    };
    const pixelRatio = this.get('pixelRatio');
    if (pixelRatio) {
      canvasCfg.pixelRatio = pixelRatio;
    }

    // const webglRenderer = new WebGLRenderer();
    const canvasRenderer = new CanvasRenderer();
    const svgRenderer = new SVGRenderer();

    // create a canvas
    const canvas = new Canvas({
      // ...{ renderer: webglRenderer },
      // ...{ renderer: svgRenderer },
      ...{ renderer: canvasRenderer },
      ...canvasCfg,
    });

    this.set('canvas', canvas);
  }
  initPlugins() {}
}
