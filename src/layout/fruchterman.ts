/**
 * @fileOverview random layout
 * @author shiwu.wyy@antfin.com
 */

import { EdgeConfig, IPointTuple, NodeConfig, NodeIdxMap } from '../types';
import { BaseLayout } from './layout';
import { isNumber } from '@antv/util';
import { Point } from '_@antv_g-canvas@0.3.14@@antv/g-canvas/node_modules/@antv/g-base';

type Node = NodeConfig & {
  cluster: string | number;
};
type Edge = EdgeConfig;

type NodeMap = {
  [key: string]: Node;
}

const SPEED_DIVISOR = 800;

/**
 * fruchterman 布局
 */
export default class FruchtermanLayout extends BaseLayout {
  /** 布局中心 */
  public center: IPointTuple = [0, 0];
  /** 停止迭代的最大迭代数 */
  public maxIteration: number = 1000;
  /** 重力大小，影响图的紧凑程度 */
  public gravity: number = 10;
  /** 速度 */
  public speed: number = 1;
  /** 是否产生聚类力 */
  public clustering: boolean = false;
  /** 聚类力大小 */
  public clusterGravity: number = 10;

  public nodes: Node[] = [];
  public edges: Edge[] = [];

  public width: number = 300;
  public height: number = 300;

  public nodeMap: NodeMap = {};
  public nodeIdxMap: NodeIdxMap = {};

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

    if (!nodes || nodes.length === 0) {
      return;
    } else if (nodes.length === 1) {
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
    if (!nodes) return;
    const edges = self.edges;
    const maxIteration = self.maxIteration;
    if (!self.width && typeof window !== 'undefined') {
      self.width = window.innerWidth;
    }
    if (!self.height && typeof window !== 'undefined') {
      self.height = window.innerHeight;
    }
    const center = self.center;
    const nodeMap = self.nodeMap;
    const nodeIdxMap = self.nodeIdxMap;
    const maxDisplace = self.width / 10;
    const k = Math.sqrt((self.width * self.height) / (nodes.length + 1));
    const gravity = self.gravity;
    const speed = self.speed;
    const clustering = self.clustering;
    const clusterMap: {[key: string]: {
      name: string | number,
      cx: number,
      cy: number,
      count: number
    }} = {}
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
        if (isNumber(n.x)) {
          c.cx += n.x;
        }
        if (isNumber(n.y)) {
          c.cy += n.y;
        }
        c.count++;
      });
      for (let key in clusterMap) {
        clusterMap[key].cx /= clusterMap[key].count;
        clusterMap[key].cy /= clusterMap[key].count;
      }
    }
    for (let i = 0; i < maxIteration; i++) {
      const disp: Point[] = [];
      nodes.forEach((_, j) => {
        disp[j] = { x: 0, y: 0 };
      });
      self.getDisp(nodes, edges, nodeMap, nodeIdxMap, disp, k);

      // gravity for clusters
      if (clustering) {
        const clusterGravity = self.clusterGravity || gravity;
        nodes.forEach((n, j) => {
          if (!isNumber(n.x) || !isNumber(n.y)) return;
          const c = clusterMap[n.cluster];
          const distLength = Math.sqrt((n.x - c.cx) * (n.x - c.cx) + (n.y - c.cy) * (n.y - c.cy));
          const gravityForce = k * clusterGravity;
          disp[j].x -= (gravityForce * (n.x - c.cx)) / distLength;
          disp[j].y -= (gravityForce * (n.y - c.cy)) / distLength;
        });


        for (let key in clusterMap) {
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
        for (let key in clusterMap) {
          clusterMap[key].cx /= clusterMap[key].count;
          clusterMap[key].cy /= clusterMap[key].count;
        }
      }

      // gravity
      nodes.forEach((n, j) => {
        if (!isNumber(n.x) || !isNumber(n.y)) return;
        const gravityForce = 0.01 * k * gravity;
        disp[j].x -= gravityForce * (n.x - center[0]);
        disp[j].y -= gravityForce * (n.y - center[1]);
      });

      // move
      nodes.forEach((n, j) => {
        if (!isNumber(n.x) || !isNumber(n.y)) return;
        const distLength = Math.sqrt(disp[j].x * disp[j].x + disp[j].y * disp[j].y);
        if (distLength > 0) {
          // && !n.isFixed()
          const limitedDist = Math.min(maxDisplace * (speed / SPEED_DIVISOR), distLength);
          n.x += (disp[j].x / distLength) * limitedDist;
          n.y += (disp[j].y / distLength) * limitedDist;
        }
      });
    }
  }

  // TODO: nodeMap、nodeIndexMap 等根本不需要依靠参数传递
  private getDisp(nodes: Node[], edges: Edge[], nodeMap: NodeMap, nodeIdxMap: NodeIdxMap, disp: Point[], k: number) {
    const self = this;
    self.calRepulsive(nodes, disp, k);
    self.calAttractive(edges, nodeMap, nodeIdxMap, disp, k);
  }

  private calRepulsive(nodes: Node[], disp: Point[], k: number) {
    nodes.forEach((v, i) => {
      disp[i] = { x: 0, y: 0 };
      nodes.forEach((u, j) => {
        if (i === j) {
          return;
        }
        if (!isNumber(v.x) || !isNumber(u.x) || !isNumber(v.y) || !isNumber(u.y)) return;
        let vecx = v.x - u.x;
        let vecy = v.y - u.y;
        let vecLengthSqr = vecx * vecx + vecy * vecy;
        if (vecLengthSqr === 0) {
          vecLengthSqr = 1;
          const sign = i > j ? 1 : -1;
          vecx = 0.01 * sign;
          vecy = 0.01 * sign;
        }
        const common = (k * k) / vecLengthSqr;
        disp[i].x += vecx * common;
        disp[i].y += vecy * common;
      });
    });
  }

  private calAttractive(edges: Edge[], nodeMap: NodeMap, nodeIdxMap: NodeIdxMap, disp: Point[], k: number) {
    edges.forEach((e) => {
      if (!e.source || !e.target) return;
      const uIndex = nodeIdxMap[e.source];
      const vIndex = nodeIdxMap[e.target];
      if (uIndex === vIndex) {
        return;
      }
      const u = nodeMap[e.source];
      const v = nodeMap[e.target];
      if (!isNumber(v.x) || !isNumber(u.x) || !isNumber(v.y) || !isNumber(u.y)) return;
      const vecx = v.x - u.x;
      const vecy = v.y - u.y;
      const vecLength = Math.sqrt(vecx * vecx + vecy * vecy);
      const common = (vecLength * vecLength) / k;
      disp[vIndex].x -= (vecx / vecLength) * common;
      disp[vIndex].y -= (vecy / vecLength) * common;
      disp[uIndex].x += (vecx / vecLength) * common;
      disp[uIndex].y += (vecy / vecLength) * common;
    });
  }
}
