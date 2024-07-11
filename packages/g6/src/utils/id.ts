import type { ComboData, EdgeData, GraphData, NodeData } from '../spec';
import type { DataID, ID } from '../types';
import { format } from './print';

/**
 * <zh/> 获取节点/边/Combo 的 ID
 *
 * <en/> get the id of node/edge/combo
 * @param data - <zh/> 节点/边/Combo 的数据 | <en/> data of node/edge/combo
 * @returns <zh/> 节点/边/Combo 的 ID | <en/> ID of node/edge/combo
 */
export function idOf(data: Partial<NodeData | EdgeData | ComboData>): ID {
  if (data.id !== undefined) return data.id;
  if (data.source !== undefined && data.target !== undefined) return `${data.source}-${data.target}`;

  throw new Error(format('The datum does not have available id.'));
}

/**
 * <zh/> 获取节点/Combo 的父节点 ID
 *
 * <en/> get the parent id of node/combo
 * @param data - <zh/> 节点/Combo 的数据 | <en/> data of node/combo
 * @returns <zh/> 节点/Combo 的父节点 ID | <en/> parent id of node/combo
 */
export function parentIdOf(data: Partial<NodeData | ComboData>) {
  return data.combo;
}

export function idsOf(data: GraphData, flat: true): ID[];
export function idsOf(data: GraphData, flat: false): DataID;
/**
 * <zh/> 获取图数据中所有节点/边/Combo 的 ID
 *
 * <en/> Get the IDs of all nodes/edges/combos in the graph data
 * @param data - <zh/> 图数据 | <en/> graph data
 * @param flat - <zh/> 是否扁平化返回 | <en/> Whether to return flat
 * @returns - <zh/> 返回元素 ID 数组 | <en/> Returns an array of element IDs
 */
export function idsOf(data: GraphData, flat: boolean): ID[] | DataID {
  const ids = {
    nodes: (data.nodes || []).map(idOf),
    edges: (data.edges || []).map(idOf),
    combos: (data.combos || []).map(idOf),
  };
  return flat ? Object.values(ids).flat() : ids;
}
