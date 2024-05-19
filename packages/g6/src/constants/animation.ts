import type { AnimationEffectTiming } from '../animations/types';

export const DEFAULT_ANIMATION_OPTIONS: AnimationEffectTiming = {
  duration: 500,
};

export const DEFAULT_ELEMENTS_ANIMATION_OPTIONS: AnimationEffectTiming = {
  duration: 1000,
  easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  iterations: 1,
  fill: 'both',
};
