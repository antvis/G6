import type { AABB, DisplayObject, TransformArray } from '@antv/g';
import type { PathArray } from '@antv/util';
import { isEqual, isNumber } from '@antv/util';
import type { EdgeData } from '../spec';
import type {
  EdgeBadgeStyleProps,
  EdgeKey,
  EdgeLabelStyleProps,
  ID,
  LoopPlacement,
  Node,
  NodeLikeData,
  Point,
  Port,
  Size,
  Vector2,
} from '../types';
import { getBBoxHeight, getBBoxSize, getBBoxWidth, getNearestBoundarySide, getNodeBBox } from './bbox';
import { isCollapsed } from './collapsibility';
import { getAllPorts, getNodeConnectionPoint, getPortConnectionPoint, getPortPosition } from './element';
import { idOf } from './id';
import { isCollinear, isHorizontal, moveTo, parsePoint } from './point';
import { freeJoin } from './router/orth';
import { add, distance, manhattanDistance, multiply, normalize, perpendicular, subtract } from './vector';

/**
 * <zh/> 获取标签的位置样式
 *
 * <en/> Get the style of the label's position
 * @param key - <zh/> 边对象 | <en/> The edge object
 * @param placement - <zh/> 标签位置 | <en/> Position of the label
 * @param autoRotate - <zh/> 是否自动旋转 | <en/> Whether to auto-rotate
 * @param offsetX - <zh/> 标签相对于边的水平偏移量 | <en/> Horizontal offset of the label relative to the edge
 * @param offsetY - <zh/> 标签相对于边的垂直偏移量 | <en/> Vertical offset of the label relative to the edge
 * @returns <zh/> 标签的位置样式 | <en/> Returns the style of the label's position
 */
export function getLabelPositionStyle(
  key: EdgeKey,
  placement: EdgeLabelStyleProps['placement'],
  autoRotate: boolean,
  offsetX: number,
  offsetY: number,
): Partial<EdgeLabelStyleProps> {
  const START_RATIO = 0;
  const MIDDLE_RATIO = 0.5;
  const END_RATIO = 0.99;

  let ratio = typeof placement === 'number' ? placement : MIDDLE_RATIO;
  if (placement === 'start') ratio = START_RATIO;
  if (placement === 'end') ratio = END_RATIO;

  const point = parsePoint(key.getPoint(ratio));
  const pointOffset = parsePoint(key.getPoint(ratio + 0.01));

  let textAlign: 'left' | 'right' | 'center' =
    placement === 'start' ? 'left' : placement === 'end' ? 'right' : 'center';

  if (isHorizontal(point, pointOffset) || !autoRotate) {
    const [x, y] = getXYByPlacement(key, ratio, offsetX, offsetY);
    return { transform: [['translate', x, y]], textAlign };
  }

  let angle = Math.atan2(pointOffset[1] - point[1], pointOffset[0] - point[0]);

  const isRevert = pointOffset[0] < point[0];
  if (isRevert) {
    textAlign = textAlign === 'center' ? textAlign : textAlign === 'left' ? 'right' : 'left';
    offsetX! *= -1;
    angle += Math.PI;
  }

  const [x, y] = getXYByPlacement(key, ratio, offsetX, offsetY, angle);
  const transform: TransformArray = [
    ['translate', x, y],
    ['rotate', (angle / Math.PI) * 180],
  ];

  return {
    textAlign,
    transform,
  };
}

/**
 * <zh/> 获取边上徽标的位置样式
 *
 * <en/> Get the position style of the badge on the edge
 * @param shapeMap - <zh/> 边上的图形映射 | <en/> Shape map on the edge
 * @param placement - <zh/> 徽标位置 | <en/> Badge position
 * @param labelPlacement - <zh/> 标签位置 | <en/> Label position
 * @param offsetX - <zh/> 水平偏移量 | <en/> Horizontal offset
 * @param offsetY - <zh/> 垂直偏移量 | <en/> Vertical offset
 * @returns <zh/> 徽标的位置样式 | <en/> Position style of the badge
 */
