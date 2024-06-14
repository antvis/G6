import { isEqual } from '@antv/util';
import type { Element } from '../types';
import { getCachedStyle, setCacheStyle } from '../utils/cache';

/**
 * <zh/> 基于样式属性是否变化控制函数是否执行
 *
 * <en/> Control whether the function is executed based on whether the style attribute changes
 * @param styler - <zh/> 获取样式属性函数 | <en/> Get style attribute function
 * @returns <zh/> 装饰器 | <en/> Decorator
 * @description
 * <zh/> 仅指定 getStyle 的情况下，会分别使用当前的 attributes 和 新的 attributes 调用函数，若两者相同，则不执行函数。
 *
 * 如果指定了 shapeKey, 则会直接获取该图形的 attributes 作为原始样式属性，通常在 getStyle 函数中获取了包围盒时使用。
 *
 * <en/> Only when getStyle is specified, the function will be called with the current attributes and the new attributes respectively. If they are the same, the function will not be executed.
 *
 * If shapeKey is specified, the attributes of the shape will be directly obtained as the original style attributes, which is usually used when the bounding box of the element is used in the getStyle function.
 */
export function effect(styler: (self: any, attributes: Record<string, unknown>) => Record<string, unknown>) {
  return function (target: Element, propertyKey: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value;

    descriptor.value = function (this: Element, attr: Record<string, unknown>, ...rest: unknown[]) {
      // 初始化后需要执行首次调用 / First call after initialization
      const initKey = `${propertyKey}_invoke`;
      if (!getCachedStyle(this, initKey)) {
        setCacheStyle(this, initKey, true);
        return fn.call(this, attr, ...rest);
      }

      const styleKey = `${propertyKey}_style`;
      const original = getCachedStyle(this, styleKey);
      const modified = styler(this, attr);
      setCacheStyle(this, styleKey, modified);

      if (isEqual(original, modified)) return null;
      return fn.call(this, attr, ...rest);
    };
    return descriptor;
  };
}
