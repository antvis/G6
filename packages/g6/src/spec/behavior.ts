import type { BuiltInBehaviorOptions } from '../behaviors';
import type { LooselyModuleOption, ModuleOptions, STDModuleOption } from '../types';

export type BehaviorOptions = ModuleOptions<BuiltInBehaviorOptions>;

export type STDBehaviorOption = STDModuleOption<BuiltInBehaviorOptions>;

export type CustomBehaviorOption = LooselyModuleOption;
