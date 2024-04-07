/**
 *
 * @param object
 * @param predicate
 */
export function findKey<T extends string | number | symbol, U>(
  object: Record<T, U>,
  predicate: (value: U, key: T, obj: Record<T, U>) => boolean,
): T | undefined {
  if (object == null) {
    return undefined;
  }
  const keys = Object.keys(object) as T[];
  for (let i = 0, { length } = keys; i < length; i += 1) {
    const key = keys[i];
    const value = object[key];
    if (predicate(value, key, object)) {
      return key;
    }
  }
  return undefined;
}
