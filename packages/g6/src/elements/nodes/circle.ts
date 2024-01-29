import {
  DisplayObjectConfig,
  Circle as GCircle,
  CircleStyleProps as GCircleStyleProps,
  Image as GImage,
  Text as GText,
  Group,
  ImageStyleProps,
  TextStyleProps,
} from '@antv/g';
import { deepMix } from '@antv/util';
import type { PrefixObject } from '../../types';
import type { AnchorPosition, BadgePosition, LabelPosition } from '../../types/node';
import { getAnchorPosition, getTextStyleByPosition, getXYByPosition } from '../../utils/element';
import { omitStyleProps, subStyleProps } from '../../utils/prefix';
import { BaseShape, BaseShapeStyleProps } from '../shapes';
import { Badge, BadgeStyleProps } from '../shapes/badge';
import { Label, LabelStyleProps } from '../shapes/label';

type NodeLabelStyleProps = LabelStyleProps & { position: LabelPosition };
type NodeBadgeStyleProps = BadgeStyleProps & { position: BadgePosition };
type NodeAnchorStyleProps = GCircleStyleProps & { position: AnchorPosition };
type NodeIconStyleProps = ImageStyleProps | TextStyleProps;

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

export type CircleOptions = DisplayObjectConfig<ParsedCircleStyleProps>;

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
    const style = subStyleProps<CircleStyleProps>(this.getGraphicStyle(attributes), 'icon');
    // If src exist, use G Image to draw.
    // @ts-ignore
    const defaultStyle = style.src ? { anchor: [0.5, 0.5] } : { textAlign: 'center', textBaseline: 'middle' };

    return { ...defaultStyle, ...style } as NodeIconStyleProps;
  }

  protected getBadgesStyle(attributes: CircleStyleProps) {
    return this.getGraphicStyle(attributes).badgeOptions as unknown as NodeBadgeStyleProps[];
  }

  protected getAnchorsStyle(attributes: CircleStyleProps) {
    return this.getGraphicStyle(attributes).badgeOptions as unknown as NodeAnchorStyleProps[];
  }

  public render(attributes = this.attributes as ParsedCircleStyleProps, container: Group = this) {
    // 1. key shape
    const keyShape = this.upsert('node-circle-key', GCircle, this.getKeyStyle(attributes), container);
    if (!keyShape) return;

    // 2. label
    const { position, ...labelStyle } = this.getLabelStyle(attributes);
    this.upsert(
      'node-circle-label',
      Label,
      {
        ...getTextStyleByPosition(keyShape.getLocalBounds(), position),
        ...labelStyle,
      },
      container,
    );

    // TODO: 3. halo
    this.upsert('node-circle-halo', GCircle, this.getHaloStyle(attributes), container);

    // 4. icon
    const iconStyle = this.getIconStyle(attributes);
    this.upsert(
      'node-circle-icon',
      // @ts-ignore
      iconStyle.src ? GImage : GText,
      {
        ...getTextStyleByPosition(keyShape.getLocalBounds(), 'center'),
        ...iconStyle,
      },
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
