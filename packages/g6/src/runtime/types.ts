import type { G6Spec } from '../spec';
import type { BatchController } from './batch';
import type { BehaviorController } from './behavior';
import type { Canvas } from './canvas';
import type { DataController } from './data';
import type { ElementController } from './element';
import type { Graph } from './graph';
import type { LayoutController } from './layout';
import type { PluginController } from './plugin';
import type { TransformController } from './transform';
import type { ViewportController } from './viewport';

export interface RuntimeContext {
  /**
   * <zh/> 图实例
   *
   * <en/> Graph instance
   */
  graph: Graph;
  /**
   * <zh/> 画布实例
   *
   * <en/> Canvas instance
   */
  canvas: Canvas;
  /**
   * <zh/> G6 配置项
   *
   * <en/> G6 options
   */
  options: G6Spec;
  /**
   * <zh/> 数据模型
   *
   * <en/> Data model
   */
  model: DataController;
  /**
   * <zh/> 数据转换控制器
   *
   * <en/> Data transform controller
   */
  transform: TransformController;
  /**
   * <zh/> 元素控制器
   *
   * <en/> Element controller
   * @description
   * <zh/> 仅在绘制开始后才可用
   *
   * <en/> Only available after drawing starts
   */
  element?: ElementController;
  /**
   * <zh/> 视口控制器
   *
   * <en/> Viewport controller
   */
  viewport?: ViewportController;
  /**
   * <zh/> 布局控制器
   *
   * <en/> Layout controller
   */
  layout?: LayoutController;
  /**
   * <zh/> 行为控制器
   *
   * <en/> Behavior controller
   */
  behavior?: BehaviorController;
  /**
   * <zh/> 插件控制器
   *
   * <en/> Plugin controller
   */
  plugin?: PluginController;
  /**
   * <zh/> 批量操作控制器
   *
   * <en/> Batch operation controller
   */
  batch?: BatchController;
}
