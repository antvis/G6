import type { Cursor } from '@antv/g';
import { isFunction, isObject } from '@antv/util';
import { CanvasEvent } from '../constants';
import type { RuntimeContext } from '../runtime/types';
import type { IKeyboardEvent, IPointerEvent, Vector2, ViewportAnimationEffectTiming } from '../types';
import type { ShortcutKey } from '../utils/shortcut';
import { Shortcut } from '../utils/shortcut';
import { multiply } from '../utils/vector';
import type { BaseBehaviorOptions } from './base-behavior';
import { BaseBehavior } from './base-behavior';

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
   */
  enable?: boolean | ((event: IPointerEvent | IKeyboardEvent) => boolean);
  /**
   * <zh/> 触发拖拽的方式，默认使用指针按下拖拽
   *
   * <en/> The way to trigger dragging, default to dragging with the pointer pressed
   */
  trigger?: CombinationKey;
  /**
   * <zh/> 触发一次按键移动的距离
   *
   * <en/> The distance of a single key movement
   */
  sensitivity?: number;
  /**
   * <zh/> 完成拖拽时的回调
   *
   * <en/> Callback when dragging is completed
   */
  onFinish?: () => void;
}

type CombinationKey = {
  up: ShortcutKey;
  down: ShortcutKey;
  left: ShortcutKey;
  right: ShortcutKey;
};

export class DragCanvas extends BaseBehavior<DragCanvasOptions> {
  static defaultOptions: Partial<DragCanvasOptions> = {
    enable: true,
    sensitivity: 10,
  };

  private shortcut: Shortcut;

  private defaultCursor: Cursor;

  constructor(context: RuntimeContext, options: DragCanvasOptions) {
    super(context, Object.assign({}, DragCanvas.defaultOptions, options));

    this.shortcut = new Shortcut(context.graph);

    this.bindEvents();
    this.defaultCursor = this.context.canvas.getConfig().cursor || 'default';
    context.canvas.setCursor('grab');
  }

  private bindEvents() {
    const { trigger } = this.options;
    this.shortcut.unbindAll();
    const { graph } = this.context;

    if (isObject(trigger)) {
      graph.off(CanvasEvent.DRAG, this.onDrag);
      const { up = [], down = [], left = [], right = [] } = trigger;

      this.shortcut.bind(up, (event) => this.onTranslate([0, 1], event));
      this.shortcut.bind(down, (event) => this.onTranslate([0, -1], event));
      this.shortcut.bind(left, (event) => this.onTranslate([1, 0], event));
      this.shortcut.bind(right, (event) => this.onTranslate([-1, 0], event));
    } else {
      graph.on(CanvasEvent.DRAG, this.onDrag);
    }
  }

  private onDrag = (event: IPointerEvent) => {
    if (!this.validate(event)) return;
    if (event.targetType === 'canvas') {
      this.translate([event.movement.x, event.movement.y], false);
      this.options.onFinish?.();
    }
  };

  private async onTranslate(value: Vector2, event: IPointerEvent | IKeyboardEvent) {
    if (!this.validate(event)) return;
    const { sensitivity } = this.options;
    const delta = sensitivity * -1;
    await this.translate(multiply(value, delta) as Vector2, this.options.animation);
    this.options.onFinish?.();
  }

  protected async translate(offset: Vector2, animation?: ViewportAnimationEffectTiming) {
    await this.context.graph.translateBy(offset, animation);
  }

  private validate(event: IPointerEvent | IKeyboardEvent) {
    if (this.destroyed) return false;
    const { enable } = this.options;
    if (isFunction(enable)) return enable(event);
    return !!enable;
  }

  public destroy(): void {
    this.shortcut.destroy();
    this.context.canvas.setCursor(this.defaultCursor);
    super.destroy();
  }
}
