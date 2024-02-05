import type { DisplayObject, IAnimation } from '@antv/g';
import { isString, upperFirst } from '@antv/util';
import { getPlugin } from '../registry';
import { createAnimationsProxy, executeAnimation, inferDefaultValue, preprocessKeyframes } from '../utils/animation';
import { DEFAULT_ANIMATION_OPTIONS } from './constants';
import type { AnimationExecutor } from './types';

/**
 * <zh/> 动画 Spec 执行器
 *
 * <en/> Animation Spec Executor
 * @param shape - <zh/> 要执行动画的图形 | <en/> shape to execute animation
 * @param animation - <zh/> 动画 Spec | <en/> animation specification
 * @param commonEffectTiming - <zh/> 动画公共配置 | <en/> common animation configuration
 * @param context - <zh/> 动画执行上下文 | <en/> animation execution context
 * @returns <zh/> 动画实例 | <en/> animation instance
 */
export const executor: AnimationExecutor = (shape, animation, commonEffectTiming, context) => {
  if (!animation) return null;
  const animations = isString(animation) ? getPlugin('animation', animation) || [] : animation;
  if (animations.length === 0) return null;

  const { originalStyle, modifiedStyle, states } = context;

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
      const toStyle = { ...target.attributes, ...modifiedStyle };
      return { target, fromStyle, toStyle };
    }
  };

  let keyResult: IAnimation;

  const results = animations
    .map(({ fields, shape: shapeID, states: enabledStates, ...individualEffectTiming }) => {
      if (enabledStates === undefined || enabledStates?.some((state) => states.includes(state))) {
        const { target, fromStyle, toStyle } = getKeyframeStyle(shapeID);

        if (!target) return null;

        const keyframes: Keyframe[] = [{}, {}];

        fields.forEach((attr) => {
          Object.assign(keyframes[0], { [attr]: fromStyle[attr] ?? inferDefaultValue(attr) });
          Object.assign(keyframes[1], { [attr]: toStyle[attr] ?? inferDefaultValue(attr) });
        });

        const result = executeAnimation(target, preprocessKeyframes(keyframes), {
          ...DEFAULT_ANIMATION_OPTIONS,
          ...commonEffectTiming,
          ...individualEffectTiming,
        });

        if (shapeID === undefined) keyResult = result!;

        return result;
      }
      return null;
    })
    .filter(Boolean) as IAnimation[];

  const mainResult = keyResult! || results?.[0];

  if (mainResult === null) return null;

  return createAnimationsProxy(
    mainResult,
    results.filter((result) => result !== mainResult),
  );
};
