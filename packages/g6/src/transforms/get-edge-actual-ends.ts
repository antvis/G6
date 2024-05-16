import { COMBO_KEY } from '../constants';
import { idOf } from '../exports';
import { DataController } from '../runtime/data';
import type { EdgeData } from '../spec';
import type { NodeLikeData } from '../types';
import { findActualConnectNodeData } from '../utils/edge';
import { BaseTransform } from './base-transform';
import type { DrawData } from './types';
/**
 * <zh/> 获取边的实际端点
 *
 * <en/> Get the actual endpoints of the edge
 */
export class GetEdgeActualEnds extends BaseTransform {
  public beforeDraw(input: DrawData): DrawData {
    const { add, update } = input;
    const { model } = this.context;
    [...add.edges.entries(), ...update.edges.entries()].forEach(([, edge]) => {
      getEdgeEndsContext(model, edge);
    });
    return input;
  }
}

export const getEdgeEndsContext = (model: DataController, edge: EdgeData) => {
  const { source, target } = edge;

  const sourceNodeData = model.getElementDataById(source) as NodeLikeData;
  const targetNodeData = model.getElementDataById(target) as NodeLikeData;

  const actualSourceNode = findActualConnectNodeData(sourceNodeData, (id) => model.getParentData(id, COMBO_KEY));

  const actualTargetNode = findActualConnectNodeData(targetNodeData, (id) => model.getParentData(id, COMBO_KEY));

  const sourceNode = idOf(actualSourceNode);
  const targetNode = idOf(actualTargetNode);

  const ends = { sourceNode, targetNode };

  if (edge.style) {
    Object.assign(edge.style, ends);
  } else edge.style = ends;

  return edge;
};
