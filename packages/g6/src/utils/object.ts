/**
 * <zh/> 从对象中提取指定前缀的属性，并移除前缀
 *
 * <en/> Extract properties with the specified prefix from the object and remove the prefix
 * @param obj - <zh/> 对象 | <en/> object
 * @param prefix - <zh/> 前缀 | <en/> prefix
 * @returns <zh/> 新对象 | <en/> new object
 */
export function extractWithPrefix(obj: Record<string, any>, prefix: string): Record<string, any> {
  const prefixLength = prefix.length;

  return Object.keys(obj).reduce(
    (acc, key) => {
      if (key.startsWith(prefix)) {
        const newKey = key.slice(prefixLength);
        acc[newKey] = obj[key];
      }
      return acc;
    },
    {} as Record<string, any>,
  );
}
