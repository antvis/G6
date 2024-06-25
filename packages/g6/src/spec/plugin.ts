import type { Graph } from '../runtime/graph';

export type PluginOptions = (string | CustomPluginOption | ((this: Graph) => CustomPluginOption))[];

export interface UpdatePluginOption {
  key: string;
  [key: string]: unknown;
}

export interface CustomPluginOption extends Record<string, any> {
  /**
   * <zh/> 插件类型
   *
   * <en/> Plugin type
   */
  type: string;
  /**
   * <zh/> 插件 key，即唯一标识
   *
   * <en/> Plugin key, that is, the unique identifier
   * @remarks
   * <zh/> 用于标识插件，从而进一步操作此插件
   *
   * <en/> Used to identify the plugin for further operations
   *
   * ```ts
   * // Get plugin instance
   * const plugin = graph.getPluginInstance('key');
   * // Update plugin options
   * graph.updatePlugin({key: 'key', ...});
   * ```
   */
  key?: string;
}
