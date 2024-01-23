import type { BehaviorOptions } from './behavior';
import type { CanvasOptions } from './canvas';
import type { DataOptions } from './data';
import type { ComboOptions, EdgeOptions, NodeOptions } from './element';
import type { LayoutOptions } from './layout';
import type { OptimizeOptions } from './optimize';
import type { ThemeOptions } from './theme';
import type { ViewportOptions } from './viewport';
import type { WidgetOptions } from './widget';

/**
 * <zh/> G6 规范
 *
 * <en/> G6 Specification
 * @public
 */
export type G6Spec = CanvasOptions &
  ViewportOptions & {
    /**
     * <zh/> 数据
     *
     * <en/> Data
     */
    data?: DataOptions;
    /**
     * <zh/> 布局
     *
     * <en/> Layout
     */
    layout?: LayoutOptions;
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
     * <zh/> 交互
     *
     * <en/> Behaviors
     */
    behaviors?: BehaviorOptions;
    /**
     * <zh/> 画布插件
     *
     * <en/> Canvas widget
     */
    widgets?: WidgetOptions;
    /**
     * <zh/> 优化选项
     *
     * <en/> Optimize options
     */
    optimize?: OptimizeOptions;
  };
