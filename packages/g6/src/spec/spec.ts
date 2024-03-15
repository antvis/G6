import type { AnimationEffectTiming } from '../animations/types';
import type { BehaviorOptions } from './behavior';
import type { CanvasOptions } from './canvas';
import type { GraphData } from './data';
import type { ComboOptions } from './element/combo';
import type { EdgeOptions } from './element/edge';
import type { NodeOptions } from './element/node';
import type { LayoutOptions } from './layout';
import type { PluginOptions } from './plugin';
import type { ThemeOptions } from './theme';
import type { ViewportOptions } from './viewport';

/**
 * <zh/> Spec 定义
 *
 * <en/> Specification definition
 */

export interface G6Spec extends CanvasOptions, ViewportOptions {
  /**
   * <zh/> 启用关闭、全局动画
   *
   * <en/> Enable or disable global animation
   * @description
   * <zh/> 为动画配置项时，会启用动画，并将该动画配置作为全局动画的基础配置
   *
   * <en/> When it is an animation configuration item, the animation will be enabled, and the animation configuration will be used as the basic configuration of the global animation
   */
  animation?: boolean | AnimationEffectTiming;
  /**
   * <zh/> 数据
   *
   * <en/> Data
   */
  data?: GraphData;
  /**
   * <zh/> 布局
   *
   * <en/> Layout
   */
  layout?: LayoutOptions;
  /**
   * <zh/> 节点
   *
   * <en/> Node
   */
  node?: NodeOptions;
  /**
   * <zh/> 边
   *
   * <en/> Edge
   */
  edge?: EdgeOptions;
  /**
   * <zh/> Combo
   *
   * <en/> Combo
   */
  combo?: ComboOptions;
  /**
   * <zh/> 主题
   *
   * <en/> Theme
   */
  theme?: ThemeOptions;
  /**
   * <zh/> 交互
   *
   * <en/> Behaviors
   */
  behaviors?: BehaviorOptions;
  /**
   * <zh/> 画布插件
   *
   * <en/> Canvas plugins
   */
  plugins?: PluginOptions;
}
