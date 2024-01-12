import type { BaseStyleProps } from '@antv/g';
import type { ID } from '@antv/graphlib';
import type { EdgeStyle } from '../../types/edge';
import type { UnknownObject } from '../../types/types';
import type { SpecGenerics as Spec } from '../types';

export type DataOption<DataGeneric extends Spec['data']> = {
  /**
   * <zh/> 节点数据
   *
   * <en/> node data
   */
  nodes?: NodeDataOption<DataGeneric['node']>[];
  /**
   * <zh/> 边数据
   *
   * <en/> edge data
   */
  edges?: EdgeDataOption<DataGeneric['edge']>[];
  /**
   * <zh/> Combo 数据
   *
   * <en/> combo data
   */
  combos?: ComboDataOption<DataGeneric['combo']>[];
};

export type NodeDataOption<T extends Spec['data']['node']> = {
  id: ID;
  data?: T['data'];
  style?: NodeLikeStyle<T['style']>;
};

export type ComboDataOption<T extends Spec['data']['combo']> = {
  id: ID;
  data?: T['data'];
  style?: NodeLikeStyle<T['style']>;
};

export type EdgeDataOption<T extends Spec['data']['edge']> = {
  id: ID;
  source: ID;
  target: ID;
  data?: T['data'];
  style?: EdgeStyle<T['style']>;
};

/**
 * Can be a node or combo.
 */
export type NodeLikeStyle<Style extends UnknownObject> = Pick<
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
