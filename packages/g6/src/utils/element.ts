import type { AABB, TextStyleProps } from '@antv/g';
import type { PathArray } from '@antv/util';
import { get, isString } from '@antv/util';
import type { Point } from '../types';
import type {
  AnchorPosition,
  LabelPosition,
  RelativePosition,
  StarAnchorPosition,
  TriangleAnchorPosition,
} from '../types/node';

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
 * Get the Text style by `position`.
 * @param bbox - BBox of element.
 * @param position - The postion relative with element.
 * @returns Partial<TextStyleProps>
 */
export function getTextStyleByPosition(bbox: AABB, position: LabelPosition = 'center'): Partial<TextStyleProps> {
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
export function getStarPath(outerR: number, innerR?: number): PathArray {
  innerR = innerR ? innerR : (outerR * 3) / 8;
  return [
    ['M', 0, -outerR],
    ['L', innerR * Math.cos((3 * Math.PI) / 10), -innerR * Math.sin((3 * Math.PI) / 10)],
    ['L', outerR * Math.cos(Math.PI / 10), -outerR * Math.sin(Math.PI / 10)],
    ['L', innerR * Math.cos(Math.PI / 10), innerR * Math.sin(Math.PI / 10)],
    ['L', outerR * Math.cos((3 * Math.PI) / 10), outerR * Math.sin((3 * Math.PI) / 10)],
    ['L', 0, innerR],
    ['L', -outerR * Math.cos((3 * Math.PI) / 10), outerR * Math.sin((3 * Math.PI) / 10)],
    ['L', -innerR * Math.cos(Math.PI / 10), innerR * Math.sin(Math.PI / 10)],
    ['L', -outerR * Math.cos(Math.PI / 10), -outerR * Math.sin(Math.PI / 10)],
    ['L', -innerR * Math.cos((3 * Math.PI) / 10), -innerR * Math.sin((3 * Math.PI) / 10)],
    ['Z'],
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
 * Get Triangle PathArray.
 * @param r - radius of circumcircle of triangle
 * @param direction - direction of triangle
 * @returns The PathArray for G
 */
export function getTrianglePath(r: number, direction: 'up' | 'left' | 'right' | 'down'): PathArray {
  const halfHeight = (3 * r) / 4;
  const halfLength = r * Math.sin((1 / 3) * Math.PI);
  if (direction === 'down') {
    return [['M', 0, halfHeight], ['L', halfLength, -halfHeight], ['L', -halfLength, -halfHeight], ['Z']];
  }
  if (direction === 'left') {
    return [['M', -halfHeight, 0], ['L', halfHeight, halfLength], ['L', halfHeight, -halfLength], ['Z']];
  }
  if (direction === 'right') {
    return [['M', halfHeight, 0], ['L', -halfHeight, halfLength], ['L', -halfHeight, -halfLength], ['Z']];
  }
  // up
  return [['M', 0, -halfHeight], ['L', halfLength, halfHeight], ['L', -halfLength, halfHeight], ['Z']];
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
