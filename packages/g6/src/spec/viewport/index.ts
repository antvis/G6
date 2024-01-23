import type { CameraAnimationOptions } from '../../types/animate';
import type { Padding, Point, STDPadding } from '../../types/common';
import type { Position } from '../../types/position';
import type { FitViewRules } from '../../types/view';

/**
 * <zh/> 视口配置项
 *
 * <en/> Viewport
 * @public
 */
export type ViewportOptions = {
  /**
   * <zh/> 是否自动适应
   *
   * <en/> whether to auto fit
   */
  autoFit?: AutoFit;
  /**
   * <zh/> 画布内边距
   *
   * <en/> canvas padding
   */
  padding?: Padding;
  /**
   * <zh/> 缩放比例
   *
   * <en/> zoom ratio
   */
  zoom?: number;
  /**
   * <zh/> 缩放范围
   *
   * <en/> zoom range
   */
  zoomRange?: [number, number];
};

/**
 * @internal
 */
export type STDViewportOption = {
  autoFit: STDAutoFit;
  padding: STDPadding;
  zoom: number;
  zoomRange: [number, number];
};

/**
 * <zh/> 视口自适应规则(标准属性)
 *
 * <en/> Viewport auto fit rules(STD)
 * @public
 */
export type STDAutoFit =
  | { type: 'view'; padding?: Padding; rules?: FitViewRules; effectTiming?: CameraAnimationOptions }
  | { type: 'center'; effectTiming?: CameraAnimationOptions }
  | { type: 'position'; position: Point; alignment?: Position };

/**
 * <zh/> 视口自适应规则
 *
 * <en/> Viewport auto fit rules
 * @public
 */
export type AutoFit = STDAutoFit | 'view' | 'center';
