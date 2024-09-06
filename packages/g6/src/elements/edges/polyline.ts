import type { DisplayObjectConfig } from '@antv/g';
import type { PathArray } from '@antv/util';
import type { LoopStyleProps, Point, PolylineRouter } from '../../types';
import { getBBoxHeight, getBBoxWidth, getNodeBBox } from '../../utils/bbox';
import { getPolylineLoopPath, getPolylinePath } from '../../utils/edge';
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

  protected getControlPoints(attributes: ParsedPolylineStyleProps): Point[] {
    const { router } = attributes;
    const { sourceNode, targetNode } = this;
    const [sourcePoint, targetPoint] = this.getEndpoints(attributes, false);

    let controlPoints: Point[] = [];

    if (!router) {
      controlPoints = attributes.controlPoints;
    } else {
      if (router.type === 'shortest-path') {
        const nodes = this.context.element!.getNodes();
        controlPoints = aStarSearch(sourceNode, targetNode, nodes, router);

        if (!controlPoints.length) {
          controlPoints = orth(sourcePoint, targetPoint, sourceNode, targetNode, attributes.controlPoints, {
            padding: router.offset,
          });
        }
      } else if (router.type === 'orth') {
        controlPoints = orth(sourcePoint, targetPoint, sourceNode, targetNode, attributes.controlPoints, router);
      }
    }

    return controlPoints;
  }

  protected getPoints(attributes: ParsedPolylineStyleProps): Point[] {
    const controlPoints = this.getControlPoints(attributes);

    const [newSourcePoint, newTargetPoint] = this.getEndpoints(attributes, true, controlPoints);
    return [newSourcePoint, ...controlPoints, newTargetPoint];
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
