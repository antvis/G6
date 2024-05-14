import type { DisplayObject, IAnimation } from '@antv/g';
import { isString, upperFirst } from '@antv/util';
import { DEFAULT_ELEMENTS_ANIMATION_OPTIONS } from '../constants';
import { getExtension } from '../registry';
import { createAnimationsProxy, inferDefaultValue, preprocessKeyframes } from '../utils/animation';
import { replaceTranslateInTransform } from '../utils/transform';
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

  const animations = (isString(animation) ? getExtension('animation', animation) || [] : animation).filter(
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
  const getKeyframeStyle = (
    shapeID?: string,
  ): { shape: DisplayObject; fromStyle: Record<string, any>; toStyle: Record<string, any> } | null => {
    if (shapeID) {
      const shape = element.getShape(shapeID);
      if (!shape) return null;

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

  let mainResult: IAnimation;

  const subResults = animations
    .map(({ fields, shape: shapeID, states: enabledStates, ...individualEffectTiming }) => {
      if (enabledStates === undefined || enabledStates?.some((state) => states.includes(state))) {
        const keyframeStyle = getKeyframeStyle(shapeID);
        if (!keyframeStyle) return null;

        const { shape, fromStyle, toStyle } = keyframeStyle;

        const keyframes: Keyframe[] = [{}, {}];

        fields.forEach((attr) => {
          Object.assign(keyframes[0], { [attr]: fromStyle[attr] ?? inferDefaultValue(attr) });
          Object.assign(keyframes[1], { [attr]: toStyle[attr] ?? inferDefaultValue(attr) });
        });

        const translateAttrs = ['x', 'y', 'z'];

        // x/y -> translate
        if (keyframes.some((keyframe) => Object.keys(keyframe).some((attr) => translateAttrs.includes(attr)))) {
          const { x = 0, y = 0, z = 0, transform = '' } = shape.attributes || {};
          keyframes.forEach((keyframe) => {
            keyframe.transform = replaceTranslateInTransform(
              (keyframe.x as number) || (x as number),
              (keyframe.y as number) || (y as number),
              (keyframe.z as number) || (z as number),
              transform,
            );
          });
        }

        const result = shape.animate(preprocessKeyframes(keyframes), {
          ...DEFAULT_ELEMENTS_ANIMATION_OPTIONS,
          ...commonEffectTiming,
          ...individualEffectTiming,
        });

        if (shapeID === undefined) mainResult = result!;

        return result;
      }
      return null;
    })
    .filter(Boolean) as IAnimation[];

  const result = mainResult! || subResults?.[0];

  if (!result) return null;

  return createAnimationsProxy(
    result,
    subResults.filter((result) => result !== result),
  );
};