export function getBadgePositionStyle(
  shapeMap: Record<string, DisplayObject<any, any>>,
  placement: EdgeBadgeStyleProps['placement'],
  labelPlacement: EdgeLabelStyleProps['placement'],
  offsetX: number,
  offsetY: number,
) {
  const badgeWidth = shapeMap.badge?.getGeometryBounds().halfExtents[0] * 2 || 0;
  const labelWidth = shapeMap.label?.getGeometryBounds().halfExtents[0] * 2 || 0;

  return getLabelPositionStyle(
    shapeMap.key as EdgeKey,
    labelPlacement,
    true,
    (labelWidth ? (labelWidth / 2 + badgeWidth / 2) * (placement === 'suffix' ? 1 : -1) : 0) + offsetX,
    offsetY,
  );
}

/**
 * <zh/> 获取给定边上的指定位置的坐标
 *
 * <en/> Get the coordinates at the specified position on the given edge
 * @param key - <zh/> 边实例 | <en/> Edge instance
 * @param ratio - <zh/> 位置比率 | <en/> Position ratio
 * @param offsetX - <zh/> 水平偏移量 | <en/> Horizontal offset
 * @param offsetY - <zh/> 垂直偏移量 | <en/> Vertical offset
 * @param angle - <zh/> 旋转角度 | <en/> Rotation angle
 * @returns <zh/> 坐标 | <en/> Coordinates
 */
function getXYByPlacement(key: EdgeKey, ratio: number, offsetX: number, offsetY: number, angle?: number) {
  const [pointX, pointY] = parsePoint(key.getPoint(ratio));
  let actualOffsetX = offsetX;
  let actualOffsetY = offsetY;

  if (angle) {
    actualOffsetX = offsetX * Math.cos(angle) - offsetY * Math.sin(angle);
    actualOffsetY = offsetX * Math.sin(angle) + offsetY * Math.cos(angle);
  }

  return [pointX + actualOffsetX, pointY + actualOffsetY];
}

/** ==================== Curve Edge =========================== */

/**
 * <zh/> 计算曲线的控制点
 *
 * <en/> Calculate the control point of the curve
 * @param sourcePoint - <zh/> 起点 | <en/> Source point
 * @param targetPoint - <zh/> 终点 | <en/> Target point
 * @param curvePosition - <zh/> 控制点在连线上的相对位置（取值范围为 0-1） | <en/> The relative position of the control point on the line (value range from 0 to 1)
 * @param curveOffset - <zh/> 控制点距离两端点连线的距离 | <en/> The distance between the control point and the line
 * @returns <zh/> 控制点 | <en/> Control points
 */
export function getCurveControlPoint(
  sourcePoint: Point,
  targetPoint: Point,
  curvePosition: number,
  curveOffset: number,
): Point {
  if (isEqual(sourcePoint, targetPoint)) return sourcePoint;
  const lineVector = subtract(targetPoint, sourcePoint);
  const controlPoint: Point = [
    sourcePoint[0] + curvePosition * lineVector[0],
    sourcePoint[1] + curvePosition * lineVector[1],
  ];
  const perpVector = normalize(perpendicular(lineVector as Vector2, false));
  controlPoint[0] += curveOffset * perpVector[0];
  controlPoint[1] += curveOffset * perpVector[1];
  return controlPoint;
}

/**
 * <zh/> 解析控制点距离两端点连线的距离 `curveOffset`
 *
 * <en/> parse the distance of the control point from the line `curveOffset`
 * @param curveOffset - <zh/> curveOffset | <en/> curveOffset
 * @returns <zh/> 标准 curveOffset | <en/> standard curveOffset
 */
export function parseCurveOffset(curveOffset: number | [number, number]): [number, number] {
  if (isNumber(curveOffset)) return [curveOffset, -curveOffset];
  return curveOffset;
}

/**
 * <zh/> 解析控制点在两端点连线上的相对位置 `curvePosition`，范围为`0-1`
 *
 * <en/> parse the relative position of the control point on the line `curvePosition`
 * @param curvePosition - <zh/> curvePosition | <en/> curvePosition
 * @returns <zh/> 标准 curvePosition | <en/> standard curvePosition
 */
