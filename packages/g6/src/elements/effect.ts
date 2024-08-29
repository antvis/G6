import type { Element } from '../types';

const EFFECT_WEAKMAP = new WeakMap<Element, Record<string, any>>();

/**
 * <zh/> 判定给定样式是否与上一次的样式相同
 *
 * <en/> Determine whether the given style are the same as the previous ones
 * @param target - <zh/> 目标元素 | <en/> Target element
 * @param key - <zh/> 缓存 key | <en/> Cache key
 * @param style - <zh/> 样式属性 | <en/> Style attribute
 * @returns <zh/> 是否执行函数 | <en/> Whether to execute the function
 */
export function effect<T extends false | Record<string, any>>(target: Element, key: string, style: T): boolean {
  if (!EFFECT_WEAKMAP.has(target)) EFFECT_WEAKMAP.set(target, {});
  const cache = EFFECT_WEAKMAP.get(target)!;
  if (!cache[key]) {
    cache[key] = style;
    return true;
  }
  const original = cache[key];
  if (isStyleEqual(original, style)) return false;
  cache[key] = style;
  return true;
}

/**
 * <zh/> 比较两个样式属性是否相等
 *
 * <en/> Compare whether two style attributes are equal
 * @param a - <zh/> 样式属性 a | <en/> Style attribute a
 * @param b - <zh/> 样式属性 b | <en/> Style attribute b
 * @param depth - <zh/> 比较深度 | <en/> Comparison depth
 * @returns <zh/> 是否相等 | <en/> Whether they are equal
 * @remarks
 * <zh/> 进行第二层浅比较用于比较 badges、ports 等复合图形属性
 *
 * <en/> Perform a second-level shallow comparison to compare complex shape attributes such as badges and ports
 */
const isStyleEqual = (a: false | Record<string, unknown>, b: false | Record<string, unknown>, depth = 2): boolean => {
  if (typeof a !== 'object' || typeof b !== 'object') return a === b;

  const keys1 = Object.keys(a);
  const keys2 = Object.keys(b);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    const val1 = a[key];
    const val2 = b[key];
    if (depth > 1 && typeof val1 === 'object' && typeof val2 === 'object') {
      if (!isStyleEqual(val1 as Record<string, unknown>, val2 as Record<string, unknown>, depth - 1)) return false;
    } else if (val1 !== val2) return false;
  }

  return true;
};
