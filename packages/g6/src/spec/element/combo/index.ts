import type { AnimationOption } from '../../../types/animate';
import type { CallableObject } from '../../../types/callable';
import type { NodeDataOption, NodeLikeStyle } from '../../data';
import type { PaletteOption } from '../types';

/**
 * <zh/> Combo 配置项
 *
 * <en/> Combo spec
 */
export type ComboOption = {
  /**
   * <zh/> Combo 样式
   *
   * <en/> Combo style
   */
  style?: ComboStyleOption;
  /**
   * <zh/> Combo 状态样式
   *
   * <en/> Combo state style
   */
  state?: {
    [keys: string]: ComboStyleOption;
  };
  /**
   * <zh/> Combo 动画
   *
   * <en/> Combo animation
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
 * <zh/> Combo 样式
 *
 * <en/> Combo style
 */
type ComboStyleOption = CallableObject<NodeLikeStyle, NodeDataOption>;
