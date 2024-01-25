import { DEFAULT_ANIMATION_OPTIONS } from './constants';
import type { AnimationFactor, AnimationPresets } from './types';

type MoveToAnimationPresets = AnimationPresets;

export const MoveTo: AnimationFactor<MoveToAnimationPresets> = (preset) => (shape, options, source) => {
  const finalOptions = { ...DEFAULT_ANIMATION_OPTIONS, ...preset.options, ...options };

  if (!source) return shape.animate([], finalOptions);
  const positionAttrs = ['x', 'y', 'z'];
  if (!positionAttrs.some((attr) => attr in source)) return shape.animate([], finalOptions);

  const { x: sourceX = 0, y: sourceY = 0, z: sourceZ = 0 } = source as any;

  const [targetX = 0, targetY = 0, targetZ = 0] = shape.getPosition();

  const keyframes = [
    { x: sourceX, y: sourceY, z: sourceZ },
    { x: targetX, y: targetY, z: targetZ },
  ];
  return shape.animate(keyframes, finalOptions);
};
