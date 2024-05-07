import type { DisplayObject, IAnimation, IAnimationEffectTiming } from '@antv/g';
import type { State } from '../types';

/**
 * <zh/> 为 string 时，会从注册的动画中获取
 *
 * <en/> When it is a string, it will be obtained from the registered animation
 */
export type Animation = false | string | STDAnimation;

export type STDAnimation = ConfigurableAnimationOptions[];

interface ConfigurableAnimationOptions extends AnimationEffectTiming {
  fields: string[];
  shape?: string;
  states?: State[];
}

export interface AnimationContext {
  /**
   * <zh/> 动画的源样式
   *
   * <en/> Source style of animation
   * @remarks
   * <zh/> 用于在动画执行前将 shape 的样式设置为源样式，例如 move-to 动画，需要将 shape 的 x, y 设置为源样式
   *
   * <en/> Used to set the style of shape to the source style before the animation is executed. For example, the move-to animation needs to set the x and y of shape to the source style
   */
  originalStyle: Record<string, unknown>;
  /**
   * <zh/> 额外的动画终态样式
   *
   * <en/> Additional animation final state style
   * @remarks
   * <zh/> 例如元素销毁前，需要将元素的终态透明度设置为 0
   *
   * <en/> For example, before the element is destroyed, the final state opacity of the element needs to be set to 0
   */
  modifiedStyle?: Record<string, unknown>;
  /**
   * <zh/> 动画配置过滤
   *
   * <en/> Animation configuration filter
   * @remarks
   * <zh/> 某些情况下，需要过滤掉一些动画配置，例如位移动画只会作用于元素根节点图形，不会作用于子图形。这项配置通常用于优化动画性能，避免不必要的动画执行
   *
   * <en/> In some cases, it is necessary to filter out some animation configurations. For example, the displacement animation will only affect the root node shape of the element, not the child shape. This configuration is usually used to optimize animation performance and avoid unnecessary animation execution
   */
  animationsFilter?: (animation: ConfigurableAnimationOptions) => boolean;
  /**
   * <zh/> 元素状态
   *
   * <en/> Element states
   */
  states: State[];
}

export type AnimationEffectTiming = Partial<
  Pick<IAnimationEffectTiming, 'duration' | 'delay' | 'easing' | 'iterations' | 'direction' | 'fill'>
>;

export type AnimationExecutor = (
  shape: DisplayObject,
  animation: Animation | false,
  baseEffectTiming: AnimationEffectTiming,
  context: AnimationContext,
) => IAnimation | null;
