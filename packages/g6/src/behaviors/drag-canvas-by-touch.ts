import { RuntimeContext } from '../runtime/types';
import { BaseBehavior, BaseBehaviorOptions } from './base-behavior';
import { DragCanvas } from './drag-canvas';

import { Vector2 } from '@antv/component/lib/types';
import { getExpandedBBox, getPointBBox, isPointInBBox } from '..//utils/bbox';
import { IPointerEvent, PointObject, ViewportAnimationEffectTiming } from '../types';
import GraphTouchEvent, { TouchEventEnum, TouchListType } from '../utils/event/graph-touch-event';
import { parsePadding } from '../utils/padding';
import { subtract } from '../utils/vector';

/**
 * <zh/> 手指拖拽画布交互配置项
 *
 * <en/> Drag canvas by touch behavior options
 */
export interface DragCanvasByTouchOptions extends BaseBehaviorOptions {
  /**
   * <zh/> 是否启用手指拖拽画布的功能
   *
   * <en/> Whether to enable the function of dragging the canvas by touch
   * @defaultValue true
   */
  enable?: boolean | ((event: IPointerEvent) => boolean);
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

  /**
   * <zh/> 完成拖拽时的回调
   *
   * <en/> Callback when dragging is completed
   */
  onFinish?: () => void;
}

export class DragCanvasByTouch extends BaseBehavior<DragCanvasByTouchOptions> {
  static defaultOptions: Partial<DragCanvasByTouchOptions> = {
    enable: (event) => {
      if ('targetType' in event) return event.targetType === 'canvas';
      return true;
    },
    direction: 'both',
    range: Infinity,
  };
  private prePosition: PointObject = { x: 0, y: 0 };
  private readonly graphTouchEvent: GraphTouchEvent | null = null;
  private touchList: TouchListType;

  constructor(context: RuntimeContext, options: DragCanvasByTouchOptions) {
    super(context, Object.assign({}, DragCanvas.defaultOptions, options));
    const { graph } = context;
    this.touchList = [];
    this.graphTouchEvent = graph.getGraphTouchEvent();
    this.bindEvents(this.graphTouchEvent);
  }

  /**
   * <zh/> 更新配置
   *
   * <en/> Update options
   * @param options - <zh/> 配置项 | <en/> Options
   * @internal
   */
  public update(options: Partial<DragCanvasByTouchOptions>): void {
    this.unbindEvents();
    super.update(options);
    if (this.graphTouchEvent) {
      this.bindEvents(this.graphTouchEvent);
    }
  }

  private bindEvents(graphTouchEvent: GraphTouchEvent) {
    graphTouchEvent.on(TouchEventEnum.TOUCH_START, this.onDragStart.bind(this), this.options.key);
    graphTouchEvent.on(TouchEventEnum.TOUCH_MOVE, this.onDrag.bind(this), this.options.key);
    graphTouchEvent.on(TouchEventEnum.TOUCH_END, this.onDragEnd.bind(this), this.options.key);
  }

  private isDragging = false;

  private onDragStart = (touchList: TouchListType) => {
    if (!this.validate(touchList)) return;
    this.touchList = touchList;
    this.updateOtherBehaviors(false);
    this.prePosition = Object.assign({}, touchList[0].client);
    this.isDragging = true;
  };
  updateOtherBehaviors(enable: boolean) {
    const { graph } = this.context;
    // 防止拖拽事件与以下交互冲突
    graph.updateBehavior({
      key: 'drag-element',
      enable,
    });
    graph.updateBehavior({
      key: 'hover-activate',
      enable,
    });
    graph.updatePlugin({
      key: 'my-context-menu',
      enable,
    });
  }
  private onDrag = (event: TouchListType) => {
    if (!this.isDragging || !this.validate(this.touchList)) return;
    const currentPosition = Object.assign({}, event[0].client);
    const offset = { x: currentPosition.x - this.prePosition.x, y: currentPosition.y - this.prePosition.y };
    const { x, y } = offset;
    if ((x | y) !== 0) {
      this.translate([x, y], false);
      this.prePosition = Object.assign({}, event[0].client);
    }
  };

  private onDragEnd = () => {
    this.touchList = [];
    this.isDragging = false;
    this.options.onFinish?.();
    this.updateOtherBehaviors(true);
  };

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

  private validate(event: TouchListType) {
    if (event.length === 0) return false;
    if (this.destroyed || event.length > 1) return false;
    const { enable } = this.options;
    if (typeof enable === 'function') return enable(event[0]);
    return !!enable;
  }

  private unbindEvents() {
    if (this.graphTouchEvent) {
      this.graphTouchEvent.unsubscribe(TouchEventEnum.TOUCH_START, this.options.key);
      this.graphTouchEvent.unsubscribe(TouchEventEnum.TOUCH_MOVE, this.options.key);
      this.graphTouchEvent.unsubscribe(TouchEventEnum.TOUCH_END, this.options.key);
    }
  }

  public destroy(): void {
    this.unbindEvents();
    super.destroy();
  }
}
