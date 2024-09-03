import { isEqual } from '@antv/util';

/**
 * <zh/> 比较两个数组的差异
 *
 * <en/> compare the difference between two arrays
 * @param original - <zh/> 原始数组 | <en/> original array
 * @param modified - <zh/> 修改后的数组 | <en/> modified array
 * @param key - <zh/> 比较的 key | <en/> key to compare
 * @param comparator - <zh/> 比较函数 | <en/> compare function
 * @returns <zh/> 数组差异 | <en/> array diff
 */
export function arrayDiff<T>(
  original: T[],
  modified: T[],
  key: (d: T) => string | number,
  comparator: (a?: T, b?: T) => boolean = isEqual,
) {
  const originalMap = new Map(original.map((d) => [key(d), d]));
  const modifiedMap = new Map(modified.map((d) => [key(d), d]));

  const originalSet = new Set(originalMap.keys());
  const modifiedSet = new Set(modifiedMap.keys());

  const enter: T[] = [];
  const update: T[] = [];
  const exit: T[] = [];
  const keep: T[] = [];

  modifiedSet.forEach((key) => {
    if (originalSet.has(key)) {
      if (!comparator(originalMap.get(key), modifiedMap.get(key))) {
        update.push(modifiedMap.get(key)!);
      } else {
        keep.push(modifiedMap.get(key)!);
      }
    } else {
      enter.push(modifiedMap.get(key)!);
    }
  });

  originalSet.forEach((key) => {
    if (!modifiedSet.has(key)) {
      exit.push(originalMap.get(key)!);
    }
  });

  return { enter, exit, keep, update };
}
