import type { ID } from '../types';
import type { ComboStyle } from './element/combo';
import type { EdgeStyle } from './element/edge';
import type { NodeStyle } from './element/node';

export interface GraphData {
  /**
   * <zh/> 节点数据
   *
   * <en/> node data
   */
  nodes?: NodeData[];
  /**
   * <zh/> 边数据
   *
   * <en/> edge data
   */
  edges?: EdgeData[];
  /**
   * <zh/> Combo 数据
   *
   * <en/> combo data
   */
  combos?: ComboData[];
}

export interface NodeData {
  id: ID;
  data?: Record<string, unknown>;
  style?: NodeStyle;
  [key: string]: unknown;
}

export interface ComboData {
  id: ID;
  data?: Record<string, unknown>;
  style?: ComboStyle;
  [key: string]: unknown;
}

export interface EdgeData {
  id?: ID;
  source: ID;
  target: ID;
  data?: Record<string, unknown>;
  style?: EdgeStyle;
  [key: string]: unknown;
}
