import { Line, Path, Polyline } from '@antv/g';
import type { LabelStyleProps } from '../elements/shapes';

export type EdgeDirection = 'in' | 'out' | 'both';

export type EdgeKey = Line | Path | Polyline;

export type EdgeLabelPosition = 'start' | 'center' | 'end' | number;

export type EdgeLabelStyleProps = {
  /**
   * <zh/> 标签相对于边的位置。可以是 'start'、'center'、'end' 或特定比率（数字 0-1）
   * <en/> The position of the label relative to the edge. Can be 'start', 'center', 'end', or a specific ratio (number)
   */
  position: EdgeLabelPosition;
  /**
   * <zh/> 标签平行于边的水平偏移量
   * <en/> The horizontal offset of the label parallel to the edge
   */
  offsetX?: number;
  /**
   * <zh/> 标签垂直于边的垂直偏移量
   * <en/> The vertical offset of the label perpendicular to the edge
   */
  offsetY?: number;
  /**
   * <zh/> 是否自动旋转以与边的方向对齐
   * <en/> Indicates whether the label should automatically rotate to align with the edge's direction
   */
  autoRotate: boolean;
} & LabelStyleProps;
