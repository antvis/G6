import { IGraph, GraphData, NodeModel } from 'types';
import { EdgeModel, IEdge } from 'types/edge';
import { Point } from '../../../types/common';

import { Plugin as Base, IPluginBaseConfig } from '../../../types/plugin';

type NodeConfigMap = Record<string, NodeModel>;

interface BundlingConfig extends IPluginBaseConfig {
  edgeBundles?: IEdge[];
  edgePoints?: Point[][];
  K?: number;
  lambda?: number;
  divisions?: number;
  divRate?: number;
  cycles?: number;
  iterations?: number;
  iterRate?: number;
  bundleThreshold?: number;
  eps?: number;
}

interface VectorPosition {
  source: {
    data: {
      x: number;
      y: number;
    };
  };
  target: {
    data: {
      x: number;
      y: number;
    };
  };
  vx: number;
  vy: number;
  length: number;
}

function getEucliDis(pointA: Point, pointB: Point, eps?: number): number {
  const vx = pointA.x - pointB.x;
  const vy = pointA.y - pointB.y;
  if (!eps || Math.abs(vx) > eps || Math.abs(vy) > eps) {
    return Math.sqrt(vx * vx + vy * vy);
  }
  return eps;
}

function getDotProduct(ei: Point, ej: Point): number {
  return ei.x * ej.x + ei.y * ej.y;
}

function projectPointToEdge(p: Point, e: VectorPosition): Point {
  const k =
    (e.source.data.y - e.target.data.y) / (e.source.data.x - e.target.data.x);
  const x =
    (k * k * e.source.data.x + k * (p.y - e.source.data.y) + p.x) / (k * k + 1);
  const y = k * (x - e.source.data.x) + e.source.data.y;
  return { x, y };
}

export class EdgeBundling extends Base {
  private nodeIdMap: NodeConfigMap = {};
  private ticking: boolean = false;

  constructor(config?: BundlingConfig) {
    super(config);
  }

  public getDefaultCfgs(): BundlingConfig {
    return {
      edgeBundles: [], // |edges| arrays, each one stores the related edges' id
      edgePoints: [], // |edges| * divisions edge points
      K: 0.1, // The strength of the bundling
      lambda: 0.1, // The initial step length
      divisions: 1, // The initial number of division on each edge. It will be multipled by divRate in each cycle
      divRate: 2, // subdivision rate increase
      cycles: 6, // number of cycles to perform
      iterations: 90, // The number of outer interations
      iterRate: 0.6666667, // The rate of the iterations decreasement
      bundleThreshold: 0.6,
      eps: 1e-6,
    };
  }

  public init(graph: IGraph) {
    super.init(graph);
  }

  public setOptionByKey(key: keyof BundlingConfig, value: any) {
    this.options[key] = value;
  }

  public getOptionByKey(key: keyof BundlingConfig) {
    return this.options[key];
  }

