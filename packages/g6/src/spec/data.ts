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
  /** <zh/> 节点 / combo 是否展开 | <en/> Whether the node / combo is expanded */
  collapsed?: boolean;
  /** <zh/> 父节点 id | <en/> Parent node id */
  parentId?: ID;
  /** <zh/> 子节点 id | <en/> Child node id */
  children?: ID[];
}

interface EdgeDataStyle extends BaseElementStyle, EdgeStyle {
  /**
   * <zh/> 起点连接桩 id
   *
   * <en/> source port id
   */
  sourcePort?: string;
  /**
   * <zh/> 终点连接桩 id
   *
   * <en/> target port id
   */
  targetPort?: string;
}

interface BaseElementStyle {
  /**
   * <zh/> 默认状态
   *
   * <en/> Default state
   */
  states?: string[];
}
