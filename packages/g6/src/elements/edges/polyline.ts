import type { DisplayObjectConfig } from '@antv/g';
import type { PathArray } from '@antv/util';
import { deepMix } from '@antv/util';
import type { BaseEdgeProps, Padding, Point } from '../../types';
import { getPolylinePath } from '../../utils/edge';
import { findPort, getNodeConnectionPoint } from '../../utils/element';
import { getNodeBBox, orth } from '../../utils/router/orth';
import type { BaseEdgeStyleProps, ParsedBaseEdgeStyleProps } from './base-edge';
import { BaseEdge } from './base-edge';

type PolylineKeyStyleProps = BaseEdgeProps<{
  /**
   * <zh/> 圆角半径
   * <en/> The radius of the rounded corner
   */
  radius?: number;
  /**
   * <zh/> 控制点数组
   * <en/> Control point array
   */
  controlPoints?: Point[];
  /**
   * <zh/> 是否启用路由，默认开启且 controlPoints 会自动计入
   * <en/> Whether to enable routing, it is enabled by default and controlPoints will be automatically included
   */
  router?: boolean;
  /**
   * <zh/> 节点边距
   * <en/> Padding for routing calculation
   */
  routerPadding?: Padding;
}>;
export type PolylineStyleProps = BaseEdgeStyleProps<PolylineKeyStyleProps>;
type ParsedPolylineStyleProps = ParsedBaseEdgeStyleProps<PolylineKeyStyleProps>;
type PolylineOptions = DisplayObjectConfig<PolylineStyleProps>;

export class Polyline extends BaseEdge<PolylineKeyStyleProps> {
  static defaultStyleProps: Partial<PolylineStyleProps> = {
    radius: 0,
    controlPoints: [],
    router: true,
    routerPadding: 10,
  };

  constructor(options: PolylineOptions) {
    super(deepMix({}, { style: Polyline.defaultStyleProps }, options));
  }

  protected getKeyPath(attributes: ParsedPolylineStyleProps): PathArray {
    const { sourceNode, targetNode, radius } = attributes;

    let [sourcePoint, targetPoint] = this.getEndpoints(attributes);
    const controlPoints = this.getControlPoints(attributes, sourcePoint, targetPoint);

    sourcePoint = getNodeConnectionPoint(sourceNode, controlPoints[0] || targetNode);
    targetPoint = getNodeConnectionPoint(targetNode, controlPoints[controlPoints.length - 1] || sourceNode);

    return getPolylinePath([sourcePoint, ...controlPoints, targetPoint], radius);
  }

  protected getEndpoints(attributes: ParsedPolylineStyleProps): [Point, Point] {
    const {
      sourceNode,
      targetNode,
      sourcePort: sourcePortKey,
      targetPort: targetPortKey,
      sourcePoint: rawSourcePoint,
      targetPoint: rawTargetPoint,
    } = attributes;

    if (rawSourcePoint && rawTargetPoint) return [rawSourcePoint, rawTargetPoint];

    const sourcePort = findPort(sourceNode, sourcePortKey, targetNode);
    const targetPort = findPort(targetNode, targetPortKey, sourceNode);
    // TODO: Ports

    return [sourcePort?.getPosition() || sourceNode.getCenter(), targetPort?.getPosition() || targetNode.getCenter()];
  }

  protected getControlPoints(attributes: ParsedPolylineStyleProps, sourcePoint: Point, targetPoint: Point): Point[] {
    const {
      controlPoints,
      sourceNode,
      targetNode,
      sourcePoint: rawSourcePoint,
      targetPoint: rawTargetPoint,
      router,
      routerPadding,
    } = attributes;

    if (!router) return [...controlPoints];

    const sourceBBox = getNodeBBox(rawSourcePoint || sourceNode, routerPadding);
    const targetBBox = getNodeBBox(rawTargetPoint || targetNode, routerPadding);

    return orth(sourcePoint, targetPoint, sourceBBox, targetBBox, controlPoints, routerPadding);
  }
}
