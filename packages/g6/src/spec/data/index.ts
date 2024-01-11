import type { BaseStyleProps } from '@antv/g';
import type { ID } from '@antv/graphlib';
import type { EdgeStyle } from '../../types/edge';

export type DataOption<
  NodeStyle extends Record<string, unknown> = Record<string, never>,
  EdgeStyle extends Record<string, unknown> = Record<string, never>,
  ComboStyle extends Record<string, unknown> = Record<string, never>,
> = {
  /**
   * <zh/> 节点数据
   *
   * <en/> node data
   */
  nodes?: NodeDataOption<NodeStyle>[];
  /**
   * <zh/> 边数据
   *
   * <en/> edge data
   */
  edges?: EdgeDataOption<EdgeStyle>[];
  /**
   * <zh/> Combo 数据
   *
   * <en/> combo data
   */
  combos?: ComboDataOption<ComboStyle>[];
};

export type NodeDataOption<Style extends Record<string, unknown> = Record<string, unknown>> = {
  id: ID;
  data?: Record<string, unknown>;
  style?: NodeLikeStyle<Style>;
};

export type ComboDataOption<Style extends Record<string, unknown> = Record<string, unknown>> = {
  id: ID;
  data?: Record<string, unknown>;
  style?: NodeLikeStyle<Style>;
};

export type EdgeDataOption<Style extends Record<string, unknown> = Record<string, unknown>> = {
  id: ID;
  source: ID;
  target: ID;
  data?: Record<string, unknown>;
  style?: EdgeStyle<Style>;
};

/**
 * Can be a node or combo.
 */
export type NodeLikeStyle<Style extends Record<string, unknown>> = Pick<
  BaseStyleProps,
  'cursor' | 'opacity' | 'pointerEvents' | 'visibility' | 'zIndex'
> & {
  parentId?: ID;
  collapsed?: boolean;
  type?: string;
  x?: number;
  y?: number;
  z?: number;
} & Style;
