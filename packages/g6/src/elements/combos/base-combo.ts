import type { AABB, BaseStyleProps, DisplayObject, DisplayObjectConfig, Group } from '@antv/g';
import { deepMix, isEmpty } from '@antv/util';
import { COMBO_KEY } from '../../constants';
import type { BaseComboProps, NodeLike, Position, PrefixObject, STDSize } from '../../types';
import { getBBoxHeight, getBBoxWidth, getCombinedBBox, getExpandedBBox } from '../../utils/bbox';
import { getCollapsedMarkerText, getXYByCollapsedOrigin } from '../../utils/combo';
import { parsePadding } from '../../utils/padding';
import { getXYByPlacement, positionOf } from '../../utils/position';
import { subStyleProps } from '../../utils/prefix';
import { parseSize } from '../../utils/size';
import { add, divide } from '../../utils/vector';
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
   * - (children: NodeLike[]) => string: Custom function
   */
  type?: 'child-count' | 'descendant-count' | 'node-count' | ((children: NodeLike[]) => string);
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

  static defaultStyleProps: Partial<BaseComboStyleProps> = {
    childrenNode: [],
    droppable: true,
    draggable: true,
    collapsed: false,
    collapsedSize: 32,
    collapsedOrigin: [0.5, 0.5],
    collapsedMarker: true,
    collapsedMarkerFontSize: 12,
    collapsedMarkerTextAlign: 'center',
    collapsedMarkerTextBaseline: 'middle',
    collapsedMarkerType: 'child-count',
  };
  constructor(options: DisplayObjectConfig<BaseComboStyleProps>) {
    super(deepMix({}, { style: BaseCombo.defaultStyleProps }, options));
  }

  /**
   * Draw the key shape of combo
   */
  protected abstract drawKeyShape(attributes: Required<S>, container: Group): DisplayObject | undefined;

  protected calculatePosition(attributes: Required<S>): Position {
    const { x = 0, y = 0, collapsed, childrenNode = [], childrenData = [] } = attributes;

    if (childrenNode.length < childrenData.length) {
      if (childrenData.length > 0) {
        // combo 被收起，返回平均中心位置 / combo is collapsed, return the average center position
        if (collapsed) {
          const totalPosition = childrenData.reduce((acc, datum) => add(acc, positionOf(datum)), [0, 0, 0] as Position);
          return divide(totalPosition, childrenData.length);
        }
      }
      return [+x, +y, 0];
    }

    // empty combo
    if (!childrenData.length) return [+x, +y, 0];
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
    const { collapsed, childrenNode = [] } = attributes;
    if (childrenNode.length === 0) return this.getEmptyKeySize(attributes);
    return collapsed ? this.getCollapsedKeySize(attributes) : this.getExpandedKeySize(attributes);
  }

  protected getEmptyKeySize(attributes: Required<S>): STDSize {
    const { padding, collapsedSize } = attributes;
    const [top, right, bottom, left] = parsePadding(padding);
    return add(parseSize(collapsedSize), [left + right, top + bottom, 0]) as STDSize;
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
    const { childrenNode: children = [], padding } = attributes;
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
      const text = getCollapsedMarkerText(type, attributes.childrenNode || []);
      return { ...collapsedMarkerStyle, x, y, text };
    }

    return { ...collapsedMarkerStyle, x, y };
  }

  protected getComboZIndex(attributes: Required<S>): number {
    const ancestors = attributes.context?.model.getAncestorsData(this.id, COMBO_KEY) || [];
    return ancestors.length;
  }

  protected getComboStyle(attributes: Required<S>) {
    const { zIndex = this.getComboZIndex(attributes) } = attributes;
    const [x, y] = this.calculatePosition(attributes);
    return { x, y, zIndex };
  }

  public render(attributes: Required<S>, container: Group = this) {
    super.render(attributes, container);
    const { model } = attributes.context;
    const comboStyle = this.getComboStyle(attributes);
    Object.assign(this.style, comboStyle);

    // Sync combo position to model
    model.syncComboData([{ id: this.id, style: comboStyle }]);

    // collapsed marker
    this.drawCollapsedMarkerShape(attributes, container);
  }
}
