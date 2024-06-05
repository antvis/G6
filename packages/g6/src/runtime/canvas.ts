import type {
  Cursor,
  DisplayObject,
  CanvasConfig as GCanvasConfig,
  DataURLOptions as GDataURLOptions,
  IAnimation,
  IRenderer,
  PointLike,
} from '@antv/g';
import { CanvasEvent, Canvas as GCanvas } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Plugin as DragNDropPlugin } from '@antv/g-plugin-dragndrop';
import { createDOM, isFunction, isString } from '@antv/util';
import type { CanvasOptions } from '../spec/canvas';
import type { CanvasLayer } from '../types/canvas';
import { getBBoxSize, getCombinedBBox } from '../utils/bbox';

export interface CanvasConfig
  extends Pick<GCanvasConfig, 'container' | 'devicePixelRatio' | 'width' | 'height' | 'cursor'> {
  renderer?: CanvasOptions['renderer'];
  background?: string;
}

export interface DataURLOptions extends GDataURLOptions {
  /**
   * <zh/> 导出模式
   *  - viewport: 导出视口内容
   *  - overall: 导出整个画布
   *
   * <en/> export mode
   *  - viewport: export the content of the viewport
   *  - overall: export the entire canvas
   */
  mode?: 'viewport' | 'overall';
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

  public get canvas() {
    return {
      main: this.main,
      label: this.label,
      transient: this.transient,
      background: this.background,
    };
  }

  public get document() {
    return this.main.document;
  }

  public renderers!: Record<CanvasLayer, IRenderer>;

  private initialized = false;

  constructor(config: CanvasConfig) {
    this.config = config;
  }

  public async init() {
    if (this.initialized) return;

    const { renderer: getRenderer, background, ...restConfig } = this.config;
    const names: CanvasLayer[] = ['main', 'label', 'transient', 'background'];

    const { renderers, canvas } = names.reduce(
      (acc, name) => {
        const renderer = isFunction(getRenderer) ? getRenderer?.(name) : new CanvasRenderer();

        if (name === 'main') {
          renderer.registerPlugin(
            new DragNDropPlugin({
              isDocumentDraggable: true,
              isDocumentDroppable: true,
              dragstartDistanceThreshold: 10,
              dragstartTimeThreshold: 100,
            }),
          );
        } else {
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

    this.setBackground();

    await Promise.all(Object.values(this.canvas).map((canvas) => canvas.ready));

    this.initialized = true;
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
    this.config.background = background;
  }

  public setCursor(cursor: Cursor) {
    this.config.cursor = cursor;
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
    const { mode = 'viewport', ...restOptions } = options;

    let startX = 0;
    let startY = 0;
    let width = 0;
    let height = 0;

    if (mode === 'viewport') {
      [width, height] = [this.config.width || 0, this.config.height || 0];
    } else if (mode === 'overall') {
      const bounds = this.getBounds();
      const size = getBBoxSize(bounds);
      [startX, startY] = bounds.min;
      [width, height] = size;
    }

    const container: HTMLElement = createDOM('<div id="virtual-image"></div>');

    const offscreenCanvas = new GCanvas({
      width,
      height,
      renderer: new CanvasRenderer(),
      devicePixelRatio,
      container,
      background: this.config.background,
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

    if (mode === 'viewport') {
      offscreenCamera.setZoom(camera.getZoom());
      offscreenCamera.setPosition(camera.getPosition());
      offscreenCamera.setFocalPoint(camera.getFocalPoint());
    } else if (mode === 'overall') {
      const [x, y, z] = offscreenCamera.getPosition();
      const [fx, fy, fz] = offscreenCamera.getFocalPoint();
      offscreenCamera.setPosition([x + startX, y + startY, z]);
      offscreenCamera.setFocalPoint([fx + startX, fy + startY, fz]);
    }

    const contextService = offscreenCanvas.getContextService();

    return new Promise<string>((resolve) => {
      offscreenCanvas.on(CanvasEvent.RERENDER, async () => {
        // 等待图片渲染完成 / Wait for the image to render
        await new Promise((r) => setTimeout(r, 300));
        const url = await contextService.toDataURL(restOptions);
        resolve(url);
      });
    });
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

      destroyCanvas(canvas);
      // @ts-expect-error force delete
      this[name] = undefined;
    });
  }
}

/**
 * <zh/> G Canvas destroy 未处理动画对象，导致内存泄漏
 *
 * <en/> G Canvas destroy does not handle animation objects, causing memory leaks
 * @param canvas GCanvas
 * @remarks
 * <zh/> 这些操作都应该在 G 中完成，这里只是一个临时的解决方案
 * 此操作大概能在测试环节降低 10～20% 的内存占用（从 2800MB 降低到 2200MB）
 *
 * <en/> These operations should be completed in G, this is just a temporary solution
 * This operation can reduce memory usage by 10-20% in the test environment (from 2800MB to 2200MB)
 */
function destroyCanvas(canvas: GCanvas) {
  canvas.destroy();

  // 移除相机事件 / Remove camera events
  const camera = canvas.getCamera();
  camera.eventEmitter.removeAllListeners();

  canvas.document.timeline.destroy();
  // @ts-expect-error private property
  const { animationsWithPromises } = canvas.document.timeline;
  // 释放 target 对象图形 / Release target object graphics
  animationsWithPromises.forEach((animation: IAnimation) => {
    if (animation.effect.target) animation.effect.target = null;
    // @ts-expect-error private property
    if (animation.effect.computedTiming) animation.effect.computedTiming = null;
  });

  // @ts-expect-error private property
  canvas.document.timeline.animationsWithPromises = [];
  // @ts-expect-error private property
  canvas.document.timeline.rafCallbacks = [];
  // @ts-expect-error private property
  canvas.document.timeline = null;
}
