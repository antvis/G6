import type { BaseStyleProps } from '@antv/g';
import type { AnimationOption } from '../../../types/animate';
import type { CallableObject } from '../../../types/callable';
import type { DataOptions, EdgeData } from '../../data';
import type { Palette } from '../types';

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
  style?: CallableObject<EdgeStyle & PortOptions, [EdgeData, number, DataOptions]>;
  /**
   * <zh/> 边状态样式
   *
   * <en/> Edge state style
   */
  state?: {
    [keys: string]: CallableObject<EdgeStyle, [EdgeData, number, DataOptions]>;
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
  palette?: Palette;
};

export type StaticEdgeOptions = {
  style?: EdgeStyle & PortOptions;
  state?: {
    [keys: string]: EdgeStyle;
  };
  animate?: AnimationOption;
  palette?: Palette;
};

export type EdgeStyle = Pick<BaseStyleProps, 'cursor' | 'opacity' | 'pointerEvents' | 'visibility' | 'zIndex'> & {
  type?: string;
  states?: string[];
  [keys: string]: any;
};

export type PortOptions = {
  /**
   * <zh/> 起点连接桩 id
   *
   * <en/> source port id
   */
  sourcePort?: string;
  /**
   * <zh/> 终点连接桩 id
   *
   * <en/> target port id
   */
  targetPort?: string;
};
