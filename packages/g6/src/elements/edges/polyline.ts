import type { DisplayObjectConfig } from '@antv/g';
import type { PathArray } from '@antv/util';
import { deepMix } from '@antv/util';
import type { BaseEdgeProps, Padding, Point, Port } from '../../types';
import { getPolylinePath } from '../../utils/edge';
import { findPorts, getConnectionPoint } from '../../utils/element';
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
   * <zh/> 路由名称，目前支持 'orth'
   * <en/> Routing name, currently supports 'orth'
   */
  routerName?: 'orth';
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
    router: false,
    routerName: 'orth',
    routerPadding: 10,
  };

  constructor(options: PolylineOptions) {
    super(deepMix({}, { style: Polyline.defaultStyleProps }, options));
  }

  protected getKeyPath(attributes: ParsedPolylineStyleProps): PathArray {
    const { sourceNode, targetNode, radius } = attributes;

    // 1. 获取端点和锚点（节点上的特定接入点） | Get endpoints and ports
    const { sourcePoint, targetPoint, sourcePort, targetPort } = this.getEndpointsAndPorts(attributes);

    // 2. 计算控制点 | Calculate control points
    const controlPoints = this.getControlPoints(attributes, sourcePoint, targetPoint);

    // 3. 计算实际的连接点 | Calculate the actual connection points
    const newSourcePoint = getConnectionPoint(sourcePort || sourceNode, controlPoints[0] || targetPort || targetNode);
    const newTargetPoint = getConnectionPoint(
      targetPort || targetNode,
      controlPoints[controlPoints.length - 1] || sourcePort || sourceNode,
    );

    // 4. 获取路径 | Get the path
    return getPolylinePath([newSourcePoint, ...controlPoints, newTargetPoint], radius);
  }

  private getEndpointsAndPorts(attributes: ParsedPolylineStyleProps): {
    sourcePoint: Point;
    targetPoint: Point;
    sourcePort: Port | undefined;
    targetPort: Port | undefined;
  } {
    const {
      sourceNode,
      targetNode,
      sourcePort: sourcePortKey,
      targetPort: targetPortKey,
      sourcePoint,
      targetPoint,
    } = attributes;

    if (sourcePoint && targetPoint)
      return {
        sourcePoint,
        targetPoint,
        sourcePort: undefined,
        targetPort: undefined,
      };

    const [sourcePort, targetPort] = findPorts(sourceNode, targetNode, sourcePortKey, targetPortKey);

    return {
      sourcePoint: sourcePort?.getPosition() || sourceNode.getCenter(),
      targetPoint: targetPort?.getPosition() || targetNode.getCenter(),
      sourcePort,
      targetPort,
    };
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
