import type { BaseStyleProps, DisplayObject, DisplayObjectConfig, Group } from '@antv/g';
import { Circle as GCircle } from '@antv/g';
import { deepMix, isEmpty } from '@antv/util';
import type { CategoricalPalette } from '../../palettes/types';
import type {
  BadgePosition,
  BaseNodeProps,
  Keyframe,
  LabelPosition,
  Point,
  Port,
  PortPosition,
  PortStyleProps,
  PrefixObject,
} from '../../types';
import { getPortPosition, getTextStyleByPosition, getXYByPosition } from '../../utils/element';
import { getPaletteColors } from '../../utils/palette';
import { getRectIntersectPoint } from '../../utils/point';
import { omitStyleProps, subObject, subStyleProps } from '../../utils/prefix';
import { parseSize } from '../../utils/size';
import { getWordWrapWidthByBox } from '../../utils/text';
import type { BadgeStyleProps, IconStyleProps, LabelStyleProps } from '../shapes';
import { Badge, BaseShape, Icon, Label } from '../shapes';

export type BaseNodeStyleProps<KeyStyleProps extends BaseStyleProps = BaseNodeProps> = BaseNodeProps &
  ShapeSwitch & {
    /**
     * <zh/> 连接桩
     * <en/> Port
     */
    ports?: NodePortStyleProps[];
    /**
     * <zh/> 徽标
     * <en/> Badge
     */
    badges?: NodeBadgeStyleProps[];
    /**
     * <zh/> 徽标的背景色板
     * <en/> Badge background color palette
     */
    badgePalette?: string[] | CategoricalPalette;
  } & PrefixObject<NodeLabelStyleProps, 'label'> &
  PrefixObject<KeyStyleProps, 'halo'> &
  PrefixObject<IconStyleProps, 'icon'> &
  PrefixObject<BadgeStyleProps, 'badge'> &
  PrefixObject<PortStyleProps, 'port'>;

export type ParsedBaseNodeStyleProps<KeyStyleProps extends BaseStyleProps> = Required<
  BaseNodeStyleProps<KeyStyleProps>
>;

/**
 * Design document: https://www.yuque.com/antv/g6/gl1iof1xpzg6ed98
 *
 * The P is the StyleProps of Key Shape.
 * The KeyShape is the type of the key shape.
 */
export abstract class BaseNode<KeyShape extends DisplayObject, KeyStyleProps extends BaseStyleProps> extends BaseShape<
  BaseNodeStyleProps<KeyStyleProps>
