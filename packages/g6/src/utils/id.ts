import type { ComboData, EdgeData, NodeData } from '../spec/data';

/**
 * <zh/> 获取节点/边/Combo 的 ID
 *
 * <en/> get the id of node/edge/combo
 * @param item - <zh/> 节点/边/Combo 的数据 | <en/> data of node/edge/combo
 * @returns - <zh/> 节点/边/Combo 的 ID | <en/> ID of node/edge/combo
 */
export function idOf(item: NodeData | EdgeData | ComboData) {
  return item.id;
}
