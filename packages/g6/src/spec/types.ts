import type { UnknownObject } from '../types/types';
import type { BaseLayoutOption } from './layout';
import type { BaseWidgetOption } from './widget';

export type SpecGenerics = {
  /**
   * <zh/> 主题类型
   *
   * <en/> Theme type
   */
  theme?: string;
  /**
   * <zh/> 交互类型
   *
   * <en/> Behavior type
   */
  behavior?: string;
  /**
   * <zh/> 状态类型
   *
   * <en/> States type
   */
  state?: string;
  /**
   * <zh/> 数据类型
   *
   * <en/> Data type
   */
  data?: {
    /**
     * 节点数据/样式类型
     *
     * Node data/style type
     */
    node?: {
      data?: UnknownObject;
      style?: UnknownObject;
    };
    /**
     * 边数据/样式类型
     *
     * Edge data/style type
     */
    edge?: {
      data?: UnknownObject;
      style?: UnknownObject;
    };
    /**
     * Combo数据/样式类型
     *
     * Combo data/style type
     */
    combo?: {
      data?: UnknownObject;
      style?: UnknownObject;
    };
  };
  /**
   * <zh/> 组件类型
   *
   * <en/> Component type
   */
  widget?: BaseWidgetOption;
  /**
   * <zh/> 色板类型
   *
   * <en/> Palette type
   */
  palette?: string;
  /**
   * <zh/> 布局类型
   *
   * <en/> Layout type
   */
  layout?: BaseLayoutOption;
};
