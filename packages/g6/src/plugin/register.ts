/**
 * @file Overview registry of built-in plugins and user-defined plugins.
 */
import type { BehaviorRegistry } from '../types/behavior';
import type { EdgeRegistry } from '../types/edge';
import type { LayoutRegistry } from '../types/layout';
import type { NodeRegistry } from '../types/node';
import type { PluginRegistry as WidgetRegistry } from '../types/plugin';
import type { ThemeRegistry, ThemeSolverRegistry } from '../types/theme';
import { warn } from '../utils/invariant';

/**
 * <zh/> 定义了各种插件注册表的类型集合。
 *
 * <en/> Defines a collection of categories for various plugin registries.
 */
type PluginRegistry = {
  node: NodeRegistry;
  edge: EdgeRegistry;
  combo: NodeRegistry;
  layout: LayoutRegistry;
  widget: WidgetRegistry;
  behavior: BehaviorRegistry;
  themeSolver: ThemeSolverRegistry;
  theme: ThemeRegistry;
  transform: any; //TODO: 待数据处理移除后删除
};

/**
 * <zh/> 定义所有插件分类的联合类型。
 *
 * <en/> Defines a union type of all plugin categories.
 */
type PluginCategory = keyof PluginRegistry;

/**
 * <zh/> 插件注册表，用于存储所有插件。
 */
const pluginRegistry: { [K in keyof PluginRegistry]?: Map<string, PluginRegistry[K][string]> } = {};

/**
 * <zh/> 注册一个新的插件。
 *
 * <en/> Registers a new plugin.
 * @remarks
 * <zh/> 内置插件在项目导入时会自动注册。对于非内置插件，可以通过 `register` 方法手动注册。插件只需要注册一次，即可在项目的任何位置使用。
 * <en/> Built-in plugins are automatically registered when the project is imported. For non-built-in plugins, you can manually register them using the `register` method. Plugins only need to be registered once and can be used anywhere in the project.
 * @param category - <zh/> 插件要注册的分类，目前支持注册的插件分类有：{@link PluginCategory} | <en/> The category under which the plugin is to be registered, see {@link PluginCategory}
 * @param type - <zh/> 要注册的插件的类型，将作为使用插件时的标识 | <en/> Plugin type that used as an identifier when mounting the plugin on a graph
 * @param pluginClass - <zh/> 要注册的插件类，在使用时创建实例 | <en/> The plugin class to be registered. An instance will be created upon use
 * @example
 * ```ts
 * import { register, Extensions } from '@antv/g6';
 *
 * register('node', 'circle-node', Extensions.CircleNode);
 * ```
 * @public
 */
function register<T extends PluginCategory>(category: T, type: string, pluginClass: PluginRegistry[T][string]): void {
  pluginRegistry[category] ||= new Map();

  if (pluginRegistry[category].get(type)) {
    warn(
      `The plugin of type '${type}' has been previously registered and has been automatically overwritten by the latest registration.`,
    );
  }

  pluginRegistry[category].set(type, pluginClass);
}

/**
 * <zh/> 根据类别和类型获取指定的插件类。
 *
 * <en/> Retrieves a specific plugin class based on category and type.
 * @param category - <zh/> 要检索插件的类别 | <en/> The category of the plugin to be retrieved
 * @param type - <zh/> 要检索插件的类型 | <en/> The type of the plugin to be retrieved
 * @returns <zh/> 返回插件的类，如果未找到则返回 `undefined` | <en/> Returns the plugin class, or `undefined` if not found.
 * @internal
 */
function getPlugin<T extends PluginCategory>(category: T, type: string): PluginRegistry[T][string] {
  return pluginRegistry[category]?.get(type);
}

/**
 * <zh/> 根据类别获取所有的插件类。
 *
 * <en/> Retrieves all plugin classes for a given category.
 * @param category - <zh/> 要检索的插件分类 | <en/> Plugin category to retrieve
 * @returns <zh/> 返回指定类别下所有插件类 | <en/> Returns all plugin classes for the specified category
 * @internal
 */
function getPlugins<T extends PluginCategory>(category: T) {
  return Object.fromEntries(pluginRegistry[category]) as PluginRegistry[T];
}

export { getPlugin, getPlugins, register };

export type { PluginCategory, PluginRegistry };
