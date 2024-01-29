import { isFunction } from '@antv/util';
import type { CallableObject, ElementData, ElementDatum } from '../types';

/**
 * <zh/> 计算支持回调的动态样式
 *
 * <en/> compute dynamic style that supports callback
 * @param datum - <zh/> 元素数据 | <en/> element data
 * @param callableStyle - <zh/> 动态样式 | <en/> dynamic style
 * @returns <zh/> 静态样式 | <en/> static style
 */
export function computeElementCallbackStyle(
  datum: ElementDatum,
  callableStyle: CallableObject<Record<string, unknown>, [ElementData]>,
) {
  return Object.fromEntries(
    Object.entries(callableStyle).map(([key, style]) => {
      if (isFunction(style)) return [key, style(datum)];
      return [key, style];
    }),
  );
}
