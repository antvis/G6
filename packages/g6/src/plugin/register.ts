/**
 * @file Overview registry of built-in plugins and user-defined plugins.
 */
import { builtInPlugins } from '../plugin';
import type { BehaviorRegistry } from '../types/behavior';
import type { EdgeRegistry } from '../types/edge';
import type { LayoutRegistry } from '../types/layout';
import type { NodeRegistry } from '../types/node';
import type { PluginRegistry as WidgetRegistry } from '../types/plugin';
import type { ThemeRegistry, ThemeSolverRegistry } from '../types/theme';

/**
 * <zh/> 转换对象类型 T 的复数 key 为其单数形式
 * <en/> Converts plural keys of an object type T to their singular form.
 * @example -- `{ nodes: MyType }` becomes `{ node: MyType }`
 */
type SingularKeys<T> = {
  [K in keyof T as K extends `${infer R}s` ? R : never]: T[K];
};

/**
 * <zh/> 将对象类型 T 中的 Record<string, U> 类型的值转换为 U 类型
 * <en/> Converts the values of type Record<string, U> in object type T to type U.
 * @example - `{ key: { [key: string]: MyType } }` becomes `{ key: MyType }`
 */
type UnwrapRecordValues<T> = {
  [K in keyof T]: T[K] extends Record<string, infer U> ? U : T[K];
};

/**
 * <zh/> 用于将一个对象类型的 key 转换为其单数形式，并将对应的值类型转换为其子类型
 * <en/> Used to convert the key of an object type to its singular form, and convert the corresponding value type to its child type.
 * @example { nodes: { [key: string] : typeof BaseNode }, ... } => { node: typeof BaseNode, ... }
 */
type Singular<T> = UnwrapRecordValues<SingularKeys<T>>;

type Plugins = {
  nodes: NodeRegistry;
  edges: EdgeRegistry;
  combos: NodeRegistry;
  layouts: LayoutRegistry;
  widgets: WidgetRegistry;
  behaviors: BehaviorRegistry;
  themeSolvers: ThemeSolverRegistry;
  themes: ThemeRegistry;
  transforms: any; //TODO: 待数据处理移除后删除
};

/**
 * <zh/> 插件类型映射
 *
 * <en/> Plugin type mapping
 */
type STDPlugins = Singular<Plugins>;

/**
 * <zh/> 插件类型，即复数形式，例如 nodes
 *
 * <en/> Plugin category, i.e. plural form, e.g. nodes.
 */
type PluginCategory = keyof Plugins;

/**
 * <zh/> 标准插件类型，即单数形式，例如 node
 *
 * <en/> Standard plugin category, i.e. singular form, e.g. node.
 */
type STDPluginCategory = keyof STDPlugins;

/**
 * <zh/> 插件条目，包含插件名称和插件类，例如 { name: 'node', plugin: BaseNode }
 *
 * <en/> Plugin entry, including plugin name and plugin class, e.g. { name: 'node', plugin: BaseNode }
 */
type PluginEntry<T extends STDPluginCategory> = {
  name: string;
  plugin: STDPlugins[T];
};

/**
 * <zh/> 转换后的插件集合，例如 { nodes: [{ name: 'node', plugin: BaseNode }] }
 *
 * <en/> Transformed plugin collection, e.g. { nodes: [{ name: 'node', plugin: BaseNode }] }
 */
type TransformedPlugins = {
  [category: string]: PluginEntry<STDPluginCategory>[];
};

const pluginCategoryList: PluginCategory[] = [
  'nodes',
  'edges',
  'combos',
  'behaviors',
  'layouts',
  'widgets',
  'themes',
  'themeSolvers',
  'transforms',
];

class PluginRegistry {
  private nodes: Map<string, NodeRegistry[string]> = new Map();

  private edges: Map<string, EdgeRegistry[string]> = new Map();

  private combos: Map<string, NodeRegistry[string]> = new Map();

