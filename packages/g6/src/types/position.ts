import type { Vector2, Vector3 } from './vector';

export type Position =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'center'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export type PositionPoint = Vector2 | Vector3;
