export type Palette = string | BuiltInPalette | CategoricalPalette | ContinuousPalette;

export type BuiltInPalette = 'category10' | 'category20';

export type CategoricalPalette = string[];

export type ContinuousPalette = (ratio: number) => string;
