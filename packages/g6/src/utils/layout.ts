import { isNumber } from '@antv/util';
import type { STDLayoutOptions } from '../spec/layout';

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
  if (type === 'antv-dagre' && options.sortByCombo) return true;
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
  return ['compact-box', 'mindmap', 'dendrogram', 'indented'].includes(type);
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
