/**
 * @fileOverview Combo force layout
 * @author shiwu.wyy@antfin.com
 */

import { EdgeConfig, IPointTuple, NodeConfig, NodeIdxMap, ComboTree, ComboConfig } from '../types';
import { BaseLayout } from './layout';
import { isNumber, isArray, isFunction, clone } from '@antv/util';
import { Point } from '@antv/g-base';
import { traverseTreeUp } from '../util/graphic';

type Node = NodeConfig & {
  depth: number;
};

type Edge = EdgeConfig;

type elementMap = {
  [key: string]: Node | ComboConfig;
};

/**
 * force layout for graph with combos
 */
export default class ComboForce extends BaseLayout {
  /** 布局中心 */
  public center: IPointTuple = [0, 0];
  /** 停止迭代的最大迭代数 */
  public maxIteration: number = 500;
  /** 重力大小，影响图的紧凑程度 */
  public gravity: number = 10;
  /** 群组中心力大小 */
  public comboGravity: number = 10;
  /** 默认边长度 */
  public linkDistance: number | ((d?: unknown) => number) = 50;
  /** 每次迭代位移的衰减相关参数 */
  public alpha: number = 1;
  public alphaMin: number = 0.001;
  public alphaDecay: number = 1 - Math.pow(this.alphaMin, 1 / 300);
  public alphaTarget: number = 0;
  /** 节点运动速度衰减参数 */
  public velocityDecay: number = 0.6;
  /** 边引力大小 */
  public linkStrength: number | ((d?: unknown) => number) = 0.1;
  /** 节点引力大小 */
  public nodeStrength: number | ((d?: unknown) => number) = 30;
  /** 是否开启防止重叠 */
  public preventOverlap: boolean = false;
  /** 是否开启节点之间的防止重叠 */
  public preventNodeOverlap: boolean = false;
  /** 是否开启 Combo 之间的防止重叠 */
  public preventComboOverlap: boolean = false;
  /** 防止重叠的碰撞力大小 */
  public collideStrength: number = 1;
  /** 节点大小，用于防止重叠 */
  public nodeSize: number | number[] | ((d?: unknown) => number) | undefined;
  /** 节点最小间距，防止重叠时的间隙 */
  public nodeSpacing: ((d?: unknown) => number) | undefined;
  /** Combo 大小，用于防止重叠 */
  public comboSize: number | number[] | ((d?: unknown) => number) | undefined;
  /** Combo 最小间距，防止重叠时的间隙 */
  public comboSpacing: ((d?: unknown) => number) | undefined;
  /** Combo 内部的 padding */
  public comboPadding: ((d?: unknown) => number) | undefined;
  /** 优化计算斥力的速度，两节点间距超过 optimizeRangeFactor * width 则不再计算斥力和重叠斥力 */
  public optimizeRangeFactor: number = 1;
  /** 每次迭代的回调函数 */
  public tick: () => void = () => {};
  /** 根据边两端节点层级差距的调整函数 */
  public depthAttractiveForceScale: number = 0.3; // ((d?: unknown) => number);
  public depthRepulsiveForceScale: number = 2; // ((d?: unknown) => number);

  /** 内部计算参数 */
  public nodes: Node[] = [];
  public edges: Edge[] = [];
  public combos: ComboConfig[] = [];
  private comboTrees: ComboTree[] = [];
  // add a virtual root to comboTrees
  private comboTree: ComboTree;
  private width: number = 300;
  private height: number = 300;
  private bias: number[] = [];
  private nodeMap: elementMap = {};
  private oriComboMap: elementMap = {};
  private nodeIdxMap: NodeIdxMap = {};


