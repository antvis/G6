/**
 * <zh/> 色板，可以是色板名或者颜色数组，也可以是一个生成颜色的函数
 *
 * <en/> Palette, can be palette name or color array or a function to generate color
 */
export type PaletteColor = string | DiscretePalette | InterpolatePalette;

/**
 * <zh/> 离散色板
 *
 * <en/> Discrete palette
 */
type DiscretePalette = string[];

/**
 * <zh/> 插值色板
 *
 * <en/> Interpolate palette
 */
type InterpolatePalette = (value: number) => string;

export type PaletteRegistry = {
  [keys: string]: DiscretePalette | InterpolatePalette;
};
