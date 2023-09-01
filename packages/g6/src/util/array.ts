/**
 * Whether two array have same element.
 * @param arr1
 * @param arr2
 * @returns
 */
export const isArrayOverlap = (arr1, arr2): boolean => {
  if (!arr1?.length || !arr2?.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) return true;
    }
  }
  return false;
};

/** Stringify arrays and compare the strings. */
export const isArraySame = (arr1 = [], arr2 = []): boolean => {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
};

/**
 * Get the set of a - b.
 * @param a
 * @param b
 */
export function diffSet<T>(a: T[] = [], b: T[] = []): T[] {
  const valueMap: any = {};
  b.forEach((value) => {
    if (typeof value === 'object') valueMap[JSON.stringify(value)] = true;
    valueMap[value] = true;
  });
  return a.filter((value) => !valueMap[value]);
}
/**
 * Get the set of a + b.
 * @param a
 * @param b
 */
export function unionSet<T>(a: T[], b: T[]): T[] {
  const resultSet = new Set(a);
  b.forEach((value) => {
    resultSet.add(value);
  });
  return Array.from(resultSet);
}
/**
 * Get the intersect set of a and b.
 * @param a
 * @param b
 */
export function intersectSet<T>(a: T[], b: T[]): T[] {
  const aSet = new Set(a);
  const result = [];
  b.forEach((value) => {
    if (aSet.has(value)) result.push(value);
  });
  return result;
}

export function replaceElements(arr, target, replaceWith) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      arr[i] = replaceWith;
    }
  }
  return arr;
}
