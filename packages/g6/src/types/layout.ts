import type { ID } from '@antv/graphlib';
import type { Positions } from './position';

export type LayoutResult = {
  nodes: Positions;
  edges: Record<ID, Record<string, unknown>>;
};
