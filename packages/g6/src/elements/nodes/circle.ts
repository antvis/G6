import { DisplayObjectConfig, Circle as GCircle, CircleStyleProps as GCircleStyleProps, Group } from '@antv/g';
import { deepMix } from '@antv/util';
import type { PrefixObject } from '../../types';
import type { AnchorPosition, BadgePosition, LabelPosition } from '../../types/node';
import { getAnchorPosition, getTextStyleByPosition, getXYByPosition } from '../../utils/element';
import { omitStyleProps, subStyleProps } from '../../utils/prefix';
import { BaseShape, BaseShapeStyleProps } from '../shapes';
import { Badge, BadgeStyleProps } from '../shapes/badge';
import { Icon, IconStyleProps } from '../shapes/icon';
import { Label, LabelStyleProps } from '../shapes/label';

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
    const style = this.getGraphicStyle(attributes);
    return subStyleProps<CircleStyleProps>(style, 'label') as unknown as NodeLabelStyleProps;
  }

  protected getHaloStyle(attributes: CircleStyleProps) {
    const style = this.getGraphicStyle(attributes);
    return subStyleProps<CircleStyleProps>(style, 'halo');
  }

  protected getIconStyle(attributes: CircleStyleProps) {
    return subStyleProps<CircleStyleProps>(this.getGraphicStyle(attributes), 'icon');
  }

  protected getBadgesStyle(attributes: CircleStyleProps) {
    return this.getGraphicStyle(attributes).badgeOptions || ([] as unknown as NodeBadgeStyleProps[]);
  }

  protected getAnchorsStyle(attributes: CircleStyleProps) {
    return this.getGraphicStyle(attributes).anchorOptions || ([] as unknown as NodeAnchorStyleProps[]);
  }

  public render(attributes = this.attributes as ParsedCircleStyleProps, container: Group = this) {
    // 1. key shape
    const keyShape = this.upsert('key', GCircle, this.getKeyStyle(attributes), container);
    if (!keyShape) return;

    // 2. label
    const { position, ...labelStyle } = this.getLabelStyle(attributes);
    this.upsert(
      'label',
      Label,
      {
        ...getTextStyleByPosition(keyShape.getLocalBounds(), position),
        ...labelStyle,
      },
      container,
    );

    // TODO: 3. halo
    this.upsert('halo', GCircle, this.getHaloStyle(attributes), container);

    // 4. icon
    const iconStyle = this.getIconStyle(attributes);
    const [iconX, iconY] = getXYByPosition(keyShape.getLocalBounds(), 'center');

    this.upsert(
      'icon',
      Icon,
      {
        x: iconX,
        y: iconY,
        ...iconStyle,
      } as IconStyleProps,
      container,
    );

    // 5. badges
    const badgesStyle = this.getBadgesStyle(attributes);
    badgesStyle.forEach((badgeStyle, i) => {
      const { position, ...style } = badgeStyle;
      const [x, y] = getXYByPosition(keyShape.getLocalBounds(), position);
      this.upsert(`node-circle-badge-${i}`, Badge, { x, y, ...style }, container);
    });

    // 6. anchors
    const anchorStyle = this.getAnchorsStyle(attributes);
    anchorStyle.forEach((anchorStyle, i) => {
      const { position, ...style } = anchorStyle;
      const [cx, cy] = getAnchorPosition(keyShape.getLocalBounds(), position);
      this.upsert(`node-circle-anchor-${i}`, GCircle, { cx, cy, ...style }, container);
    });
  }

  connectedCallback() {}
}
