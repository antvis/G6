import type { AnimationOption } from '../../../types/animate';
import type { CallableObject } from '../../../types/callable';
import type { EdgeStyle } from '../../../types/edge';
import type { EdgeDataOption } from '../../data';
import type { PaletteOption } from '../types';

/**
 * <zh/> 边配置项
 *
 * <en/> Edge spec
 */
export type EdgeOption = {
  /**
   * <zh/> 边样式
   *
   * <en/> Edge style
   */
  style?: EdgeStyleOption;
  /**
   * <zh/> 边状态样式
   *
   * <en/> Edge state style
   */
  state?: {
    [keys: string]: EdgeStyleOption;
  };
  /**
   * <zh/> 边动画
   *
   * <en/> Edge animation
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
 * <zh/> 边样式
 *
 * <en/> Edge style
 */
type EdgeStyleOption = CallableObject<EdgeStyle, EdgeDataOption>;