  public bundling(data: GraphData): void {
    if (this.destroyed) return;

    const self = this;
    self.setOptionByKey('data', data);

    // 如果正在布局，忽略布局请求
    if (self.isTicking()) {
      return;
    }

    const edges = data.edges || [];
    const nodes = data.nodes || [];
    const nodeIdMap: NodeConfigMap = {};
    let error = false;

    nodes.forEach((node) => {
      if (
        node.data?.x === null ||
        !node.data?.y === null ||
        node.data?.x === undefined ||
        !node.data?.y === undefined
      ) {
        error = true;
      }
      nodeIdMap[node.id] = node;
    });

    if (error)
      throw new Error(
        'please layout the graph or assign x and y for nodes first',
      );
    self.nodeIdMap = nodeIdMap;

    // subdivide each edges
    let divisions: number = self.getOptionByKey('divisions');
    const divRate: number = self.getOptionByKey('divRate');
    let edgePoints: Point[][] = self.divideEdges(divisions);
    self.setOptionByKey('edgePoints', edgePoints);

    // compute the bundles
    const edgeBundles = self.getEdgeBundles();
    self.setOptionByKey('edgeBundles', edgeBundles);

    // iterations
    const C: number = self.getOptionByKey('cycles');
    let iterations: number = self.getOptionByKey('iterations');
    const iterRate: number = self.getOptionByKey('iterRate');
    let lambda: number = self.getOptionByKey('lambda');

    for (let i = 0; i < C; i++) {
      for (let j = 0; j < iterations; j++) {
        const forces: Point[][] = [];
        edges.forEach((e, k) => {
          if (e.source === e.target) return;
          const source = nodeIdMap[e.source as string];
          const target = nodeIdMap[e.target as string];

          forces[k] = self.getEdgeForces(
            { source, target },
            k,
            divisions,
            lambda,
          );

          for (let p = 0; p < divisions + 1; p++) {
            edgePoints[k][p].x += forces[k][p].x;
            edgePoints[k][p].y += forces[k][p].y;
          }
        });
      }

      // parameters for nex cycle
      lambda = lambda / 2;
      divisions *= divRate;
      iterations *= iterRate;
      edgePoints = self.divideEdges(divisions);
      self.setOptionByKey('edgePoints', edgePoints);
    }

    // change the edges according to edgePoints
    edges.forEach((e, i) => {
      if (e.source === e.target) return;
      e.data.type = 'polyline-edge';

      if (typeof e.data.keyShape === 'object') {
        (e.data.keyShape as Record<string, any>).controlPoints = edgePoints[i].slice(1, edgePoints[i].length - 1)
      } else {
        e.data.keyShape = {
          controlPoints: edgePoints[i].slice(1, edgePoints[i].length - 1),
        }
      }
    });

    const graph = self.graph;

    graph.updateData('edge', edges);
  }

  public updateBundling(cfg: BundlingConfig) {
    const self = this;
    const { data } = cfg;
    if (data) {
      self.setOptionByKey('data', data);
    }

    if (self.ticking) {
      self.ticking = false;
    }

    Object.keys(cfg).forEach((key) => {
      self.setOptionByKey(key, cfg[key]);
    });

    self.bundling(data);
  }

  public divideEdges(divisions: number): Point[][] {
    const self = this;
    const edges: EdgeModel[] = self.getOptionByKey('data').edges;
    const nodeIdMap: NodeConfigMap = self.nodeIdMap;
    let edgePoints = self.getOptionByKey('edgePoints');

    if (!edgePoints || edgePoints === undefined) edgePoints = [];

    edges.forEach((edge, i) => {
      if (!edgePoints[i] || edgePoints[i] === undefined) {
        edgePoints[i] = [];
      }

      const source = nodeIdMap[edge.source as string];
      const target = nodeIdMap[edge.target as string];

      if (divisions === 1) {
        edgePoints[i].push({ x: source.data.x, y: source.data.y }); // source
        edgePoints[i].push({
          x: 0.5 * (source.data.x! + target.data.x!),
          y: 0.5 * (source.data.y! + target.data.y!),
        }); // mid
        edgePoints[i].push({ x: target.data.x, y: target.data.y }); // target
      } else {
        let edgeLength = 0;

        if (!edgePoints[i]?.length) {
          // it is a straight line
          edgeLength = getEucliDis(
            { x: source.data.x!, y: source.data.y! },
            { x: target.data.x!, y: target.data.y! },
          );
        } else {
          edgeLength = self.getEdgeLength(edgePoints[i]);
        }

        const divisionLength = edgeLength / (divisions + 1);
        let currentDivisonLength = divisionLength;

        const newEdgePoints = [{ x: source.data.x, y: source.data.y }]; // source

        edgePoints[i].forEach((ep: Point, j: number) => {
          if (j === 0) return;

          let oriDivisionLength = getEucliDis(ep, edgePoints[i][j - 1]);

          while (oriDivisionLength > currentDivisonLength) {
            const ratio = currentDivisonLength / oriDivisionLength;
            const edgePoint = {
              x: edgePoints[i][j - 1].x,
              y: edgePoints[i][j - 1].y,
            };
            edgePoint.x += ratio * (ep.x - edgePoints[i][j - 1].x);
            edgePoint.y += ratio * (ep.y - edgePoints[i][j - 1].y);

            newEdgePoints.push(edgePoint);
            oriDivisionLength -= currentDivisonLength;
            currentDivisonLength = divisionLength;
          }

          currentDivisonLength -= oriDivisionLength;
        });

        newEdgePoints.push({ x: target.data.x, y: target.data.y }); // target
        edgePoints[i] = newEdgePoints;
      }
    });
    return edgePoints;
  }

