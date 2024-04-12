import type { BaseStyleProps, PathStyleProps } from '@antv/g';
import type { ID } from '@antv/graphlib';
import type { BaseCombo } from '../elements/combos';
import type { BaseEdge } from '../elements/edges';
import type { BaseNode } from '../elements/nodes';
import type { RuntimeContext } from '../runtime/types';
import type { ComboOptions, EdgeOptions, NodeData, NodeOptions } from '../spec';
import type { NodeLikeData } from './data';
import type { Padding } from './padding';
import type { Placement } from './placement';
import type { Size } from './size';

export type ElementType = 'node' | 'edge' | 'combo';

export type ElementTypes = Array<ElementType>;

export type ElementOptions = NodeOptions | EdgeOptions | ComboOptions;

export type Node = BaseNode;

export type Edge = BaseEdge;

export type Combo = BaseCombo;

export type NodeLike = Node | Combo;

export type Element = Node | Edge | Combo;

type BaseElementStyleProps = BaseStyleProps & {
  context?: RuntimeContext;
};

export type BaseNodeProps = BaseElementStyleProps & {
  /**
   * <zh/> x 坐标
   *
   * <en/> The x-coordinate of node
   */
  x?: number | string;
  /**
   * <zh/> y 坐标
   *
   * <en/> The y-coordinate of node
   */
  y?: number | string;
  /**
   * <zh/> 节点大小，快捷设置节点宽高
   *
   * <en/> The size of node, which is a shortcut to set the width and height of node
   */
  size?: Size;
  /**
   * <zh/> 主色
   *
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
  parentId?: ID;
  /**
   * <zh/> 是否收起
   *
   * <en/> Indicates whether the node is collapsed
   */
  collapsed?: boolean;
  /**
   * <zh/> 子节点实例
   *
   * <en/> The instance of the child node
   */
  childrenNode?: Node[];
  /**
   * <zh/> 子节点数据
   *
   * <en/> The data of the child node
   */
  childrenData?: NodeData[];
};

export type BaseEdgeProps = BaseElementStyleProps &
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

export type BaseComboProps = BaseElementStyleProps & {
  /**
   * <zh/> Combo 展开后的默认大小
   *
   * <en/> The default size of combo when expanded
   */
  size?: Size;
  /**
   * <zh/> Combo 收起后的默认大小
   *
   * <en/> The default size of combo when collapsed
   */
  collapsedSize?: Size;
  /**
   * <zh/> Combo 收起时的原点
   * <en/> The origin of combo when collapsed
   */
  collapsedOrigin?: Placement | [number, number];
  /**
   * <zh/> Combo 的子元素，可以是节点或者 Combo
   *
   * <en/> The children of combo, which can be nodes or combos
   */
  childrenNode?: NodeLike[];
  /**
   * <zh/> Combo 的子元素数据
   *
   * <en/> The data of the children of combo
   * @description
   * <zh/> 如果 combo 是收起状态，children 可能为空，通过 childrenData 能够获取完整的子元素数据
   *
   * <en/> If the combo is collapsed, children may be empty, and the complete child element data can be obtained through childrenData
   */
  childrenData?: NodeLikeData[];
  /**
   * <zh/> Combo 的内边距，只在展开状态下生效
   * <en/> The padding of combo, only effective when expanded
   */
  padding?: Padding;
};
