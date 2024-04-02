import type { FederatedWheelEvent } from '@antv/g';
import { isFunction, isObject, isPlainObject } from '@antv/util';
import { CanvasEvent } from '../constants';
import type { RuntimeContext } from '../runtime/types';
import { BehaviorEvent, Point } from '../types';
import { Shortcut, ShortcutKey } from '../utils/shortcut';
import type { BaseBehaviorOptions } from './base-behavior';
import { BaseBehavior } from './base-behavior';

export interface ScrollCanvasOptions extends BaseBehaviorOptions {
  /**
   * <zh/> 是否启用滚动画布的功能
   *
   * <en/> Whether to enable the function of scrolling the canvas
   */
  enable?:
    | boolean
    | EnableOptions
    | ((event: BehaviorEvent<FederatedWheelEvent> | BehaviorEvent<KeyboardEvent>) => boolean);
  /**
   * <zh/> 触发滚动的方式，默认使用指针滚动
   *
   * <en/> The way to trigger scrolling, default to scrolling with the pointer pressed
   */
  trigger?: CombinationKey;
  /**
   * <zh/> 允许的滚动方向。选项有："x"、"y"，默认情况下没有限制
   *
   * <en/> The allowed rolling direction. The options are "x" and "y", with no restrictions by default
   */
  direction?: 'x' | 'y';
  /**
   * <zh/> 滚动灵敏度
   *
   * <en/> Scroll sensitivity
   */
  sensitivity?: number;
  /**
   * <zh/> 完成滚动时的回调
   *
   * <en/> Callback when scrolling is completed
   */
  onfinish?: () => void;
}

type CombinationKey = {
  up: ShortcutKey;
  down: ShortcutKey;
  left: ShortcutKey;
  right: ShortcutKey;
};

type EnableOptions = {
  node?: boolean;
  edge?: boolean;
  combo?: boolean;
};

export class ScrollCanvas extends BaseBehavior<ScrollCanvasOptions> {
  static defaultOptions: ScrollCanvasOptions = {
    enable: true,
    sensitivity: 1,
  };

  private shortcut: Shortcut;

  constructor(context: RuntimeContext, options: ScrollCanvasOptions) {
    super(context, Object.assign({}, ScrollCanvas.defaultOptions, options));

    this.shortcut = new Shortcut(context.graph);

    this.bindEvents();
  }

  private bindEvents() {
    const { trigger } = this.options;
    this.shortcut.unbindAll();
    const { graph } = this.context;
    if (isObject(trigger)) {
      graph.off(CanvasEvent.WHEEL, this.onWheel);
      const { up = [], down = [], left = [], right = [] } = trigger;

      this.shortcut.bind(up, (event) => this.scroll([0, -10], event));
      this.shortcut.bind(down, (event) => this.scroll([0, 10], event));
      this.shortcut.bind(left, (event) => this.scroll([-10, 0], event));
      this.shortcut.bind(right, (event) => this.scroll([10, 0], event));
    } else {
      graph.on(CanvasEvent.WHEEL, this.onWheel);
    }
  }

  private onWheel = async (ev: BehaviorEvent<FederatedWheelEvent>) => {
    const diffX = ev.deltaX || ev.movement.x;
    const diffY = ev.deltaY || ev.movement.y;

    await this.scroll([-diffX, -diffY], ev);
  };

  private formatDisplacement([dx, dy]: Point) {
    const { direction, sensitivity } = this.options;

    dx = dx * sensitivity;
    dy = dy * sensitivity;

    if (direction === 'x') {
      dy = 0;
    } else if (direction === 'y') {
      dx = 0;
    }

    return [dx, dy] as Point;
  }

  private async scroll(value: Point, event: BehaviorEvent<FederatedWheelEvent> | BehaviorEvent<KeyboardEvent>) {
    if (!this.validate(event)) return;
    const { onfinish } = this.options;
    const graph = this.context.graph;
    const formattedValue = this.formatDisplacement(value);
    await graph.translateBy(formattedValue, false);
    onfinish?.();
  }

  private validate(evt: BehaviorEvent<FederatedWheelEvent> | BehaviorEvent<KeyboardEvent>) {
    const { targetType } = evt;
    if (this.destroyed) return false;

    const { enable } = this.options;
    if (isFunction(enable)) return enable(evt);
    else if (isPlainObject(enable)) {
      return targetType in enable ? !!enable[targetType as keyof EnableOptions] : true;
    }
    return !!enable;
  }
}