> {
  static defaultStyleProps: BaseNodeStyleProps = {
    x: 0,
    y: 0,
    size: 32,
    port: true,
    ports: [],
    portZIndex: 2,
    portLinkToCenter: false,
    badge: true,
    badges: [],
    badgeZIndex: 3,
    halo: false,
    haloDroppable: false,
    haloLineDash: 0,
    haloLineWidth: 12,
    haloStrokeOpacity: 0.25,
    haloPointerEvents: 'none',
    haloZIndex: -1,
    icon: true,
    iconZIndex: 1,
    label: true,
    labelIsBillboard: true,
    labelMaxWidth: '200%',
    labelPosition: 'bottom',
    labelZIndex: 0,
  };

  constructor(options: DisplayObjectConfig<BaseNodeStyleProps<KeyStyleProps>>) {
    super(deepMix({}, { style: BaseNode.defaultStyleProps }, options));
  }

  protected getSize(attributes = this.parsedAttributes) {
    const { size } = attributes;
    return parseSize(size);
  }

  protected getKeyStyle(attributes: ParsedBaseNodeStyleProps<KeyStyleProps>): KeyStyleProps {
    const { color, fill, ...style } = this.getGraphicStyle(attributes);

    return Object.assign(
      { fill: color || fill },
      omitStyleProps(style, ['label', 'halo', 'icon', 'badge', 'port']),
    ) as unknown as KeyStyleProps;
  }

  protected getLabelStyle(attributes: ParsedBaseNodeStyleProps<KeyStyleProps>): false | LabelStyleProps {
    if (attributes.label === false || isEmpty(attributes.labelText)) return false;

    const { position, maxWidth, ...labelStyle } = subStyleProps<Required<NodeLabelStyleProps>>(
      this.getGraphicStyle(attributes),
      'label',
    );
    const keyShape = this.getKey();
    const keyBounds = keyShape.getLocalBounds();

    return Object.assign(
      getTextStyleByPosition(keyBounds, position),
      { wordWrapWidth: getWordWrapWidthByBox(keyBounds, maxWidth) },
      labelStyle,
    );
  }

  protected getHaloStyle(attributes: ParsedBaseNodeStyleProps<KeyStyleProps>): false | KeyStyleProps {
    if (attributes.halo === false) return false;

    const { fill, ...keyStyle } = this.getKeyStyle(attributes);
    const haloStyle = subStyleProps<KeyStyleProps>(this.getGraphicStyle(attributes), 'halo');

    return { ...keyStyle, stroke: fill, ...haloStyle };
  }

  protected getIconStyle(attributes: ParsedBaseNodeStyleProps<KeyStyleProps>): false | IconStyleProps {
    if (attributes.icon === false || isEmpty(attributes.iconText || attributes.iconSrc)) return false;

    const iconStyle = subStyleProps(this.getGraphicStyle(attributes), 'icon');
    const keyShape = this.getKey();
    const [x, y] = getXYByPosition(keyShape.getLocalBounds(), 'center');

    return { x, y, ...iconStyle };
  }

  protected getBadgesStyle(
    attributes: ParsedBaseNodeStyleProps<KeyStyleProps>,
  ): Record<string, NodeBadgeStyleProps | false> {
    const badges = subObject(this.shapeMap, 'badge-');
    const badgesShapeStyle: Record<string, NodeBadgeStyleProps | false> = {};

    Object.keys(badges).forEach((key) => {
      badgesShapeStyle[key] = false;
    });
    if (attributes.badge === false || isEmpty(attributes.badges)) return badgesShapeStyle;

    const { badges: badgeOptions = [], badgePalette, ...restAttributes } = attributes;
    const colors = getPaletteColors(badgePalette);
    const badgeStyle = subStyleProps<BadgeStyleProps>(this.getGraphicStyle(restAttributes), 'badge');

    badgeOptions.forEach((option, i) => {
      badgesShapeStyle[i] = {
        backgroundFill: colors ? colors[i % colors?.length] : undefined,
        ...badgeStyle,
        ...this.getBadgeStyle(option),
      };
    });

    return badgesShapeStyle;
  }

  protected getBadgeStyle(style: NodeBadgeStyleProps): NodeBadgeStyleProps {
    const keyShape = this.getKey();
    const { position = 'top', ...restStyle } = style;
    const textStyle = getTextStyleByPosition(keyShape.getLocalBounds(), position, true);
    return { ...textStyle, ...restStyle };
  }

  protected getPortsStyle(attributes: ParsedBaseNodeStyleProps<KeyStyleProps>): Record<string, PortStyleProps | false> {
    const ports = this.getPorts();
    const portsShapeStyle: Record<string, PortStyleProps | false> = {};

    Object.keys(ports).forEach((key) => {
      portsShapeStyle[key] = false;
    });

    if (attributes.port === false || isEmpty(attributes.ports)) return portsShapeStyle;

    const portStyle = subStyleProps<PortStyleProps>(this.getGraphicStyle(attributes), 'port');
    const { ports: portOptions = [] } = attributes;

    portOptions.forEach((option, i) => {
      const [cx, cy] = this.getPortXY(attributes, option);
      portsShapeStyle[option.key || i] = Object.assign({}, portStyle, { cx, cy }, option);
    });
    return portsShapeStyle;
  }

  protected getPortXY(attributes: ParsedBaseNodeStyleProps<KeyStyleProps>, style: NodePortStyleProps): Point {
    const { position = 'left' } = style;
    const bounds = this.getKey().getLocalBounds();
    return getPortPosition(bounds, position as PortPosition);
  }

  /**
   * Get the key shape for the node.
   * @returns Key shape.
   */
  public getKey(): KeyShape {
    return this.shapeMap.key as KeyShape;
  }

  /**
   * Get the ports for the node.
   * @returns Ports shape map.
   */
  public getPorts(): Record<string, Port> {
    return subObject(this.shapeMap, 'port-');
  }

  /**
   * Get the center point of the node.
   * @returns The center point of the node.
   */
  public getCenter(): Point {
    return this.getKey().getBounds().center;
  }

  /**
   * Get the point on the outer contour of the node that is the intersection with a line starting in the center the ending in the point `p`.
   * @param point - The point to intersect with the node.
   * @returns The intersection point.
   */
  public getIntersectPoint(point: Point): Point {
    const keyShapeBounds = this.getKey().getBounds();
    return getRectIntersectPoint(point, keyShapeBounds);
  }

  protected drawHaloShape(attributes: ParsedBaseNodeStyleProps<KeyStyleProps>, container: Group): void {
    const keyShape = this.getKey();
    this.upsert(
      'halo',
      keyShape.constructor as new (...args: unknown[]) => KeyShape,
      this.getHaloStyle(attributes),
      container,
    );
  }

  protected drawBadgeShapes(attributes: ParsedBaseNodeStyleProps<KeyStyleProps>, container: Group): void {
    const badgesStyle = this.getBadgesStyle(attributes);
    Object.keys(badgesStyle).forEach((key) => {
      this.upsert(`badge-${key}`, Badge, badgesStyle[key], container);
    });
  }

  protected drawPortShapes(attributes: ParsedBaseNodeStyleProps<KeyStyleProps>, container: Group): void {
    const portsStyle = this.getPortsStyle(attributes);
    Object.keys(portsStyle).forEach((key) => {
      this.upsert(`port-${key}`, GCircle, portsStyle[key], container);
    });
  }

  protected abstract drawKeyShape(
    attributes: ParsedBaseNodeStyleProps<KeyStyleProps>,
    container: Group,
  ): KeyShape | undefined;

  public render(attributes = this.parsedAttributes, container: Group = this) {
    // 1. key shape
    const keyShape = this.drawKeyShape(attributes, container);
    if (!keyShape) return;

    // 2. halo, use shape same with keyShape
    this.drawHaloShape(attributes, container);

    // 3. icon
    this.upsert('icon', Icon, this.getIconStyle(attributes), container);

    // 4. badges
    this.drawBadgeShapes(attributes, container);

    // 5. label
    this.upsert('label', Label, this.getLabelStyle(attributes), container);

    // 6. ports
    this.drawPortShapes(attributes, container);
  }

  animate(keyframes: Keyframe[], options?: number | KeyframeAnimationOptions) {
    const result = super.animate(keyframes, options);

    if (result) {
      result.onframe = () => {
        this.drawBadgeShapes(this.parsedAttributes, this);
      };
    }

    return result;
  }
}

type NodeLabelStyleProps = LabelStyleProps & {
  /**
   * Position relative to the node (keyShape).
   */
  position?: LabelPosition;
  /**
   * The max width of the label, relative to the node width. The value can be a number or a percentage string:
   * If the value is a number, it will be treated as the pixel value.
   * If the value is a percentage string, it will be treated as the percentage of the node width.
   */
  maxWidth?: string | number;
};

type NodeBadgeStyleProps = BadgeStyleProps & {
  /**
   * Position relative to the node (keyShape).
   */
  position?: BadgePosition;
};

export type NodePortStyleProps = Partial<PortStyleProps> & {
  /**
   * The key of the port. Default is the index of the port.
   */
  key?: string;
  /**
   * The position of the port relative to the node (keyShape). The value can be a string or a tuple of two numbers.
   * If the value is a string, it will be treated as the position direction.
   * If the value is a tuple of two numbers, it will be treated as the position coordinates(0 ~ 1).
   */
  position: string | [number, number];
};

type ShapeSwitch = {
  label?: boolean;
  halo?: boolean;
  icon?: boolean;
  badge?: boolean;
  port?: boolean;
};
