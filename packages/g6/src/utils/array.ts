/**
 * Whether two array have same element.
 * @param arr1 array
 * @param arr2 array
 * @returns true/false
 */
export function isArrayOverlap(arr1, arr2): boolean {
  if (!arr1?.length || !arr2?.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) return true;
    }
  }
  return false;
}

/**
 * Get the set of a - b.
 * @param a array
 * @param b array
 * @returns The set of a - b
 */
export function diffSet<T>(a: T[], b: T[]): T[] {
  const keyFunc = (v) => (typeof v === 'string' ? v : JSON.stringify(v));

  const valueMap: { [key: string]: boolean } = {};
  b.forEach((value) => {
    valueMap[keyFunc(value)] = true;
  });
  return a.filter((value) => !valueMap[keyFunc(value)]);
}

/**
 * Get the set of a + b.
 * @param a array
 * @param b array
 * @returns The set of a + b
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
 * @param a array
 * @param b array
 * @returns The intersect set of a and b
 */
export function intersectSet<T>(a: T[], b: T[]): T[] {
  const aSet = new Set(a);
  const result = [];
  b.forEach((value) => {
    if (aSet.has(value)) result.push(value);
  });
  return result;
}

/**
 * Replace elements, mutable.
 * @param arr array
 * @param target target
 * @param replaceWith replaceWith
 * @returns replaced elements.
 */
export function replaceElements(arr, target, replaceWith) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      arr[i] = replaceWith;
    }
  }
  return arr;
}

/**
 * Uniq arry with key.
 * @param arr array
 * @param key the uniq key.
 * @returns uniq array.
 */
export function uniqBy<T>(arr: T[], key: keyof T): T[] {
  return Object.values(
    arr.reduce(
      (map, item) => ({
        ...map,
        [`${item[key]}`]: item,
      }),
      {},
    ),
  );
}
