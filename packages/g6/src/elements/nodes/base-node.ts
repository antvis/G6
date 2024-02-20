import type { DisplayObject, DisplayObjectConfig, Group } from '@antv/g';
import { Circle as GCircle } from '@antv/g';
import { deepMix, isEmpty } from '@antv/util';
import type {
  BadgePosition,
  BaseNodeProps,
  ExtractGShapeStyleProps,
  Keyframe,
  LabelPosition,
  Point,
  Port,
  PortPosition,
  PortStyleProps,
  PrefixObject,
} from '../../types';
import { getPortPosition, getTextStyleByPosition, getXYByPosition } from '../../utils/element';
import { getRectIntersectPoint } from '../../utils/point';
import { omitStyleProps, subObject, subStyleProps } from '../../utils/prefix';
import { getWordWrapWidthByBox } from '../../utils/text';
import type { BadgeStyleProps, BaseShapeStyleProps, IconStyleProps, LabelStyleProps } from '../shapes';
import { Badge, BaseShape, Icon, Label } from '../shapes';

type NodeLabelStyleProps = LabelStyleProps & { position?: LabelPosition; maxWidth?: string | number };

type NodeBadgeStyleProps = BadgeStyleProps & { position?: BadgePosition };
type NodeBadgesStyleProps = {
  badges?: NodeBadgeStyleProps[];
} & PrefixObject<BadgeStyleProps, 'badge'>;

export type NodePortStyleProps = Partial<PortStyleProps> & {
  key?: string;
  position: string | [number, number];
};
type NodePortsStyleProps = {
  ports?: NodePortStyleProps[];
} & PrefixObject<PortStyleProps, 'port'>;

type NodeIconStyleProps = IconStyleProps;

export type BaseNodeStyleProps<P extends object> = BaseShapeStyleProps &
  P & {
    // Whether to show the blocGShape.
    label?: boolean;
    halo?: boolean;
    icon?: boolean;
    badge?: boolean;
    port?: boolean;
  } & PrefixObject<NodeLabelStyleProps, 'label'> & // Label
  // Halo
  PrefixObject<P, 'halo'> &
  // Icon
  PrefixObject<NodeIconStyleProps, 'icon'> &
  // Badges
  NodeBadgesStyleProps &
  // Ports
  NodePortsStyleProps;

export type ParsedBaseNodeStyleProps<P extends object> = Required<BaseNodeStyleProps<P>>;

type BaseNodeOptions<P extends object> = DisplayObjectConfig<BaseNodeStyleProps<P>>;

/**
 * Design document: https://www.yuque.com/antv/g6/gl1iof1xpzg6ed98
 * - key [default]
 * - halo
 * - icon
 * - badges
 * - label, background included
 * - ports
 */
export abstract class BaseNode<
  P extends BaseNodeProps<object>,
  GSHAPE extends DisplayObject<any, any>,
