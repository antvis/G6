import { ID } from '@antv/graphlib';
import type { ComboData, EdgeData, NodeData } from '../spec';
import type { BaseTransform, BaseTransformOptions } from './base-transform';

export type BuiltInTransformOptions = BaseTransformOptions;
export type Transform = BaseTransform<any>;

/**
 * <zh/> 在 Element Controller 中，为了提高查询性能，统一使用 Map 存储数据
 *
 * <en/> In Element Controller, in order to improve query performance, use Map to store data uniformly
 */
export class ProcedureData {
  nodes: Map<ID, NodeData> = new Map();
  edges: Map<ID, EdgeData> = new Map();
  combos: Map<ID, ComboData> = new Map();
}

export type DrawData = {
  add: ProcedureData;
  update: ProcedureData;
  remove: ProcedureData;
};
