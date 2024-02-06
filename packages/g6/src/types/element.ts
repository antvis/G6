import type { DisplayObject } from '@antv/g';
import type { BaseEdgeKeyStyleProps } from '../elements/edges/base-edge';
import { BaseNode } from '../elements/nodes';
import type { ComboOptions, EdgeOptions, NodeOptions } from '../spec';
import { Point } from './point';

export type ElementType = 'node' | 'edge' | 'combo';

export type ElementOptions = NodeOptions | EdgeOptions | ComboOptions;

export type Node = BaseNode<BaseEdgeKeyStyleProps<any>, DisplayObject>;

export type BaseElementProps = {
  /**
   * <zh/> 主色
   * <en/> Subject color
   */
  color?: string;
};

export type BaseNodeProps = {};

export type BaseEdgeProps = BaseElementProps & {
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
};
