import type { STDAnimation } from './types';

export const DEFAULT_ANIMATION_OPTIONS: KeyframeAnimationOptions = {
  duration: 2000,
  easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
  iterations: 1,
  fill: 'both',
};

export const BUILT_IN_ANIMATIONS: Record<string, STDAnimation> = {
  fade: [
    {
      fields: ['opacity'],
    },
  ],
  translate: [
    {
      fields: ['x', 'y'],
    },
  ],
};
