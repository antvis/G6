import type { LooselyModuleOption, ModuleOptions, STDModuleOption } from '../types';
import type { BuiltInWidgetOptions } from '../widgets/types';

export type WidgetOptions = ModuleOptions<BuiltInWidgetOptions>;

export type STDWidgetOption = STDModuleOption<BuiltInWidgetOptions>;

export type CustomWidgetOption = LooselyModuleOption;
