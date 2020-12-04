/**
 * @fileOverview G6's force layout, supports clustering
 * @author shiwu.wyy@antfin.com
 */

import { EdgeConfig, IPointTuple, NodeConfig, NodeIdxMap } from '../types';
import { BaseLayout } from './layout';
import { isNumber, isArray, isFunction } from '@antv/util';
import { Point } from '@antv/g-base';

type Node = NodeConfig & {
  cluster: string | number;
};

type Edge = EdgeConfig;

type NodeMap = {
  [key: string]: Node;
};

/**
 * G6's force layout
 */
export default class G6Force extends BaseLayout {
  /** 布局中心 */
  public center: IPointTuple = [0, 0];

  /** 停止迭代的最大迭代数 */
  public maxIteration: number = 500;

  /** 重力大小，影响图的紧凑程度 */
  public gravity: number = 10;

  /** 是否产生聚类力 */
  public clustering: boolean = false;

  /** 聚类力大小 */
  public clusterGravity: number = 10;

  /** 默认边长度 */
  public linkDistance: number | ((d?: unknown) => number) = 50;

  /** 每次迭代位移的衰减相关参数 */
  public alpha: number = 1;

  public alphaMin: number = 0.001;

  public alphaDecay: number = 1 - this.alphaMin ** (1 / 300);

  public alphaTarget: number = 0;

  /** 节点运动速度衰减参数 */
  public velocityDecay: number = 0.6;

  /** 边引力大小 */
  public linkStrength: number | ((d?: unknown) => number) = 1;

  /** 节点引力大小 */
  public nodeStrength: number | ((d?: unknown) => number) = 30;

  /** 是否开启防止重叠 */
  public preventOverlap: boolean = false;

  /** 防止重叠的碰撞力大小 */
  public collideStrength: number = 1;

  /** 节点大小，用于防止重叠 */
  public nodeSize: number | number[] | ((d?: unknown) => number) | undefined;

  /** 节点最小间距，防止重叠时的间隙 */
  public nodeSpacing: ((d?: unknown) => number) | undefined;

  /** 优化计算斥力的速度，两节点间距超过 optimizeRangeFactor * width 则不再计算斥力和重叠斥力 */
  public optimizeRangeFactor: number = 1;

  /** 每次迭代的回调函数 */
  public tick: () => void = () => { };

  /** 内部计算参数 */
  public nodes: Node[] = [];

  public edges: Edge[] = [];

  private width: number = 300;

  private height: number = 300;

  private bias: number[] = [];

  private nodeMap: NodeMap = {};

  private nodeIdxMap: NodeIdxMap = {};

  public getDefaultCfg() {
    return {
      maxIteration: 1000,
      center: [0, 0],
      gravity: 10,
      clustering: false,
      clusterGravity: 10,
      preventOverlap: false,
      nodeSpacing: undefined,
      collideStrength: 10,
    };
  }

  /**
   * 执行布局
   */
  public execute() {
    const self = this;
    const nodes = self.nodes;
    const center = self.center;

    if (!nodes || nodes.length === 0) {
      return;
    }
    if (nodes.length === 1) {
      nodes[0].x = center[0];
      nodes[0].y = center[1];
      return;
    }
    const nodeMap: NodeMap = {};
    const nodeIdxMap: NodeIdxMap = {};
    nodes.forEach((node, i) => {
      nodeMap[node.id] = node;
      nodeIdxMap[node.id] = i;
    });
    self.nodeMap = nodeMap;
    self.nodeIdxMap = nodeIdxMap;
    // layout
    self.run();
  }

  public run() {
    const self = this;
    const nodes = self.nodes;
    const edges = self.edges;
    const maxIteration = self.maxIteration;
    if (!self.width && typeof window !== 'undefined') {
      self.width = window.innerWidth;
    }
    if (!self.height && typeof window !== 'undefined') {
      self.height = window.innerHeight;
    }
    const center = self.center;
    const velocityDecay = self.velocityDecay;
    const clustering = self.clustering;
    let clusterMap;

    self.initVals();

    if (clustering) {
      clusterMap = self.getClusterMap();
    }
    // iterate
    for (let i = 0; i < maxIteration; i++) {
      const displacements: Point[] = [];
      nodes.forEach((_, j) => {
        displacements[j] = { x: 0, y: 0 };
      });
      self.applyCalculate(nodes, edges, displacements);

      // gravity for clusters
      if (clustering) {
        self.applyClusterForce(clusterMap, displacements);
      }

      // move
      nodes.forEach((n, j) => {
        if (!isNumber(n.x) || !isNumber(n.y)) return;
        n.x += displacements[j].x * velocityDecay;
        n.y += displacements[j].y * velocityDecay;
      });
      this.alpha += (this.alphaTarget - this.alpha) * this.alphaDecay;
      self.tick();
    }

    // move to center
    const meanCenter = [0, 0];
    nodes.forEach((n) => {
      if (!isNumber(n.x) || !isNumber(n.y)) return;
      meanCenter[0] += n.x;
      meanCenter[1] += n.y;
    });
    meanCenter[0] /= nodes.length;
    meanCenter[1] /= nodes.length;
    const centerOffset = [center[0] - meanCenter[0], center[1] - meanCenter[1]];
    nodes.forEach((n, j) => {
      if (!isNumber(n.x) || !isNumber(n.y)) return;
      n.x += centerOffset[0];
      n.y += centerOffset[1];
    });
  }

