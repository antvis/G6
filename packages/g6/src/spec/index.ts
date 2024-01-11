import type { CanvasOption } from './canvas';
import type { DataOption } from './data';
import type { ComboSpec, EdgeSpec, NodeSpec } from './element';
import type { LayoutOption } from './layout';
import type { ModeOption } from './mode';
import type { OptimizeOption } from './optimize';
import type { ThemeOption } from './theme';
import type { ViewportOption } from './viewport';
import type { BaseWidget, WidgetOption } from './widget';

/**
 * <zh/> G6 规范
 *
 * <en/> G6 Specification
 * @public
 */
export type G6Spec<T extends Generics = Record<string, unknown>> = CanvasOption &
  ViewportOption & {
    /**
     * <zh/> 数据
     *
     * <en/> Data
     */
    data?: DataOption<T['node'], T['edge'], T['combo']>;
    /**
     * <zh/> 布局
     *
     * <en/> Layout
     */
    layout?: LayoutOption;
    /**
     * <zh/> 节点
     *
     * <en/> Node
     */
    node?: NodeSpec<T['node'], T['state'], T['palette']>;
    /**
     * <zh/> 边
     *
     * <en/> Edge
     */
    edge?: EdgeSpec<T['edge'], T['state'], T['palette']>;
    /**
     * <zh/> Combo
     *
     * <en/> Combo
     */
    combo?: ComboSpec<T['combo'], T['state'], T['palette']>;
    /**
     * <zh/> 主题
     *
     * <en/> Theme
     */
    theme?: ThemeOption<T['theme']>;
    /**
     * <zh/> 模式
     *
     * <en/> Mode
     */
    mode?: ModeOption<T['behavior']>;
    /**
     * <zh/> 画布插件
     *
     * <en/> Canvas widget
     */
    widget?: WidgetOption<T['widget']>;
    /**
     * <zh/> 优化选项
     *
     * <en/> Optimize options
     */
    optimize?: OptimizeOption;
  };

export type Generics = {
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
   * <zh/> 节点数据类型
   *
   * <en/> Node data type
   */
  node?: Record<string, unknown>;
  /**
   * <zh/> 边数据类型
   *
   * <en/> Edge data type
   */
  edge?: Record<string, unknown>;
  /**
   * <zh/> Combo 数据类型
   *
   * <en/> Combo data type
   */
  combo?: Record<string, unknown>;
  /**
   * <zh/> 插件类型
   *
   * <en/> Plugin type
   */
  widget?: BaseWidget;
  /**
   * <zh/> 色板类型
   *
   * <en/> Palette type
   */
  palette?: string;
};
