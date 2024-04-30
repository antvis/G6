import type { IRenderer } from '@antv/g';
import type { Canvas } from '../runtime/canvas';

/**
 * <zh/> 画布配置项
 *
 * <en/> Canvas spec
 * @public
 */
export interface CanvasOptions {
  /**
   * <zh/> 画布容器
   *
   * <en/> canvas container
   */
  container?: string | HTMLElement | Canvas;
  /**
   * <zh/> 画布宽度
   *
   * <en/> canvas width
   */
  width?: number;
  /**
   * <zh/> 画布高度
   *
   * <en/> canvas height
   */
  height?: number;
  /**
   * <zh/> 获取渲染器
   *
   * <en/> get renderer
   */
  renderer?: (layer: 'background' | 'main' | 'label' | 'transient') => IRenderer;
  /**
   * <zh/> 是否自动调整画布大小
   *
   * <en/> whether to auto resize canvas
   * @defaultValue false
   */
  autoResize?: boolean;
  /**
   * <zh/> 画布背景色
   *
   * <en/> canvas background color
   */
  background?: string;
  /**
   * <zh/> 设备像素比
   *
   * <en/> device pixel ratio
   */
  devicePixelRatio?: number;
}
