import type { DisplayObject, DisplayObjectConfig, Group, LineStyleProps, PathStyleProps } from '@antv/g';
import { Image, Path } from '@antv/g';
import type { PathArray } from '@antv/util';
import { isFunction, pick } from '@antv/util';
import type {
  Edge,
  EdgeArrowStyleProps,
  EdgeBadgeStyleProps,
  EdgeKey,
  EdgeLabelStyleProps,
  ID,
  Keyframe,
  LoopStyleProps,
  Node,
  Point,
  Prefix,
} from '../../types';
import { getBBoxHeight, getBBoxWidth, getNodeBBox } from '../../utils/bbox';
import { getArrowSize, getBadgePositionStyle, getCubicLoopPath, getLabelPositionStyle } from '../../utils/edge';
import { findPorts, getConnectionPoint, getPortPosition, isSameNode } from '../../utils/element';
import { omitStyleProps, subStyleProps } from '../../utils/prefix';
import { parseSize } from '../../utils/size';
import { mergeOptions } from '../../utils/style';
import * as Symbol from '../../utils/symbol';
import { getWordWrapWidthByEnds } from '../../utils/text';
import { BaseElement } from '../base-element';
import { effect } from '../effect';
import type { BadgeStyleProps, BaseShapeStyleProps, LabelStyleProps } from '../shapes';
import { Badge, Label } from '../shapes';

/**
 * <zh/> 边的通用样式属性
 *
 * <en/> Base style properties of the edge
 */
export interface BaseEdgeStyleProps
  extends BaseShapeStyleProps,
    Prefix<'label', EdgeLabelStyleProps>,
    Prefix<'halo', PathStyleProps>,
    Prefix<'badge', EdgeBadgeStyleProps>,
    Prefix<'startArrow', EdgeArrowStyleProps>,
    Prefix<'endArrow', EdgeArrowStyleProps>,
    Prefix<'loop', LoopStyleProps> {
  /**
   * <zh/> 是否显示边的标签
   *
   * <en/> Whether to display the label of the edge
   * @defaultValue true
   */
  label?: boolean;
  /**
   * <zh/> 是否启用自环边
   *
   * <en/> Whether to enable self-loop edge
   * @defaultValue true
   */
  loop?: boolean;
  /**
   * <zh/> 是否显示边的光晕
   *
   * <en/> Whether to display the halo of the edge
   * @defaultValue false
   */
  halo?: boolean;
  /**
   * <zh/> 是否显示边的徽标
   *
   * <en/> Whether to display the badge of the edge
   * @defaultValue true
   */
  badge?: boolean;
  /**
   * <zh/> 是否显示边的起始箭头
   *
   * <en/> Whether to display the start arrow of the edge
   * @defaultValue false
   */
  startArrow?: boolean;
  /**
   * <zh/> 是否显示边的结束箭头
   *
   * <en/> Whether to display the end arrow of the edge
   * @defaultValue false
   */
  endArrow?: boolean;
  /**
   * <zh/> 起始箭头的偏移量
   *
   * <en/> Offset of the start arrow
   */
  startArrowOffset?: number;
  /**
   * <zh/> 结束箭头的偏移量
   *
   * <en/> Offset of the end arrow
   */
  endArrowOffset?: number;
  /**
   * <zh/> 边的起点 ID
   *
   * <en/> The ID of the source node
   * @remarks
   * <zh/> 该属性指向物理意义上的起点，由 G6 内部维护，用户无需过多关注。通常情况下，`sourceNode` 与上一级的 `source` 属性一致。但在某些情况下，`sourceNode` 可能会被 G6 内部转换，例如在 Combo 收起时内部节点上的边会自动连接到父 Combo，此时 `sourceNode` 会变更为父 Combo 的 ID。
   *
   * <en/> This property concerning the physical origin, maintained internally by G6. In general, `sourceNode` corresponds to the `source` attribute of the parent level. However, in certain cases, such as when a Combo is collapsed and internal nodes are destroyed, corresponding edges will automatically connect to the parent Combo. At this point, `sourceNode` will be changed to the ID of the parent Combo
   */
  sourceNode: ID;
  /**
   * <zh/> 边的终点 shape
   *
   * <en/> The source shape. Represents the start of the edge
   */
  targetNode: ID;
  /**
   * <zh/> 边起始连接的 port
   *
   * <en/> The Port of the source node
   */
  sourcePort?: string;
  /**
   * <zh/> 边终点连接的 port
   *
   * <en/> The Port of the target node
   */
  targetPort?: string;
  /**
   * <zh/> 在 “起点” 处添加一个标记图形，其中 “起始点” 为边与起始节点的交点
   *
   * <en/> Add a marker graphic at the "start point", where the "start point" is the intersection of the edge and the source node
   */
  markerStart?: DisplayObject | null;
  /**
   * <zh/> 调整 “起点” 处标记图形的位置，正偏移量向内，负偏移量向外
   *
   * <en/> Adjust the position of the marker graphic at the "start point", positive offset inward, negative offset outward
   * @defaultValue 0
   */
  markerStartOffset?: number;
  /**
   * <zh/> 在 “终点” 处添加一个标记图形，其中 “终点” 为边与终止节点的交点
   *
   * <en/> Add a marker graphic at the "end point", where the "end point" is the intersection of the edge and the target node
   */
  markerEnd?: DisplayObject | null;
  /**
   * <zh/> 调整 “终点” 处标记图形的位置，正偏移量向内，负偏移量向外
   *
   * <en/> Adjust the position of the marker graphic at the "end point", positive offset inward, negative offset outward
   * @defaultValue 0
   */
  markerEndOffset?: number;
  /**
   * <zh/> 在路径除了 “起点” 和 “终点” 之外的每一个顶点上放置标记图形。在内部实现中，由于我们会把路径中部分命令转换成 C 命令，因此这些顶点实际是三阶贝塞尔曲线的控制点
   *
   * <en/> Place a marker graphic on each vertex of the path except for the "start point" and "end point". In the internal implementation, because we will convert some commands in the path to C commands, these controlPoints are actually the control points of the cubic Bezier curve
   */
  markerMid?: DisplayObject | null;
  /**
   * <zh/> 3D 场景中生效，始终朝向屏幕，因此线宽不受透视投影影像
   *
   * <en/> Effective in 3D scenes, always facing the screen, so the line width is not affected by the perspective projection image
   * @defaultValue true
   */
  isBillboard?: boolean;
}