  public getDefaultCfg() {
    return {
      maxIteration: 1000,
      center: [0, 0],
      gravity: 10,
      speed: 1,
      comboGravity: 10,
      preventOverlap: false,
      nodeSpacing: undefined,
      collideStrength: 10,
      comboSpacing: 5,
      comboPadding: 10
    };
  }
  /**
   * 执行布局
   */
  public execute() {
    const self = this;
    const nodes = self.nodes;
    const combos = self.combos;
    const center = self.center;
    self.comboTree = {
      id: 'comboTreeRoot',
      depth: -1,
      children: self.comboTrees
    }

    if (!nodes || nodes.length === 0) {
      return;
    }
    if (nodes.length === 1) {
      nodes[0].x = center[0];
      nodes[0].y = center[1];
      return;
    }
    const nodeMap: elementMap = {};
    const nodeIdxMap: NodeIdxMap = {};
    nodes.forEach((node, i) => {
      nodeMap[node.id] = node;
      nodeIdxMap[node.id] = i;
    });
    self.nodeMap = nodeMap;
    self.nodeIdxMap = nodeIdxMap;

    const oriComboMap: elementMap = {};
    combos.forEach(combo => {
      oriComboMap[combo.id] = combo;
    });
    self.oriComboMap = oriComboMap;
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
    const center = self.center;
    const velocityDecay = self.velocityDecay;

    let comboMap = self.getComboMap();
    self.initVals();

    // init the positions to make the nodes with same combo gather

    // iterate
    for (let i = 0; i < maxIteration; i++) {
      const displacements: Point[] = [];
      nodes.forEach((_, j) => {
        displacements[j] = { x: 0, y: 0 };
      });
      self.applyCalculate(comboMap, displacements);

      // gravity for combos
      self.applyComboCenterForce(comboMap, displacements);

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
    const meanCenter = [ 0, 0 ];
    nodes.forEach(n => {
      if (!isNumber(n.x) || !isNumber(n.y)) return;
      meanCenter[0] += n.x;
      meanCenter[1] += n.y;
    });
    meanCenter[0] /= nodes.length;
    meanCenter[1] /= nodes.length;
    const centerOffset = [ center[0] - meanCenter[0], center[1] - meanCenter[1] ];
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
      if (count[edges[i].source]) count[edges[i].source] ++;
      else count[edges[i].source] = 1;
      if (count[edges[i].target]) count[edges[i].target] ++;
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
      nodeSizeFunc = d => {
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
      nodeSizeFunc = d => {
        const size = nodeSize(d);
        return size + nodeSpacingFunc(d);
      };
    } else if (isArray(nodeSize)) {
      const larger = nodeSize[0] > nodeSize[1] ? nodeSize[0] : nodeSize[1];
      const radius = larger / 2;
      nodeSizeFunc = d => radius + nodeSpacingFunc(d);
    } else if (isNumber(nodeSize)) {
      const radius = nodeSize / 2;
      nodeSizeFunc = d => radius + nodeSpacingFunc(d);
    } else {
      nodeSizeFunc = () => 10;
    }
    this.nodeSize = nodeSizeFunc;


    // comboSpacing to function
    const comboSpacing = self.comboSpacing;
    let comboSpacingFunc: (d: any) => number;
    if (isNumber(comboSpacing)) {
      comboSpacingFunc = () => comboSpacing;
    } else if (isFunction(comboSpacing)) {
      comboSpacingFunc = comboSpacing;
    } else {
      comboSpacingFunc = () => 0;
    }
    this.comboSpacing = comboSpacingFunc;

    // comboPadding to function
    const comboPadding = self.comboPadding;
    let comboPaddingFunc: (d: any) => number;
    if (isNumber(comboPadding)) {
      comboPaddingFunc = () => comboPadding;
    } else if (isArray(comboPadding)) {
      comboPaddingFunc = () => Math.max.apply(null, comboPadding);
    } else if (isFunction(comboPadding)) {
      comboPaddingFunc = comboPadding;
    } else {
      comboPaddingFunc = () => 0;
    }
    this.comboPadding = comboPaddingFunc;

    // linkDistance to function
    let linkDistance = this.linkDistance;
    let linkDistanceFunc;
    if (linkDistance) {
      linkDistance = 50;
    }
    if (isNumber(linkDistance)) {
      linkDistanceFunc = d => {
        return linkDistance;
      }
    }
    this.linkDistance = linkDistanceFunc;

    // linkStrength to function
    let linkStrength = this.linkStrength;
    let linkStrengthFunc;
    if (!linkStrength) {
      linkStrength = 1;
    }
    if (isNumber(linkStrength)) {
      linkStrengthFunc = d => {
        return linkStrength;
      }
    }
    this.linkStrength = linkStrengthFunc;

    // nodeStrength to function
    let nodeStrength = this.nodeStrength;
    let nodeStrengthFunc;
    if (!nodeStrength) {
      nodeStrength = 30;
    }
    if (isNumber(nodeStrength)) {
      nodeStrengthFunc = d => {
        return nodeStrength;
      }
    }
    this.nodeStrength = nodeStrengthFunc;
  }

  private initPos(comboMap) {
    const self = this;
    const nodes = self.nodes;
    nodes.forEach(node => {
      const combo = comboMap[node.comboId];
      node.x = combo.cx + Math.random() * 10;
      node.y = combo.cy + Math.random() * 10;
    });
  }

  private getComboMap() {
    const self = this;
    const nodeMap = self.nodeMap;
    const comboTrees = self.comboTrees;
    let comboMap: {
      [key: string]: {
        name: string | number;
        cx: number;
        cy: number;
        count: number;
        depth: number;
      };
    } = {};

    comboTrees.forEach(ctree => {
      let treeChildren = [];
      traverseTreeUp<ComboTree>(ctree, treeNode => {
        if (treeNode.itemType === 'node') return;
        if (comboMap[treeNode.id] === undefined) {
          const combo = {
            name: treeNode.id,
            cx: 0,
            cy: 0,
            count: 0,
            depth: self.oriComboMap[treeNode.id].depth
          };
          comboMap[treeNode.id] = combo;
        }
        const children = treeNode.children;
        if (children) {
          children.forEach(child => {
            treeChildren.push(child);
          });
        }
        const c = comboMap[treeNode.id];

        c.cx = 0;
        c.cy = 0;
        treeChildren.forEach(child => {
          if (child.itemType !== 'node') return;
          const node = nodeMap[child.id];
          if (isNumber(node.x)) {
            c.cx += node.x;
          }
          if (isNumber(node.y)) {
            c.cy += node.y;
          }
          c.count++;
        });
        c.cx /= c.count;
        c.cy /= c.count;
        
        return true;
      });
    });

    return comboMap;
  }

  private applyComboCenterForce(comboMap, displacements) {
    const self = this;
    const gravity = self.gravity;
    const comboGravity = self.comboGravity || gravity;
    const alpha = this.alpha;
    const comboTrees = self.comboTrees;
    const nodeIdxMap = self.nodeIdxMap;
    const nodeMap = self.nodeMap;
    comboTrees.forEach(ctree => {
      let treeChildren = [];
      traverseTreeUp<ComboTree>(ctree, treeNode => {
        if (treeNode.itemType === 'node') return;
        const children = treeNode.children;
        if (children) {
          children.forEach(child => {
            treeChildren.push(child);
          });
        }
        const c = comboMap[treeNode.id];

        // higher depth the combo, larger the gravity
        const gravityScale = 1 - 1 / (c.depth + 1) || 0.1;
        // apply combo center force for all the descend nodes in this combo
        // and update the center position and count for this combo
        const comboX = c.cx;
        const comboY = c.cy;
        c.cx = 0;
        c.cy = 0;
        treeChildren.forEach(child => {
          if (child.itemType !== 'node') return;
          const node = nodeMap[child.id];
          let vecX = node.x - comboX;
          let vecY = node.y - comboY;
          let l = Math.sqrt(vecX * vecX + vecY * vecY);
          if (vecX === 0) {
            vecX = Math.random() * 0.01;
            l += vecX * vecX;
          }
          if (vecY === 0) {
            vecY = Math.random() * 0.01;
            l += vecY * vecY;
          }
          const childIdx = nodeIdxMap[node.id];
          displacements[childIdx].x -= vecX * comboGravity * alpha / l * gravityScale;
          displacements[childIdx].y -= vecY * comboGravity * alpha / l * gravityScale;
          
          if (isNumber(node.x)) {
            c.cx += node.x;
          }
          if (isNumber(node.y)) {
            c.cy += node.y;
          }
        });
        c.cx /= c.count;
        c.cy /= c.count;
        
        return true;
      });
    });
  }

  private applyCalculate(comboMap, displacements: Point[]) {
    const self = this;
    const nodes = self.nodes;
    // store the vx, vy, and distance to reduce dulplicate calculation
    const vecMap = {};
    nodes.forEach((v, i) => {
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
        vecMap[`${v.id}-${u.id}`] = { vx, vy, vl };
        vecMap[`${u.id}-${v.id}`] = { vx: -vx, vy: -vy, vl };
      });
    });
    // get the sizes of the combos
    self.updateComboSizes(comboMap);
    self.calRepulsive(displacements, vecMap, comboMap);
    self.calAttractive(displacements, vecMap);
    const preventComboOverlap = self.preventComboOverlap;
    if (preventComboOverlap) self.comboNonOverlapping(displacements, comboMap);
  }

  /**
   * Update the sizes of the combos according to their children
   */
  private updateComboSizes(comboMap) {
    const self = this;
    const comboTrees = self.comboTrees;
    const nodeMap = self.nodeMap;
    const nodeSize = self.nodeSize as ((d?: unknown) => number) | undefined;
    const comboSpacing = self.comboSpacing;
    const comboPadding = self.comboPadding;
    comboTrees.forEach(ctree => {
      let treeChildren = [];
      traverseTreeUp<ComboTree>(ctree, treeNode => {
        if (treeNode.itemType === 'node') return;
        const children = treeNode.children;
        if (children) {
          children.forEach(child => {
            treeChildren.push(child);
          });
        }
        const c = comboMap[treeNode.id];

        c.minX = Infinity;
        c.minY = Infinity;
        c.maxX = -Infinity;
        c.maxY = -Infinity;
        treeChildren.forEach(child => {
          if (child.itemType !== 'node') return;
          const node = nodeMap[child.id];
          const r = nodeSize(node);
          const nodeMinX = node.x - r;
          const nodeMinY = node.y - r;
          const nodeMaxX = node.x + r;
          const nodeMaxY = node.y + r;
          if (c.minX > nodeMinX) c.minX = nodeMinX;
          if (c.minY > nodeMinY) c.minY = nodeMinY;
          if (c.maxX < nodeMaxX) c.maxX = nodeMaxX;
          if (c.maxY < nodeMaxY) c.maxY = nodeMaxY;
        });
        c.r = Math.max(c.maxX - c.minX, c.maxY - c.minY) / 2 + comboSpacing(c) / 2 + comboPadding(c);
        
        return true;
      });
    });
  }

  /**
   * prevent the overlappings among combos
   */
  private comboNonOverlapping(displacements, comboMap) {
    const self = this;
    const comboTree = self.comboTree;
    const collideStrength = self.collideStrength;
    const nodeIdxMap = self.nodeIdxMap;

    traverseTreeUp<ComboTree>(comboTree, treeNode => {
      const children = treeNode.children;
      if (children && children.length > 1) {
        children.forEach((v, i) => {
          if (v.itemType === 'node') return;
          const cv = comboMap[v.id];
          children.forEach((u, j) => {
            if (u.itemType === 'node') return;
            if (i <= j) return;
            const cu = comboMap[u.id];
            let vx = cv.cx - cu.cx || 0;
            let vy = cv.cy - cu.cy || 0;
            let l = vx * vx + vy * vy;
            if (vx === 0) {
              vx = Math.random() * 0.01;
              l += vx * vx;
            }
            if (vy === 0) {
              vy = Math.random() * 0.01;
              l += vy * vy;
            }
            const rv = cv.r;
            const ru = cu.r;
            const r = rv + ru;
            // overlapping
            if (l < r * r) {
              const vnodes = v.children;
              const unodes = u.children;
              vnodes.forEach(vn => {
                if (vn.itemType !== 'node') return;
                unodes.forEach(un => {
                  if (un.itemType !== 'node') return;
                  const sqrtl = Math.sqrt(l);
                  const ll = (r - sqrtl) / sqrtl * collideStrength;
                  const ru2 = ru * ru;
                  let rratio = ru2 / (rv * rv + ru2);
                  const xl = vx * ll;
                  const yl = vy * ll;
                  const vindex = nodeIdxMap[vn.id];
                  const uindex = nodeIdxMap[un.id];
                  displacements[vindex].x += xl * rratio;
                  displacements[vindex].y += yl * rratio;
                  rratio = 1 - rratio;
                  displacements[uindex].x -= xl * rratio;
                  displacements[uindex].y -= yl * rratio;
                });
              });
            }
          });
        });
      }
      return true;
    });
  }

  /**
   * Calculate the repulsive force between each node pair
   * @param displacements The array stores the displacements for nodes
   * @param vecMap The map stores vector between each node pair
   */
  private calRepulsive(displacements: Point[], vecMap: any, comboMap) {
    const self = this;
    const nodes = self.nodes;
    const max = self.width * self.optimizeRangeFactor * self.width * self.optimizeRangeFactor;
    const nodeStrength = self.nodeStrength as ((d?: unknown) => number);;
    const alpha = self.alpha;
    const collideStrength = self.collideStrength;
    const preventOverlap = self.preventOverlap;
    const preventNodeOverlap = self.preventNodeOverlap;
    const nodeSizeFunc = self.nodeSize as ((d?: unknown) => number) | undefined;
    const scale = self.depthRepulsiveForceScale;
    nodes.forEach((v, i) => {
      nodes.forEach((u, j) => {
        if (i === j) {
          return;
        }
        if (!isNumber(v.x) || !isNumber(u.x) || !isNumber(v.y) || !isNumber(u.y)) return;
        let { vl, vx, vy } = vecMap[`${v.id}-${u.id}`];
        if (vl > max) return;
      
        const depthDiff = Math.abs(u.depth - v.depth);
        let depthParam = depthDiff ? Math.pow(scale, depthDiff) : 1;
        if (u.comboId !== v.comboId && depthParam === 1) {
          depthParam = scale;
        }

        displacements[i].x += vx * nodeStrength(u) * alpha / vl * depthParam;
        displacements[i].y += vy * nodeStrength(u) * alpha / vl * depthParam;

        // prevent node overlappings
        if (i < j && preventNodeOverlap) {
          const ri = nodeSizeFunc(v);
          const rj = nodeSizeFunc(u);
          const r = ri + rj;
          if (vl < r * r) {
            const sqrtl = Math.sqrt(vl);
            const ll = (r - sqrtl) / sqrtl * collideStrength;
            const rj2 = rj * rj;
            let rratio = rj2 / (ri * ri + rj2);
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

  /**
   * Calculate the attractive force between the node pair with edge
   * @param displacements The array stores the displacements for nodes
   * @param vecMap The map stores vector between each node pair
   */
  private calAttractive(displacements: Point[], vecMap: any) {
    const self = this;
    const edges = self.edges;
    const linkDistance = self.linkDistance as ((d?: unknown) => number);
    const alpha = self.alpha;
    const linkStrength = self.linkStrength as ((d?: unknown) => number);
    const bias = self.bias;
    const scale = self.depthAttractiveForceScale;
    edges.forEach((e, i) => {
      if (!e.source || !e.target) return;
      const uIndex = self.nodeIdxMap[e.source];
      const vIndex = self.nodeIdxMap[e.target];
      if (uIndex === vIndex) {
        return;
      }
      const u = self.nodeMap[e.source];
      const v = self.nodeMap[e.target];
      if (!isNumber(v.x) || !isNumber(u.x) || !isNumber(v.y) || !isNumber(u.y)) return;
      let { vl, vx, vy } = vecMap[`${e.target}-${e.source}`];
      const l = (vl - linkDistance(e)) / vl * alpha * linkStrength(e);
      const vecX = vx * l;
      const vecY = vy * l;
      const b = bias[i];
      
      const depthDiff = Math.abs(u.depth - v.depth);
      let depthParam = depthDiff ? Math.pow(scale, depthDiff) : 1;
      if (u.comboId !== v.comboId && depthParam === 1) {
        depthParam = scale;
      } else if (u.comboId === v.comboId) {
        depthParam = 1;
      }
      displacements[vIndex].x -= vecX * b * depthParam;
      displacements[vIndex].y -= vecY * b * depthParam;
      displacements[uIndex].x += vecX * (1 - b) * depthParam;
      displacements[uIndex].y += vecY * (1 - b) * depthParam;
    });
  }
}