export function parseCurvePosition(curvePosition: number | [number, number]): [number, number] {
  if (isNumber(curvePosition)) return [curvePosition, 1 - curvePosition];
  return curvePosition;
}

/**
 * <zh/> 获取二次贝塞尔曲线绘制路径
 *
 * <en/> Calculate the path for drawing a quadratic Bessel curve
 * @param sourcePoint - <zh/> 边的起点 | <en/> Source point
 * @param targetPoint - <zh/> 边的终点 | <en/> Target point
 * @param controlPoint - <zh/> 控制点 | <en/> Control point
 * @returns <zh/> 返回绘制曲线的路径 | <en/> Returns curve path
 */
export function getQuadraticPath(sourcePoint: Point, targetPoint: Point, controlPoint: Point): PathArray {
  return [
    ['M', sourcePoint[0], sourcePoint[1]],
    ['Q', controlPoint[0], controlPoint[1], targetPoint[0], targetPoint[1]],
  ];
}

/**
 * <zh/> 获取三次贝塞尔曲线绘制路径
 *
 * <en/> Calculate the path for drawing a cubic Bessel curve
 * @param sourcePoint - <zh/> 边的起点 | <en/> Source point
 * @param targetPoint - <zh/> 边的终点 | <en/> Target point
 * @param controlPoints - <zh/> 控制点 | <en/> Control point
 * @returns <zh/> 返回绘制曲线的路径 | <en/> Returns curve path
 */
export function getCubicPath(sourcePoint: Point, targetPoint: Point, controlPoints: [Point, Point]): PathArray {
  return [
    ['M', sourcePoint[0], sourcePoint[1]],
    [
      'C',
      controlPoints[0][0],
      controlPoints[0][1],
      controlPoints[1][0],
      controlPoints[1][1],
      targetPoint[0],
      targetPoint[1],
    ],
  ];
}

/** ==================== Polyline Edge =========================== */

/**
 * <zh/> 获取折线的绘制路径
 *
 * <en/> Calculates the path for drawing a polyline
 * @param points - <zh/> 折线的顶点 | <en/> The vertices of the polyline
 * @param radius - <zh/> 圆角半径 | <en/> Radius of the rounded corner
 * @param z - <zh/> 路径是否闭合 | <en/> Whether the path is closed
 * @returns <zh/> 返回绘制折线的路径 | <en/> Returns the path for drawing a polyline
 */
export function getPolylinePath(points: Point[], radius = 0, z = false): PathArray {
  const sourcePoint = points[0];
  const targetPoint = points[points.length - 1];
  const controlPoints = points.slice(1, points.length - 1);
  const pathArray: PathArray = [['M', sourcePoint[0], sourcePoint[1]]];
  controlPoints.forEach((midPoint, i) => {
    const prevPoint = controlPoints[i - 1] || sourcePoint;
    const nextPoint = controlPoints[i + 1] || targetPoint;
    if (!isCollinear(prevPoint, midPoint, nextPoint) && radius) {
      const [ps, pt] = getBorderRadiusPoints(prevPoint, midPoint, nextPoint, radius);
      pathArray.push(['L', ps[0], ps[1]], ['Q', midPoint[0], midPoint[1], pt[0], pt[1]], ['L', pt[0], pt[1]]);
    } else {
      pathArray.push(['L', midPoint[0], midPoint[1]]);
    }
  });
  pathArray.push(['L', targetPoint[0], targetPoint[1]]);
  if (z) pathArray.push(['Z']);
  return pathArray;
}

/**
 * <zh/> 根据给定的半径计算出不共线的三点生成贝塞尔曲线的控制点，以模拟接近圆弧
 *
 * <en/> Calculates the control points of the Bezier curve generated by three non-collinear points according to the given radius to simulate an arc
 * @param prevPoint - <zh/> 前一个点 | <en/> Previous point
 * @param midPoint - <zh/> 中间点 | <en/> Middle point
 * @param nextPoint - <zh/> 后一个点 | <en/> Next point
 * @param radius - <zh/> 圆角半径 | <en/> Radius of the rounded corner
 * @returns <zh/> 返回控制点 | <en/> Returns control points
 */
