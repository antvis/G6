import { Canvas, Group, Image, Text, TextStyleProps } from '@antv/g';
import { isString, uniqueId } from '@antv/util';
import { Graph } from '../../../types';
import { Plugin as Base, IPluginBaseConfig } from '../../../types/plugin';
import { createCanvas } from '../../../utils/canvas';

/** Define configuration types for image and text watermarks */
type ImageWaterMarkerConfig = {
  /**  URL of the image used as the watermark. */
  imgURL: string;
  /** Width of the image watermark in pixels. */
  width: number;
  /** Height of the image watermark in pixels. */
  height: number;
  /** Rotation angle of the image watermark in degrees (0 to 360). */
  rotate: number;
};
interface TextWaterMarkerConfig extends TextStyleProps {
  /** Text or an array of texts to be used as the watermark content. */
  texts: string | string[];
  /** Rotation angle of the text watermark in degrees (0 to 360). */
  rotate: number;
}

/** Define configuration types for watermarks */
export interface WaterMarkerConfig extends IPluginBaseConfig {
  /** The watermarker canvas. undefined by default means create a new canvas to draw the markers. */
  canvas?: Canvas;
  /** (Optional) The width of the watermark canvas in pixels. undefined by default, means equal to graph's width. */
  width?: number;
  /** (Optional) The height of the watermark canvas in pixels. undefined by default, means equal to graph's height. */
  height?: number;
  /** (Optional) The mode of the watermark, either 'image' or 'text'. */
  mode?: 'image' | 'text';
  /** (Optional) The position of the watermark, default: under the main canvas*/
  position?: 'top' | 'middle' | 'bottom';
  /** (Optional) Configuration for an image watermark (See ImageWaterMarkerConfig). */
  image?: Partial<ImageWaterMarkerConfig>;
  /** (Optional) Configuration for a text watermark (See TextWaterMarkerConfig). */
  text?: Partial<TextWaterMarkerConfig>;
  /** The first marker's position. [0, 0] by default. */
  begin?: [number, number];
  /** The gap of x and y between neighbor markers. [100, 100] by default. */
  separation?: [number, number];
}

export class WaterMarker extends Base {
  private container: HTMLElement;
  private canvas: Canvas;
  private canvasSize: [number, number];
  private followGraphSize: boolean;

  constructor(options?: WaterMarkerConfig) {
    super(options);
  }

  public getDefaultCfgs(): WaterMarkerConfig {
    return {
      key: `watermarker-${uniqueId()}`,
      container: null,
      canvas: undefined,
      mode: 'image',
      width: undefined,
      height: undefined,
      position: 'bottom',
      begin: [0, 0],
      separation: [100, 100],
      image: {
        imgURL: 'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg',
        width: 94,
        height: 28,
        rotate: 0,
      },
      text: {
        texts: 'AntV',
        rotate: 20,
        fontSize: 14,
        fontFamily: 'Microsoft YaHei',
        fill: 'rgba(0, 0, 0, 0.1)',
        textBaseline: 'top',
      },
    };
  }

  /**
   * Initialize the WaterMarker plugin.
   * @param graph
   */
  public init(graph: Graph) {
    super.init(graph);
    const promise = this.initCanvas();
    promise.then(() => {
      this.updateWaterMarker();
    });
  }

  public getEvents() {
    return {
      aftersetsize: this.onGraphSetSize,
    };
  }

  /**
   * Initialize the canvas for watermark rendering.
   */
  public initCanvas() {
    const { graph, options } = this;
    const { width, height, position, canvas } = options;
    let parentNode = options.container;
    let container: HTMLElement;

    const graphSize = graph.getSize();
    if (canvas) {
      this.canvas = canvas;
      this.canvasSize = [graphSize[0], graphSize[1]];
      this.followGraphSize = true;
      this.container = graph.container as HTMLDivElement;
      return canvas.ready;
    }

    if (isString(parentNode)) {
      parentNode = document.getElementById(parentNode) as HTMLElement;
    }
    if (parentNode) {
      container = parentNode;
    } else {
      container = graph.container as HTMLElement;
    }
    if (!container.style.position) {
      container.style.position = 'relative';
    }

    this.canvasSize = [width === undefined ? graphSize[0] : width, height === undefined ? graphSize[1] : height];
    this.followGraphSize = width === undefined || height === undefined;

    this.canvas = createCanvas('canvas', container, this.canvasSize[0], this.canvasSize[1]);
    const $domElement = this.canvas.getContextService().getDomElement() as unknown as HTMLElement;
    $domElement.style.position = 'fixed';
    $domElement.style.outline = 'none';
    $domElement.style.pointerEvents = 'none';
    $domElement.style.userSelect = 'none';
    this.container = container;

    const canvasEl = this.canvas.getContextService().getDomElement() as any;
    this.container.removeChild(canvasEl);
    const graphCanvasDOM = graph.canvas.getContextService().getDomElement() as any;
    const graphTransientCanvasDOM = graph.transientCanvas.getContextService().getDomElement() as any;
    switch (position) {
      case 'top':
        this.container.appendChild(canvasEl);
        break;
      case 'middle':
        this.container.insertBefore(canvasEl, graphTransientCanvasDOM);
        break;
      case 'bottom':
      default:
        this.container.insertBefore(canvasEl, graphCanvasDOM);
    }

    return this.canvas.ready;
  }

