import type { AABB, BaseStyleProps, DisplayObject, DisplayObjectConfig, Group } from '@antv/g';
import { deepMix, isEmpty, isFunction } from '@antv/util';
import { COMBO_KEY } from '../../constants';
import type { BaseComboProps, NodeLikeData, Position, PrefixObject, STDSize } from '../../types';
import { getBBoxHeight, getBBoxWidth, getCombinedBBox, getExpandedBBox } from '../../utils/bbox';
import { getXYByCollapsedOrigin } from '../../utils/combo';
import { idOf } from '../../utils/id';
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
   * - (children: NodeLikeData[]) => string: Custom function
   */
  type?: 'child-count' | 'descendant-count' | 'node-count' | ((children: NodeLikeData[]) => string);
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
    collapsedMarkerZIndex: 1,
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

    const style = { ...collapsedMarkerStyle, x, y };

    if (type) {
      const text = this.getCollapsedMarkerText(type, attributes);
      Object.assign(style, { text });
    }

    return style;
  }

  protected getCollapsedMarkerText(type: CollapsedMarkerStyleProps['type'], attributes: Required<S>): string {
    const { context, childrenData = [] } = attributes;
    if (!context) return '';
    const { model } = context;

    if (type === 'descendant-count') return model.getDescendantsData(this.id).length.toString();
    if (type === 'child-count') return childrenData.length.toString();
    if (type === 'node-count')
      return model
        .getDescendantsData(this.id)
        .filter((datum) => model.getElementType(idOf(datum)) === 'node')
        .length.toString();
    if (isFunction(type)) return type(childrenData);
    return '';
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
    const comboStyle = this.getComboStyle(attributes);
    Object.assign(this.style, comboStyle);

    // Sync combo position to model
    attributes.context?.model.syncComboDatum({ id: this.id, style: comboStyle });

    // collapsed marker
    this.drawCollapsedMarkerShape(attributes, container);
  }

  /**
   * <zh/> 在元素完成创建并执行完入场动画后调用
   *
   * <en/> Called after the element is created and the entrance animation is completed
   * @override
   */
  public onCreate() {}

  /**
   * <zh/> 在元素更新并执行完过渡动画后调用
   *
   * <en/> Called after the element is updated and the transition animation is completed
   * @override
   */
  public onUpdate() {}

  /**
   * <zh/> 在元素完成退场动画并销毁后调用
   *
   * <en/> Called after the element completes the exit animation and is destroyed
   * @override
   */
  public onDestroy() {}
}
