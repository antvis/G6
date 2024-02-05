import type {
  BaseStyleProps,
  DisplayObject,
  DisplayObjectConfig,
  Group,
  LineStyleProps,
  PathStyleProps,
} from '@antv/g';
import { Path } from '@antv/g';
import { deepMix, isEmpty, isFunction } from '@antv/util';
import type { EdgeKey, EdgeLabelStyleProps, Point, PrefixObject } from '../../types';
import type { Node } from '../../types/element';
import { getLabelPositionStyle } from '../../utils/edge';
import { findAnchor } from '../../utils/element';
import { getEllipseIntersectPoint } from '../../utils/point';
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

export type BaseEdgeKeyStyleProps<KT> = KT & {
  /**
   * <zh/> 边的起点 shape
   * <en/> The source shape. Represents the start of the edge
   */
  sourceNode: Node;
  /**
   * <zh/> 边的终点 shape
   * <en/> The source shape. Represents the start of the edge
   */
  targetNode: Node;
  /**
   * <zh/> 边起始连接的 anchor
   * <en/> The Anchor of the source node
   */
  sourceAnchor?: string;
  /**
   * <zh/> 边终点连接的 anchor
   * <en/> The Anchor of the target node
   */
  targetAnchor?: string;
  /**
   * <zh/> 边的起点
   * <en/> The source point. Represents the start of the edge
   */
  sourcePoint?: Point;
  /**
   * <zh/> 边的终点
   * <en/> The target point. Represents the end of the edge
   */
  targetPoint?: Point;
};

export type BaseEdgeStyleProps<KT extends object> = BaseShapeStyleProps &
  BaseEdgeKeyStyleProps<KT> & {
    label?: boolean;
    halo?: boolean;
    startArrow?: boolean;
    endArrow?: boolean;
    startArrowOffset?: number;
    endArrowOffset?: number;
  } & PrefixObject<EdgeLabelStyleProps, 'label'> &
  PrefixObject<KT, 'halo'> &
  PrefixObject<EdgeArrowStyleProps, 'startArrow'> &
  PrefixObject<EdgeArrowStyleProps, 'endArrow'>;

export type BaseEdgeOptions<KT extends object> = DisplayObjectConfig<BaseEdgeStyleProps<KT>>;

type ParsedBaseEdgeStyleProps<KT extends object> = Required<BaseEdgeStyleProps<KT>>;
export abstract class BaseEdge<KT extends object, KS extends DisplayObject> extends BaseShape<BaseEdgeStyleProps<KT>> {
  static defaultStyleProps: BaseEdgeStyleProps<any> = {
    isBillboard: true,
    label: true,
    labelPosition: 'center',
    labelMaxWidth: '80%',
    labelOffsetX: 4,
    labelOffsetY: -6,
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
  };

  constructor(options: BaseEdgeOptions<KT>) {
    super(deepMix({}, { style: BaseEdge.defaultStyleProps }, options));
  }

  protected getKeyStyle(attributes: ParsedBaseEdgeStyleProps<KT>): KT {
    const [sourcePoint, targetPoint] = this.getPoints(attributes);

    return {
      ...omitStyleProps(this.getGraphicStyle(attributes), ['halo', 'label', 'startArrow', 'endArrow']),
      sourcePoint,
      targetPoint,
    };
  }

  protected getPoints(attributes: ParsedBaseEdgeStyleProps<KT>): [Point, Point] {
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

  protected getHaloStyle(attributes: ParsedBaseEdgeStyleProps<KT>): false | KT {
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

  protected abstract drawKeyShape(attributes: ParsedBaseEdgeStyleProps<KT>, container: Group): KS | undefined;

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
    this.upsert(
      'halo',
      this.shapeMap.key.constructor as new (...args: any[]) => KS,
      this.getHaloStyle(attributes),
      container,
    );
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
