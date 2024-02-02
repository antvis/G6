import type { Graph as Graphlib, ID } from '@antv/graphlib';
import type { ComboData, EdgeData, NodeData } from '../spec/data';

export type GraphlibData = Graphlib<NodeData, EdgeData>;

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
 * @description
 * <zh/> 必须包含 id 字段，其他字段可选
 *
 * <en/> Must contain the id field, other fields are optional
 */
export type PartialNodeLikeData<T extends NodeLikeData> = Partial<T> & Pick<T, 'id'>;

/**
 * <zh/> 边更新可选数据
 *
 * <en/> Edge update optional data
 * @description
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
export type PartialDataOptions = {
  nodes?: PartialNodeLikeData<NodeData>[];
  edges?: PartialEdgeData<EdgeData>[];
  combos?: PartialNodeLikeData<ComboData>[];
};
