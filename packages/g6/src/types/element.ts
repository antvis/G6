import type { BaseStyleProps, DisplayObject, PathStyleProps } from '@antv/g';
import { BaseNode } from '../elements/nodes';
import type { ComboOptions, EdgeOptions, NodeOptions } from '../spec';
import type { Size } from './size';

export type ElementType = 'node' | 'edge' | 'combo';

export type ElementOptions = NodeOptions | EdgeOptions | ComboOptions;

export type Node = BaseNode<DisplayObject, BaseStyleProps>;

export type BaseNodeProps = BaseStyleProps & {
  /**
   * <zh/> x 坐标
   * <en/> The x-coordinate of node
   */
  x?: number | string;
  /**
   * <zh/> y 坐标
   * <en/> The y-coordinate of node
   */
  y?: number | string;
  /**
   * <zh/> 节点大小，快捷设置节点宽高
   * <en/> The size of node, which is a shortcut to set the width and height of node
   */
  size?: Size;
  /**
   * <zh/> 主色
   * <en/> Subject color
   */
  color?: string;
  /**
   * <zh/> 解决类型 style.getPropertyValue 问题，不要使用该属性
   *
   * <en/> Solve the problem of style.getPropertyValue, do not use this property
   * @description
   * <zh/> 移除该属性会导致 Polygon 及其子类与 Node 不兼容
   *
   * <en/> Removing this property will cause Polygon and its subclasses to be incompatible with Node
   * @ignore
   */
  points?: ([number, number] | [number, number, number])[];
};

export type BaseEdgeProps = BaseStyleProps &
  Pick<
    PathStyleProps,
    'isBillboard' | 'markerStart' | 'markerStartOffset' | 'markerEnd' | 'markerEndOffset' | 'markerMid'
  > & {
    /**
     * <zh/> 主色
     * <en/> Subject color
     */
    color?: string;
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
     * <zh/> 边起始连接的 port
     * <en/> The Port of the source node
     */
    sourcePort?: string;
    /**
     * <zh/> 边终点连接的 port
     * <en/> The Port of the target node
     */
    targetPort?: string;
  };
