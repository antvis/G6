import type { IconStyleProps } from '../elements/shapes';
import type { NodeLikeData } from './data';

export interface CollapsedMarkerStyleProps extends IconStyleProps {
  /**
   * <zh/> 标记类型
   * - 'child-count': 子元素数量
   * - 'descendant-count': 后代元素数量（包括 Node 和 Combo）
   * - 'node-count': 后代元素数量（只包括 Node）
   * - (children: NodeLikeData[]) => string: 自定义函数
   *
   * <en/> Marker type
   * - 'child-count': Number of child elements
   * - 'descendant-count': Number of descendant elements (including Nodes and Combos)
   * - 'node-count': Number of descendant elements (only Nodes)
   * - (children: NodeLikeData[]) => string: Custom function
   */
  type?: 'child-count' | 'descendant-count' | 'node-count' | ((children: NodeLikeData[]) => string);
}
