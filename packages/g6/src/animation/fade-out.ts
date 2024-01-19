import { DEFAULT_ANIMATION_OPTIONS } from './constants';
import type { AnimationFactor } from './types';

export const FadeOut: AnimationFactor = () => (shape, options) => {
  const { fillOpacity = 1, strokeOpacity = 1, opacity = 1 } = shape.style;
  const keyframes = [
    {
      fillOpacity,
      strokeOpacity,
      opacity,
    },
    { fillOpacity: 0, strokeOpacity: 0, opacity: 0 },
  ];

  return shape.animate(keyframes, { ...DEFAULT_ANIMATION_OPTIONS, ...options });
};
