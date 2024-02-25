import type { DisplayObjectConfig } from '@antv/g';
import type { PathArray } from '@antv/util';
import { deepMix } from '@antv/util';
import type { Padding, Point, Port } from '../../types';
import { getBBoxHeight, getBBoxWidth, getNodeBBox } from '../../utils/bbox';
import { getPolylineLoopPath, getPolylinePath } from '../../utils/edge';
import { findPorts, getConnectionPoint } from '../../utils/element';
import { subStyleProps } from '../../utils/prefix';
import { orth } from '../../utils/router/orth';
import type { BaseEdgeStyleProps, LoopStyleProps } from './base-edge';
import { BaseEdge } from './base-edge';

export type PolylineStyleProps = BaseEdgeStyleProps & {
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
};
type ParsedPolylineStyleProps = Required<PolylineStyleProps>;

export class Polyline extends BaseEdge {
  static defaultStyleProps: Partial<PolylineStyleProps> = {
    radius: 0,
    controlPoints: [],
    router: false,
    routerName: 'orth',
    routerPadding: 10,
  };

  constructor(options: DisplayObjectConfig<PolylineStyleProps>) {
    super(deepMix({}, { style: Polyline.defaultStyleProps }, options));
  }

  protected getKeyPath(attributes: ParsedPolylineStyleProps): PathArray {
    const { sourceNode, targetNode, radius } = attributes;
    // 1. 获取连接点（若有连接桩，取连接桩中心；反之，取节点中心）和连接桩 | Get connection points (if port, take port center; otherwise, take node center) and ports
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
    const { sourceNode, targetNode, sourcePort: sourcePortKey, targetPort: targetPortKey } = attributes;

    const [sourcePort, targetPort] = findPorts(sourceNode, targetNode, sourcePortKey, targetPortKey);

    return {
      sourcePoint: sourcePort?.getPosition() || sourceNode.getCenter(),
      targetPoint: targetPort?.getPosition() || targetNode.getCenter(),
      sourcePort,
      targetPort,
    };
  }

  protected getControlPoints(attributes: ParsedPolylineStyleProps, sourcePoint: Point, targetPoint: Point): Point[] {
    const { controlPoints, sourceNode, targetNode, router, routerPadding } = attributes;

    if (!router) return [...controlPoints];

    const sourceBBox = getNodeBBox(sourceNode, routerPadding);
    const targetBBox = getNodeBBox(targetNode, routerPadding);

    return orth(sourcePoint, targetPoint, sourceBBox, targetBBox, controlPoints, routerPadding);
  }

  protected getLoopPath(attributes: ParsedPolylineStyleProps): PathArray {
    const { sourceNode: node, sourcePort: sourcePortKey, targetPort: targetPortKey, radius } = attributes;

    const bbox = getNodeBBox(node);
    // 默认转折点距离为 bbox 的最大宽高的 1/4 | Default distance of the turning point is 1/4 of the maximum width and height of the bbox
    const defaultDist = Math.max(getBBoxWidth(bbox), getBBoxHeight(bbox)) / 4;

    const {
      position,
      clockwise,
      dist = defaultDist,
    } = subStyleProps<Required<LoopStyleProps>>(this.getGraphicStyle(attributes), 'loop');

    return getPolylineLoopPath(node, radius, position, clockwise, dist, sourcePortKey, targetPortKey);
  }
}
