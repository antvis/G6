import type { Size } from '../types';
import { parseSize } from './size';

/**
 * <zh/> 计算 Combo 折叠后的原点
 *
 * <en/> Calculate the origin of the Combo after folding
 * @param collapsedOrigin - <zh/> 折叠原点 | <en/> folding origin
 * @param collapsedSize - <zh/> 折叠尺寸 | <en/> folding size
 * @param expandedSize - <zh/> 展开尺寸 | <en/> expanded size
 * @returns <zh/> 折叠后的原点 | <en/> origin after folding
 */
export function calculateCollapsedOrigin(
  collapsedOrigin: string,
  collapsedSize: Size,
  expandedSize: Size,
): [number, number] {
  const [expandedWidth, expandedHeight] = parseSize(expandedSize);
  const [collapsedWidth, collapsedHeight] = parseSize(collapsedSize);
  const map: Record<string, [number, number]> = {
    top: [0.5, collapsedHeight / 2 / expandedHeight],
    bottom: [0.5, 1 - collapsedHeight / 2 / expandedHeight],
    left: [collapsedWidth / 2 / expandedWidth, 0.5],
    right: [1 - collapsedWidth / 2 / expandedWidth, 0.5],
    center: [0.5, 0.5],
  };
  return map[collapsedOrigin] || map.center;
}
