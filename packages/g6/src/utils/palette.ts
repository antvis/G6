import { getPlugin } from '../plugin/register';
import type { PaletteColor } from '../types/palette';

/**
 * <zh/> 解析色板配置项
 *
 * <en/> Parse palette options
 * @param palette - <zh/> 色板配置项 | <en/> Palette options
 * @returns <zh/> 解析后的色板配置项 | <en/> Parsed palette options
 */
export function parsePalette(palette: PaletteColor) {
  if (typeof palette === 'string') {
    const plugin = getPlugin('palette', palette);
    return plugin;
  }
  return palette;
}
