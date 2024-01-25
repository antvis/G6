import type { AnimationEffectTiming } from '../../animations/types';

export type AnimationOptions = {
  [STAGE in AnimationStage]?: StageAnimationOptions;
} & {
  [key: string]: StageAnimationOptions;
};

/**
 * <zh/> 动画阶段
 *
 * <en/> Animation stage
 */
export type AnimationStage = 'enter' | 'exit' | 'update' | 'show' | 'hide' | 'transform';

export type StageAnimationOptions = ComponentAnimationOptions | ConfigurableAnimationOptions[];

/**
 * <zh/> 注册动画的配置项
 *
 * <en/> Animation options
 */
export interface ComponentAnimationOptions extends AnimationEffectTiming {
  type: string;
}

/**
 * <zh/> 手动配置动画配置项（G6 5.0 初版方案）
 *
 * <en/> Manually configure animation options (G6 5.0 first edition plan)
 */
export interface ConfigurableAnimationOptions extends AnimationEffectTiming {
  fields: string[];
  shape?: string;
  states?: string[];
}