  /**
   * 计算边的长度
   * @param points
   */
  public getEdgeLength(points: Point[]): number {
    let length = 0;
    points.forEach((p, i) => {
      if (i === 0) return;
      length += getEucliDis(p, points[i - 1]);
    });
    return length;
  }

  public getEdgeBundles(): number[] {
    const self = this;
    const data: GraphData = self.getOptionByKey('data');
    const edges = data.edges || [];

    const bundleThreshold: number = self.getOptionByKey('bundleThreshold');
    const nodeIdMap: NodeConfigMap = self.nodeIdMap;
    let edgeBundles = self.getOptionByKey('edgeBundles');

    if (!edgeBundles) edgeBundles = [];

    edges.forEach((e, i) => {
      if (!edgeBundles[i] || edgeBundles[i] === undefined) {
        edgeBundles[i] = [];
      }
    });

    edges.forEach((ei, i) => {
      const iSource = nodeIdMap[ei.source as string];
      const iTarget = nodeIdMap[ei.target as string];

      edges.forEach((ej, j) => {
        if (j <= i) return;

        const jSource = nodeIdMap[ej.source as string];
        const jTarget = nodeIdMap[ej.target as string];

        const score = self.getBundleScore(
          { source: iSource, target: iTarget },
          { source: jSource, target: jTarget },
        );

        if (score >= bundleThreshold) {
          edgeBundles[i].push(j);
          edgeBundles[j].push(i);
        }
      });
    });
    return edgeBundles;
  }

  public getBundleScore(ei: any, ej: any): number {
    const self = this;
    ei.vx = ei.target.data.x - ei.source.data.x;
    ei.vy = ei.target.data.y - ei.source.data.y;
    ej.vx = ej.target.data.x - ej.source.data.x;
    ej.vy = ej.target.data.y - ej.source.data.y;

    ei.length = getEucliDis(
      {
        x: ei.source.data.x,
        y: ei.source.data.y,
      },
      {
        x: ei.target.data.x,
        y: ei.target.data.y,
      },
    );

    ej.length = getEucliDis(
      {
        x: ej.source.data.x,
        y: ej.source.data.y,
      },
      {
        x: ej.target.data.x,
        y: ej.target.data.y,
      },
    );

    // angle score
    const aScore = self.getAngleScore(ei, ej);

    // scale score
    const sScore = self.getScaleScore(ei, ej);

    // position score
    const pScore = self.getPositionScore(ei, ej);

    // visibility socre
    const vScore = self.getVisibilityScore(ei, ej);

    return aScore * sScore * pScore * vScore;
  }

  protected getAngleScore(ei: VectorPosition, ej: VectorPosition): number {
    const dotProduct = getDotProduct(
      { x: ei.vx, y: ei.vy },
      { x: ej.vx, y: ej.vy },
    );
    return dotProduct / (ei.length * ej.length);
  }

  protected getScaleScore(ei: VectorPosition, ej: VectorPosition): number {
    const aLength = (ei.length + ej.length) / 2;
    const score =
      2 /
      (aLength / Math.min(ei.length, ej.length) +
        Math.max(ei.length, ej.length) / aLength);
    return score;
  }

