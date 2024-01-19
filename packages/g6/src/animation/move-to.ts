import type { PositionPoint } from '../types/position';
import { DEFAULT_ANIMATION_OPTIONS } from './constants';
import type { AnimationFactor } from './types';

export const MoveTo: AnimationFactor<{ position: PositionPoint }> =
  ({ position }) =>
  (shape, options) => {
    const [originX = 0, originY = 0, originZ = 0] = shape.getPosition();
    const [targetX = 0, targetY = 0, targetZ = 0] = position;

    const deltaX = targetX - originX;
    const deltaY = targetY - originY;
    const deltaZ = targetZ - originZ;

    const keyframes = [
      {
        transform: 'translate(0)',
      },
      {
        transform: `translate(${deltaX}, ${deltaY}, ${deltaZ})`,
      },
    ];

    return shape.animate(keyframes, { ...DEFAULT_ANIMATION_OPTIONS, ...options });
  };
