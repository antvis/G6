import { ExtensionCategory } from '../constants';
import { getExtension } from '../registry';
import type { GraphOptions } from '../spec';

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
  return themeOptions ?? {};
}
