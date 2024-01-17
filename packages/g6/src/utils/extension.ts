import { PluginEntry, STDPluginCategory, getRegisterPlugin, getRegisterPlugins } from '../plugin/register';

/**
 * <zh/> 获取指定类型的指定插件类
 *
 * <en/> Get a specific plugin class of a specific category.
 * @param config - <zh/> 插件配置 | <en/> Plugin configuration.
 * @param category - <zh/> 插件类型 | <en/> Plugin category.
 * @returns - <zh/> 插件类 | <en/> A plugin class.
 */
export const getExtension = <T extends STDPluginCategory>(
  config: string | object,
  category: T,
): PluginEntry<T>['plugin'] => {
  const type = typeof config === 'string' ? config : (config as any).type;
  return getRegisterPlugin(category, type)?.plugin;
};

/**
 * <zh/> 获取指定类型的插件类集合
 *
 * <en/> Get a collection of plugin classes of a specific category.
 * @param category -<zh/> 插件类型 | <en/> Plugin category to retrieve.
 * @returns - <zh/> 插件类集合 | <en/> A collection of plugin classes.
 */
export const getExtensionsByCategory = <T extends STDPluginCategory>(category: T): PluginEntry<T>['plugin'][] => {
  return getRegisterPlugins()?.[`${category}s`]?.map((item) => item.plugin);
};
