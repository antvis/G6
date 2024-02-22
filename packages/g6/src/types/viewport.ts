import type { Point } from './point';

export type ViewportAnimationEffectTiming =
  | false
  | {
      easing?: string;
      duration?: number;
    };

export type TranslateOptions = {
  /** <zh/> 平移模式 | <en/> translate mode */
  mode: ViewportChangeMode;
  /** <zh/> 平移中心 | <en/> translate center. */
  origin?: Point;
  /** <zh/> 平移值 | <en/> translate value */
  value: Point;
};

export type RotateOptions = {
  /** <zh/> 旋转模式 | <en/> rotate mode */
  mode: ViewportChangeMode;
  /** <zh/> 旋转角度（角度）| <en/> Rotate angle (degree). */
  value: number;
  /** <zh/> 旋转中心 | <en/> Rotate center. */
  origin?: Point;
};

export type ZoomOptions = {
  /** <zh/> 缩放模式 | <en/> zoom mode */
  mode: ViewportChangeMode;
  /** <zh/> 缩放值 | <en/> zoom value */
  value: number;
  /** <zh/> 缩放中心 | <en/> Zoom center.  */
  origin?: Point;
};

type ViewportChangeMode = 'relative' | 'absolute';
