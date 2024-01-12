import type { AnimationOption } from '../../../types/animate';
import type { CallableObject } from '../../../types/callable';
import type { EdgeStyle } from '../../../types/edge';
import type { EdgeDataOption } from '../../data';
import type { SpecGenerics as Spec } from '../../types';
import type { PaletteOption, StatesOption } from '../types';

/**
 * <zh/> 边配置项
 *
 * <en/> Edge spec
 */
export type EdgeOption<
  E extends Spec['data']['edge'],
  States extends string | undefined = undefined,
  Palette extends string | unknown = unknown,
> = {
  /**
   * <zh/> 边样式
   *
   * <en/> Edge style
   */
  style?: EdgeStyleOption<E>;
  /**
   * <zh/> 边状态样式
   *
   * <en/> Edge state style
   */
  state?: StatesOption<Exclude<States, 'default'>, EdgeStyleOption<E>>;
  /**
   * <zh/> 边动画
   *
   * <en/> Edge animation
   */
  animate?: AnimationOption<States>;
  /**
   * <zh/> 色板
   *
   * <en/> Palette
   */
  palette?: PaletteOption<Palette>;
};

/**
 * <zh/> 边样式
 *
 * <en/> Edge style
 */
type EdgeStyleOption<E extends Spec['data']['edge']> = CallableObject<EdgeStyle<E['style']>, EdgeDataOption<E>>;
