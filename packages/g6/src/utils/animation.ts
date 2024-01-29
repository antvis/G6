import type { IAnimation } from '@antv/g';
import { isArray, isString } from '@antv/util';
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
