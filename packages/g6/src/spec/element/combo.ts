import type { CallableObject } from '../../types/callable';
import type { NodeData } from '../data';
import type { AnimationOptions } from './animation';
import type { NodeLikeStyle } from './node';
import type { PaletteOptions } from './palette';

/**
 * <zh/> Combo 配置项
 *
 * <en/> Combo spec
 */
export type ComboOptions = {
  /**
   * <zh/> Combo 样式
   *
   * <en/> Combo style
   */
  style?: CallableObject<NodeLikeStyle, NodeData>;
  /**
   * <zh/> Combo 状态样式
   *
   * <en/> Combo state style
   */
  state?: Record<string, CallableObject<NodeLikeStyle, NodeData>>;
  /**
   * <zh/> Combo 动画
   *
   * <en/> Combo animation
   */
  animation?: AnimationOptions;
  /**
   * <zh/> 色板
   *
   * <en/> Palette
   */
  palette?: PaletteOptions;
};

export type StaticComboOptions = {
  style?: NodeLikeStyle;
  state?: Record<string, NodeLikeStyle>;
  animation?: AnimationOptions;
  palette?: PaletteOptions;
};