export function getBorderRadiusPoints(
  prevPoint: Point,
  midPoint: Point,
  nextPoint: Point,
  radius: number,
): [Point, Point] {
  const d0 = manhattanDistance(prevPoint, midPoint);
  const d1 = manhattanDistance(nextPoint, midPoint);
  // 取给定的半径和最小半径之间的较小值 | use the smaller value between the given radius and the minimum radius
  const r = Math.min(radius, Math.min(d0, d1) / 2);
  const ps: Point = [
    midPoint[0] - (r / d0) * (midPoint[0] - prevPoint[0]),
    midPoint[1] - (r / d0) * (midPoint[1] - prevPoint[1]),
  ];
  const pt: Point = [
    midPoint[0] - (r / d1) * (midPoint[0] - nextPoint[0]),
    midPoint[1] - (r / d1) * (midPoint[1] - nextPoint[1]),
  ];
  return [ps, pt];
}

/** ==================== Loop Edge =========================== */

export const getRadians = (bbox: AABB): Record<LoopPlacement, [number, number]> => {
  const halfPI = Math.PI / 2;
  const halfHeight = getBBoxHeight(bbox) / 2;
  const halfWidth = getBBoxWidth(bbox) / 2;
  const angleWithX = Math.atan2(halfHeight, halfWidth) / 2;
  const angleWithY = Math.atan2(halfWidth, halfHeight) / 2;
  return {
    top: [-halfPI - angleWithY, -halfPI + angleWithY],
    'top-right': [-halfPI + angleWithY, -angleWithX],
    'right-top': [-halfPI + angleWithY, -angleWithX],
    right: [-angleWithX, angleWithX],
    'bottom-right': [angleWithX, halfPI - angleWithY],
    'right-bottom': [angleWithX, halfPI - angleWithY],
    bottom: [halfPI - angleWithY, halfPI + angleWithY],
    'bottom-left': [halfPI + angleWithY, Math.PI - angleWithX],
    'left-bottom': [halfPI + angleWithY, Math.PI - angleWithX],
    left: [Math.PI - angleWithX, Math.PI + angleWithX],
    'top-left': [Math.PI + angleWithX, -halfPI - angleWithY],
    'left-top': [Math.PI + angleWithX, -halfPI - angleWithY],
  };
};

/**
 * <zh/> 获取环形边的起点和终点
 *
 * <en/> Get the start and end points of the loop edge
 * @param node - <zh/> 节点实例 | <en/> Node instance
 * @param placement - <zh/> 环形边相对于节点位置 | <en/> Loop position relative to the node
 * @param clockwise - <zh/> 是否顺时针 | <en/> Whether to draw the loop clockwise
 * @param sourcePort - <zh/> 起点连接桩 | <en/> Source port
 * @param targetPort - <zh/> 终点连接桩 | <en/> Target port
 * @returns <zh/> 起点和终点 | <en/> Start and end points
 */
export function getLoopEndpoints(
  node: Node,
  placement: LoopPlacement,
  clockwise: boolean,
  sourcePort?: Port,
  targetPort?: Port,
): [Point, Point] {
  const bbox = getNodeBBox(node);
  const center = node.getCenter();

  let sourcePoint = sourcePort && getPortPosition(sourcePort);
  let targetPoint = targetPort && getPortPosition(targetPort);

  if (!sourcePoint || !targetPoint) {
    const radians = getRadians(bbox);
    const angle1 = radians[placement][0];
    const angle2 = radians[placement][1];
    const [width, height] = getBBoxSize(bbox);
    const r = Math.max(width, height);
    const point1: Point = add(center, [r * Math.cos(angle1), r * Math.sin(angle1), 0]);
    const point2: Point = add(center, [r * Math.cos(angle2), r * Math.sin(angle2), 0]);

    sourcePoint = getNodeConnectionPoint(node, point1);
    targetPoint = getNodeConnectionPoint(node, point2);

    if (!clockwise) {
      [sourcePoint, targetPoint] = [targetPoint, sourcePoint];
    }
  }

  return [sourcePoint, targetPoint];
}

