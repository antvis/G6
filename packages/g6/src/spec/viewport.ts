import type { FitViewOptions, ViewportAnimationEffectTiming } from '../types';
import type { Padding, STDPadding } from '../types/padding';

/**
 * <zh/> 视口配置项
 *
 * <en/> Viewport
 * @public
 */
export interface ViewportOptions {
  /**
   * <zh/> 视口 x 坐标
   *
   * <en/> viewport x coordinate
   */
  x?: number;
  /**
   * <zh/> 视口 y 坐标
   *
   * <en/> viewport y coordinate
   */
  y?: number;
  /**
   * <zh/> 是否自动适应
   *
   * <en/> whether to auto fit
   */
  autoFit?:
    | { type: 'view'; options?: FitViewOptions; animation?: ViewportAnimationEffectTiming }
    | { type: 'center'; animation?: ViewportAnimationEffectTiming }
    | 'view'
    | 'center';
  /**
   * <zh/> 画布内边距
   *
   * <en/> canvas padding
   * @remarks
   * <zh/> 通常在自适应时，会根据内边距进行适配
   *
   * <en/> Usually, it will be adapted according to the padding when auto-fitting
   */
  padding?: Padding;
  /**
   * <zh/> 旋转角度
   *
   * <en/> rotation angle
   * @defaultValue 0
   */
  rotation?: number;
  /**
   * <zh/> 缩放比例
   *
   * <en/> zoom ratio
   * @defaultValue 1
   */
  zoom?: number;
  /**
   * <zh/> 缩放范围
   *
   * <en/> zoom range
   * @defaultValue [0.01, 10]
   */
  zoomRange?: [number, number];
}

/**
 * @internal
 */
export interface STDViewportOptions {
  autoFit?:
    | { type: 'view'; options?: FitViewOptions; animation?: ViewportAnimationEffectTiming }
    | { type: 'center'; animation?: ViewportAnimationEffectTiming };
  padding?: STDPadding;
  zoom?: number;
  zoomRange?: [number, number];
}
