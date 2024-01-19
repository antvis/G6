import type { Cursor, DataURLOptions, CanvasConfig as GCanvasConfig, IRenderer, PointLike } from '@antv/g';
import { Canvas as GCanvas } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Plugin as DragNDropPlugin } from '@antv/g-plugin-dragndrop';
import type { CanvasOption } from '../spec/canvas';
import { createDOM } from '../utils/dom';
import { createPromise } from '../utils/promise';
import type { Layer } from './layered-canvas/types';

export interface CanvasConfig
  extends Pick<GCanvasConfig, 'container' | 'devicePixelRatio' | 'width' | 'height' | 'background' | 'cursor'> {
  renderer: CanvasOption['renderer'];
}

/**
 * @deprecated this canvas will be replace by layered canvas
 */
export class Canvas {
  public get main() {
    return this.canvas.main;
  }
  public get label() {
    return this.canvas.label;
  }
  public get transient() {
    return this.canvas.transient;
  }
  public get transientLabel() {
    return this.canvas.transientLabel;
  }
  public get background() {
    return this.canvas.background;
  }

  public ready: Promise<void>;
  protected resolveReady: () => void;

  // @ts-expect-error will be set in constructor
  public canvas: Record<Layer, GCanvas> = {};

  // @ts-expect-error will be set in constructor
  public renderers: Record<Layer, IRenderer> = {};

  protected config: CanvasConfig;

  protected get init() {
    return Promise.all(Object.values(this.canvas).map((canvas) => canvas.ready));
  }

  public forEach(fn: (name: string, canvas: GCanvas) => void) {
    Object.entries(this.canvas).forEach(([name, canvas]) => fn(name, canvas));
  }

  private initReady() {
    const { promise, resolve } = createPromise<void>();
    this.ready = promise;
    this.resolveReady = resolve;
  }

  constructor(config: CanvasConfig) {
    this.config = config;
    this.initReady();

    const { renderer: getRenderer, ...restConfig } = config;
    const names: Layer[] = ['main', 'label', 'transient', 'transientLabel', 'background'];
    names.forEach((name) => {
      const renderer = getRenderer?.(name) || new CanvasRenderer();

      this.renderers[name] = renderer;

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

      this.canvas[name] = new GCanvas({
        renderer,
        supportsMutipleCanvasesInOneContainer: true,
        ...restConfig,
      });
    });

    this.handleReady();
  }

  private handleReady() {
    this.init
      .then(() => {
        Object.entries(this.canvas).forEach(([name, canvas]) => {
          const $domElement = canvas.getContextService().getDomElement() as unknown as HTMLElement;

          $domElement.style.position = 'absolute';
          $domElement.style.outline = 'none';
          $domElement.tabIndex = 1;

          if (name !== 'main') {
            $domElement.style.pointerEvents = 'none';
          }
        });
      })
      .then(() => {
        this.resolveReady();
      });
  }

  public getRendererType(layer: Layer = 'main') {
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
    return (this.main.context as any)?.deviceRendererPlugin?.getDevice();
  }

  public getConfig() {
    return this.config;
  }

  public setCursor(cursor: Cursor) {
    this.forEach((_, canvas) => {
      canvas.setCursor(cursor);
    });
  }

  public resize(width: number, height: number) {
    this.forEach((_, canvas) => {
      canvas.resize(width, height);
    });
  }

  public getCamera() {
    return this.main.getCamera();
  }

  public appendChild(...args: Parameters<GCanvas['appendChild']>) {
    return this.main.appendChild(...args);
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

  public async toDataURL(options?: Partial<DataURLOptions>) {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const { width, height, renderer: getRenderer } = this.config;

    const container: HTMLElement = createDOM('<div id="virtual-image"></div>');

    const $canvas = new GCanvas({
      width,
      height,
      renderer: getRenderer('main'),
      devicePixelRatio,
      container,
      background: this.background.getConfig().background,
    });

    await $canvas.ready;

    $canvas.appendChild(this.background.getRoot().cloneNode(true));
    $canvas.appendChild(this.main.getRoot().cloneNode(true));

    // Handle label canvas
    const label = this.label.getRoot().cloneNode(true);
    const originCanvasPosition = $canvas.viewport2Canvas({ x: 0, y: 0 });
    const currentCanvasPosition = this.main.viewport2Canvas({ x: 0, y: 0 });
    label.translate([
      currentCanvasPosition.x - originCanvasPosition.x,
      currentCanvasPosition.y - originCanvasPosition.y,
    ]);
    label.scale(1 / this.main.getCamera().getZoom());
    $canvas.appendChild(label);

    $canvas.appendChild(this.transient.getRoot().cloneNode(true));

    const camera = this.main.getCamera();
    const $camera = $canvas.getCamera();
    $camera.setZoom(camera.getZoom());
    $camera.setPosition(camera.getPosition());
    $camera.setFocalPoint(camera.getFocalPoint());

    const contextService = $canvas.getContextService();

    return contextService.toDataURL(options);
  }

  public destroy() {
    this.forEach((_, canvas) => {
      const camera = canvas.getCamera();
      // @ts-expect-error landmark is private
      if (camera.landmarks?.length) {
        camera.cancelLandmarkAnimation();
      }

      canvas.destroy();
    });
  }
}
