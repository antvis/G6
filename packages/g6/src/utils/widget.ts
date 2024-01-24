import { STDWidget, WidgetOptions } from 'spec/widget';

/**
 * <zh/> 格式化 widget 配置
 *
 * <en/> format widget option
 * @param widget - <zh/> widget 配置 | <en/> widget option
 * @returns <zh/> 格式化后的 widget 配置 | <en/> formatted widget option
 */
export function parseWidget(widget: WidgetOptions[number]): STDWidget {
  if (typeof widget === 'string') {
    return { type: widget };
  }
  return widget;
}
