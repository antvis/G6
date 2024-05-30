import type { DisplayObjectConfig } from '@antv/g';
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
  const { datum } = context;

  if (isFunction(callableStyle)) return callableStyle(datum);

  return Object.fromEntries(
    Object.entries(callableStyle).map(([key, style]) => {
      if (isFunction(style)) return [key, style(datum)];
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

/**
 * <zh/> 合并图形配置项
 *
 * <en/> Merge graphic configuration
 * @param options - <zh/> 图形配置项数组 | <en/> graphic configuration array
 * @returns <zh/> 合并后的配置项 | <en/> merged configuration
 */
export function mergeOptions(...options: DisplayObjectConfig<any>[]): DisplayObjectConfig<any> {
  const option = { style: {} };
  for (const opt of options) {
    const { style, ..._ } = opt;
    Object.assign(option.style, style);
    Object.assign(option, _);
  }
  return option;
}
