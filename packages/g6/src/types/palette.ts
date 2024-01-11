// TODO
declare type BuiltInPalette =
  | 'blues'
  | 'brBG'
  | 'buGn'
  | 'buPu'
  | 'gnBu'
  | 'greens'
  | 'greys'
  | 'oranges'
  | 'orRd'
  | 'piYG'
  | 'pRGn'
  | 'puBu'
  | 'puBuGn'
  | 'puOr'
  | 'puRd'
  | 'purples'
  | 'rdBu'
  | 'rdGy'
  | 'rdPu'
  | 'rdYlBu'
  | 'rdYlGn'
  | 'reds'
  | 'spectral'
  | 'ylGn'
  | 'ylGnBu'
  | 'ylOrBr'
  | 'ylOrRd'
  // Only for continuous palette
  | 'rainbow'
  | 'sinebow'
  | 'spectral'
  | 'turbo';

/**
 * <zh/> 色板，可以是色板名或者颜色数组，也可以是一个生成颜色的函数
 *
 * <en/> Palette, can be palette name or color array or a function to generate color
 */
export type PaletteColor<RegisterPalette extends string | unknown = unknown> = RegisterPalette extends string
  ? RegisterPalette | BasePaletteColor
  : BasePaletteColor;

type BasePaletteColor = BuiltInPalette | string[] | ((value: number) => string);
