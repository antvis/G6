import { isFunction } from '@antv/util';
import {
  PluginCategory,
  PluginEntry,
  StdPluginCategory,
  getRegisterPlugin,
  getRegisterPlugins,
} from '../runtime/registry';

/**
 * Get one extension from a (std)lib.
 * @param config extension's config
 * @param cat category of the extension
 * @returns
 */
export const getExtension = (config: string | Function | object, cat: StdPluginCategory) => {
  // TODO: whether keep function type config?
  if (isFunction(config)) {
    return config;
  }
  const type = typeof config === 'string' ? config : (config as any).type;
  return getRegisterPlugin(cat, type)?.plugin;
};

/**
 * <zh/> 获取某个分类下的所有扩展
 *
 * <en/> Get all extensions of a category.
 * @param cat - <zh/> 扩展的分类 | <en/> The category of the extensions.
 * @returns - <zh/> 扩展的集合 | <en/> The extensions. Example: [Plugin, Plugin, ...]
 */
export const getCatExtensions = <T extends StdPluginCategory>(cat: T): PluginEntry<T>['plugin'][] => {
  const catKey: PluginCategory = `${cat}s`;
  return getRegisterPlugins()?.[catKey]?.map((item) => item.plugin) as PluginEntry<T>['plugin'][];
};
