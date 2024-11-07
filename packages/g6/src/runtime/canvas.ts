import type { Cursor, DisplayObject, CanvasConfig as GCanvasConfig, IChildNode } from '@antv/g';
import { CanvasEvent, Canvas as GCanvas } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Plugin as DragNDropPlugin } from '@antv/g-plugin-dragndrop';
import { createDOM } from '@antv/util';
import type { CanvasOptions } from '../spec/canvas';
import type { CanvasLayer, Point } from '../types';
import { getBBoxSize, getCombinedBBox } from '../utils/bbox';
import { parsePoint, toPointObject } from '../utils/point';

export interface CanvasConfig
  extends Pick<GCanvasConfig, 'container' | 'devicePixelRatio' | 'width' | 'height' | 'cursor' | 'background'> {
  /**
   * <zh/> 渲染器
   *
   * <en/> renderer
   */
  renderer?: CanvasOptions['renderer'];
  /**
   * <zh/> 是否启用多图层
   *
   * <en/> Whether to enable multiple layers
   * @defaultValue true
   * @remarks
   * <zh/> 非动态参数，仅在初始化时生效
   *
   * <en/> Non-dynamic parameters, only take effect during initialization
   */
  enableMultiLayer?: boolean;
}

export interface DataURLOptions {
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
  /**
   * <zh/> 图片类型
   *
   * <en/> image type
   * @defaultValue 'image/png'
   */
  type: 'image/png' | 'image/jpeg' | 'image/webp' | 'image/bmp';
  /**
   * <zh/> 图片质量, 仅对 image/jpeg 和 image/webp 有效，取值范围 0 ~ 1
   *
   * <en/> image quality, only valid for image/jpeg and image/webp, range 0 ~ 1
   */
  encoderOptions: number;
}

const SINGLE_LAYER_NAME: CanvasLayer[] = ['main'];
const MULTI_LAYER_NAME: CanvasLayer[] = ['background', 'main', 'label', 'transient'];

/**
 * <zh/> 获取主画布图层
 *
 * <en/> Get the main canvas layer
 * @param layers - <zh/> 画布图层 | <en/> Canvas layer
 * @returns <zh/> 主画布图层 | <en/> Main canvas layer
 */
function getMainLayerOf(layers: Record<CanvasLayer, GCanvas>) {
  return layers.main;
}

export class Canvas {
  private extends: {
    config: CanvasConfig;
    renderer: CanvasOptions['renderer'];
    renderers: Record<CanvasLayer, CanvasRenderer>;
    layers: Record<CanvasLayer, GCanvas>;
  };

  private config: CanvasConfig = {
    enableMultiLayer: true,
  };

  public getConfig() {
    return this.config;
  }

  public getLayer(layer: CanvasLayer = 'main') {
    return this.extends.layers[layer] || getMainLayerOf(this.getLayers());
  }

  /**
   * <zh/> 获取所有图层
   *
   * <en/> Get all layers
   * @returns <zh/> 图层 <en/> Layer
   */
  public getLayers() {
    return this.extends.layers;
  }

  /**
   * <zh/> 获取渲染器
   *
   * <en/> Get renderer
   * @param layer - <zh/> 图层 <en/> Layer
   * @returns <zh/> 渲染器 <en/> Renderer
   */
  public getRenderer(layer: CanvasLayer) {
    return this.extends.renderers[layer];
  }

  /**
   * <zh/> 获取相机
   *
   * <en/> Get camera
   * @param layer - <zh/> 图层 <en/> Layer
   * @returns <zh/> 相机 <en/> Camera
   */
  public getCamera(layer: CanvasLayer = 'main') {
    return this.getLayer(layer).getCamera();
  }

  public getRoot(layer: CanvasLayer = 'main') {
    return this.getLayer(layer).getRoot();
  }

  public getContextService(layer: CanvasLayer = 'main') {
    return this.getLayer(layer).getContextService();
  }

  public setCursor(cursor: Cursor): void {
    this.config.cursor = cursor;
    this.getLayer().setCursor(cursor);
  }

