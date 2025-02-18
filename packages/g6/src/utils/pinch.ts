import EventEmitter from '@antv/event-emitter';
import { CommonEvent } from '../constants';
import { IPointerEvent } from '../types';

/**
 * <zh/> 表示指针位置的点坐标
 *
 * <en/> Represents the coordinates of a pointer position
 */
export interface PointerPoint {
  x: number;
  y: number;
  pointerId: number;
}

/**
 * <zh/> 捏合事件参数
 *
 * <en/> Pinch event parameters
 * @remarks
 * <zh/> 包含与捏合手势相关的参数，当前支持缩放比例，未来可扩展中心点坐标、旋转角度等参数
 *
 * <en/> Contains parameters related to pinch gestures, currently supports scale factor,
 * can be extended with center coordinates, rotation angle etc. in the future
 */
export interface PinchEventOptions {
  /**
   * <zh/> 缩放比例因子，>1 表示放大，<1 表示缩小
   *
   * <en/> Scaling factor, >1 indicates zoom in, <1 indicates zoom out
   */
  scale: number;
}

/**
 * <zh/> 捏合手势回调函数类型
 *
 * <en/> Pinch gesture callback function type
 * @param event - <zh/> 原始指针事件对象 | <en/> Original pointer event object
 * @param options - <zh/> 捏合事件参数对象 | <en/> Pinch event parameters object
 */
export type PinchCallback = (event: IPointerEvent, options: PinchEventOptions) => void;

/**
 * <zh/> 捏合手势处理器
 *
 * <en/> Pinch gesture handler
 * @remarks
 * <zh/> 处理双指触摸事件，计算缩放比例并触发回调。通过跟踪两个触摸点的位置变化，计算两点间距离变化率来确定缩放比例。
 *
 * <en/> Handles two-finger touch events, calculates zoom ratio and triggers callbacks. Tracks position changes of two touch points to determine zoom ratio based on distance variation.
 */
export class PinchHandler {
  public isPinchStage: boolean = false;

  /**
   * <zh/> 当前跟踪的触摸点集合
   *
   * <en/> Currently tracked touch points collection
   */
  private pointerByTouch: PointerPoint[] = [];

  /**
   * <zh/> 初始两点间距离
   *
   * <en/> Initial distance between two points
   */
  private initialDistance: number | null = null;

  private emitter: EventEmitter;

  constructor(
    emitter: EventEmitter,
    private callback: PinchCallback,
  ) {
    this.emitter = emitter;
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.bindEvents();
  }

  private bindEvents() {
    const { emitter } = this;
    emitter.on(CommonEvent.POINTER_DOWN, this.onPointerDown);
    emitter.on(CommonEvent.POINTER_MOVE, this.onPointerMove);
    emitter.on(CommonEvent.POINTER_UP, this.onPointerUp);
  }

  /**
   * <zh/> 更新指定指针的位置
   *
   * <en/> Update position of specified pointer
   * @param pointerId - <zh/> 指针唯一标识符 | <en/> Pointer unique identifier<sup>1</sup>
   * @param x - <zh/> 新的X坐标 | <en/> New X coordinate
   * @param y - <zh/> 新的Y坐标 | <en/> New Y coordinate
   */
  private updatePointerPosition(pointerId: number, x: number, y: number) {
    const index = this.pointerByTouch.findIndex((p) => p.pointerId === pointerId);
    if (index >= 0) {
      this.pointerByTouch[index] = { x, y, pointerId };
    }
  }

  /**
   * <zh/> 处理指针按下事件
   *
   * <en/> Handle pointer down event
   * @param event - <zh/> 指针事件对象 | <en/> Pointer event object
   * @remarks
   * <zh/> 当检测到两个触摸点时记录初始距离
   *
   * <en/> Record initial distance when detecting two touch points
   */
  onPointerDown(event: IPointerEvent) {
    const { x, y } = event.client;
    if (x === undefined || y === undefined) return;
    this.pointerByTouch.push({ x, y, pointerId: event.pointerId });

    if (event.pointerType === 'touch' && this.pointerByTouch.length === 2) {
      this.isPinchStage = true;
      const dx = this.pointerByTouch[0].x - this.pointerByTouch[1].x;
      const dy = this.pointerByTouch[0].y - this.pointerByTouch[1].y;
      this.initialDistance = Math.sqrt(dx * dx + dy * dy);
    }
  }

  /**
   * <zh/> 处理指针移动事件
   *
   * <en/> Handle pointer move event
   * @param event - <zh/> 指针事件对象 | <en/> Pointer event object
   * @remarks
   * <zh/> 当存在两个有效触摸点时计算缩放比例
   *
   * <en/> Calculate zoom ratio when two valid touch points exist
   */
  onPointerMove(event: IPointerEvent) {
    if (this.pointerByTouch.length !== 2 || this.initialDistance === null) return;
    const { x, y } = event.client;
    if (x === undefined || y === undefined) return;
    this.updatePointerPosition(event.pointerId, x, y);
    const dx = this.pointerByTouch[0].x - this.pointerByTouch[1].x;
    const dy = this.pointerByTouch[0].y - this.pointerByTouch[1].y;
    const currentDistance = Math.sqrt(dx * dx + dy * dy);
    const ratio = currentDistance / this.initialDistance;

    this.callback(event, { scale: (ratio - 1) * 5 });
  }

  /**
   * <zh/> 处理指针抬起事件
   *
   * <en/> Handle pointer up event
   * @remarks
   * <zh/> 重置触摸状态和初始距离
   *
   * <en/> Reset touch state and initial distance
   */
  onPointerUp() {
    this.isPinchStage = false;
    this.initialDistance = null;
    this.pointerByTouch = [];
  }

  /**
   * <zh/> 销毁捏合手势相关监听
   *
   * <en/> Destroy pinch gesture listeners
   * @remarks
   * <zh/> 移除指针按下、移动、抬起事件的监听
   *
   * <en/> Remove listeners for pointer down, move, and up events
   */
  destroy() {
    this.emitter.off(CommonEvent.POINTER_DOWN, this.onPointerDown);
    this.emitter.off(CommonEvent.POINTER_MOVE, this.onPointerMove);
    this.emitter.off(CommonEvent.POINTER_UP, this.onPointerUp);
  }
}
