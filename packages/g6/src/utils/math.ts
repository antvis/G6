/**
 * <zh/> 判断值是否在区间内
 *
 * <en/> Judge whether the value is in the interval
 * @param value - <zh/> 值 | <en/> value
 * @param min - <zh/> 最小值 | <en/> minimum value
 * @param max - <zh/> 最大值 | <en/> maximum value
 * @returns <zh/> 是否在区间内 | <en/> whether in the interval
 */
export function isBetween(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}
