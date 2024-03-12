import { isFunction } from '@antv/util';
import type { CallableObject, ElementData, ElementDatum, StyleIterationContext } from '../types';

/**
 * <zh/> 计算支持回调的动态样式
 *
 * <en/> compute dynamic style that supports callback
 * @param callableStyle - <zh/> 动态样式 | <en/> dynamic style
 * @param context - <zh/> 样式计算迭代上下文 | <en/> style iteration context
 * @returns <zh/> 静态样式 | <en/> static style
 */
export function computeElementCallbackStyle(
  callableStyle:
    | CallableObject<Record<string, unknown>, [ElementDatum, number, ElementData]>
    | ((...params: [ElementDatum, number, ElementData]) => Record<string, unknown>),
  context: StyleIterationContext,
) {
  const { datum, index, elementData } = context;

  if (isFunction(callableStyle)) return callableStyle(datum, index, elementData);

  return Object.fromEntries(
    Object.entries(callableStyle).map(([key, style]) => {
      if (isFunction(style)) return [key, style(datum, index, elementData)];
      return [key, style];
    }),
  );
}