  private initVals() {
    const self = this;
    const edges = self.edges;
    const count = {};

    // get edge bias
    for (let i = 0; i < edges.length; ++i) {
      if (count[edges[i].source]) count[edges[i].source]++;
      else count[edges[i].source] = 1;
      if (count[edges[i].target]) count[edges[i].target]++;
      else count[edges[i].target] = 1;
    }
    const bias = [];
    for (let i = 0; i < edges.length; ++i) {
      bias[i] = count[edges[i].source] / (count[edges[i].source] + count[edges[i].target]);
    }
    this.bias = bias;

    const nodeSize = self.nodeSize;
    const nodeSpacing = self.nodeSpacing;
    let nodeSizeFunc: (d: any) => number;
    let nodeSpacingFunc: (d: any) => number;

    // nodeSpacing to function
    if (isNumber(nodeSpacing)) {
      nodeSpacingFunc = () => nodeSpacing;
    } else if (isFunction(nodeSpacing)) {
      nodeSpacingFunc = nodeSpacing;
    } else {
      nodeSpacingFunc = () => 0;
    }

    // nodeSize to function
    if (!nodeSize) {
      nodeSizeFunc = (d) => {
        if (d.size) {
          if (isArray(d.size)) {
            const res = d.size[0] > d.size[1] ? d.size[0] : d.size[1];
            return res / 2 + nodeSpacingFunc(d);
          }
          return d.size / 2 + nodeSpacingFunc(d);
        }
        return 10 + nodeSpacingFunc(d);
      };
    } else if (isFunction(nodeSize)) {
      nodeSizeFunc = (d) => {
        const size = nodeSize(d);
        return size + nodeSpacingFunc(d);
      };
    } else if (isArray(nodeSize)) {
      const larger = nodeSize[0] > nodeSize[1] ? nodeSize[0] : nodeSize[1];
      const radius = larger / 2;
      nodeSizeFunc = (d) => radius + nodeSpacingFunc(d);
    } else if (isNumber(nodeSize)) {
      const radius = nodeSize / 2;
      nodeSizeFunc = (d) => radius + nodeSpacingFunc(d);
    } else {
      nodeSizeFunc = () => 10;
    }
    this.nodeSize = nodeSizeFunc;

    // linkDistance to function
    let linkDistance = this.linkDistance;
    let linkDistanceFunc;
    if (!linkDistance) {
      linkDistance = 50;
    }
    if (isNumber(linkDistance)) {
      linkDistanceFunc = (d) => {
        return linkDistance;
      };
    }
    this.linkDistance = linkDistanceFunc;

    // linkStrength to function
    let linkStrength = this.linkStrength;
    let linkStrengthFunc;
    if (!linkStrength) {
      linkStrength = 1;
    }
    if (isNumber(linkStrength)) {
      linkStrengthFunc = (d) => {
        return linkStrength;
      };
    }
    this.linkStrength = linkStrengthFunc;

    // nodeStrength to function
    let nodeStrength = this.nodeStrength;
    let nodeStrengthFunc;
    if (!nodeStrength) {
      nodeStrength = 30;
    }
    if (isNumber(nodeStrength)) {
      nodeStrengthFunc = (d) => {
        return nodeStrength;
      };
    }
    this.nodeStrength = nodeStrengthFunc;
  }

  private getClusterMap() {
    const self = this;
    const nodes = self.nodes;
    const clusterMap: {
      [key: string]: {
        name: string | number;
        cx: number;
        cy: number;
        count: number;
      };
    } = {};
    nodes.forEach((n) => {
      if (clusterMap[n.cluster] === undefined) {
        const cluster = {
          name: n.cluster,
          cx: 0,
          cy: 0,
          count: 0,
        };
        clusterMap[n.cluster] = cluster;
      }
      const c = clusterMap[n.cluster];
      if (isNumber(n.x)) {
        c.cx += n.x;
      }
      if (isNumber(n.y)) {
        c.cy += n.y;
      }
      c.count++;
    });
    for (const key in clusterMap) {
      clusterMap[key].cx /= clusterMap[key].count;
      clusterMap[key].cy /= clusterMap[key].count;
    }
    return clusterMap;
  }

