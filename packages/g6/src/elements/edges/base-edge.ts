import type {
  BaseStyleProps,
  DisplayObject,
  DisplayObjectConfig,
  Group,
  LineStyleProps,
  PathStyleProps,
} from '@antv/g';
import { Path } from '@antv/g';
import type { PathArray } from '@antv/util';
import { deepMix, isEmpty, isFunction } from '@antv/util';
import type { BaseEdgeProps, EdgeKey, EdgeLabelStyleProps, LoopEdgePosition, Point, PrefixObject } from '../../types';
import { getCubicPath, getLabelPositionStyle, getLoopPoints } from '../../utils/edge';
import { findAnchor, isSameNode } from '../../utils/element';
import { getEllipseIntersectPoint, isSamePoint } from '../../utils/point';
import { omitStyleProps, subStyleProps } from '../../utils/prefix';
import type { SymbolFactor } from '../../utils/symbol';
import * as Symbol from '../../utils/symbol';
import { getWordWrapWidthByEnds } from '../../utils/text';
import type { LabelStyleProps } from '../shapes';
import { Label } from '../shapes';
import type { BaseShapeStyleProps } from '../shapes/base-shape';
import { BaseShape } from '../shapes/base-shape';

type SymbolName = 'triangle' | 'circle' | 'diamond' | 'vee' | 'rect' | 'triangleRect' | 'simple';

type EdgeArrowStyleProps = {
  ctor?: { new (...args: any[]): DisplayObject };
  type?: SymbolName | SymbolFactor;
  width?: number;
  height?: number;
} & PathStyleProps &
  Record<string, unknown>;

