import type { IAnimation } from '@antv/g';
import { isEqual, isNil, isObject } from '@antv/util';
import { DEFAULT_ANIMATION_OPTIONS } from '../constants';
import type { GraphOptions } from '../spec';
import type { AnimatableTask, Keyframe } from '../types';
import { isNode } from './element';

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
      // 属性值可以是同一节点 / property value can be the same node
      values.every((value) => !isNode(value) && isEqual(value, values[0]))
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

type Callbacks = {
  before?: () => void;
  beforeAnimate?: (result: IAnimation) => void;
  afterAnimate?: (result: IAnimation) => void;
  after?: () => void;
};

/**
 * <zh/> 执行动画前后的回调
 *
 * <en/> Callback before and after animation execution
 * @param animation - <zh/> 动画对象 | <en/> animation object
 * @param callbacks - <zh/> 回调函数 | <en/> callback function
 * @returns <zh/> 动画对象 | <en/> animation object
 */
export function withAnimationCallbacks(animation: IAnimation | null | undefined, callbacks: Callbacks) {
  callbacks.before?.();
  if (animation) {
    callbacks.beforeAnimate?.(animation);
    animation.finished.then(() => {
      callbacks.afterAnimate?.(animation);
      callbacks.after?.();
    });
  } else {
    callbacks.after?.();
  }
  return animation || null;
}

/**
 * <zh/> 执行动画任务
 *
 * <en/> Execute animation tasks
 * @param tasks - <zh/> 动画任务 | <en/> animation task
 * @param callbacks - <zh/> 回调函数 | <en/> callback function
 * @returns <zh/> 动画对象 | <en/> animation object
 */
export function executeAnimatableTasks(tasks: AnimatableTask[], callbacks: Callbacks = {}) {
  if (tasks.length === 0) return null;
  const { before, ...restCallbacks } = callbacks;
  callbacks.before?.();
  const animateTasks = tasks.map((task) => task());

  const animation = createAnimationsProxy(
    animateTasks
      .map((task) => task())
      .flat()
      .filter(Boolean) as IAnimation[],
  );
  withAnimationCallbacks(animation, restCallbacks);
  return animation;
}

/**
 * <zh/> 获取动画配置
 *
 * <en/> Get global animation configuration
 * @param options - <zh/> G6 配置项（用于获取全局动画配置） | <en/> G6 configuration(used to get global animation configuration)
 * @param localAnimation - <zh/> 局部动画配置 | <en/> local animation configuration
 * @returns <zh/> 动画配置 | <en/> animation configuration
 */
export function getAnimation(
  options: GraphOptions,
  localAnimation: boolean | EffectTiming | undefined,
): false | EffectTiming {
  const { animation } = options;
  if (!animation || localAnimation === false) return false;

  const finalAnimation: EffectTiming = { ...DEFAULT_ANIMATION_OPTIONS };
  if (isObject(animation)) Object.assign(finalAnimation, animation);
  if (isObject(localAnimation)) Object.assign(finalAnimation, localAnimation);
  return finalAnimation;
}
