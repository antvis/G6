import { AnimateCfg } from '@antv/g-canvas';
import { animations } from './animateFunc';

export type AnimationConfig = AnimateCfg & { animate: keyof typeof animations };

export const animateShapeWithConfig = (
  shape: any,
  config?: Partial<AnimationConfig>,
  initMatrix?: number[],
) => {
  const animateFunc = config?.animate && animations[config.animate];
  if (config && animateFunc) {
    const cfg = {
      duration: 2000,
      ...config,
      initMatrix,
    };
    shape.animate(animateFunc, cfg);
  } else {
    shape.stopAnimate();
  }
};
