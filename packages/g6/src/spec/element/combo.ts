import type { BaseComboStyleProps } from '../../elements/combos';
import type { ID, State } from '../../types';
import type { CallableObject } from '../../types/callable';
import type { ComboData } from '../data';
import type { AnimationOptions } from './animation';
import type { PaletteOptions } from './palette';

/**
 * <zh/> Combo 配置项
 *
 * <en/> Combo spec
 */
export interface ComboOptions {
  /**
   * <zh/> Combo 类型
   *
   * <en/> Combo type
   */
  type?: string | ((datum: ComboData) => string);
  /**
   * <zh/> Combo 样式
   *
   * <en/> Combo style
   */
  style?: CallableObject<ComboStyle, ComboData>;
  /**
   * <zh/> Combo 状态样式
   *
   * <en/> Combo state style
   */
  state?: Record<string, CallableObject<ComboStyle, ComboData>>;
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
}

export interface StaticComboOptions {
  style?: ComboStyle;
  state?: Record<string, ComboStyle>;
  animation?: AnimationOptions;
  palette?: PaletteOptions;
}

export interface ComboStyle extends Partial<BaseComboStyleProps> {
  /**
   * <zh/> 初始状态
   *
   * <en/> Initial state
   */
  states?: State[];
  children?: ID[];
  [key: string]: any;
}
