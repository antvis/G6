import { uniqueId, deepMix, isString } from '@antv/util';
import { createDom, modifyCSS } from '@antv/dom-util';
import { Canvas, CanvasLike } from '@antv/g';
import { Plugin as Base, IPluginBaseConfig } from '../../../types/plugin';
import { createCanvas } from '../../../util/canvas';
import { IGraph } from 'types';

/** Define configuration types for image and text watermarks */
type ImageWaterMarkerConfig = {
  /**  URL of the image used as the watermark. */
  imgURL: string;
  /** Width of the image watermark in pixels. */
  width: number;
  /** Height of the image watermark in pixels. */
  height: number;
  /** Horizontal position of the image watermark on the canvas. */
  x: number;
  /** Vertical position of the image watermark on the canvas. */
  y: number;
  /** Rotation angle of the image watermark in degrees (0 to 360). */
  rotate: number;
};
type TextWaterMarkerConfig = {
  /** Text or an array of texts to be used as the watermark content. */
  texts: string | string[];
  /** Horizontal position of the text watermark on the canvas. */
  x: number;
  /** Vertical position of the text watermark on the canvas. */
  y: number;
  /** Line height between multiple lines of text in pixels. */
  lineHeight: number;
  /** Rotation angle of the text watermark in degrees (0 to 360). */
  rotate: number;
  /** Font size of the text in pixels. */
  fontSize: number;
  /**  Font family used for the text (e.g., "Microsoft YaHei"). */
  fontFamily: string;
  /**  Text fill color (e.g., "rgba(0, 0, 0, 0.1)"). */
  fill: string;
  /** Text baseline alignment (e.g., "Middle"). */
  baseline: string;
};

/** Define configuration types for watermarks */
export interface WaterMarkerConfig extends IPluginBaseConfig {
  /** (Optional) The CSS class name applied to the watermark container. */
  className?: string;
  /** (Optional) The width of the watermark canvas in pixels. */
  width?: number;
  /** (Optional) The height of the watermark canvas in pixels. */
  height?: number;
  /** (Optional) The mode of the watermark, either 'image' or 'text'. */
  mode?: 'image' | 'text';
  /** (Optional) The position of the watermark, default: under the main canvas*/
  position?: 'top' | 'mid' | 'bottom';
  /** (Optional) Configuration for an image watermark (See ImageWaterMarkerConfig). */
  image?: ImageWaterMarkerConfig;
  /** (Optional) Configuration for a text watermark (See TextWaterMarkerConfig). */
  text?: TextWaterMarkerConfig;
}

export class WaterMarker extends Base {
  private container: HTMLDivElement;
  private canvas: Canvas;

  constructor(options?: WaterMarkerConfig) {
    super(options);
  }

  public getDefaultCfgs(): WaterMarkerConfig {
    return {
      key: `watermarker-${uniqueId()}`,
      container: null,
      className: 'g6-watermarker',
      mode: 'image',
      width: 150,
      height: 100,
      position: 'bottom',
      image: {
        imgURL:
          'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg',
        x: 0,
        y: 0,
        width: 94,
        height: 28,
        rotate: 0,
      },
      text: {
        texts: 'AntV',
        x: 0,
        y: 60,
        lineHeight: 20,
        rotate: 20,
        fontSize: 14,
        fontFamily: 'Microsoft YaHei',
        fill: 'rgba(0, 0, 0, 0.1)',
        baseline: 'Middle',
      },
    };
  }

  /**
   * Initialize the WaterMarker plugin.
   */
  public init(graph: IGraph) {
    super.init(graph);
    const promise = this.initCanvas();
    promise.then(() => {
      this.updateWaterMarker();
    });
  }

  /**
   * Initialize the canvas for watermark rendering.
   */
  public initCanvas() {
    const { graph, options } = this;
    const { width, height } = options;
    let parentNode = options.container;
    let container: HTMLDivElement;

    if (isString(parentNode)) {
      parentNode = document.getElementById(parentNode) as HTMLDivElement;
    }
    if (parentNode) {
      container = parentNode;
    } else {
      container = graph.container as HTMLDivElement;
    }
    if (!container.style.position) {
      container.style.position = 'relative';
    }

    this.canvas = createCanvas('canvas', container, width, height);
    this.container = container;
    return this.canvas.ready;
  }

  /**
   * Update the watermark based on the chosen mode (image or text).
   */
  public updateWaterMarker() {
    switch (this.options.mode) {
      case 'image':
        this.setImageWaterMarker();
        break;
      case 'text':
        this.setTextWaterMarker();
        break;
      default:
        this.setImageWaterMarker();
        break;
    }
  }

