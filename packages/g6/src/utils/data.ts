import type { ComboData, EdgeData, NodeData } from '../spec';

/**
 * <zh/> 合并两个 节点/边/Combo 的数据
 *
 * <en/> Merge the data of two nodes/edges/combos
 * @param original - <zh/> 原始数据 | <en/> original data
 * @param modified - <zh/> 待合并的数据 | <en/> data to be merged
 * @returns <zh/> 合并后的数据 | <en/> merged data
 * @description
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
