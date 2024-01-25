import type { DisplayObject, IAnimation } from '@antv/g';

export type AnimationPresets<T extends Record<string, unknown> = Record<string, unknown>> = {
  options: Record<string, unknown>;
} & T;

export type AnimationFactor<T extends AnimationPresets = AnimationPresets> = (
  /** <zh/> 动画配置 | <en/> animation options */
  preset?: T,
) => AnimationExecutor;

export type AnimationExecutor = (
  shape: DisplayObject,
  options?: KeyframeAnimationOptions,
  sourceStyle?: Record<string, unknown>,
) => IAnimation;

export type AnimationRegistry = {
  [keys: string]: AnimationFactor;
};
