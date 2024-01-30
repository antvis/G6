import type { EdgeData } from '../spec';
import type { ElementDatum } from '../types';

/**
 * <zh/> 判断是否为边数据
 *
 * <en/> judge whether the data is edge data
 * @param data - <zh/> 元素数据 | <en/> element data
 * @returns - <zh/> 是否为边数据 | <en/> whether the data is edge data
 */
export function isEdgeData(data: Partial<ElementDatum>): data is EdgeData {
  if ('source' in data && 'target' in data) return true;
  return false;
}
