/**
 * @fileOverview fruchterman layout
 * @author shiwu.wyy@antfin.com
 */

import { EdgeConfig, IPointTuple, NodeConfig, NodeIdxMap } from '../types';
import { BaseLayout } from './layout';
import { isNumber, isFunction, isArray } from '@antv/util';
import { getDegree } from '../util/math'
import { proccessToFunc } from '../util/layout';


type NodeMap = {
  [key: string]: NodeConfig;
};

/**
 * graphin 中的 force 布局
 */
export default class GraphinForceLayout extends BaseLayout {
  /** 布局中心 */
  public center: IPointTuple = [0, 0];
  /** 停止迭代的最大迭代数 */
  public maxIteration: number = 1000;
  /** 弹簧引力系数 */
  public edgeStrength: number | ((d?: any) => number) | undefined = 200;
  /** 斥力系数 */
  public nodeStrength: number | ((d?: any) => number) | undefined = 1000;
  /** 库伦系数 */
  public coulombDisScale: number = 0.005;
  /** 阻尼系数 */
  public damping: number = 0.9;
  /** 最大速度 */
  public maxSpeed: number = 1000;
  /** 一次迭代的平均移动距离小于该值时停止迭代 */
  public minMovement: number = 1;
  /** 迭代中衰减 */
  public interval: number = 0.02;
  /** 斥力的一个系数 */
  public factor: number = 1;
  /** 每个节点质量的回调函数，若不指定，则默认使用度数作为节点质量 */
  public getMass: ((d?: any) => number) | undefined;
  /** 每个节点中心力的 x、y、强度的回调函数，若不指定，则没有额外中心力 */
  public getCenter: ((d?: any, degree?: number) => number[]) | undefined;
  /** 理想边长 */
  public linkDistance: number | ((d?: any) => number) | undefined = 1;
  /** 重力大小 */
  public gravity: number = 10;
  /** 是否防止重叠 */
  public preventOverlap: boolean = true;
  /** 防止重叠时的节点大小，默认从节点数据中取 size */
  public nodeSize: number | number[] | ((d?: any) => number) | undefined;
  /** 防止重叠时的节点之间最小间距 */
  public nodeSpacing: number | number[] | ((d?: any) => number) | undefined;

  public nodes: NodeConfig[] = [];
  public edges: EdgeConfig[] = [];

  public width: number = 300;
  public height: number = 300;

  public nodeMap: NodeMap = {};
  public nodeIdxMap: NodeIdxMap = {};

  public canvasEl: HTMLCanvasElement;
  public onLayoutEnd: () => void;

  /** 存储节点度数 */
  private degrees: number[];

  public getDefaultCfg() {
    return {
      maxIteration: 500,
      center: [0, 0],
      gravity: 10,
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
      if (!isNumber(node.x)) node.x = Math.random() * self.width;
      if (!isNumber(node.y)) node.y = Math.random() * self.height;
      nodeMap[node.id] = node;
      nodeIdxMap[node.id] = i;
    });
    self.nodeMap = nodeMap;
    self.nodeIdxMap = nodeIdxMap;

    self.linkDistance = proccessToFunc(self.linkDistance, 1);
    self.nodeStrength = proccessToFunc(self.nodeStrength, 1);
    self.edgeStrength = proccessToFunc(self.edgeStrength, 1);