  public get document() {
    return this.getLayer().document;
  }

  public get context() {
    return this.getLayer().context;
  }

  constructor(config: CanvasConfig) {
    Object.assign(this.config, config);

    const { renderer, background, cursor, enableMultiLayer, ...restConfig } = this.config;
    const layersName = enableMultiLayer ? MULTI_LAYER_NAME : SINGLE_LAYER_NAME;
    const renderers = createRenderers(renderer, layersName);
    const layers = Object.fromEntries(
      layersName.map((layer) => {
        const canvas = new GCanvas({
          ...restConfig,
          supportsMutipleCanvasesInOneContainer: enableMultiLayer,
          renderer: renderers[layer],
          background: enableMultiLayer ? (layer === 'background' ? background : undefined) : background,
        });

        return [layer, canvas];
      }),
    ) as Record<CanvasLayer, GCanvas>;

    configCanvasDom(layers);

    this.extends = {
      config: this.config,
      renderer,
      renderers,
      layers,
    };
  }

  public get ready() {
    return Promise.all(Object.entries(this.getLayers()).map(([, canvas]) => canvas.ready));
  }

  public resize(width: number, height: number) {
    Object.assign(this.extends.config, { width, height });
    Object.values(this.getLayers()).forEach((canvas) => {
      const camera = canvas.getCamera();
      const position = camera.getPosition();
      const focalPoint = camera.getFocalPoint();

      canvas.resize(width, height);

      camera.setPosition(position);
      camera.setFocalPoint(focalPoint);
    });
  }

  /**
   * <zh/> 获取画布边界
   *
   * <en/> Get canvas boundary
   * @param group
   * <zh/> 元素分组
   * - undefined: 获取整个画布边界
   * - 'elements': 仅获取元素边界
   * - 'plugins': 仅获取插件边界
   *
   * <en/> Element group
   * - undefined: Get the entire canvas boundary
   * - 'elements': Get only the element boundary
   * - 'plugins': Get only the plugin boundary
   * @returns <zh/> 边界 <en/> Boundary
   */
  public getBounds(group?: 'elements' | 'plugins') {
    return getCombinedBBox(
      Object.values(this.getLayers())
        .map((canvas) => {
          const g = group
            ? (canvas
                .getRoot()
                .childNodes.find((node) => (node as DisplayObject).classList.includes(group)) as DisplayObject)
            : canvas.getRoot();
          return g;
        })
        .filter((el) => el?.childNodes.length > 0)
        .map((el) => el.getBounds()),
    );
  }

  public getContainer() {
    const container = this.extends.config.container!;
    return typeof container === 'string' ? document.getElementById(container!) : container;
  }

  public getSize(): [number, number] {
    return [this.extends.config.width || 0, this.extends.config.height || 0];
  }

  public appendChild<T extends IChildNode>(child: T, index?: number): T {
    const layer = ((child as unknown as DisplayObject).style?.$layer || 'main') as CanvasLayer;
    return this.getLayer(layer).appendChild(child, index);
  }

  public setRenderer(renderer: CanvasOptions['renderer']) {
    if (renderer === this.extends.renderer) return;
    const renderers = createRenderers(renderer, this.config.enableMultiLayer ? MULTI_LAYER_NAME : SINGLE_LAYER_NAME);
    this.extends.renderers = renderers;
    Object.entries(renderers).forEach(([layer, instance]) => this.getLayer(layer as CanvasLayer).setRenderer(instance));
    configCanvasDom(this.getLayers());
  }

  public getCanvasByViewport(point: Point): Point {
    return parsePoint(this.getLayer().viewport2Canvas(toPointObject(point)));
  }

  public getViewportByCanvas(point: Point): Point {
    return parsePoint(this.getLayer().canvas2Viewport(toPointObject(point)));
  }

  public getViewportByClient(point: Point): Point {
    return parsePoint(this.getLayer().client2Viewport(toPointObject(point)));
  }

  public getClientByViewport(point: Point): Point {
    return parsePoint(this.getLayer().viewport2Client(toPointObject(point)));
  }

