import type { CanvasOption } from './canvas';
import type { DataOption } from './data';
import type { ComboOption, EdgeOption, NodeOption } from './element';
import type { LayoutOption } from './layout';
import type { ModeOption } from './mode';
import type { OptimizeOption } from './optimize';
import type { ThemeOption } from './theme';
import type { ViewportOption } from './viewport';
import type { WidgetOption } from './widget';

/**
 * <zh/> G6 规范
 *
 * <en/> G6 Specification
 * @public
 */
export type G6Spec = CanvasOption &
  ViewportOption & {
    /**
     * <zh/> 数据
     *
     * <en/> Data
     */
    data?: DataOption;
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
    node?: NodeOption;
    /**
     * <zh/> 边
     *
     * <en/> Edge
     */
    edge?: EdgeOption;
    /**
     * <zh/> Combo
     *
     * <en/> Combo
     */
    combo?: ComboOption;
    /**
     * <zh/> 主题
     *
     * <en/> Theme
     */
    theme?: ThemeOption;
    /**
     * <zh/> 模式
     *
     * <en/> Mode
     */
    mode?: ModeOption;
    /**
     * <zh/> 画布插件
     *
     * <en/> Canvas widget
     */
    widget?: WidgetOption;
    /**
     * <zh/> 优化选项
     *
     * <en/> Optimize options
     */
    optimize?: OptimizeOption;
  };
