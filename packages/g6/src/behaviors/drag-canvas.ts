import type { Cursor } from '@antv/g';
import { debounce, isObject } from '@antv/util';
import { CommonEvent } from '../constants';
import type { RuntimeContext } from '../runtime/types';
import type { IKeyboardEvent, IPointerEvent, Vector2, ViewportAnimationEffectTiming } from '../types';
import { getExpandedBBox, getPointBBox, isPointInBBox } from '../utils/bbox';
import { parsePadding } from '../utils/padding';
import type { ShortcutKey } from '../utils/shortcut';
import { Shortcut } from '../utils/shortcut';
import { multiply, subtract } from '../utils/vector';
import type { BaseBehaviorOptions } from './base-behavior';
import { BaseBehavior } from './base-behavior';

/**
 * <zh/> 拖拽画布交互配置项
 *
 * <en/> Drag canvas behavior options
 */
export interface DragCanvasOptions extends BaseBehaviorOptions {
  /**
   * <zh/> 是否启用拖拽动画，仅在使用按键移动时有效
   *
   * <en/> Whether to enable the animation of dragging, only valid when using key movement
   */
  animation?: ViewportAnimationEffectTiming;
  /**
   * <zh/> 是否启用拖拽画布的功能
   *
   * <en/> Whether to enable the function of dragging the canvas
   * @defaultValue true
   */
  enable?: boolean | ((event: IPointerEvent | IKeyboardEvent) => boolean);
  /**
   * <zh/> 允许拖拽方向
   * - `'x'`: 只允许水平拖拽
   * - `'y'`: 只允许垂直拖拽
   * - `'both'`: 不受限制，允许水平和垂直拖拽
   *
   * <en/> Allowed drag direction
   * - `'x'`: Only allow horizontal drag
   * - `'y'`: Only allow vertical drag
   * - `'both'`: Allow horizontal and vertical drag
   * @defaultValue `'both'`
   */
  direction?: 'x' | 'y' | 'both';
  /**
   * <zh/> 可拖拽的视口范围，默认最多可拖拽一屏。可以分别设置上、右、下、左四个方向的范围，每个方向的范围在 [0, Infinity] 之间
   *
   * <en/> The draggable viewport range allows you to drag up to one screen by default. You can set the range for each direction (top, right, bottom, left) individually, with each direction's range between [0, Infinity]
   * @defaultValue Infinity
   */
  range?: number | number[];
  /**
   * <zh/> 触发拖拽的方式，默认使用指针按下拖拽
   *
   * <en/> The way to trigger dragging, default to dragging with the pointer pressed
   */
  trigger?: {
    up: ShortcutKey;
    down: ShortcutKey;
    left: ShortcutKey;
    right: ShortcutKey;
  };
  /**
   * <zh/> 触发一次按键移动的距离
   *
   * <en/> The distance of a single key movement
   * @defaultValue 10
   */
  sensitivity?: number;
  /**
   * <zh/> 完成拖拽时的回调
   *
   * <en/> Callback when dragging is completed
   */
  onFinish?: () => void;
}

/**
 * <zh/> 拖拽画布交互
 *
 * <en/> Drag canvas behavior
 */
export class DragCanvas extends BaseBehavior<DragCanvasOptions> {
  static defaultOptions: Partial<DragCanvasOptions> = {
    enable: (event) => {
      if ('targetType' in event) return event.targetType === 'canvas';
      return true;
    },
    sensitivity: 10,
    direction: 'both',
    range: Infinity,
  };

  private shortcut: Shortcut;

  private defaultCursor: Cursor;

  constructor(context: RuntimeContext, options: DragCanvasOptions) {
    super(context, Object.assign({}, DragCanvas.defaultOptions, options));

    this.shortcut = new Shortcut(context.graph);

    this.bindEvents();
    this.defaultCursor = this.context.canvas.getConfig().cursor || 'default';
  }

  /**
   * <zh/> 更新配置
   *
   * <en/> Update options
   * @param options - <zh/> 配置项 | <en/> Options
   * @internal
   */
  public update(options: Partial<DragCanvasOptions>): void {
    this.unbindEvents();
    super.update(options);
    this.bindEvents();
  }

