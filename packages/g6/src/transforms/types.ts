import type { ComboData, EdgeData, NodeData } from '../spec';
import type { ID } from '../types';
import type { BaseTransform } from './base-transform';

export type Transform = BaseTransform<any>;

/**
 * <zh/> 在 Element Controller 中，为了提高查询性能，统一使用 Map 存储数据
 *
 * <en/> In Element Controller, in order to improve query performance, use Map to store data uniformly
 */
export type ProcedureData = {
  nodes: Map<ID, NodeData>;
  edges: Map<ID, EdgeData>;
  combos: Map<ID, ComboData>;
};

export type DrawData = {
  add: ProcedureData;
  update: ProcedureData;
  remove: ProcedureData;
};
