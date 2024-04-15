import type { ExtensionOptions, STDExtensionOption } from '../registry/extension/types';

/**
 * <zh/> 将模块配置项转换为标准模块格式
 *
 * <en/> Convert extension options to standard format
 * @param category - <zh/> 模块类型 <en/> extension type
 * @param extensions - <zh/> 模块配置项 <en/> extension options
 * @returns <zh/> 标准模块配置项 <en/> Standard extension options
 */
export function parseExtensions(category: string, extensions: ExtensionOptions): STDExtensionOption[] {
  const counter: Record<string, number> = {};

  const getKey = (type: string) => {
    if (!(type in counter)) counter[type] = 0;
    return `${category}-${type}-${counter[type]++}`;
  };

  return extensions.map((extension) => {
    if (typeof extension === 'string') {
      return { type: extension, key: getKey(extension) };
    }
    if (extension.key) return extension;
    return { ...extension, key: getKey(extension.type) };
  }) as STDExtensionOption[];
}
