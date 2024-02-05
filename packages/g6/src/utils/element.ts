import type { AABB, DisplayObject, Circle as GCircle, TextStyleProps } from '@antv/g';
import { get, isEmpty, isString } from '@antv/util';
import type { TriangleDirection } from '../elements/nodes/triangle';
import type { Node, Point } from '../types';
import type { LabelPosition, RelativePosition } from '../types/node';
import { getBBoxHeight, getBBoxWidth } from './bbox';
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
 * @param position - The position relative with element.
 * @returns [x, y]
 */
export function getXYByPosition(bbox: AABB, position: RelativePosition = 'center'): Point {
  const direction = position.split('-');
  const x = direction.includes('left') ? bbox.min[0] : direction.includes('right') ? bbox.max[0] : bbox.center[0];
  const y = direction.includes('top') ? bbox.min[1] : direction.includes('bottom') ? bbox.max[1] : bbox.center[1];
  return [x, y];
}

const PORT_MAP: Record<string, Point> = {
  top: [0.5, 0],
  right: [1, 0.5],
  bottom: [0.5, 1],
  left: [0, 0.5],
  default: [0.5, 0.5],
};

/**
 * Get the Port x, y by `position`.
 * @param bbox - BBox of element.
 * @param position - The position relative with element.
 * @param ports - The map of position.
 * @param isRelative - Whether the position in MAP is relative.
 * @returns [x, y]
 */
export function getPortPosition(
  bbox: AABB,
  position?: [number, number] | string,
  ports: Record<string, Point> = PORT_MAP,
  isRelative = true,
): Point {
  const DEFAULT = [0.5, 0.5];
  const p: [number, number] = isString(position) ? get(ports, position.toLocaleLowerCase(), DEFAULT) : position;

  if (!isRelative && isString(position)) return p;

  const [x, y] = p || DEFAULT;
  return [bbox.min[0] + getBBoxWidth(bbox) * x, bbox.min[1] + getBBoxHeight(bbox) * y];
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
 * @param position - The position relative with element.
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
export function getStarPoints(outerR: number, innerR: number): Point[] {
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
 * <zh/> 获取三角形的顶点
 *
 * <en/> Get the points of a triangle
 * @param width - <zh/> 宽度 | <en/> width
 * @param height - <zh/> 高度 | <en/> height
 * @param direction - <zh/> 三角形的方向 | <en/> The direction of the triangle
 * @returns <zh/> 矩形的顶点 | <en/> The points of a rectangle
 */
export function getTrianglePoints(width: number, height: number, direction: TriangleDirection): Point[] {
  const halfHeight = height / 2;
  const halfWidth = width / 2;
  const MAP: Record<TriangleDirection, Point[]> = {
    up: [
      [-halfWidth, halfHeight],
      [halfWidth, halfHeight],
      [0, -halfHeight],
    ],
    left: [
      [-halfWidth, 0],
      [halfWidth, halfHeight],
      [halfWidth, -halfHeight],
    ],
    right: [
      [-halfWidth, halfHeight],
      [-halfWidth, -halfHeight],
      [halfWidth, 0],
    ],
    down: [
      [-halfWidth, -halfHeight],
      [halfWidth, -halfHeight],
      [0, halfHeight],
    ],
  };
  return MAP[direction] || MAP['up'];
}

/**
 * <zh/> 获取三角形的锚点
 *
 * <en/> Get the Ports of Triangle.
 * @param width - <zh/> 宽度 | <en/> width
 * @param height - <zh/> 高度 | <en/> height
 * @param direction - <zh/> 三角形的方向 | <en/> The direction of the triangle
 * @returns <zh/> 三角形的锚点 | <en/> The Ports of Triangle
 */
export function getTrianglePorts(width: number, height: number, direction: TriangleDirection): Record<string, Point> {
  const halfHeight = height / 2;
  const halfWidth = width / 2;
  const ports: Record<string, Point> = {};
  if (direction === 'down') {
    ports['bottom'] = ports['default'] = [0, halfHeight];
    ports['right'] = [halfWidth, -halfHeight];
    ports['left'] = [-halfWidth, -halfHeight];
  } else if (direction === 'left') {
    ports['top'] = [halfWidth, -halfHeight];
    ports['bottom'] = [halfWidth, halfHeight];
    ports['left'] = ports['default'] = [-halfWidth, 0];
  } else if (direction === 'right') {
    ports['top'] = [-halfWidth, -halfHeight];
    ports['bottom'] = [-halfWidth, halfHeight];
    ports['right'] = ports['default'] = [halfWidth, 0];
  } else {
    //up
    ports['left'] = [-halfWidth, halfHeight];
    ports['top'] = ports['default'] = [0, -halfHeight];
    ports['right'] = [halfWidth, halfHeight];
  }
  return ports;
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

/**
 * <zh/> 元素是否可见
 *
 * <en/> Whether the element is visible
 * @param element - <zh/> 元素 | <en/> element
 * @returns <zh/> 是否可见 | <en/> whether the element is visible
 */
export function isVisible(element: DisplayObject) {
  return element.style.visibility !== 'hidden';
}

/**
 * <zh/> 更新图形样式
 *
 * <en/> Update shape style
 * @param shape - <zh/> 图形 | <en/> shape
 * @param style - <zh/> 样式 | <en/> style
 */
export function update<T extends DisplayObject>(shape: T, style: Record<string, unknown>) {
  if ('update' in shape) (shape.update as (style: Record<string, unknown>) => void)(style);
  else shape.attr(style);
}
