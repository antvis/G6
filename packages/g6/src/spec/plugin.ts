import type { BuiltInPluginOptions } from '../plugins/types';
import type { ExtensionOptions, LooselyExtensionOption } from '../registry/extension/types';

export type PluginOptions = ExtensionOptions<BuiltInPluginOptions>;

export type CustomPluginOption = LooselyExtensionOption;
