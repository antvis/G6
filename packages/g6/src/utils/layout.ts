import type { LayoutMapping } from '@antv/layout';
import { isNumber } from '@antv/util';
import type { STDLayoutOptions } from '../spec/layout';
import type { LayoutResult } from '../types';
import { parsePoint } from './point';

/**
 * <zh/> 判断是否是 combo 布局
 *
 * <en/> Determine if it is a combo layout
 * @param options - <zh/> 布局配置项 | <en/> Layout options
 * @returns <zh/> 是否是 combo 布局 | <en/> Whether it is a combo layout
 */
export function isComboLayout(options: STDLayoutOptions) {
  const { type } = options;
  if (['comboCombined', 'comboForce'].includes(type)) return true;
  if (type === 'dagre' && options.sortByCombo) return true;
  return false;
}

/**
 * <zh/> 判断是否是树图布局
 *
 * <en/> Determine if it is a tree layout
 * @param options - <zh/> 布局配置项 | <en/> Layout options
 * @returns <zh/> 是否是树图布局 | <en/> Whether it is a tree layout
 */
export function isTreeLayout(options: STDLayoutOptions) {
  const { type } = options;
  return ['compactBox', 'mindmap', 'dendrogram', 'indented'].includes(type);
}

/**
 * <zh/> 从布局算法的结果抽取应用到元素中的样式
 *
 * <en/> Extract the style applied to the element from the result of the layout algorithm
 * @param result - <zh/> 布局算法的结果 | <en/> The result of the layout algorithm
 * @returns <zh/> 应用到元素中的样式 | <en/> Style applied to the element
 */
export function pickLayoutResult(result: LayoutMapping): LayoutResult {
  const { nodes = [], edges = [] } = result;

  return {
    nodes: Object.fromEntries(
      nodes.map((node) => {
        const {
          id,
          data: { x, y, z },
        } = node;
        if (isNumber(z)) return [id, [x, y, z]];
        return [id, [x, y]];
      }),
    ),
    edges: Object.fromEntries(
      edges.map(({ id, data }) => {
        const result: Record<string, unknown> = {};
        if ('controlPoints' in data) result.controlPoints = data.controlPoints!.map(parsePoint);
        if ('points' in data) result.points = data.points!.map(parsePoint);
        return [id, result];
      }),
    ),
  };
}

/**
 * <zh/> 数据中是否指定了位置
 *
 * <en/> Is the position specified in the data
 * @param data - <zh/> 数据 | <en/> Data
 * @returns <zh/> 是否指定了位置 | <en/> Is the position specified
 */
export function isPositionSpecified(data: Record<string, unknown>) {
  return isNumber(data.x) && isNumber(data.y);
}
