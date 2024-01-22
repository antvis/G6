import type { PaletteColor } from '../../types/palette';

/**
 * <zh/> 色板配置项
 *
 * <en/> Palette options
 * @public
 */
export type Palette = PaletteColor | DiscretePalette | ContinuousPalette;

/**
 * <zh/> 标准色板配置
 *
 * <en/> Standard palette options
 */
export type STDPalette = DiscretePalette | ContinuousPalette;

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

interface DiscretePalette extends BasePalette {
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

interface ContinuousPalette extends BasePalette {
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