    // node size function
    const nodeSize = self.nodeSize;
    let nodeSizeFunc;
    if (self.preventOverlap) {
      const nodeSpacing = self.nodeSpacing;
      let nodeSpacingFunc: ((d?: any) => number);
      if (isNumber(nodeSpacing)) {
        nodeSpacingFunc = () => nodeSpacing as number;
      } else if (isFunction(nodeSpacing)) {
        nodeSpacingFunc = nodeSpacing as ((d?: any) => number);
      } else {
        nodeSpacingFunc = () => 0;
      }
      if (!nodeSize) {
        nodeSizeFunc = (d: NodeConfig) => {
          if (d.size) {
            if (isArray(d.size)) {
              const res = d.size[0] > d.size[1] ? d.size[0] : d.size[1];
              return res + nodeSpacingFunc(d);
            }
            return (d.size as number) + nodeSpacingFunc(d);
          }
          return 10 + nodeSpacingFunc(d);
        };
      } else if (isArray(nodeSize)) {
        nodeSizeFunc = (d: NodeConfig) => {
          const res = nodeSize[0] > nodeSize[1] ? nodeSize[0] : nodeSize[1];
          return res + nodeSpacingFunc(d);
        };
      } else {
        nodeSizeFunc = (d: NodeConfig) => (nodeSize as number) + nodeSpacingFunc(d);
      }
    }
    self.nodeSize = nodeSizeFunc;

    const edges = self.edges;
    self.degrees = getDegree(nodes.length, self.nodeIdxMap, edges);
    if (!self.getMass) {
      self.getMass = (d) => {
        return self.degrees[self.nodeIdxMap[d.id]];
      }
    }

