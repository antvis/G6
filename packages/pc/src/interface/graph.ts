import { IGraph, IG6GraphEvent, IShapeBase, Item } from '@antv/g6-core';
import { Event as GraphEvent, ICanvas } from '@antv/g-base';

import { WaterMarkerConfig } from '../types';

import PluginBase from '../plugins/base';

export type DataUrlType = 'image/png' | 'image/jpeg' | 'image/webp' | 'image/bmp';

export interface ICustomGraph extends IGraph {
  /**
   * 返回图表的 dataUrl 用于生成图片
   */
  toDataURL(): string;

  /**
   * 画布导出图片
   * @param {String} name 图片的名称
   */
  downloadImage(name?: string, type?: DataUrlType, backgroundColor?: string): void;

  /**
   * 导出包含全图的图片
   * @param {String} name 图片的名称
   * @param {String} type 图片类型，可选值："image/png" | "image/jpeg" | "image/webp" | "image/bmp"
   * @param {Object} imageConfig 图片配置项，包括背景色和上下左右的 padding
   */
  downloadFullImage(
    name?: string,
    type?: DataUrlType,
    imageConfig?: { backgroundColor?: string; padding?: number | number[] },
  ): void;

  /**
   * 返回整个图（包括超出可见区域的部分）的 dataUrl，用于生成图片
   * @param {Function} callback 异步生成 dataUrl 完成后的回调函数，在这里处理生成的 dataUrl 字符串
   * @param {String} type 图片类型，可选值："image/png" | "image/jpeg" | "image/webp" | "image/bmp"
   * @param {Object} imageConfig 图片配置项，包括背景色和上下左右的 padding
   */
  toFullDataURL(
    callback: (res: string) => any,
    type?: DataUrlType,
    imageConfig?: { backgroundColor?: string; padding?: number | number[] },
  ): void;

  /**
   * 添加插件
   * @param {object} plugin 插件实例
   */
  addPlugin(plugin: PluginBase): void;

  /**
   * 添加插件
   * @param {object} plugin 插件实例
   */
  removePlugin(plugin: PluginBase): void;

  /**
   * 设置图片水印
   * @param {string} imgURL 图片水印的url地址
   * @param {WaterMarkerConfig} config 文本水印的配置项
   */
  setImageWaterMarker(imgURL: string, config: WaterMarkerConfig);

  /**
   * 设置文本水印
   * @param {string[]} texts 水印的文本内容
   * @param {WaterMarkerConfig} config 文本水印的配置项
   */
  setTextWaterMarker(texts: string[], config?: WaterMarkerConfig);
}

export class G6GraphEvent extends GraphEvent implements IG6GraphEvent {
  public item: Item;

  public canvasX: number;

  public canvasY: number;

  public clientX: number;

  public clientY: number;

  public wheelDelta: number;

  public detail: number;

  public target!: IShapeBase & ICanvas;

  constructor(type: string, event: IG6GraphEvent) {
    super(type, event);
    this.item = event.item;
    this.canvasX = event.canvasX;
    this.canvasY = event.canvasY;
    this.wheelDelta = event.wheelDelta;
    this.detail = event.detail;
  }
}
