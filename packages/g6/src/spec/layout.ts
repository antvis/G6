import type { BaseLayoutOptions, BuiltInLayoutOptions } from '../layouts/types';

export type LayoutOptions = SingleLayoutOptions | SingleLayoutOptions[];

export type STDLayoutOptions = BaseLayoutOptions;

export type SingleLayoutOptions = BuiltInLayoutOptions | BaseLayoutOptions;
