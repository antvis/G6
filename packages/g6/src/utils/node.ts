import type { IconStyleProps } from '../elements/shapes';
import type { Size } from '../types';
import { parseSize } from './size';

/**
 * <zh/> 如果没有手动指定图标大小，则根据主图形尺寸自动推断
 *
 * <en/> Infer the icon size according to key size if icon size is not manually specified
 * @param size - <zh/> 主图形尺寸 | <en/> Key size
 * @param iconStyle - <zh/> 图标样式 | <en/> Icon style
 * @returns <zh/> 图标样式 | <en/> Icon style
 */
export function inferIconStyle(size: Size, iconStyle: IconStyleProps): IconStyleProps {
  const stdSize = parseSize(size);
  let style = {};

  if (iconStyle.text && !iconStyle.fontSize) style = { fontSize: Math.min(...stdSize) * 0.5 };

  if (iconStyle.src && (!iconStyle.width || !iconStyle.height))
    style = { width: stdSize[0] * 0.5, height: stdSize[1] * 0.5 };

  return style;
}
