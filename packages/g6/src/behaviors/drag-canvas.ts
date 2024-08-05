import type { Cursor } from '@antv/g';
import { debounce, isObject } from '@antv/util';
import { CanvasEvent } from '../constants';
import type { RuntimeContext } from '../runtime/types';
import type { IKeyboardEvent, IPointerEvent, Vector2, ViewportAnimationEffectTiming } from '../types';
import type { ShortcutKey } from '../utils/shortcut';
import { Shortcut } from '../utils/shortcut';
import { multiply } from '../utils/vector';
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
  };

  private shortcut: Shortcut;

  private defaultCursor: Cursor;

  private get canvas() {
    return this.context.canvas.getLayer();
  }

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
      this.context.graph.on(CanvasEvent.DRAG_START, this.onDragStart);
      this.context.graph.on(CanvasEvent.DRAG, this.onDrag);
      this.context.graph.on(CanvasEvent.DRAG_END, this.onDragEnd);
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
    await this.context.graph.translateBy(offset, animation);
  }

  private validate(event: IPointerEvent | IKeyboardEvent) {
    if (this.destroyed) return false;
    const { enable } = this.options;
    if (typeof enable === 'function') return enable(event);
    return !!enable;
  }

  private unbindEvents() {
    this.shortcut.unbindAll();
    const canvas = this.canvas;
    canvas.removeEventListener(CanvasEvent.DRAG_START, this.onDragStart);
    canvas.removeEventListener(CanvasEvent.DRAG, this.onDrag);
    canvas.removeEventListener(CanvasEvent.DRAG_END, this.onDragEnd);
  }

  public destroy(): void {
    this.shortcut.destroy();
    this.unbindEvents();
    this.context.canvas.setCursor(this.defaultCursor);
    super.destroy();
  }
}
