import type { AABB, TextStyleProps } from '@antv/g';
import { get, isString } from '@antv/util';
import type { Point } from '../types';
import type { AnchorPosition, LabelPosition, RelativePosition } from '../types/node';

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
