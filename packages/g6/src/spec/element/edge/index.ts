import type { BaseStyleProps } from '@antv/g';
import type { AnimationOption } from '../../../types/animate';
import type { CallableObject } from '../../../types/callable';
import type { EdgeData } from '../../data';
import type { Palette } from '../types';

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
  style?: CallableEdgeStyle;
  /**
   * <zh/> 边状态样式
   *
   * <en/> Edge state style
   */
  state?: {
    [keys: string]: CallableEdgeStyle;
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

/**
 * <zh/> 边样式
 *
 * <en/> Edge style
 */
type CallableEdgeStyle = CallableObject<EdgeStyle, EdgeData>;

export type EdgeStyle = Pick<BaseStyleProps, 'cursor' | 'opacity' | 'pointerEvents' | 'visibility' | 'zIndex'> & {
  type?: string;
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
  [keys: string]: any;
};
