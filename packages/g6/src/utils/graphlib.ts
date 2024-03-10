import type { Edge, Graph as Graphlib, Node } from '@antv/graphlib';
import { TREE_KEY } from '../constants';
import type { ComboData, EdgeData, NodeData } from '../spec';
import { NodeLikeData } from '../types/data';
import { idOf } from './id';
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
  const { id = idOf(data), style, data: customData, ...rest } = data;
  const _data = { ...data, style: { ...style }, data: { ...customData } };

  if (isEdgeData(data)) return { id, data: _data, ...rest } as Edge<EdgeData>;
  return { id, data: _data } as Node<NodeLikeData>;
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

/**
 * <zh/> 创建树形结构
 *
 * <en/> Create tree structure
 * @param model - <zh/> 数据模型 | <en/> data model
 */
export function createTreeStructure(model: Graphlib<any, any>) {
  if (model.hasTreeStructure(TREE_KEY)) return;

  model.attachTreeStructure(TREE_KEY);
  const edges = model.getAllEdges();

  for (const edge of edges) {
    const { source, target } = edge;
    model.setParent(target, source, TREE_KEY);
  }
}
