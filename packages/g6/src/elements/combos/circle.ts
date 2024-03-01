import { AABB, DisplayObjectConfig, Circle as GCircle, CircleStyleProps as GCircleStyleProps, Group } from '@antv/g';
import { isEmpty, isString } from '@antv/util';
import { getXYByAnchor } from '../../utils/anchor';
import { getBBoxHeight, getBBoxWidth, getElementsBBox, getExpandedBBox } from '../../utils/bbox';
import { calculateCollapsedOrigin } from '../../utils/combo';
import { subStyleProps } from '../../utils/prefix';
import { parseSize } from '../../utils/size';
import type { BaseComboStyleProps, ParsedBaseComboStyleProps } from './base-combo';
import { BaseCombo } from './base-combo';

type KeyStyleProps = GCircleStyleProps;
export type CircleComboStyleProps = BaseComboStyleProps<KeyStyleProps>;
type ParsedCircleComboStyleProps = ParsedBaseComboStyleProps<KeyStyleProps>;
type CircleComboOptions = DisplayObjectConfig<CircleComboStyleProps>;

export class CircleCombo extends BaseCombo<GCircle, KeyStyleProps> {
  constructor(options: CircleComboOptions) {
    super(options);
  }

  protected drawKeyShape(attributes: ParsedCircleComboStyleProps, container: Group): GCircle | undefined {
    return this.upsert('key', GCircle, this.getKeyStyle(attributes), container);
  }

  protected getKeyStyle(attributes: ParsedCircleComboStyleProps): GCircleStyleProps {
    const { x: comboX, y: comboY, size, collapsed, children, padding, collapsedOrigin, collapsedSize } = attributes;
    const keyStyle = super.getKeyStyle(attributes);
    const collapsedStyle = subStyleProps(keyStyle, 'collapsed');

    // TODO：没有 children 时如何处理

    if (
      (!isEmpty(comboX) && !isEmpty(comboY) && collapsed && !isEmpty(collapsedSize)) ||
      (!isEmpty(comboX) && !isEmpty(comboY) && !collapsed && !isEmpty(size))
    ) {
      const [width, height] = this.getSize();
      const r = Math.max(width, height) / 2;
      return {
        ...keyStyle,
        ...collapsedStyle,
        cx: comboX,
        cy: comboY,
        r,
      };
    }

    const [expandedWidth, expandedHeight] = parseSize(size);
    const [collapsedWidth, collapsedHeight] = parseSize(collapsedSize);
    let childrenBBox = getElementsBBox(children);
    if (padding) {
      childrenBBox = getExpandedBBox(childrenBBox, padding);
    }
    let x = comboX || childrenBBox.center[0];
    let y = comboY || childrenBBox.center[1];
    let width = expandedWidth || getBBoxWidth(childrenBBox);
    let height = expandedHeight || getBBoxHeight(childrenBBox);
    const expandedR = Math.sqrt(width ** 2 + height ** 2) / 2;

    if (collapsed) {
      width = collapsedWidth;
      height = collapsedHeight;
    }
    const collapsedR = Math.max(width, height) / 2;

    // Adjust the position when collapsed
    if (collapsed) {
      const origin = isString(collapsedOrigin)
        ? calculateCollapsedOrigin(collapsedOrigin, collapsedR * 2, expandedR * 2)
        : collapsedOrigin;
      const expandedBBox = new AABB();
      expandedBBox.setMinMax(
        [childrenBBox.center[0] - expandedR, childrenBBox.center[1] - expandedR, 0],
        [childrenBBox.center[0] + expandedR, childrenBBox.center[1] + expandedR, 0],
      );
      x = getXYByAnchor(expandedBBox, origin)[0];
      y = getXYByAnchor(expandedBBox, origin)[1];
    }

    return {
      ...keyStyle,
      ...(!collapsed && collapsedStyle),
      cx: x,
      cy: y,
      r: collapsed ? collapsedR : expandedR,
    };
  }
}
