/**
 * Creates an object composed of the properties that don't satisfy the predicate.
 * @param obj - The source object
 * @param predicate - The function invoked per property
 * @returns Returns the new object
 */
export function omitBy<T extends Record<string, any>>(
  obj: T,
  predicate: (value: any, key: string) => boolean,
): Partial<T> {
  const result: Partial<T> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (!predicate(value, key)) {
        result[key] = value;
      }
    }
  }

  return result;
}
