import type { BaseStyleProps } from '@antv/g';
import type { CallableObject } from '../../types/callable';
import type { EdgeData } from '../data';
import type { AnimationOptions } from './animation';
import type { PaletteOptions } from './palette';

/**
 * <zh/> 边配置项
 *
 * <en/> Edge spec
 */
export type EdgeOptions = {
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
};

export type StaticEdgeOptions = {
  style?: EdgeStyle;
  state?: Record<string, EdgeStyle>;
  animation?: PaletteOptions;
  palette?: PaletteOptions;
};

/**
 * <zh/> 边样式
 *
 * <en/> Edge style
 */
export type EdgeStyle = Pick<BaseStyleProps, 'cursor' | 'opacity' | 'pointerEvents' | 'visibility' | 'zIndex'> & {
  states?: string[];
  type?: string;
} & Record<string, unknown>;
