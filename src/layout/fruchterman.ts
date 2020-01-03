/**
 * @fileOverview random layout
 * @author shiwu.wyy@antfin.com
 */

import { EdgeConfig, IPointTuple, NodeConfig } from '@g6/types';
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

  public nodeMap: NodeMap;
  public nodeIndexMap: NodeIndexMap;

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
    const nodeMap = new Map();
    const nodeIndexMap = new Map();
    nodes.forEach((node, i) => {
      nodeMap.set(node.id, node);
      nodeIndexMap.set(node.id, i);
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
    const nodeMap = self.nodeMap;
    const nodeIndexMap = self.nodeIndexMap;
    const maxDisplace = self.width / 10;
    const k = Math.sqrt((self.width * self.height) / (nodes.length + 1));
    const gravity = self.gravity;
    const speed = self.speed;
    const clustering = self.clustering;
    const clusterMap = new Map();
    if (clustering) {
      nodes.forEach((n) => {
        if (clusterMap.get(n.cluster) === undefined) {
          const cluster = {
            name: n.cluster,
            cx: 0,
            cy: 0,
            count: 0,
          };
          clusterMap.set(n.cluster, cluster);
        }
        const c = clusterMap.get(n.cluster);
        c.cx += n.x;
        c.cy += n.y;
        c.count++;
      });
      clusterMap.forEach((c) => {
        c.cx /= c.count;
        c.cy /= c.count;
      });
    }
    for (let i = 0; i < maxIteration; i++) {
      const disp = [];
      nodes.forEach((_, j) => {
        disp[j] = { x: 0, y: 0 };
      });
      self.getDisp(nodes, edges, nodeMap, nodeIndexMap, disp, k);

      // gravity for clusters
      if (clustering) {
        const clusterGravity = self.clusterGravity || gravity;
        nodes.forEach((n, j) => {
          const c = clusterMap.get(n.cluster);
          const distLength = Math.sqrt((n.x - c.cx) * (n.x - c.cx) + (n.y - c.cy) * (n.y - c.cy));
          const gravityForce = k * clusterGravity;
          disp[j].x -= (gravityForce * (n.x - c.cx)) / distLength;
          disp[j].y -= (gravityForce * (n.y - c.cy)) / distLength;
        });

        clusterMap.forEach((c) => {
          c.cx = 0;
          c.cy = 0;
          c.count = 0;
        });
        nodes.forEach((n) => {
          const c = clusterMap.get(n.cluster);
          c.cx += n.x;
          c.cy += n.y;
          c.count++;
        });
        clusterMap.forEach((c) => {
          c.cx /= c.count;
          c.cy /= c.count;
        });
      }

      // gravity
      nodes.forEach((n, j) => {
        const gravityForce = 0.01 * k * gravity;
        disp[j].x -= gravityForce * (n.x - center[0]);
        disp[j].y -= gravityForce * (n.y - center[1]);
      });
      // speed
      nodes.forEach((_, j) => {
        disp[j].dx *= speed / SPEED_DIVISOR;
        disp[j].dy *= speed / SPEED_DIVISOR;
      });

      // move
      nodes.forEach((n, j) => {
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
  private getDisp(nodes: Node[], edges: Edge[], nodeMap: NodeMap, nodeIndexMap: NodeIndexMap, disp, k) {
    const self = this;
    self.calRepulsive(nodes, disp, k);
    self.calAttractive(edges, nodeMap, nodeIndexMap, disp, k);
  }

  private calRepulsive(nodes: Node[], disp, k) {
    nodes.forEach((v, i) => {
      disp[i] = { x: 0, y: 0 };
      nodes.forEach((u, j) => {
        if (i === j) {
          return;
        }
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

  private calAttractive(edges: Edge[], nodeMap: NodeMap, nodeIndexMap: NodeIndexMap, disp, k) {
    edges.forEach((e) => {
      const uIndex = nodeIndexMap.get(e.source);
      const vIndex = nodeIndexMap.get(e.target);
      if (uIndex === vIndex) {
        return;
      }
      const u = nodeMap.get(e.source);
      const v = nodeMap.get(e.target);
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
