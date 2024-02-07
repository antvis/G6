import type { DisplayObject, PathStyleProps } from '@antv/g';
import { BaseNode } from '../elements/nodes';
import type { ComboOptions, EdgeOptions, NodeOptions } from '../spec';
import { Point } from './point';

export type ElementType = 'node' | 'edge' | 'combo';

export type ElementOptions = NodeOptions | EdgeOptions | ComboOptions;

export type Node = BaseNode<BaseNodeProps<any>, DisplayObject>;

export type ExtractGShapeStyleProps<T> = T extends DisplayObject<infer S, any> ? S : never;

export type BaseElementProps = {
  /**
   * <zh/> 主色
   * <en/> Subject color
   */
  color?: string;
};

export type BaseNodeProps<ShapeProps> = BaseElementProps &
  ShapeProps & {
    /**
     * <zh/> x 坐标
     * <en/> The x-coordinate of node
     */
    x?: number;
    /**
     * <zh/> y 坐标
     * <en/> The y-coordinate of node
     */
    y?: number;
    /**
     * <zh/> z 坐标
     * <en/> The z-coordinate of node
     */
    z?: number;
    /**
     * <zh/> 节点宽度
     * <en/> The width of node
     */
    width?: number;
    /**
     * <zh/> 节点高度
     * <en/> The height of node
     */
    height?: number;
    /**
     * <zh/> 节点深度
     * <en/> The depth of node
     */
    depth?: number;
  };

export type BaseEdgeProps<ShapeProps> = BaseElementProps & {
  /**
   * <zh/> 边的起点 shape
   * <en/> The source shape. Represents the start of the edge
   */
  sourceNode: Node;
  /**
   * <zh/> 边的终点 shape
   * <en/> The source shape. Represents the start of the edge
   */
  targetNode: Node;
  /**
   * <zh/> 边起始连接的 anchor
   * <en/> The Anchor of the source node
   */
  sourceAnchor?: string;
  /**
   * <zh/> 边终点连接的 anchor
   * <en/> The Anchor of the target node
   */
  targetAnchor?: string;
  /**
   * <zh/> 边的起点
   * <en/> The source point. Represents the start of the edge
   */
  sourcePoint?: Point;
  /**
   * <zh/> 边的终点
   * <en/> The target point. Represents the end of the edge
   */
  targetPoint?: Point;
} & PathStyleProps &
  ShapeProps;
