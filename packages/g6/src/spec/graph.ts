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
import type { TransformOptions } from './transform';
import type { ViewportOptions } from './viewport';

/**
 * <zh/> Graph 配置项
 *
 * <en/> Graph options
 * @remarks
 * <zh/> Graph 的初始化通过 `new` 进行实例化，实例化时需要传入参数对象。目前所支持的参数如下：
 *
 * <en/> The initialization of Graph is instantiated through `new`, and the parameter object needs to be passed in when instantiated. The currently supported parameters are as follows:
 *
 * ```
 * new G6.Graph(options: GraphOptions) => Graph
 * ```
 */

export interface GraphOptions extends CanvasOptions, ViewportOptions {
  /**
   * <zh/> 启用或关闭全局动画
   *
   * <en/> Enable or disable global animation
   * @remarks
   * <zh/> 为动画配置项时，会启用动画，并将该动画配置作为全局动画的基础配置
   *
   * <en/> When it is an animation options, the animation will be enabled, and the animation configuration will be used as the basic configuration of the global animation
   */
  animation?: boolean | AnimationEffectTiming;
  /**
   * <zh/> 数据
   *
   * <en/> Data
   * @remarks
   * <zh/> 详见 [Data](/api/data/graph-data)
   *
   * <en/> See [Data](/en/api/data/graph-data)
   */
  data?: GraphData;
  /**
   * <zh/> 布局配置项
   *
   * <en/> Layout options
   * @remarks
   * <zh/> 详见 [Layout](/api/layouts/antv-dagre-layout)
   *
   * <en/> See [Layout](/en/api/layouts/antv-dagre-layout)
   */
  layout?: LayoutOptions;
  /**
   * <zh/> 节点配置项
   *
   * <en/> Node options
   * @remarks
   * <zh/> 详见 [Node](/api/elements/nodes/base-node)
   *
   * <en/> See [Node](/en/api/elements/nodes/base-node)
   */
  node?: NodeOptions;
  /**
   * <zh/> 边配置项
   *
   * <en/> Edge options
   * @remarks
   * <zh/> 详见 [Edge](/api/elements/edges/base-edge)
   *
   * <en/> See [Edge](/en/api/elements/edges/base-edge)
   */
  edge?: EdgeOptions;
  /**
   * <zh/> 组合配置项
   *
   * <en/> Combo options
   * @remarks
   * <zh/> 详见 [Combo](/api/elements/combos/base-combo)
   *
   * <en/> See [Combo](/en/api/elements/combos/base-combo)
   */
  combo?: ComboOptions;
  /**
   * <zh/> 主题
   *
   * <en/> Theme
   */
  theme?: ThemeOptions;
  /**
   * <zh/> 启用交互
   *
   * <en/> Enable interactions
   * @remarks
   * <zh/>
   * - 概念：[核心概念 - 交互](/manual/core-concept/behavior)
   *
   * - 内置交互: [交互](/api/behaviors/auto-adapt-label)
   *
   * - 自定义交互: [自定义扩展 - 自定义交互](/manual/advanced/custom-behavior)
   *
   * <en/>
   * - Concept: [Concepts - Behavior](/en/manual/core-concept/behavior)
   *
   * - Built-in behaviors: [Behavior](/en/api/behaviors/auto-adapt-label)
   *
   * - Custom behaviors: [Custom Extension - Custom Behavior](/en/manual/advanced/custom-behavior)
   */
  behaviors?: BehaviorOptions;
  /**
   * <zh/> 启用插件
   *
   * <en/> Enable plugins
   * @remarks
   * <zh/>
   * - 概念：[核心概念 - 插件](/manual/core-concept/plugin)
   *
   * - 内置插件: [插件](/en/api/plugins/background)
   *
   * - 自定义插件: [自定义扩展 - 自定义插件](/manual/advanced/custom-plugin)
   *
   * <en/>
   * - Concept: [Concepts - Plugin](/en/manual/core-concept/plugin)
   *
   * - Built-in plugins: [Plugin](/en/api/plugins/background)
   *
   * - Custom plugins: [Custom Extension - Custom Plugin](/en/manual/advanced/custom-plugin)
   */
  plugins?: PluginOptions;
  /**
   * <zh/> 数据转换器
   *
   * <en/> Data transforms
   */
  transforms?: TransformOptions;
}
