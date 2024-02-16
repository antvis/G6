import type { DisplayObject, IAnimation } from '@antv/g';
import { isEqual, isNil } from '@antv/util';
import type { Keyframe } from '../types';
import { getDescendantShapes } from './shape';

/**
 * <zh/> 创建动画代理，对一个动画实例的操作同步到多个动画实例上
 *
 * <en/> create animation proxy, synchronize animation to multiple animation instances
 * @param sourceAnimation - <zh/> 源动画实例 | <en/> source animation instance
 * @param targetAnimations - <zh/> 目标动画实例 | <en/> target animation instance
 * @returns <zh/> 动画代理 | <en/> animation proxy
 */
export function createAnimationsProxy(sourceAnimation: IAnimation, targetAnimations: IAnimation[]): IAnimation {
  return new Proxy(sourceAnimation, {
    get(target, propKey: keyof IAnimation) {
      if (typeof target[propKey] === 'function') {
        return (...args: unknown[]) => {
          (target[propKey] as any)(...args);
          targetAnimations.forEach((animation) => (animation[propKey] as any)?.(...args));
        };
      }
      return Reflect.get(target, propKey);
    },
    set(target, propKey: keyof IAnimation, value) {
      // onframe 和 onfinish 特殊处理，不用同步到所有动画实例上
      // onframe and onfinish are specially processed and do not need to be synchronized to all animation instances
      if (!['onframe', 'onfinish'].includes(propKey)) {
        targetAnimations.forEach((animation) => {
          (animation[propKey] as any) = value;
        });
      }
      return Reflect.set(target, propKey, value);
    },
  });
}

/**
 * <zh/> 预处理关键帧，过滤掉无用动画的属性
 *
 * <en/> Preprocess keyframes, filter out the properties of useless animations
 * @param keyframes - <zh/> 关键帧 | <en/> keyframes
 * @returns <zh/> 关键帧 | <en/> keyframes
 */
export function preprocessKeyframes(keyframes: Keyframe[]): Keyframe[] {
  // 转化为 PropertyIndexedKeyframes 格式方便后续处理
  // convert to PropertyIndexedKeyframes format for subsequent processing
  const propertyIndexedKeyframes: Record<string, any[]> = keyframes.reduce((acc, kf) => {
    Object.entries(kf).forEach(([key, value]) => {
      if (acc[key] === undefined) acc[key] = [value];
      else acc[key].push(value);
    });
    return acc;
  }, {});

  // 过滤掉无用动画的属性（属性值为 undefined、或者值完全一致）
  // filter out useless animation properties (property value is undefined, or value is exactly the same)
  Object.entries(propertyIndexedKeyframes).forEach(([key, values]) => {
    if (
      // 属性值必须在每一帧都存在 / property value must exist in every frame
      values.length !== keyframes.length ||
      // 属性值不能为空 / property value cannot be empty
      values.some((value) => isNil(value)) ||
      // 属性值必须不完全一致 / property value must not be exactly the same
      values.every((value) => isEqual(value, values[0]))
    ) {
      delete propertyIndexedKeyframes[key];
    }
  });

  // 将 PropertyIndexedKeyframes 转化为 Keyframe 格式
  // convert PropertyIndexedKeyframes to Keyframe format
  return Object.entries(propertyIndexedKeyframes).reduce((acc, [key, values]) => {
    values.forEach((value, index) => {
      if (!acc[index]) acc[index] = { [key]: value };
      else acc[index][key] = value;
    });
    return acc;
  }, [] as Keyframe[]);
}

/**
 * <zh/> 对图形执行动画
 *
 * <en/> Animate the shape
 * @param shape - <zh/> 待执行动画的图形 | <en/> the shape to be animated
 * @param keyframes - <zh/> 动画关键帧 | <en/> keyframes of the animation
 * @param options - <zh/> 动画配置项 | <en/> animation options
 * @returns <zh/> 动画对象 | <en/> animation object
 * @description
 * <zh/> 在设置 enableCSSParsing 为 false 后，复合图形无法继承父属性，因此对于一些需要继承父属性的动画，需要对所有子图形执行相同的动画
 *
 * <en/> After setting enableCSSParsing to false, the compound shape cannot inherit the parent attribute, so for some animations that need to inherit the parent attribute, the same animation needs to be performed on all child shapes
 */
export function executeAnimation<T extends DisplayObject>(
  shape: T,
  keyframes: Keyframe[],
  options: KeyframeAnimationOptions,
) {
  const inheritedAttrs = ['opacity'];

  const needInheritAnimation = keyframes.some((keyframe) =>
    Object.keys(keyframe).some((attr) => inheritedAttrs.includes(attr)),
  );

  if (!needInheritAnimation) return shape.animate(keyframes, options);
  const inheritAttrsKeyframes = keyframes.map((keyframe) => {
    const newKeyframe: Keyframe = {};
    Object.entries(keyframe).forEach(([attr, value]) => {
      if (inheritedAttrs.includes(attr)) {
        newKeyframe[attr] = value;
      }
    });
    return newKeyframe;
  });

  const descendants = getDescendantShapes(shape);

  const keyShapeAnimation = shape.animate(keyframes, options);
  const descendantAnimations = descendants.map((descendant) => descendant.animate(inheritAttrsKeyframes, options)!);
  return createAnimationsProxy(keyShapeAnimation!, descendantAnimations);
}

/**
 * <zh/> 获取属性的默认值
 *
 * <en/> Get default value of attribute
 * @param name - <zh/> 属性名 | <en/> Attribute name
 * @returns <zh/> 属性默认值 | <en/> Attribute default value
 * @description
 * <zh/> 执行动画过程中，一些属性没有显式指定属性值，但实际上在 G 中存在属性值，因此通过该方法获取其实际默认值
 *
 * <en/> During the animation, some attributes do not explicitly specify the attribute value, but in fact there is an attribute value in G, so use this method to get the actual default value
 */
export function inferDefaultValue(name: string) {
  switch (name) {
    case 'opacity':
      return 1;
    case 'x':
    case 'y':
    case 'z':
    case 'zIndex':
      return 0;
    default:
      return undefined;
  }
}
