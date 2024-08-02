import type { IAnimation } from '@antv/g';
import { isEqual, isNil, isObject } from '@antv/util';
import type { AnimationEffectTiming, AnimationOptions, STDAnimation } from '../animations/types';
import { DEFAULT_ANIMATION_OPTIONS, DEFAULT_ELEMENTS_ANIMATION_OPTIONS, ExtensionCategory } from '../constants';
import { getExtension } from '../registry/get';
import type { GraphOptions } from '../spec';
import type { AnimationStage } from '../spec/element/animation';
import type { ElementType, Keyframe } from '../types';
import { print } from './print';
import { themeOf } from './theme';

export function createAnimationsProxy(animations: IAnimation[]): IAnimation | null;
export function createAnimationsProxy(sourceAnimation: IAnimation, targetAnimations: IAnimation[]): IAnimation;
/**
 * <zh/> 创建动画代理，对一个动画实例的操作同步到多个动画实例上
 *
 * <en/> create animation proxy, synchronize animation to multiple animation instances
 * @param args1 - <zh/> 源动画实例 | <en/> source animation instance
 * @param args2 - <zh/> 目标动画实例 | <en/> target animation instance
 * @returns <zh/> 动画代理 | <en/> animation proxy
 */
export function createAnimationsProxy(args1: IAnimation | IAnimation[], args2?: IAnimation[]): IAnimation | null {
  if (Array.isArray(args1) && args1.length === 0) return null;

  const sourceAnimation = Array.isArray(args1) ? args1[0] : args1;
  const targetAnimations = Array.isArray(args1) ? args1.slice(1) : args2 || [];

  return new Proxy(sourceAnimation, {
    get(target, propKey: keyof IAnimation) {
      if (typeof target[propKey] === 'function' && !['onframe', 'onfinish'].includes(propKey)) {
        return (...args: unknown[]) => {
          (target[propKey] as any)(...args);
          targetAnimations.forEach((animation) => (animation[propKey] as any)?.(...args));
        };
      }
      if (propKey === 'finished') {
        return Promise.all([sourceAnimation.finished, ...targetAnimations.map((animation) => animation.finished)]);
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
      // 属性值可以是保留属性 / property value can be the reserved property
      values.every((value) => !['sourceNode', 'targetNode', 'childrenNode'].includes(key) && isEqual(value, values[0]))
    ) {
      delete propertyIndexedKeyframes[key];
    }
  });

  // 将 PropertyIndexedKeyframes 转化为 Keyframe 格式
  // convert PropertyIndexedKeyframes to Keyframe format
  const output = Object.entries(propertyIndexedKeyframes).reduce((acc, [key, values]) => {
    values.forEach((value, index) => {
      if (!acc[index]) acc[index] = { [key]: value };
      else acc[index][key] = value;
    });
    return acc;
  }, [] as Keyframe[]);

  // 如果处理后所有的属性都被过滤掉，则添加一个没有实际作用的属性用于触发动画
  // If all properties are filtered out after processing, add a property that has no actual effect to trigger the animation
  if (keyframes.length !== 0 && output.length === 0) output.push(...[{ _: 0 }, { _: 0 }]);

  return output;
}

/**
 * <zh/> 获取属性的默认值
 *
 * <en/> Get default value of attribute
 * @param name - <zh/> 属性名 | <en/> Attribute name
 * @returns <zh/> 属性默认值 | <en/> Attribute default value
 * @remarks
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
    case 'visibility':
      return 'visible';
    case 'collapsed':
      return false;
    case 'states':
      return [];
    default:
      return undefined;
  }
}

/**
 * <zh/> 获取动画配置
 *
 * <en/> Get global animation configuration
 * @param options - <zh/> G6 配置项（用于获取全局动画配置） | <en/> G6 configuration(used to get global animation configuration)
 * @param localAnimation - <zh/> 局部动画配置 | <en/> local animation configuration
 * @returns <zh/> 动画配置 | <en/> animation configuration
 */
export function getAnimationOptions(
  options: GraphOptions,
  localAnimation: boolean | AnimationEffectTiming | undefined,
): false | AnimationEffectTiming {
  const { animation } = options;
  if (animation === false || localAnimation === false) return false;

  const effectTiming: AnimationEffectTiming = { ...DEFAULT_ANIMATION_OPTIONS };
  if (isObject(animation)) Object.assign(effectTiming, animation);
  if (isObject(localAnimation)) Object.assign(effectTiming, localAnimation);
  return effectTiming;
}

/**
 * <zh/> 获取动画配置
 *
 * <en/> Get animation configuration
 * @param options - <zh/> 动画配置项 | <en/> animation configuration
 * @returns <zh/> 动画配置 | <en/> animation configuration
 */
function animationOf(options: string | AnimationOptions[]): STDAnimation {
  if (typeof options === 'string') {
    const animation = getExtension(ExtensionCategory.ANIMATION, options);
    if (animation) return animation;

    print.warn(`The animation of ${options} is not registered.`);
    return [];
  }
  return options;
}

/**
 * <zh/> 获取元素的动画
 *
 * <en/> Get element animation
 * @param options - <zh/> G6 配置项 | <en/> G6 configuration
 * @param elementType - <zh/> 元素类型 | <en/> element type
 * @param stage - <zh/> 动画阶段 | <en/> animation stage
 * @param localAnimation - <zh/> 局部动画配置 | <en/> local animation configuration
 * @returns <zh/> 动画时序配置 | <en/> animation timing configuration
 */
export function getElementAnimationOptions(
  options: GraphOptions,
  elementType: ElementType,
  stage: AnimationStage,
  localAnimation?: AnimationEffectTiming | boolean,
): STDAnimation {
  const { animation: globalAnimation } = options;

  const userElementAnimation = options?.[elementType]?.animation;
  if (userElementAnimation === false) return [];
  const useElementStageAnimation = userElementAnimation?.[stage];
  if (useElementStageAnimation === false) return [];
  if (globalAnimation === false || localAnimation === false) return [];

  // 优先级：用户局部动画配置 > 用户动画配置 > 全局动画配置 > 主题动画配置 > 默认动画配置
  // Priority: user local animation configuration > user animation configuration > global animation configuration > theme animation configuration > default animation configuration

  const themeElementAnimation = themeOf(options)[elementType]?.animation;

  const combine = (_: string | AnimationOptions[] = []) =>
    animationOf(_).map((animation) => ({
      ...DEFAULT_ELEMENTS_ANIMATION_OPTIONS,
      ...(isObject(globalAnimation) && globalAnimation),
      ...animation,
      ...(isObject(localAnimation) && localAnimation),
    }));

  if (useElementStageAnimation) return combine(useElementStageAnimation);

  if (!themeElementAnimation) return [];

  // 此时取决于主题动画配置
  // At this time, it depends on the theme animation configuration
  const themeElementStageAnimation = themeElementAnimation[stage];
  if (themeElementStageAnimation === false) return [];
  return combine(themeElementStageAnimation);
}
