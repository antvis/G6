import type { AnimationOption } from '../../../types/animate';
import type { CallableObject } from '../../../types/callable';
import type { NodeDataOption, NodeLikeStyle } from '../../data';
import type { SpecGenerics as Spec } from '../../types';
import type { PaletteOption, StatesOption } from '../types';

/**
 * <zh/> 节点配置项
 *
 * <en/> Node spec
 */
export type NodeOption<
  N extends Spec['data']['node'],
  States extends string | undefined = undefined,
  RegisterPalette extends string | unknown = unknown,
> = {
  /**
   * <zh/> 节点样式
   *
   * <en/> Node style
   */
  style?: NodeStyleOption<N>;
  /**
   * <zh/> 节点状态样式
   *
   * <en/> Node state style
   */
  state?: StatesOption<Exclude<States, 'default'>, NodeStyleOption<N>>;
  /**
   * <zh/> 节点动画
   *
   * <en/> Node animation
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
 * <zh/> 节点样式
 *
 * <en/> Node style
 */
type NodeStyleOption<N extends Spec['data']['node']> = CallableObject<NodeLikeStyle<N['style']>, NodeDataOption<N>>;