type LoopStyleProps = BaseEdgeProps &
  PathStyleProps & {
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

export type BaseEdgeKeyStyleProps<KT> = BaseEdgeProps & PathStyleProps & KT;

export type BaseEdgeStyleProps<KT> = BaseShapeStyleProps &
  BaseEdgeKeyStyleProps<KT> & {
    label?: boolean;
    halo?: boolean;
    startArrow?: boolean;
    endArrow?: boolean;
    startArrowOffset?: number;
    endArrowOffset?: number;
  } & PrefixObject<EdgeLabelStyleProps, 'label'> &
  PrefixObject<PathStyleProps, 'halo'> &
  PrefixObject<EdgeArrowStyleProps, 'startArrow'> &
  PrefixObject<EdgeArrowStyleProps, 'endArrow'> &
  PrefixObject<LoopStyleProps, 'loop'>;

export type ParsedBaseEdgeStyleProps<KT> = Required<BaseEdgeStyleProps<KT>>;

export type BaseEdgeOptions<KT> = DisplayObjectConfig<BaseEdgeStyleProps<KT>>;

export abstract class BaseEdge<KT extends object> extends BaseShape<BaseEdgeStyleProps<KT>> {
  static defaultStyleProps: Partial<BaseEdgeStyleProps<any>> = {
    isBillboard: true,
    label: true,
    labelPosition: 'center',
    labelMaxWidth: '80%',
    labelOffsetX: 4,
    labelOffsetY: 0,
    labelTextBaseline: 'middle',
    labelIsBillboard: true,
    labelAutoRotate: true,
    halo: false,
    haloLineDash: 0,
    haloPointerEvents: 'none',
    haloZIndex: -1,
    haloDroppable: false,
    startArrow: false,
    startArrowCtor: Path,
    startArrowType: 'triangle',
    startArrowWidth: 10,
    startArrowHeight: 10,
    startArrowAnchor: '0.5 0.5',
    startArrowTransformOrigin: 'center',
    startArrowLineDash: 0,
    endArrow: false,
    endArrowCtor: Path,
    endArrowType: 'triangle',
    endArrowWidth: 10,
    endArrowHeight: 10,
    endArrowAnchor: '0.5 0.5',
    endArrowTransformOrigin: 'center',
    endArrowLineDash: 0,
    loopPosition: 'top',
    loopClockwise: true,
  };

  constructor(options: BaseEdgeOptions<KT>) {
    super(deepMix({}, { style: BaseEdge.defaultStyleProps }, options));
  }

  protected getKeyStyle(attributes: ParsedBaseEdgeStyleProps<KT>): PathStyleProps {
    const { sourceNode, targetNode, sourcePoint, targetPoint, color, ...keyStyle } = this.getGraphicStyle(attributes);

    const path =
      isSamePoint(sourcePoint, targetPoint) || isSameNode(sourceNode, targetNode)
        ? this.getLoopPath(attributes)
        : this.getKeyPath(attributes);

    return {
      stroke: color,
      path,
      ...omitStyleProps(keyStyle, ['halo', 'label', 'startArrow', 'endArrow']),
    };
  }

  protected abstract getKeyPath(attributes: ParsedBaseEdgeStyleProps<KT>): PathArray;

  protected getLoopPath(attributes: ParsedBaseEdgeStyleProps<KT>): PathArray | undefined {
    const {
      sourceNode: node,
      sourceAnchor: sourceAnchorKey,
      targetAnchor: targetAnchorKey,
      sourcePoint: rawSourcePoint,
      targetPoint: rawTargetPoint,
    } = attributes;

    if (!node) return;

    const { position, clockwise, dist } = subStyleProps<LoopStyleProps>(
      this.getGraphicStyle(attributes),
      'loop',
    ) as Required<LoopStyleProps>;

    const { sourcePoint, targetPoint, controlPoints } = getLoopPoints(
      node,
      sourceAnchorKey!,
      targetAnchorKey!,
      rawSourcePoint!,
      rawTargetPoint!,
      position,
      clockwise,
      dist,
    );
    return getCubicPath(sourcePoint, targetPoint, controlPoints);
  }

  protected getEndpoints(attributes: ParsedBaseEdgeStyleProps<KT>): [Point, Point] {
    const {
      sourceNode,
      targetNode,
      sourceAnchor: sourceAnchorKey,
      targetAnchor: targetAnchorKey,
      sourcePoint: rawSourcePoint,
      targetPoint: rawTargetPoint,
    } = attributes;

    if (rawSourcePoint && rawTargetPoint) return [rawSourcePoint, rawTargetPoint];

    const sourceAnchor = findAnchor(sourceNode, sourceAnchorKey, targetNode);
    const targetAnchor = findAnchor(targetNode, targetAnchorKey, sourceNode);

    const sourcePoint = sourceAnchor
      ? getEllipseIntersectPoint(targetNode.getCenter(), sourceAnchor.getLocalBounds())
      : sourceNode.getIntersectPoint(targetAnchor?.getPosition() || targetNode.getCenter());
    const targetPoint = targetAnchor
      ? getEllipseIntersectPoint(sourceNode.getCenter(), targetAnchor.getLocalBounds())
      : targetNode.getIntersectPoint(sourceAnchor?.getPosition() || sourceNode.getCenter());

    return [sourcePoint || sourceNode.getCenter(), targetPoint || targetNode.getCenter()];
  }

  protected getHaloStyle(attributes: ParsedBaseEdgeStyleProps<KT>): false | PathStyleProps {
    if (attributes.halo === false) return false;

    const keyStyle = this.getKeyStyle(attributes);
    const haloStyle = subStyleProps<LineStyleProps>(this.getGraphicStyle(attributes), 'halo');

    return { ...keyStyle, ...haloStyle };
  }

  protected getLabelStyle(attributes: ParsedBaseEdgeStyleProps<KT>): false | LabelStyleProps {
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

  protected drawArrow(attributes: ParsedBaseEdgeStyleProps<KT>, isStart: boolean) {
    const arrowType = isStart ? 'startArrow' : 'endArrow';
    const arrowPresence = attributes[arrowType];

    if (arrowPresence) {
      const { ctor } = subStyleProps<Required<EdgeArrowStyleProps>>(this.getGraphicStyle(attributes), arrowType);
      const arrowStyle = this.getArrowStyle(attributes, isStart);
      this.shapeMap.key.style[isStart ? 'markerStart' : 'markerEnd'] = new ctor({ style: arrowStyle });
      this.shapeMap.key.style[isStart ? 'markerStartOffset' : 'markerEndOffset'] =
        (isStart ? attributes.startArrowOffset : attributes.endArrowOffset) ||
        arrowStyle.width / 2 + Number(arrowStyle.lineWidth);
    } else {
      this.shapeMap.key.style[isStart ? 'markerStart' : 'markerEnd'] = undefined;
    }
  }

  private getArrowStyle(attributes: ParsedBaseEdgeStyleProps<KT>, isStart: boolean) {
    const keyStyle = this.getKeyStyle(attributes) as BaseStyleProps;
    const arrowType = isStart ? 'startArrow' : 'endArrow';
    const { width, height, type, ctor, ...arrowStyle } = subStyleProps<Required<EdgeArrowStyleProps>>(
      this.getGraphicStyle(attributes),
      arrowType,
    );

    let path;
    if (ctor === Path) {
      const arrowFn = isFunction(type) ? type : Symbol[type] || Symbol.triangle;
      path = arrowFn(width, height);
    }
    return {
      ...keyStyle,
      width,
      height,
      ...(path && { path, fill: type === 'simple' ? '' : keyStyle.stroke }),
      ...arrowStyle,
    };
  }

  protected drawLabelShape(attributes: ParsedBaseEdgeStyleProps<KT>, container: Group) {
    this.upsert('label', Label, this.getLabelStyle(attributes), container);
  }

  protected drawHaloShape(attributes: ParsedBaseEdgeStyleProps<KT>, container: Group) {
    this.upsert('halo', Path, this.getHaloStyle(attributes), container);
  }

  protected drawKeyShape(attributes: ParsedBaseEdgeStyleProps<KT>, container: Group): Path | undefined {
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

  animate(keyframes: Keyframe[] | PropertyIndexedKeyframes, options?: number | KeyframeAnimationOptions) {
    const result = super.animate(keyframes, options);

    result.onframe = () => {
      this.drawLabelShape(this.parsedAttributes, this);
      this.drawArrow(this.parsedAttributes, true);
      this.drawArrow(this.parsedAttributes, false);
    };

    return result;
  }
}
