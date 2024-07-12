import type { ElementDatum } from '../types';

/**
 * <zh/> 获取元素的状态
 *
 * <en/> Get the state of the element
 * @param datum - <zh/> 元素数据 <en/> Element data
 * @returns <zh/> 状态列表 <en/> State list
 */
export function statesOf(datum: ElementDatum) {
  return datum.states || [];
}
