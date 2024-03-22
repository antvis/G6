import type { BuiltInBehaviorOptions } from '../behaviors/types';
import type { ExtensionOptions } from '../registry/extension/types';

export type BehaviorOptions = ExtensionOptions<BuiltInBehaviorOptions>;

export interface UpdateBehaviorOption {
  key: string;
  [key: string]: any;
}

export interface CustomBehaviorOption {
  type?: string;
  key?: string;
  [key: string]: any;
}
