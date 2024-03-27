/**
 * <zh/> 生成对象配置的缓存键
 *
 * <en/> Generate cache key of geometry configuration
 * @param props - <zh/> 对象配置 <en/> geometry configuration
 * @returns <zh/> 缓存键 <en/> cache key
 */
export function getCacheKey(props: Record<string, any>): symbol {
  const entries = Object.entries(props);

  if (entries.some(([, value]) => typeof value === 'object')) {
    return Symbol();
  }

  const str = entries
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, value]) => {
      return `${key}:${value}`;
    })
    .join(' ');

  return Symbol.for(str);
}
