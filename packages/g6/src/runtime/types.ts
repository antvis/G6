import type { G6Spec } from '../spec';
import type { Canvas } from './canvas';
import type { DataController } from './data';
import type { Graph } from './graph';

export interface RuntimeContext {
  /**
   * <zh/> 画布实例
   *
   * <en/> Canvas instance
   */
  canvas: Canvas;
  /**
   * <zh/> G6 实例
   *
   * <en/> G6 instance
   */
  graph: Graph;
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
}
