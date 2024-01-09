/**
 * @file G6 registry for plugins.
 */
import { stdPlugins } from '../plugin';
import { BehaviorRegistry } from '../types/behavior';
import { EdgeRegistry } from '../types/edge';
import { LayoutRegistry } from '../types/layout';
import { NodeRegistry } from '../types/node';
import { PluginRegistry } from '../types/plugin';
import { ThemeRegistry, ThemeSolverRegistry } from '../types/theme';

type Singular<T> = {
  [K in keyof T as K extends `${infer R}s` ? R : never]?: T[K] extends Record<string, infer U> ? U : never;
};

type Plugins = {
  nodes: NodeRegistry;
  edges: EdgeRegistry;
  combos: NodeRegistry;
  layouts: LayoutRegistry;
  widgets: PluginRegistry;
  behaviors: BehaviorRegistry;
  themeSolvers: ThemeSolverRegistry;
  themes: ThemeRegistry;
  transforms: any; //TODO: 待数据处理移除后删除
};

type StdPlugins = Singular<Plugins>;
export type StdPluginCategory = keyof StdPlugins;
export type PluginCategory = keyof Plugins;

export type PluginEntry<T extends StdPluginCategory> = {
  name: string;
  plugin: StdPlugins[T];
};

type TransformedPlugins = {
  [category: string]: PluginEntry<StdPluginCategory>[];
};

/**
 * <zh/> 插件注册表 | <en/> Plugin registry.
 */
const plugins: Partial<Plugins> = {};
let isStdPluginsRegistered = false;

export const registerStdPlugins = () => {
  if (isStdPluginsRegistered) return;
  Object.keys(stdPlugins).forEach((cat) => {
    Object.keys(stdPlugins[cat]).forEach((key) => {
      register(cat.slice(0, -1) as StdPluginCategory, key, stdPlugins[cat][key]);
    });
  });
  isStdPluginsRegistered = true;
};

/**
 * <zh/> 注册插件
 *
 * <en/> Register a plugin.
 * @param type <zh/> 插件类型 | <en/> The type of the plugin.
 * @param key <zh/> 插件的唯一标识 | <en/> The unique identifier of the plugin.
 * @param pluginClass <zh/> 插件类 | <en/> The plugin class.
 * @public
 */
function register<T extends StdPluginCategory>(type: T, key: string, pluginClass: StdPlugins[T]): void {
  const pluralType: PluginCategory = `${type}s`;
  const typePlugins = plugins[pluralType] || {};
  if (typePlugins[key]) {
    console.warn(`Plugin with key '${key}' is already registered for type '${pluralType}'.`);
  } else {
    // @ts-expect-error TODO: Need to fix the type
    pluginClass.type = key;
    typePlugins[key] = pluginClass;
  }
  plugins[pluralType] = typePlugins;
}

/**
 * <zh/> 获取已注册的插件集合
 *
 * <en/> Get registered plugins.
 * @returns - <zh/> 已注册的插件 | <en/> The registered plugins.
 * @public
 */
function getRegisterPlugins(): TransformedPlugins {
  const transformedPlugins: TransformedPlugins = {};
  Object.keys(plugins).forEach((cat) => {
    transformedPlugins[cat] = Object.keys(plugins[cat]).map((key) => ({
      name: key,
      plugin: plugins[cat][key],
    }));
  });
  return transformedPlugins;
}

/**
 * <zh/> 获取指定插件
 *
 * <en/> Get a specific plugin.
 * @param type - <zh/> 插件类型 | <en/> The type of the plugin to retrieve.
 * @param key - <zh/> 插件的唯一标识 | <en/> The key of the specific plugin to retrieve.
 * @returns - <zh/> 已注册的插件 | <en/> The registered plugin.
 * @public
 */
function getRegisterPlugin<T extends StdPluginCategory>(type: T, key: string): PluginEntry<T> {
  const pluralType: PluginCategory = `${type}s`;
  return {
    name: key,
    plugin: plugins[pluralType]?.[key] as StdPlugins[T],
  };
}

/**
 * <zh/> 注销插件
 *
 * <en/> Unregister a plugin.
 * @param type - <zh/> 插件类型 | <en/> The type of the plugin to unregister.
 * @param key - <zh/> 插件的唯一标识 | <en/> The key of the plugin to unregister.
 * @public
 */
function unregister<T extends StdPluginCategory>(type: T, key: string): void {
  const pluralType: PluginCategory = `${type}s`;
  const typePlugins = plugins[pluralType];
  if (typePlugins && typePlugins[key]) {
    delete typePlugins[key];
  } else {
    console.warn(`No plugin with key '${key}' found to unregister for type '${type}'.`);
  }
}

export { getRegisterPlugin, getRegisterPlugins, register, unregister };
