import { filter, mix } from '@antv/util';
import { Edge } from '@antv/graphlib';
import { loopPosition } from '../../util/loop';
import { GraphData, EdgeUserModel, ID, GraphCore } from '../../types';
import { uniqBy } from '../../util/array';
import { EdgeUserModelData } from '../../types/edge';

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
export const ProcessParallelEdges = (
  data: GraphData,
  options: {
    edgeIds?: ID[];
    offsetDiff?: number;
    multiEdgeType?: string;
    singleEdgeType?: string;
    loopEdgeType?: string;
  } = {},
  graphCore?: GraphCore,
): GraphData => {
  const {
    edgeIds = [],
    offsetDiff = 15,
    multiEdgeType = 'quadratic-edge',
    singleEdgeType = undefined,
    loopEdgeType = undefined,
  } = options;
  let edges =
    edgeIds.length > 0
      ? filter(data.edges, (edge) => edgeIds.includes(edge.id))
      : data.edges;

  if (graphCore) {
    const prevEdges = graphCore.getAllEdges();

    const getPrevParallelEdges = (
      edgeModel: EdgeUserModel,
      prevEdges: Edge<EdgeUserModelData>[],
    ) => {
      const { id, source, target } = edgeModel;
      return filter(prevEdges, (edge) => {
        return (
          (edge.id !== id &&
            edge.source === source &&
            edge.target === target) ||
          (edge.source === target && edge.target === source)
        );
      });
    };

    edges.forEach((newModel) => {
      const prevParallelEdges = getPrevParallelEdges(newModel, prevEdges);
      edges = [...edges, ...prevParallelEdges];
    });

    edges = uniqBy(edges, 'id');
  }

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

      if (
        (source === dst && target === src) ||
        (source === src && target === dst)
      ) {
        edgeMap.get(sourceTarget)!.push(sedge);
        processedEdgesSet.add(j);
        if (source === dst && target === src) {
          reverses[`${src}|${dst}|${edgeMap.get(sourceTarget)?.length - 1}`] =
            true;
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
        const sign =
          (k % 2 === 0 ? 1 : -1) *
          (reverses[`${current.source}|${current.target}|${k}`] ? -1 : 1);
        current.data.keyShape ||= {};
        // @ts-ignore
        current.data.keyShape.curveOffset =
          length % 2 === 1
            ? sign * Math.ceil(k / 2) * cod
            : sign * (Math.floor(k / 2) * cod + offsetDiff);
      }
    }
  });

  return { ...data, edges: mix(data.edges, edges) };
};
