import { Canvas, DisplayObject, IRenderer, Landmark } from '@antv/g';
import { debounce, throttle } from '@antv/util';
import { GraphEvent } from '../../constants';
import type { RuntimeContext } from '../../runtime/types';
import { GraphData } from '../../spec';
import type { ElementDatum, ElementType, ID, IGraphLifeCycleEvent, Padding, Placement, Vector3 } from '../../types';
import { idOf } from '../../utils/id';
import { parsePadding } from '../../utils/padding';
import { toPointObject } from '../../utils/point';
import type { BasePluginOptions } from '../base-plugin';
import { BasePlugin } from '../base-plugin';
import { createPluginCanvas } from '../utils/canvas';

/**
 * <zh/> 缩略图插件配置项
 *
 * <en/> Minimap plugin options
 */
export interface MinimapOptions extends BasePluginOptions {
  /**
   * <zh/> 宽度和高度
   *
   * <en/> Width and height
   * @defaultValue [240, 160]
   */
  size?: [number, number];
  /**
   * <zh/> 内边距
   *
   * <en/> Padding
   * @defaultValue 10
   */
  padding?: Padding;
  /**
   * <zh/> 缩略图相对于画布的位置
   *
   * <en/> The position of the minimap relative to the canvas
   * @defaultValue 'right-bottom'
   */
  position?: Placement;
  /**
   * <zh/> 过滤器，用于过滤不必显示的元素
   *
   * <en/> Filter, used to filter elements that do not need to be displayed
   * @param id - <zh/> 元素的 id | <en/> The id of the element
   * @param elementType - <zh/> 元素的类型 | <en/> The type of the element
   * @returns <zh/> 是否显示 | <en/> Whether to display
   */
  filter?: (id: string, elementType: ElementType) => boolean;
  /**
   * <zh/> 元素缩略图形的生成方法
   *
   * <en/> The method of generating the thumbnail of the element
   * @defaultValue 'key'
   * @remarks
   * <zh/>
   * - 'key' 使用元素的主图形作为缩略图形
   * - 也可以传入一个函数，接收元素的 id 和类型，返回一个图形
   *
   * <en/>
   * - 'key' uses the key shape of the element as the thumbnail graphic
   * - You can also pass in a function that receives the id and type of the element and returns a shape
   */
  shape?: 'key' | ((id: string, elementType: ElementType) => DisplayObject);
  /**
   * <zh/> 缩略图画布类名，传入外置容器时不生效
   *
   * <en/> The class name of the minimap canvas, which does not take effect when an external container is passed in
   */
  className?: string;
  /**
   * <zh/> 缩略图挂载的容器，无则挂载到 Graph 所在容器
   *
   * <en/> The container where the minimap is mounted, if not, it will be mounted to the container where the Graph is located
   */
  container?: HTMLElement | string;
  /**
   * <zh/> 缩略图的容器样式，传入外置容器时不生效
   *
   * <en/> The style of the minimap container, which does not take effect when an external container is passed in
   */
  containerStyle?: Partial<CSSStyleDeclaration>;
  /**
   * <zh/> 遮罩的样式
   *
   * <en/> The style of the mask
   */
  maskStyle?: Partial<CSSStyleDeclaration>;
  /**
   * <zh/> 渲染器，默认使用 Canvas 渲染器
   *
   * <en/> Renderer, default to use Canvas renderer
   */
  renderer?: IRenderer;
  /**
   * <zh/> 延迟更新时间(毫秒)，用于性能优化
   *
   * <en/> Delay update time(ms), used for performance optimization
   * @defaultValue 128
   */
  delay?: number;
}

/**
 * <zh/> 缩略图插件
 *
 * <en/> Minimap plugin
 */
export class Minimap extends BasePlugin<MinimapOptions> {
  static defaultOptions: Partial<MinimapOptions> = {
    size: [240, 160],
    shape: 'key',
    padding: 10,
    position: 'right-bottom',
    maskStyle: {
      border: '1px solid #ddd',
      background: 'rgba(0, 0, 0, 0.1)',
    },
    containerStyle: {
      border: '1px solid #ddd',
      background: '#fff',
    },
    delay: 128,
  };

