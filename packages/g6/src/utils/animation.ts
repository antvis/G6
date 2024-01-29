import type { IAnimation } from '@antv/g';
import { isArray, isNil, isString } from '@antv/util';
import type {
  ComponentAnimationOptions,
  ConfigurableAnimationOptions,
  StageAnimationOptions,
} from '../spec/element/animation';

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
      targetAnimations.forEach((animation) => ((animation[propKey] as any) = value));
      return Reflect.set(target, propKey, value);
    },
  });
}

export function parseAnimation(animation: string | ComponentAnimationOptions): ComponentAnimationOptions;
export function parseAnimation(animation: ConfigurableAnimationOptions[]): ComponentAnimationOptions;
/**
 * <zh/> 解析动画配置项
 *
 * <en/> parse animation options
 * @param animation - <zh/> 动画配置项 | <en/> animation options
 * @returns <zh/> 动画配置项 | <en/> animation options
 */
export function parseAnimation(animation: StageAnimationOptions): ComponentAnimationOptions {
  if (isArray(animation)) {
    return {
      type: 'specification',
    };
  }
  if (isString(animation)) {
    return {
      type: animation,
    };
  }
  return animation;
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
  const propertyIndexedKeyframes = keyframes.reduce(
    (acc, kf) => {
      Object.entries(kf).forEach(([key, value]) => {
        if (acc[key] === undefined) acc[key] = [value];
        else acc[key].push(value);
      });
      return acc;
    },
    {} as Record<string, any[]>,
  );

  // 过滤掉无用动画的属性（属性值为 undefined、或者值完全一致）
  // filter out useless animation properties (property value is undefined, or value is exactly the same)
  Object.entries(propertyIndexedKeyframes).forEach(([key, values]) => {
    if (
      // 属性值必须在每一帧都存在 / property value must exist in every frame
      values.length !== keyframes.length ||
      // 属性值不能为空 / property value cannot be empty
      values.some((value) => isNil(value)) ||
      // 属性值必须不完全一致 / property value must not be exactly the same
      values.every((value) => value === values[0])
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