type ParsedBaseEdgeStyleProps = Required<BaseEdgeStyleProps>;

/**
 * <zh/> 边元素基类
 *
 * <en/> Base class of the edge
 */
export abstract class BaseEdge extends BaseElement<BaseEdgeStyleProps> implements Edge {
  public type = 'edge';

  static defaultStyleProps: Partial<BaseEdgeStyleProps> = {
    badge: true,
    badgeOffsetX: 0,
    badgeOffsetY: 0,
    badgePlacement: 'suffix',
    isBillboard: true,
    label: true,
    labelAutoRotate: true,
    labelIsBillboard: true,
    labelMaxWidth: '80%',
    labelOffsetX: 4,
    labelOffsetY: 0,
    labelPlacement: 'center',
    labelTextBaseline: 'middle',
    labelWordWrap: false,
    halo: false,
    haloDroppable: false,
    haloLineDash: 0,
    haloLineWidth: 12,
    haloPointerEvents: 'none',
    haloStrokeOpacity: 0.25,
    haloZIndex: -1,
    loop: true,
    startArrow: false,
    startArrowLineDash: 0,
    startArrowLineJoin: 'round',
    startArrowLineWidth: 1,
    startArrowTransformOrigin: 'center',
    startArrowType: 'vee',
    endArrow: false,
    endArrowLineDash: 0,
    endArrowLineJoin: 'round',
    endArrowLineWidth: 1,
    endArrowTransformOrigin: 'center',
    endArrowType: 'vee',
    loopPlacement: 'top',
    loopClockwise: true,
  };

  constructor(options: DisplayObjectConfig<BaseEdgeStyleProps>) {
    super(mergeOptions({ style: BaseEdge.defaultStyleProps }, options));
  }

  protected get sourceNode() {
    const { sourceNode: source } = this.parsedAttributes;
    return this.context.element!.getElement<Node>(source)!;
  }

  protected get targetNode() {
    const { targetNode: target } = this.parsedAttributes;
    return this.context.element!.getElement<Node>(target)!;
  }

  protected getKeyStyle(attributes: ParsedBaseEdgeStyleProps): PathStyleProps {
    const { loop, ...style } = this.getGraphicStyle(attributes);
    const { sourceNode, targetNode } = this;

    const d = loop && isSameNode(sourceNode, targetNode) ? this.getLoopPath(attributes) : this.getKeyPath(attributes);

    return {
      d,
      ...omitStyleProps(style, ['halo', 'label', 'startArrow', 'endArrow']),
    };
  }

