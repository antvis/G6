import { isFunction } from '@antv/util';
import type { CallableObject, ElementDatum, StyleIterationContext } from '../types';
import { inferDefaultValue } from './animation';

/**
 * <zh/> 计算支持回调的动态样式
 *
 * <en/> compute dynamic style that supports callback
 * @param callableStyle - <zh/> 动态样式 | <en/> dynamic style
 * @param context - <zh/> 样式计算迭代上下文 | <en/> style iteration context
 * @returns <zh/> 静态样式 | <en/> static style
 */
export function computeElementCallbackStyle(
  callableStyle: CallableObject<Record<string, unknown>, ElementDatum>,
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

/**
 * <zh/> 获取元素的 z-index
 *
 * <en/> Get the z-index of the element
 * @param datum - <zh/> 元素数据 | <en/> element data
 * @returns <zh/> z-index | <en/> z-index
 */
export function zIndexOf(datum: ElementDatum) {
  return datum.style?.zIndex ?? (inferDefaultValue('zIndex') as number) ?? 0;
}
