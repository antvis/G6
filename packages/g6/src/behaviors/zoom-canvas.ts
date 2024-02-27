import { isArray, isFunction, isObject } from '@antv/util';
import { CanvasEvent } from '../constants';
import type { RuntimeContext } from '../runtime/types';
import type { BehaviorEvent, ViewportAnimationEffectTiming } from '../types';
import type { ShortcutKey } from '../utils/shortcut';
import { Shortcut } from '../utils/shortcut';
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
  enable?: boolean | ((event: BehaviorEvent<WheelEvent> | BehaviorEvent<KeyboardEvent>) => boolean);
  /**
   * <zh/> 触发缩放的方式
   *
   * <en/> The way to trigger zoom
   * @description
   * <zh/>
   * - 数组：组合快捷键，默认使用滚轮缩放，['Control'] 表示按住 Control 键滚动鼠标滚轮时触发缩放
   * - 对象：缩放快捷键，例如 { zoomIn: ['Control', '+'], zoomOut: ['Control', '-'], reset: ['Control', '0'] }
   *
   * <en/>
   * - Array: Combination shortcut key, default to zoom in and out with the mouse wheel, ['Control'] means zooming when holding down the Control key and scrolling the mouse wheel
   * - Object: Zoom shortcut key, such as { zoomIn: ['Control', '+'], zoomOut: ['Control', '-'], reset: ['Control', '0'] }
   */
  trigger?: ShortcutKey | CombinationKey;
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
  zoomIn: ShortcutKey;
  zoomOut: ShortcutKey;
  reset: ShortcutKey;
};

export class ZoomCanvas extends BaseBehavior<ZoomCanvasOptions> {
  static defaultOptions: Partial<ZoomCanvasOptions> = {
    animation: { duration: 200 },
    enable: true,
    sensitivity: 1,
    trigger: [],
  };

  private shortcut: Shortcut;

  private get animation() {
    return this.context.options.animation ? this.options.animation : false;
  }

  constructor(context: RuntimeContext, options: ZoomCanvasOptions) {
    super(context, Object.assign({}, ZoomCanvas.defaultOptions, options));

    this.shortcut = new Shortcut(context.graph);

    this.bindEvents();
  }

  public update(options: Partial<ZoomCanvasOptions>): void {
    super.update(options);
    this.bindEvents();
  }

  private bindEvents() {
    const { trigger } = this.options;
    this.shortcut.unbindAll();

    if (isArray(trigger)) {
      if (trigger.includes(CanvasEvent.WHEEL)) {
        this.preventDefault(CanvasEvent.WHEEL);
      }
      this.shortcut.bind([...trigger, CanvasEvent.WHEEL], this.onWheel);
    }

    if (isObject(trigger)) {
      const { zoomIn = [], zoomOut = [], reset = [] } = trigger as CombinationKey;
      this.shortcut.bind(zoomIn, (event) => this.zoom(1, event));
      this.shortcut.bind(zoomOut, (event) => this.zoom(-1, event));
      this.shortcut.bind(reset, this.onReset);
    }
  }

  private onWheel = (event: BehaviorEvent<WheelEvent>) => {
    const { deltaX, deltaY } = event;
    const delta = -(deltaY || deltaX);
    this.zoom(delta, event);
  };

  /**
   * <zh/> 缩放画布
   *
   * <en/> Zoom canvas
   * @param value - <zh/> 缩放值， > 0 放大， < 0 缩小 | <en/> Zoom value, > 0 zoom in, < 0 zoom out
   * @param event - <zh/> 事件对象 | <en/> Event object
   */
  private zoom = async (value: number, event: BehaviorEvent<WheelEvent> | BehaviorEvent<KeyboardEvent>) => {
    if (!this.validate(event)) return;
    const { viewport } = this.context;
    if (!viewport) return;

    const { sensitivity, onfinish } = this.options;
    const diff = (value * sensitivity) / 10;
    const zoom = viewport.getZoom();
    await viewport.zoom({ mode: 'absolute', value: zoom + diff }, this.animation);

    onfinish?.();
  };

  private onReset = async () => {
    const { viewport } = this.context;
    await viewport?.zoom({ mode: 'absolute', value: 1 }, this.animation);
  };

  private validate(event: BehaviorEvent<WheelEvent> | BehaviorEvent<KeyboardEvent>) {
    if (this.destroyed) return false;
    const { enable } = this.options;
    if (isFunction(enable)) return enable(event);
    return !!enable;
  }

  private preventDefault(eventName: string) {
    const listener = (e: Event) => e.preventDefault();
    const container = this.context.canvas.getContainer();
    if (!container) return;
    container.addEventListener(eventName, listener);
  }
}