  public getClientByCanvas(point: Point): Point {
    return this.getClientByViewport(this.getViewportByCanvas(point));
  }

  public getCanvasByClient(point: Point): Point {
    const main = this.getLayer();
    const viewportPoint = main.client2Viewport(toPointObject(point));
    return parsePoint(main.viewport2Canvas(viewportPoint));
  }

  public async toDataURL(options: Partial<DataURLOptions> = {}) {
    const devicePixelRatio = globalThis.devicePixelRatio || 1;
    const { mode = 'viewport', ...restOptions } = options;
    let [startX, startY, width, height] = [0, 0, 0, 0];

    if (mode === 'viewport') {
      [width, height] = this.getSize();
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
      background: this.extends.config.background,
    });

    await offscreenCanvas.ready;

    offscreenCanvas.appendChild(this.getLayer('background').getRoot().cloneNode(true));
    offscreenCanvas.appendChild(this.getRoot().cloneNode(true));

    // Handle label canvas
    const label = this.getLayer('label').getRoot().cloneNode(true);
    const originCanvasPosition = offscreenCanvas.viewport2Canvas({ x: 0, y: 0 });
    const currentCanvasPosition = this.getCanvasByViewport([0, 0]);
    label.translate([
      currentCanvasPosition[0] - originCanvasPosition.x,
      currentCanvasPosition[1] - originCanvasPosition.y,
    ]);
    label.scale(1 / this.getCamera().getZoom());
    offscreenCanvas.appendChild(label);

    offscreenCanvas.appendChild(this.getLayer('transient').getRoot().cloneNode(true));

    const camera = this.getCamera();
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
      offscreenCanvas.addEventListener(CanvasEvent.RERENDER, async () => {
        // 等待图片渲染完成 / Wait for the image to render
        await new Promise((r) => setTimeout(r, 300));
        const url = await contextService.toDataURL(restOptions);
        resolve(url);
      });
    });
  }

  public destroy() {
    Object.values(this.getLayers()).forEach((canvas) => {
      const camera = canvas.getCamera();
      camera.cancelLandmarkAnimation();
      canvas.destroy();
    });
  }
}

/**
 * <zh/> 创建渲染器
 *
 * <en/> Create renderers
 * @param renderer - <zh/> 渲染器创建器 <en/> Renderer creator
 * @param layersName - <zh/> 图层名称 <en/> Layer name
 * @returns <zh/> 渲染器 <en/> Renderer
 */
function createRenderers(renderer: CanvasConfig['renderer'], layersName: CanvasLayer[]) {
  return Object.fromEntries(
    layersName.map((layer) => {
      const instance = renderer?.(layer) || new CanvasRenderer();

      if (layer === 'main') {
        instance.registerPlugin(
          new DragNDropPlugin({
            isDocumentDraggable: true,
            isDocumentDroppable: true,
            dragstartDistanceThreshold: 10,
            dragstartTimeThreshold: 100,
          }),
        );
      } else {
        instance.unregisterPlugin(instance.getPlugin('dom-interaction'));
      }

      return [layer, instance];
    }),
  ) as Record<CanvasLayer, CanvasRenderer>;
}

/**
 * <zh/> 配置画布 DOM
 *
 * <en/> Configure canvas DOM
 * @param layers - <zh/> 画布 <en/> Canvas
 */
function configCanvasDom(layers: Record<CanvasLayer, GCanvas>) {
  Object.entries(layers).forEach(([layer, canvas]) => {
    const domElement = canvas.getContextService().getDomElement() as unknown as HTMLElement;

    // 浏览器环境下，设置画布样式
    // Set canvas style in browser environment
    if (domElement?.style) {
      domElement.style.gridArea = '1 / 1 / 2 / 2';
      domElement.style.outline = 'none';
      domElement.tabIndex = 1;

      if (layer !== 'main') domElement.style.pointerEvents = 'none';
    }

    if (domElement?.parentElement) {
      domElement.parentElement.style.display = 'grid';
    }
  });
}
