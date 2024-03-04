import type {
  BaseStyleProps,
  DisplayObjectConfig,
  Group,
  ImageStyleProps,
  LineStyleProps,
  PathStyleProps,
} from '@antv/g';
import { Image, Path } from '@antv/g';
import type { PathArray } from '@antv/util';
import { deepMix, isEmpty, isFunction } from '@antv/util';
import type {
  BaseEdgeProps,
  EdgeKey,
  EdgeLabelStyleProps,
  Keyframe,
  LoopEdgePosition,
  Point,
  PrefixObject,
  Size,
} from '../../types';
import { getBBoxHeight, getBBoxWidth, getNodeBBox } from '../../utils/bbox';
import { getCubicLoopPath, getLabelPositionStyle } from '../../utils/edge';
import { findPorts, getConnectionPoint, isSameNode } from '../../utils/element';
import { omitStyleProps, subStyleProps } from '../../utils/prefix';
import { parseSize } from '../../utils/size';
import type { SymbolFactor } from '../../utils/symbol';
import * as Symbol from '../../utils/symbol';
import { getWordWrapWidthByEnds } from '../../utils/text';
import type { LabelStyleProps } from '../shapes';
import { Label } from '../shapes';
import { BaseShape } from '../shapes/base-shape';

export type BaseEdgeStyleProps = BaseEdgeProps &
  ShapeSwitch &
  PrefixObject<EdgeLabelStyleProps, 'label'> &
  PrefixObject<PathStyleProps, 'halo'> &
  PrefixObject<EdgeArrowStyleProps, 'startArrow'> &
  PrefixObject<EdgeArrowStyleProps, 'endArrow'> &
  PrefixObject<LoopStyleProps, 'loop'>;

type ParsedBaseEdgeStyleProps = Required<BaseEdgeStyleProps>;

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
    labelPosition: 'center',
    labelTextBaseline: 'middle',
    halo: false,
    haloDroppable: false,
    haloLineDash: 0,
    haloLineWidth: 12,
    haloPointerEvents: 'none',
    haloStrokeOpacity: 0.25,
    haloZIndex: -1,
    startArrow: false,
    startArrowAnchor: '0.5 0.5',
    startArrowSize: 10,
    startArrowLineDash: 0,
    startArrowLineWidth: 1,
    startArrowTransformOrigin: 'center',
    startArrowType: 'triangle',
    endArrow: false,
    endArrowAnchor: '0.5 0.5',
    endArrowSize: 10,
    endArrowLineDash: 0,
    endArrowLineWidth: 1,
    endArrowTransformOrigin: 'center',
    endArrowType: 'triangle',
    loopPosition: 'top',
    loopClockwise: true,
  };

  constructor(options: DisplayObjectConfig<BaseEdgeStyleProps>) {
    super(deepMix({}, { style: BaseEdge.defaultStyleProps }, options));
  }

  protected getKeyStyle(attributes: ParsedBaseEdgeStyleProps): PathStyleProps {
    const { sourceNode, targetNode, color, stroke, ...style } = this.getGraphicStyle(attributes);

    const path = isSameNode(sourceNode, targetNode) ? this.getLoopPath(attributes) : this.getKeyPath(attributes);
    return {
      path,
      ...omitStyleProps(style, ['halo', 'label', 'startArrow', 'endArrow']),
      stroke: color || stroke,
    };
  }

  protected abstract getKeyPath(attributes: ParsedBaseEdgeStyleProps): PathArray;

  protected getLoopPath(attributes: ParsedBaseEdgeStyleProps): PathArray {
    const { sourceNode: node, sourcePort, targetPort } = attributes;

    const bbox = getNodeBBox(node);
    const defaultDist = Math.max(getBBoxWidth(bbox), getBBoxHeight(bbox));

    const {
      position,
      clockwise,
      dist = defaultDist,
    } = subStyleProps<Required<LoopStyleProps>>(this.getGraphicStyle(attributes), 'loop');

    return getCubicLoopPath(node, position, clockwise, dist, sourcePort, targetPort);
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
    const { position, offsetX, offsetY, autoRotate, maxWidth, ...restStyle } = labelStyle;
    const labelPositionStyle = getLabelPositionStyle(
      this.shapeMap.key as EdgeKey,
      position,
      autoRotate,
      offsetX,
      offsetY,
    );

    const bbox = this.shapeMap.key.getLocalBounds();
    const wordWrapWidth = getWordWrapWidthByEnds([bbox.min, bbox.max], maxWidth);

    return Object.assign({ wordWrapWidth }, labelPositionStyle, restStyle);
  }

  protected drawArrow(attributes: ParsedBaseEdgeStyleProps, isStart: boolean) {
    const arrowType = isStart ? 'startArrow' : 'endArrow';
    const arrowPresence = attributes[arrowType];
    if (arrowPresence) {
      const arrowStyle = this.getArrowStyle(attributes, isStart);
      const Ctor = !isEmpty(arrowStyle.src) ? Image : Path;
      this.shapeMap.key.style[isStart ? 'markerStart' : 'markerEnd'] = new Ctor({ style: arrowStyle });
      this.shapeMap.key.style[isStart ? 'markerStartOffset' : 'markerEndOffset'] =
        (isStart ? attributes.startArrowOffset : attributes.endArrowOffset) ||
        Number(arrowStyle.width) / 2 + Number(arrowStyle.lineWidth);
    } else {
      this.shapeMap.key.style[isStart ? 'markerStart' : 'markerEnd'] = undefined;
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
    this.drawArrow(attributes, true);
    this.drawArrow(attributes, false);

    // 3. label
    this.drawLabelShape(attributes, container);

    // 4. halo
    this.drawHaloShape(attributes, container);
  }

  animate(keyframes: Keyframe[], options?: number | KeyframeAnimationOptions) {
    const result = super.animate(keyframes, options);

    if (result) {
      result.onframe = () => {
        this.drawLabelShape(this.parsedAttributes, this);
        this.drawArrow(this.parsedAttributes, true);
        this.drawArrow(this.parsedAttributes, false);
      };
    }

    return result;
  }
}

type SymbolName = 'triangle' | 'circle' | 'diamond' | 'vee' | 'rect' | 'triangleRect' | 'simple';

type EdgeArrowStyleProps = {
  type?: SymbolName | SymbolFactor;
  size?: Size;
} & PathStyleProps &
  Omit<ImageStyleProps, 'width' | 'height'> &
  Record<string, unknown>;

export type LoopStyleProps = {
  /**
   * <zh/> 边的位置
   * <en/> The position of the edge
   */
  position?: LoopEdgePosition;
  /**
   * <zh/> 指定是否顺时针绘制环
   * <en/> Specify whether to draw the loop clockwise
   */
  clockwise?: boolean;
  /**
   * <zh/> 从节点 keyShape 边缘到自环顶部的距离，用于指定自环的曲率，默认为宽度或高度的最大值
   * <en/> Determine the position from the edge of the node keyShape to the top of the self-loop, used to specify the curvature of the self-loop, the default value is the maximum of the width or height
   */
  dist?: number;
};

type ShapeSwitch = {
  label?: boolean;
  halo?: boolean;
  startArrow?: boolean;
  endArrow?: boolean;
  startArrowOffset?: number;
  endArrowOffset?: number;
};
