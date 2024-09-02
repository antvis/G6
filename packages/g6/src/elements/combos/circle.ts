import type { DisplayObjectConfig, CircleStyleProps as GCircleStyleProps } from '@antv/g';
import { Circle as GCircle, Group } from '@antv/g';
import type { Point, STDSize } from '../../types';
import { getBBoxSize } from '../../utils/bbox';
import { getEllipseIntersectPoint } from '../../utils/point';
import { subStyleProps } from '../../utils/prefix';
import { parseSize } from '../../utils/size';
import type { BaseComboStyleProps } from './base-combo';
import { BaseCombo } from './base-combo';

/**
 * <zh/> 圆形组合样式配置项
 *
 * <en/> Circle combo style props
 */
export interface CircleComboStyleProps extends BaseComboStyleProps {}

/**
 * <zh/> 圆形组合
 *
 * <en/> Circle combo
 */
export class CircleCombo extends BaseCombo<CircleComboStyleProps> {
  constructor(options: DisplayObjectConfig<CircleComboStyleProps>) {
    super(options);
  }

  protected drawKeyShape(attributes: Required<CircleComboStyleProps>, container: Group): GCircle | undefined {
    return this.upsert('key', GCircle, this.getKeyStyle(attributes), container);
  }

  protected getKeyStyle(attributes: Required<CircleComboStyleProps>): GCircleStyleProps {
    const { collapsed } = attributes;
    const keyStyle = super.getKeyStyle(attributes);

    const [width] = this.getKeySize(attributes);
    return {
      ...keyStyle,
      ...(collapsed && subStyleProps(keyStyle, 'collapsed')),
      r: width / 2,
    };
  }

  protected getCollapsedKeySize(attributes: Required<CircleComboStyleProps>): STDSize {
    const [collapsedWidth, collapsedHeight] = parseSize(attributes.collapsedSize);
    const collapsedR = Math.max(collapsedWidth, collapsedHeight) / 2;
    return [collapsedR * 2, collapsedR * 2, 0];
  }

  protected getExpandedKeySize(attributes: Required<CircleComboStyleProps>): STDSize {
    const contentBBox = this.getContentBBox(attributes);
    const [width, height] = getBBoxSize(contentBBox);
    const expandedR = Math.sqrt(width ** 2 + height ** 2) / 2;
    return [expandedR * 2, expandedR * 2, 0];
  }

  public getIntersectPoint(point: Point, useExtendedLine = false): Point {
    const keyShapeBounds = this.getShape('key').getBounds();
    return getEllipseIntersectPoint(point, keyShapeBounds, useExtendedLine);
  }
}
