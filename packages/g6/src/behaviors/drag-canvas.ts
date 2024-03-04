import type { Cursor, FederatedMouseEvent } from '@antv/g';
import { isFunction, isObject } from '@antv/util';
import { CanvasEvent } from '../constants';
import { RuntimeContext } from '../runtime/types';
import type { BehaviorEvent, Point, ViewportAnimationEffectTiming } from '../types';
import type { ShortcutKey } from '../utils/shortcut';
import { Shortcut } from '../utils/shortcut';
import { multiply } from '../utils/vector';
import type { BaseBehaviorOptions } from './base-behavior';
import { BaseBehavior } from './base-behavior';

export interface DragCanvasOptions extends BaseBehaviorOptions {
  /**
   * <zh/> 是否启用缩放动画，仅在使用按键移动时有效
   *
   * <en/> Whether to enable the animation of zooming, only valid when using key movement
   */
  animation?: ViewportAnimationEffectTiming;
  /**
   * <zh/> 是否启用拖拽画布的功能
   *
   * <en/> Whether to enable the function of dragging the canvas
   */
  enable?: boolean | ((event: BehaviorEvent<FederatedMouseEvent> | BehaviorEvent<KeyboardEvent>) => boolean);
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
  onfinish?: () => void;
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

  private get animation() {
    return this.context.options.animation ? this.options.animation : false;
  }

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

      this.shortcut.bind(up, (event) => this.translate([0, 1], event));
      this.shortcut.bind(down, (event) => this.translate([0, -1], event));
      this.shortcut.bind(left, (event) => this.translate([1, 0], event));
      this.shortcut.bind(right, (event) => this.translate([-1, 0], event));
    } else {
      graph.on(CanvasEvent.DRAG, this.onDrag);
    }
  }

  private onDrag = (event: BehaviorEvent<FederatedMouseEvent>) => {
    if (event.targetType === 'canvas') {
      this.context.graph.translateBy([event.movement.x, event.movement.y], this.animation);
    }
  };

  private translate(value: Point, event: BehaviorEvent<FederatedMouseEvent> | BehaviorEvent<KeyboardEvent>) {
    if (!this.validate(event)) return;
    const { sensitivity } = this.options;
    const delta = sensitivity * -1;
    this.context.graph.translateBy(multiply(value, delta), this.animation);
  }

  private validate(event: BehaviorEvent<FederatedMouseEvent> | BehaviorEvent<KeyboardEvent>) {
    if (this.destroyed) return false;
    const { enable } = this.options;
    if (isFunction(enable)) return enable(event);
    return !!enable;
  }

  public destroy(): void {
    this.context.canvas.setCursor(this.defaultCursor);
    super.destroy();
  }
}
