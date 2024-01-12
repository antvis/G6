import type { AnimationOption } from '../../../types/animate';
import type { CallableObject } from '../../../types/callable';
import type { NodeDataOption, NodeLikeStyle } from '../../data';
import type { PaletteOption } from '../types';

/**
 * <zh/> 节点配置项
 *
 * <en/> Node spec
 */
export type NodeOption = {
  /**
   * <zh/> 节点样式
   *
   * <en/> Node style
   */
  style?: NodeStyleOption;
  /**
   * <zh/> 节点状态样式
   *
   * <en/> Node state style
   */
  state?: {
    [keys: string]: NodeStyleOption;
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
  palette?: PaletteOption;
};

/**
 * <zh/> 节点样式
 *
 * <en/> Node style
 */
type NodeStyleOption = CallableObject<NodeLikeStyle, NodeDataOption>;
