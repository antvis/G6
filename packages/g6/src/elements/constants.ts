import { Cubic, Line, Polyline, Quadratic } from './edges';
import { Circle } from './nodes';

export const BUILT_IN_NODES = {
  circle: Circle,
};

export const BUILT_IN_EDGES = {
  cubic: Cubic,
  line: Line,
  quadratic: Quadratic,
  polyline: Polyline,
};
