import type { BuiltInBehaviorOptions } from '../behaviors/types';
import type { ExtensionOptions, LooselyExtensionOption } from '../registry/extension/types';

export type BehaviorOptions = ExtensionOptions<BuiltInBehaviorOptions>;

export type CustomBehaviorOption = LooselyExtensionOption;
