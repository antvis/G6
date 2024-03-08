import type { Anchor, STDAnchor } from '../types/anchor';
import { isBetween } from './math';

/**
 * <zh/> 解析原点（锚点）
 *
 * <en/> Parse the origin/anchor
 * @param anchor - <zh/> 原点 | <en/> Anchor
 * @returns <zh/> 标准原点 | <en/> Standard anchor
 */
export function parseAnchor(anchor: Anchor): STDAnchor {
  const parsedAnchor = (
    typeof anchor === 'string' ? anchor.split(' ').map((v) => parseFloat(v)) : anchor.slice(0, 2)
  ) as [number, number];
  if (!isBetween(parsedAnchor[0], 0, 1) || !isBetween(parsedAnchor[1], 0, 1)) {
    return [0.5, 0.5];
  }
  return parsedAnchor;
}
