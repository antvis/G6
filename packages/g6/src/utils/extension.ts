import type { STDExtensionOption } from '../registry/extension/types';
import type { Graph } from '../runtime/graph';
import type { TransformOptions } from '../spec/transform';

/**
 * <zh/> 将模块配置项转换为标准模块格式
 *
 * <en/> Convert extension options to standard format
 * @param graph - <zh/> 图实例 <en/> graph instance
 * @param category - <zh/> 模块类型 <en/> extension type
 * @param extensions - <zh/> 模块配置项 <en/> extension options
 * @returns <zh/> 标准模块配置项 <en/> Standard extension options
 */
export function parseExtensions(graph: Graph, category: string, extensions: TransformOptions): STDExtensionOption[] {
  const counter: Record<string, number> = {};

  const getKey = (type: string) => {
    if (!(type in counter)) counter[type] = 0;
    return `${category}-${type}-${counter[type]++}`;
  };

  return extensions.map((extension) => {
    if (typeof extension === 'string') {
      return { type: extension, key: getKey(extension) };
    }
    if (typeof extension === 'function') {
      return extension.call(graph);
    }

    if (extension.key) return extension;
    return { ...extension, key: getKey(extension.type!) };
  }) as STDExtensionOption[];
}