  private canvas!: Canvas;

  constructor(context: RuntimeContext, options: MinimapOptions) {
    super(context, Object.assign({}, Minimap.defaultOptions, options));
    this.setOnRender();
    this.bindEvents();
  }

  public update(options: Partial<MinimapOptions>): void {
    this.unbindEvents();
    super.update(options);
    if ('delay' in options) this.setOnRender();
    this.bindEvents();
  }

  private setOnRender() {
    this.onRender = debounce(
      () => {
        this.renderMinimap();
        this.renderMask();
      },
      this.options.delay,
      true,
    );
  }

  private bindEvents() {
    const { graph } = this.context;
    graph.on(GraphEvent.AFTER_DRAW, this.onDraw);
    graph.on(GraphEvent.AFTER_RENDER, this.onRender);
    graph.on(GraphEvent.AFTER_TRANSFORM, this.onTransform);
  }

  private unbindEvents() {
    const { graph } = this.context;
    graph.off(GraphEvent.AFTER_DRAW, this.onDraw);
    graph.off(GraphEvent.AFTER_RENDER, this.onRender);
    graph.off(GraphEvent.AFTER_TRANSFORM, this.onTransform);
  }

  private onDraw = (event: IGraphLifeCycleEvent) => {
    if (event?.data?.render) return;
    this.onRender();
  };

  private onRender!: () => void;

  private shapes = new Map<ID, DisplayObject>();

  /**
   * <zh/> 创建或更新缩略图
   *
   * <en/> Create or update the minimap
   */
  private renderMinimap() {
    const data = this.getElements();
    const canvas = this.initCanvas();
    this.setShapes(canvas, data);
  }

  private getElements(): Required<GraphData> {
    const { filter } = this.options;
    const { model } = this.context;
    const data = model.getData();

    if (!filter) return data;

    const { nodes, edges, combos } = data;

    return {
      nodes: nodes.filter((node) => filter(idOf(node), 'node')),
      edges: edges.filter((edge) => filter(idOf(edge), 'edge')),
      combos: combos.filter((combo) => filter(idOf(combo), 'combo')),
    };
  }

  private setShapes(canvas: Canvas, data: Required<GraphData>) {
    const { nodes, edges, combos } = data;

    const { shape } = this.options;
    const { element } = this.context;

    if (shape === 'key') {
      const ids = new Set<ID>();

      const iterate = (datum: ElementDatum) => {
        const id = idOf(datum);
        ids.add(id);

        const target = element!.getElement(id);
        if (!target) return;

        const shape = target.getShape('key');
        const cloneShape = this.shapes.get(id) || shape.cloneNode();

        cloneShape.setPosition(shape.getPosition());
        // keep zIndex / id
        if (target.style.zIndex) cloneShape.style.zIndex = target.style.zIndex;
        cloneShape.id = target.id;

        if (!this.shapes.has(id)) {
          canvas.appendChild(cloneShape);
          this.shapes.set(id, cloneShape);
        } else {
          Object.entries(shape.attributes).forEach(([key, value]) => {
            if (cloneShape.style[key] !== value) cloneShape.style[key] = value;
          });
        }
      };

      // 注意执行顺序 / Note the execution order
      edges.forEach(iterate);
      combos.forEach(iterate);
      nodes.forEach(iterate);

      this.shapes.forEach((shape, id) => {
        if (!ids.has(id)) {
          canvas.removeChild(shape);
          this.shapes.delete(id);
        }
      });

      return;
    }

    const setPosition = (id: ID, shape: DisplayObject) => {
      const target = element!.getElement(id)!;
      const position = target.getPosition();
      shape.setPosition(position);
      return shape;
    };

    canvas.removeChildren();

    edges.forEach((datum) => canvas.appendChild(shape(idOf(datum), 'edge')));
    combos.forEach((datum) => {
      canvas.appendChild(setPosition(idOf(datum), shape(idOf(datum), 'combo')));
    });
    nodes.forEach((datum) => {
      canvas.appendChild(setPosition(idOf(datum), shape(idOf(datum), 'node')));
    });
  }

