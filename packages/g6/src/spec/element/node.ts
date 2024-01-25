import type { BaseStyleProps } from '@antv/g';
import type { CallableObject } from '../../types/callable';
import type { NodeData } from '../data';
import type { AnimationOptions } from './animation';
import type { PaletteOptions } from './palette';

/**
 * <zh/> 节点配置项
 *
 * <en/> Node spec
 */
export type NodeOptions = {
  /**
   * <zh/> 节点样式
   *
   * <en/> Node style
   */
  style?: CallableObject<NodeLikeStyle, NodeData>;
  /**
   * <zh/> 节点状态样式
   *
   * <en/> Node state style
   */
  state?: Record<string, CallableObject<NodeLikeStyle, NodeData>>;
  /**
   * <zh/> 节点动画
   *
   * <en/> Node animation
   */
  animation?: AnimationOptions;
  /**
   * <zh/> 色板
   *
   * <en/> Palette
   */
  palette?: PaletteOptions;
};

export type StaticNodeOptions = {
  style?: NodeLikeStyle;
  state?: Record<string, NodeLikeStyle>;
  animation?: AnimationOptions;
  palette?: PaletteOptions;
};

/**
 * <zh/> 节点或 combo 样式
 *
 * <en/> Node or combo style
 */
export type NodeLikeStyle = Pick<BaseStyleProps, 'cursor' | 'opacity' | 'pointerEvents' | 'visibility' | 'zIndex'> & {
  type?: string;
  x?: number;
  y?: number;
  z?: number;
} & Record<string, unknown>;
