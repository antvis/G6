import type { BuiltInPluginOptions } from '../plugins/types';
import type { LooselyModuleOption, ModuleOptions, STDModuleOption } from '../types';

export type PluginOptions = ModuleOptions<BuiltInPluginOptions>;

export type STDPluginOption = STDModuleOption<BuiltInPluginOptions>;

export type CustomPluginOption = LooselyModuleOption;