  protected abstract getKeyPath(attributes: ParsedBaseEdgeStyleProps): PathArray;

  protected getLoopPath(attributes: ParsedBaseEdgeStyleProps): PathArray {
    const { sourcePort, targetPort } = attributes;
    const node = this.sourceNode;

    const bbox = getNodeBBox(node);
    const defaultDist = Math.max(getBBoxWidth(bbox), getBBoxHeight(bbox));

    const {
      placement,
      clockwise,
      dist = defaultDist,
    } = subStyleProps<Required<LoopStyleProps>>(this.getGraphicStyle(attributes), 'loop');

    return getCubicLoopPath(node, placement, clockwise, dist, sourcePort, targetPort);
  }

  protected getEndpoints(
    attributes: ParsedBaseEdgeStyleProps,
    optimize = true,
    controlPoints: Point[] | (() => Point[]) = [],
  ): [Point, Point] {
    const { sourcePort: sourcePortKey, targetPort: targetPortKey } = attributes;
    const { sourceNode, targetNode } = this;

    const [sourcePort, targetPort] = findPorts(sourceNode, targetNode, sourcePortKey, targetPortKey);

    if (!optimize) {
      const sourcePoint = sourcePort ? getPortPosition(sourcePort) : sourceNode.getCenter();
      const targetPoint = targetPort ? getPortPosition(targetPort) : targetNode.getCenter();
      return [sourcePoint, targetPoint];
    }

    const _controlPoints = typeof controlPoints === 'function' ? controlPoints() : controlPoints;
    const sourcePoint = getConnectionPoint(sourcePort || sourceNode, _controlPoints[0] || targetPort || targetNode);
    const targetPoint = getConnectionPoint(
      targetPort || targetNode,
      _controlPoints[_controlPoints.length - 1] || sourcePort || sourceNode,
    );

    return [sourcePoint, targetPoint];
  }

  protected getHaloStyle(attributes: ParsedBaseEdgeStyleProps): false | PathStyleProps {
    if (attributes.halo === false) return false;

    const keyStyle = this.getKeyStyle(attributes);
    const haloStyle = subStyleProps<LineStyleProps>(this.getGraphicStyle(attributes), 'halo');

    return { ...keyStyle, ...haloStyle };
  }

  protected getLabelStyle(attributes: ParsedBaseEdgeStyleProps): false | LabelStyleProps {
    if (attributes.label === false || !attributes.labelText) return false;

    const labelStyle = subStyleProps<Required<EdgeLabelStyleProps>>(this.getGraphicStyle(attributes), 'label');
    const { placement, offsetX, offsetY, autoRotate, maxWidth, ...restStyle } = labelStyle;
    const labelPositionStyle = getLabelPositionStyle(
      this.shapeMap.key as EdgeKey,
      placement,
      autoRotate,
      offsetX,
      offsetY,
    );

    const bbox = this.shapeMap.key.getLocalBounds();
    const wordWrapWidth = getWordWrapWidthByEnds([bbox.min, bbox.max], maxWidth);

    return Object.assign({ wordWrapWidth }, labelPositionStyle, restStyle);
  }

  protected getBadgeStyle(attributes: ParsedBaseEdgeStyleProps): false | BadgeStyleProps {
    if (attributes.badge === false || !attributes.badgeText) return false;

    const { offsetX, offsetY, placement, ...badgeStyle } = subStyleProps<Required<EdgeBadgeStyleProps>>(
      attributes,
      'badge',
    );

    return Object.assign(
      badgeStyle,
      getBadgePositionStyle(this.shapeMap, placement, attributes.labelPlacement, offsetX, offsetY),
    );
  }

