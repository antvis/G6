import type { CanvasOption } from './canvas';
import type { DataOption } from './data';
import type { ComboOptions, EdgeOptions, NodeOptions } from './element';
import type { LayoutOption } from './layout';
import type { ModeOption } from './mode';
import type { OptimizeOption } from './optimize';
import type { ThemeOptions } from './theme';
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
    node?: NodeOptions;
    /**
     * <zh/> 边
     *
     * <en/> Edge
     */
    edge?: EdgeOptions;
    /**
     * <zh/> Combo
     *
     * <en/> Combo
     */
    combo?: ComboOptions;
    /**
     * <zh/> 主题
     *
     * <en/> Theme
     */
    theme?: ThemeOptions;
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
    widgets?: WidgetOption;
    /**
     * <zh/> 优化选项
     *
     * <en/> Optimize options
     */
    optimize?: OptimizeOption;
  };
