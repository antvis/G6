import type { AnimationOption } from '../../../types/animate';
import type { CallableObject } from '../../../types/callable';
import type { NodeDataOption, NodeLikeStyle } from '../../data';
import type { PaletteOption, StatesOption } from '../types';

/**
 * <zh/> Combo 配置项
 *
 * <en/> Combo spec
 */
export type ComboOption<
  Style extends Record<string, unknown> = Record<string, never>,
  States extends string | undefined = undefined,
  RegisterPalette extends string | unknown = unknown,
> = {
  /**
   * <zh/> Combo 样式
   *
   * <en/> Combo style
   */
  style?: ComboStyleOption<Style>;
  /**
   * <zh/> Combo 状态样式
   *
   * <en/> Combo state style
   */
  state?: StatesOption<Exclude<States, 'default'>, ComboStyleOption<Style>>;
  /**
   * <zh/> Combo 动画
   *
   * <en/> Combo animation
   */
  animate?: AnimationOption<States>;
  /**
   * <zh/> 色板
   *
   * <en/> Palette
   */
  palette?: PaletteOption<RegisterPalette>;
};

/**
 * <zh/> Combo 样式
 *
 * <en/> Combo style
 */
type ComboStyleOption<Style extends Record<string, unknown> = Record<string, never>> = CallableObject<
  NodeLikeStyle<Style>,
  NodeDataOption<Style>
>;
