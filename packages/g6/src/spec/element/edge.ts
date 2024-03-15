import type { BaseEdgeStyleProps } from '../../elements/edges';
import type { CallableObject } from '../../types/callable';
import type { EdgeData } from '../data';
import type { AnimationOptions } from './animation';
import type { BaseElementStyle } from './base';
import type { PaletteOptions } from './palette';

/**
 * <zh/> 边配置项
 *
 * <en/> Edge spec
 */
export interface EdgeOptions {
  /**
   * <zh/> 边样式
   *
   * <en/> Edge style
   */
  style?: CallableObject<EdgeStyle, EdgeData>;
  /**
   * <zh/> 边状态样式
   *
   * <en/> Edge state style
   */
  state?: Record<string, CallableObject<EdgeStyle, EdgeData>>;
  /**
   * <zh/> 边动画
   *
   * <en/> Edge animation
   */
  animation?: AnimationOptions;
  /**
   * <zh/> 色板
   *
   * <en/> Palette
   */
  palette?: PaletteOptions;
}

export interface StaticEdgeOptions {
  style?: EdgeStyle;
  state?: Record<string, EdgeStyle>;
  animation?: AnimationOptions;
  palette?: PaletteOptions;
}

export interface EdgeStyle extends BaseElementStyle, Partial<BaseEdgeStyleProps> {
  [key: string]: any;
}
