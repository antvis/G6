import { isEmpty } from '@antv/util';
import { GraphEvent } from '../../constants';
import type { RuntimeContext } from '../../runtime/types';
import type { EdgeData } from '../../spec';
import type { ID, Point } from '../../types';
import { getPolylinePath } from '../../utils/edge';
import { idOf } from '../../utils/id';
import { positionOf } from '../../utils/position';
import { add, distance, divide, dot, multiply, subtract, toVector2 } from '../../utils/vector';
import type { BasePluginOptions } from '../base-plugin';
import { BasePlugin } from '../base-plugin';

/**
 * <zh/> 边绑定插件的配置项
 *
 * <en/> Edge bundling options
 */
export interface EdgeBundlingOptions extends BasePluginOptions {
  /**
   * <zh/> 边的强度
   *
   * <en/> The strength of the edge
   * @defaultValue 0.1
   */
  K?: number;
  /**
   * <zh/> 初始步长。在后续的周期中，步长将双倍递增
   *
   * <en/> An initial step size. In subsequent cycles, the step size will double incrementally
   * @defaultValue 0.1
   */
  lambda?: number;
  /**
   * <zh/> 模拟周期数
   *
   * <en/> The number of simulation cycles
   * @defaultValue 6
   */
  cycles?: number;
  /**
   * <zh/> 初始切割点数。在后续的周期中，切割点数将根据 `divRate` 逐步递增
   *
   * <en/> An initial number of subdivision points for each edge. In subsequent cycles, the number of subdivision points will increase gradually according to `divRate`
   * @defaultValue 1
   */
  divisions?: number;
  /**
   * <zh/> 切割点数增长率
   *
   * <en/> The rate at which the number of subdivision points increases
   * @defaultValue 2
   */
  divRate?: number;
  /**
   * <zh/> 指定在第一个周期中执行的迭代次数。在后续的周期中，迭代次数将根据 `iterRate` 逐步递减
   *
   * <en/> The number of iteration steps during the first cycle. In subsequent cycles, the number of iterations will decrease gradually according to `iterRate`
   * @defaultValue 90
   */
  iterations?: number;
  /**
   * <zh/> 迭代次数递减率
   *
   * <en/> The rate at which the number of iterations decreases
   * @defaultValue 2 / 3
   */
  iterRate?: number;
  /**
   * <zh/> 边兼容性阈值，决定了哪些边应该被绑定在一起
   *
   * <en/> Edge compatibility threshold, which determines which edges should be bundled together
   * @defaultValue 0.6
   */
  bundleThreshold?: number;
}

/**
 * <zh/> 边绑定
 *
 * <en/> Edge bundling
 * @remarks
 * <zh/> 边绑定（Edge Bundling）是一种图可视化技术，用于减少复杂网络图中的视觉混乱，并揭示图中的高级别模式和结构。其思想是将相邻的边捆绑在一起。
 *
 * <zh/> G6 中提供的边绑定插件是基于 FEDB（Force-Directed Edge Bundling for Graph Visualization）一文的实现：将边建模为可以相互吸引的柔性弹簧，通过自组织的方式进行捆绑。
 *
 * <en/> Edge bundling is a graph visualization technique used to reduce visual clutter in complex network graphs and reveal high-level patterns and structures in the graph. The idea is to bundle adjacent edges together.
 *
 * <en/> The edge bundling plugin provided in G6 is based on the implementation of the paper FEDB (Force-Directed Edge Bundling for Graph Visualization): modeling edges as flexible springs that can attract each other and bundling them in a self-organizing way.
 */
export class EdgeBundling extends BasePlugin<EdgeBundlingOptions> {
  static defaultOptions: Partial<EdgeBundlingOptions> = {
    K: 0.1,
    lambda: 0.1,
    divisions: 1,
    divRate: 2,
    cycles: 6,
    iterations: 90,
    iterRate: 2 / 3,
    bundleThreshold: 0.6,
  };

  constructor(context: RuntimeContext, options?: EdgeBundlingOptions) {
    super(context, Object.assign({}, EdgeBundling.defaultOptions, options));
    this.bindEvents();
  }

  private edgeBundles: Record<ID, EdgeData[]> = {};

  private edgePoints: Record<ID, Point[]> = {};

  private get nodeMap(): Record<ID, Point> {
    const nodes = this.context.model.getNodeData();
    return Object.fromEntries(nodes.map((node) => [idOf(node), toVector2(positionOf(node))]));
  }

