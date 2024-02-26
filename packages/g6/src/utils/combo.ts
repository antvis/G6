import type { Combo, Node, Padding, Position } from '../types';
import { getBBoxHeight, getBBoxWidth, getElementsBBox, getExpandedBBox } from './bbox';

/**
 * <zh/> 获取 combo 的渲染尺寸
 *
 * <en/> Get the rendering size of the combo
 * @param collapsed - <zh/> 是否折叠 | <en/> Whether it is collapsed
 * @param dWidth - <zh/> 最小宽度 | <en/> Minimum width
 * @param dHeight - <zh/> 最小高度 | <en/> Minimum height
 * @param children - <zh/> 子元素集合 | <en/> Child element set
 * @param padding - <zh/> 内边距 | <en/> Padding
 * @returns <zh/> 返回渲染尺寸 | <en/> Return rendering size
 */
export function getComboRenderSize(
  collapsed: boolean,
  dWidth: number,
  dHeight: number,
  children: Record<string, Node | Combo>,
  padding?: Padding,
): { center: Position; width: number; height: number } {
  // If combo has children, calculate the size based on the children
  let childrenBBox = getElementsBBox(Object.values(children));
  const [centerX, centerY] = childrenBBox.center;

  // If combo is childless or collapsed, use the default size
  if (collapsed || Object.keys(children).length === 0) {
    childrenBBox.setMinMax(
      [centerX - dWidth / 2, centerY - dHeight / 2, 0],
      [centerX + dWidth / 2, centerY + dHeight / 2, 0],
    );
  }

  if (padding) {
    childrenBBox = getExpandedBBox(childrenBBox, padding);
  }

  return {
    center: childrenBBox.center,
    width: Math.max(dWidth, getBBoxWidth(childrenBBox)),
    height: Math.max(dHeight, getBBoxHeight(childrenBBox)),
  };
}
