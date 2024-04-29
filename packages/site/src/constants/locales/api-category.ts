import { getIntl } from './common';

const apiCategoryNames: Record<string, string[]> = {
  option: ['Option', '图配置项'],
  render: ['Render', '渲染'],
  data: ['Data', '数据'],
  instance: ['Instance', '图实例'],
  canvas: ['Canvas', '画布'],
  viewport: ['Viewport', '视口'],
  element: ['Element', '元素'], //包括元素配置项设置 API 和元素操纵 API
  animation: ['Animation', '动画'],
  layout: ['Layout', '布局'],
  behavior: ['Behavior', '交互'],
  event: ['Event', '事件'],
  theme: ['Theme', '主题'],
  transform: ['Transform', '数据转换'],
  plugin: ['plugin', '插件'],
  exportImage: ['Export Image', '导出图片'],
};

/**
 * 获取 API 分类名称
 * @param categoryKey 分类 key
 * @param locale 语言
 * @returns 分类名称
 */
export const getApiCategoryIntl = getIntl(apiCategoryNames);
