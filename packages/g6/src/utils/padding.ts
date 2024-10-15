import type { Padding, STDPadding } from '../types/padding';

/**
 * <zh/> 解析 padding
 *
 * <en/> parse padding
 * @param padding - <zh/> padding | <en/> padding
 * @returns <zh/> 标准 padding | <en/> standard padding
 */
export function parsePadding(padding: Padding = 0): STDPadding {
  if (Array.isArray(padding)) {
    const [top = 0, right = top, bottom = top, left = right] = padding;
    return [top, right, bottom, left];
  }
  return [padding, padding, padding, padding];
}

/**
 * <zh/> 获取在垂直方向上的 padding
 *
 * <en/> get vertical padding
 * @param padding - <zh/> padding | <en/> padding
 * @returns <zh/> 垂直方向上的 padding | <en/> vertical padding
 */
export function getVerticalPadding(padding: Padding = 0): number {
  const parsedPadding = parsePadding(padding);
  return parsedPadding[0] + parsedPadding[2];
}

/**
 * <zh/> 获取在水平方向上的 padding
 *
 * <en/> get horizontal padding
 * @param padding - <zh/> padding | <en/> padding
 * @returns <zh/> 水平方向上的 padding | <en/> horizontal padding
 */
export function getHorizontalPadding(padding: Padding = 0): number {
  const parsedPadding = parsePadding(padding);
  return parsedPadding[1] + parsedPadding[3];
}
