import type { CanvasOption } from './canvas';
import type { DataOption } from './data';
import type { ComboOption, EdgeOption, NodeOption } from './element';
import type { LayoutOption } from './layout';
import type { ModeOption } from './mode';
import type { OptimizeOption } from './optimize';
import type { ThemeOption } from './theme';
import type { SpecGenerics } from './types';
import type { ViewportOption } from './viewport';
import type { WidgetOption } from './widget';

/**
 * <zh/> G6 规范
 *
 * <en/> G6 Specification
 * @public
 */
export type G6Spec<T extends SpecGenerics = any> = CanvasOption &
  ViewportOption & {
    /**
     * <zh/> 数据
     *
     * <en/> Data
     */
    data?: DataOption<T['data']>;
    /**
     * <zh/> 布局
     *
     * <en/> Layout
     */
    layout?: LayoutOption<T['data']['node'], T['layout']>;
    /**
     * <zh/> 节点
     *
     * <en/> Node
     */
    node?: NodeOption<T['data']['node'], T['state'], T['palette']>;
    /**
     * <zh/> 边
     *
     * <en/> Edge
     */
    edge?: EdgeOption<T['data']['edge'], T['state'], T['palette']>;
    /**
     * <zh/> Combo
     *
     * <en/> Combo
     */
    combo?: ComboOption<T['data']['combo'], T['state'], T['palette']>;
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
