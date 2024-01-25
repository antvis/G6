import { DEFAULT_ANIMATION_OPTIONS } from './constants';
import type { AnimationFactor, AnimationPresets } from './types';

type LinkOutAnimationPresets = AnimationPresets;

export const LinkOut: AnimationFactor<LinkOutAnimationPresets> = (preset) => (shape, options) => {
  const finalOptions = { ...DEFAULT_ANIMATION_OPTIONS, ...preset.options, ...options };

  const { sourcePoint, targetPoint } = shape.attributes;

  const keyframes = [
    { sourcePoint: targetPoint, targetPoint },
    { sourcePoint, targetPoint },
  ];
  return shape.animate(keyframes, finalOptions);
};