  protected getPositionScore(ei: VectorPosition, ej: VectorPosition): number {
    const aLength = (ei.length + ej.length) / 2;

    const iMid = {
      x: (ei.source.data.x + ei.target.data.x) / 2,
      y: (ei.source.data.y + ei.target.data.y) / 2,
    };

    const jMid = {
      x: (ej.source.data.x + ej.target.data.x) / 2,
      y: (ej.source.data.y + ej.target.data.y) / 2,
    };

    const distance = getEucliDis(iMid, jMid);
    return aLength / (aLength + distance);
  }

  protected getVisibilityScore(ei: VectorPosition, ej: VectorPosition): number {
    const vij = this.getEdgeVisibility(ei, ej);
    const vji = this.getEdgeVisibility(ej, ei);
    return vij < vji ? vij : vji;
  }

  protected getEdgeVisibility(ei: VectorPosition, ej: VectorPosition): number {
    const ps = projectPointToEdge(ej.source.data, ei);
    const pt = projectPointToEdge(ej.target.data, ei);
    const pMid = {
      x: (ps.x + pt.x) / 2,
      y: (ps.y + pt.y) / 2,
    };

    const iMid = {
      x: (ei.source.data.x + ei.target.data.x) / 2,
      y: (ei.source.data.y + ei.target.data.y) / 2,
    };

    return Math.max(0, 1 - (2 * getEucliDis(pMid, iMid)) / getEucliDis(ps, pt));
  }

  protected getEdgeForces(
    e: any,
    eidx: number,
    divisions: number,
    lambda: number,
  ): Point[] {
    const self = this;
    const edgePoints = self.getOptionByKey('edgePoints');
    const K = self.getOptionByKey('K');

    const kp =
      K / (getEucliDis(e.source.data, e.target.data) * (divisions + 1));
    const edgePointForces = [{ x: 0, y: 0 }];

    for (let i = 1; i < divisions; i++) {
      const force = { x: 0, y: 0 };

      const spring = self.getSpringForce(
        {
          pre: edgePoints[eidx][i - 1],
          cur: edgePoints[eidx][i],
          next: edgePoints[eidx][i + 1],
        },
        kp,
      );

      const electrostatic = self.getElectrostaticForce(i, eidx);

      force.x = lambda * (spring.x + electrostatic.x);
      force.y = lambda * (spring.y + electrostatic.y);
      edgePointForces.push(force);
    }

    edgePointForces.push({ x: 0, y: 0 });
    return edgePointForces;
  }

  protected getSpringForce(divisions: any, kp: number): Point {
    let x = divisions.pre.x + divisions.next.x - 2 * divisions.cur.x;
    let y = divisions.pre.y + divisions.next.y - 2 * divisions.cur.y;
    x *= kp;
    y *= kp;

    return { x, y };
  }

  protected getElectrostaticForce(pidx: number, eidx: number): Point {
    const self = this;
    const eps = self.getOptionByKey('eps');
    const edgeBundles = self.getOptionByKey('edgeBundles');
    const edgePoints = self.getOptionByKey('edgePoints');
    const edgeBundle = edgeBundles[eidx];
    const resForce = { x: 0, y: 0 };

    edgeBundle.forEach((eb: number) => {
      const force = {
        x: edgePoints[eb][pidx].x - edgePoints[eidx][pidx].x,
        y: edgePoints[eb][pidx].y - edgePoints[eidx][pidx].y,
      };

      if (Math.abs(force.x) > eps || Math.abs(force.y) > eps) {
        const length = getEucliDis(
          edgePoints[eb][pidx],
          edgePoints[eidx][pidx],
        );

        const diff = 1 / length;
        resForce.x += force.x * diff;
        resForce.y += force.y * diff;
      }
    });

    return resForce;
  }

  public isTicking(): boolean {
    return this.ticking;
  }

  public destroy() {
    super.destroy();
  }
}
