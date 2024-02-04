import type { DisplayObjectConfig, CircleStyleProps as GCircleStyleProps, Group } from '@antv/g';
import { Circle as GCircle } from '@antv/g';
import { deepMix, isEmpty } from '@antv/util';
import type { BadgePosition, LabelPosition, Point, PrefixObject } from '../../types';
import { getAnchorPosition, getTextStyleByPosition, getXYByPosition } from '../../utils/element';
import { getRectIntersectPoint } from '../../utils/point';
import { omitStyleProps, subObject, subStyleProps } from '../../utils/prefix';
import { getWordWrapWidthByBox } from '../../utils/text';
import type { BadgeStyleProps, BaseShapeStyleProps, IconStyleProps, LabelStyleProps } from '../shapes';
import { Badge, BaseShape, Icon, Label } from '../shapes';

export type NodeLabelStyleProps = LabelStyleProps & { position: LabelPosition; maxWidth: string | number };
export type NodeBadgeStyleProps = BadgeStyleProps & { position: BadgePosition };
export type NodeAnchorStyleProps = GCircleStyleProps & { key?: string; position: string | [number, number] };
export type NodeIconStyleProps = IconStyleProps;

export type BaseNodeStyleProps<KT extends object> = BaseShapeStyleProps &
  // Key
  KT & {
    // Whether to show the blocks.
    label?: boolean;
    halo?: boolean;
    icon?: boolean;
    badge?: boolean;
    anchor?: boolean;
  } & PrefixObject<NodeLabelStyleProps, 'label'> & // Label
  // Halo
  PrefixObject<KT, 'halo'> &
  // Icon
  PrefixObject<NodeIconStyleProps, 'icon'> &
  // Badge
  PrefixObject<
    {
      options: NodeBadgeStyleProps[];
    },
    'badge'
  > &
  // Anchor
  PrefixObject<
    {
      options: NodeAnchorStyleProps[];
    },
    'anchor'
  >;

type ParsedBaseNodeStyleProps<KT extends object> = Required<BaseNodeStyleProps<KT>>;

type BaseNodeOptions<KT extends object> = DisplayObjectConfig<BaseNodeStyleProps<KT>>;

/**
 * Design document: https://www.yuque.com/antv/g6/gl1iof1xpzg6ed98
 * - key [default]
 * - halo
 * - icon
 * - badges
 * - label, background included
 * - anchors / ports
 */
export abstract class BaseNode<KT extends object, KS> extends BaseShape<BaseNodeStyleProps<KT>> {
  static defaultStyleProps: BaseNodeStyleProps<BaseShapeStyleProps> = {
    labelMaxWidth: '200%',
    halo: false,
    haloFill: 'none',
    haloPointerEvents: 'none',
    haloOpacity: 0.25,
    haloLineWidth: 12,
  };

  constructor(options: BaseNodeOptions<KT>) {
    super(deepMix({}, { style: BaseNode.defaultStyleProps }, options));
  }

  protected getKeyStyle(attributes: ParsedBaseNodeStyleProps<KT>): KT {
    const style = this.getGraphicStyle(attributes);
    return omitStyleProps(style, ['label', 'halo', 'icon', 'badge', 'anchor']);
  }

  protected getLabelStyle(attributes: ParsedBaseNodeStyleProps<KT>) {
    if (attributes.label === false || isEmpty(attributes.labelText)) return false;

    const { position, maxWidth, ...labelStyle } = subStyleProps<NodeLabelStyleProps>(
      this.getGraphicStyle(attributes),
      'label',
    ) as unknown as NodeLabelStyleProps;
    const keyShape = this.shapeMap.key;

    return {
      ...getTextStyleByPosition(keyShape.getLocalBounds(), position),
      wordWrapWidth: getWordWrapWidthByBox(keyShape.getLocalBounds(), maxWidth),
      ...labelStyle,
    } as NodeLabelStyleProps;
  }

