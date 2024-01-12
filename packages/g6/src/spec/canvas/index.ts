import type { CanvasConfig, IRenderer } from '@antv/g';
import type { Layer } from '../../runtime/layered-canvas/types';

/**
 * <zh/> 画布配置项
 *
 * <en/> Canvas spec
 * @public
 */
export type CanvasOption = Pick<CanvasConfig, 'devicePixelRatio'> & {
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
  renderer?: (layer: Layer) => IRenderer;
  /**
   * <zh/> 是否自动调整画布大小
   *
   * <en/> whether to auto resize canvas
   */
  autoResize?: boolean;
};
