import type { AABB, Circle as GCircle, TextStyleProps } from '@antv/g';
import { get, isEmpty, isString } from '@antv/util';
import type { Node, Point } from '../types';
import type {
  LabelPosition,
  PortPosition,
  RelativePosition,
  StarPortPosition,
  TrianglePortPosition,
} from '../types/node';
import { findNearestPoints } from './point';

/**
 * <zh/> 判断两个节点是否相同
 *
 * <en/> Whether the two nodes are the same
 * @param node1 - <zh/> 节点1 | <en/> Node1
 * @param node2 - <zh/> 节点2 | <en/> Node2
 * @returns <zh/> 是否相同 | <en/> Whether the same
 */
export function isSameNode(node1: Node, node2: Node): boolean {
  if (!node1 || !node2) return false;
  return node1 === node2;
}

/**
 * Get the Badge x, y by `position`.
 * @param bbox - BBox of element.
 * @param position - The postion relative with element.
 * @returns [x, y]
 */
export function getXYByPosition(bbox: AABB, position: RelativePosition = 'center'): Point {
  const direction = position.split('-');
  const x = direction.includes('left') ? bbox.min[0] : direction.includes('right') ? bbox.max[0] : bbox.center[0];
  const y = direction.includes('top') ? bbox.min[1] : direction.includes('bottom') ? bbox.max[1] : bbox.center[1];
  return [x, y];
}

/**
 * Get the Port x, y by `position`.
 * @param bbox - BBox of element.
 * @param position - The postion relative with element.
 * @returns [x, y]
 */
export function getPortPosition(bbox: AABB, position?: PortPosition): Point {
  const MAP = {
    top: [0.5, 0],
    right: [1, 0.5],
    bottom: [0.5, 1],
    left: [0, 0.5],
  };

  const DEFAULT = [0.5, 0.5];

  const p: [number, number] = isString(position) ? get(MAP, position.toLocaleLowerCase(), DEFAULT) : position;

  const [x, y] = p || DEFAULT;

  const w = bbox.max[0] - bbox.min[0];
  const h = bbox.max[1] - bbox.min[1];

  return [bbox.min[0] + w * x, bbox.min[1] + h * y];
}

/**
 * <zh/> 获取节点的锚点
 *
 * <en/> Get the Port of Node.
 * @param node - <zh/> 节点 | <en/> Node
 * @param portKey - <zh/> 锚点的 key | <en/> Port key
 * @param oppositeNode - <zh/> 对端节点 | <en/> Opposite Node
 * @returns <zh/> 锚点 | <en/> Port
 */
export function findPort(node: Node, portKey?: string, oppositeNode?: Node): GCircle | undefined {
  if (portKey && node.getPorts()[portKey]) {
    return node.getPorts()[portKey];
  } else {
    const ports = Object.values(node.getPorts());
    if (!isEmpty(ports)) {
      const positions = ports.map((port) => port.getPosition());
      const targetPosition = oppositeNode ? [oppositeNode.getCenter()] : positions;
      const [nearestPosition] = findNearestPoints(positions, targetPosition);
      return ports.find((port) => port.getPosition() === nearestPosition);
    }
    return undefined;
  }
}

/**
 * Get the Text style by `position`.
 * @param bbox - BBox of element.
 * @param position - The postion relative with element.
 * @param isReverseBaseline - Whether reverse the baseline.
 * @returns Partial<TextStyleProps>
 */
export function getTextStyleByPosition(
  bbox: AABB,
  position: LabelPosition = 'bottom',
  isReverseBaseline = false,
): Partial<TextStyleProps> {
  const direction = position.split('-');
  const [x, y] = getXYByPosition(bbox, position);

  const textAlign = direction.includes('left') ? 'right' : direction.includes('right') ? 'left' : 'center';

  let textBaseline: TextStyleProps['textBaseline'] = direction.includes('top')
    ? 'bottom'
    : direction.includes('bottom')
      ? 'top'
      : 'middle';
  if (isReverseBaseline) {
    textBaseline = textBaseline === 'top' ? 'bottom' : textBaseline === 'bottom' ? 'top' : textBaseline;
  }

  return {
    x,
    y,
    textBaseline,
    textAlign,
  };
}

/**
 * <zh/> 获取五角星的顶点
 *
 * <en/> Get Star Points
 * @param outerR - <zh/> 外半径 | <en/> outer radius
 * @param innerR - <zh/> 内半径 | <en/> inner radius
 * @returns <zh/> 五角星的顶点 | <en/> Star Points
 */
