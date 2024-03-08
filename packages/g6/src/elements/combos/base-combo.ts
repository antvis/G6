import type { AABB, BaseStyleProps, DisplayObject, DisplayObjectConfig, Group } from '@antv/g';
import { deepMix, isEmpty } from '@antv/util';
import type { BaseComboProps, Combo, Node, Position, PrefixObject, STDSize } from '../../types';
import { getBBoxHeight, getBBoxWidth, getCombinedBBox, getExpandedBBox } from '../../utils/bbox';
import { getCollapsedMarkerText, getXYByCollapsedOrigin } from '../../utils/combo';
import { getXYByPlacement } from '../../utils/position';
import { subStyleProps } from '../../utils/prefix';
import { parseSize } from '../../utils/size';
import type { BaseNodeStyleProps } from '../nodes';
import { BaseNode } from '../nodes';
import { Icon, IconStyleProps } from '../shapes';

export type CollapsedMarkerStyleProps = IconStyleProps & {
  /**
   * <zh/> 标记类型
   * <en/> Marker type
   *
   * - 'child-count': Number of child elements
   * - 'descendant-count': Number of descendant elements (including Nodes and Combos)
   * - 'node-count': Number of descendant elements (only Nodes)
   * - (children: (Node | Combo)[]) => string: Custom function
   */
  type?: 'child-count' | 'descendant-count' | 'node-count' | ((children: (Node | Combo)[]) => string);
};
export type BaseComboStyleProps<KeyStyleProps extends BaseStyleProps = BaseStyleProps> = BaseComboProps &
  PrefixObject<KeyStyleProps, 'collapsed'> & {
    collapsedMarker?: boolean;
  } & PrefixObject<CollapsedMarkerStyleProps, 'collapsedMarker'> &
  BaseNodeStyleProps<KeyStyleProps>;
export type ParsedBaseComboStyleProps<KeyStyleProps extends BaseStyleProps> = Required<
  BaseComboStyleProps<KeyStyleProps>
>;

export abstract class BaseCombo<S extends BaseComboStyleProps = BaseComboStyleProps> extends BaseNode<S> {
  public type = 'combo';

  static defaultStyleProps: BaseComboStyleProps = {
    children: [],
    collapsed: false,
    collapsedMarker: true,
    collapsedMarkerFontSize: 12,
    collapsedMarkerTextAlign: 'center',
    collapsedMarkerTextBaseline: 'middle',
    collapsedMarkerType: 'child-count',
    collapsedOrigin: [0.5, 0.5],
    collapsedSize: 32,
    padding: 0,
    size: 0,
  };
  constructor(options: DisplayObjectConfig<BaseComboStyleProps>) {
    super(deepMix({}, { style: BaseCombo.defaultStyleProps }, options));
  }

  /**
   * Draw the key shape of combo
   */
  protected abstract drawKeyShape(attributes: Required<S>, container: Group): DisplayObject | undefined;

  protected calculatePosition(attributes: Required<S>): Position {
    const { x: comboX, y: comboY, collapsed } = attributes;

    if (!isEmpty(comboX) && !isEmpty(comboY)) return [comboX, comboY, 0] as Position;

    return !collapsed ? this.getContentBBox(attributes).center : this.getCollapsedOriginPosition(attributes);
  }

  protected getCollapsedOriginPosition(attributes: Required<S>): Position {
    return getXYByCollapsedOrigin(
      attributes.collapsedOrigin,
      this.getContentBBox(attributes).center,
      this.getCollapsedKeySize(attributes),
      this.getExpandedKeySize(attributes),
    );
  }

  protected getKeySize(attributes: Required<S>): STDSize {
    const { size, collapsed, collapsedSize } = attributes;

    if (collapsed && !isEmpty(collapsedSize)) return parseSize(collapsedSize);

    if (!collapsed && !isEmpty(size)) return parseSize(size);

    return collapsed ? this.getCollapsedKeySize(attributes) : this.getExpandedKeySize(attributes);
  }

  protected getCollapsedKeySize(attributes: Required<S>): STDSize {
    return parseSize(attributes.collapsedSize);
  }

  protected getExpandedKeySize(attributes: Required<S>): STDSize {
    if (!isEmpty(attributes.size)) return parseSize(attributes.size);

    const contentBBox = this.getContentBBox(attributes);
    return [getBBoxWidth(contentBBox), getBBoxHeight(contentBBox), 0];
  }

  protected getContentBBox(attributes: Required<S>): AABB {
    const { children = [], padding } = attributes;
    const childrenBBox = getCombinedBBox(children.map((child) => child.getBounds()));

    if (!padding) return childrenBBox;

    return getExpandedBBox(childrenBBox, padding);
  }

  protected drawCollapsedMarkerShape(attributes: Required<S>, container: Group): void {
    this.upsert('collapsed-marker', Icon, this.getCollapsedMarkerStyle(attributes), container);
  }

  protected getCollapsedMarkerStyle(attributes: Required<S>): IconStyleProps | false {
    if (!attributes.collapsed || !attributes.collapsedMarker) return false;

    const { type, ...collapsedMarkerStyle } = subStyleProps<CollapsedMarkerStyleProps>(
      this.getGraphicStyle(attributes),
      'collapsedMarker',
    );
    const keyShape = this.getKey();
    const [x, y] = getXYByPlacement(keyShape.getLocalBounds(), 'center');

    if (type) {
      const text = getCollapsedMarkerText(type, attributes.children!);
      return { ...collapsedMarkerStyle, x, y, text };
    }

    return { ...collapsedMarkerStyle, x, y };
  }

  public render(attributes: Required<S>, container: Group = this) {
    super.render(attributes, container);

    const [x, y] = this.calculatePosition(attributes);
    this.style.x = x;
    this.style.y = y;

    // collapsed marker
    this.drawCollapsedMarkerShape(attributes, container);
  }
}
