import { Line, Path, Polyline } from '@antv/g';
import type { LabelStyleProps } from '../elements/shapes';
import type { CardinalPlacement, CornerPlacement } from './placement';

export type EdgeDirection = 'in' | 'out' | 'both';

export type EdgeKey = Line | Path | Polyline;

export type EdgeLabelPlacement = 'start' | 'center' | 'end' | number;

export type EdgeLabelStyleProps = {
  /**
   * <zh/> 标签相对于边的位置。取值范围为 'start'、'center'、'end' 或特定比率（数字 0-1）
   * <en/> Label position relative to the edge (keyShape) that can be 'start', 'center', 'end' or a specific ratio (number 0-1)
   */
  placement?: EdgeLabelPlacement;
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
  autoRotate?: boolean;
  /**
   * <zh/> 文本的最大宽度，超出会裁减
   * <en/> maxWidth of label text, which will be clipped if exceeded
   */
  maxWidth?: string | number;
} & LabelStyleProps;

export type LoopPlacement = CardinalPlacement | CornerPlacement;
