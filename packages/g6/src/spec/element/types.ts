import type { PaletteColor } from '../../types/palette';

/**
 * <zh/> 色板配置项
 *
 * <en/> Palette options
 * @public
 */
export type Palette = PaletteColor | GroupPalette | FieldPalette;

export type STDPalette = GroupPalette | FieldPalette;

interface BasePalette {
  /**
   * <zh/> 色板颜色
   *
   * <en/> Palette color
   */
  color: PaletteColor;
  /**
   * <zh/> 倒序取色
   *
   * <en/> Color in reverse order
   */
  invert?: boolean;
}

interface GroupPalette extends BasePalette {
  /**
   * <zh/> 分组取色
   *
   * <en/> Coloring by group
   */
  type: 'group';
  /**
   * <zh/> 分组字段，未指定时基于节点 id 分组
   *
   * <en/> Group field, when not specified, group by node id
   */
  field?: string;
}

interface FieldPalette extends BasePalette {
  /**
   * <zh/> 基于字段值取色
   *
   * <en/> Coloring based on field value
   */
  type: 'value';
  /**
   * <zh/> 取值字段
   *
   * <en/> Value field
   */
  field: string;
}
