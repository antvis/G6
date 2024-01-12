import type { BaseStyleProps } from '@antv/g';
import type { ID } from '@antv/graphlib';
import type { EdgeStyle } from '../../types/edge';

export type DataOption = {
  /**
   * <zh/> 节点数据
   *
   * <en/> node data
   */
  nodes?: NodeDataOption[];
  /**
   * <zh/> 边数据
   *
   * <en/> edge data
   */
  edges?: EdgeDataOption[];
  /**
   * <zh/> Combo 数据
   *
   * <en/> combo data
   */
  combos?: ComboDataOption[];
};

export type NodeDataOption = {
  id: ID;
  data?: Record<string, any>;
  style?: NodeLikeStyle;
};

export type ComboDataOption = {
  id: ID;
  data?: Record<string, any>;
  style?: NodeLikeStyle;
};

export type EdgeDataOption = {
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
