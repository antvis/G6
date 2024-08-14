import type { DisplayObjectConfig } from '@antv/g';
import type { PathArray } from '@antv/util';
import type { LoopStyleProps, Point, PolylineRouter } from '../../types';
import { getBBoxHeight, getBBoxWidth, getNodeBBox } from '../../utils/bbox';
import { getPolylineLoopPath, getPolylinePath } from '../../utils/edge';
import { findPorts, getConnectionPoint, getPortPosition } from '../../utils/element';
import { subStyleProps } from '../../utils/prefix';
import { orth } from '../../utils/router/orth';
import { aStarSearch } from '../../utils/router/shortest-path';
import { mergeOptions } from '../../utils/style';
import type { BaseEdgeStyleProps } from './base-edge';
import { BaseEdge } from './base-edge';

/**
 * <zh/> 折线样式配置项
 *
 * <en/> Polyline style properties
 */
export interface PolylineStyleProps extends BaseEdgeStyleProps {
  /**
   * <zh/> 圆角半径
   *
   * <en/> The radius of the rounded corner
   * @defaultValue 0
   */
  radius?: number;
  /**
   * <zh/> 控制点数组
   *
   * <en/> Control point array
   */
  controlPoints?: Point[];
  /**
   * <zh/> 是否启用路由，默认开启且 controlPoints 会自动计入
   *
   * <en/> Whether to enable routing, it is enabled by default and controlPoints will be automatically included
   * @defaultValue false
   */
  router?: PolylineRouter;
}

type ParsedPolylineStyleProps = Required<PolylineStyleProps>;

/**
 * <zh/> 折线
 *
 * <en/> Polyline
 */
export class Polyline extends BaseEdge {
  static defaultStyleProps: Partial<PolylineStyleProps> = {
    radius: 0,
    controlPoints: [],
    router: false,
  };

  constructor(options: DisplayObjectConfig<PolylineStyleProps>) {
    super(mergeOptions({ style: Polyline.defaultStyleProps }, options));
  }

  protected getPoints(attributes: ParsedPolylineStyleProps): Point[] {
    const { controlPoints, router } = attributes;
    const { sourceNode, targetNode } = this;

    const { sourcePort: sourcePortKey, targetPort: targetPortKey } = attributes;
    const [sourcePort, targetPort] = findPorts(sourceNode, targetNode, sourcePortKey, targetPortKey);

    const sourcePoint = sourcePort ? getPortPosition(sourcePort) : sourceNode.getCenter();
    const targetPoint = targetPort ? getPortPosition(targetPort) : targetNode.getCenter();

    if (!router) return [sourcePoint, ...controlPoints, targetPoint];

    if (router.type === 'orth') {
      const vertices = orth(sourcePoint, targetPoint, sourceNode, targetNode, controlPoints, router);

      const newSourcePoint = getConnectionPoint(sourcePort || sourceNode, vertices[0] || targetPort || targetNode);
      const newTargetPoint = getConnectionPoint(
        targetPort || targetNode,
        vertices[vertices.length - 1] || sourcePort || sourceNode,
      );

      return [newSourcePoint, ...vertices, newTargetPoint];
    }

    const nodes = this.context.element!.getNodes();
    return aStarSearch(sourceNode, targetNode, nodes, router);
  }

  protected getKeyPath(attributes: ParsedPolylineStyleProps): PathArray {
    const points = this.getPoints(attributes);
    return getPolylinePath(points, attributes.radius);
  }

  protected getLoopPath(attributes: ParsedPolylineStyleProps): PathArray {
    const { sourcePort: sourcePortKey, targetPort: targetPortKey, radius } = attributes;
    const node = this.sourceNode;

    const bbox = getNodeBBox(node);
    // 默认转折点距离为 bbox 的最大宽高的 1/4
    // Default distance of the turning point is 1/4 of the maximum width and height of the bbox
    const defaultDist = Math.max(getBBoxWidth(bbox), getBBoxHeight(bbox)) / 4;

    const {
      placement,
      clockwise,
      dist = defaultDist,
    } = subStyleProps<Required<LoopStyleProps>>(this.getGraphicStyle(attributes), 'loop');

    return getPolylineLoopPath(node, radius, placement, clockwise, dist, sourcePortKey, targetPortKey);
  }
}
