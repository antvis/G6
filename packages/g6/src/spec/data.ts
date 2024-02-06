import type { ID } from '@antv/graphlib';
import type { EdgeStyle } from './element/edge';
import type { NodeLikeStyle } from './element/node';

export type GraphData = {
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
};

export type NodeData = {
  id: ID;
  data?: Record<string, unknown>;
  style?: NodeLikeDataStyle;
};

export type ComboData = {
  id: ID;
  data?: Record<string, unknown>;
  style?: NodeLikeDataStyle;
};

export type EdgeData = {
  id?: ID;
  source: ID;
  target: ID;
  data?: Record<string, unknown>;
  style?: EdgeDataStyle;
};

interface NodeLikeDataStyle extends BaseElementStyle, NodeLikeStyle {
  collapsed?: boolean;
  parentId?: ID;
}

interface EdgeDataStyle extends BaseElementStyle, EdgeStyle {
  /**
   * <zh/> 起点连接桩 id
   *
   * <en/> source port id
   */
  sourceAnchor?: string;
  /**
   * <zh/> 终点连接桩 id
   *
   * <en/> target port id
   */
  targetAnchor?: string;
}

interface BaseElementStyle {
  /**
   * <zh/> 默认状态
   *
   * <en/> Default state
   */
  states?: string[];
}
