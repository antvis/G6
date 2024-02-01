import { get, isString, type PathArray } from '@antv/util';
import type { Point } from '../types';
import type { AnchorPosition } from '../types/node';

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
export function getStarAnchorByPosition(position: AnchorPosition, anchors: Record<string, Point>) {
  if (isString(position)) {
    return get(anchors, position.toLocaleLowerCase(), anchors['default']);
  }
  return position;
}
