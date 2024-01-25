import { DEFAULT_ANIMATION_OPTIONS } from './constants';
import type { AnimationFactor, AnimationPresets } from './types';

type LinkInAnimationPresets = AnimationPresets;

export const LinkIn: AnimationFactor<LinkInAnimationPresets> = (preset) => (shape, options) => {
  const finalOptions = { ...DEFAULT_ANIMATION_OPTIONS, ...preset.options, ...options };

  const { sourcePoint, targetPoint } = shape.attributes;

  const keyframes = [
    { sourcePoint, targetPoint: sourcePoint },
    { sourcePoint, targetPoint },
  ];
  return shape.animate(keyframes, finalOptions);
};
