import type { ID } from '@antv/graphlib';
import { isNumber, isString } from '@antv/util';
import type { ComboData, EdgeData, GraphData, NodeData } from '../spec';
import { isEdgeData } from './is';

/**
 * <zh/> 获取节点/边/Combo 的 ID
 *
 * <en/> get the id of node/edge/combo
 * @param data - <zh/> 节点/边/Combo 的数据 | <en/> data of node/edge/combo
 * @returns <zh/> 节点/边/Combo 的 ID | <en/> ID of node/edge/combo
 */
export function idOf(data: Partial<NodeData | EdgeData | ComboData>): ID {
  if (isString(data.id) || isNumber(data.id)) return data.id;
  if (isEdgeData(data)) return `${data.source}-${data.target}`;

  throw new Error('The data does not have available id.');
}

/**
 * <zh/> 获取节点/Combo 的父节点 ID
 *
 * <en/> get the parent id of node/combo
 * @param data - <zh/> 节点/Combo 的数据 | <en/> data of node/combo
 * @returns <zh/> 节点/Combo 的父节点 ID | <en/> parent id of node/combo
 */
export function parentIdOf(data: Partial<NodeData | ComboData>) {
  return data.style?.parentId;
}

/**
 * <zh/> 获取图数据中所有节点/边/Combo 的 ID
 *
 * <en/> Get the IDs of all nodes/edges/combos in the graph data
 * @param data - <zh/> 图数据 | <en/> graph data
 * @returns - <zh/> 返回元素 ID 数组 | <en/> Returns an array of element IDs
 */
export function getIds(data: GraphData): ID[] {
  return Object.values(data).flatMap((elements: NodeData[] | EdgeData[] | ComboData[]) => elements.map(idOf));
}
