import { BUILT_IN_PLUGINS } from './build-in';
import type { PluginCategory, PluginRegistry } from './types';

/**
 * <zh/> 插件注册表
 *
 * <en/> Plugin registry
 */
const PLUGIN_REGISTRY: PluginRegistry = {
  animation: {},
  behavior: {},
  combo: {},
  edge: {},
  layout: {},
  node: {},
  palette: {},
  theme: {},
  plugin: {},
};

/**
 * <zh/> 注册一个新的插件。
 *
 * <en/> Registers a new plugin.
 * @description
 * <zh/> 内置插件在项目导入时会自动注册。对于非内置插件，可以通过 `register` 方法手动注册。插件只需要注册一次，即可在项目的任何位置使用。
 * <en/> Built-in plugins are automatically registered when the project is imported. For non-built-in plugins, you can manually register them using the `register` method. Plugins only need to be registered once and can be used anywhere in the project.
 * @param category - <zh/> 插件要注册的分类，目前支持注册的插件分类有：{@link PluginCategory} | <en/> The category under which the plugin is to be registered, see {@link PluginCategory}
 * @param type - <zh/> 要注册的插件的类型，将作为使用插件时的标识 | <en/> Plugin type that used as an identifier when mounting the plugin on a graph
 * @param Ctor - <zh/> 要注册的插件类，在使用时创建实例 | <en/> The plugin class to be registered. An instance will be created upon use
 * @example
 * ```ts
 * import { register, Extensions } from '@antv/g6';
 *
 * register('node', 'circle-node', Extensions.CircleNode);
 * ```
 * @public
 */
export function register<T extends PluginCategory>(category: T, type: string, Ctor: PluginRegistry[T][string]) {
  if (PLUGIN_REGISTRY[category]![type]) {
    console.error(`The plugin ${type} of ${category} has been registered before.`);
    return;
  }
  Object.assign(PLUGIN_REGISTRY[category]!, { [type]: Ctor });
}

/**
 * <zh/> 根据类别和类型获取插件
 *
 * <en/> Get the plugin by category and type
 * @param category - <zh/> 插件类别 | <en/> Plugin category
 * @param type - <zh/> 插件类型 | <en/> Plugin type
 * @returns <zh/> 注册的插件 | <en/> Registered plugin
 * @internal
 */
export function getPlugin<T extends PluginCategory>(category: T, type: string): PluginRegistry[T][string] | undefined {
  const plugin = PLUGIN_REGISTRY[category]?.[type];

  if (plugin) {
    return plugin as PluginRegistry[T][string];
  }
  return undefined;
}

/**
 * <zh/> 根据类别获取插件
 *
 * <en/> Get the plugin by category and type
 * @param category - <zh/> 插件类别 | <en/> Plugin category
 * @returns <zh/> 注册的插件 | <en/> Registered plugin
 * @internal
 */
export function getPlugins<T extends PluginCategory>(category: T): PluginRegistry[T] {
  return PLUGIN_REGISTRY[category];
}

/**
 * <zh/> 注册内置插件
 *
 * <en/> Register built-in plugins
 */
export function registerBuiltInPlugins() {
  Object.entries(BUILT_IN_PLUGINS).forEach(([category, plugins]) => {
    Object.entries(plugins).forEach(([type, plugin]) => {
      register(category as PluginCategory, type, plugin as any);
    });
  });
}