  private onGraphSetSize(e) {
    const { size } = e;
    if (!this.followGraphSize) return;
    this.canvas.resize(size[0], size[1]);
    this.updateWaterMarker();
  }

  /**
   * Update the watermark based on the chosen mode (image or text).
   */
  public updateWaterMarker() {
    switch (this.options.mode) {
      case 'text':
        this.setTextWaterMarker();
        break;
      case 'image':
      default:
        this.setImageWaterMarker();
        break;
    }
  }

  /**
   * Render an image watermark on the canvas.
   */
  public setImageWaterMarker() {
    const { canvas, options, canvasSize } = this;
    const { image, begin, separation } = options;
    const { imgURL, rotate = 0, ...imageStyles } = image;

    const currentPosition = [...begin];
    let imageBounds;
    const getRowGroup = () => {
      const rowGroup = new Group();
      while (currentPosition[0] < canvasSize[0]) {
        const imageShape = new Image({
          style: {
            ...imageStyles,
            img: imgURL,
            x: currentPosition[0],
            y: currentPosition[1],
          },
        });
        if (rotate) {
          imageShape.style.transformOrigin = 'center';
          imageShape.style.transform = `rotate(${rotate}deg)`;
        }
        if (!imageBounds) {
          imageBounds = imageShape.getLocalBounds();
        }
        rowGroup.appendChild(imageShape);
        currentPosition[0] += imageBounds.halfExtents[0] * 2 + separation[0];
      }
      return rowGroup;
    };
    while (currentPosition[1] < canvasSize[1]) {
      canvas.appendChild(getRowGroup());
      currentPosition[0] = begin[0];
      currentPosition[1] += imageBounds.halfExtents[1] * 2 + separation[1];
    }
  }

  /**
   * Render a text watermark on the canvas.
   */
  public async setTextWaterMarker() {
    const { canvas, options, canvasSize } = this;
    const { text, separation, begin } = options;
    const { texts, rotate, ...textStyles } = text;

    const currentPosition = [...begin];
    const displayTexts = isString(texts) ? [texts] : texts;
    const textContent = displayTexts.join('\n');
    let textBounds;
    const getRowGroup = () => {
      const rowGroup = new Group();
      while (currentPosition[0] < canvasSize[0]) {
        const textShape = new Text({
          style: {
            ...textStyles,
            text: textContent,
            x: currentPosition[0],
            y: currentPosition[1],
          },
        });
        if (rotate) {
          textShape.style.transform = `rotate(${rotate}deg)`;
        }
        if (!textBounds) {
          textBounds = textShape.getLocalBounds();
        }
        rowGroup.appendChild(textShape);
        currentPosition[0] += textBounds.halfExtents[0] * 2 + separation[0];
      }
      return rowGroup;
    };
    while (currentPosition[1] < canvasSize[1]) {
      canvas.appendChild(getRowGroup());
      currentPosition[0] = begin[0];
      currentPosition[1] += textBounds.halfExtents[1] * 2 + separation[1];
    }
  }

  /**
   * Destroy the WaterMarker and remove it from the container.
   */
  public destroy() {
    const { canvas, options } = this;

    const parentNode = options.container;
    let container: HTMLElement;

    if (!parentNode) {
      container = this.graph.container as HTMLElement;
    }
    if (isString(container)) {
      container = document.getElementById(container) as HTMLElement;
    }

    if (container !== this.graph.container) {
      container.remove();
    }

    canvas.destroy();
  }
}