    // layout
    self.run();
  }

  public run() {
    const self = this;
    const nodes = self.nodes;
    const maxIteration = self.maxIteration;
    if (!self.width && typeof window !== 'undefined') {
      self.width = window.innerWidth;
    }
    if (!self.height && typeof window !== 'undefined') {
      self.height = window.innerHeight;
    }

    for (let i = 0; i < maxIteration; i++) {
      const accArray = [], velArray = [];
      nodes.forEach((_, i) => {
        accArray[2 * i] = 0;
        accArray[2 * i + 1] = 0;
        velArray[2 * i] = 0;
        velArray[2 * i + 1] = 0;
      });
      self.calRepulsive(accArray);
      self.calAttractive(accArray);
      self.calGravity(accArray);
      const stepInterval = Math.max(0.02, self.interval - i * 0.002);
      self.updateVelocity(accArray, velArray, stepInterval);
      const previousPos = [];
      self.nodes.forEach(node => {
        previousPos.push({
          x: node.x,
          y: node.y
        });
      })
      self.updatePosition(velArray, stepInterval);

      // whether to stop the iteration
      let movement = 0;
      self.nodes.forEach((node, j) => {
        const vx = node.x - previousPos[j].x;
        const vy = node.y - previousPos[j].y;
        movement += Math.sqrt(vx * vx + vy * vy);
      });
      movement /= self.nodes.length;
      if (movement < self.minMovement) {
        break;
      }
    }
    self.onLayoutEnd && self.onLayoutEnd();
  }
  public calRepulsive(accArray) {
    const self = this;
    const nodes = self.nodes;
    const getMass = self.getMass;
    const nodeStrength = self.nodeStrength as Function;
    const factor = self.factor;
    const coulombDisScale = self.coulombDisScale;
    const preventOverlap = self.preventOverlap;
    const nodeSize = self.nodeSize as Function;
    nodes.forEach((ni, i) => {
      const massi = getMass(ni) || 1;
      nodes.forEach((nj, j) => {
        if (i >= j) return;
        // if (!accArray[j]) accArray[j] = 0;
        const vecX = ni.x - nj.x;
        const vecY = ni.y - nj.y;
        const vecLength = Math.sqrt(vecX * vecX + vecY * vecY) + 0.01;
        const nVecLength = (vecLength + 0.1) * coulombDisScale;
        const direX = vecX / vecLength;
        const direY = vecY / vecLength;
        const param = ((nodeStrength(ni) + nodeStrength(nj)) / 2) * factor / (nVecLength * nVecLength);
        const massj = getMass(nj) || 1;
        accArray[2 * i] += direX * param / massi;
        accArray[2 * i + 1] += direY * param / massi;
        accArray[2 * j] -= direX * param / massj;
        accArray[2 * j + 1] -= direY * param / massj;
        if (preventOverlap && vecLength < (nodeSize(ni) + nodeSize(nj)) / 2) {
          const paramOverlap = ((nodeStrength(ni) + nodeStrength(nj)) / 2) / (vecLength * vecLength);
          accArray[2 * i] += direX * paramOverlap / massi;
          accArray[2 * i + 1] += direY * paramOverlap / massi;
          accArray[2 * j] -= direX * paramOverlap / massj;
          accArray[2 * j + 1] -= direY * paramOverlap / massj;
        }
      });
    });
  }
  public calAttractive(accArray) {
    const self = this;
    const edges = self.edges;
    const nodeMap = self.nodeMap;
    const nodeIdxMap = self.nodeIdxMap;
    const linkDistance = self.linkDistance as Function;
    const edgeStrength = self.edgeStrength as Function;
    const getMass = self.getMass;
    edges.forEach((edge, i) => {
      const sourceNode = nodeMap[edge.source];
      const targetNode = nodeMap[edge.target];
      const vecX = targetNode.x - sourceNode.x;
      const vecY = targetNode.y - sourceNode.y;
      const vecLength = Math.sqrt(vecX * vecX + vecY * vecY) + 0.01;
      const direX = vecX / vecLength;
      const direY = vecY / vecLength;
      const length = linkDistance(edge) || 1;
      const diff = length - vecLength;
      const param = diff * edgeStrength(edge);
      const sourceIdx = nodeIdxMap[edge.source];
      const targetIdx = nodeIdxMap[edge.target]
      const massSource = getMass(sourceNode) || 1;
      const massTarget = getMass(targetNode) || 1;
      accArray[2 * sourceIdx] -= direX * param / massSource;
      accArray[2 * sourceIdx + 1] -= direY * param / massSource;
      accArray[2 * targetIdx] += direX * param / massTarget;
      accArray[2 * targetIdx + 1] += direY * param / massTarget;
    });
  }

  public calGravity(accArray) {
    const self = this;
    const nodes = self.nodes;
    const center = self.center;
    const defaultGravity = self.gravity;
    const degrees = self.degrees;
    const nodeLength = nodes.length;
    for (let i = 0; i < nodeLength; i++) {
      const node = nodes[i];
      let vecX = node.x - center[0];
      let vecY = node.y - center[1];
      let gravity = defaultGravity;

      if (self.getCenter) {
        const customCenterOpt = self.getCenter(node, degrees[i]);
        if (customCenterOpt && isNumber(customCenterOpt[0])
          && isNumber(customCenterOpt[1]) && isNumber(customCenterOpt[2])) {
          vecX = node.x - customCenterOpt[0];
          vecY = node.y - customCenterOpt[1];
          gravity = customCenterOpt[2];
        }
      }
      if (!gravity) continue;

      accArray[2 * i] -= gravity * vecX;
      accArray[2 * i + 1] -= gravity * vecY;
    }
  }

  public updateVelocity(accArray, velArray, stepInterval) {
    const self = this;
    const param = stepInterval * self.damping;
    const nodes = self.nodes;
    nodes.forEach((node, i) => {
      let vx = accArray[2 * i] * param || 0.01;
      let vy = accArray[2 * i + 1] * param || 0.01;
      const vLength = Math.sqrt(vx * vx + vy * vy);
      if (vLength > self.maxSpeed) {
        const param2 = self.maxSpeed / vLength;
        vx = param2 * vx;
        vy = param2 * vy;
      }
      velArray[2 * i] = vx;
      velArray[2 * i + 1] = vy;
    });
  }
  public updatePosition(velArray, stepInterval) {
    const self = this;
    const nodes = self.nodes;
    nodes.forEach((node, i) => {
      const distX = velArray[2 * i] * stepInterval;
      const distY = velArray[2 * i + 1] * stepInterval;
      node.x += distX;
      node.y += distY;
    });
  }
}