  private bindEvents() {
    const { trigger } = this.options;

    if (isObject(trigger)) {
      const { up = [], down = [], left = [], right = [] } = trigger;
      this.shortcut.bind(up, (event) => this.onTranslate([0, 1], event));
      this.shortcut.bind(down, (event) => this.onTranslate([0, -1], event));
      this.shortcut.bind(left, (event) => this.onTranslate([1, 0], event));
      this.shortcut.bind(right, (event) => this.onTranslate([-1, 0], event));
    } else {
      const { graph } = this.context;
      graph.on(CommonEvent.DRAG_START, this.onDragStart);
      graph.on(CommonEvent.DRAG, this.onDrag);
      graph.on(CommonEvent.DRAG_END, this.onDragEnd);
    }
  }

  private isDragging = false;

  private onDragStart = (event: IPointerEvent) => {
    if (!this.validate(event)) return;
    this.isDragging = true;
    this.context.canvas.setCursor('grabbing');
  };

  private onDrag = (event: IPointerEvent) => {
    if (!this.isDragging) return;
    const { x, y } = event.movement;
    if ((x | y) !== 0) {
      this.translate([x, y], false);
    }
  };

  private onDragEnd = () => {
    this.isDragging = false;
    this.context.canvas.setCursor(this.defaultCursor);
    this.options.onFinish?.();
  };

  private invokeOnFinish = debounce(() => {
    this.options.onFinish?.();
  }, 300);

  private async onTranslate(value: Vector2, event: IPointerEvent | IKeyboardEvent) {
    if (!this.validate(event)) return;
    const { sensitivity } = this.options;
    const delta = sensitivity * -1;
    await this.translate(multiply(value, delta) as Vector2, this.options.animation);

    this.invokeOnFinish();
  }

  /**
   * <zh/> 平移画布
   *
   * <en/> Translate canvas
   * @param offset - <zh/> 平移距离 | <en/> Translation distance
   * @param animation - <zh/> 动画配置 | <en/> Animation configuration
   * @internal
   */
  protected async translate(offset: Vector2, animation?: ViewportAnimationEffectTiming) {
    offset = this.clampByDirection(offset);
    offset = this.clampByRange(offset);

    await this.context.graph.translateBy(offset, animation);
  }

  private clampByDirection([dx, dy]: Vector2): Vector2 {
    const { direction } = this.options;
    if (direction === 'x') {
      dy = 0;
    } else if (direction === 'y') {
      dx = 0;
    }
    return [dx, dy];
  }

  private clampByRange([dx, dy]: Vector2): Vector2 {
    const { viewport, canvas } = this.context;

    const [canvasWidth, canvasHeight] = canvas.getSize();
    const [top, right, bottom, left] = parsePadding(this.options.range);
    const range = [canvasHeight * top, canvasWidth * right, canvasHeight * bottom, canvasWidth * left];
    const draggableArea = getExpandedBBox(getPointBBox(viewport!.getCanvasCenter()), range);

    const nextViewportCenter = subtract(viewport!.getViewportCenter(), [dx, dy, 0]);
    if (!isPointInBBox(nextViewportCenter, draggableArea)) {
      const {
        min: [minX, minY],
        max: [maxX, maxY],
      } = draggableArea;

      if ((nextViewportCenter[0] < minX && dx > 0) || (nextViewportCenter[0] > maxX && dx < 0)) {
        dx = 0;
      }
      if ((nextViewportCenter[1] < minY && dy > 0) || (nextViewportCenter[1] > maxY && dy < 0)) {
        dy = 0;
      }
    }
    return [dx, dy];
  }

  private validate(event: IPointerEvent | IKeyboardEvent) {
    if (this.destroyed) return false;
    const { enable } = this.options;
    if (typeof enable === 'function') return enable(event);
    return !!enable;
  }

  private unbindEvents() {
    this.shortcut.unbindAll();
    const { graph } = this.context;
    graph.off(CommonEvent.DRAG_START, this.onDragStart);
    graph.off(CommonEvent.DRAG, this.onDrag);
    graph.off(CommonEvent.DRAG_END, this.onDragEnd);
  }

  public destroy(): void {
    this.shortcut.destroy();
    this.unbindEvents();
    this.context.canvas.setCursor(this.defaultCursor);
    super.destroy();
  }
}