  /**
   * Render an image watermark on the canvas.
   */
  public setImageWaterMarker() {
    const { container, canvas, options } = this;
    const { className, image, position } = options;
    const { imgURL, x, y, width, height, rotate } = image;

    if (canvas) canvas.destroy();

    const canvasContextService = canvas.getContextService();
    (canvasContextService.getDomElement() as any).style.display = 'none';
    const ctx = canvasContextService.getContext() as any;
    ctx.rotate((-rotate * Math.PI) / 180);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imgURL;
    img.onload = async () => {
      ctx.drawImage(img, x, y, width, height);
      ctx.rotate((rotate * Math.PI) / 180);
      let dataURL = '';
      await canvasContextService
        .toDataURL({ type: 'image/png' })
        .then((url) => {
          dataURL = url;
        });
      let box = document.querySelector(`.${className}`) as HTMLElement;
      if (!box) {
        box = document.createElement('div');
        box.className = className;
      }
      if (canvas) {
        box.style.cssText = `background-image: url(${dataURL});background-repeat:repeat;position:absolute;top:0;bottom:0;left:0;right:0;pointer-events:none;`;
        let canvas = this.graph.canvas.getContextService().getDomElement() as any;
        let transientCanvas = this.graph.transientCanvas
          .getContextService()
          .getDomElement() as any;
        container.removeChild(canvas);
        container.removeChild(transientCanvas);
        switch (position) {
          case 'top':
            container.appendChild(canvas);
            container.appendChild(transientCanvas);
            container.appendChild(box);
            break;
          case 'mid':
            container.appendChild(canvas);
            container.appendChild(box);
            container.appendChild(transientCanvas);
            break;
          case 'bottom':
          default:
            container.appendChild(box);
            container.appendChild(canvas);
            container.appendChild(transientCanvas);
            break;
        }
      }
    };
  }

  /**
   * Render a text watermark on the canvas.
   */
  public async setTextWaterMarker() {
    const { container, canvas, options } = this;
    const { text, className, position } = options;
    const {
      rotate,
      fill,
      fontFamily,
      fontSize,
      baseline,
      x,
      y,
      lineHeight,
      texts,
    } = text;

    if (canvas) canvas.destroy();

    const canvasContextService = canvas.getContextService();
    (canvasContextService.getDomElement() as any).style.display = 'none';
    const ctx = canvasContextService.getContext() as any;
    ctx.rotate((-rotate * Math.PI) / 180);
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = fill;
    ctx.textBaseline = baseline;
    let displayTexts = isString(texts) ? [texts] : texts;
    for (let i = displayTexts.length - 1; i >= 0; i--) {
      ctx.fillText(displayTexts[i], x, y + i * lineHeight);
    }
    ctx.rotate((rotate * Math.PI) / 180);
    let dataURL = '';
    await canvasContextService.toDataURL({ type: 'image/png' }).then((url) => {
      dataURL = url;
    });

    let box = document.querySelector(`.${className}`) as HTMLElement;
    if (!box) {
      box = document.createElement('div');
      box.className = className;
    }
    if(canvas){
      box.style.cssText = `background-image: url(${dataURL});background-repeat:repeat;position:absolute;top:0;bottom:0;left:0;right:0;pointer-events:none;`;
      let canvas = this.graph.canvas.getContextService().getDomElement() as any;
      let transientCanvas = this.graph.transientCanvas
        .getContextService()
        .getDomElement() as any;
      container.removeChild(canvas);
      container.removeChild(transientCanvas);
      switch (position) {
        case 'top':
          container.appendChild(canvas);
          container.appendChild(transientCanvas);
          container.appendChild(box);
          break;
        case 'mid':
          container.appendChild(canvas);
          container.appendChild(box);
          container.appendChild(transientCanvas);
          break;
        case 'bottom':
        default:
          container.appendChild(box);
          container.appendChild(canvas);
          container.appendChild(transientCanvas);
          break;
      }
    }
  }

  /**
   * Destroy the WaterMarker and remove it from the container.
   */
  public destroy() {
    const { canvas, options } = this;
    const { className } = options;

    let parentNode = options.container;
    let container: HTMLDivElement;

    if (!parentNode) {
      container = this.graph.container as HTMLDivElement;
    }
    if (isString(container)) {
      container = document.getElementById(container) as HTMLDivElement;
    }

    const box = document.querySelector(`.${className}`) as HTMLElement;
    container.removeChild(box);
    canvas.destroy();
  }
}
