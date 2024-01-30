import type { DisplayObjectConfig, CircleStyleProps as GCircleStyleProps, Group } from '@antv/g';
import { Circle as GCircle } from '@antv/g';
import { deepMix } from '@antv/util';
import type { PrefixObject } from '../../types';
import type { AnchorPosition, BadgePosition, LabelPosition } from '../../types/node';
import { getAnchorPosition, getTextStyleByPosition, getXYByPosition } from '../../utils/element';
import { omitStyleProps, subStyleProps } from '../../utils/prefix';
import type { BadgeStyleProps, BaseShapeStyleProps, IconStyleProps, LabelStyleProps } from '../shapes';
import { Badge, BaseShape, Icon, Label } from '../shapes';

type NodeLabelStyleProps = LabelStyleProps & { position: LabelPosition };
type NodeBadgeStyleProps = BadgeStyleProps & { position: BadgePosition };
type NodeAnchorStyleProps = GCircleStyleProps & { position: AnchorPosition };
type NodeIconStyleProps = IconStyleProps;

export type CircleStyleProps = BaseShapeStyleProps &
  // Key
  GCircleStyleProps &
  // Label
  PrefixObject<NodeLabelStyleProps, 'label'> &
  // Halo
  PrefixObject<GCircleStyleProps, 'halo'> &
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

type ParsedCircleStyleProps = Required<CircleStyleProps>;

export type CircleOptions = DisplayObjectConfig<CircleStyleProps>;

/**
 * Design document: https://www.yuque.com/antv/g6/gl1iof1xpzg6ed98
 * - key [default]
 * - label, background included
 * - halo
 * - icon
 * - badges
 * - anchors / ports
 */
export class Circle extends BaseShape<CircleStyleProps> {
  static defaultStyleProps: Partial<CircleStyleProps> = {};

  constructor(options: CircleOptions) {
    super(deepMix({}, { style: Circle.defaultStyleProps }, options));
  }

  protected getKeyStyle(attributes: CircleStyleProps) {
    const style = this.getGraphicStyle(attributes);
    return omitStyleProps<CircleStyleProps>(style, ['label', 'halo', 'icon', 'badge', 'anchor']);
  }

  protected getLabelStyle(attributes: CircleStyleProps) {
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

  protected getHaloStyle(attributes: CircleStyleProps) {
    const haloStyle = subStyleProps<CircleStyleProps>(this.getGraphicStyle(attributes), 'halo');
    const keyStyle = this.getKeyStyle(attributes);
    return {
      ...keyStyle,
      ...haloStyle,
    } as GCircleStyleProps;
  }

  protected getIconStyle(attributes: CircleStyleProps) {
    const iconStyle = subStyleProps<CircleStyleProps>(this.getGraphicStyle(attributes), 'icon');
    const keyShape = this.shapeMap.key;
    const [x, y] = getXYByPosition(keyShape.getLocalBounds(), 'center');

    return {
      x,
      y,
      ...iconStyle,
    } as IconStyleProps;
  }

  protected getBadgesStyle(attributes: CircleStyleProps): NodeBadgeStyleProps[] {
    const badgesStyle = this.getGraphicStyle(attributes).badgeOptions || [];
    const keyShape = this.shapeMap.key;

    return badgesStyle.map((badgeStyle) => {
      const { position, ...style } = badgeStyle;
      const [x, y] = getXYByPosition(keyShape.getLocalBounds(), position);
      return { x, y, ...style } as NodeBadgeStyleProps;
    });
  }

  protected getAnchorsStyle(attributes: CircleStyleProps): NodeAnchorStyleProps[] {
    const anchorStyle = this.getGraphicStyle(attributes).anchorOptions || [];
    const keyShape = this.shapeMap.key;

    return anchorStyle.map((anchorStyle) => {
      const { position, ...style } = anchorStyle;
      const [cx, cy] = getAnchorPosition(keyShape.getLocalBounds(), position);
      return { cx, cy, ...style } as NodeAnchorStyleProps;
    });
  }

  public render(attributes = this.attributes as ParsedCircleStyleProps, container: Group = this) {
    // 1. key shape
    const keyShape = this.upsert('key', GCircle, this.getKeyStyle(attributes), container);
    if (!keyShape) return;

    // 2. label
    this.upsert('label', Label, this.getLabelStyle(attributes), container);

    // 3. halo
    this.upsert('halo', GCircle, this.getHaloStyle(attributes), container);

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
      this.upsert(`anchor-${i}`, GCircle, anchorStyle, container);
    });
  }

  connectedCallback() {}
}