  private applyClusterForce(clusterMap, displacements) {
    const self = this;
    const gravity = self.gravity;
    const nodes = self.nodes;
    const clusterGravity = self.clusterGravity || gravity;
    const alpha = this.alpha;
    nodes.forEach((n, j) => {
      if (!isNumber(n.x) || !isNumber(n.y)) return;
      const c = clusterMap[n.cluster];
      const vecX = n.x - c.cx;
      const vecY = n.y - c.cy;
      const l = Math.sqrt(vecX * vecX + vecY * vecY);
      displacements[j].x -= (vecX * clusterGravity * alpha) / l;
      displacements[j].y -= (vecY * clusterGravity * alpha) / l;
    });

    for (const key in clusterMap) {
      clusterMap[key].cx = 0;
      clusterMap[key].cy = 0;
      clusterMap[key].count = 0;
    }

    nodes.forEach((n) => {
      const c = clusterMap[n.cluster];
      if (isNumber(n.x)) {
        c.cx += n.x;
      }
      if (isNumber(n.y)) {
        c.cy += n.y;
      }
      c.count++;
    });
    for (const key in clusterMap) {
      clusterMap[key].cx /= clusterMap[key].count;
      clusterMap[key].cy /= clusterMap[key].count;
    }
  }

  private applyCalculate(nodes: Node[], edges: Edge[], displacements: Point[]) {
    const self = this;
    // store the vx, vy, and distance to reduce dulplicate calculation

    const vecMap = {};
    nodes.forEach((v, i) => {
      displacements[i] = { x: 0, y: 0 };
      nodes.forEach((u, j) => {
        if (i < j) return;
        let vx = v.x - u.x;
        let vy = v.y - u.y;
        let vl = vx * vx + vy * vy;
        if (vl < 1) vl = Math.sqrt(vl);
        if (vx === 0) {
          vx = Math.random() * 0.01;
          vl += vx * vx;
        }
        if (vy === 0) {
          vy = Math.random() * 0.01;
          vl += vy * vy;
        }
        const sqrtVl = Math.sqrt(vl);
        vecMap[`${v.id}-${u.id}`] = { vx, vy, vl, sqrtVl };
        vecMap[`${u.id}-${v.id}`] = { vx: -vx, vy: -vy, vl, sqrtVl };
      });
    });
    self.calRepulsive(nodes, displacements, vecMap);
    self.calAttractive(edges, displacements, vecMap);
  }

  private calRepulsive(nodes: Node[], displacements: Point[], vecMap: any) {
    const max = this.width * this.optimizeRangeFactor * this.width * this.optimizeRangeFactor;
    const nodeStrength = this.nodeStrength as (d?: unknown) => number;
    const alpha = this.alpha;
    const collideStrength = this.collideStrength;
    const preventOverlap = this.preventOverlap;
    const nodeSizeFunc = this.nodeSize as ((d?: unknown) => number) | undefined;
    nodes.forEach((v, i) => {
      nodes.forEach((u, j) => {
        if (i === j) {
          return;
        }
        if (!isNumber(v.x) || !isNumber(u.x) || !isNumber(v.y) || !isNumber(u.y)) return;
        const { vl, vx, vy } = vecMap[`${v.id}-${u.id}`];
        if (vl > max) return;
        displacements[i].x += (vx * nodeStrength(u) * alpha) / vl;
        displacements[i].y += (vy * nodeStrength(u) * alpha) / vl;

        // collide strength
        if (preventOverlap && i < j) {
          const ri = nodeSizeFunc(v);
          const rj = nodeSizeFunc(u);
          const r = ri + rj;
          if (vl < r * r) {
            const { sqrtVl } = vecMap[`${v.id}-${u.id}`];
            const ll = ((r - sqrtVl) / sqrtVl) * collideStrength;
            let rratio = (rj * rj) / (ri * ri + rj * rj);
            const xl = vx * ll;
            const yl = vy * ll;
            displacements[i].x += xl * rratio;
            displacements[i].y += yl * rratio;
            rratio = 1 - rratio;
            displacements[j].x -= xl * rratio;
            displacements[j].y -= yl * rratio;
          }
        }
      });
    });
  }

  private calAttractive(edges: Edge[], displacements: Point[], vecMap: any) {
    const linkDistance = this.linkDistance as (d?: unknown) => number;
    const alpha = this.alpha;
    const linkStrength = this.linkStrength as (d?: unknown) => number;
    const bias = this.bias;
    edges.forEach((e, i) => {
      if (!e.source || !e.target) return;
      const uIndex = this.nodeIdxMap[e.source];
      const vIndex = this.nodeIdxMap[e.target];
      if (uIndex === vIndex) {
        return;
      }
      const u = this.nodeMap[e.source];
      const v = this.nodeMap[e.target];
      if (!isNumber(v.x) || !isNumber(u.x) || !isNumber(v.y) || !isNumber(u.y)) return;
      const { vl, sqrtVl, vx, vy } = vecMap[`${e.target}-${e.source}`];
      const l = ((sqrtVl - linkDistance(e)) / sqrtVl) * alpha * linkStrength(e);
      const vecX = vx * l;
      const vecY = vy * l;
      const b = bias[i];
      displacements[vIndex].x -= vecX * b;
      displacements[vIndex].y -= vecY * b;
      displacements[uIndex].x += vecX * (1 - b);
      displacements[uIndex].y += vecY * (1 - b);
    });
  }
}