  private container!: HTMLElement;

  private initCanvas() {
    const {
      renderer,
      size: [width, height],
    } = this.options;

    if (this.canvas) {
      const { width: w, height: h } = this.canvas.getConfig();
      if (width !== w || height !== h) this.canvas.resize(width, height);
      if (renderer) this.canvas.setRenderer(renderer);
    } else {
      const { className, position, container, containerStyle } = this.options;

      const [$container, canvas] = createPluginCanvas({
        renderer,
        width,
        height,
        placement: position,
        className: 'minimap',
        container,
        containerStyle,
        graphCanvas: this.context.canvas,
      });

      if (className) $container.classList.add(className);

      this.container = $container;
      this.canvas = canvas;
    }

    this.setCamera();

    return this.canvas;
  }

  private landmarkMap = new Map<string, Landmark>();

  private createLandmark(position: Vector3, focalPoint: Vector3, zoom: number) {
    const key = `${position.join(',')}-${focalPoint.join(',')}-${zoom}`;

    if (this.landmarkMap.has(key)) return this.landmarkMap.get(key)!;

    const camera = this.canvas.getCamera();
    const landmark = camera.createLandmark(key, {
      position,
      focalPoint,
      zoom,
    });
    this.landmarkMap.set(key, landmark);
    return landmark;
  }

  private setCamera() {
    const { canvas } = this.context;

    const camera = this.canvas?.getCamera();
    if (!camera) return;

    const {
      size: [minimapWidth, minimapHeight],
      padding,
    } = this.options;
    const [top, right, bottom, left] = parsePadding(padding);
    const { min: boundsMin, max: boundsMax, center } = canvas.getBounds('elements');
    const boundsWidth = boundsMax[0] - boundsMin[0];
    const boundsHeight = boundsMax[1] - boundsMin[1];

    const availableWidth = minimapWidth - left - right;
    const availableHeight = minimapHeight - top - bottom;

    const scaleX = availableWidth / boundsWidth;
    const scaleY = availableHeight / boundsHeight;
    const scale = Math.min(scaleX, scaleY);

    const landmark = this.createLandmark(center, center, scale);
    camera.gotoLandmark(landmark, 0);
  }

  private mask: HTMLElement | null = null;

  private get maskBBox(): [number, number, number, number] {
    const { canvas: graphCanvas } = this.context;
    const canvasSize = graphCanvas.getSize();
    const canvasMin = graphCanvas.getCanvasByViewport([0, 0]);
    const canvasMax = graphCanvas.getCanvasByViewport(canvasSize);

    const maskMin = this.canvas.canvas2Viewport(toPointObject(canvasMin));
    const maskMax = this.canvas.canvas2Viewport(toPointObject(canvasMax));

    const width = maskMax.x - maskMin.x;
    const height = maskMax.y - maskMin.y;

    return [maskMin.x, maskMin.y, width, height];
  }

  /**
   * <zh/> 计算遮罩包围盒
   *
   * <en/> Calculate the bounding box of the mask
   * @returns <zh/> 遮罩包围盒 | <en/> Mask bounding box
   */
  private calculateMaskBBox(): [number, number, number, number] {
    const {
      size: [minimapWidth, minimapHeight],
    } = this.options;

    let [x, y, width, height] = this.maskBBox;

    // clamp x, y, width, height
    if (x < 0) (width = upper(width + x, minimapWidth)), (x = 0);
    if (y < 0) (height = upper(height + y, minimapHeight)), (y = 0);
    if (x + width > minimapWidth) width = lower(minimapWidth - x, 0);
    if (y + height > minimapHeight) height = lower(minimapHeight - y, 0);

    return [upper(x, minimapWidth), upper(y, minimapHeight), lower(width, 0), lower(height, 0)];
  }

