type Primitive = null | undefined | string | number | boolean | symbol | bigint;
type Cloneable = Primitive | Date | RegExp | Blob | File | ArrayBuffer | ArrayBufferView;

/**
 *对象是不是Object类型
 * @param item 需要判断的数据
 * @returns boolean
 */
function isObject(item: never): boolean {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 *对象是否可以克隆
 * @param item 需要判断的数据
 * @returns boolean
 */
function isCloneable(item: any): item is Cloneable {
  return (
    item instanceof Date ||
    item instanceof RegExp ||
    item instanceof Blob ||
    item instanceof File ||
    ArrayBuffer.isView(item) ||
    item instanceof ArrayBuffer
  );
}

/**
 *
 * @param obj
 */
function deepClone<T>(obj: T): T {
  const hash = new WeakMap<object, any>();
  const queue: [any, any][] = [[obj, {}]];

  while (queue.length > 0) {
    const [original, copy] = queue.shift()!;

    if (isObject(original)) {
      if (hash.has(original)) {
        continue;
      }

      hash.set(original, copy);

      for (const key in original) {
        if (Object.prototype.hasOwnProperty.call(original, key)) {
          const value = original[key];
          if (isObject(value)) {
            const newCopy = Array.isArray(value) ? [] : {};
            copy[key] = newCopy;
            queue.push([value, newCopy]);
          } else if (isCloneable(value)) {
            copy[key] = value;
          } else {
            copy[key] = value;
          }
        }
      }
    } else if (isCloneable(obj)) {
      return obj;
    } else {
      return obj;
    }
  }

  return hash.get(obj);
}
export default deepClone;
