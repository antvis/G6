import type { IconStyleProps } from '../elements/shapes';
import type { NodeLikeData } from './data';

/**
 * <zh/> 组合收起时显示的标记样式配置项
 *
 * <en/> Style properties of the marker displayed when the combo is collapsed
 */
export interface CollapsedMarkerStyleProps extends IconStyleProps {
  /**
   * <zh/> 组合收起时显示的标记类型
   * - `'child-count'`: 子元素数量（包括 Node 和 Combo）
   * - `'descendant-count'`: 后代元素数量（包括 Node 和 Combo）
   * - `'node-count'`: 后代元素数量（只包括 Node）
   * - `(children: NodeLikeData[]) => string`: 自定义处理逻辑
   *
   * <en/> The type of marker displayed when the combo is collapsed
   * - `'child-count'`: Number of child elements (including Nodes and Combos)
   * - `'descendant-count'`: Number of descendant elements (including Nodes and Combos)
   * - `'node-count'`: Number of descendant elements (only Nodes)
   * - `(children: NodeLikeData[]) => string`: Custom processing logic
   */
  type?: 'child-count' | 'descendant-count' | 'node-count' | ((children: NodeLikeData[]) => string);
}
