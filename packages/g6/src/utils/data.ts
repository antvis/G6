import { get } from '@antv/util';
import type { ComboData, EdgeData, GraphData, NodeData } from '../spec';

/**
 * <zh/> 合并两个 节点/边/Combo 的数据
 *
 * <en/> Merge the data of two nodes/edges/combos
 * @param original - <zh/> 原始数据 | <en/> original data
 * @param modified - <zh/> 待合并的数据 | <en/> data to be merged
 * @returns <zh/> 合并后的数据 | <en/> merged data
 * @remarks
 * <zh/> 只会合并第一层的数据，data、style 下的二级数据会被覆盖
 *
 * <en/> Only the first level of data will be merged, the second level of data under data and style will be overwritten
 */
export function mergeElementsData<T extends NodeData | EdgeData | ComboData>(original: T, modified: Partial<T>): T {
  const { data: originalData, style: originalStyle, ...originalAttrs } = original;
  const { data: modifiedData, style: modifiedStyle, ...modifiedAttrs } = modified;

  const result = {
    ...originalAttrs,
    ...modifiedAttrs,
  };

  if (originalData || modifiedData) {
    Object.assign(result, { data: { ...originalData, ...modifiedData } });
  }

  if (originalStyle || modifiedStyle) {
    Object.assign(result, { style: { ...originalStyle, ...modifiedStyle } });
  }

  return result as T;
}

/**
 * <zh/> 克隆元素数据
 *
 * <en/> Clone clement data
 * @param data - <zh/> 待克隆的数据 | <en/> data to be cloned
 * @returns <zh/> 克隆后的数据 | <en/> cloned data
 * @remarks
 * <zh/> 只会克隆到第二层（data、style）
 *
 * <en/> Only clone to the second level (data, style)
 */
export function cloneElementData<T extends NodeData | EdgeData | ComboData>(data: T): T {
  const { data: customData, style, ...restAttrs } = data;
  const clonedData = restAttrs as T;
  if (customData) clonedData.data = { ...customData };
  if (style) clonedData.style = { ...style };
  return clonedData;
}

/**
 * <zh/> 判断数据是否为空
 *
 * <en/> Determine if the data is empty
 * @param data - <zh/> 图数据 | <en/> graph data
 * @returns <zh/> 是否为空 | <en/> is empty
 */
export function isEmptyData(data: GraphData) {
  return !get(data, ['nodes', 'length']) && !get(data, ['edges', 'length']) && !get(data, ['combos', 'length']);
}
