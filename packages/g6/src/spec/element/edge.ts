import type { AnimationOptions } from '../../animations/types';
import type { BaseEdgeStyleProps } from '../../elements/edges';
import type { Graph } from '../../runtime/graph';
import type { EdgeData } from '../data';
import type { AnimationStage } from './animation';
import type { PaletteOptions } from './palette';

/**
 * <zh/> 边配置项
 *
 * <en/> Edge spec
 */
export interface EdgeOptions {
  /**
   * <zh/> 边类型
   *
   * <en/> Edge type
   */
  type?: string | ((this: Graph, datum: EdgeData) => string);
  /**
   * <zh/> 边样式
   *
   * <en/> Edge style
   */
  style?:
    | EdgeStyle
    | ((this: Graph, data: EdgeData) => EdgeStyle)
    | {
        [K in keyof EdgeStyle]: EdgeStyle[K] | ((this: Graph, data: EdgeData) => EdgeStyle[K]);
      };
  /**
   * <zh/> 边状态样式
   *
   * <en/> Edge state style
   */
  state?: Record<
    string,
    | EdgeStyle
    | ((this: Graph, data: EdgeData) => EdgeStyle)
    | {
        [K in keyof EdgeStyle]: EdgeStyle[K] | ((this: Graph, data: EdgeData) => EdgeStyle[K]);
      }
  >;
  /**
   * <zh/> 边动画
   *
   * <en/> Edge animation
   */
  animation?: false | Record<AnimationStage, false | string | AnimationOptions[]>;
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
  animation?: false | Record<AnimationStage, false | string | AnimationOptions[]>;
  palette?: PaletteOptions;
}

export interface EdgeStyle extends Partial<BaseEdgeStyleProps> {
  [key: string]: unknown;
}
