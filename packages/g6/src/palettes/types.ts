import type { BUILT_IN_PALETTES } from '.';

export type Palette = string | BuiltInPalette | CategoricalPalette | ContinuousPalette;

export type STDPalette = CategoricalPalette | ContinuousPalette;

export type BuiltInPalette = keyof typeof BUILT_IN_PALETTES;

export type CategoricalPalette = string[];

export type ContinuousPalette = (ratio: number) => string;
