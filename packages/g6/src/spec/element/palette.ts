import type { Palette } from '../../palettes/types';

/**
 * <zh/> 色板配置项
 *
 * <en/> Palette options
 * @public
 */
export type PaletteOptions = Palette | CategoricalPaletteOptions | ContinuousPaletteOptions;

export type STDPaletteOptions = CategoricalPaletteOptions | ContinuousPaletteOptions;

interface CategoricalPaletteOptions extends BasePaletteOptions {
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

interface ContinuousPaletteOptions extends BasePaletteOptions {
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

export interface BasePaletteOptions {
  /**
   * <zh/> 色板颜色
   *
   * <en/> Palette color
   */
  color: Palette;
  /**
   * <zh/> 倒序取色
   *
   * <en/> Color in reverse order
   */
  invert?: boolean;
}
