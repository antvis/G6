import type { Tuple3Number } from '@antv/g';
import { AABB } from '@antv/g';
import { isFunction, isObject } from '@antv/util';
import { CommonEvent } from '../constants';
import type { RuntimeContext } from '../runtime/types';
import type { IKeyboardEvent, Padding, Point } from '../types';
import { getExpandedBBox, isPointInBBox } from '../utils/bbox';
import { parsePadding } from '../utils/padding';
import { Shortcut, ShortcutKey } from '../utils/shortcut';
import { multiply, subtract } from '../utils/vector';
import type { BaseBehaviorOptions } from './base-behavior';
import { BaseBehavior } from './base-behavior';

/**
 * <zh/> 滚动画布交互配置项
 *
 * <en/> Scroll canvas behavior options
 */
export interface ScrollCanvasOptions extends BaseBehaviorOptions {
  /**
   * <zh/> 是否启用滚动画布的功能
   *
   * <en/> Whether to enable the function of scrolling the canvas
   * @defaultValue true
   */
  enable?: boolean | ((event: WheelEvent | IKeyboardEvent) => boolean);
  /**
   * <zh/> 触发滚动的方式，默认使用指针滚动
   *
   * <en/> The way to trigger scrolling, default to scrolling with the pointer pressed
   */
  trigger?: {
    up: ShortcutKey;
    down: ShortcutKey;
    left: ShortcutKey;
    right: ShortcutKey;
  };
  /**
   * <zh/> 允许的滚动方向
   * - 默认情况下没有限制
   * - `'x'` : 只允许水平滚动
   * - `'y'` : 只允许垂直滚动
   *
   * <en/> The allowed rolling direction
   * - by default, there is no restriction
   * - `'x'`: only allow horizontal scrolling
   * - `'y'`: only allow vertical scrolling
   */
  direction?: 'x' | 'y';
  /**
   * <zh/> 可滚动的视口范围，默认最多可以滚动一屏的位置。可以分别设置上右下左，单个方向范围在 [0, Infinity] 之间
   *
   * <en/> The range of the scrollable viewport, by default, you can scroll to the position of one screen at most. The four directions can be set separately, and the range of a single direction is between [0, Infinity]
   * @defaultValue 1
   */
  range?: Padding;
  /**
   * <zh/> 滚动灵敏度
   *
   * <en/> Scroll sensitivity
   * @defaultValue 1
   */
  sensitivity?: number;
  /**
   * <zh/> 完成滚动时的回调
   *
   * <en/> Callback when scrolling is completed
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
 * <zh/> 滚动画布交互
 *
 * <en/> Scroll canvas behavior
 */
export class ScrollCanvas extends BaseBehavior<ScrollCanvasOptions> {
  static defaultOptions: Partial<ScrollCanvasOptions> = {
    enable: true,
    sensitivity: 1,
    preventDefault: true,
    range: 1,
  };

  private shortcut: Shortcut;

  constructor(context: RuntimeContext, options: ScrollCanvasOptions) {
    super(context, Object.assign({}, ScrollCanvas.defaultOptions, options));

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
  public update(options: Partial<ScrollCanvasOptions>): void {
    super.update(options);
    this.bindEvents();
  }

  private bindEvents() {
    const { trigger } = this.options;
    this.shortcut.unbindAll();
    if (isObject(trigger)) {
      this.graphDom?.removeEventListener(CommonEvent.WHEEL, this.onWheel);
      const { up = [], down = [], left = [], right = [] } = trigger;

      this.shortcut.bind(up, (event) => this.scroll([0, -10], event));
      this.shortcut.bind(down, (event) => this.scroll([0, 10], event));
      this.shortcut.bind(left, (event) => this.scroll([-10, 0], event));
      this.shortcut.bind(right, (event) => this.scroll([10, 0], event));
    } else {
      /**
       * 这里必需在原生canvas上绑定wheel事件，参考：
       * https://g.antv.antgroup.com/api/event/faq#%E5%9C%A8-chrome-%E4%B8%AD%E7%A6%81%E6%AD%A2%E9%A1%B5%E9%9D%A2%E9%BB%98%E8%AE%A4%E6%BB%9A%E5%8A%A8%E8%A1%8C%E4%B8%BA
       */
      this.graphDom?.addEventListener(CommonEvent.WHEEL, this.onWheel, { passive: false });
    }
  }

  get graphDom() {
    return this.context.graph.getCanvas().getContextService().getDomElement();
  }

  private onWheel = async (event: WheelEvent) => {
    if (this.options.preventDefault) event.preventDefault();
    const diffX = event.deltaX;
    const diffY = event.deltaY;

    await this.scroll([-diffX, -diffY], event);
  };

  private formatDisplacement(d: Point) {
    const { sensitivity } = this.options;

    d = multiply(d, sensitivity);
    d = this.clampByDirection(d);
    d = this.clampByRange(d);

    return d;
  }

  private clampByDirection([dx, dy]: Point) {
    const { direction } = this.options;
    if (direction === 'x') {
      dy = 0;
    } else if (direction === 'y') {
      dx = 0;
    }
    return [dx, dy] as Point;
  }

  private clampByRange([dx, dy]: Point) {
    const { viewport, canvas } = this.context;

    const canvasCenter = [...viewport!.getCanvasCenter(), 0] as Tuple3Number;
    const bbox = new AABB();
    bbox.setMinMax(canvasCenter, canvasCenter);

    const [canvasWidth, canvasHeight] = canvas.getSize();
    const [top, right, bottom, left] = parsePadding(this.options.range);
    const range = [canvasHeight * top, canvasWidth * right, canvasHeight * bottom, canvasWidth * left];
    const area = getExpandedBBox(bbox, range);

    const nextViewportCenter = subtract(viewport!.getViewportCenter(), [dx, dy, 0]);
    if (!isPointInBBox(nextViewportCenter, area)) {
      const {
        min: [minX, minY],
        max: [maxX, maxY],
      } = area;

      if ((nextViewportCenter[0] < minX && dx > 0) || (nextViewportCenter[0] > maxX && dx < 0)) {
        dx = 0;
      }
      if ((nextViewportCenter[1] < minY && dy > 0) || (nextViewportCenter[1] > maxY && dy < 0)) {
        dy = 0;
      }
    }
    return [dx, dy] as Point;
  }

  private async scroll(value: Point, event: WheelEvent | IKeyboardEvent) {
    if (!this.validate(event)) return;
    const { onFinish } = this.options;
    const graph = this.context.graph;
    const formattedValue = this.formatDisplacement(value);
    await graph.translateBy(formattedValue, false);
    onFinish?.();
  }

  private validate(event: WheelEvent | IKeyboardEvent) {
    if (this.destroyed) return false;

    const { enable } = this.options;
    if (isFunction(enable)) return enable(event);
    return !!enable;
  }
  /**
   * <zh/> 销毁画布滚动
   *
   * <en/> Destroy the canvas scrolling
   */
  public destroy(): void {
    this.shortcut.destroy();
    this.graphDom?.removeEventListener(CommonEvent.WHEEL, this.onWheel);
    super.destroy();
  }
}
