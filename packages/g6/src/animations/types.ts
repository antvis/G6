import type { DisplayObject, IAnimation, IAnimationEffectTiming } from '@antv/g';
import type { State } from '../types';

export type AnimationFactor<T extends AnimationPresets = AnimationPresets> = (
  /** <zh/> 动画配置 | <en/> animation options */
  preset: T,
) => AnimationExecutor;

export type AnimationEffectTiming = Partial<
  Pick<IAnimationEffectTiming, 'duration' | 'delay' | 'easing' | 'iterations' | 'direction' | 'fill'>
>;

export type AnimationExecutor = (
  shape: DisplayObject,
  options: {
    effectTiming?: AnimationEffectTiming;
    /**
     * <zh/> 动画的源样式
     *
     * <en/> Source style of animation
     * @description
     * <zh/> 用于在动画执行前将 shape 的样式设置为源样式，例如 move-to 动画，需要将 shape 的 x, y 设置为源样式
     *
     * <en/> Used to set the style of shape to the source style before the animation is executed. For example, the move-to animation needs to set the x and y of shape to the source style
     */
    originalStyle: Record<string, unknown>;
    /**
     * <zh/> 元素状态
     *
     * <en/> Element states
     */
    states: State[];
  },
) => IAnimation;

export type AnimationPresets<T extends Record<string, unknown> = Record<string, unknown>> = {
  options: Record<string, unknown>;
} & T;
