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
 * <en/> Merge graphic configuration
 * @param opt1 - <zh/> 配置项1 | <en/> configuration 1
 * @param opt2 - <zh/> 配置项2 | <en/> configuration 2
 * @returns <zh/> 合并后的配置项 | <en/> merged configuration
 */
export function mergeOptions(opt1: DisplayObjectConfig<any>, opt2: DisplayObjectConfig<any>): DisplayObjectConfig<any> {
  const s1 = opt1?.style || {};
  const s2 = opt2?.style || {};
  return Object.assign({}, opt1, opt2, {
    style: opt1?.style ? Object.assign({}, s1, s2) : s2,
  });
}

/**
 * <zh/> 获取图形子图形样式
 *
 * <en/> Get the style of the sub-shape of the graphic
 * @param style - <zh/> 图形样式 | <en/> graphic style
 * @returns <zh/> 子图形样式 | <en/> sub-shape style
 * @remarks
 * <zh/> 从给定的属性对象中提取图形样式属性。删除特定的属性，如位置、变换和类名
 *
 * <en/> Extracts the graphic style properties from a given attribute object.
 * Removes specific properties like position, transformation, and class name.
 */
export function getSubShapeStyle<T extends Record<string, any>>(
  style: T,
): Omit<T, 'x' | 'y' | 'z' | 'transform' | 'transformOrigin' | 'className' | 'class' | 'zIndex' | 'visibility'> {
  const { x, y, z, class: cls, className, transform, transformOrigin, zIndex, visibility, ...rest } = style;
  return rest;
}
