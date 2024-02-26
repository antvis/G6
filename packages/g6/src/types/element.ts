import type { BaseStyleProps, DisplayObject, PathStyleProps } from '@antv/g';
import type { BaseCombo } from '../elements/combos';
import type { BaseEdge } from '../elements/edges';
import type { BaseNode } from '../elements/nodes';
import type { ComboOptions, EdgeOptions, NodeOptions } from '../spec';
import type { Padding } from './padding';
import type { Size } from './size';

export type ElementType = 'node' | 'edge' | 'combo';

export type ElementOptions = NodeOptions | EdgeOptions | ComboOptions;

export type Node = BaseNode<DisplayObject, BaseStyleProps>;

export type Edge = BaseEdge;

export type Combo = BaseCombo<DisplayObject, BaseStyleProps>;

export type Element = Node | Edge | Combo;

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
  /**
   * <zh/> 父节点 id
   * <en/> The id of the parent node/combo
   */
  parentId?: string;
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

export type BaseComboProps = BaseNodeProps & {
  /**
   * <zh/> Combo 是否收起
   * <en/> Indicates whether the combo is collapsed
   */
  collapsed?: boolean;
  /**
   * <zh/> Combo 的子元素，可以是节点或者 Combo
   * <en/> The children of the combo, which can be nodes or combos
   */
  children?: Record<string, Node | Combo>;
  /**
   * <zh/> Combo 的内边距
   * <en/> The padding of the combo
   */
  padding?: Padding;
  /**
   * <zh/> Combo 收起时显示的文本
   * <en/> The text to display when the combo is collapsed
   */
  contentType?: 'childCount';
};
