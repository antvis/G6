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
 * <zh/> 捏合手势阶段类型
 * <en/> Pinch gesture phase type
 * @remarks
 * <zh/> 包含三个手势阶段：
 * - start: 手势开始
 * - move: 手势移动中
 * - end: 手势结束
 *
 * <en/> Contains three gesture phases:
 * - pinchstart: Gesture started
 * - pinchmove: Gesture in progress
 * - pinchend: Gesture ended
 */
export type PinchEvent = 'pinchstart' | 'pinchmove' | 'pinchend';

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
  /**
   * <zh/> 是否处于 Pinch 阶段
   *
   * <en/> Whether it is in the Pinch stage
   */
  public static isPinching: boolean = false;

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
  private static instance: PinchHandler | null = null;
  private static callbacks: {
    pinchstart: PinchCallback[];
    pinchmove: PinchCallback[];
    pinchend: PinchCallback[];
  } = { pinchstart: [], pinchmove: [], pinchend: [] };

  constructor(
    emitter: EventEmitter,
    private phase: PinchEvent,
    callback: PinchCallback,
  ) {
    this.emitter = emitter;
    if (PinchHandler.instance) {
      PinchHandler.callbacks[this.phase].push(callback);
      return PinchHandler.instance;
    }
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.bindEvents();
    PinchHandler.instance = this;
    PinchHandler.callbacks[this.phase].push(callback);
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
    const { x, y } = event.client || {};
    if (x === undefined || y === undefined) return;
    this.pointerByTouch.push({ x, y, pointerId: event.pointerId });

    if (event.pointerType === 'touch' && this.pointerByTouch.length === 2) {
      PinchHandler.isPinching = true;
      const dx = this.pointerByTouch[0].x - this.pointerByTouch[1].x;
      const dy = this.pointerByTouch[0].y - this.pointerByTouch[1].y;
      this.initialDistance = Math.sqrt(dx * dx + dy * dy);
      PinchHandler.callbacks.pinchstart.forEach((cb) => cb(event, { scale: 0 }));
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
    const { x, y } = event.client || {};
    if (x === undefined || y === undefined) return;
    this.updatePointerPosition(event.pointerId, x, y);
    const dx = this.pointerByTouch[0].x - this.pointerByTouch[1].x;
    const dy = this.pointerByTouch[0].y - this.pointerByTouch[1].y;
    const currentDistance = Math.sqrt(dx * dx + dy * dy);
    const ratio = currentDistance / this.initialDistance;

    PinchHandler.callbacks.pinchmove.forEach((cb) => cb(event, { scale: (ratio - 1) * 5 }));
  }

  /**
   * <zh/> 处理指针抬起事件
   *
   * <en/> Handle pointer up event
   * @param event
   * @remarks
   * <zh/> 重置触摸状态和初始距离
   *
   * <en/> Reset touch state and initial distance
   */
  onPointerUp(event: IPointerEvent) {
    PinchHandler.callbacks.pinchend.forEach((cb) => cb(event, { scale: 0 }));
    PinchHandler.isPinching = false;
    this.initialDistance = null;
    this.pointerByTouch = [];
    PinchHandler.instance?.tryDestroy();
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
  public destroy() {
    this.emitter.off(CommonEvent.POINTER_DOWN, this.onPointerDown);
    this.emitter.off(CommonEvent.POINTER_MOVE, this.onPointerMove);
    this.emitter.off(CommonEvent.POINTER_UP, this.onPointerUp);
    PinchHandler.instance = null;
  }

  /**
   * <zh/> 解绑指定阶段的手势回调
   * <en/> Unregister gesture callback for specific phase
   * @param phase - <zh/> 手势阶段：开始(pinchstart)/移动(pinchmove)/结束(pinchend) | <en/> Gesture phase: start/move/end
   * @param callback - <zh/> 要解绑的回调函数 | <en/> Callback function to unregister
   * @remarks
   * <zh/> 从指定阶段的回调列表中移除特定回调，当所有回调都解绑后自动销毁事件监听
   * <en/> Remove specific callback from the phase's callback list, auto-destroy event listeners when all callbacks are unregistered
   */
  public off(phase: PinchEvent, callback: PinchCallback) {
    const index = PinchHandler.callbacks[phase].indexOf(callback);
    if (index > -1) PinchHandler.callbacks[phase].splice(index, 1);
    this.tryDestroy();
  }

  /**
   * <zh/> 尝试销毁手势处理器
   * <en/> Attempt to destroy the gesture handler
   * @remarks
   * <zh/> 当所有阶段（开始/移动/结束）的回调列表都为空时，执行实际销毁操作
   * <en/> Perform actual destruction when all phase (pinchstart/pinchmove/pinchend) callback lists are empty
   * <zh/> 自动解除事件监听并重置单例实例
   * <en/> Automatically remove event listeners and reset singleton instance
   */
  private tryDestroy() {
    if (Object.values(PinchHandler.callbacks).every((arr) => arr.length === 0)) {
      this.destroy();
    }
  }
}
