import type { Edge, Node } from '@antv/graphlib';
import type { ComboData, EdgeData, NodeData } from '../spec';
import { NodeLikeData } from '../types/data';
import { isEdgeData } from './is';

export function toGraphlibData(datums: EdgeData): Edge<EdgeData>;
export function toGraphlibData(datums: NodeLikeData): Node<NodeLikeData>;
/**
 * <zh/> 将 NodeData、EdgeData、ComboData 转换为 graphlib 的数据结构
 *
 * <en/> Transform NodeData, EdgeData, ComboData to graphlib data structure
 * @param data - <zh/> 节点、边、combo 数据 | <en/> node, combo data
 * @returns <zh/> graphlib 数据 | <en/> graphlib data
 */
export function toGraphlibData(data: NodeData | EdgeData | ComboData): Node<NodeLikeData> | Edge<EdgeData> {
  if (isEdgeData(data)) {
    const { style, data: customData, ...rest } = data;
    return {
      ...rest,
      data,
    } as Edge<EdgeData>;
  }
  return { id: data.id, data } as Node<NodeLikeData>;
}

export function toG6Data<T extends EdgeData>(data: Edge<T>): T;
export function toG6Data<T extends NodeLikeData>(data: Node<T>): T;
/**
 * <zh/> 将 Node、Edge、Combo 转换为 G6 的数据结构
 *
 * <en/> Transform Node, Edge, Combo to G6 data structure
 * @param data - <zh/> graphlib 节点、边、Combo 数据 | <en/> graphlib node, edge, combo data
 * @returns <zh/> G6 数据 | <en/> G6 data
 */
export function toG6Data<T extends NodeData | EdgeData | ComboData>(data: Node<T> | Edge<T>): T {
  return data.data;
}
