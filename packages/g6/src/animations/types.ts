import type { IAnimation } from '@antv/g';
import type { AnimationStage } from '../spec/element/animation';
import type { Element, ElementType, State } from '../types';

export type STDAnimation = AnimationOptions[];

/**
 * <zh/> 元素动画选项
 *
 * <en/> Element animation options
 */
export interface AnimationOptions extends AnimationEffectTiming {
  /**
   * <zh/> 执行动画的字段（样式）名
   *
   * <en/> Field (style) name of the animation
   */
  fields: string[];
  /**
   * <zh/> 执行动画的图形，默认为当前元素
   *
   * <en/> Shape of the animation, default is the current element
   */
  shape?: string;
  /**
   * <zh/> 参与动画的状态
   *
   * <en/> States involved in the animation
   */
  states?: State[];
}

export interface AnimationContext {
  /**
   * <zh/> 执行动画的元素
   *
   * <en/> Element to execute animation
   */
  element: Element;
  /**
   * <zh/> 元素类型
   *
   * <en/> Element type
   */
  elementType: ElementType;
  /**
   * <zh/> 动画阶段
   *
   * <en/> Animation stage
   */
  stage: AnimationStage;
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
   * <zh/> 变更样式
   *
   * <en/> Updated style
   */
  updatedStyle?: Record<string, unknown>;
}

/**
 * <zh/> 动画效果时序
 *
 * <en/> Animation effect timing
 */
export interface AnimationEffectTiming {
  /**
   * <zh/> 动画延迟时间
   *
   * <en/> Animation delay time
   */
  delay?: number;
  /**
   * <zh/> 动画方向
   *
   * <en/> Animation direction
   */
  direction?: PlaybackDirection;
  /**
   * <zh/> 动画持续时间
   *
   * <en/> Animation duration
   */
  duration?: number;
  /**
   * <zh/> 动画缓动函数
   *
   * <en/> Animation easing function
   */
  easing?: string;
  /**
   * <zh/> 动画结束后的填充模式
   *
   * <en/> Fill mode after the animation ends
   */
  fill?: FillMode;
  /**
   * <zh/> 动画迭代次数
   *
   * <en/> Number of iterations of the animation
   */
  iterations?: number;
}

export type AnimationExecutor = (
  element: Element,
  keyframes: [Record<string, unknown>, Record<string, unknown>],
  options: STDAnimation,
) => IAnimation | null;
