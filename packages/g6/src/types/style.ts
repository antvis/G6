import type { ElementData, ElementDatum } from './data';

/**
 * <zh/> 样式计算迭代上下文
 *
 * <en/> Style iteration context
 */
export type StyleIterationContext = {
  datum: ElementDatum;
  index: number;
  elementData: ElementData;
};
