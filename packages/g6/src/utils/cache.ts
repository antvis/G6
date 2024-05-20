import type { DisplayObject } from '@antv/g';
import { get, set } from '@antv/util';

const CacheTargetKey = 'cachedStyle';

const getStyleCacheKey = (name: string) => `__${name}__`;

/**
 * <zh/> 缓存图形样式
 *
 * <en/> Cache graphic style
 * @param element - <zh/> 图形元素 | <en/> graphic element
 * @param name - <zh/> 样式名 | <en/> style name
 */
export function cacheStyle(element: DisplayObject, name: string | string[]) {
  const names = Array.isArray(name) ? name : [name];
  if (!get(element, CacheTargetKey)) set(element, CacheTargetKey, {});
  names.forEach((n) => {
    set(get(element, CacheTargetKey), getStyleCacheKey(n), element.attributes[n]);
  });
}

/**
 * <zh/> 获取缓存的样式
 *
 * <en/> Get cached style
 * @param element - <zh/> 图形元素 | <en/> graphic element
 * @param name - <zh/> 样式名 | <en/> style name
 * @returns <zh/> 样式值 | <en/> style value
 */
export function getCachedStyle(element: DisplayObject, name: string) {
  return get(element, [CacheTargetKey, getStyleCacheKey(name)]);
}

/**
 * <zh/> 是否有缓存的样式
 *
 * <en/> Whether there is a cached style
 * @param element - <zh/> 图形元素 | <en/> graphic element
 * @param name - <zh/> 样式名 | <en/> style name
 * @returns <zh/> 是否有缓存的样式 | <en/> Whether there is a cached style
 */
export function hasCachedStyle(element: DisplayObject, name: string) {
  return getStyleCacheKey(name) in (get(element, CacheTargetKey) || {});
}

/**
 * <zh/> 设置缓存的样式
 *
 * <en/> Set cached style
 * @param element - <zh/> 图形元素 | <en/> graphic element
 * @param name - <zh/> 样式名 | <en/> style name
 * @param value - <zh/> 样式值 | <en/> style value
 */
export function setCacheStyle(element: DisplayObject, name: string, value: any) {
  set(element, [CacheTargetKey, getStyleCacheKey(name)], value);
}
