import type { DisplayObject, IAnimation } from '@antv/g';
import { upperFirst } from '@antv/util';
import { createAnimationsProxy, inferDefaultValue, preprocessKeyframes } from '../utils/animation';
import { replaceTranslateInTransform } from '../utils/transform';
import type { AnimationExecutor } from './types';

/**
 * <zh/> 动画语法执行器
 *
 * <en/> Animation syntax executor
 * @param element - <zh/> 要执行动画的图形 | <en/> shape to execute animation
 * @param keyframes - <zh/> 动画关键帧 | <en/> animation keyframes
 * @param options - <zh/> 动画语法 | <en/> animation syntax
 * @returns <zh/> 动画实例 | <en/> animation instance
 */
export const executor: AnimationExecutor = (element, keyframes, options) => {
  if (!options.length) return null;

  const [originalStyle, modifiedStyle] = keyframes;
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

      const fromStyle = styler?.(originalStyle) || {};
      const toStyle = styler?.(modifiedStyle) || {};

      return { shape, fromStyle, toStyle };
    } else {
      const shape = element;
      return { shape, fromStyle: originalStyle, toStyle: modifiedStyle };
    }
  };

  let mainResult: IAnimation;

  const subResults = options
    .map(({ fields, shape: shapeID, states: enabledStates, ...effectTiming }) => {
      const keyframeStyle = getKeyframeStyle(shapeID);
      if (!keyframeStyle) return null;

      const { shape, fromStyle, toStyle } = keyframeStyle;

      const keyframes: Keyframe[] = [{}, {}];

      fields.forEach((attr) => {
        Object.assign(keyframes[0], { [attr]: fromStyle[attr] ?? inferDefaultValue(attr) });
        Object.assign(keyframes[1], { [attr]: toStyle[attr] ?? inferDefaultValue(attr) });
      });

      // x/y -> translate
      if (keyframes.some((keyframe) => Object.keys(keyframe).some((attr) => ['x', 'y', 'z'].includes(attr)))) {
        const { x = 0, y = 0, z = 0, transform = '' } = shape.attributes || {};
        keyframes.forEach((keyframe) => {
          // @ts-expect-error ignore type error
          keyframe.transform = replaceTranslateInTransform(
            (keyframe.x as number) || (x as number),
            (keyframe.y as number) || (y as number),
            (keyframe.z as number) || (z as number),
            transform,
          );
        });
      }

      const result = shape.animate(preprocessKeyframes(keyframes), effectTiming);

      if (shapeID === undefined) mainResult = result!;

      return result;
    })
    .filter(Boolean) as IAnimation[];

  const result = mainResult! || subResults?.[0];

  if (!result) return null;

  return createAnimationsProxy(
    result,
    subResults.filter((result) => result !== result),
  );
};
