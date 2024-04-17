import type { ExtensionOptions } from '../registry/extension/types';
import type { BuiltInTransformOptions } from '../transforms/types';

export type TransformOptions = ExtensionOptions<BuiltInTransformOptions>;

export interface UpdateTransformOption {
  key: string;
  [key: string]: any;
}

export interface CustomTransformOption {
  type?: string;
  key?: string;
  [key: string]: any;
}
