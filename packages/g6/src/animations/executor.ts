import type { DisplayObject, IAnimation } from '@antv/g';
import { isString, upperFirst } from '@antv/util';
import { DEFAULT_ELEMENTS_ANIMATION_OPTIONS } from '../constants';
import { getPlugin } from '../registry';
import { createAnimationsProxy, executeAnimation, inferDefaultValue, preprocessKeyframes } from '../utils/animation';
import type { AnimationExecutor } from './types';

/**
 * <zh/> 动画 Spec 执行器
 *
 * <en/> Animation Spec Executor
 * @param element - <zh/> 要执行动画的图形 | <en/> shape to execute animation
 * @param animation - <zh/> 动画 Spec | <en/> animation specification
 * @param commonEffectTiming - <zh/> 动画公共配置 | <en/> common animation configuration
 * @param context - <zh/> 动画执行上下文 | <en/> animation execution context
 * @returns <zh/> 动画实例 | <en/> animation instance
 */
export const executor: AnimationExecutor = (element, animation, commonEffectTiming, context) => {
  if (!animation) return null;

  const { animationsFilter = () => true } = context;

  const animations = (isString(animation) ? getPlugin('animation', animation) || [] : animation).filter(
    animationsFilter,
  );
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
      const shape = element.getElementById(shapeID) as DisplayObject;
      const name = `get${upperFirst(shapeID)}Style` as keyof typeof element;

      const styler: (attrs?: Record<string, unknown>) => Record<string, unknown> =
        element?.[name]?.bind(element) || ((attrs) => attrs);

      const fromStyle = styler?.({ ...element.attributes, ...originalStyle }) || {};
      const toStyle = { ...shape.attributes };

      return { shape, fromStyle, toStyle };
    } else {
      const shape = element;
      const fromStyle = originalStyle;
      const toStyle = { ...shape.attributes, ...modifiedStyle };
      return { shape, fromStyle, toStyle };
    }
  };

  let keyResult: IAnimation;

  const results = animations
    .map(({ fields, shape: shapeID, states: enabledStates, ...individualEffectTiming }) => {
      if (enabledStates === undefined || enabledStates?.some((state) => states.includes(state))) {
        const { shape, fromStyle, toStyle } = getKeyframeStyle(shapeID);

        if (!shape) return null;

        const keyframes: Keyframe[] = [{}, {}];

        fields.forEach((attr) => {
          Object.assign(keyframes[0], { [attr]: fromStyle[attr] ?? inferDefaultValue(attr) });
          Object.assign(keyframes[1], { [attr]: toStyle[attr] ?? inferDefaultValue(attr) });
        });

        const result = executeAnimation(shape, preprocessKeyframes(keyframes), {
          ...DEFAULT_ELEMENTS_ANIMATION_OPTIONS,
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

  if (!mainResult) return null;

  return createAnimationsProxy(
    mainResult,
    results.filter((result) => result !== mainResult),
  );
};
