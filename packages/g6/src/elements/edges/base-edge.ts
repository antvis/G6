import type {
  BaseStyleProps,
  DisplayObject,
  DisplayObjectConfig,
  Group,
  LineStyleProps,
  PathStyleProps,
} from '@antv/g';
import { Image, Path } from '@antv/g';
import type { PathArray } from '@antv/util';
import { deepMix, isEmpty, isFunction } from '@antv/util';
import type {
  BaseElementStyleProps,
  EdgeArrowStyleProps,
  EdgeKey,
  EdgeLabelStyleProps,
  Keyframe,
  LoopStyleProps,
  Node,
  Point,
  PrefixObject,
} from '../../types';
import { getBBoxHeight, getBBoxWidth, getNodeBBox } from '../../utils/bbox';
import { getCubicLoopPath, getLabelPositionStyle } from '../../utils/edge';
import { findPorts, getConnectionPoint, isSameNode } from '../../utils/element';
import { omitStyleProps, subStyleProps } from '../../utils/prefix';
import { parseSize } from '../../utils/size';
import * as Symbol from '../../utils/symbol';
import { getWordWrapWidthByEnds } from '../../utils/text';
import type { LabelStyleProps } from '../shapes';
import { Label } from '../shapes';
import { BaseShape } from '../shapes/base-shape';

/**
 * <zh/> 边的基础样式属性
 *
 * <en/> Base style properties of the edge
 */
export interface BaseEdgeStyleProps
  extends BaseElementStyleProps,
    PrefixObject<EdgeLabelStyleProps, 'label'>,
    PrefixObject<PathStyleProps, 'halo'>,
    PrefixObject<EdgeArrowStyleProps, 'startArrow'>,
    PrefixObject<EdgeArrowStyleProps, 'endArrow'>,
    PrefixObject<LoopStyleProps, 'loop'> {
  /**
   * <zh/> 是否显示边的标签
   *
   * <en/> Whether to display the label of the edge
   */
  label?: boolean;
  /**
   * <zh/> 是否显示边的光晕
   *
   * <en/> Whether to display the halo of the edge
   */
  halo?: boolean;
  /**
   * <zh/> 是否显示边的起始箭头
   *
   * <en/> Whether to display the start arrow of the edge
   */
  startArrow?: boolean;
  /**
   * <zh/> 是否显示边的结束箭头
   *
   * <en/> Whether to display the end arrow of the edge
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
   * <zh/> 边的起点 shape
   *
   * <en/> The source shape. Represents the start of the edge
   */
  sourceNode: Node;
  /**
   * <zh/> 边的终点 shape
   *
   * <en/> The source shape. Represents the start of the edge
   */
  targetNode: Node;
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
   * <zh/> 在 “起始点” 处添加一个标记图形，其中 “起始点” 为边与起始节点的交点
   *
   * <en/> Add a marker graphic at the "start point", where the "start point" is the intersection of the edge and the source node
   */
  markerStart?: DisplayObject | null;
  /**
   * <zh/> 调整 “起始点” 处标记图形的位置，正偏移量向内，负偏移量向外
   *
   * <en/> Adjust the position of the marker graphic at the "start point", positive offset inward, negative offset outward
   * @defaultValue 0
   */
  markerStartOffset?: number;
  /**
   * <zh/> 在 “终止点” 处添加一个标记图形，其中 “终止点” 为边与终止节点的交点
   *
   * <en/> Add a marker graphic at the "end point", where the "end point" is the intersection of the edge and the target node
   */
  markerEnd?: DisplayObject | null;
  /**
   * <zh/> 调整 “终止点” 处标记图形的位置，正偏移量向内，负偏移量向外
   *
   * <en/> Adjust the position of the marker graphic at the "end point", positive offset inward, negative offset outward
   * @defaultValue 0
   */
  markerEndOffset?: number;
  /**
   * <zh/> 在路径除了 “起始点” 和 “终止点” 之外的每一个顶点上放置标记图形。在内部实现中，由于我们会把路径中部分命令转换成 C 命令，因此这些顶点实际是三阶贝塞尔曲线的控制点
   *
   * <en/> Place a marker graphic on each vertex of the path except for the "start point" and "end point". In the internal implementation, because we will convert some commands in the path to C commands, these vertices are actually the control points of the cubic Bezier curve
   */
  markerMid?: DisplayObject | null;
  /**
   * <zh/> 3D 场景中生效，始终朝向屏幕，因此线宽不受透视投影影像
   *
   * <en/> Effective in 3D scenes, always facing the screen, so the line width is not affected by the perspective projection image
   * @defaultValue false
   */
  isBillboard?: boolean;
}

type ParsedBaseEdgeStyleProps = Required<BaseEdgeStyleProps>;

/**
 * <zh/> 基础边元素
 *
 * <en/> Base edge element
 */
export abstract class BaseEdge extends BaseShape<BaseEdgeStyleProps> {
  public type = 'edge';

  static defaultStyleProps: Partial<BaseEdgeStyleProps> = {
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
    startArrow: false,
    startArrowAnchor: '0.5 0.5',
    startArrowSize: 8,
    startArrowLineDash: 0,
    startArrowLineWidth: 1,
    startArrowTransformOrigin: 'center',
    startArrowType: 'triangle',
    endArrow: false,
    endArrowAnchor: '0.5 0.5',
    endArrowSize: 8,
    endArrowLineDash: 0,
    endArrowLineWidth: 1,
    endArrowTransformOrigin: 'center',
    endArrowType: 'triangle',
    loopPlacement: 'top',
    loopClockwise: true,
  };

