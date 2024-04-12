import { isFunction } from '@antv/util';

import type { ID } from '@antv/graphlib';
import type { States } from '../../behaviors/types';
import type { Graph } from '../../runtime/graph';

/**
 * <zh/> 获取所有元素状态.
 *
 * <en/> Gets all element states.
 * @param graph Graph
 * @param callback (id: ID, state: string[]) => string[]
 * @returns States
 */
export const getAllElementState = (graph: Graph, callback?: (id: ID, state: string[]) => string[]): States => {
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

/**
 * <zh/> 转化 edge 状态.
 *
 * <en/> Example Transform the edge state.
 * @param graph Graph
 * @param states States
 * @param state 'active' | 'selected'
 */
export const transformEdgeState = (graph: Graph, states: States, state: 'active' | 'selected') => {
  const edgeData = graph.getEdgeData();

  edgeData.forEach(({ id, target, source }) => {
    if (!id) return;
    if (states[target].includes(state) && states[source].includes(state)) {
      states[id] = [state];
    } else {
      states[id] = [];
    }
  });
};
