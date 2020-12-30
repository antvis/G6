import { IAbstractGraph, Item, ShapeStyle, TreeGraphData } from '@antv/g6-core';
import { PluginBase } from '@antv/g6-plugin';

import { WaterMarkerConfig } from '../types';

export type DataUrlType = 'image/png' | 'image/jpeg' | 'image/webp' | 'image/bmp';

export interface IGraph extends IAbstractGraph {
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
  setImageWaterMarker(imgURL: string, config: WaterMarkerConfig): void;

  /**
   * 设置文本水印
   * @param {string[]} texts 水印的文本内容
   * @param {WaterMarkerConfig} config 文本水印的配置项
   */
  setTextWaterMarker(texts: string[], config?: WaterMarkerConfig): void;
}

export interface ITreeGraph extends IGraph {
  /**
   * 添加子树到对应 id 的节点
   * @param {TreeGraphData} data 子树数据模型
   * @param {string | Item} parent 子树的父节点id
   */
  addChild(data: TreeGraphData, parent: string | Item): void;

  /**
   * 更新源数据，差量更新子树
   * @param {TreeGraphData} data 子树数据模型
   * @param {string} parent 子树的父节点id
   */
  updateChild(data: TreeGraphData, parent?: string): void;

  /**
   * 删除子树
   * @param {string} id 子树根节点id
   */
  removeChild(id: string): void;

  /**
   * 根据id获取对应的源数据
   * @param {string} id 元素id
   * @param {TreeGraphData | undefined} parent 从哪个节点开始寻找，为空时从根节点开始查找
   * @return {TreeGraphData} 对应源数据
   */
  findDataById(id: string, parent?: TreeGraphData | undefined): TreeGraphData | null;

  /**
   * 布局动画接口，用于数据更新时做节点位置更新的动画
   * @param {TreeGraphData} data 更新的数据
   * @param {function} onFrame 定义节点位置更新时如何移动
   */
  layoutAnimate(
    data: TreeGraphData,
    onFrame?: (
      item: Item,
      ratio: number,
      originAttrs?: ShapeStyle,
      data?: TreeGraphData,
    ) => unknown,
  ): void;

  /**
   * 立即停止布局动画
   */
  stopLayoutAnimate(): void;

  /**
   * 是否在布局动画
   * @return {boolean} 是否有布局动画
   */
  isLayoutAnimating(): boolean;
}
