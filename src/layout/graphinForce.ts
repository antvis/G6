/**
 * @fileOverview fruchterman layout
 * @author shiwu.wyy@antfin.com
 */

import { EdgeConfig, IPointTuple, NodeConfig, NodeIdxMap } from '../types';
import { BaseLayout } from './layout';
import { isNumber } from '@antv/util';

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
  public stiffness: number = 200;
  /** 斥力系数 */
  public repulsion: number = 1000;
  /** 库伦系数 */
  public coulombDisScale: number = 0.005;
  /** 阻尼系数 */
  public damping: number = 0.9;
  /** 最大速度 */
  public maxSpeed: number = 1000;
  /** 一次迭代的平均移动距离小于该值时停止迭代 */
  public minMovement: number = 0.5;
  /** 迭代中衰减 */
  public interval: number = 0.02;
  /** 斥力的一个系数 */
  public factor: number = 1;

  public nodes: NodeConfig[] = [];
  public edges: EdgeConfig[] = [];

  public width: number = 300;
  public height: number = 300;

  public nodeMap: NodeMap = {};
  public nodeIdxMap: NodeIdxMap = {};

  public canvasEl: HTMLCanvasElement;
  public onLayoutEnd: () => void;

  /** 边长函数 */
  private edgeLengthsFunc: (edge: any) => number;

  public getDefaultCfg() {
    return {
      maxIteration: 1,
      center: [0, 0],
      gravity: 10,
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
    }
    if (nodes.length === 1) {
      nodes[0].x = center[0];
      nodes[0].y = center[1];
      return;
    }
    const nodeMap: NodeMap = {};
    const nodeIdxMap: NodeIdxMap = {};
    nodes.forEach((node, i) => {
      if (!isNumber(node.x)) node.x = Math.random() * this.width;
      if (!isNumber(node.y)) node.y = Math.random() * this.height;
      nodeMap[node.id] = node;
      nodeIdxMap[node.id] = i;
    });
    self.nodeMap = nodeMap;
    self.nodeIdxMap = nodeIdxMap;

    const edgeLengthsFunc = edge => {
      return 1;
    }
    self.edgeLengthsFunc = edgeLengthsFunc;

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

    // init degree for mass
    const degrees = [];
    edges.forEach(edge => {
      const sourceIdx = self.nodeIdxMap[edge.source];
      const targetIdx = self.nodeIdxMap[edge.target];
      degrees[sourceIdx] = degrees[sourceIdx] ? 1 : (degrees[sourceIdx] + 1);
      degrees[targetIdx] = degrees[targetIdx] ? 1 : (degrees[targetIdx] + 1);
    });

    // init nodes' properties array
    const nodeProperties = [];
    nodes.forEach((node, i) => {
      // nodeProperties.push(0) // vx
      // nodeProperties.push(0) // vy
      // nodeProperties.push(0) // ax
      // nodeProperties.push(0) // ay

      nodeProperties.push(degrees[i]) // m
      nodeProperties.push(0) // 补位
      nodeProperties.push(0) // 补位
      nodeProperties.push(0) // 补位
    });

    console.log(nodes);
    for (let i = 0; i < maxIteration; i++) {
      console.log('iter ', i);
      const accArray = [], velArray = [];
      nodes.forEach((_, i) => {
        accArray[2 * i] = 0;
        accArray[2 * i + 1] = 0;
        velArray[2 * i] = 0;
        velArray[2 * i + 1] = 0;
      });
      self.calRepulsive(accArray);
      self.calAttractive(accArray);
      // self.calGravity();
      self.updateVelocity(accArray, velArray);
      self.updatePosition(velArray);
      // console.log(accArray, velArray);
    }
    self.onLayoutEnd && self.onLayoutEnd();
  }
  public calRepulsive(accArray) {
    const self = this;
    const nodes = self.nodes;
    nodes.forEach((ni, i) => {
      nodes.forEach((nj, j) => {
        if (i >= j) return;
        // if (!accArray[j]) accArray[j] = 0;
        const vecX = ni.x - nj.x;
        const vecY = ni.y - nj.y;
        const vecLength = Math.sqrt(vecX * vecX + vecY * vecY) + 0.01;
        const nVecLength = (vecLength + 0.1) * self.coulombDisScale;
        const direX = vecX / vecLength;
        const direY = vecY / vecLength;
        const param = self.repulsion * self.factor / (nVecLength * nVecLength);
        accArray[2 * i] += direX * param;
        accArray[2 * i + 1] += direY * param;
        accArray[2 * j] -= direX * param;
        accArray[2 * j + 1] -= direY * param;
        // console.log(i, j, vecX, vecY, vecLength, nVecLength, direX, direY, param, accArray[2 * i], accArray[2 * i + 1])
      });
    });
  }
  public calAttractive(accArray) {
    const self = this;
    const edges = self.edges;
    const nodeMap = self.nodeMap;
    const nodeIdxMap = self.nodeIdxMap;
    const edgeLengthsFunc = self.edgeLengthsFunc;
    edges.forEach((edge, i) => {
      const sourceNode = nodeMap[edge.source];
      const targetNode = nodeMap[edge.target];
      const vecX = targetNode.x - sourceNode.x;
      const vecY = targetNode.y - sourceNode.y;
      const vecLength = Math.sqrt(vecX * vecX + vecY * vecY) + 0.01;
      const direX = vecX / vecLength;
      const direY = vecY / vecLength;
      const length = edgeLengthsFunc(edge) || 1;
      const diff = length - vecLength;
      const param = diff * self.stiffness;
      // console.log(edge.source, nodeIdxMap[edge.source], edge.target, nodeIdxMap[edge.target])
      accArray[2 * nodeIdxMap[edge.source]] -= direX * param;
      accArray[2 * nodeIdxMap[edge.source] + 1] -= direY * param;
      accArray[2 * nodeIdxMap[edge.target]] += direX * param;
      accArray[2 * nodeIdxMap[edge.target] + 1] += direY * param;
    });
  }
  public updateVelocity(accArray, velArray) {
    const self = this;
    const interval = self.interval;
    const param = interval * self.damping;
    const nodes = self.nodes;
    nodes.forEach((node, i) => {
      let vx = accArray[2 * i] * param;
      let vy = accArray[2 * i + 1] * param;
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
  public updatePosition(velArray) {
    const self = this;
    const nodes = self.nodes;
    const interval = self.interval;
    nodes.forEach((node, i) => {
      const distX = velArray[2 * i] * interval;
      const distY = velArray[2 * i + 1] * interval;
      node.x += distX;
      node.y += distY;
    });
  }
}
