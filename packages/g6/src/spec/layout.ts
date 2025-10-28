import type { BaseLayoutOptions, BuiltInLayoutOptions } from '../layouts/types';
import type { GraphData } from './data';

export type LayoutOptions = SingleLayoutOptions | SingleLayoutOptions[];

export type STDLayoutOptions = BaseLayoutOptions;

export type SingleLayoutOptions = BuiltInLayoutOptions | BaseLayoutOptions;
export interface TreeLayoutResult extends GraphData {
  __layoutPreset?: GraphData;
}
