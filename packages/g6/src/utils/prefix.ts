import { lowerFirst, upperFirst } from '@antv/util';
import type { ReplacePrefix } from '../types';

/**
 * <zh/> 是否以某个前缀开头
 *
 * <en/> Whether starts with prefix
 * @param str - <zh/> 字符串 | <en/> string
 * @param prefix - <zh/> 前缀 | <en/> prefix
 * @returns <zh/> 是否以某个前缀开头 | <en/> whether starts with prefix
 */
export function startsWith(str: string, prefix: string) {
  if (!str.startsWith(prefix)) return false;
  const nextChart = str[prefix.length];
  return nextChart >= 'A' && nextChart <= 'Z';
}

/**
 * <zh/> 添加前缀
 *
 * <en/> Add prefix
 * @param str - <zh/> 字符串 | <en/> string
 * @param prefix - <zh/> 前缀 | <en/> prefix
 * @returns <zh/> 添加前缀后的字符串 | <en/> string with prefix
 */
export function addPrefix(str: string, prefix: string): string {
  return `${prefix}${upperFirst(str)}`;
}

/**
 * <zh/> 移除前缀
 *
 * <en/> Remove prefix
 * @param string - <zh/> 字符串 | <en/> string
 * @param prefix - <zh/> 前缀 | <en/> prefix
 * @param lowercaseFirstLetter - <zh/> 是否小写首字母 | <en/> whether lowercase first letter
 * @returns <zh/> 移除前缀后的字符串 | <en/> string without prefix
 */
export function removePrefix(string: string, prefix?: string, lowercaseFirstLetter: boolean = true) {
  if (!prefix) return string;
  if (!startsWith(string, prefix)) return string;
  const str = string.slice(prefix.length);
  return lowercaseFirstLetter ? lowerFirst(str) : str;
}

/**
 * <zh/> 从样式中提取子样式
 *
 * <en/> Extract sub style from style
 * @param style - <zh/> 样式 | <en/> style
 * @param prefix - <zh/> 子样式前缀 | <en/> sub style prefix
 * @returns <zh/> 子样式 | <en/> sub style
 */
export function subStyleProps<T extends Record<string, any>>(style: object, prefix: string) {
  const subStyle = Object.entries(style).reduce((acc, [key, value]) => {
    if (key === 'className' || key === 'class') return acc;
    if (startsWith(key, prefix)) {
      Object.assign(acc, { [removePrefix(key, prefix)]: value });
    }
    return acc;
  }, {} as T);

  // 向下传递透明度，但避免覆盖子样式中的透明度属性
  // Pass down opacity, but avoid overwriting the opacity property in the sub-style
  if ('opacity' in style) {
    const subOpacityKey = addPrefix('opacity', prefix) as keyof typeof style;
    const opacity = style.opacity as number;

    if (subOpacityKey in style) {
      const subOpacity = style[subOpacityKey] as number;
      Object.assign(subStyle, { opacity: opacity * subOpacity });
    } else Object.assign(subStyle, { opacity });
  }

  return subStyle;
}

/**
 * <zh/> 从对象中提取指定前缀的属性，并移除前缀
 *
 * <en/> Extract properties with the specified prefix from the object and remove the prefix
 * @param obj - <zh/> 对象 | <en/> object
 * @param prefix - <zh/> 前缀 | <en/> prefix
 * @returns <zh/> 新对象 | <en/> new object
 */
export function subObject(obj: Record<string, any>, prefix: string): Record<string, any> {
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

/**
 * <zh/> 从样式中排除子样式
 *
 * <en/> Omit sub style from style
 * @param style - <zh/> 样式 | <en/> style
 * @param prefix - <zh/> 子样式前缀 | <en/> sub style prefix
 * @returns <zh/> 排除子样式后的样式 | <en/> style without sub style
 */
export function omitStyleProps<T extends Record<string, any>>(style: Record<string, any>, prefix: string | string[]) {
  const prefixArray = typeof prefix === 'string' ? [prefix] : prefix;
  const omitStyle: Record<string, any> = {};
  Object.keys(style).forEach((key) => {
    if (!prefixArray.find((p) => key.startsWith(p))) {
      omitStyle[key] = style[key];
    }
  });
  return omitStyle as T;
}

/**
 * <zh/> 替换前缀
 *
 * <en/> Replace prefix
 * @param style - <zh/> 样式 | <en/> style
 * @param oldPrefix - <zh/> 旧前缀 | <en/> old prefix
 * @param newPrefix - <zh/> 新前缀 | <en/> new prefix
 * @returns <zh/> 替换前缀后的样式 | <en/> style with replaced prefix
 */
export function replacePrefix<T extends object>(style: T, oldPrefix: string, newPrefix: string) {
  return Object.entries(style).reduce(
    (acc, [key, value]) => {
      if (startsWith(key, oldPrefix)) {
        acc[addPrefix(removePrefix(key, oldPrefix, false), newPrefix) as keyof typeof acc] = value;
      } else {
        acc[key as keyof typeof acc] = value;
      }
      return acc;
    },
    {} as ReplacePrefix<T, typeof oldPrefix, typeof newPrefix>,
  );
}
