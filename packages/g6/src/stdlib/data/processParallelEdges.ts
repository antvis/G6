import { Edge } from '@antv/graphlib';
import { EdgeUserModel, GraphCore, ID } from '../../types';
import { GraphDataChanges } from '../../types/data';
import { EdgeUserModelData } from '../../types/edge';
import { uniqBy } from '../../util/array';
import { loopPosition } from '../../util/loop';

/**
 * Process edges which might overlap. For edges that share the same target and source nodes.
 * @param data input user data.
 * @param options.edgeIds The specific edge IDs to process, all edges by default.
 * @param options.offsetDiff The offset between two parallel edges, 15 by default.
 * @param options.multiEdgeType The edge type for the parallel edges, 'quadratic' by default. You can assign any custom edge type based on 'quadratic' to it.
 * @param options.singleEdgeType The edge type for the single edge between two nodes, undefined by default, which means the type of the edge is kept unchanged as it is in the input data.
 * @param options.loopEdgeType The edge type for a self-loop edge, undefined by default, which means the type of the edge is kept unchanged as it is in the input data.
 * @returns formatted data.
 */

type ParallelEdgesOptions = {
  edgeIds?: ID[];
  offsetDiff?: number;
  multiEdgeType?: string;
  singleEdgeType?: string;
  loopEdgeType?: string;
};

export const ProcessParallelEdges = (
  data: GraphDataChanges,
  options: ParallelEdgesOptions = {},
  graphCore?: GraphCore,
): GraphDataChanges => {
  // Identify the edges to be processed and their associated edges
  const { edgeIds = [] } = options;
  const {
    dataAdded: { edges: edgesAdded = [] } = {},
    dataUpdated: { edges: edgesUpdated = [] } = {},
    dataRemoved: { edges: edgesRemoved = [] } = {},
  } = data;

  const prevEdges = graphCore ? graphCore.getAllEdges() : [];
  const edgeIdsToAdd = new Set(edgesAdded?.map((edge) => edge.id));
  const edgeIdsToRemove = new Set(edgesRemoved?.map((edge) => edge.id));
  const cacheEdges = uniqBy([...prevEdges, ...edgesUpdated], 'id');

  let edges = [...edgesRemoved, ...edgesUpdated, ...edgesAdded];

  // Recognize parallel edges prior to the update
  edgesUpdated.forEach((newModel) => {
    const oldModel = graphCore?.getEdge(newModel.id);
    if (!oldModel) return;
    const { id, source, target } = newModel;
    if ((source && oldModel.source !== source) || (target && oldModel.target !== target)) {
      const prevParallelEdges = getParallelEdges(graphCore.getEdge(id), cacheEdges);
      edges = [...prevParallelEdges, ...edges];
    }
  });

  // Recognize parallel edges following the modification
  edges.forEach((newModel) => {
    const newParallelEdges = getParallelEdges(newModel, cacheEdges);
    edges = [...newParallelEdges, ...edges];
  });

  // Remove deleted edges and filter edges based on edgeIds.
  edges = uniqBy(
    edges.filter((edge) => !edgeIdsToRemove.has(edge.id)),
    'id',
  );
  if (edgeIds.length > 0) {
    edges = edges.filter((edge) => edgeIds.includes(edge.id));
  }

  // Calculate the offset for parallel edges
  edges = calculateOffset(edges, options);

  // Render based on the type of modification
  return {
    ...data,
    dataAdded: {
      ...data.dataAdded,
      edges: edges.filter((edge) => edgeIdsToAdd.has(edge.id)),
    },
    dataUpdated: {
      ...data.dataUpdated,
      edges: edges.filter((edge) => !edgeIdsToAdd.has(edge.id)),
    },
  };
};

/**
 * Get all edges parallel to a given edge
 * @param edgeModel the data model of the edge currently under consideration
 * @param allEdges the set of all edges in graph
 */
const getParallelEdges = (edgeModel: EdgeUserModel, allEdges: Edge<EdgeUserModelData>[]) => {
  const { id, source, target } = edgeModel;
  return allEdges.filter((edge) => {
    return (
      (edge.id !== id && edge.source === source && edge.target === target) ||
      (edge.source === target && edge.target === source)
    );
  });
};

/**
 * Calculate the offset for parallel edges.
 * For each set of parallel edges, alternately assign positive and negative offsets to visually separate them.
 * @param edges parallel edges affected by the modification
 * @param options processing configuration
 */
const calculateOffset = (edges: EdgeUserModel[], options: ParallelEdgesOptions) => {
  const {
    offsetDiff = 15,
    multiEdgeType = 'quadratic-edge',
    singleEdgeType = undefined,
    loopEdgeType = undefined,
  } = options;

  const len = edges.length;
  const cod = offsetDiff * 2;

  const edgeMap = new Map<string, EdgeUserModel[]>();
  const processedEdgesSet = new Set<number>();
  const reverses = {};

  for (let i = 0; i < len; i++) {
    if (processedEdgesSet.has(i)) continue;

    const edge = edges[i];
    const { source, target } = edge;
    const sourceTarget = `${source}-${target}`;

    if (!edgeMap.has(sourceTarget)) edgeMap.set(sourceTarget, []);

    edgeMap.get(sourceTarget)!.push(edge);
    processedEdgesSet.add(i);

    for (let j = i + 1; j < len; j++) {
      if (processedEdgesSet.has(j)) continue;

      const sedge = edges[j];
      const src = sedge.source;
      const dst = sedge.target;

      if ((source === dst && target === src) || (source === src && target === dst)) {
        edgeMap.get(sourceTarget)!.push(sedge);
        processedEdgesSet.add(j);
        if (source === dst && target === src) {
          reverses[`${src}|${dst}|${edgeMap.get(sourceTarget)?.length - 1}`] = true;
        }
      }
    }
  }

  edgeMap.forEach((arcEdges, key) => {
    const { length } = arcEdges;
    for (let k = 0; k < length; k++) {
      const current = arcEdges[k];
      current.data ||= {};

      if (current.source === current.target) {
        if (loopEdgeType) current.data.type = loopEdgeType;
        current.data.keyShape ||= {};
        // @ts-ignore
        current.data.keyShape.loopCfg = {
          position: loopPosition[k % 8],
          dist: Math.floor(k / 8) * 20 + 50,
        };
      } else if (length === 1) {
        if (singleEdgeType) current.data.type = singleEdgeType;
      } else {
        current.data.type = multiEdgeType;
        const sign = (k % 2 === 0 ? 1 : -1) * (reverses[`${current.source}|${current.target}|${k}`] ? -1 : 1);
        current.data.keyShape ||= {};
        // @ts-ignore
        current.data.keyShape.curveOffset =
          length % 2 === 1 ? sign * Math.ceil(k / 2) * cod : sign * (Math.floor(k / 2) * cod + offsetDiff);
      }
    }
  });

  return edges;
};
