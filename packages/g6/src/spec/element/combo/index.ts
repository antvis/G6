import type { AnimationOption } from '../../../types/animate';
import type { CallableObject } from '../../../types/callable';
import type { ComboData, DataOptions, NodeLikeStyle } from '../../data';
import type { Palette } from '../types';

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
  style?: CallableComboStyle;
  /**
   * <zh/> Combo 状态样式
   *
   * <en/> Combo state style
   */
  state?: {
    [keys: string]: CallableComboStyle;
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
  palette?: Palette;
};

/**
 * <zh/> Combo 样式
 *
 * <en/> Combo style
 */
type CallableComboStyle = CallableObject<NodeLikeStyle, [ComboData, number, DataOptions]>;

export type StaticComboOptions = {
  style?: NodeLikeStyle;
  state?: {
    [keys: string]: NodeLikeStyle;
  };
  animate?: AnimationOption;
  palette?: Palette;
};
