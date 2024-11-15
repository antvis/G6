import type { BaseStyleProps, CircleStyleProps, DisplayObject, DisplayObjectConfig, Group } from '@antv/g';
import { Circle as GCircle } from '@antv/g';
import type { CategoricalPalette } from '../../palettes/types';
import type { RuntimeContext } from '../../runtime/types';
import type { NodeData } from '../../spec';
import type {
  ID,
  Node,
  NodeBadgeStyleProps,
  NodeLabelStyleProps,
  NodePortStyleProps,
  Point,
  Port,
  PortPlacement,
  PortStyleProps,
  Prefix,
  Size,
} from '../../types';
import { getPortXYByPlacement, getTextStyleByPlacement, isSimplePort } from '../../utils/element';
import { inferIconStyle } from '../../utils/node';
import { getPaletteColors } from '../../utils/palette';
import { getRectIntersectPoint } from '../../utils/point';
import { omitStyleProps, subObject, subStyleProps } from '../../utils/prefix';
import { parseSize } from '../../utils/size';
import { mergeOptions } from '../../utils/style';
import { getWordWrapWidthByBox } from '../../utils/text';
import { setVisibility } from '../../utils/visibility';
import { BaseElement } from '../base-element';
import { effect } from '../effect';
import type { BadgeStyleProps, BaseShapeStyleProps, IconStyleProps, LabelStyleProps } from '../shapes';
import { Badge, Icon, Label } from '../shapes';
import { connectImage, dispatchPositionChange } from '../shapes/image';

/**
 * <zh/> 节点通用样式配置项
 *
 * <en/> Base node style props
 */
export interface BaseNodeStyleProps
  extends BaseShapeStyleProps,
    Prefix<'label', NodeLabelStyleProps>,
    Prefix<'halo', BaseStyleProps>,
    Prefix<'icon', IconStyleProps>,
    Prefix<'badge', BadgeStyleProps>,
    Prefix<'port', PortStyleProps> {
  /**
   * <zh/> x 坐标
   *
   * <en/> The x-coordinate of node
   */
  x?: number;
  /**
   * <zh/> y 坐标
   *
   * <en/> The y-coordinate of node
   */
  y?: number;
  /**
   * <zh/> z 坐标
   *
   * <en/> The z-coordinate of node
   */
  z?: number;
  /**
   * <zh/> 节点大小，快捷设置节点宽高
   * - 若值为数字，则表示节点的宽度、高度以及深度相同为指定值
   * - 若值为数组，则按数组元素依次表示节点的宽度、高度以及深度
   *
   * <en/> The size of node, which is a shortcut to set the width and height of node
   * - If the value is a number, it means the width, height, and depth of the node are the same as the specified value
   * - If the value is an array, it means the width, height, and depth of the node are represented by the array elements in turn
   */
  size?: Size;
  /**
   * <zh/> 当前节点/组合是否展开
   *
   * <en/> Whether the current node/combo is expanded
   */
  collapsed?: boolean;
  /**
   * <zh/> 子节点实例
   *
   * <en/> The instance of the child node
   * @remarks
   * <zh/> 仅在树图中生效
   *
   * <en/> Only valid in the tree graph
   */
  childrenNode?: ID[];
  /**
   * <zh/> 子节点数据
   *
   * <en/> The data of the child node
   * @remarks
   * <zh/> 仅在树图中生效。如果当前节点为收起状态，children 可能为空，通过 childrenData 能够获取完整的子元素数据
   *
   * <en/> Only valid in the tree graph. If the current node is collapsed, children may be empty, and the complete child element data can be obtained through childrenData
   */
  childrenData?: NodeData[];
  /**
   * <zh/> 是否显示节点标签
   *
   * <en/> Whether to show the node label
   * @defaultValue true
   */
  label?: boolean;
  /**
   * <zh/> 是否显示节点光晕
   *
   * <en/> Whether to show the node halo
   * @defaultValue false
   */
  halo?: boolean;
  /**
   * <zh/> 是否显示节点图标
   *
   * <en/> Whether to show the node icon
   * @defaultValue true
   */
  icon?: boolean;
  /**
   * <zh/> 是否显示节点徽标
   *
   * <en/> Whether to show the node badge
   * @defaultValue true
   */
  badge?: boolean;
  /**
   * <zh/> 是否显示连接桩
   *
   * <en/> Whether to show the node port
   * @defaultValue true
   */
  port?: boolean;
  /**
   * <zh/> 连接桩配置项，支持配置多个连接桩
   *
   * <en/> Port configuration, supports configuring multiple ports
   * @example
   * ```json
   * {
   *    port: true,
   *    ports: [
   *      { key: 'top', placement: [0.5, 0], r: 4, stroke: '#31d0c6', fill: '#fff' },
   *      { key: 'bottom', placement: [0.5, 1], r: 4, stroke: '#31d0c6', fill: '#fff' },
   *    ],
   * }
   * ```
   */
  ports?: NodePortStyleProps[];
  /**
   * <zh/> 徽标
   *
   * <en/> Badge
   * @example
   * ```json
   * {
   *    badge: true,
   *    badges: [
   *      { text: 'A', placement: 'right-top'},
   *      { text: 'Important', placement: 'right' },
   *      { text: 'Notice', placement: 'right-bottom' },
   *    ],
   *    badgePalette: ['#7E92B5', '#F4664A', '#FFBE3A'],
   * }
   * ```
   */
  badges?: NodeBadgeStyleProps[];
  /**
   * <zh/> 徽标的背景色板
   *
   * <en/> Badge background color palette
   */
  badgePalette?: CategoricalPalette;
}

