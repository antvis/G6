import type { AABB, Circle as GCircle, TextStyleProps } from '@antv/g';
import { get, isEmpty, isString } from '@antv/util';
import type { Node, Point } from '../types';
import type {
  AnchorPosition,
  LabelPosition,
  RelativePosition,
  StarAnchorPosition,
  TriangleAnchorPosition,
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
  return node1.id === node2.id;
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
 * Get the Anchor x, y by `position`.
 * @param bbox - BBox of element.
 * @param position - The postion relative with element.
 * @returns [x, y]
 */
export function getAnchorPosition(bbox: AABB, position?: AnchorPosition): Point {
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
 * <en/> Get the Anchor of Node.
 * @param node - <zh/> 节点 | <en/> Node
 * @param anchorKey - <zh/> 锚点的 key | <en/> Anchor key
 * @param oppositeNode - <zh/> 对端节点 | <en/> Opposite Node
 * @returns <zh/> 锚点 | <en/> Anchor
 */
export function findAnchor(node: Node, anchorKey?: string, oppositeNode?: Node): GCircle | undefined {
  if (anchorKey && node.getAnchors()[anchorKey]) {
    return node.getAnchors()[anchorKey];
  } else {
    const anchors = Object.values(node.getAnchors());
    if (!isEmpty(anchors)) {
      const positions = anchors.map((anchor) => anchor.getPosition());
      const targetPosition = oppositeNode ? [oppositeNode.getCenter()] : positions;
      const [nearestPosition] = findNearestPoints(positions, targetPosition);
      return anchors.find((anchor) => anchor.getPosition() === nearestPosition);
    }
    return undefined;
  }
}

/**
 * Get the Text style by `position`.
 * @param bbox - BBox of element.
 * @param position - The postion relative with element.
 * @returns Partial<TextStyleProps>
 */
export function getTextStyleByPosition(bbox: AABB, position: LabelPosition = 'bottom'): Partial<TextStyleProps> {
  const direction = position.split('-');
  const [x, y] = getXYByPosition(bbox, position);

  const textBaseline = direction.includes('top') ? 'bottom' : direction.includes('bottom') ? 'top' : 'middle';
  const textAlign = direction.includes('left') ? 'right' : direction.includes('right') ? 'left' : 'center';

  return {
    x,
    y,
    textBaseline,
    textAlign,
  };
}

/**
 * Get Star PathArray.
 * @param outerR - outer redius
 * @param innerR - inner redius
 * @returns The PathArray for G
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
 * Get Star Anchor Point.
 * @param outerR - outer radius
 * @param innerR - inner radius
 * @returns Anchor points for Star.
 */
export function getStarAnchors(outerR: number, innerR: number): Record<string, Point> {
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
 * Get Star Anchor Point by `position`.
 * @param position - position
 * @param anchors - anchors
 * @returns points
 */
export function getStarAnchorByPosition(position: StarAnchorPosition, anchors: Record<string, Point>) {
  return get(anchors, position.toLocaleLowerCase(), anchors['default']);
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
 * Get Triangle Anchor Point.
 * @param r - radius of circumcircle of triangle
 * @param direction - direction of triangle
 * @returns Anchor points for Triangle.
 */
export function getTriangleAnchors(r: number, direction: 'up' | 'left' | 'right' | 'down'): Record<string, Point> {
  const halfHeight = (3 * r) / 4;
  const halfLength = r * Math.sin((1 / 3) * Math.PI);

  const anchors: Record<string, Point> = {};
  if (direction === 'down') {
    anchors['bottom'] = anchors['default'] = [0, halfHeight];
    anchors['right'] = [halfLength, -halfHeight];
    anchors['left'] = [-halfLength, -halfHeight];
  } else if (direction === 'left') {
    anchors['top'] = [halfHeight, -halfLength];
    anchors['bottom'] = [halfHeight, halfLength];
    anchors['left'] = anchors['default'] = [-halfHeight, 0];
  } else if (direction === 'right') {
    anchors['top'] = [-halfHeight, -halfLength];
    anchors['bottom'] = [-halfHeight, halfLength];
    anchors['right'] = anchors['default'] = [halfHeight, 0];
  } else {
    //up
    anchors['left'] = [-halfLength, halfHeight];
    anchors['top'] = anchors['default'] = [0, -halfHeight];
    anchors['right'] = [halfLength, halfHeight];
  }
  return anchors;
}

/**
 * Get Star Anchor Point by `position`.
 * @param position - position
 * @param anchors - anchors
 * @returns points
 */
export function getTriangleAnchorByPosition(position: TriangleAnchorPosition, anchors: Record<string, Point>) {
  return get(anchors, position.toLocaleLowerCase(), anchors['default']);
}

/**
 * Get Rect PathArray.
 * @param width - rect width
 * @param height - rect height
 * @returns The PathArray for G
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
 * Get Diamond PathArray.
 * @param width - diamond width
 * @param height - diamond height
 * @returns The PathArray for G
 */
export function getDiamondPoints(width: number, height: number): Point[] {
  return [
    [0, -height / 2],
    [width / 2, 0],
    [0, height / 2],
    [-width / 2, 0],
  ];
}
