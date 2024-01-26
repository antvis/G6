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
import { createDOM, isFunction } from '@antv/util';
import type { CanvasOptions } from '../spec/canvas';
import type { CanvasLayer } from '../types/canvas';

export interface CanvasConfig
  extends Pick<GCanvasConfig, 'container' | 'devicePixelRatio' | 'width' | 'height' | 'background' | 'cursor'> {
  renderer?: CanvasOptions['renderer'];
}

/**
 * @deprecated this canvas will be replace by layered canvas
 */
export class Canvas {
  public ready: Promise<void>;
  protected resolveReady: () => void;

  protected config: CanvasConfig;

  public background: GCanvas;
  public main: GCanvas;
  public label: GCanvas;
  public transient: GCanvas;
  public transientLabel: GCanvas;

  public get canvas() {
    return {
      main: this.main,
      label: this.label,
      transient: this.transient,
      transientLabel: this.transientLabel,
      background: this.background,
    };
  }

  public renderers: Record<CanvasLayer, IRenderer>;

  private initReady() {
    this.ready = new Promise<void>((resolve) => {
      this.resolveReady = resolve;
    });
  }

  constructor(config: CanvasConfig) {
    this.config = config;
    this.initReady();
    const { renderer: getRenderer, ...restConfig } = config;
    const names: CanvasLayer[] = ['main', 'label', 'transient', 'transientLabel', 'background'];

    const renderers = names.map((name) => {
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

      this[name] = new GCanvas({
        renderer,
        supportsMutipleCanvasesInOneContainer: true,
        ...restConfig,
      });

      return [name, renderer];
    });

    this.renderers = Object.fromEntries(renderers);

    Promise.all(Object.values(this.canvas).map((canvas) => canvas.ready))
      .then(() => {
        Object.entries(this.canvas).forEach(([name, canvas]) => {
          const $domElement = canvas.getContextService().getDomElement() as unknown as HTMLElement;

          $domElement.style.position = 'absolute';
          $domElement.style.outline = 'none';
          $domElement.tabIndex = 1;

          if (name !== 'main') $domElement.style.pointerEvents = 'none';
        });
      })
      .then(() => {
        this.resolveReady();
      });
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

  public setCursor(cursor: Cursor) {
    Object.values(this.canvas).forEach((canvas) => {
      canvas.setCursor(cursor);
    });
  }

  public resize(width: number, height: number) {
    Object.values(this.canvas).forEach((canvas) => {
      canvas.resize(width, height);
    });
  }

  public getCamera() {
    return this.main.getCamera();
  }

  public appendChild<T extends DisplayObject>(child: T): T {
    const layer = child.style?.$layer || 'main';

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
    Object.values(this.canvas).forEach((canvas) => {
      const camera = canvas.getCamera();
      // @ts-expect-error landmark is private
      if (camera.landmarks?.length) {
        camera.cancelLandmarkAnimation();
      }

      canvas.destroy();
    });
  }
}
