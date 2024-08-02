import { ExtensionCategory } from '../constants';
import { getExtension } from '../registry/get';
import type { GraphOptions } from '../spec';
import { print } from './print';

/**
 * <zh/> 获取主题配置
 *
 * <en/> Get theme options
 * @param options - <zh/> 图配置项 <en/> graph options
 * @returns <zh/> 主题配置 <en/> theme options
 */
export function themeOf(options: GraphOptions) {
  const { theme } = options;
  if (!theme) return {};

  const themeOptions = getExtension(ExtensionCategory.THEME, theme);

  if (themeOptions) return themeOptions;

  print.warn(`The theme of ${theme} is not registered.`);
  return {};
}