  protected drawArrow(attributes: ParsedBaseEdgeStyleProps, type: 'start' | 'end') {
    const isStart = type === 'start';
    const arrowType = type === 'start' ? 'startArrow' : 'endArrow';
    const enable = attributes[arrowType];

    const keyShape = this.shapeMap.key as Path;

    if (enable) {
      const arrowStyle = this.getArrowStyle(attributes, isStart);
      if (!effect(this, `arrow-${type}`, arrowStyle)) return;

      const [marker, markerOffset, arrowOffset] = isStart
        ? (['markerStart', 'markerStartOffset', 'startArrowOffset'] as const)
        : (['markerEnd', 'markerEndOffset', 'endArrowOffset'] as const);

      const arrow = keyShape.parsedStyle[marker];
      // update
      if (arrow) arrow.attr(arrowStyle);
      // create
      else {
        const Ctor = arrowStyle.src ? Image : Path;
        const arrowShape = new Ctor({ style: arrowStyle });
        keyShape.style[marker] = arrowShape;
      }
      keyShape.style[markerOffset] = attributes[arrowOffset] || arrowStyle.width / 2 + +arrowStyle.lineWidth;
    } else {
      // destroy
      const marker = isStart ? 'markerStart' : 'markerEnd';
      keyShape.style[marker]?.destroy();
      keyShape.style[marker] = null;
    }
  }

  private getArrowStyle(attributes: ParsedBaseEdgeStyleProps, isStart: boolean) {
    const keyStyle = this.getShape('key')!.attributes;
    const arrowType = isStart ? 'startArrow' : 'endArrow';
    const { size, type, ...arrowStyle } = subStyleProps<Required<EdgeArrowStyleProps>>(
      this.getGraphicStyle(attributes),
      arrowType,
    );
    const [width, height] = parseSize(getArrowSize(keyStyle.lineWidth, size));
    const arrowFn = isFunction(type) ? type : Symbol[type] || Symbol.triangle;
    const d = arrowFn(width, height);

    return Object.assign(
      pick(keyStyle, ['stroke', 'strokeOpacity', 'fillOpacity']),
      { width, height },
      { ...(d && { d, fill: type === 'simple' ? '' : keyStyle.stroke }) },
      arrowStyle,
    );
  }

  protected drawLabelShape(attributes: ParsedBaseEdgeStyleProps, container: Group) {
    const style = this.getLabelStyle(attributes);
    if (!effect(this, 'label', style)) return;
    this.upsert('label', Label, style, container);
  }

  protected drawHaloShape(attributes: ParsedBaseEdgeStyleProps, container: Group) {
    const style = this.getHaloStyle(attributes);
    if (!effect(this, 'halo', style)) return;
    this.upsert('halo', Path, style, container);
  }

  protected drawBadgeShape(attributes: ParsedBaseEdgeStyleProps, container: Group) {
    const style = this.getBadgeStyle(attributes);
    if (!effect(this, 'badge', style)) return;
    this.upsert('badge', Badge, style, container);
  }

  protected drawSourceArrow(attributes: ParsedBaseEdgeStyleProps) {
    this.drawArrow(attributes, 'start');
  }

  protected drawTargetArrow(attributes: ParsedBaseEdgeStyleProps) {
    this.drawArrow(attributes, 'end');
  }

  protected drawKeyShape(attributes: ParsedBaseEdgeStyleProps, container: Group): Path | undefined {
    const style = this.getKeyStyle(attributes);
    if (!effect(this, 'key', style)) return;
    return this.upsert('key', Path, style, container);
  }

  public render(attributes = this.parsedAttributes, container: Group = this): void {
    // 1. key shape
    this.drawKeyShape(attributes, container);
    if (!this.getShape('key')) return;

    // 2. arrows
    this.drawSourceArrow(attributes);
    this.drawTargetArrow(attributes);

    // 3. label
    this.drawLabelShape(attributes, container);

    // 4. halo
    this.drawHaloShape(attributes, container);

    // 5. badges
    this.drawBadgeShape(attributes, container);
  }

  protected onframe() {
    this.drawKeyShape(this.parsedAttributes, this);
    this.drawSourceArrow(this.parsedAttributes);
    this.drawTargetArrow(this.parsedAttributes);
    this.drawHaloShape(this.parsedAttributes, this);
    this.drawLabelShape(this.parsedAttributes, this);
    this.drawBadgeShape(this.parsedAttributes, this);
  }

  public animate(keyframes: Keyframe[], options?: number | KeyframeAnimationOptions) {
    const animation = super.animate(keyframes, options);

    if (!animation) return animation;

    // 设置 currentTime 时触发更新
    // Trigger update when setting currentTime
    return new Proxy(animation, {
      set: (target, propKey, value) => {
        // 需要推迟 onframe 调用时机，等待节点位置更新完成
        // Need to delay the timing of the onframe call, wait for the node position update to complete
        if (propKey === 'currentTime') Promise.resolve().then(() => this.onframe());
        return Reflect.set(target, propKey, value);
      },
    });
  }
}
