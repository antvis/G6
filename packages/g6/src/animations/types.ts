import type { IAnimationEffectTiming } from '@antv/g';

export type AnimationEffectTiming = Partial<
  Pick<IAnimationEffectTiming, 'duration' | 'delay' | 'easing' | 'iterations'>
>;
