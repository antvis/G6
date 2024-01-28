import { isNumber, isString } from '@antv/util';
import type { ComboData, EdgeData, NodeData } from '../spec';
import { isEdgeData } from './is';

/**
 * <zh/> 获取节点/边/Combo 的 ID
 *
 * <en/> get the id of node/edge/combo
 * @param data - <zh/> 节点/边/Combo 的数据 | <en/> data of node/edge/combo
 * @returns - <zh/> 节点/边/Combo 的 ID | <en/> ID of node/edge/combo
 */
export function idOf(data: Partial<NodeData | EdgeData | ComboData>) {
  if (isString(data.id) || isNumber(data.id)) return data.id;
  if (isEdgeData(data)) return `${data.source}-${data.target}`;

  throw new Error('The data does not have available id.');
}
