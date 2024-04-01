import type {
  Cursor,
  DataURLOptions,
  DisplayObject,
  CanvasConfig as GCanvasConfig,
  IRenderer,
  PointLike,
} from '@antv/g';
import { Canvas as GCanvas } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Plugin as DragNDropPlugin } from '@antv/g-plugin-dragndrop';
import { createDOM, isFunction, isString } from '@antv/util';
import type { CanvasOptions } from '../spec/canvas';
import type { CanvasLayer } from '../types/canvas';
import { getCombinedBBox } from '../utils/bbox';

export interface CanvasConfig
  extends Pick<GCanvasConfig, 'container' | 'devicePixelRatio' | 'width' | 'height' | 'cursor'> {
  renderer?: CanvasOptions['renderer'];
  background?: string;
}

/**
 * @deprecated this canvas will be replace by layered canvas
 */
export class Canvas {
  protected config: CanvasConfig;

  public background!: GCanvas;
  public main!: GCanvas;
  public label!: GCanvas;
  public transient!: GCanvas;
  public transientLabel!: GCanvas;

  public get canvas() {
    return {
      main: this.main,
      label: this.label,
      transient: this.transient,
      transientLabel: this.transientLabel,
      background: this.background,
    };
  }

  public get document() {
    return this.main.document;
  }

  public renderers!: Record<CanvasLayer, IRenderer>;

  constructor(config: CanvasConfig) {
    this.config = config;
  }

  public async init() {
    const allCanvas = Object.entries(this.canvas);

    if (allCanvas.every(([, canvas]) => !canvas)) {
      const { renderer: getRenderer, background, ...restConfig } = this.config;
      const names: CanvasLayer[] = ['main', 'label', 'transient', 'transientLabel', 'background'];

      const { renderers, canvas } = names.reduce(
        (acc, name) => {
          const renderer = isFunction(getRenderer) ? getRenderer?.(name) : new CanvasRenderer();

          renderer.registerPlugin(
            new DragNDropPlugin({
              isDocumentDraggable: true,
              isDocumentDroppable: true,
              dragstartDistanceThreshold: 10,
              dragstartTimeThreshold: 100,
            }),
          );

          if (name !== 'main') {
            renderer.unregisterPlugin(renderer.getPlugin('dom-interaction'));
          }

          const canvas = new GCanvas({
            renderer,
            supportsMutipleCanvasesInOneContainer: true,
            ...restConfig,
          });

          acc.renderers[name] = renderer;
          acc.canvas[name] = canvas;
          this[name] = canvas;

          return acc;
        },
        { renderers: {}, canvas: {} } as {
          renderers: Record<CanvasLayer, IRenderer>;
          canvas: Record<CanvasLayer, GCanvas>;
        },
      );

      this.renderers = renderers;

      Object.entries(canvas).forEach(([name, canvas]) => {
        const domElement = canvas.getContextService().getDomElement() as unknown as HTMLElement;

        domElement.style.position = 'absolute';
        domElement.style.outline = 'none';
        domElement.tabIndex = 1;

        if (name !== 'main') domElement.style.pointerEvents = 'none';
      });
    }

    this.setBackground();

    return Promise.all(Object.values(this.canvas).map((canvas) => canvas.ready));
  }

  public getRendererType(layer: CanvasLayer = 'main') {
    const plugins = this.renderers[layer].getPlugins();

    for (const plugin of plugins) {
      if (plugin.name === 'canvas-renderer') return 'canvas';
      if (plugin.name === 'svg-renderer') return 'svg';
      if (plugin.name === 'device-renderer') return 'gpu';
    }

    return 'unknown';
  }

  public get context() {
    return this.main.context;
  }

  public getDevice() {
    // @ts-expect-error deviceRendererPlugin is private
    return this.main.context?.deviceRendererPlugin?.getDevice();
  }

  public getConfig() {
    return this.config;
  }