/**
 * <zh/> 获取环形边的绘制路径
 *
 * <en/> Get the path of the loop edge
 * @param node - <zh/> 节点实例 | <en/> Node instance
 * @param placement - <zh/> 环形边相对于节点位置 | <en/> Loop position relative to the node
 * @param clockwise - <zh/> 是否顺时针 | <en/> Whether to draw the loop clockwise
 * @param dist - <zh/> 从节点 keyShape 边缘到自环顶部的距离 | <en/> The distance from the edge of the node keyShape to the top of the self-loop
 * @param sourcePortKey - <zh/> 起点连接桩 key | <en/> Source port key
 * @param targetPortKey - <zh/> 终点连接桩 key | <en/> Target port key
 * @returns <zh/> 返回绘制环形边的路径 | <en/> Returns the path of the loop edge
 */
export function getCubicLoopPath(
  node: Node,
  placement: LoopPlacement,
  clockwise: boolean,
  dist: number,
  sourcePortKey?: string,
  targetPortKey?: string,
) {
  const sourcePort = node.getPorts()[(sourcePortKey || targetPortKey)!];
  const targetPort = node.getPorts()[(targetPortKey || sourcePortKey)!];

  // 1. 获取起点和终点 | Get the start and end points
  let [sourcePoint, targetPoint] = getLoopEndpoints(node, placement, clockwise, sourcePort, targetPort);

  // 2. 获取控制点 | Get the control points
  const controlPoints = getCubicLoopControlPoints(node, sourcePoint, targetPoint, dist);

  // 3. 如果定义了连接桩，调整端点以与连接桩边界相交 | If the port is defined, adjust the endpoint to intersect with the port boundary
  if (sourcePort) sourcePoint = getPortConnectionPoint(sourcePort, controlPoints[0]);
  if (targetPort) targetPoint = getPortConnectionPoint(targetPort, controlPoints[controlPoints.length - 1]);

  return getCubicPath(sourcePoint, targetPoint, controlPoints);
}

/**
 * <zh/> 获取环形边的控制点
 *
 * <en/> Get the control points of the loop edge
 * @param node - <zh/> 节点实例 | <en/> Node instance
 * @param sourcePoint - <zh/> 起点 | <en/> Source point
 * @param targetPoint - <zh/> 终点 | <en/> Target point
 * @param dist - <zh/> 从节点 keyShape 边缘到自环顶部的距离 | <en/> The distance from the edge of the node keyShape to the top of the self-loop
 * @returns <zh/> 控制点 | <en/> Control points
 */
export function getCubicLoopControlPoints(
  node: Node,
  sourcePoint: Point,
  targetPoint: Point,
  dist: number,
): [Point, Point] {
  const center = node.getCenter();

  if (isEqual(sourcePoint, targetPoint)) {
    const direction = subtract(sourcePoint, center);
    const adjustment: Point = [
      dist * Math.sign(direction[0]) || dist / 2,
      dist * Math.sign(direction[1]) || -dist / 2,
      0,
    ];
    return [add(sourcePoint, adjustment), add(targetPoint, multiply(adjustment, [1, -1, 1]))];
  }

  return [
    moveTo(center, sourcePoint, distance(center, sourcePoint) + dist),
    moveTo(center, targetPoint, distance(center, targetPoint) + dist),
  ];
}

/**
 * <zh/> 获取环形折线边的绘制路径
 *
 * <en/> Get the path of the loop polyline edge
 * @param node - <zh/> 节点实例 | <en/> Node instance
 * @param radius - <zh/> 圆角半径 | <en/> Radius of the rounded corner
 * @param placement - <zh/> 环形边相对于节点位置 | <en/> Loop position relative to the node
 * @param clockwise - <zh/> 是否顺时针 | <en/> Whether to draw the loop clockwise
 * @param dist - <zh/> 从节点 keyShape 边缘到自环顶部的距离 | <en/> The distance from the edge of the node keyShape to the top of the self-loop
 * @param sourcePortKey - <zh/> 起点连接桩 key | <en/> Source port key
 * @param targetPortKey - <zh/> 终点连接桩 key | <en/> Target port key
 * @returns <zh/> 返回绘制环形折线边的路径 | <en/> Returns the path of the loop polyline edge
 */
