import type { PathStyleProps } from '@antv/g';
import { isBoolean, isEmpty, isEqual, isFunction } from '@antv/util';
import type { RuntimeContext } from '../runtime/types';
import type { EdgeData } from '../spec';
import type { EdgeStyle } from '../spec/element/edge';
import type { ID, LoopPlacement, NodeLikeData } from '../types';
import { groupByChangeType, reduceDataChanges } from '../utils/change';
import { idOf } from '../utils/id';
import type { BaseTransformOptions } from './base-transform';
import { BaseTransform } from './base-transform';
import { getEdgeEndsContext } from './get-edge-actual-ends';
import type { DrawData } from './types';
import { isStyleEqual, reassignTo } from './utils';

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
   * <zh/> 处理模式
   * - `'merge'`: 将平行边合并为一条边，适用于不需要区分平行边的情况
   * - '`bundle`': 每条边都会与其他所有平行边捆绑在一起，并通过改变曲率与其他边分开。如果一组平行边的数量是奇数，那么中心的边将被绘制为直线，其他的边将被绘制为曲线
   *
   * <en/> Processing mode
   * - '`merge`': Merge parallel edges into one edge which is suitable for cases where parallel edges do not need to be distinguished
   * - '`bundle`': Each edge will be bundled with all other parallel edges and separated from them by varying the curvature. If the number of parallel edges in a group is odd, the central edge will be drawn as a straight line, and the others will be drawn as curves
   * @defaultValue 'bundle'
   */
  mode: 'bundle' | 'merge';
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
  /**
   * <zh/> 合并边的样式，仅在合并模式下有效
   *
   * <en/> The style of the merged edge, only valid for merging mode
   */
  style?: PathStyleProps | ((prev: EdgeData[]) => PathStyleProps);
}

/**
 * <zh/> 处理平行边，即多条边共享同一源节点和目标节点
 *
 * <en/> Process parallel edges which share the same source and target nodes
 * @remarks
 * <zh/> 平行边（Parallel Edges）是指在图结构中，两个节点之间存在多条边。这些边共享相同的源节点和目标节点，但可能代表不同的关系或属性。为了避免边的重叠和混淆，提供了两种处理平行边的方式：(1) 捆绑模式（bundle）：将平行边捆绑在一起，通过改变曲率与其他边分开；(2) 合并模式（merge）：将平行边合并为一条聚合。
 *
 * <en/> Parallel Edges refer to multiple edges existing between two nodes in a graph structure. These edges share the same source and target nodes but may represent different relationships or attributes. To avoid edge overlap and confusion, two methods are provided for handling parallel edges: (1) Bundle Mode: Bundles parallel edges together and separates them from other edges by altering their curvature; (2) Merge Mode: Merges parallel edges into a single aggregated edge.
 */
export class ProcessParallelEdges extends BaseTransform<ProcessParallelEdgesOptions> {
  static defaultOptions: Partial<ProcessParallelEdgesOptions> = {
    mode: 'bundle',
    distance: 15, // only valid for bundling mode
  };

  private cacheMergeStyle: Map<ID, PathStyleProps> = new Map();

  constructor(context: RuntimeContext, options: ProcessParallelEdgesOptions) {
    super(context, Object.assign({}, ProcessParallelEdges.defaultOptions, options));
  }

  public beforeDraw(input: DrawData): DrawData {
    const edges = this.getAffectedParallelEdges(input);

    if (edges.size === 0) return input;

    this.options.mode === 'bundle'
      ? this.applyBundlingStyle(input, edges, this.options.distance)
      : this.applyMergingStyle(input, edges);

    return input;
  }

  private getAffectedParallelEdges = (input: DrawData): Map<ID, EdgeData> => {
    const {
      add: { edges: edgesToAdd },
      update: { nodes: nodesToUpdate, edges: edgesToUpdate, combos: combosToUpdate },
      remove: { edges: edgesToRemove },
    } = input;

    const { model } = this.context;
    const edges: Map<ID, EdgeData> = new Map();

    const addRelatedEdges = (_: NodeLikeData, id: ID) => {
      const relatedEdgesData = model.getRelatedEdgesData(id);
      relatedEdgesData.forEach((edge) => !edges.has(idOf(edge)) && edges.set(idOf(edge), edge));
    };

    nodesToUpdate.forEach(addRelatedEdges);
    combosToUpdate.forEach(addRelatedEdges);

    const pushParallelEdges = (edge: EdgeData) => {
      const edgeData = model.getEdgeData().map((edge) => getEdgeEndsContext(model, edge));
      const parallelEdges = getParallelEdges(edge, edgeData, true);
      parallelEdges.forEach((e) => !edges.has(idOf(e)) && edges.set(idOf(e), e));
    };

    if (edgesToRemove.size) edgesToRemove.forEach(pushParallelEdges);

    if (edgesToAdd.size) edgesToAdd.forEach(pushParallelEdges);

    if (edgesToUpdate.size) {
      const changes = groupByChangeType(reduceDataChanges(model.getChanges())).update.edges;
      edgesToUpdate.forEach((edge) => {
        pushParallelEdges(edge);
        // 当边的端点发生变化时，将原始边及其平行边一并添加到更新列表 | Add the original edge and its parallel edges to the update list when the endpoints of the edge change
        const originalEdge = changes.find((e) => idOf(e.value) === idOf(edge))?.original;
        if (originalEdge && !isParallelEdges(edge, originalEdge)) {
          pushParallelEdges(originalEdge);
        }
      });
    }

    if (!isEmpty(this.options.edges)) {
      edges.forEach((_: EdgeData, id: ID) => !this.options.edges.includes(id) && edges.delete(id));
    }

    // 按照用户指定的顺序排序，防止捆绑时的抖动
    // Sort by user-set order to prevent jitter during bundling
    const edgeIds = model.getEdgeData().map(idOf);
    return new Map([...edges].sort((a, b) => edgeIds.indexOf(a[0]) - edgeIds.indexOf(b[0])));
  };

