import type { DisplayObjectConfig, CircleStyleProps as GCircleStyleProps, Group } from '@antv/g';
import { Circle as GCircle } from '@antv/g';
import type { AnchorPosition, BadgePosition, LabelPosition, PrefixObject } from '../../types';
import { getAnchorPosition, getTextStyleByPosition, getXYByPosition } from '../../utils/element';
import { omitStyleProps, subStyleProps } from '../../utils/prefix';
import type { BadgeStyleProps, BaseShapeStyleProps, IconStyleProps, LabelStyleProps } from '../shapes';
import { Badge, BaseShape, Icon, Label } from '../shapes';

export type NodeLabelStyleProps = LabelStyleProps & { position: LabelPosition };
export type NodeBadgeStyleProps = BadgeStyleProps & { position: BadgePosition };
export type NodeAnchorStyleProps = GCircleStyleProps & { key?: string; position: AnchorPosition };
export type NodeIconStyleProps = IconStyleProps;

export type BaseNodeStyleProps<KT extends object> = BaseShapeStyleProps &
  // Key
  KT &
  // Label
  PrefixObject<NodeLabelStyleProps, 'label'> &
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
 * - label, background included
 * - halo
 * - icon
 * - badges
 * - anchors / ports
 */
export abstract class BaseNode<KT extends object, KS> extends BaseShape<BaseNodeStyleProps<KT>> {
  constructor(options: BaseNodeOptions<KT>) {
    super(options);
  }

  protected getKeyStyle(attributes: ParsedBaseNodeStyleProps<KT>): KT {
    const style = this.getGraphicStyle(attributes);
    return omitStyleProps(style, ['label', 'halo', 'icon', 'badge', 'anchor']);
  }

  protected getLabelStyle(attributes: ParsedBaseNodeStyleProps<KT>) {
    const { position, ...labelStyle } = subStyleProps<NodeLabelStyleProps>(
      this.getGraphicStyle(attributes),
      'label',
    ) as unknown as NodeLabelStyleProps;
    const keyShape = this.shapeMap.key;

    return {
      ...getTextStyleByPosition(keyShape.getLocalBounds(), position),
      ...labelStyle,
    } as NodeLabelStyleProps;
  }

  protected abstract getHaloStyle(attributes: ParsedBaseNodeStyleProps<KT>): KT;

  protected getIconStyle(attributes: ParsedBaseNodeStyleProps<KT>) {
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
    const badgesStyle = this.getGraphicStyle(attributes).badgeOptions || [];
    const keyShape = this.shapeMap.key;

    return badgesStyle.map((badgeStyle) => {
      const { position, ...style } = badgeStyle;
      const [x, y] = getXYByPosition(keyShape.getLocalBounds(), position);
      return { x, y, ...style } as NodeBadgeStyleProps;
    });
  }

  protected getAnchorsStyle(attributes: ParsedBaseNodeStyleProps<KT>): NodeAnchorStyleProps[] {
    const anchorStyle = this.getGraphicStyle(attributes).anchorOptions || [];
    const keyShape = this.shapeMap.key;

    return anchorStyle.map((anchorStyle) => {
      const { position, ...style } = anchorStyle;
      const [cx, cy] = getAnchorPosition(keyShape.getLocalBounds(), position);
      return { cx, cy, ...style } as NodeAnchorStyleProps;
    });
  }

  protected abstract drawKeyShape(attributes: ParsedBaseNodeStyleProps<KT>, container: Group): KS;

  public render(attributes = this.parsedAttributes, container: Group = this) {
    // 1. key shape
    const keyShape = this.drawKeyShape(attributes, container);
    if (!keyShape) return;

    // 2. label
    this.upsert('label', Label, this.getLabelStyle(attributes), container);

    // 3. halo, use shape same with keyShape
    this.upsert('halo', keyShape.constructor as any, this.getHaloStyle(attributes), container);

    // 4. icon
    this.upsert('icon', Icon, this.getIconStyle(attributes), container);

    // 5. badges
    const badgesStyle = this.getBadgesStyle(attributes);
    badgesStyle.forEach((badgeStyle, i) => {
      this.upsert(`badge-${i}`, Badge, badgeStyle, container);
    });

    // 6. anchors
    const anchorStyle = this.getAnchorsStyle(attributes);
    anchorStyle.forEach((anchorStyle, i) => {
      const { key } = anchorStyle;
      this.upsert(`anchor-${key ? key : i}`, GCircle, anchorStyle, container);
    });
  }

  connectedCallback() {}
}
