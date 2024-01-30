import { DisplayObject, IAnimation } from '@antv/g';
import { upperFirst } from '@antv/util';
import type { ConfigurableAnimationOptions } from '../spec/element/animation';
import { createAnimationsProxy, executeAnimation, preprocessKeyframes } from '../utils/animation';
import { DEFAULT_ANIMATION_OPTIONS } from './constants';
import type { AnimationFactor, AnimationPresets } from './types';

type SpecificationPresets = AnimationPresets<{
  config: ConfigurableAnimationOptions[];
}>;

export const Custom: AnimationFactor<SpecificationPresets> = (preset) => {
  const { config } = preset;
  return (shape, options) => {
    const { states, originalStyle } = options;
    if (config.length === 0) throw new Error('animation should not be empty');

    /**
     * <zh/> 获取图形关键帧样式
     *
     * <en/> Get the keyframe style of the shape
     * @param shapeID - <zh/> 图形 ID | <en/> shape ID
     * @returns <zh/> 图形关键帧样式 | <en/> keyframe style of the shape
     */
    const getKeyframeStyle = (shapeID?: string) => {
      if (shapeID) {
        const target = shape.getElementById(shapeID) as DisplayObject;
        const name = `get${upperFirst(shapeID)}Style` as keyof typeof shape;

        const caller: (attrs?: Record<string, unknown>) => Record<string, unknown> =
          shape?.[name]?.bind(shape) || ((attrs) => attrs);

        const fromStyle = caller?.(originalStyle) || {};
        const toStyle = caller?.() || {};

        return { target, fromStyle, toStyle };
      } else {
        const target = shape;
        const fromStyle = originalStyle;
        const toStyle = { ...target.attributes };
        return { target, fromStyle, toStyle };
      }
    };

    let keyAnimationResult: IAnimation;
    const animationResults = config
      .map(({ fields, shape: shapeID, states: enabledStates, ...specifyOptions }) => {
        if (enabledStates === undefined || enabledStates?.some((state) => states.includes(state))) {
          const { target, fromStyle, toStyle } = getKeyframeStyle(shapeID);

          if (!target) return null;

          const keyframes: Keyframe[] = [{}, {}];

          fields.forEach((attr) => {
            Object.assign(keyframes[0], { [attr]: fromStyle[attr] });
            Object.assign(keyframes[1], { [attr]: toStyle[attr] });
          });

          const result = executeAnimation(target, preprocessKeyframes(keyframes), {
            ...DEFAULT_ANIMATION_OPTIONS,
            ...preset.options,
            ...options.effectTiming,
            ...specifyOptions,
          });

          if (shapeID === undefined) keyAnimationResult = result!;

          return result;
        }
        return null;
      })
      .filter(Boolean) as IAnimation[];

    const mainAnimationResult = keyAnimationResult! || animationResults[0];

    return createAnimationsProxy(
      mainAnimationResult,
      animationResults.filter((result) => result !== mainAnimationResult),
    );
  };
};
