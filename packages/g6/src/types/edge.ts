import type { ImageStyleProps, Line, Path, PathStyleProps, Polyline } from '@antv/g';
import type { PathArray } from '@antv/util';
import type { LabelStyleProps } from '../elements/shapes';
import type { CardinalPlacement, CornerPlacement } from './placement';
import type { Size } from './size';

export type EdgeDirection = 'in' | 'out' | 'both';

export type EdgeKey = Line | Path | Polyline;

export interface EdgeLabelStyleProps extends LabelStyleProps {
  /**
   * <zh/> 标签相对于边的位置。取值范围为 'start'、'center'、'end' 或特定比率（数字 0-1）
   *
   * <en/> Label position relative to the edge (keyShape) that can be 'start', 'center', 'end' or a specific ratio (number 0-1)
   */
  placement?: 'start' | 'center' | 'end' | number;
  /**
   * <zh/> 标签平行于边的水平偏移量
   *
   * <en/> The horizontal offset of the label parallel to the edge
   */
  offsetX?: number;
  /**
   * <zh/> 标签垂直于边的垂直偏移量
   *
   * <en/> The vertical offset of the label perpendicular to the edge
   */
  offsetY?: number;
  /**
   * <zh/> 是否自动旋转以与边的方向对齐
   *
   * <en/> Indicates whether the label should automatically rotate to align with the edge's direction
   */
  autoRotate?: boolean;
  /**
   * <zh/> 文本的最大宽度，超出会裁减
   *
   * <en/> maxWidth of label text, which will be clipped if exceeded
   */
  maxWidth?: string | number;
}

export interface EdgeArrowStyleProps
  extends PathStyleProps,
    Omit<ImageStyleProps, 'width' | 'height'>,
    Record<string, unknown> {
  /**
   * <zh/> 箭头大小
   *
   * <en/> Arrow size
   */
  size?: Size;
  /**
   * <zh/> 箭头类型
   *
   * <en/> Arrow type
   */
  type?:
    | 'triangle'
    | 'circle'
    | 'diamond'
    | 'vee'
    | 'rect'
    | 'triangleRect'
    | 'simple'
    | ((width: number, height: number) => PathArray);
}

export type LoopPlacement = CardinalPlacement | CornerPlacement;

export interface LoopStyleProps {
  /**
   * <zh/> 边的位置
   *
   * <en/> The position of the edge
   */
  placement?: LoopPlacement;
  /**
   * <zh/> 指定是否顺时针绘制环
   *
   * <en/> Specify whether to draw the loop clockwise
   */
  clockwise?: boolean;
  /**
   * <zh/> 从节点 keyShape 边缘到自环顶部的距离，用于指定自环的曲率，默认为宽度或高度的最大值
   *
   * <en/> Determine the position from the edge of the node keyShape to the top of the self-loop, used to specify the curvature of the self-loop, the default value is the maximum of the width or height
   */
  dist?: number;
}
