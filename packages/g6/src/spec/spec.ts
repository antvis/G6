import type { BehaviorOptions } from './behavior';
import type { CanvasOptions } from './canvas';
import type { GraphData } from './data';
import type { ComboOptions } from './element/combo';
import type { EdgeOptions } from './element/edge';
import type { NodeOptions } from './element/node';
import type { LayoutOptions } from './layout';
import type { ThemeOptions } from './theme';
import type { ViewportOptions } from './viewport';
import type { WidgetOptions } from './widget';

/**
 * <zh/> Spec 定义
 *
 * <en/> Specification definition
 */

export type G6Spec = CanvasOptions &
  ViewportOptions & {
    /**
     * <zh/> 启用关闭、全局动画
     *
     * <en/> Enable or disable global animation
     */
    animation?: boolean;
    /**
     * <zh/> 数据
     *
     * <en/> Data
     */
    data?: GraphData;
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
    // optimize?: OptimizeOptions;
  };
