import { clamp, isFunction } from '@antv/util';
import { CommonEvent } from '../constants';
import type { RuntimeContext } from '../runtime/types';
import type { IKeyboardEvent, IWheelEvent, Point, PointObject, ViewportAnimationEffectTiming } from '../types';
import { parsePoint } from '../utils/point';
import type { ShortcutKey } from '../utils/shortcut';
import { Shortcut } from '../utils/shortcut';
import type { BaseBehaviorOptions } from './base-behavior';
import { BaseBehavior } from './base-behavior';

/**
 * <zh/> 缩放画布交互配置项
 *
 * <en/> Zoom canvas behavior options
 */
export interface ZoomCanvasOptions extends BaseBehaviorOptions {
  /**
   * <zh/> 是否启用缩放动画
   *
   * <en/> Whether to enable the animation of zooming
   * @defaultValue '{ duration: 200 }'
   */
  animation?: ViewportAnimationEffectTiming;
  /**
   * <zh/> 是否启用缩放画布的功能
   *
   * <en/> Whether to enable the function of zooming the canvas
   * @defaultValue true
   */
  enable?: boolean | ((event: IWheelEvent | IKeyboardEvent) => boolean);
  /**
   * <zh/> 触发缩放的方式
   * - ShortcutKey：组合快捷键，**默认使用滚轮缩放**，['Control'] 表示按住 Control 键滚动鼠标滚轮时触发缩放
   * - CombinationKey：缩放快捷键，例如 { zoomIn: ['Control', '+'], zoomOut: ['Control', '-'], reset: ['Control', '0'] }
   *
   * <en/> The way to trigger zoom
   * - ShortcutKey: Combination shortcut key, **default to zoom with the mouse wheel**, ['Control'] means zooming when holding down the Control key and scrolling the mouse wheel
   * - CombinationKey: Zoom shortcut key, such as { zoomIn: ['Control', '+'], zoomOut: ['Control', '-'], reset: ['Control', '0'] }
   */
  trigger?:
    | ShortcutKey
    | {
        zoomIn: ShortcutKey;
        zoomOut: ShortcutKey;
        reset: ShortcutKey;
      };
  /**
   * <zh/> 缩放灵敏度
   *
   * <en/> Zoom sensitivity
   * @defaultValue 1
   */
  sensitivity?: number;
  /**
   * <zh/> 完成缩放时的回调
   *
   * <en/> Callback when zooming is completed
   */
  onFinish?: () => void;
  /**
   * <zh/> 是否阻止默认事件
   *
   * <en/> Whether to prevent the default event
   * @defaultValue true
   */
  preventDefault?: boolean;
}

/**
 * <zh/> 缩放画布交互
 *
 * <en/> Zoom canvas behavior
 */
export class ZoomCanvas extends BaseBehavior<ZoomCanvasOptions> {
  static defaultOptions: Partial<ZoomCanvasOptions> = {
    animation: { duration: 200 },
    enable: true,
    sensitivity: 1,
    trigger: [],
    preventDefault: true,
  };

  private shortcut: Shortcut;

  constructor(context: RuntimeContext, options: ZoomCanvasOptions) {
    super(context, Object.assign({}, ZoomCanvas.defaultOptions, options));

    this.shortcut = new Shortcut(context.graph);

    this.bindEvents();
  }

  /**
   * <zh/> 更新配置
   *
   * <en/> Update options
   * @param options - <zh/> 配置项 | <en/> Options
   * @internal
   */
  public update(options: Partial<ZoomCanvasOptions>): void {
    super.update(options);
    this.bindEvents();
  }

  private bindEvents() {
    const { trigger } = this.options;
    this.shortcut.unbindAll();

    if (Array.isArray(trigger)) {
      this.context.canvas.getContainer()?.addEventListener(CommonEvent.WHEEL, this.preventDefault);
      this.shortcut.bind([...trigger, CommonEvent.WHEEL], (event) => {
        const { deltaX, deltaY } = event;
        this.zoom(-(deltaY ?? deltaX), event, false);
      });
    }

    if (typeof trigger === 'object') {
      const {
        zoomIn = [],
        zoomOut = [],
        reset = [],
      } = trigger as {
        zoomIn: ShortcutKey;
        zoomOut: ShortcutKey;
        reset: ShortcutKey;
      };
      this.shortcut.bind(zoomIn, (event) => this.zoom(10, event, this.options.animation));
      this.shortcut.bind(zoomOut, (event) => this.zoom(-10, event, this.options.animation));
      this.shortcut.bind(reset, this.onReset);
    }
  }

  /**
   * <zh/> 缩放画布
   *
   * <en/> Zoom canvas
   * @param value - <zh/> 缩放值， > 0 放大， < 0 缩小 | <en/> Zoom value, > 0 zoom in, < 0 zoom out
   * @param event - <zh/> 事件对象 | <en/> Event object
   * @param animation - <zh/> 缩放动画配置 | <en/> Zoom animation configuration
   */
  protected zoom = async (
    value: number,
    event: IWheelEvent | IKeyboardEvent,
    animation: ZoomCanvasOptions['animation'],
  ) => {
    if (!this.validate(event)) return;
    const { graph } = this.context;

    let origin: Point | undefined;
    if ('viewport' in event) {
      origin = parsePoint(event.viewport as PointObject);
    }

    const { sensitivity, onFinish } = this.options;
    const ratio = 1 + (clamp(value, -50, 50) * sensitivity) / 100;
    const zoom = graph.getZoom();
    await graph.zoomTo(zoom * ratio, animation, origin);

    onFinish?.();
  };

  protected onReset = async () => {
    await this.context.graph.zoomTo(1, this.options.animation);
  };

  /**
   * <zh/> 验证是否可以缩放
   *
   * <en/> Verify whether it can be zoomed
   * @param event - <zh/> 事件对象 | <en/> Event object
   * @returns <zh/> 是否可以缩放 | <en/> Whether it can be zoomed
   * @internal
   */
  protected validate(event: IWheelEvent | IKeyboardEvent) {
    if (this.destroyed) return false;
    const { enable } = this.options;
    if (isFunction(enable)) return enable(event);
    return !!enable;
  }

  private preventDefault = (event: Event) => {
    if (this.options.preventDefault) event.preventDefault();
  };

  /**
   * <zh/> 销毁缩放画布
   *
   * <en/> Destroy zoom canvas
   */
  public destroy() {
    this.shortcut.destroy();
    this.context.canvas.getContainer()?.removeEventListener(CommonEvent.WHEEL, this.preventDefault);
    super.destroy();
  }
}
