import type { DisplayObject, DisplayObjectConfig, Group } from '@antv/g';
import { Circle as GCircle } from '@antv/g';
import { deepMix, isEmpty } from '@antv/util';
import type { CategoricalPalette } from '../../palettes/types';
import type { NodeData } from '../../spec';
import type {
  BadgePlacement,
  BaseElementStyleProps,
  ID,
  Keyframe,
  LabelPlacement,
  Node,
  Placement,
  Point,
  Port,
  PortPlacement,
  PortStyleProps,
  PrefixObject,
  Size,
} from '../../types';
import { getPortXYByPlacement, getTextStyleByPlacement, isSimplePort } from '../../utils/element';
import { getPaletteColors } from '../../utils/palette';
import { getRectIntersectPoint } from '../../utils/point';
import { getXYByPlacement } from '../../utils/position';
import { omitStyleProps, subObject, subStyleProps } from '../../utils/prefix';
import { parseSize } from '../../utils/size';
import { getWordWrapWidthByBox } from '../../utils/text';
import type { BadgeStyleProps, IconStyleProps, LabelStyleProps } from '../shapes';
import { Badge, BaseShape, Icon, Label } from '../shapes';

export type BaseNodeStyleProps<T extends Record<string, unknown> = Record<string, any>> = T &
  BaseElementStyleProps &
  PrefixObject<NodeLabelStyleProps, 'label'> &
  PrefixObject<T, 'halo'> &
  PrefixObject<IconStyleProps, 'icon'> &
  PrefixObject<BadgeStyleProps, 'badge'> &
  PrefixObject<PortStyleProps, 'port'> & {
    /**
     * <zh/> x 坐标
     *
     * <en/> The x-coordinate of node
     */
    x?: number | string;
    /**
     * <zh/> y 坐标
     *
     * <en/> The y-coordinate of node
     */
    y?: number | string;
    /**
     * <zh/> z 坐标
     *
     * <en/> The z-coordinate of node
     */
    z?: number;
    /**
     * <zh/> 节点大小，快捷设置节点宽高
     *
     * <en/> The size of node, which is a shortcut to set the width and height of node
     */
    size?: Size;
    /**
     * @deprecated
     * <zh/> 解决类型 style.getPropertyValue 问题，不要使用该属性
     *
     * <en/> Solve the problem of style.getPropertyValue, do not use this property
     * @remarks
     * <zh/> 移除该属性会导致 Polygon 及其子类与 Node 不兼容
     *
     * <en/> Removing this property will cause Polygon and its subclasses to be incompatible with Node
     * @ignore
     */
    points?: ([number, number] | [number, number, number])[];
    /**
     * <zh/> 父节点 id
     * <en/> The id of the parent node/combo
     */
    parentId?: ID;
    /**
     * <zh/> 是否收起
     *
     * <en/> Indicates whether the node is collapsed
     */
    collapsed?: boolean;
    /**
     * <zh/> 子节点实例
     *
     * <en/> The instance of the child node
     */
    childrenNode?: Node[];
    /**
     * <zh/> 子节点数据
     *
     * <en/> The data of the child node
     */
    childrenData?: NodeData[];
    /**
     * <zh/> 是否显示节点标签
     *
     * <en/> Whether to show the node label
     */
    label?: boolean;
    /**
     * <zh/> 是否显示节点光环
     *
     * <en/> Whether to show the node halo
     */
    halo?: boolean;
    /**
     * <zh/> 是否显示节点图标
     *
     * <en/> Whether to show the node icon
     */
    icon?: boolean;
    /**
     * <zh/> 是否显示节点徽标
     *
     * <en/> Whether to show the node badge
     */
    badge?: boolean;
    /**
     * <zh/> 是否显示连接桩
     *
     * <en/> Whether to show the node port
     */
    port?: boolean;
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
  };

/**
 * Design document: https://www.yuque.com/antv/g6/gl1iof1xpzg6ed98
 *
 * The P is the StyleProps of Key Shape.
 * The KeyShape is the type of the key shape.
 */
export abstract class BaseNode<S extends BaseNodeStyleProps = BaseNodeStyleProps> extends BaseShape<S> {
  public type = 'node';

  static defaultStyleProps: Partial<BaseNodeStyleProps> = {
    x: 0,
    y: 0,
    size: 24,
    droppable: true,
    draggable: true,
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
    labelPlacement: 'bottom',
    labelWordWrap: false,
    labelZIndex: 0,
  };

  constructor(options: DisplayObjectConfig<S>) {
    super(deepMix({}, { style: BaseNode.defaultStyleProps }, options));
  }

  public get parsedAttributes() {
    return this.attributes as Required<S>;
  }

  protected getSize(attributes = this.attributes) {
    const { size } = attributes;
    return parseSize(size);
  }

