import type { PaletteColor } from '../../types/palette';

/**
 * <zh/> 状态类型
 *
 * <en/> State type
 */
export type States<RegisterState extends string> = RegisterState;

/**
 * <zh/> 状态配置项
 *
 * <en/> State options
 */
export type StatesOption<State extends string, Style> = {
  [K in State]?: Style;
};

/**
 * <zh/> 色板配置项
 *
 * <en/> Palette options
 * @public
 */
export type PaletteOption<RegisterPalette extends string | unknown = unknown> =
  | PaletteColor<RegisterPalette>
  | OrderPaletteOption<RegisterPalette>
  | GroupPaletteOption<RegisterPalette>
  | FieldPaletteOption<RegisterPalette>;

export type STDPaletteOption<RegisterPalette extends string | unknown = unknown> =
  | OrderPaletteOption<RegisterPalette>
  | GroupPaletteOption<RegisterPalette>
  | FieldPaletteOption<RegisterPalette>;

interface BasePaletteOption<RegisterPalette extends string | unknown> {
  /**
   * <zh/> 色板颜色
   *
   * <en/> Palette color
   */
  color: PaletteColor<RegisterPalette>;
  /**
   * <zh/> 倒序取色
   *
   * <en/> Color in reverse order
   */
  invert?: boolean;
}

interface OrderPaletteOption<RegisterPalette extends string | unknown> extends BasePaletteOption<RegisterPalette> {
  /**
   * <zh/> 按序取色
   *
   * <en/> Coloring by order
   */
  type: 'order';
}

interface GroupPaletteOption<RegisterPalette extends string | unknown> extends BasePaletteOption<RegisterPalette> {
  /**
   * <zh/> 分组取色
   *
   * <en/> Coloring by group
   */
  type: 'group';
  /**
   * <zh/> 分组字段
   *
   * <en/> Group field
   */
  field: string;
}

interface FieldPaletteOption<RegisterPalette extends string | unknown> extends BasePaletteOption<RegisterPalette> {
  /**
   * <zh/> 基于字段值取色
   *
   * <en/> Coloring based on field value
   */
  type: 'field';
  /**
   * <zh/> 取值字段
   *
   * <en/> Value field
   */
  field: string;
}
