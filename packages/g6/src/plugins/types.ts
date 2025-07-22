import type { Canvas as GCanvas, ICamera } from '@antv/g';
import type { BasePlugin } from './base-plugin';

export type Plugin = BasePlugin<any>;

/**
 * <zh/> 插件导出上下文
 *
 * <en/> Plugin export context
 */
export interface PluginExportContext {
  /** <zh/> 离屏画布 | <en/> Offscreen canvas */
  offscreenCanvas: GCanvas;
  /** <zh/> 导出模式 | <en/> Export mode */
  mode: 'viewport' | 'overall';
  /** <zh/> 设备像素比 | <en/> Device pixel ratio */
  devicePixelRatio: number;
  /** <zh/> 变换参数 | <en/> Transform parameters */
  transform: {
    startX: number;
    startY: number;
    camera: ICamera;
    offscreenCamera: ICamera;
  };
}

/**
 * <zh/> 支持导出的插件接口
 *
 * <en/> Plugin interface that supports export
 */
export interface ExportablePlugin {
  /**
   * <zh/> 将插件内容渲染到导出画布
   *
   * <en/> Render plugin content to export canvas
   * @param context - <zh/> 导出上下文 | <en/> Export context
   */
  renderToExportCanvas?(context: PluginExportContext): Promise<void>;
}
