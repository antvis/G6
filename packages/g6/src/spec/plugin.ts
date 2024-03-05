import type { BuiltInPluginOptions } from '../plugins/types';
import type { ExtensionOptions, LooselyExtensionOption, STDExtensionOption } from '../registry/extension/types';

export type PluginOptions = ExtensionOptions<BuiltInPluginOptions>;

export type STDPluginOption = STDExtensionOption<BuiltInPluginOptions>;

export type CustomPluginOption = LooselyExtensionOption;
