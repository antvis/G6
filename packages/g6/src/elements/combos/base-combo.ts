import type { AABB, BaseStyleProps, DisplayObject, DisplayObjectConfig, Group } from '@antv/g';
import { deepMix, isEmpty } from '@antv/util';
import type { BaseComboProps, PrefixObject, Vector2 } from '../../types';
import { getElementsBBox, getExpandedBBox } from '../../utils/bbox';
import { getCollapsedMarkerText, getXYByCollapsedOrigin } from '../../utils/combo';
import { getXYByPosition } from '../../utils/element';
import { subStyleProps } from '../../utils/prefix';
import { parseSize } from '../../utils/size';
import type { BaseNodeStyleProps } from '../nodes';
import { BaseNode } from '../nodes';
import { Icon, IconStyleProps, Label } from '../shapes';

export type CollapsedMarkerStyleProps = IconStyleProps & {
  /**
   * <zh/> 标记类型，childCount 表示子元素数量，descendantCount 表示后代元素数量, nodeCount 表示后代节点数量
   * <en/> Marker type, childCount means the number of child elements, descendantCount means the number of descendant elements, nodeCount means the number of descendant nodes
   */
  type?: 'childCount' | 'descendantCount' | 'nodeCount';
};
export type BaseComboStyleProps<KeyStyleProps extends BaseStyleProps = BaseStyleProps> = BaseComboProps &
  PrefixObject<KeyStyleProps, 'collapsed'> & {
    collapsedMarker?: boolean;
  } & PrefixObject<CollapsedMarkerStyleProps, 'collapsedMarker'> &
  BaseNodeStyleProps<KeyStyleProps>;
export type ParsedBaseComboStyleProps<KeyStyleProps extends BaseStyleProps> = Required<
  BaseComboStyleProps<KeyStyleProps>
>;

export abstract class BaseCombo<
  KeyShape extends DisplayObject,
  KeyStyleProps extends BaseStyleProps = BaseStyleProps,
> extends BaseNode<KeyShape, KeyStyleProps> {
  public type = 'combo';

  static defaultStyleProps: BaseComboStyleProps = {
    size: 0,
    collapsed: false,
    collapsedSize: 32,
    collapsedOrigin: [0.5, 0.5],
    padding: 0,
    children: [],
    collapsedMarker: true,
    collapsedMarkerType: 'childCount',
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
    this.upsert('collapsed-marker', Icon, this.getCollapsedMarkerStyle(attributes), container);
  }

  protected getCollapsedMarkerStyle(attributes: ParsedBaseComboStyleProps<KeyStyleProps>): IconStyleProps | false {
    if (!attributes.collapsed || !attributes.collapsedMarker) return false;

    const { type, ...collapsedMarkerStyle } = subStyleProps<CollapsedMarkerStyleProps>(
      this.getGraphicStyle(attributes),
      'collapsedMarker',
    );
    const keyShape = this.getKey();
    const [x, y] = getXYByPosition(keyShape.getLocalBounds(), 'center');

    if (type) {
      const text = getCollapsedMarkerText(type, attributes.children!);
      return { ...collapsedMarkerStyle, x, y, text };
    }

    return { ...collapsedMarkerStyle, x, y };
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