  /**
   * <zh/> 创建或更新遮罩
   *
   * <en/> Create or update the mask
   */
  private renderMask() {
    const { maskStyle } = this.options;

    if (!this.mask) {
      this.mask = document.createElement('div');
      this.mask.addEventListener('pointerdown', this.onMaskDragStart);
    }

    this.container.appendChild(this.mask);

    Object.assign(this.mask.style, {
      ...maskStyle,
      cursor: 'move',
      position: 'absolute',
      pointerEvents: 'auto',
    });

    this.updateMask();
  }

  private isMaskDragging = false;

  private onMaskDragStart = (event: PointerEvent) => {
    if (!this.mask) return;
    this.isMaskDragging = true;
    this.mask.setPointerCapture(event.pointerId);
    this.mask.addEventListener('pointermove', this.onMaskDrag);
    this.mask.addEventListener('pointerup', this.onMaskDragEnd);
    this.mask.addEventListener('pointercancel', this.onMaskDragEnd);
  };

  private onMaskDrag = (event: PointerEvent) => {
    if (!this.mask || !this.isMaskDragging) return;
    const {
      size: [minimapWidth, minimapHeight],
    } = this.options;
    const { movementX, movementY } = event;

    const { left, top, width: w, height: h } = this.mask.style;
    const [, , fullWidth, fullHeight] = this.maskBBox;

    let x = parseInt(left) + movementX;
    let y = parseInt(top) + movementY;
    let width = parseInt(w);
    let height = parseInt(h);

    // 确保 mask 在 minimap 内部
    // Ensure that the mask is inside the minimap
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x + width > minimapWidth) x = lower(minimapWidth - width, 0);
    if (y + height > minimapHeight) y = lower(minimapHeight - height, 0);

    // 当拖拽画布导致 mask 缩小时，拖拽 mask 时，能够恢复到实际大小
    // When dragging the canvas causes the mask to shrink, dragging the mask will restore it to its actual size
    if (width < fullWidth) {
      if (movementX > 0) (x = lower(x - movementX, 0)), (width = upper(width + movementX, minimapWidth));
      else if (movementX < 0) width = upper(width - movementX, minimapWidth);
    }
    if (height < fullHeight) {
      if (movementY > 0) (y = lower(y - movementY, 0)), (height = upper(height + movementY, minimapHeight));
      else if (movementY < 0) height = upper(height - movementY, minimapHeight);
    }

    Object.assign(this.mask.style, {
      left: x + 'px',
      top: y + 'px',
      width: width + 'px',
      height: height + 'px',
    });

    // 基于 movement 进行相对移动
    // Move relative to movement
    const deltaX = parseInt(left) - x;
    const deltaY = parseInt(top) - y;
    if (deltaX === 0 && deltaY === 0) return;

    const zoom1 = this.context.canvas.getCamera().getZoom();
    const zoom2 = this.canvas.getCamera().getZoom();
    const ratio = zoom1 / zoom2;

    this.context.graph.translateBy([deltaX * ratio, deltaY * ratio], false);
  };

  private onMaskDragEnd = (event: PointerEvent) => {
    if (!this.mask) return;
    this.isMaskDragging = false;
    this.mask.releasePointerCapture(event.pointerId);
    this.mask.removeEventListener('pointermove', this.onMaskDrag);
    this.mask.removeEventListener('pointerup', this.onMaskDragEnd);
    this.mask.removeEventListener('pointercancel', this.onMaskDragEnd);
  };

  private onTransform = throttle(
    () => {
      if (this.isMaskDragging) return;
      this.updateMask();
      this.setCamera();
    },
    32,
    { leading: true },
  ) as () => void;

  private updateMask() {
    if (!this.mask) return;
    const [x, y, width, height] = this.calculateMaskBBox();

    Object.assign(this.mask.style, {
      top: y + 'px',
      left: x + 'px',
      width: width + 'px',
      height: height + 'px',
    });
  }

  public destroy(): void {
    this.unbindEvents();
    this.canvas.destroy();
    this.mask?.remove();
    super.destroy();
  }
}

const upper = (value: number, max: number) => Math.min(value, max);

const lower = (value: number, min: number) => Math.max(value, min);