  private divideEdges(divisions: number) {
    const edges = this.context.model.getEdgeData();

    edges.forEach((edge) => {
      const edgeId = idOf(edge);
      this.edgePoints[edgeId] ||= [];

      const source = this.nodeMap[edge.source];
      const target = this.nodeMap[edge.target];

      if (divisions === 1) {
        this.edgePoints[edgeId].push(source);
        this.edgePoints[edgeId].push(divide(add(source, target), 2));
        this.edgePoints[edgeId].push(target);
      } else {
        const edgeLength =
          this.edgePoints[edgeId].length === 0
            ? // edge is a straight line
              distance(source, target)
            : // edge is a polyline
              getEdgeLength(this.edgePoints[edgeId]);

        const divisionLength = edgeLength / (divisions + 1);
        let currentDivisionLength = divisionLength;

        const newEdgePoints: Point[] = [source];

        for (let i = 1; i < this.edgePoints[edgeId].length; i++) {
          const prevEp = this.edgePoints[edgeId][i - 1];
          const ep = this.edgePoints[edgeId][i];
          let oriDivisionLength = distance(ep, prevEp);

          while (oriDivisionLength > currentDivisionLength) {
            const ratio = currentDivisionLength / oriDivisionLength;
            const edgePoint = add(prevEp, multiply(subtract(ep, prevEp), ratio));
            newEdgePoints.push(edgePoint);

            oriDivisionLength -= currentDivisionLength;
            currentDivisionLength = divisionLength;
          }

          currentDivisionLength -= oriDivisionLength;
        }

        newEdgePoints.push(target);
        this.edgePoints[edgeId] = newEdgePoints;
      }
    });
  }

  private getVectorPosition(edge: EdgeData): VectorPosition {
    const source = this.nodeMap[edge.source];
    const target = this.nodeMap[edge.target];
    const [vx, vy] = subtract(target, source);
    const length = distance(source, target);
    return { source, target, vx, vy, length };
  }

  private measureEdgeCompatibility(edge1: EdgeData, edge2: EdgeData) {
    const vector1 = this.getVectorPosition(edge1);
    const vector2 = this.getVectorPosition(edge2);

    const ac = getAngleCompatibility(vector1, vector2);
    const sc = getScaleCompatibility(vector1, vector2);
    const pc = getPositionCompatibility(vector1, vector2);
    const vc = getVisibilityCompatibility(vector1, vector2);

    return ac * sc * pc * vc;
  }

  private getEdgeBundles() {
    const edgeBundles: Record<ID, EdgeData[]> = {};
    const bundleThreshold = this.options.bundleThreshold;
    const edges = this.context.model.getEdgeData();

    edges.forEach((edge1, i) => {
      edges.forEach((edge2, j) => {
        if (j <= i) return;

        const compatibility = this.measureEdgeCompatibility(edge1, edge2);
        if (compatibility >= bundleThreshold) {
          edgeBundles[idOf(edge1)] ||= [];
          edgeBundles[idOf(edge1)].push(edge2);
          edgeBundles[idOf(edge2)] ||= [];
          edgeBundles[idOf(edge2)].push(edge1);
        }
      });
    });
    return edgeBundles;
  }

  private getSpringForce(divisions: { pre: Point; cur: Point; next: Point }, kp: number): Point {
    const { pre, cur, next } = divisions;
    return multiply(subtract(add(pre, next), multiply(cur, 2)), kp);
  }

  private getElectrostaticForce(pidx: number, edge: EdgeData): Point {
    if (isEmpty(this.edgeBundles)) {
      this.edgeBundles = this.getEdgeBundles();
    }

    const edgeBundle = this.edgeBundles[idOf(edge)];
    let resForce: Point = [0, 0];

    edgeBundle?.forEach((eb) => {
      const p1 = this.edgePoints[idOf(eb)][pidx];
      const p2 = this.edgePoints[idOf(edge)][pidx];
      const force = subtract(p1, p2);
      const length = distance(p1, p2);
      resForce = add(resForce, multiply(force, 1 / length));
    });

    return resForce;
  }

  private getEdgeForces(edge: EdgeData, divisions: number, lambda: number): Point[] {
    const source = this.nodeMap[edge.source];
    const target = this.nodeMap[edge.target];
    const kp = this.options.K / (distance(source, target) * (divisions + 1));
    const edgePointForces: Point[] = [[0, 0]];
    const edgeId = idOf(edge);

    for (let i = 1; i < divisions; i++) {
      const spring = this.getSpringForce(
        {
          pre: this.edgePoints[edgeId][i - 1],
          cur: this.edgePoints[edgeId][i],
          next: this.edgePoints[edgeId][i + 1] || [0, 0],
        },
        kp,
      );
      const electrostatic = this.getElectrostaticForce(i, edge);
      edgePointForces.push(multiply(add(spring, electrostatic), lambda));
    }

    edgePointForces.push([0, 0]);

    return edgePointForces;
  }

