import type { ID } from '@antv/graphlib';
import { isEmpty } from '@antv/util';
import type { RuntimeContext } from '../runtime/types';
import type { EdgeData } from '../spec';
import type { LoopPlacement, NodeLikeData } from '../types';
import { groupByChangeType, reduceDataChanges } from '../utils/change';
import { idOf } from '../utils/id';
import type { BaseTransformOptions } from './base-transform';
import { BaseTransform } from './base-transform';
import type { DrawData } from './types';

const CUBIC_EDGE_TYPE = 'quadratic';

const CUBIC_LOOP_PLACEMENTS: LoopPlacement[] = [
  'top',
  'top-right',
  'right',
  'right-bottom',
  'bottom',
  'bottom-left',
  'left',
  'left-top',
];

export interface ProcessParallelEdgesOptions extends BaseTransformOptions {
  /**
   * <zh/> 考虑要处理的边，默认为全部边
   *
   * <en/> The edges to be handled, all edges by default
   */
  edges?: ID[];
  /**
   * <zh/> 边之间的距离，仅在捆绑模式下有效
   *
   * <en/> The distance between edges, only valid for bundling mode
   */
  distance?: number;
}

/**
 * <zh/> 处理平行边，即多条边共享同一源节点和目标节点
 *
 * <en/> Handle parallel edges which share the same source and target nodes
 */
export class ProcessParallelEdges extends BaseTransform<ProcessParallelEdgesOptions> {
  static defaultOptions: Partial<ProcessParallelEdgesOptions> = {
    edges: undefined,
    distance: 15, // only valid for bundling mode
  };

  constructor(context: RuntimeContext, options: ProcessParallelEdgesOptions) {
    super(context, Object.assign({}, ProcessParallelEdges.defaultOptions, options));
  }

  public beforeDraw(input: DrawData): DrawData {
    const edges = this.getAffectedParallelEdges(input);

    if (edges.size === 0) return input;

    this.applyBundlingStyle(edges, this.options.distance);

    const {
      add: { edges: edgesToAdd },
      update: { edges: edgesToUpdate },
    } = input;

    edges.forEach((edge, id) => (edgesToAdd.has(id) ? edgesToAdd : edgesToUpdate).set(id, edge));

    return input;
  }

  private getAffectedParallelEdges = (input: DrawData): Map<ID, EdgeData> => {
    const {
      add: { edges: edgesToAdd },
      update: { nodes: nodesToUpdate, edges: edgesToUpdate, combos: combosToUpdate },
      remove: { edges: edgesToRemove },
    } = input;

    const { model } = this.context;
    const edges: Map<ID, EdgeData> = new Map([...edgesToUpdate, ...edgesToAdd].reverse());

    const addRelatedEdges = (_: NodeLikeData, id: ID) => {
      const relatedEdgesData = model.getRelatedEdgesData(id).reverse();
      relatedEdgesData.forEach((edge) => !edges.has(idOf(edge)) && edges.set(idOf(edge), edge));
    };

    nodesToUpdate.forEach(addRelatedEdges);
    combosToUpdate.forEach(addRelatedEdges);

    const pushParallelEdges = (edge: EdgeData) => {
      const parallelEdges = getParallelEdges(edge, model.getEdgeData()).reverse();
      parallelEdges.forEach((e) => !edges.has(idOf(e)) && edges.set(idOf(e), e));
    };

    if (edgesToRemove.size) edgesToRemove.forEach(pushParallelEdges);

    if (edgesToAdd.size) edgesToAdd.forEach(pushParallelEdges);

    if (edgesToUpdate.size) {
      const changes = groupByChangeType(reduceDataChanges(model.getChanges())).update.edges;
      edgesToUpdate.forEach((edge) => {
        pushParallelEdges(edge);

        const originalEdge = changes.find((e) => idOf(e.value) === idOf(edge))?.original;
        if (originalEdge && !isParallelEdges(edge, originalEdge)) pushParallelEdges(originalEdge);
      });
    }

    if (!isEmpty(this.options.edges)) {
      edges.forEach((_: EdgeData, id: ID) => !this.options.edges.includes(id) && edges.delete(id));
    }

    return new Map([...edges].reverse());
  };

  protected applyBundlingStyle = (edges: Map<ID, EdgeData>, distance: number): Map<ID, EdgeData> => {
    const { edgeMap, reverses } = groupByEndpoints(edges);

    edgeMap.forEach((arcEdges) => {
      arcEdges.forEach((current, k, arr) => {
        const length = arr.length;
        current.style ||= {};
        current.style.type = CUBIC_EDGE_TYPE;
        if (current.source === current.target) {
          current.style.loopPlacement = CUBIC_LOOP_PLACEMENTS[k % 8];
          current.style.loopDist = Math.floor(k / 8) * distance + 50;
        } else if (length === 1) {
          current.style.curveOffset = 0;
        } else {
          const sign = (k % 2 === 0 ? 1 : -1) * (reverses[`${current.source}|${current.target}|${k}`] ? -1 : 1);
          current.style.curveOffset =
            length % 2 === 1
              ? sign * Math.ceil(k / 2) * distance * 2
              : sign * (Math.floor(k / 2) * distance * 2 + distance);
        }
      });
    });

    return edges;
  };
}

export const groupByEndpoints = (edges: Map<ID, EdgeData>) => {
  const edgeMap = new Map<string, EdgeData[]>();
  const processedEdgesSet = new Set<ID>();
  const reverses: Record<string, boolean> = {};

  for (const [id, edge] of edges) {
    if (processedEdgesSet.has(id)) continue;

    const { source, target } = edge;
    const sourceTarget = `${source}-${target}`;

    if (!edgeMap.has(sourceTarget)) edgeMap.set(sourceTarget, []);
    edgeMap.get(sourceTarget)!.push(edge);
    processedEdgesSet.add(id);

    for (const [otherId, sedge] of edges) {
      if (processedEdgesSet.has(otherId)) continue;

      if (isParallelEdges(edge, sedge)) {
        edgeMap.get(sourceTarget)!.push(sedge);
        processedEdgesSet.add(otherId);
        if (source === sedge.target && target === sedge.source) {
          reverses[`${sedge.source}|${sedge.target}|${edgeMap.get(sourceTarget)!.length - 1}`] = true;
        }
      }
    }
  }

  return { edgeMap, reverses };
};

export const getParallelEdges = (edge: EdgeData, edges: EdgeData[]): EdgeData[] => {
  return edges.filter((e) => isParallelEdges(e, edge));
};

export const isParallelEdges = (edge1: EdgeData, edge2: EdgeData) => {
  if (idOf(edge1) === idOf(edge2)) return false;
  const { source: src1, target: tgt1 } = edge1;
  const { source: src2, target: tgt2 } = edge2;
  return (src1 === src2 && tgt1 === tgt2) || (src1 === tgt2 && tgt1 === src2);
};
