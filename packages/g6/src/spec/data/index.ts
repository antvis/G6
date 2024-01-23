import type { BaseStyleProps } from '@antv/g';
import type { ID } from '@antv/graphlib';
import type { EdgeStyle } from '../element/edge';

export type DataOptions = {
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
  data?: Record<string, any>;
  style?: NodeLikeStyle;
};

export type ComboData = {
  id: ID;
  data?: Record<string, any>;
  style?: NodeLikeStyle;
};

export type EdgeData = {
  id: ID;
  source: ID;
  target: ID;
  data?: Record<string, any>;
  style?: EdgeStyle;
};

/**
 * Can be a node or combo.
 */
export type NodeLikeStyle = Pick<BaseStyleProps, 'cursor' | 'opacity' | 'pointerEvents' | 'visibility' | 'zIndex'> & {
  parentId?: ID;
  collapsed?: boolean;
  type?: string;
  x?: number;
  y?: number;
  z?: number;
  [keys: string]: any;
};
