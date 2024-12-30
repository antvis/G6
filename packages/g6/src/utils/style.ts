import type { DisplayObjectConfig } from '@antv/g';
import type { Graph } from '../runtime/graph';
import type { ElementDatum, StyleIterationContext } from '../types';

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
    | Record<string, unknown>
    | ((this: Graph, datum: ElementDatum) => Record<string, unknown>)
    | {
        [key: string]: (this: Graph, datum: ElementDatum) => unknown;
      },
  context: StyleIterationContext,
) {
  const { datum, graph } = context;

  if (typeof callableStyle === 'function') return callableStyle.call(graph, datum);

  return Object.fromEntries(
    Object.entries(callableStyle).map(([key, style]) => {
      if (typeof style === 'function') return [key, style.call(graph, datum)];
      return [key, style];
    }),
  );
}

/**
 * <zh/> 合并图形配置项
 *
 * <en/> Merge shape configuration
 * @param defaultOptions - <zh/> 配置项1 | <en/> configuration 1
 * @param modifiedOptions - <zh/> 配置项2 | <en/> configuration 2
 * @returns <zh/> 合并后的配置项 | <en/> merged configuration
 */
export function mergeOptions(
  defaultOptions: DisplayObjectConfig<any>,
  modifiedOptions: DisplayObjectConfig<any>,
): DisplayObjectConfig<any> {
  const s1 = defaultOptions?.style || {};
  const s2 = modifiedOptions?.style || {};
  for (const key in s1) {
    if (!(key in s2)) s2[key] = s1[key];
  }

  return Object.assign({}, defaultOptions, modifiedOptions, {
    style: s2,
  });
}

/**
 * <zh/> 获取图形子图形样式
 *
 * <en/> Get the style of the sub-shape of the shape
 * @param style - <zh/> 图形样式 | <en/> shape style
 * @returns <zh/> 子图形样式 | <en/> sub-shape style
 * @remarks
 * <zh/> 从给定的属性对象中提取图形样式属性。删除特定的属性，如位置、变换和类名
 *
 * <en/> Extracts the shape styles from a given attribute object.
 * Removes specific styles like position, transformation, and class name.
 */
export function getSubShapeStyle<T extends Record<string, any>>(
  style: T,
): Omit<T, 'x' | 'y' | 'z' | 'transform' | 'transformOrigin' | 'className' | 'class' | 'zIndex' | 'visibility'> {
  const { x, y, z, class: cls, className, transform, transformOrigin, zIndex, visibility, ...rest } = style;
  return rest;
}
