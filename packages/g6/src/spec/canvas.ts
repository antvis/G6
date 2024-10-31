import type { Cursor, IRenderer } from '@antv/g';
import type { Canvas, CanvasConfig } from '../runtime/canvas';

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
  /**
   * <zh/> 指针样式
   *
   * <en/> cursor style
   */
  cursor?: Cursor;
  /**
   * <zh/> 画布配置
   *
   * <en/> canvas config
   * @remarks
   * <zh/> GraphOptions 下相关配置项为快捷配置项，会被转换为 canvas 配置项
   *
   * <en/> The related configuration items under GraphOptions are shortcut configuration items, which will be converted to canvas configuration items
   */
  canvas?: CanvasConfig;
}