  protected applyBundlingStyle = (input: DrawData, edges: Map<ID, EdgeData>, distance: number) => {
    const { edgeMap, reverses } = groupByEndpoints(edges);

    edgeMap.forEach((arcEdges) => {
      arcEdges.forEach((edge, i, edgeArr) => {
        const length = edgeArr.length;
        const style: EdgeStyle = edge.style || {};
        if (edge.source === edge.target) {
          const len = CUBIC_LOOP_PLACEMENTS.length;
          style.loopPlacement = CUBIC_LOOP_PLACEMENTS[i % len];
          style.loopDist = Math.floor(i / len) * distance + 50;
        } else if (length === 1) {
          style.curveOffset = 0;
        } else {
          const sign = (i % 2 === 0 ? 1 : -1) * (reverses[`${edge.source}|${edge.target}|${i}`] ? -1 : 1);
          style.curveOffset =
            length % 2 === 1
              ? sign * Math.ceil(i / 2) * distance * 2
              : sign * (Math.floor(i / 2) * distance * 2 + distance);
        }
        const mergedEdgeData = Object.assign(edge, { type: CUBIC_EDGE_TYPE, style });

        const element = this.context.element?.getElement(idOf(edge));

        if (!element || !isStyleEqual(mergedEdgeData.style, element.attributes)) {
          reassignTo(input, element ? 'update' : 'add', 'edge', mergedEdgeData, true);
        }
      });
    });
  };

  private resetEdgeStyle = (edge: EdgeData) => {
    const style = edge.style || {};
    const cacheStyle = this.cacheMergeStyle.get(idOf(edge)) || {};
    Object.keys(cacheStyle).forEach((key) => {
      if (isEqual(style[key], (cacheStyle as any)[key])) {
        if (edge[key]) {
          style[key] = edge[key];
        } else {
          delete style[key];
        }
      }
    });
    return Object.assign(edge, { style });
  };

  protected applyMergingStyle = (input: DrawData, edges: Map<ID, EdgeData>) => {
    const { edgeMap, reverses } = groupByEndpoints(edges);

    edgeMap.forEach((edges) => {
      if (edges.length === 1) {
        const edge = edges[0];
        const element = this.context.element?.getElement(idOf(edge));
        const edgeStyle = this.resetEdgeStyle(edge);
        if (!element || !isStyleEqual(edgeStyle, element.attributes)) {
          reassignTo(input, element ? 'update' : 'add', 'edge', edgeStyle);
        }
        return;
      }

      const mergedStyle = edges
        .map(({ source, target, style = {} }, i) => {
          const { startArrow, endArrow } = style;
          const newStyle: EdgeData['style'] = {};
          const [start, end] = reverses[`${source}|${target}|${i}`]
            ? ['endArrow', 'startArrow']
            : ['startArrow', 'endArrow'];
          if (isBoolean(startArrow)) newStyle[start] = startArrow;
          if (isBoolean(endArrow)) newStyle[end] = endArrow;
          return newStyle;
        })
        .reduce((acc, style) => ({ ...acc, ...style }), {});

      edges.forEach((edge, i, edges) => {
        if (i !== 0) {
          reassignTo(input, 'remove', 'edge', edge);
          return;
        }
        const parsedStyle = Object.assign(
          {},
          isFunction(this.options.style) ? this.options.style(edges) : this.options.style,
          { childrenData: edges },
        );
        this.cacheMergeStyle.set(idOf(edge), parsedStyle);
        const mergedEdgeData = {
          ...edge,
          type: 'line',
          style: { ...edge.style, ...mergedStyle, ...parsedStyle },
        };

        const element = this.context.element?.getElement(idOf(edge));
        if (!element || !isStyleEqual(mergedEdgeData.style, element.attributes)) {
          reassignTo(input, element ? 'update' : 'add', 'edge', mergedEdgeData, true);
        }
      });
    });
  };
}

/**
 * <zh/> 按照端点分组
 *
 * <en/> Group by endpoints
 * @param edges - <zh/> 边集合 | <en/> Edges
 * @returns <zh/> 端点分组后的边集合 | <en/> Edges grouped by endpoints
 */
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

/**
 * <zh/> 获取平行边
 *
 * <en/> Get parallel edges
 * @param edge - <zh/> 目标边 | <en/> Target edge
 * @param edges - <zh/> 边集合 | <en/> Edges
 * @param containsSelf - <zh/> 输出结果是否包含目标边 | <en/> Whether the output result contains the target edge
 * @returns <zh/> 平行边集合 | <en/> Parallel edges
 */
export const getParallelEdges = (edge: EdgeData, edges: EdgeData[], containsSelf?: boolean): EdgeData[] => {
  return edges.filter((e) => (containsSelf || idOf(e) !== idOf(edge)) && isParallelEdges(e, edge));
};

/**
 * <zh/> 判断两条边是否平行
 *
 * <en/> Determine whether two edges are parallel
 * @param edge1 - <zh/> 边1 | <en/> Edge 1
 * @param edge2 - <zh/> 边2 | <en/> Edge 2
 * @returns <zh/> 是否平行 | <en/> Whether is parallel
 */
export const isParallelEdges = (edge1: EdgeData, edge2: EdgeData) => {
  const { sourceNode: src1, targetNode: tgt1 } = edge1.style || {};
  const { sourceNode: src2, targetNode: tgt2 } = edge2.style || {};
  return (src1 === src2 && tgt1 === tgt2) || (src1 === tgt2 && tgt1 === src2);
};
