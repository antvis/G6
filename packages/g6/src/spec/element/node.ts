import type { AnimationOptions } from '../../animations/types';
import type { BaseNodeStyleProps } from '../../elements/nodes';
import type { Graph } from '../../runtime/graph';
import type { NodeData } from '../data';
import type { AnimationStage } from './animation';
import type { PaletteOptions } from './palette';

/**
 * <zh/> 节点配置项
 *
 * <en/> Node spec
 */
export interface NodeOptions {
  /**
   * <zh/> 节点类型
   *
   * <en/> Node type
   */
  type?: string | ((this: Graph, datum: NodeData) => string);
  /**
   * <zh/> 节点样式
   *
   * <en/> Node style
   */
  style?:
    | NodeStyle
    | ((this: Graph, data: NodeData) => NodeStyle)
    | {
        [K in keyof NodeStyle]: NodeStyle[K] | ((this: Graph, data: NodeData) => NodeStyle[K]);
      };
  /**
   * <zh/> 节点状态样式
   *
   * <en/> Node state style
   */
  state?: Record<
    string,
    | NodeStyle
    | ((this: Graph, data: NodeData) => NodeStyle)
    | {
        [K in keyof NodeStyle]: NodeStyle[K] | ((this: Graph, data: NodeData) => NodeStyle[K]);
      }
  >;
  /**
   * <zh/> 节点动画
   *
   * <en/> Node animation
   */
  animation?: false | Record<AnimationStage, false | string | AnimationOptions[]>;
  /**
   * <zh/> 色板
   *
   * <en/> Palette
   */
  palette?: PaletteOptions;
}

export interface StaticNodeOptions {
  style?: NodeStyle;
  state?: Record<string, NodeStyle>;
  animation?: false | Record<AnimationStage, false | string | AnimationOptions[]>;
  palette?: PaletteOptions;
}

export interface NodeStyle extends Partial<BaseNodeStyleProps> {
  [key: string]: unknown;
}