  protected abstract getHaloStyle(attributes: ParsedBaseNodeStyleProps<KT>): KT | false;

  protected getIconStyle(attributes: ParsedBaseNodeStyleProps<KT>) {
    if (attributes.icon === false || isEmpty(attributes.iconText || attributes.iconSrc)) return false;

    const iconStyle = subStyleProps(this.getGraphicStyle(attributes), 'icon');
    const keyShape = this.shapeMap.key;
    const [x, y] = getXYByPosition(keyShape.getLocalBounds(), 'center');

    return {
      x,
      y,
      ...iconStyle,
    } as IconStyleProps;
  }

  protected getBadgesStyle(attributes: ParsedBaseNodeStyleProps<KT>): NodeBadgeStyleProps[] {
    if (attributes.badge === false) return [];

    const badgesStyle = this.getGraphicStyle(attributes).badgeOptions || [];
    const keyShape = this.shapeMap.key;

    return badgesStyle.map((badgeStyle) => {
      const { position, ...style } = badgeStyle;
      const textStyle = getTextStyleByPosition(keyShape.getLocalBounds(), position);
      return { ...textStyle, ...style } as NodeBadgeStyleProps;
    });
  }

  protected getAnchorsStyle(attributes: ParsedBaseNodeStyleProps<KT>): NodeAnchorStyleProps[] {
    if (attributes.anchor === false) return [];

    const anchorStyle = this.getGraphicStyle(attributes).anchorOptions || [];
    const keyShape = this.shapeMap.key;

    return anchorStyle.map((anchorStyle) => {
      const { position, ...style } = anchorStyle;
      const [cx, cy] = getAnchorPosition(keyShape.getLocalBounds(), position as any);
      return { cx, cy, ...style } as NodeAnchorStyleProps;
    });
  }

  /**
   * Get the anchors for the node.
   * @returns Anchors shape map.
   */
  public getAnchors(): Record<string, GCircle> {
    return subObject(this.shapeMap, 'anchor-');
  }

  /**
   * Get the center point of the node.
   * @returns The center point of the node.
   */
  public getCenter(): Point {
    return this.shapeMap.key.getBounds().center;
  }

  /**
   * Whether the point is intersected with the node.
   * @param point - The point to intersect with the node.
   * @returns boolean
   */
  public getIntersectPoint(point: Point): Point {
    const keyShapeBounds = this.shapeMap.key.getBounds();
    return getRectIntersectPoint(point, keyShapeBounds);
  }

  protected abstract drawKeyShape(attributes: ParsedBaseNodeStyleProps<KT>, container: Group): KS;

  public render(attributes = this.parsedAttributes, container: Group = this) {
    /**
     * The order of rendering is important, the later one will cover the previous one.
     * const NODE_INDEX = {
     *   KEY: 1,
     *   HALO: 2,
     *   ICON: 3,
     *   BADGE: 4,
     *   LABEL: 5,
     *   ANCHOR: 6,
     * };
     */

    // 1. key shape
    const keyShape = this.drawKeyShape(attributes, container);
    if (!keyShape) return;

    // 2. halo, use shape same with keyShape
    this.upsert('halo', keyShape.constructor as any, this.getHaloStyle(attributes), container);

    // 3. icon
    this.upsert('icon', Icon, this.getIconStyle(attributes), container);

    // 4. badges
    const badgesStyle = this.getBadgesStyle(attributes);
    badgesStyle.forEach((badgeStyle, i) => {
      this.upsert(`badge-${i}`, Badge, badgeStyle, container);
    });

    // 5. label
    this.upsert('label', Label, this.getLabelStyle(attributes), container);

    // 6. anchors
    const anchorStyle = this.getAnchorsStyle(attributes);
    anchorStyle.forEach((anchorStyle, i) => {
      const { key } = anchorStyle;
      this.upsert(`anchor-${key ? key : i}`, GCircle, anchorStyle, container);
    });
  }

  connectedCallback() {}
}