  protected getKeyStyle(attributes: Required<S>) {
    const style = this.getGraphicStyle(attributes);

    return Object.assign(omitStyleProps(style, ['label', 'halo', 'icon', 'badge', 'port'])) as any;
  }

  protected getLabelStyle(attributes: Required<S>): false | LabelStyleProps {
    if (attributes.label === false || isEmpty(attributes.labelText)) return false;

    const { placement, maxWidth, ...labelStyle } = subStyleProps<Required<NodeLabelStyleProps>>(
      this.getGraphicStyle(attributes),
      'label',
    );
    const keyShape = this.getKey();
    const keyBounds = keyShape.getLocalBounds();

    return Object.assign(
      getTextStyleByPlacement(keyBounds, placement),
      { wordWrapWidth: getWordWrapWidthByBox(keyBounds, maxWidth) },
      labelStyle,
    );
  }

  protected getHaloStyle(attributes: Required<S>) {
    if (attributes.halo === false) return false;

    const { fill, ...keyStyle } = this.getKeyStyle(attributes);
    const haloStyle = subStyleProps(this.getGraphicStyle(attributes), 'halo');

    return { ...keyStyle, stroke: fill, ...haloStyle } as any;
  }

  protected getIconStyle(attributes: Required<S>): false | IconStyleProps {
    if (attributes.icon === false || isEmpty(attributes.iconText || attributes.iconSrc)) return false;

    const iconStyle = subStyleProps(this.getGraphicStyle(attributes), 'icon');
    const keyShape = this.getKey();
    const [x, y] = getXYByPlacement(keyShape.getLocalBounds(), 'center');

    return { x, y, ...iconStyle };
  }

  protected getBadgesStyle(attributes: Required<S>): Record<string, NodeBadgeStyleProps | false> {
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
    const { placement = 'top', ...restStyle } = style;
    const textStyle = getTextStyleByPlacement(keyShape.getLocalBounds(), placement, true);
    return { ...textStyle, ...restStyle };
  }

  protected getPortsStyle(attributes: Required<S>): Record<string, PortStyleProps | false> {
    const ports = this.getPorts();
    const portsShapeStyle: Record<string, PortStyleProps | false> = {};

    Object.keys(ports).forEach((key) => {
      portsShapeStyle[key] = false;
    });

    if (attributes.port === false || isEmpty(attributes.ports)) return portsShapeStyle;

    const portStyle = subStyleProps<PortStyleProps>(this.getGraphicStyle(attributes), 'port');
    const { ports: portOptions = [] } = attributes;
    portOptions.forEach((option, index) => {
      const key = option.key || index;
      const mergedStyle = { ...portStyle, ...option };
      if (isSimplePort(mergedStyle)) {
        portsShapeStyle[key] = false;
      } else {
        const [x, y] = this.getPortXY(attributes, option);
        portsShapeStyle[key] = { cx: x, cy: y, ...mergedStyle };
      }
    });
    return portsShapeStyle;
  }

  protected getPortXY(attributes: Required<S>, style: NodePortStyleProps): Point {
    const { placement = 'left' } = style;
    const bounds = this.getKey().getLocalBounds();
    return getPortXYByPlacement(bounds, placement as PortPlacement);
  }

  /**
   * Get the key shape for the node.
   * @returns Key shape.
   */
  public getKey<T extends DisplayObject>(): T {
    return this.shapeMap.key as T;
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

  protected drawHaloShape(attributes: Required<S>, container: Group): void {
    const keyShape = this.getKey();
    this.upsert(
      'halo',
      keyShape.constructor as new (...args: unknown[]) => DisplayObject,
      this.getHaloStyle(attributes),
      container,
    );
  }

  protected drawBadgeShapes(attributes: Required<S>, container: Group): void {
    const badgesStyle = this.getBadgesStyle(attributes);
    Object.keys(badgesStyle).forEach((key) => {
      this.upsert(`badge-${key}`, Badge, badgesStyle[key], container);
    });
  }

  protected drawPortShapes(attributes: Required<S>, container: Group): void {
    const portsStyle = this.getPortsStyle(attributes);
    Object.keys(portsStyle).forEach((key) => {
      this.upsert(`port-${key}`, GCircle, portsStyle[key], container);
    });
  }

  protected abstract drawKeyShape(attributes: Required<S>, container: Group): DisplayObject | undefined;

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

  public animate(keyframes: Keyframe[], options?: number | KeyframeAnimationOptions) {
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
   * Label position relative to the node (keyShape).
   */
  placement?: LabelPlacement;
  /**
   * The max width of the label, relative to the node width. The value can be a number or a percentage string:
   * If the value is a number, it will be treated as the pixel value.
   * If the value is a percentage string, it will be treated as the percentage of the node width.
   */
  maxWidth?: string | number;
};

type NodeBadgeStyleProps = BadgeStyleProps & {
  /**
   * Badge position relative to the node (keyShape).
   */
  placement?: BadgePlacement;
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
  placement: Placement;
};
