import type { ID } from '@antv/graphlib';
import { isFunction } from '@antv/util';
import type { Graph } from '../runtime/graph';
import type { Point } from '../types';
import type { States } from './types';

type Position = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

/**
 * <zh/> 元素中心是否在 rect 中
 *
 * <en/> Element center in rect.
 * @param graph Graph
 * @param id ID
 * @param position Position
 * @returns boolean
 */
export const isBBoxCenterInRect = (graph: Graph, id: ID, position: Position) => {
  const { left, right, top, bottom } = position;

  const bbox = graph.getElementRenderBounds(id);
  if (!bbox) return false;
  return bbox.center[0] >= left && bbox.center[0] <= right && bbox.center[1] >= top && bbox.center[1] <= bottom;
};

export const getAllElementState = (graph: Graph, callback?: (id: ID, state: string[]) => string[]) => {
  const allElementState: States = {};
  const datas = graph.getData();
  Object.values(datas).forEach((data) => {
    data.map((d: any) => {
      const state = graph.getElementState(d.id);
      allElementState[d.id] = isFunction(callback) ? callback(d.id, state) : state;
    });
  });

  return allElementState;
};

export const transformEdgeState = (graph: Graph, states: States, selectedState: 'active' | 'selected') => {
  const edgeData = graph.getEdgeData();

  edgeData.forEach(({ id, target, source }) => {
    if (!id) return;
    if (states[target].includes(selectedState) && states[source].includes(selectedState)) {
      states[id] = [selectedState];
    } else {
      states[id] = [];
    }
  });
};

export const getPosition = (points: Point[]) => {
  const [p1, p2] = points;
  return {
    left: Math.min(p1[0], p2[0]),
    right: Math.max(p1[0], p2[0]),
    top: Math.min(p1[1], p2[1]),
    bottom: Math.max(p1[1], p2[1]),
  };
};
