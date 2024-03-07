import type { DisplayObject } from '@antv/g';

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
  names.forEach((n) => {
    if (n in element.attributes) {
      Object.assign(element.attributes, {
        [getStyleCacheKey(n)]: element.attributes[n],
      });
    }
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
  return element.attributes[getStyleCacheKey(name)];
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
  element.attributes[getStyleCacheKey(name)] = value;
}
