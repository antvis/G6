import type { BuiltInPluginOptions } from '../plugins/types';
import type { ExtensionOptions } from '../registry/extension/types';

export type PluginOptions = ExtensionOptions<BuiltInPluginOptions>;

export interface UpdatePluginOption {
  key: string;
  [key: string]: any;
}

export interface CustomPluginOption extends Record<string, any> {
  /**
   * <zh/> 插件类型
   *
   * <en/> Plugin type
   */
  type?: string;
  /**
   * <zh/> 插件名称
   *
   * <en/> Plugin name
   * @remarks
   * <zh/> 插件名称用于标识插件，从而进一步操作此插件
   *
   * <en/> Plugin name is used to identify the plugin for further operations
   */
  key?: string;
}