  protected onBundle = () => {
    const { model, element } = this.context;
    const edges = model.getEdgeData();
    this.divideEdges(this.options.divisions);

    const { cycles, iterRate, divRate } = this.options;
    let { lambda, divisions, iterations } = this.options;
    for (let i = 0; i < cycles; i++) {
      for (let j = 0; j < iterations; j++) {
        const forces: Record<ID, Point[]> = {};
        edges.forEach((edge) => {
          if (edge.source === edge.target) return;
          const edgeId = idOf(edge);
          forces[edgeId] = this.getEdgeForces(edge, divisions, lambda);

          for (let p = 0; p < divisions + 1; p++) {
            this.edgePoints[edgeId] ||= [];
            this.edgePoints[edgeId][p] = add(this.edgePoints[edgeId][p], forces[edgeId][p]);
          }
        });
      }

      // parameters for next cycle
      lambda /= 2;
      divisions *= divRate;
      iterations *= iterRate;
      this.divideEdges(divisions);
    }

    edges.forEach((edge) => {
      const edgeId = idOf(edge);
      const edgeEl = element!.getElement(edgeId);
      edgeEl?.update({ d: getPolylinePath(this.edgePoints[edgeId]) });
    });
  };

  private bindEvents() {
    const { graph } = this.context;

    graph.on(GraphEvent.AFTER_RENDER, this.onBundle);
  }

  private unbindEvents() {
    const { graph } = this.context;

    graph.off(GraphEvent.AFTER_RENDER, this.onBundle);
  }

  public destroy(): void {
    this.unbindEvents();
    super.destroy();
  }
}

interface VectorPosition {
  source: Point;
  target: Point;
  vx: number;
  vy: number;
  length: number;
}

// The larger the angle between edges P and Q, the smaller Ca(P,Q).
// Ca(P,Q) is 0 if P and Q are orthogonal and 1 if P and Q are parallel.
const getAngleCompatibility = (p: VectorPosition, q: VectorPosition): number => {
  return Math.abs(dot([p.vx, p.vy], [q.vx, q.vy]) / (p.length * q.length));
};

// Cs(P,Q) is 1 if P and Q have equal length and approaches 0 if the ratio between the longest and the shortest edge approaches ∞.
const getScaleCompatibility = (p: VectorPosition, q: VectorPosition): number => {
  const aLength = (p.length + q.length) / 2;
  return 2 / (aLength / Math.min(p.length, q.length) + Math.max(p.length, q.length) / aLength);
};

// Cp(P,Q) is 1 if Pm and Qm coincide and approaches 0 if ||Pm −Qm|| approaches ∞.
const getPositionCompatibility = (p: VectorPosition, q: VectorPosition): number => {
  const aLength = (p.length + q.length) / 2;

  const pMid = divide(add(p.source, p.target), 2);
  const qMid = divide(add(q.source, q.target), 2);

  return aLength / (aLength + distance(pMid, qMid));
};

const projectPointToEdge = (p: Point, e: VectorPosition): Point => {
  if (e.source[0] === e.target[0]) return [e.source[0], p[1]];
  if (e.source[1] === e.target[1]) return [p[0], e.source[1]];
  const k = (e.source[1] - e.target[1]) / (e.source[0] - e.target[0]);
  const x = (k * k * e.source[0] + k * (p[1] - e.source[1]) + p[0]) / (k * k + 1);
  const y = k * (x - e.source[0]) + e.source[1];
  return [x, y];
};

const getEdgeVisibility = (p: VectorPosition, q: VectorPosition): number => {
  const is = projectPointToEdge(q.source, p);
  const it = projectPointToEdge(q.target, p);
  const iMid = divide(add(is, it), 2);
  const pMid = divide(add(p.source, p.target), 2);
  if (distance(is, it) === 0) return 0;
  return Math.max(0, 1 - (2 * distance(pMid, iMid)) / distance(is, it));
};

const getVisibilityCompatibility = (p: VectorPosition, q: VectorPosition): number => {
  return Math.min(getEdgeVisibility(p, q), getEdgeVisibility(q, p));
};

/**
 * Calculate the length of a polyline
 * @param points - The points of the polyline
 * @returns The length of the polyline
 */
const getEdgeLength = (points: Point[]): number => {
  let length = 0;
  for (let i = 1; i < points.length; i++) {
    length += distance(points[i], points[i - 1]);
  }
  return length;
};
