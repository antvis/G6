import { isArray, isEqual, isObject } from '@antv/util';
import { CommonEvent } from '../constants';
import type { RuntimeContext } from '../runtime/types';
import type { BehaviorEvent, Loose, ViewportAnimationEffectTiming } from '../types';
import type { BaseBehaviorOptions } from './base-behavior';
import { BaseBehavior } from './base-behavior';

export interface ZoomCanvasOptions extends BaseBehaviorOptions {
  /**
   * <zh/> 是否启用缩放动画
   *
   * <en/> Whether to enable the animation of zooming
   */
  animation?: ViewportAnimationEffectTiming;
  /**
   * <zh/> 是否启用缩放画布的功能
   *
   * <en/> Whether to enable the function of zooming the canvas
   */
  enable?: boolean | ((event: BehaviorEvent) => boolean);
  /**
   * <zh/> 触发缩放的方式
   *
   * <en/> The way to trigger zoom
   * @description
   * <zh/>
   * - 'wheel'：滚动鼠标滚轮或触摸板时触发缩放
   * - 数组：组合快捷键，例如 ['ctrl'] 表示按住 ctrl 键滚动鼠标滚轮时触发缩放
   * - 对象：缩放快捷键，例如 { zoomIn: ['ctrl', '+'], zoomOut: ['ctrl', '-'], reset: ['ctrl', '0'] }
   *
   * <en/>
   * - 'wheel': Trigger zoom when scrolling the mouse wheel or touchpad
   * - Array: Combination shortcut keys, such as ['ctrl'] means zooming when scrolling the mouse wheel while holding down the ctrl key
   * - Object: Zoom shortcut keys, such as { zoomIn: ['ctrl', '+'], zoomOut: ['ctrl', '-'], reset: ['ctrl', '0'] }
   */
  trigger?: Loose<CommonEvent.WHEEL> | string[] | CombinationKey;
  /**
   * <zh/> 缩放灵敏度
   *
   * <en/> Zoom sensitivity
   */
  sensitivity?: number;
  /**
   * <zh/> 完成缩放时的回调
   *
   * <en/> Callback when zooming is completed
   */
  onfinish?: () => void;
}

type CombinationKey = {
  zoomIn: string[];
  zoomOut: string[];
  reset: string[];
};

export class ZoomCanvas extends BaseBehavior<ZoomCanvasOptions> {
  private preconditionKey?: string[];

  private recordKey = new Set<string>();

  private combinationKey: CombinationKey = {
    zoomIn: [],
    zoomOut: [],
    reset: [],
  };

  private get animation() {
    return this.context.options.animation ? this.options.animation : false;
  }

  public get defaultOptions(): Partial<ZoomCanvasOptions> {
    return { animation: { duration: 200 }, enable: true, sensitivity: 1, trigger: CommonEvent.WHEEL };
  }

  constructor(context: RuntimeContext, options: ZoomCanvasOptions) {
    super(context, options);

    if (isArray(this.options.trigger)) {
      this.preconditionKey = this.options.trigger;
    }

    if (isObject(this.options.trigger)) {
      this.combinationKey = this.options.trigger as CombinationKey;
    }

    this.bindEvents();
  }

  private bindEvents() {
    const { graph } = this.context;

    // wheel 触发和组合键触发需要监听 wheel 事件 / Combination key trigger and wheel trigger need to listen to the wheel event
    if (this.options.trigger === CommonEvent.WHEEL || isArray(this.options.trigger)) {
      this.preventDefault(CommonEvent.WHEEL);
      this.addEventListener(graph, CommonEvent.WHEEL, this.onWheel.bind(this));
    }

    if (isObject(this.options.trigger)) {
      this.addEventListener(graph, CommonEvent.KEY_DOWN, this.onKeydown.bind(this));
      this.addEventListener(graph, CommonEvent.KEY_UP, this.onKeyup.bind(this));
    }
  }

  private onWheel(event: BehaviorEvent<WheelEvent>) {
    const { deltaX, deltaY } = event;
    const delta = -(deltaY || deltaX);
    this.zoom(delta, event);
  }

  private onKeydown(event: BehaviorEvent<KeyboardEvent>) {
    const { key } = event;
    this.recordKey.add(key);

    if (this.isTrigger(this.combinationKey.zoomIn)) {
      this.zoom(1, event);
    } else if (this.isTrigger(this.combinationKey.zoomOut)) {
      this.zoom(-1, event);
    } else if (this.isTrigger(this.combinationKey.reset)) {
      this.reset();
    }
  }

  private onKeyup(event: KeyboardEvent) {
    const { key } = event;
    this.recordKey.delete(key);
  }

  private isTrigger(keys: string[]) {
    return isEqual(Array.from(this.recordKey), keys);
  }

  /**
   * <zh/> 缩放画布
   *
   * <en/> Zoom canvas
   * @param value - <zh/> 缩放值， > 0 放大， < 0 缩小 | <en/> Zoom value, > 0 zoom in, < 0 zoom out
   * @param event - <zh/> 事件对象 | <en/> Event object
   */
  private async zoom(value: number, event: BehaviorEvent<WheelEvent> | BehaviorEvent<KeyboardEvent>) {
    if (!this.validate(event)) return;
    const { viewport } = this.context;
    if (!viewport) return;

    const { sensitivity, onfinish } = this.options;
    const diff = (value * sensitivity) / 10;
    const zoom = viewport.getZoom();
    await viewport.zoom({ mode: 'absolute', value: zoom + diff }, this.animation);

    onfinish?.();
  }

  private async reset() {
    const { viewport } = this.context;
    await viewport?.zoom({ mode: 'absolute', value: 1 }, this.animation);
  }

  private validate(event: BehaviorEvent<WheelEvent> | BehaviorEvent<KeyboardEvent>) {
    if (this.preconditionKey && !isEqual(this.preconditionKey, Array.from(this.recordKey))) return false;

    const { enable } = this.options;
    if (typeof enable === 'function' && !enable(event)) return false;
    if (enable === false) return false;
    return true;
  }

  private preventDefault(eventName: string) {
    const listener = (e: Event) => e.preventDefault();
    const container = this.context.canvas.getContainer();
    if (!container) return;
    this.addEventListener(container, eventName, listener);
  }
}
