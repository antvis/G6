import type { BuiltInPluginOptions } from '../plugins/types';
import type { ExtensionOptions } from '../registry/extension/types';

export type PluginOptions = ExtensionOptions<BuiltInPluginOptions>;

export interface UpdatePluginOption {
  key: string;
  [key: string]: any;
}

export interface CustomPluginOption {
  type?: string;
  key?: string;
  [key: string]: any;
}