/**
 * <zh/> 节点元素的基类
 *
 * <en/> Base node class
 * @remarks
 * <zh/> 自定义节点时，建议将此类作为基类。这样，你只需要关注如何实现 keyShape 的绘制逻辑
 *
 * <zh/> 设计文档：https://www.yuque.com/antv/g6/gl1iof1xpzg6ed98
 *
 * <en/> When customizing a node, it is recommended to use this class as the base class. This way, you can directly focus on how to implement the drawing logic of keyShape
 *
 * <en/> Design document: https://www.yuque.com/antv/g6/gl1iof1xpzg6ed98
 */
export abstract class BaseNode<S extends BaseNodeStyleProps = BaseNodeStyleProps>
  extends BaseElement<S>
  implements Node
{
  public type = 'node';

  static defaultStyleProps: Partial<BaseNodeStyleProps> = {
    x: 0,
    y: 0,
    size: 32,
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
    super(mergeOptions({ style: BaseNode.defaultStyleProps }, options));
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
    if (attributes.label === false || !attributes.labelText) return false;

    const { placement, maxWidth, offsetX, offsetY, ...labelStyle } = subStyleProps<Required<NodeLabelStyleProps>>(
      this.getGraphicStyle(attributes),
      'label',
    );
    const keyBounds = this.getShape('key').getLocalBounds();

    return Object.assign(
      getTextStyleByPlacement(keyBounds, placement, offsetX, offsetY),
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
    if (attributes.icon === false || (!attributes.iconText && !attributes.iconSrc)) return false;

    const iconStyle = subStyleProps(this.getGraphicStyle(attributes), 'icon');

    return Object.assign(inferIconStyle(attributes.size!, iconStyle), iconStyle);
  }

  protected getBadgesStyle(attributes: Required<S>): Record<string, NodeBadgeStyleProps | false> {
    const badges = subObject(this.shapeMap, 'badge-');
    const badgesShapeStyle: Record<string, NodeBadgeStyleProps | false> = {};

    Object.keys(badges).forEach((key) => {
      badgesShapeStyle[key] = false;
    });
    if (attributes.badge === false || !attributes.badges?.length) return badgesShapeStyle;

    const { badges: badgeOptions = [], badgePalette, opacity = 1, ...restAttributes } = attributes;
    const colors = getPaletteColors(badgePalette);
    const badgeStyle = subStyleProps<BadgeStyleProps>(this.getGraphicStyle(restAttributes), 'badge');

    badgeOptions.forEach((option, i) => {
      badgesShapeStyle[i] = {
        backgroundFill: colors ? colors[i % colors?.length] : undefined,
        opacity,
        ...badgeStyle,
        ...this.getBadgeStyle(option),
      };
    });

    return badgesShapeStyle;
  }

  protected getBadgeStyle(style: NodeBadgeStyleProps): NodeBadgeStyleProps {
    const keyShape = this.getShape('key');
    const { placement = 'top', offsetX, offsetY, ...restStyle } = style;
    const textStyle = getTextStyleByPlacement(keyShape.getLocalBounds(), placement, offsetX, offsetY, true);
    return { ...textStyle, ...restStyle };
  }

  protected getPortsStyle(attributes: Required<S>): Record<string, PortStyleProps | false> {
    const ports = this.getPorts();
    const portsShapeStyle: Record<string, PortStyleProps | false> = {};

    Object.keys(ports).forEach((key) => {
      portsShapeStyle[key] = false;
    });

    if (attributes.port === false || !attributes.ports?.length) return portsShapeStyle;

    const portStyle = subStyleProps<PortStyleProps>(this.getGraphicStyle(attributes), 'port');
    const { ports: portOptions = [] } = attributes;
    portOptions.forEach((option, index) => {
      const key = option.key || index;
      const mergedStyle = { ...portStyle, ...option };
      if (isSimplePort(mergedStyle)) {
        portsShapeStyle[key] = false;
      } else {
        const [x, y] = this.getPortXY(attributes, option);
        portsShapeStyle[key] = { transform: [['translate', x, y]], ...mergedStyle };
      }
    });
    return portsShapeStyle;
  }

  protected getPortXY(attributes: Required<S>, style: NodePortStyleProps): Point {
    const { placement = 'left' } = style;
    const keyShape = this.getShape('key');
    return getPortXYByPlacement(getBoundsInOffscreen(this.context, keyShape), placement as PortPlacement);
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
    return this.getShape('key').getBounds().center;
  }

  /**
   * Get the point on the outer contour of the node that is the intersection with a line starting in the center the ending in the point `p`.
   * @param point - The point to intersect with the node.
   * @param useExtendedLine - Whether to use the extended line.
   * @returns The intersection point.
   */
  public getIntersectPoint(point: Point, useExtendedLine = false): Point {
    const keyShapeBounds = this.getShape('key').getBounds();
    return getRectIntersectPoint(point, keyShapeBounds, useExtendedLine);
  }

  protected drawHaloShape(attributes: Required<S>, container: Group): void {
    const style = this.getHaloStyle(attributes);
    if (!effect(this, 'halo', style)) return;

    const keyShape = this.getShape('key');
    this.upsert('halo', keyShape.constructor as new (...args: unknown[]) => DisplayObject, style, container);
  }

  protected drawIconShape(attributes: Required<S>, container: Group): void {
    const style = this.getIconStyle(attributes);
    if (!effect(this, 'icon', style)) return;

    this.upsert('icon', Icon, style, container);
    connectImage(this);
  }

  protected drawBadgeShapes(attributes: Required<S>, container: Group): void {
    const badgesStyle = this.getBadgesStyle(attributes);
    Object.keys(badgesStyle).forEach((key) => {
      const style = badgesStyle[key];
      if (!effect(this, `badge-${key}`, style)) return;

      this.upsert(`badge-${key}`, Badge, style, container);
    });
  }

  protected drawPortShapes(attributes: Required<S>, container: Group): void {
    const portsStyle = this.getPortsStyle(attributes);

    Object.keys(portsStyle).forEach((key) => {
      const style = portsStyle[key] as CircleStyleProps;
      const shapeKey = `port-${key}`;
      if (!effect(this, shapeKey, style)) return;

      this.upsert(shapeKey, GCircle, style, container);
    });
  }

  protected drawLabelShape(attributes: Required<S>, container: Group): void {
    const style = this.getLabelStyle(attributes);
    if (!effect(this, 'label', style)) return;

    this.upsert('label', Label, style, container);
  }

  protected abstract drawKeyShape(attributes: Required<S>, container: Group): DisplayObject | undefined;

  // 用于装饰抽象方法 / Used to decorate abstract methods
  private _drawKeyShape(attributes: Required<S>, container: Group) {
    return this.drawKeyShape(attributes, container);
  }

  public render(attributes = this.parsedAttributes, container: Group = this) {
    // 1. key shape
    this._drawKeyShape(attributes, container);
    if (!this.getShape('key')) return;

    // 2. halo, use shape same with keyShape
    this.drawHaloShape(attributes, container);

    // 3. icon
    this.drawIconShape(attributes, container);

    // 4. badges
    this.drawBadgeShapes(attributes, container);

    // 5. label
    this.drawLabelShape(attributes, container);

    // 6. ports
    this.drawPortShapes(attributes, container);
  }

  public update(attr?: Partial<S>): void {
    super.update(attr);
    if (attr && ('x' in attr || 'y' in attr || 'z' in attr)) {
      dispatchPositionChange(this);
    }
  }

  protected onframe() {
    this.drawBadgeShapes(this.parsedAttributes, this);
    this.drawLabelShape(this.parsedAttributes, this);
  }
}

/**
 * <zh/> 在离屏画布中获取图形包围盒
 *
 * <en/> Get the bounding box of the graphic in the off-screen canvas
 * @param context - <zh/> 运行时上下文 <en/> Runtime context
 * @param shape - <zh/> 图形实例 <en/> Graphic instance
 * @returns <zh/> 图形包围盒 <en/> Graphic bounding box
 */
function getBoundsInOffscreen(context: RuntimeContext, shape: DisplayObject) {
  if (!context) return shape.getLocalBounds();

  // 将主图形靠背至全局空间，避免受到父级 transform 的影响
  // 合理的操作应该是拷贝至离屏画布，但目前 G 有点问题
  // Move the main graphic to the global space to avoid being affected by the parent transform
  // The reasonable operation should be moved to the off-screen canvas, but there is a problem with G at present
  const canvas = context.canvas.getLayer();
  const substitute = shape.cloneNode();
  setVisibility(substitute, 'hidden');
  canvas.appendChild(substitute);
  const bounds = substitute.getLocalBounds();
  substitute.destroy();

  return bounds;
}
