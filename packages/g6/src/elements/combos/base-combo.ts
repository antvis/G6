import type { AABB, BaseStyleProps, DisplayObject, DisplayObjectConfig, Group, TextStyleProps } from '@antv/g';
import { Text as GText } from '@antv/g';
import { deepMix, isEmpty } from '@antv/util';
import type { BaseComboProps, PrefixObject, Vector2 } from '../../types';
import { getElementsBBox, getExpandedBBox } from '../../utils/bbox';
import { getXYByCollapsedOrigin } from '../../utils/combo';
import { getXYByPosition } from '../../utils/element';
import { subStyleProps } from '../../utils/prefix';
import { parseSize } from '../../utils/size';
import type { BaseNodeStyleProps } from '../nodes';
import { BaseNode } from '../nodes';
import { Icon, Label } from '../shapes';

export type BaseComboStyleProps<KeyStyleProps extends BaseStyleProps = BaseStyleProps> = BaseComboProps &
  PrefixObject<KeyStyleProps, 'collapsed'> &
  PrefixObject<TextStyleProps, 'collapsedMarker'> &
  BaseNodeStyleProps<KeyStyleProps>;
export type ParsedBaseComboStyleProps<KeyStyleProps extends BaseStyleProps> = Required<
  BaseComboStyleProps<KeyStyleProps>
>;

export abstract class BaseCombo<
  KeyShape extends DisplayObject,
  KeyStyleProps extends BaseStyleProps = BaseStyleProps,
> extends BaseNode<KeyShape, KeyStyleProps> {
  static defaultStyleProps: BaseComboStyleProps = {
    size: 0,
    collapsed: false,
    collapsedSize: 32,
    collapsedOrigin: [0.5, 0.5],
    padding: 0,
    children: [],
    markerType: 'childCount',
    collapsedMarkerFontSize: 12,
    collapsedMarkerTextBaseline: 'middle',
    collapsedMarkerTextAlign: 'center',
  };
  constructor(options: DisplayObjectConfig<BaseComboStyleProps<KeyStyleProps>>) {
    super(deepMix({}, { style: BaseCombo.defaultStyleProps }, options));
  }

  /**
   * Draw the key shape of combo
   */
  protected abstract drawKeyShape(
    attributes: ParsedBaseComboStyleProps<KeyStyleProps>,
    container: Group,
  ): KeyShape | undefined;

  protected getKeySize(attributes: ParsedBaseComboStyleProps<KeyStyleProps>) {
    const { x: comboX, y: comboY, size, collapsed, collapsedOrigin, collapsedSize } = attributes;
    if (
      (!isEmpty(comboX) && !isEmpty(comboY) && collapsed && !isEmpty(collapsedSize)) ||
      (!isEmpty(comboX) && !isEmpty(comboY) && !collapsed && !isEmpty(size))
    ) {
      const [width, height] = parseSize(collapsed ? collapsedSize : size);
      return {
        x: 0,
        y: 0,
        width,
        height,
      };
    }

    const contentBBox = this.getContentBBox(attributes);
    let [x, y] = isEmpty(comboX) && isEmpty(comboY) ? contentBBox.center : [comboX, comboY];
    const computedExpandedSize = this.getExpandedSize(attributes);
    const computedCollapsedSize = this.getCollapsedSize(attributes);
    const [width, height] = collapsed ? computedCollapsedSize : computedExpandedSize;

    if (collapsed) {
      [x, y] = getXYByCollapsedOrigin(
        collapsedOrigin!,
        contentBBox.center,
        computedCollapsedSize,
        computedExpandedSize,
      );
    }

    return {
      x,
      y,
      width,
      height,
    };
  }

  protected abstract getCollapsedSize(attributes: ParsedBaseComboStyleProps<KeyStyleProps>): Vector2;

  protected abstract getExpandedSize(attributes: ParsedBaseComboStyleProps<KeyStyleProps>): Vector2;

  protected getContentBBox(attributes: ParsedBaseComboStyleProps<KeyStyleProps>): AABB {
    const { children, padding } = attributes;
    let childrenBBox = getElementsBBox(children!);
    if (padding) {
      childrenBBox = getExpandedBBox(childrenBBox, padding);
    }
    return childrenBBox;
  }

  protected drawCollapsedMarkerShape(attributes: ParsedBaseComboStyleProps<KeyStyleProps>, container: Group): void {
    this.upsert('collapsed-marker', GText, this.getCollapsedMarkerStyle(attributes), container);
  }

  protected getCollapsedMarkerStyle(attributes: ParsedBaseComboStyleProps<KeyStyleProps>): TextStyleProps | false {
    if (!attributes.collapsed || !attributes.markerType || attributes.markerType === 'none') return false;

    const collapsedMarkerStyle = subStyleProps(this.getGraphicStyle(attributes), 'collapsedMarker');
    const { children, markerType } = attributes;
    const text: string = markerType === 'childCount' ? children?.length.toString() || '' : '';
    const keyShape = this.getKey();
    const [x, y] = getXYByPosition(keyShape.getLocalBounds(), 'center');

    return { ...collapsedMarkerStyle, x, y, text };
  }

  public render(attributes: ParsedBaseComboStyleProps<KeyStyleProps>, container: Group = this) {
    // 1. key shape
    const keyShape = this.drawKeyShape(attributes, container);
    if (!keyShape) return;

    // 2. collapsed marker
    this.drawCollapsedMarkerShape(attributes, container);

    // 3. halo, use shape same with keyShape
    this.drawHaloShape(attributes, container);

    // 4. icon
    this.upsert('icon', Icon, this.getIconStyle(attributes), container);

    // 5. badges
    this.drawBadgeShapes(attributes, container);

    // 6. label
    this.upsert('label', Label, this.getLabelStyle(attributes), container);

    // 7. ports
    this.drawPortShapes(attributes, container);
  }
}
