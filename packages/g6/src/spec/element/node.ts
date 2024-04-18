import type { BaseNodeStyleProps } from '../../elements/nodes';
import type { ID, State } from '../../types';
import type { CallableObject } from '../../types/callable';
import type { NodeData } from '../data';
import type { AnimationOptions } from './animation';
import type { PaletteOptions } from './palette';

/**
 * <zh/> 节点配置项
 *
 * <en/> Node spec
 */
export interface NodeOptions {
  /**
   * <zh/> 节点类型
   *
   * <en/> Node type
   */
  type?: string | ((datum: NodeData) => string);
  /**
   * <zh/> 节点样式
   *
   * <en/> Node style
   */
  style?: CallableObject<NodeStyle, NodeData>;
  /**
   * <zh/> 节点状态样式
   *
   * <en/> Node state style
   */
  state?: Record<string, CallableObject<NodeStyle, NodeData>>;
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
}

export interface StaticNodeOptions {
  style?: NodeStyle;
  state?: Record<string, NodeStyle>;
  animation?: AnimationOptions;
  palette?: PaletteOptions;
}

export interface NodeStyle extends Partial<BaseNodeStyleProps> {
  /**
   * <zh/> 初始状态
   *
   * <en/> Initial state
   */
  states?: State[];
  /**
   * <zh/> 子节点 ID (树图专用)
   *
   * <en/> Child node ID (for tree graph)
   */
  children?: ID[];
  [key: string]: any;
}
