import type { IAnimation } from '@antv/g';

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
    get(target, propKey) {
      if (typeof target[propKey] === 'function') {
        return (...args: unknown[]) => {
          target[propKey](...args);
          targetAnimations.forEach((animation) => animation[propKey]?.(...args));
        };
      }
      return Reflect.get(target, propKey);
    },
    set(target, propKey, value) {
      targetAnimations.forEach((animation) => (animation[propKey] = value));
      return Reflect.set(target, propKey, value);
    },
  });
}
