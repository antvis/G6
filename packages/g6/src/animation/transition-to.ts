/**
 * <zh/> 默认过渡动画
 *
 * <en/> default transition animation
 * @description
 * <zh/> 对于存在透明度属性过渡会存在问题，解决方案参考 `FadeIn`、`FadeOut` 动画
 *
 * <en/> There will be problems with the transition of the opacity attribute. Refer to the `FadeIn` and `FadeOut` animations for solutions
 */
import { arrayDiff } from '../utils/diff';
import { DEFAULT_ANIMATION_OPTIONS } from './constants';
import type { AnimationFactor, AnimationPresets } from './types';

type TransientToAnimationPresets = AnimationPresets;

export const TransientTo: AnimationFactor<TransientToAnimationPresets> =
  (preset) =>
  (shape, options, source = {}) => {
    const finalOptions = { ...DEFAULT_ANIMATION_OPTIONS, ...preset.options, ...options };

    const sourceAttrs = Object.keys(source);
    const targetAttrs = Object.keys(shape.attributes);

    const { keep } = arrayDiff(sourceAttrs, targetAttrs, (d) => d);

    if (keep.length === 0) return shape.animate([], finalOptions);

    const keyframes = [
      Object.fromEntries(keep.map((attr) => [attr, source[attr]])),
      Object.fromEntries(keep.map((attr) => [attr, shape.style[attr]])),
    ];

    return shape.animate(keyframes, finalOptions);
  };
