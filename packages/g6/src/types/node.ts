import type { BaseStyleProps, CircleStyleProps, DisplayObject } from '@antv/g';
import type { BadgeStyleProps, LabelStyleProps } from '../elements/shapes';
import type {
  CardinalPlacement,
  CornerPlacement,
  DirectionalPlacement,
  Placement,
  RelativePlacement,
} from './placement';
import type { Point } from './point';

export type PortPlacement = RelativePlacement | CardinalPlacement;
export type StarPortPlacement = RelativePlacement | 'top' | 'left' | 'right' | 'left-bottom' | 'right-bottom';
export type TrianglePortPlacement = RelativePlacement | CardinalPlacement;

/**
 * <zh/> 三角形指向
 *
 * <en/> Triangle direction
 */
export type TriangleDirection = 'up' | 'left' | 'right' | 'down';

/**
 * <zh/> 节点标签样式配置项
 *
 * <en/> Node label style props
 */
export interface NodeLabelStyleProps extends LabelStyleProps {
  /**
   * <zh/> 标签相对于节点（keyShape）的位置
   *
   * <en/> Label position relative to the node (keyShape)
   * @defaultValue 'bottom'
   */
  placement?: DirectionalPlacement;
  /**
   * <zh/> 标签最大宽度
   * - string: 当设置为字符串时，表示以相对于节点宽度的百分比形式定义最大宽度。例如 `"50%"` 表示标签宽度不超过节点宽度的一半
   * - number: 当设置为数字时，表示以像素值为单位定义最大宽度。例如 `100` 表示标签的最大宽度为 100 像素
   *
   * <en/> The maximum width of the label
   * - string: When set to a string, it defines the maximum width as a percentage of the node width. For example, `"50%"` means the label width does not exceed half of the node width
   * - number: When set to a number, it defines the maximum width in pixels. For example, `100` means the maximum width of the label is 100 pixels
   * @defaultValue '200%'
   */
  maxWidth?: string | number;
}

/**
 * <zh/> 节点徽标样式配置项
 *
 * <en/> Node badge style props
 */
export interface NodeBadgeStyleProps extends BadgeStyleProps {
  /**
   * <zh/> 徽标相对于节点（keyShape）的位置
   *
   * <en/> Badge position relative to the node (keyShape)
   */
  placement?: CardinalPlacement | CornerPlacement;
}

/**
 * <zh/> 连接桩样式配置项
 *
 * <en/> Port style props
 */
export interface PortStyleProps extends Omit<CircleStyleProps, 'r'> {
  /**
   * <zh/> 边是否连接到连接桩的中心
   * - `false`: 边连接到连接桩的边缘
   * - `true`: 边连接到连接桩的中心
   *
   * <en/> Whether the edge is connected to the center of the port
   * - `false`: The edge is connected to the edge of the port
   * - `true`: The edge is connected to the center of the port
   * @defaultValue false
   */
  linkToCenter?: boolean;
  /**
   * <zh/> 连接桩半径
   * - `undefined`: 连接桩被视为一个点
   * - number: 连接桩被视为一个圆形图形，这里指定圆形的半径
   *
   * <en/> The radius of the port
   * - `undefined`: The port is treated as a point
   * - number: The port is treated as a circle, and the radius of the circle is specified here
   * @defaultValue `undefined`
   */
  r?: number;
}

export type Port = DisplayObject<PortStyleProps> | Point;

/**
 * <zh/> 节点连接桩样式配置项
 *
 * <en/> Node port style props
 */
export interface NodePortStyleProps extends PortStyleProps {
  /**
   * <zh/> 连接桩的键值，默认为连接桩的索引
   *
   * <en/> The key of the port. Default is the index of the port
   */
  key?: string;
  /**
   * <zh/> 连接桩相对于节点（keyShape）的位置。值可以是字符串或两个数字的元组。
   *
   * <en/> The position of the port relative to the node (keyShape). The value can be a string or a tuple of two numbers.
   * - If the value is a string, it will be treated as the position direction.
   * - If the value is a tuple of two numbers, it will be treated as the position coordinates(0 ~ 1).
   */
  placement: Placement;
}

/**
 * <zh/> 甜甜圈节点中的圆环样式配置项
 *
 * <en/> Ring style props in the donut node
 */
export interface DonutRound extends BaseStyleProps {
  /**
   * <zh/> 数值，用于计算比例
   *
   * <en/> Numerical value used to calculate the scale.
   */
  value: number;
  /**
   * <zh/> 颜色
   *
   * <en/> Color.
   */
  color?: string;
}