export function getPolylineLoopPath(
  node: Node,
  radius: number,
  placement: LoopPlacement,
  clockwise: boolean,
  dist: number,
  sourcePortKey?: string,
  targetPortKey?: string,
) {
  const allPortsMap = getAllPorts(node);
  const sourcePort = allPortsMap[(sourcePortKey || targetPortKey)!];
  const targetPort = allPortsMap[(targetPortKey || sourcePortKey)!];

  // 1. 获取起点和终点 | Get the start and end points
  let [sourcePoint, targetPoint] = getLoopEndpoints(node, placement, clockwise, sourcePort, targetPort);

  // 2. 获取控制点 | Get the control points
  const controlPoints = getPolylineLoopControlPoints(node, sourcePoint, targetPoint, dist);

  // 3. 如果定义了连接桩，调整端点以与连接桩边界相交 | If the port is defined, adjust the endpoint to intersect with the port boundary
  if (sourcePort) sourcePoint = getPortConnectionPoint(sourcePort, controlPoints[0]);
  if (targetPort) targetPoint = getPortConnectionPoint(targetPort, controlPoints[controlPoints.length - 1]);

  return getPolylinePath([sourcePoint, ...controlPoints, targetPoint], radius);
}

/**
 * <zh/> 获取环形折线边的控制点
 *
 * <en/> Get the control points of the loop polyline edge
 * @param node - <zh/> 节点实例 | <en/> Node instance
 * @param sourcePoint - <zh/> 起点 | <en/> Source point
 * @param targetPoint - <zh/> 终点 | <en/> Target point
 * @param dist - <zh/> 从节点 keyShape 边缘到自环顶部的距离 | <en/> The distance from the edge of the node keyShape to the top of the self-loop
 * @returns <zh/> 控制点 | <en/> Control points
 */
export function getPolylineLoopControlPoints(node: Node, sourcePoint: Point, targetPoint: Point, dist: number) {
  const controlPoints: Point[] = [];
  const bbox = getNodeBBox(node);

  // 1. 起点和终点相同 | The start and end points are the same
  if (isEqual(sourcePoint, targetPoint)) {
    const side = getNearestBoundarySide(sourcePoint, bbox);
    switch (side) {
      case 'left':
        controlPoints.push([sourcePoint[0] - dist, sourcePoint[1]]);
        controlPoints.push([sourcePoint[0] - dist, sourcePoint[1] + dist]);
        controlPoints.push([sourcePoint[0], sourcePoint[1] + dist]);
        break;
      case 'right':
        controlPoints.push([sourcePoint[0] + dist, sourcePoint[1]]);
        controlPoints.push([sourcePoint[0] + dist, sourcePoint[1] + dist]);
        controlPoints.push([sourcePoint[0], sourcePoint[1] + dist]);
        break;
      case 'top':
        controlPoints.push([sourcePoint[0], sourcePoint[1] - dist]);
        controlPoints.push([sourcePoint[0] + dist, sourcePoint[1] - dist]);
        controlPoints.push([sourcePoint[0] + dist, sourcePoint[1]]);
        break;
      case 'bottom':
        controlPoints.push([sourcePoint[0], sourcePoint[1] + dist]);
        controlPoints.push([sourcePoint[0] + dist, sourcePoint[1] + dist]);
        controlPoints.push([sourcePoint[0] + dist, sourcePoint[1]]);
        break;
    }
  } else {
    const sourceSide = getNearestBoundarySide(sourcePoint, bbox);
    const targetSide = getNearestBoundarySide(targetPoint, bbox);
    // 2. 起点与终点同边 | The start and end points are on the same side
    if (sourceSide === targetSide) {
      const side = sourceSide;
      let x, y;
      switch (side) {
        case 'left':
          x = Math.min(sourcePoint[0], targetPoint[0]) - dist;
          controlPoints.push([x, sourcePoint[1]]);
          controlPoints.push([x, targetPoint[1]]);
          break;
        case 'right':
          x = Math.max(sourcePoint[0], targetPoint[0]) + dist;
          controlPoints.push([x, sourcePoint[1]]);
          controlPoints.push([x, targetPoint[1]]);
          break;
        case 'top':
          y = Math.min(sourcePoint[1], targetPoint[1]) - dist;
          controlPoints.push([sourcePoint[0], y]);
          controlPoints.push([targetPoint[0], y]);
          break;
        case 'bottom':
          y = Math.max(sourcePoint[1], targetPoint[1]) + dist;
          controlPoints.push([sourcePoint[0], y]);
          controlPoints.push([targetPoint[0], y]);
          break;
      }
    } else {
      // 3. 起点与终点不同边 | The start and end points are on different sides
      const getPointOffSide = (side: 'left' | 'right' | 'top' | 'bottom', point: Point): Point => {
        return {
          left: [point[0] - dist, point[1]],
          right: [point[0] + dist, point[1]],
          top: [point[0], point[1] - dist],
          bottom: [point[0], point[1] + dist],
        }[side] as Point;
      };
      const p1 = getPointOffSide(sourceSide, sourcePoint);
      const p2 = getPointOffSide(targetSide, targetPoint);
      const p3 = freeJoin(p1, p2, bbox);
      controlPoints.push(p1, p3, p2);
    }
  }

  return controlPoints;
}

