/**
 * <zh/> 数组去重
 *
 * <en/> deduplicate array
 * @param arr - <zh/> 数组 | <en/> array
 * @param by - <zh/> 通过某个属性去重 | <en/> deduplicate by some property
 * @returns <zh/> 去重后的数组 | <en/> deduplicated array
 */
export function deduplicate<T>(arr: T[], by: (item: T) => unknown = (item) => item) {
  const set = new Set();
  return arr.filter((item) => {
    const key = by ? by(item) : item;
    return set.has(key) ? false : set.add(key);
  }) as T[];
}

/**
 * <zh/> 比较两个数组是否包含相同元素，不考虑元素顺序
 *
 * <en/> Compare whether two arrays contain the same elements, regardless of the order
 * @example
 *  ```ts
 * isEqualIgnoreOrder([1, 2, 3], [3, 2, 1]); // true
 * ```
 * @param arr - <zh/> 要比较的数组 | <en/> The array to compare
 * @param other - <zh/> 另一个要比较的数组 | <en/> The other array to compare
 * @returns <zh/> 是否相等 | <en/> Whether is equal without considering the order
 */
export function isEqualIgnoreOrder<T>(arr: T[], other: T[]): boolean {
  if (arr.length !== other.length) return false;
  return arr.sort().toString() === other.sort().toString();
}
