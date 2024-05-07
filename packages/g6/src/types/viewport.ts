import type { Point } from './point';

export type ViewportAnimationEffectTiming =
  | boolean
  | {
      easing?: string;
      duration?: number;
    };

export interface TransformOptions {
  mode: 'relative' | 'absolute';
  origin?: Point;
  translate?: Point;
  rotate?: number;
  scale?: number;
}

export interface FitViewOptions {
  /**
   * <zh/> 在以下情况下进行适配
   * - 'overflow' 仅当图内容超出视口时进行适配
   * - 'always' 总是进行适配
   *
   * <en/> Fit the view in the following cases
   * - 'overflow' Only fit when the graph content exceeds the viewport
   * - 'always' Always fit
   */
  when?: 'overflow' | 'always';
  /**
   * <zh/> 仅对指定方向进行适配
   * - 'x' 仅适配 x 方向
   * - 'y' 仅适配 y 方向
   * - 'both' 适配 x 和 y 方向
   *
   * <en/> Only adapt to the specified direction
   * - 'x' Only adapt to the x direction
   * - 'y' Only adapt to the y direction
   * - 'both' Adapt to the x and y directions
   */
  direction?: 'x' | 'y' | 'both';
}
