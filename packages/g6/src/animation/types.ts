import type { DisplayObject, IAnimation } from '@antv/g';

export type AnimationFactor<T extends Record<string, unknown> = Record<string, never>> = (
  /** <zh/> 动画配置 | <en/> animation options */
  preset?: T,
) => AnimationExecutor;

export type AnimationExecutor = (shape: DisplayObject, options?: KeyframeAnimationOptions) => IAnimation;

export type AnimationRegistry = {
  [keys: string]: AnimationFactor;
};