  public setBackground(background = this.config.background) {
    const container = this.getContainer();
    if (container && background) {
      container.style.background = background;
      container.style.transition = 'background 0.5s';
    }
  }

  public setCursor(cursor: Cursor) {
    Object.values(this.canvas).forEach((canvas) => {
      canvas.setCursor(cursor);
    });
  }

  public getSize(): [number, number] {
    return [this.config.width || 0, this.config.height || 0];
  }

  public resize(width: number, height: number) {
    this.config.width = width;
    this.config.height = height;
    Object.values(this.canvas).forEach((canvas) => {
      canvas.resize(width, height);
    });
  }

  public getCamera() {
    return this.main.getCamera();
  }

  public getRoot() {
    return this.document.documentElement;
  }

  public getBounds() {
    return getCombinedBBox(
      Object.values(this.canvas)
        .map((canvas) => canvas.document.documentElement)
        .filter((el) => el.childNodes.length > 0)
        .map((el) => el.getBounds()),
    );
  }

  public getContainer() {
    const container = this.config.container!;

    return isString(container) ? document.getElementById(container!) : container;
  }

  public appendChild<T extends DisplayObject>(child: T): T {
    const layer = (child.style?.$layer || 'main') as CanvasLayer;

    return this[layer].appendChild(child);
  }

  public getContextService() {
    return this.main.getContextService();
  }

  public viewport2Client(viewport: PointLike) {
    return this.main.viewport2Client(viewport);
  }

  public viewport2Canvas(viewport: PointLike) {
    return this.main.viewport2Canvas(viewport);
  }

  public client2Viewport(client: PointLike) {
    return this.main.client2Viewport(client);
  }

  public canvas2Viewport(canvas: PointLike) {
    return this.main.canvas2Viewport(canvas);
  }

  public async toDataURL(options: Partial<DataURLOptions> = {}) {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const { width, height, renderer: getRenderer } = this.config;

    const container: HTMLElement = createDOM('<div id="virtual-image"></div>');

    const offscreenCanvas = new GCanvas({
      width,
      height,
      renderer: getRenderer?.('main') || new CanvasRenderer(),
      devicePixelRatio,
      container,
      background: this.background.getConfig().background,
    });

    await offscreenCanvas.ready;

    offscreenCanvas.appendChild(this.background.getRoot().cloneNode(true));
    offscreenCanvas.appendChild(this.main.getRoot().cloneNode(true));

    // Handle label canvas
    const label = this.label.getRoot().cloneNode(true);
    const originCanvasPosition = offscreenCanvas.viewport2Canvas({ x: 0, y: 0 });
    const currentCanvasPosition = this.main.viewport2Canvas({ x: 0, y: 0 });
    label.translate([
      currentCanvasPosition.x - originCanvasPosition.x,
      currentCanvasPosition.y - originCanvasPosition.y,
    ]);
    label.scale(1 / this.main.getCamera().getZoom());
    offscreenCanvas.appendChild(label);

    offscreenCanvas.appendChild(this.transient.getRoot().cloneNode(true));

    const camera = this.main.getCamera();
    const offscreenCamera = offscreenCanvas.getCamera();
    offscreenCamera.setZoom(camera.getZoom());
    offscreenCamera.setPosition(camera.getPosition());
    offscreenCamera.setFocalPoint(camera.getFocalPoint());

    const contextService = offscreenCanvas.getContextService();

    return contextService.toDataURL(options);
  }

  public destroy() {
    this.config = {};
    // @ts-expect-error force delete
    this.renderers = {};
    Object.entries(this.canvas).forEach(([name, canvas]) => {
      const camera = canvas.getCamera();
      // @ts-expect-error landmark is private
      if (camera.landmarks?.length) {
        camera.cancelLandmarkAnimation();
      }

      canvas.destroy();
      // @ts-expect-error force delete
      this[name] = undefined;
    });
  }
}
