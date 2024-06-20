import type { ComboData, EdgeData, NodeData } from '../spec/data';
import type { ID } from '../types';

export type DataID = {
  nodes?: ID[];
  edges?: ID[];
  combos?: ID[];
};

export type NodeLikeData = NodeData | ComboData;

export type ElementDatum = NodeData | EdgeData | ComboData;

export type ElementData = NodeData[] | EdgeData[] | ComboData[];

/**
 * <zh/> 节点、边更新可选数据
 *
 * <en/> Node, edge update optional data
 * @remarks
 * <zh/> 必须包含 id 字段，其他字段可选
 *
 * <en/> Must contain the id field, other fields are optional
 */
export type PartialNodeLikeData<T extends NodeLikeData> = Partial<T> & Pick<T, 'id'>;

/**
 * <zh/> 边更新可选数据
 *
 * <en/> Edge update optional data
 * @remarks
 * <zh/> 包含两种情况：
 * 1. 必须包含 source、target 字段，其他字段可选
 * 2. 必须包含 id 字段，其他字段可选
 *
 * <en/> Contains two cases:
 * 1. Must contain the source and target fields, other fields are optional
 * 2. Must contain the id field, other fields are optional
 */
export type PartialEdgeData<T extends EdgeData> =
  | (Partial<T> & Pick<T, 'source' | 'target'>)
  | (Partial<T> & Pick<T, 'id'>);

/**
 * <zh/> G6 数据更新可选数据
 *
 * <en/> G6 data update optional data
 */
export type PartialGraphData = {
  nodes?: PartialNodeLikeData<NodeData>[];
  edges?: PartialEdgeData<EdgeData>[];
  combos?: PartialNodeLikeData<ComboData>[];
};

/**
 * <zh/> 层级结构类别
 *
 * <en/> Hierarchy structure category
 * @remarks
 * <zh/> G6 中树形层级结构和组合层级结构是相互独立的，分别对应不同的数据结构
 * 一些 API 需要指定层级结构类别，例如 getAncestorsData、getParentData
 *
 * <en/> The tree hierarchy structure and the combo hierarchy structure in G6 are independent of each other, corresponding to different data structures
 * Some APIs need to specify the hierarchy structure category, such as getAncestorsData, getParentData
 */
export type HierarchyKey = 'tree' | 'combo';