/**
 * <zh/> 获取子图内的所有边，并按照内部边和外部边分组
 *
 * <en/> Get all the edges in the subgraph and group them into internal and external edges
 * @param ids - <zh/> 节点 ID 数组 | <en/> Node ID array
 * @param getRelatedEdges - <zh/> 获取节点邻边 | <en/> Get node edges
 * @returns <zh/> 子图边 | <en/> Subgraph edges
 */
export function getSubgraphRelatedEdges(ids: ID[], getRelatedEdges: (id: ID) => EdgeData[]) {
  const edges = new Set<EdgeData>();
  const internal = new Set<EdgeData>();
  const external = new Set<EdgeData>();

  ids.forEach((id) => {
    const relatedEdges = getRelatedEdges(id);
    relatedEdges.forEach((edge) => {
      edges.add(edge);
      if (ids.includes(edge.source) && ids.includes(edge.target)) internal.add(edge);
      else external.add(edge);
    });
  });

  return { edges: Array.from(edges), internal: Array.from(internal), external: Array.from(external) };
}

/**
 * <zh/> 获取边的实际连接节点
 *
 * <en/> Get the actual connected object of the edge
 * @param node - <zh/> 逻辑连接节点数据 | <en/> Logical connection node data
 * @param getParentData - <zh/> 获取父节点数据 | <en/> Get parent node data
 * @returns <zh/> 实际连接节点数据 | <en/> Actual connected node data
 */
export function findActualConnectNodeData(node: NodeLikeData, getParentData: (id: ID) => NodeLikeData | undefined) {
  const path: NodeLikeData[] = [];
  let current = node;
  while (current) {
    path.push(current);
    const parent = getParentData(idOf(current));
    if (parent) current = parent;
    else break;
  }

  if (path.some((n) => n.style?.collapsed)) {
    const index = path.reverse().findIndex(isCollapsed);
    return path[index] || path.at(-1);
  }

  return node;
}

/**
 * <zh/> 获取箭头大小，若用户未指定，则根据线宽自动计算
 *
 * <en/> Get the size of the arrow
 * @param lineWidth - <zh/> 箭头所在边的线宽 | <en/> The line width of the edge where the arrow is located
 * @param size - <zh/> 自定义箭头大小 | <en/> Custom arrow size
 * @returns <zh/> 箭头大小 | <en/> Arrow size
 */
export function getArrowSize(lineWidth: number, size?: Size): Size {
  if (size) return size;

  if (lineWidth < 4) return 10;
  if (lineWidth === 4) return 12;
  return lineWidth * 2.5;
}
