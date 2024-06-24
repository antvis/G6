import type { Graph } from '../runtime/graph';

export type TransformOptions = (string | CustomTransformOption | ((this: Graph) => CustomTransformOption))[];

export interface UpdateTransformOption {
  key: string;
  [key: string]: unknown;
}

export interface CustomTransformOption {
  type: string;
  key?: string;
  [key: string]: unknown;
}
