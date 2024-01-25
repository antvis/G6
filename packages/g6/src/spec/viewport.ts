import type { AnimationEffectTiming } from '../animations/types';
import type { Padding, STDPadding } from '../types/padding';
import type { Point } from '../types/point';

/**
 * <zh/> 视口配置项
 *
 * <en/> Viewport
 * @public
 */
export type ViewportOptions = {
  /**
   * <zh/> 是否自动适应
   *
   * <en/> whether to auto fit
   */
  autoFit?: AutoFit;
  /**
   * <zh/> 画布内边距
   *
   * <en/> canvas padding
   */
  padding?: Padding;
  /**
   * <zh/> 缩放比例
   *
   * <en/> zoom ratio
   */
  zoom?: number;
  /**
   * <zh/> 缩放范围
   *
   * <en/> zoom range
   */
  zoomRange?: [number, number];
};

/**
 * @internal
 */
export type STDViewportOptions = {
  autoFit?: STDAutoFit;
  padding?: STDPadding;
  zoom?: number;
  zoomRange?: [number, number];
};

/**
 * <zh/> 视口自适应规则
 *
 * <en/> Viewport auto fit rules
 * @public
 */
export type AutoFit = STDAutoFit | 'view' | 'center';

/**
 * <zh/> 视口自适应规则(标准属性)
 *
 * <en/> Viewport auto fit rules(STD)
 * @public
 */
export type STDAutoFit =
  | { type: 'view'; padding?: Padding; rule?: FitViewRule; effectTiming?: AnimationEffectTiming }
  | { type: 'center'; effectTiming?: AnimationEffectTiming }
  | { type: 'position'; position: Point; alignment?: AlignmentPosition; effectTiming?: AnimationEffectTiming };

export type FitViewRule = {
  /**
   * <zh/> 是否仅当图内容超出视窗时，进行适配
   *
   * <en/> Whether to fit the view only when the graph content exceeds the viewport
   */
  onlyOutOfViewport?: boolean;
  /**
   * <zh/> 是否仅当图内容大于视窗时，进行适配
   *
   * <en/> Whether to fit the view only when the graph content is larger than the viewport
   */
  onlyZoomAtLargerThanViewport?: boolean;
  /**
   * <zh/> 适配时限制缩放的方向，默认为 'both'
   *
   * <en/> Limit the direction of zoom when fitting, default is 'both'
   */
  direction?: 'x' | 'y' | 'both';
  /**
   * <zh/> 缩放比例应当根据横、纵方向上的较大者还是较小者
   *
   * <en/> Whether the zoom ratio should be based on the larger or smaller of the horizontal and vertical directions
   */
  ratioRule?: 'max' | 'min';
  /**
   * <zh/> 根据渲染的包围盒进行适配，还是根据节点布局的位置进行适配。默认为 'current'
   *
   * - `current` 直接获取当前包围盒
   *
   * - `final` 计算布局后的包围盒，适用于当前正在执行布局动画的情况
   *
   * <en/> Whether to fit according to the rendered bounding box or the layout position of the node. Default is 'current'
   *
   * - `current` Get the current bounds directly.
   *
   * - `final` Calculate the bounds after layout, which is suitable for the situation where the layout animation is currently being executed.
   */
  boundsType?: 'current' | 'final';
};

type AlignmentPosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'center'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';
