import { isNumber } from '@antv/util';
import type { STDSize, Size } from '../types';

/**
 * <zh/> 解析尺寸配置 | <en/> Parse size configuration
 * @param size - <zh/> 尺寸配置 | <en/> size configuration
 * @returns <zh/> 标准尺寸格式 | <en/> standard size format
 */
export function parseSize(size: Size = 0): STDSize {
  if (isNumber(size)) return Array(3).fill(size) as STDSize;
  const [x, y = x, z = x] = size;
  return [x, y, z];
}
