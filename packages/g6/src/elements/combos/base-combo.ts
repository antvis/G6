import type { AABB, BaseStyleProps, DisplayObject, DisplayObjectConfig, Group } from '@antv/g';
import { deepMix, isEmpty } from '@antv/util';
import type { BaseComboProps, Position, PrefixObject, STDSize } from '../../types';
import { getCombinedBBox, getExpandedBBox } from '../../utils/bbox';
import { getCollapsedMarkerText, getXYByCollapsedOrigin } from '../../utils/combo';
import { getXYByPosition } from '../../utils/element';
import { subStyleProps } from '../../utils/prefix';
import { parseSize } from '../../utils/size';
import type { BaseNodeStyleProps } from '../nodes';
import { BaseNode } from '../nodes';
import { Icon, IconStyleProps } from '../shapes';

export type CollapsedMarkerStyleProps = IconStyleProps & {
  /**
   * <zh/> 标记类型，childCount 表示子元素数量，descendantCount 表示后代元素数量, node-count 表示后代节点数量
   * <en/> Marker type, child-count means the number of child elements, descendant-count means the number of descendant elements, node-count means the number of descendant nodes
   */
  type?: 'child-count' | 'descendant-count' | 'node-count';
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
    size: 0,
    collapsed: false,
    collapsedSize: 32,
    collapsedOrigin: [0.5, 0.5],
    padding: 0,
    children: [],
    collapsedMarker: true,
    collapsedMarkerType: 'child-count',
    collapsedMarkerFontSize: 12,
    collapsedMarkerTextBaseline: 'middle',
    collapsedMarkerTextAlign: 'center',
  };
  constructor(options: DisplayObjectConfig<BaseComboStyleProps>) {
    super(deepMix({}, { style: BaseCombo.defaultStyleProps }, options));
  }

  /**
   * Draw the key shape of combo
   */
  protected abstract drawKeyShape(attributes: Required<S>, container: Group): DisplayObject | undefined;

  protected calculatePosition(attributes: Required<S>): Position {
    const { x: comboX, y: comboY, collapsed, collapsedOrigin } = attributes;
    if (!isEmpty(comboX) && !isEmpty(comboY)) return [comboX, comboY, 0] as Position;

    const contentBBox = this.getContentBBox(attributes);
    let position: Position = contentBBox.center;
    const computedExpandedSize = this.getExpandedKeySize(attributes);
    const computedCollapsedSize = this.getCollapsedKeySize(attributes);

    if (collapsed) {
      position = getXYByCollapsedOrigin(
        collapsedOrigin!,
        contentBBox.center,
        computedCollapsedSize,
        computedExpandedSize,
      );
    }

    return position;
  }

  protected getKeySize(attributes: Required<S>): STDSize {
    const { size, collapsed, collapsedSize } = attributes;

    if (collapsed && !isEmpty(collapsedSize)) return parseSize(collapsedSize);

    if (!collapsed && !isEmpty(size)) return parseSize(size);

    return collapsed ? this.getCollapsedKeySize(attributes) : this.getExpandedKeySize(attributes);
  }

  protected abstract getCollapsedKeySize(attributes: Required<S>): STDSize;

  protected abstract getExpandedKeySize(attributes: Required<S>): STDSize;

  protected getContentBBox(attributes: Required<S>): AABB {
    const { children = [], padding } = attributes;
    let childrenBBox = getCombinedBBox(children.map((child) => child.getBounds()));
    if (padding) {
      childrenBBox = getExpandedBBox(childrenBBox, padding);
    }
    return childrenBBox;
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
    const [x, y] = getXYByPosition(keyShape.getLocalBounds(), 'center');

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
