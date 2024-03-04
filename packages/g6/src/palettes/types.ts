export type Palette = string | BuiltInPalette | CategoricalPalette | ContinuousPalette;

export type STDPalette = CategoricalPalette | ContinuousPalette;

export type BuiltInPalette = 'spectral' | 'oranges' | 'greens' | 'blues';

export type CategoricalPalette = string[];

export type ContinuousPalette = (ratio: number) => string;
