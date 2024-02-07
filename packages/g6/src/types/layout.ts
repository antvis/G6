import type { ID } from '@antv/graphlib';
import type { Point } from './point';

export type LayoutNodeLikePosition = Record<ID, Point>;

export type LayoutResult = {
  nodes: LayoutNodeLikePosition;
  edges: Record<ID, Record<string, unknown>>;
};
