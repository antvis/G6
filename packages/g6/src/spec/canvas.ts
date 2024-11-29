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
   * @remarks
   * <zh/> 如果未设置，则会自动获取容器宽度
   *
   * <en/> If not set, the container width will be automatically obtained
   */
  width?: number;
  /**
   * <zh/> 画布高度
   *
   * <en/> canvas height
   * @remarks
   * <zh/> 如果未设置，则会自动获取容器高度
   *
   * <en/> If not set, the container height will be automatically obtained
   */
  height?: number;
  /**
   * <zh/> 手动置顶渲染器
   *
   * <en/> manually set renderer
   * @remarks
   * <zh/> G6 采用了分层渲染的方式，分为 background、main、label、transient 四层，用户可以通过该配置项分别设置每层画布的渲染器
   *
   * <en/> G6 adopts a layered rendering method, divided into four layers: background, main, label, transient. Users can set the renderer of each layer canvas separately through this configuration item
   */
  renderer?: (layer: 'background' | 'main' | 'label' | 'transient') => IRenderer;
  /**
   * <zh/> 是否自动调整画布大小
   *
   * <en/> whether to auto resize canvas
   * @defaultValue false
   * @remarks
   * <zh/> 基于 window.onresize 事件自动调整画布大小
   *
   * <en/> Automatically adjust the canvas size based on the window.onresize event
   */
  autoResize?: boolean;
  /**
   * <zh/> 画布背景色
   *
   * <en/> canvas background color
   * @remarks
   * <zh/> 该颜色作为导出图片时的背景色
   *
   * <en/> This color is used as the background color when exporting images
   */
  background?: string;
  /**
   * <zh/> 设备像素比
   *
   * <en/> device pixel ratio
   * @remarks
   * <zh/> 用于高清屏的设备像素比，默认为 [window.devicePixelRatio](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/devicePixelRatio)
   *
   * <en/> Device pixel ratio for high-definition screens, default is [window.devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio)
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
