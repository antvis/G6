import type { BuiltInBehaviorOptions } from '../behaviors';
import type { ExtensionOptions, LooselyExtensionOption, STDExtensionOption } from '../registry/extension/types';

export type BehaviorOptions = ExtensionOptions<BuiltInBehaviorOptions>;

export type STDBehaviorOption = STDExtensionOption<BuiltInBehaviorOptions>;

export type CustomBehaviorOption = LooselyExtensionOption;
