import { executeAnimate } from '../utils/animate';
import { DEFAULT_ANIMATION_OPTIONS } from './constants';
import type { AnimationFactor } from './types';

export const FadeIn: AnimationFactor = (preset) => (shape, options) => {
  const { fillOpacity = 0, strokeOpacity = 0, opacity = 0 } = shape.style;
  const keyframes = [
    { fillOpacity, strokeOpacity, opacity },
    { fillOpacity: 1, strokeOpacity: 1, opacity: 1 },
  ];

  return executeAnimate(shape, keyframes, { ...DEFAULT_ANIMATION_OPTIONS, ...preset.options, ...options });
};
