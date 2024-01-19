import type { Padding } from '../types/common';

export type FitViewRules = {
  /** Whether fit it only when the graph is out of the viewport.  */
  onlyOutOfViewport?: boolean;
  /** Whether zoom the graph only when the graph is larger than the viewport. */
  onlyZoomAtLargerThanViewport?: boolean;
  /** Axis to fit.  */
  direction?: 'x' | 'y' | 'both';
  /** Ratio rule to fit. */
  ratioRule?: 'max' | 'min';
  /** Bounds type. 'render' means calculate the bounds by get rendering bounds. 'layout' for the situation that layout algorithm is done but the positions are not animated rendered. */
  /**
   * <zh/> 获取的包围盒类型
   *
   * - `current` 直接获取当前包围盒
   *
   * - `final` 计算布局后的包围盒，适用于当前正在执行布局动画的情况
   *
   * <en/> Bounds type
   *
   * - `current` Get the current bounds directly.
   *
   * - `final` Calculate the bounds after layout, which is suitable for the situation where the layout animation is currently being executed.
   */
  boundsType?: 'current' | 'final';
};

export type FitViewOptions = {
  padding?: Padding;
  rules?: FitViewRules;
};

export type GraphAlignment = 'left-top' | 'right-top' | 'left-bottom' | 'right-bottom' | 'center' | [number, number];

/**
 * <zh/> 画布变换选项
 *
 * <en/> Graph transform options.
 */
export type GraphTransformOptions = {
  /**
   * <zh/> 平移选项
   *
   * <en/> Translate options.
   */
  translate?: Partial<TranslateOptions>;
  /**
   * <zh/> 旋转选项
   *
   * <en/> Rotate options.
   */
  rotate?: RotateOptions;
  /**
   * <zh/> 缩放选项
   *
   * <en/> Zoom options.
   */
  zoom?: ZoomOptions;
  /**
   * <zh/> 原点
   *
   * <en/> Origin.
   */
  origin?: TransformOrigin;
};

export type TransformOrigin = {
  /**
   * <zh/> x 坐标
   *
   * <en/> x.
   */
  x: number;
  /**
   * <zh/> y 坐标
   *
   * <en/> y.
   */
  y: number;
};

export type TranslateOptions = {
  /**
   * <zh/> 平移距离 x
   *
   * <en/> Translate distance x.
   */
  dx: number;
  /**
   * <zh/> 平移距离 y
   *
   * <en/> Translate distance y.
   */
  dy: number;
  /**
   * <zh/> 平移距离 z
   *
   * <en/> Translate distance z.
   */
  dz: number;
  /**
   * <zh/> 平移目标 x
   *
   * <en/> Translate target x.
   */
  targetX: number;
  /**
   * <zh/> 平移目标 y
   *
   * <en/> Translate target y.
   */
  targetY: number;
  /**
   * <zh/> 平移目标 z
   *
   * <en/> Translate target z.
   */
  targetZ: number;
};

export type RotateOptions = {
  /**
   * <zh/> 旋转角度（角度）
   *
   * <en/> Rotate angle (degree).
   */
  angle: number;
};

export type ZoomOptions = {
  /**
   * <zh/> 缩放比例
   *
   * <en/> Zoom ratio.
   */
  ratio: number;
};
