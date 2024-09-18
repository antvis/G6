/**
 * <zh/> 将一个值从一个范围线性映射到另一个范围
 *
 * <en/> Linearly maps a value from one range to another range
 * @param value - <zh/> 需要映射的值 | <en/> The value to be mapped
 * @param domain - <zh/> 输入值的范围 [最小值, 最大值] | <en/> The input range [min, max]
 * @param range - <zh/> 输出值的范围 [最小值, 最大值] | <en/> The output range [min, max]
 * @returns <zh/> 映射后的值 | <en/> The mapped value
 */
export const linear = (value: number, domain: [number, number], range: [number, number]) => {
  const [d0, d1] = domain;
  const [r0, r1] = range;

  if (d1 === d0) return r0;

  const ratio = (value - d0) / (d1 - d0);
  return r0 + ratio * (r1 - r0);
};

/**
 * <zh/> 将一个值从一个范围对数映射到另一个范围
 *
 * <en/> Logarithmically maps a value from one range to another range
 * @param value - <zh/> 需要映射的值 | <en/> The value to be mapped
 * @param domain - <zh/> 输入值的范围 [最小值, 最大值] | <en/> The input range [min, max]
 * @param range - <zh/> 输出值的范围 [最小值, 最大值] | <en/> The output range [min, max]
 * @returns <zh/> 映射后的值 | <en/> The mapped value
 */
export const log = (value: number, domain: [number, number], range: [number, number]) => {
  const [d0, d1] = domain;
  const [r0, r1] = range;

  const ratio = Math.log(value - d0 + 1) / Math.log(d1 - d0 + 1);
  return r0 + ratio * (r1 - r0);
};

/**
 * <zh/> 将一个值从一个范围幂映射到另一个范围
 *
 * <en/> Maps a value from one range to another range
 * @param value - <zh/> 需要映射的值 | <en/> The value to be mapped
 * @param domain - <zh/> 输入值的范围 [最小值, 最大值] | <en/> The input range [min, max]
 * @param range - <zh/> 输出值的范围 [最小值, 最大值] | <en/> The output range [min, max]
 * @param exponent - <zh/> 幂指数 | <en/> The exponent
 * @returns <zh/> 映射后的值 | <en/> The mapped value
 */
export const pow = (value: number, domain: [number, number], range: [number, number], exponent: number = 2): number => {
  const [d0, d1] = domain;
  const [r0, r1] = range;

  const ratio = Math.pow((value - d0) / (d1 - d0), exponent);
  return r0 + ratio * (r1 - r0);
};

/**
 * <zh/> 将一个值从一个范围平方根映射到另一个范围
 *
 * <en/> Maps a value from one range to another range using square root
 * @param value - <zh/> 需要映射的值 | <en/> The value to be mapped
 * @param domain - <zh/> 输入值的范围 [最小值, 最大值] | <en/> The input range [min, max]
 * @param range - <zh/> 输出值的范围 [最小值, 最大值] | <en/> The output range [min, max]
 * @returns <zh/> 映射后的值 | <en/> The mapped value
 */
export const sqrt = (value: number, domain: [number, number], range: [number, number]) => {
  const [d0, d1] = domain;
  const [r0, r1] = range;

  const ratio = Math.sqrt((value - d0) / (d1 - d0));
  return r0 + ratio * (r1 - r0);
};
