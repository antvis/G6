import type { AnimationOption } from '../../../types/animate';
import type { CallableObject } from '../../../types/callable';
import type { NodeData, NodeLikeStyle } from '../../data';
import type { Palette } from '../types';

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
  style?: CallableNodeStyle;
  /**
   * <zh/> 节点状态样式
   *
   * <en/> Node state style
   */
  state?: {
    [keys: string]: CallableNodeStyle;
  };
  /**
   * <zh/> 节点动画
   *
   * <en/> Node animation
   */
  animate?: AnimationOption;
  /**
   * <zh/> 色板
   *
   * <en/> Palette
   */
  palette?: Palette;
};

/**
 * <zh/> 节点样式
 *
 * <en/> Node style
 */
type CallableNodeStyle = CallableObject<NodeLikeStyle, NodeData>;

export type StaticNodeOptions = {
  style?: NodeLikeStyle;
  state?: {
    [keys: string]: NodeLikeStyle;
  };
  animate?: AnimationOption;
  palette?: Palette;
};