  private layouts: Map<string, LayoutRegistry[string]> = new Map();

  private widgets: Map<string, WidgetRegistry[string]> = new Map();

  private behaviors: Map<string, BehaviorRegistry[string]> = new Map();

  private themeSolvers: Map<string, ThemeSolverRegistry[string]> = new Map();

  private themes: Map<string, ThemeRegistry[string]> = new Map();

  private transforms: Map<string, any> = new Map(); //TODO: 待数据处理移除后删除

  constructor() {
    // Initialize the registry with built-in plugins.
    this.registerBuiltInPlugins();
  }

  /**
   * <zh/> 注册内置插件
   *
   * <en/> Register built-in plugins.
   * @private
   */
  private registerBuiltInPlugins() {
    Object.keys(builtInPlugins).forEach((category) => {
      Object.keys(builtInPlugins[category]).forEach((key) => {
        this.register(category.slice(0, -1) as STDPluginCategory, key, builtInPlugins[category][key]);
      });
    });
  }

  /**
   * <zh/> 根据 type 获取插件类型
   *
   * <en/> Get the plugin category by type.
   * @param type - <zh/> 插件类型 | <en/> The plugin type.
   * @returns - <zh/> 插件类型 | <en/> The plugin category.
   * @example getPluginCategory('node') => 'nodes'
   * @private
   */
  private getPluginCategory<T extends STDPluginCategory>(type: T): PluginCategory {
    return `${type}s` as PluginCategory;
  }

  /**
   * <zh/> 注册插件
   *
   * <en/> Register a plugin.
   * @param type <zh/> 插件类型 | <en/> The type of the plugin.
   * @param key <zh/> 插件的唯一标识 | <en/> The unique identifier of the plugin.
   * @param pluginClass <zh/> 插件类 | <en/> The plugin class.
   * @public
   */
  public register<T extends STDPluginCategory>(
    type: T,
    key: string,
    pluginClass: STDPlugins[T] & { type: string },
  ): void {
    const category = this.getPluginCategory(type);
    if (this[category].has(key)) {
      console.warn(`Plugin with key '${key}' is already registered for type '${category}'.`);
    } else {
      pluginClass.type = key;
      this[category].set(key, pluginClass);
    }
  }

  /**
   * <zh/> 获取已注册的插件集合
   *
   * <en/> Get registered plugins.
   * @returns - <zh/> 已注册的插件 | <en/> The registered plugins.
   * @public
   */
  public getRegisterPlugins(): TransformedPlugins {
    const transformedPlugins: TransformedPlugins = {};
    for (const category of pluginCategoryList) {
      if (this[category] instanceof Map) {
        transformedPlugins[category] = Array.from(this[category].entries()).map(([key, plugin]) => ({
          name: key,
          plugin: plugin,
        }));
      }
    }

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
  public getRegisterPlugin<T extends STDPluginCategory>(type: T, key: string): PluginEntry<T> {
    const category = this.getPluginCategory(type);
    return {
      name: key,
      plugin: this[category].get(key) as STDPlugins[T],
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
  public unregister<T extends STDPluginCategory>(type: T, key: string): void {
    const category = this.getPluginCategory(type);
    if (this[category].has(key)) {
      this[category].delete(key);
    } else {
      console.warn(`No plugin with key '${key}' found to unregister for type '${type}'.`);
    }
  }
}

const pluginRegistry = new PluginRegistry();

const register = pluginRegistry.register.bind(pluginRegistry);
const getRegisterPlugin = pluginRegistry.getRegisterPlugin.bind(pluginRegistry);
const getRegisterPlugins = pluginRegistry.getRegisterPlugins.bind(pluginRegistry);
const unregister = pluginRegistry.unregister.bind(pluginRegistry);

export { getRegisterPlugin, getRegisterPlugins, register, unregister };

export type { PluginEntry, STDPluginCategory };