  constructor(options: DisplayObjectConfig<BaseEdgeStyleProps>) {
    super(deepMix({}, { style: BaseEdge.defaultStyleProps }, options));
  }

  protected getKeyStyle(attributes: ParsedBaseEdgeStyleProps): PathStyleProps {
    const { sourceNode, targetNode, ...style } = this.getGraphicStyle(attributes);

    const path = isSameNode(sourceNode, targetNode) ? this.getLoopPath(attributes) : this.getKeyPath(attributes);
    return {
      path,
      ...omitStyleProps(style, ['halo', 'label', 'startArrow', 'endArrow']),
    };
  }

  protected abstract getKeyPath(attributes: ParsedBaseEdgeStyleProps): PathArray;

  protected getLoopPath(attributes: ParsedBaseEdgeStyleProps): PathArray {
    const { sourceNode: node, sourcePort, targetPort } = attributes;

    const bbox = getNodeBBox(node);
    const defaultDist = Math.max(getBBoxWidth(bbox), getBBoxHeight(bbox));

    const {
      placement,
      clockwise,
      dist = defaultDist,
    } = subStyleProps<Required<LoopStyleProps>>(this.getGraphicStyle(attributes), 'loop');

    return getCubicLoopPath(node, placement, clockwise, dist, sourcePort, targetPort);
  }

  protected getEndpoints(attributes: ParsedBaseEdgeStyleProps): [Point, Point] {
    const { sourceNode, targetNode, sourcePort: sourcePortKey, targetPort: targetPortKey } = attributes;

    const [sourcePort, targetPort] = findPorts(sourceNode, targetNode, sourcePortKey, targetPortKey);

    const sourcePoint = getConnectionPoint(sourcePort || sourceNode, targetPort || targetNode);
    const targetPoint = getConnectionPoint(targetPort || targetNode, sourcePort || sourceNode);

    return [sourcePoint, targetPoint];
  }

  protected getHaloStyle(attributes: ParsedBaseEdgeStyleProps): false | PathStyleProps {
    if (attributes.halo === false) return false;

    const keyStyle = this.getKeyStyle(attributes);
    const haloStyle = subStyleProps<LineStyleProps>(this.getGraphicStyle(attributes), 'halo');

    return { ...keyStyle, ...haloStyle };
  }

  protected getLabelStyle(attributes: ParsedBaseEdgeStyleProps): false | LabelStyleProps {
    if (attributes.label === false || isEmpty(attributes.labelText)) return false;

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

  protected drawArrow(attributes: ParsedBaseEdgeStyleProps, type: 'start' | 'end') {
    const isStart = type === 'start';
    const arrowType = type === 'start' ? 'startArrow' : 'endArrow';
    const enable = attributes[arrowType];

    const keyShape = this.shapeMap.key as Path;

    if (enable) {
      const arrowStyle = this.getArrowStyle(attributes, isStart);
      const Ctor = !isEmpty(arrowStyle.src) ? Image : Path;
      const [marker, markerOffset, arrowOffset] = isStart
        ? (['markerStart', 'markerStartOffset', 'startArrowOffset'] as const)
        : (['markerEnd', 'markerEndOffset', 'endArrowOffset'] as const);

      const arrow = keyShape.style[marker];
      // update
      if (arrow) arrow.attr(arrowStyle);
      // create
      else keyShape.style[marker] = new Ctor({ style: arrowStyle });
      keyShape.style[markerOffset] = attributes[arrowOffset] || arrowStyle.width / 2 + +arrowStyle.lineWidth;
    } else {
      // destroy
      const marker = isStart ? 'markerStart' : 'markerEnd';
      keyShape.style[marker]?.destroy();
      keyShape.style[marker] = null;
    }
  }

  private getArrowStyle(attributes: ParsedBaseEdgeStyleProps, isStart: boolean) {
    const keyStyle = this.getKeyStyle(attributes) as BaseStyleProps;
    const arrowType = isStart ? 'startArrow' : 'endArrow';
    const { size, type, ...arrowStyle } = subStyleProps<Required<EdgeArrowStyleProps>>(
      this.getGraphicStyle(attributes),
      arrowType,
    );
    const [width, height] = parseSize(size);
    const arrowFn = isFunction(type) ? type : Symbol[type] || Symbol.triangle;
    const path = arrowFn(width, height);

    return {
      ...keyStyle,
      width,
      height,
      ...(path && { path, fill: type === 'simple' ? '' : keyStyle.stroke }),
      ...arrowStyle,
    };
  }

  protected drawLabelShape(attributes: ParsedBaseEdgeStyleProps, container: Group) {
    this.upsert('label', Label, this.getLabelStyle(attributes), container);
  }

  protected drawHaloShape(attributes: ParsedBaseEdgeStyleProps, container: Group) {
    this.upsert('halo', Path, this.getHaloStyle(attributes), container);
  }

  protected drawKeyShape(attributes: ParsedBaseEdgeStyleProps, container: Group): Path | undefined {
    return this.upsert('key', Path, this.getKeyStyle(attributes), container);
  }

  public render(attributes = this.parsedAttributes, container: Group = this): void {
    // 1. key shape
    const keyShape = this.drawKeyShape(attributes, container);
    if (!keyShape) return;

    // 2. arrows
    this.drawArrow(attributes, 'start');
    this.drawArrow(attributes, 'end');

    // 3. label
    this.drawLabelShape(attributes, container);

    // 4. halo
    this.drawHaloShape(attributes, container);
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
        this.drawLabelShape(this.parsedAttributes, this);
      };
    }

    return result;
  }
}