> extends BaseShape<BaseNodeStyleProps<P>> {
  static defaultStyleProps: BaseNodeStyleProps<any> = {
    x: 0,
    y: 0,
    z: 0,
    width: 32,
    height: 32,
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
    iconHeight: 20,
    iconWidth: 20,
    iconZIndex: 1,
    label: true,
    labelIsBillboard: true,
    labelMaxWidth: '200%',
    labelPosition: 'bottom',
    labelZIndex: 0,
  };

  constructor(options: BaseNodeOptions<P>) {
    super(deepMix({}, { style: BaseNode.defaultStyleProps }, options));
  }

  protected getKeyStyle(attributes: ParsedBaseNodeStyleProps<P>): ExtractGShapeStyleProps<GSHAPE> {
    const { color, ...style } = this.getGraphicStyle(attributes);

    return Object.assign(
      { fill: color },
      omitStyleProps(style, ['label', 'halo', 'icon', 'badge', 'port']),
    ) as ExtractGShapeStyleProps<GSHAPE>;
  }

  protected getLabelStyle(attributes: ParsedBaseNodeStyleProps<P>): false | LabelStyleProps {
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

  protected getHaloStyle(attributes: ParsedBaseNodeStyleProps<P>): false | P {
    if (attributes.halo === false) return false;

    const keyStyle = this.getKeyStyle(attributes);
    const haloStyle = subStyleProps<P>(this.getGraphicStyle(attributes), 'halo');

    return { ...keyStyle, ...haloStyle };
  }

  protected getIconStyle(attributes: ParsedBaseNodeStyleProps<P>): false | IconStyleProps {
    if (attributes.icon === false || isEmpty(attributes.iconText || attributes.iconSrc)) return false;

    const iconStyle = subStyleProps(this.getGraphicStyle(attributes), 'icon');
    const keyShape = this.getKey();
    const [x, y] = getXYByPosition(keyShape.getLocalBounds(), 'center');

    return {
      x,
      y,
      ...iconStyle,
    };
  }

  protected getBadgesStyle(attributes: ParsedBaseNodeStyleProps<P>): Record<string, NodeBadgeStyleProps | false> {
    const badges = subObject(this.shapeMap, 'badge-');
    const badgesShapeStyle: Record<string, NodeBadgeStyleProps | false> = {};

    Object.keys(badges).forEach((key) => {
      badgesShapeStyle[key] = false;
    });
    if (attributes.badge === false || isEmpty(attributes.badges)) return badgesShapeStyle;

    const badgeStyle = subStyleProps<P>(this.getGraphicStyle(attributes), 'badge');
    const { badges: badgeOptions = [] } = attributes;

    badgeOptions.forEach((option, i) => {
      badgesShapeStyle[i] = { ...badgeStyle, ...this.getBadgeStyle(option) };
    });

    return badgesShapeStyle;
  }

  protected getBadgeStyle(style: NodeBadgeStyleProps): NodeBadgeStyleProps {
    const keyShape = this.getKey();
    const { position = 'top', ...restStyle } = style;
    const textStyle = getTextStyleByPosition(keyShape.getLocalBounds(), position, true);
    return { ...textStyle, ...restStyle };
  }

  protected getPortsStyle(attributes: ParsedBaseNodeStyleProps<P>): Record<string, PortStyleProps | false> {
    const ports = this.getPorts();
    const portsShapeStyle: Record<string, PortStyleProps | false> = {};

    Object.keys(ports).forEach((key) => {
      portsShapeStyle[key] = false;
    });

    if (attributes.port === false || isEmpty(attributes.ports)) return portsShapeStyle;

    const portStyle = subStyleProps<P>(this.getGraphicStyle(attributes), 'port');
    const { ports: portOptions = [] } = attributes;

    portOptions.forEach((option, i) => {
      portsShapeStyle[option.key || i] = {
        ...portStyle,
        ...this.getPortStyle(attributes, option),
      };
    });
    return portsShapeStyle;
  }

  protected getPortStyle(attributes: ParsedBaseNodeStyleProps<P>, style: NodePortStyleProps): PortStyleProps {
    const { position = 'left', width = 8, height = 8, ...restStyle } = style;
    const bounds = this.getKey().getLocalBounds();
    const r = Math.min(width, height) / 2;
    const [cx, cy] = getPortPosition(bounds, position as PortPosition);
    return Object.assign({ cx, cy, r }, restStyle);
  }

  /**
   * Get the key shape for the node.
   * @returns Key shape.
   */
  public getKey(): GSHAPE {
    return this.shapeMap.key as GSHAPE;
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

  protected drawHaloShape(attributes: ParsedBaseNodeStyleProps<P>, container: Group): void {
    const keyShape = this.getKey();
    this.upsert(
      'halo',
      keyShape.constructor as new (...args: unknown[]) => GSHAPE,
      this.getHaloStyle(attributes),
      container,
    );
  }

  protected drawBadgeShapes(attributes: ParsedBaseNodeStyleProps<P>, container: Group): void {
    const badgesStyle = this.getBadgesStyle(attributes);
    Object.keys(badgesStyle).forEach((key) => {
      this.upsert(`badge-${key}`, Badge, badgesStyle[key], container);
    });
  }

  protected drawPortShapes(attributes: ParsedBaseNodeStyleProps<P>, container: Group): void {
    const portsStyle = this.getPortsStyle(attributes);
    Object.keys(portsStyle).forEach((key) => {
      this.upsert(`port-${key}`, GCircle, portsStyle[key], container);
    });
  }

  protected abstract drawKeyShape(attributes: ParsedBaseNodeStyleProps<P>, container: Group): GSHAPE | undefined;

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

  connectedCallback() {}
}
