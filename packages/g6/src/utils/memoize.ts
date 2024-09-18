import { isEqual } from '@antv/util';

/**
 * <zh/> 通过缓存函数调用的参数和结果，避免对相同参数的重复计算。与 lodash 的 memoize 不同，deepMemoize 使用深度比较来检查参数是否相等
 *
 * <en/> Deep memoization function
 * @param func - <zh/> 函数 | <en/> Function
 * @returns <zh/> 计算结果 | <en/> Result
 */
export function deepMemoize<T extends (...args: any[]) => any>(func: T): T {
  const cache = new Map<any[], ReturnType<T>>();

  return function (...args: Parameters<T>): ReturnType<T> {
    for (const [key, value] of cache.entries()) {
      if (isEqual(key, args)) {
        return value;
      }
    }

    // @ts-expect-error this
    const result = func.apply(this, args);
    cache.set(args, result);
    return result;
  } as T;
}