export function getStarPoints(outerR: number, innerR?: number): Point[] {
  innerR = innerR ? innerR : (outerR * 3) / 8;
  return [
    [0, -outerR],
    [innerR * Math.cos((3 * Math.PI) / 10), -innerR * Math.sin((3 * Math.PI) / 10)],
    [outerR * Math.cos(Math.PI / 10), -outerR * Math.sin(Math.PI / 10)],
    [innerR * Math.cos(Math.PI / 10), innerR * Math.sin(Math.PI / 10)],
    [outerR * Math.cos((3 * Math.PI) / 10), outerR * Math.sin((3 * Math.PI) / 10)],
    [0, innerR],
    [-outerR * Math.cos((3 * Math.PI) / 10), outerR * Math.sin((3 * Math.PI) / 10)],
    [-innerR * Math.cos(Math.PI / 10), innerR * Math.sin(Math.PI / 10)],
    [-outerR * Math.cos(Math.PI / 10), -outerR * Math.sin(Math.PI / 10)],
    [-innerR * Math.cos((3 * Math.PI) / 10), -innerR * Math.sin((3 * Math.PI) / 10)],
  ];
}

/**
 * Get Star Port Point.
 * @param outerR - outer radius
 * @param innerR - inner radius
 * @returns Port points for Star.
 */
export function getStarPorts(outerR: number, innerR: number): Record<string, Point> {
  const r: Record<string, Point> = {};

  r['top'] = [0, -outerR];

  r['left'] = [-outerR * Math.cos(Math.PI / 10), -outerR * Math.sin(Math.PI / 10)];

  r['left-bottom'] = [-outerR * Math.cos((3 * Math.PI) / 10), outerR * Math.sin((3 * Math.PI) / 10)];

  r['bottom'] = [0, innerR];

  r['right-bottom'] = [outerR * Math.cos((3 * Math.PI) / 10), outerR * Math.sin((3 * Math.PI) / 10)];

  r['right'] = r['default'] = [outerR * Math.cos(Math.PI / 10), -outerR * Math.sin(Math.PI / 10)];

  return r;
}

/**
 * Get Star Port Point by `position`.
 * @param position - position
 * @param ports - ports
 * @returns points
 */
export function getStarPortByPosition(position: StarPortPosition, ports: Record<string, Point>) {
  return get(ports, position.toLocaleLowerCase(), ports['default']);
}

/**
 * Get Triangle Points.
 * @param r - radius of circumcircle of triangle
 * @param direction - direction of triangle
 * @returns The PathArray for G
 */
export function getTrianglePoints(r: number, direction: 'up' | 'left' | 'right' | 'down'): Point[] {
  const halfHeight = (3 * r) / 4;
  const halfLength = r * Math.sin((1 / 3) * Math.PI);
  if (direction === 'down') {
    return [
      [0, halfHeight],
      [halfLength, -halfHeight],
      [-halfLength, -halfHeight],
    ];
  }
  if (direction === 'left') {
    return [
      [-halfHeight, 0],
      [halfHeight, halfLength],
      [halfHeight, -halfLength],
    ];
  }
  if (direction === 'right') {
    return [
      [halfHeight, 0],
      [-halfHeight, halfLength],
      [-halfHeight, -halfLength],
    ];
  }
  // up
  return [
    [0, -halfHeight],
    [halfLength, halfHeight],
    [-halfLength, halfHeight],
  ];
}

/**
 * Get Triangle Port Point.
 * @param r - radius of circumcircle of triangle
 * @param direction - direction of triangle
 * @returns Port points for Triangle.
 */
export function getTrianglePorts(r: number, direction: 'up' | 'left' | 'right' | 'down'): Record<string, Point> {
  const halfHeight = (3 * r) / 4;
  const halfLength = r * Math.sin((1 / 3) * Math.PI);

  const ports: Record<string, Point> = {};
  if (direction === 'down') {
    ports['bottom'] = ports['default'] = [0, halfHeight];
    ports['right'] = [halfLength, -halfHeight];
    ports['left'] = [-halfLength, -halfHeight];
  } else if (direction === 'left') {
    ports['top'] = [halfHeight, -halfLength];
    ports['bottom'] = [halfHeight, halfLength];
    ports['left'] = ports['default'] = [-halfHeight, 0];
  } else if (direction === 'right') {
    ports['top'] = [-halfHeight, -halfLength];
    ports['bottom'] = [-halfHeight, halfLength];
    ports['right'] = ports['default'] = [halfHeight, 0];
  } else {
    //up
    ports['left'] = [-halfLength, halfHeight];
    ports['top'] = ports['default'] = [0, -halfHeight];
    ports['right'] = [halfLength, halfHeight];
  }
  return ports;
}

/**
 * Get Star Port Point by `position`.
 * @param position - position
 * @param ports - ports
 * @returns points
 */
export function getTrianglePortByPosition(position: TrianglePortPosition, ports: Record<string, Point>) {
  return get(ports, position.toLocaleLowerCase(), ports['default']);
}

/**
 * <zh/> 获取矩形的顶点
 *
 * <en/> Get the points of a rectangle
 * @param width - <zh/> 宽度 | <en/> width
 * @param height - <zh/> 高度 | <en/> height
 * @returns <zh/> 矩形的顶点 | <en/> The points of a rectangle
 */
export function getRectPoints(width: number, height: number): Point[] {
  return [
    [width / 2, -height / 2],
    [width / 2, height / 2],
    [-width / 2, height / 2],
    [-width / 2, -height / 2],
  ];
}
