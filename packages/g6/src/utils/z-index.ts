import { ElementDatum } from '../types';

/**
 * <zh/> 获取元素的 zIndex
 * <en/> Get the zIndex of the element
 * @param datum - <zh/> 元素数据 | <en/> element data
 * @returns - <zh/> zIndex | <en/> zIndex
 */
export function getZIndexOf(datum: ElementDatum): number {
  return datum?.style?.zIndex || 0;
}
