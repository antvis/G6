/**
 * @fileOverview fruchterman layout
 * @author shiwu.wyy@antfin.com
 */

import { EdgeConfig, IPointTuple, NodeConfig } from '../types';
import { BaseLayout } from './layout';

type Node = NodeConfig & {
  cluster: string;
};
type Edge = EdgeConfig;

type NodeMap = Map<string, Node>;
type NodeIndexMap = Map<string, string>;

const SPEED_DIVISOR = 800;

/**
 * fruchterman 布局
 */
export default class FruchtermanLayout extends BaseLayout {
  /** 布局中心 */
  public center: IPointTuple;
  /** 停止迭代的最大迭代数 */
  public maxIteration: number;
  /** 重力大小，影响图的紧凑程度 */
  public gravity: number;
  /** 速度 */
  public speed: number;
  /** 是否产生聚类力 */
  public clustering: boolean;
  /** 聚类力大小 */
  public clusterGravity: number;

  public width: number;
  public height: number;

  public nodes: Node[];
  public edges: Edge[];

  public nodeMap: object;
  public nodeIndexMap: object;

  public getDefaultCfg() {
    return {
      maxIteration: 1000,
      center: [0, 0],
      gravity: 10,
      speed: 1,
      clustering: false,
      clusterGravity: 10,
    };
  }
  /**
   * 执行布局
   */
  public execute() {
    const self = this;
    const nodes = self.nodes;
    const center = self.center;

    if (nodes.length === 0) {
      return;
    } else if (nodes.length === 1) {
      nodes[0].x = center[0];
      nodes[0].y = center[1];
      return;
    }
    const nodeMap = {};
    const nodeIndexMap = {};
    nodes.forEach((node, i) => {
      nodeMap[node.id] = node;
      nodeIndexMap[node.id] = i;
    });
    self.nodeMap = nodeMap;
    self.nodeIndexMap = nodeIndexMap;
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
    const maxDisplace = self.width / 10;
    const k = Math.sqrt((self.width * self.height) / (nodes.length + 1));
    const gravity = self.gravity;
    const speed = self.speed;
    const clustering = self.clustering;
    const clusterMap = {};
    if (clustering) {
      nodes.forEach(n => {
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
        c.cx += n.x;
        c.cy += n.y;
        c.count++;
      });
      for (let key in clusterMap) {
        clusterMap[key].cx /= clusterMap[key].count;
        clusterMap[key].cy /= clusterMap[key].count;
      }
    }
    for (let i = 0; i < maxIteration; i++) {
      const positions = [];
      nodes.forEach((_, j) => {
        positions[j] = { x: 0, y: 0 };
      });
      self.applyForce(nodes, edges, positions, k);

      // gravity for clusters
      if (clustering) {
        const clusterGravity = self.clusterGravity || gravity;
        nodes.forEach((n, j) => {
          const c = clusterMap[n.cluster];
          const distLength = Math.sqrt((n.x - c.cx) * (n.x - c.cx) + (n.y - c.cy) * (n.y - c.cy));
          const gravityForce = k * clusterGravity;
          positions[j].x -= (gravityForce * (n.x - c.cx)) / distLength;
          positions[j].y -= (gravityForce * (n.y - c.cy)) / distLength;
        });

        for (let key in clusterMap) {
          clusterMap[key].cx = 0;
          clusterMap[key].cy = 0;
          clusterMap[key].count = 0;
        }

        nodes.forEach(n => {
          const c = clusterMap[n.cluster];
          c.cx += n.x;
          c.cy += n.y;
          c.count++;
        });
        for (let key in clusterMap) {
          clusterMap[key].cx /= clusterMap[key].count;
          clusterMap[key].cy /= clusterMap[key].count;
        }
      }

      // gravity
      nodes.forEach((n, j) => {
        const gravityForce = 0.01 * k * gravity;
        positions[j].x -= gravityForce * (n.x - center[0]);
        positions[j].y -= gravityForce * (n.y - center[1]);
      });

      // speed
      nodes.forEach((_, j) => {
        positions[j].dx *= speed / SPEED_DIVISOR;
        positions[j].dy *= speed / SPEED_DIVISOR;
      });

      // move
      nodes.forEach((n, j) => {
        const distLength = Math.sqrt(positions[j].x * positions[j].x + positions[j].y * positions[j].y);
        if (distLength > 0) {
          // && !n.isFixed()
          const limitedDist = Math.min(maxDisplace * (speed / SPEED_DIVISOR), distLength);
          n.x += (positions[j].x / distLength) * limitedDist;
          n.y += (positions[j].y / distLength) * limitedDist;
        }
      });
    }
  }

  private applyForce(nodes: Node[], edges: Edge[], positions, k) {
    this.calRepulsive(nodes, positions, k);
    this.calAttractive(edges, positions, k);
  }

  private calRepulsive(nodes: Node[], positions, k) {
    nodes.forEach((v, i) => {
      positions[i] = { x: 0, y: 0 };
      nodes.forEach((u, j) => {
        if (i === j) {
          return;
        }
        let vecX = v.x - u.x;
        let vecY = v.y - u.y;
        let vecLengthSqr = vecX * vecX + vecY * vecY;
        if (vecLengthSqr === 0) {
          vecLengthSqr = 1;
          const sign = i > j ? 1 : -1;
          vecX = 0.01 * sign;
          vecY = 0.01 * sign;
        }
        const common = (k * k) / vecLengthSqr;
        positions[i].x += vecX * common;
        positions[i].y += vecY * common;
      });
    });
  }

  private calAttractive(edges: Edge[], positions, k) {
    edges.forEach(e => {
      const uIndex = this.nodeIndexMap[e.source];
      const vIndex = this.nodeIndexMap[e.target];
      if (uIndex === vIndex) {
        return;
      }
      const u = this.nodeMap[e.source];
      const v = this.nodeMap[e.target];
      const vecX = v.x - u.x;
      const vecY = v.y - u.y;
      const vecLength = Math.sqrt(vecX * vecX + vecY * vecY);
      const common = (vecLength * vecLength) / k;
      positions[vIndex].x -= (vecX / vecLength) * common;
      positions[vIndex].y -= (vecY / vecLength) * common;
      positions[uIndex].x += (vecX / vecLength) * common;
      positions[uIndex].y += (vecY / vecLength) * common;
    });
  }
}
