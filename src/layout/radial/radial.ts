/**
 * @fileOverview random layout
 * @author shiwu.wyy@antfin.com
 */

import { IPointTuple, NodeConfig } from '@g6/types';

import isArray from '@antv/util/lib/is-array';
import isNumber from '@antv/util/lib/is-number';
import isString from '@antv/util/lib/is-string';
import isFunction from '@antv/util/lib/is-function';
import { floydWarshall, getAdjMatrix } from '../../util/math';

import { BaseLayout } from '../layout';

import MDS from './mds';
import RadialNonoverlapForce from './radialNonoverlapForce';

type Node = NodeConfig;

function getWeightMatrix(M: number[][]) {
  const rows = M.length;
  const cols = M[0].length;
  const result = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      if (M[i][j] !== 0) {
        row.push(1 / Math.pow(M[i][j], 2));
      } else {
        row.push(0);
      }
    }
    result.push(row);
  }
  return result;
}

function getIndexById(array: any[], id: string) {
  let index = -1;
  array.forEach((a, i) => {
    if (a.id === id) {
      index = i;
      return;
    }
  });
  return index;
}

function getEDistance(p1: IPointTuple, p2: IPointTuple) {
  return Math.sqrt((p1[0] - p2[0]) * (p1[0] - p2[0]) + (p1[1] - p2[1]) * (p1[1] - p2[1]));
}

/**
 * 随机布局
 */
export default class RadialLayout extends BaseLayout {
  /** 布局中心 */
  public center: IPointTuple;
  /** 停止迭代的最大迭代数 */
  public maxIteration: number;
  /** 中心点，默认为数据中第一个点 */
  public focusNode: String | Node;
  /** 每一圈半径 */
  public unitRadius: number;
  /** 默认边长度 */
  public linkDistance: number;
  /** 是否防止重叠 */
  public preventOverlap: boolean;
  /** 节点直径 */
  public nodeSize: number;
  /** 节点间距，防止节点重叠时节点之间的最小距离（两节点边缘最短距离） */
  public nodeSpacing: number;
  /** 是否必须是严格的 radial 布局，即每一层的节点严格布局在一个环上。preventOverlap 为 true 时生效 */
  public strictRadial: boolean;
  /** 防止重叠步骤的最大迭代次数 */
  public maxPreventOverlapIteration: number;

  public sortBy: string;
  public sortStrength: number;

  public width: number;
  public height: number;

  private focusIndex;
  private distances;
  private eIdealDistances;
  private weights;
  private radii;

  public getDefaultCfg() {
    return {
      center: [0, 0],
      maxIteration: 1000,
      focusNode: null,
      unitRadius: null,
      linkDistance: 50,
      preventOverlap: false,
      nodeSize: undefined,
      nodeSpacing: undefined,
      strictRadial: true,
      maxPreventOverlapIteration: 200,
      sortBy: undefined,	
      sortStrength: 10
    };
  }
  /**
   * 执行布局
   */
  public execute() {
    const self = this;
    const nodes = self.nodes;
    const edges = self.edges;
    const center = self.center;
    if (nodes.length === 0) {
      return;
    } else if (nodes.length === 1) {
      nodes[0].x = center[0];
      nodes[0].y = center[1];
      return;
    }
    const linkDistance = self.linkDistance;
    // layout
    let focusNode: Node;
    if (isString(self.focusNode)) {
      let found = false;
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === self.focusNode) {
          focusNode = nodes[i];
          self.focusNode = focusNode;
          found = true;
          i = nodes.length;
        }
      }
      if (!found) {
        focusNode = null;
      }
    } else {
      focusNode = self.focusNode as Node;
    }
    // default focus node
    if (!focusNode) {
      focusNode = nodes[0];
      self.focusNode = focusNode;
    }
    // the index of the focusNode in data
    const focusIndex = getIndexById(nodes, focusNode.id);
    self.focusIndex = focusIndex;

    // the graph-theoretic distance (shortest path distance) matrix
    const adjMatrix = getAdjMatrix({ nodes, edges }, false);
    const D = floydWarshall(adjMatrix);
    const maxDistance = self.maxToFocus(D, focusIndex);
    // replace first node in unconnected component to the circle at (maxDistance + 1)
    self.handleInfinity(D, focusIndex, maxDistance + 1);
    self.distances = D;

    // the shortest path distance from each node to focusNode
    const focusNodeD = D[focusIndex];
    if (!self.width && typeof window !== 'undefined') {
      self.width = window.innerWidth;
    }
    if (!self.height && typeof window !== 'undefined') {
      self.height = window.innerHeight;
    }
    const width = self.width;
    const height = self.height;
    let semiWidth = width - center[0] > center[0] ? center[0] : width - center[0];
    let semiHeight = height - center[1] > center[1] ? center[1] : height - center[1];
    if (semiWidth === 0) {
      semiWidth = width / 2;
    }
    if (semiHeight === 0) {
      semiHeight = height / 2;
    }
    // the maxRadius of the graph
    const maxRadius = semiHeight > semiWidth ? semiWidth : semiHeight;
    const maxD = Math.max(...focusNodeD);
    // the radius for each nodes away from focusNode
    const radii = [];
    focusNodeD.forEach((value, i) => {
      if (!self.unitRadius) {
        self.unitRadius = maxRadius / maxD;
      }
      radii[i] = value * self.unitRadius;
    });
    self.radii = radii;

    const eIdealD = self.eIdealDisMatrix();
    // const eIdealD = scaleMatrix(D, linkDistance);
    self.eIdealDistances = eIdealD;
    // the weight matrix, Wij = 1 / dij^(-2)
    const W = getWeightMatrix(eIdealD);
    self.weights = W;

    // the initial positions from mds
    const mds = new MDS({ distances: eIdealD, linkDistance });
    let positions = mds.layout();
    positions.forEach((p) => {
      if (isNaN(p[0])) {
        p[0] = Math.random() * linkDistance;
      }
      if (isNaN(p[1])) {
        p[1] = Math.random() * linkDistance;
      }
    });
    self.positions = positions;
    positions.forEach((p, i) => {
      nodes[i].x = p[0] + center[0];
      nodes[i].y = p[1] + center[1];
    });
    // move the graph to origin, centered at focusNode
    positions.forEach((p) => {
      p[0] -= positions[focusIndex][0];
      p[1] -= positions[focusIndex][1];
    });
    self.run();
    const preventOverlap = self.preventOverlap;
    const nodeSize = self.nodeSize;
    let nodeSizeFunc;
    const strictRadial = self.strictRadial;
    // stagger the overlapped nodes
    if (preventOverlap) {
      const nodeSpacing = self.nodeSpacing;
      let nodeSpacingFunc;
      if (isNumber(nodeSpacing)) {
        nodeSpacingFunc = () => {
          return nodeSpacing;
        };
      } else if (isFunction(nodeSpacing)) {
        nodeSpacingFunc = nodeSpacing;
      } else {
        nodeSpacingFunc = () => {
          return 0;
        };
      }
      if (!nodeSize) {
        nodeSizeFunc = (d) => {
          if (d.size) {
            if (isArray(d.size)) {
              const res = d.size[0] > d.size[1] ? d.size[0] : d.size[1];
              return res + nodeSpacingFunc(d);
            }
            return d.size + nodeSpacingFunc(d);
          }
          return 10 + nodeSpacingFunc(d);
        };
      } else {
        if (isArray(nodeSize)) {
          nodeSizeFunc = (d) => {
            const res = nodeSize[0] > nodeSize[1] ? nodeSize[0] : nodeSize[1];
            return res + nodeSpacingFunc(d);
          };
        } else {
          nodeSizeFunc = (d) => {
            return nodeSize + nodeSpacingFunc(d);
          };
        }
      }
      const nonoverlapForce = new RadialNonoverlapForce({
        nodeSizeFunc,
        adjMatrix,
        positions,
        radii,
        height,
        width,
        strictRadial,
        focusID: focusIndex,
        iterations: self.maxPreventOverlapIteration || 200,
        k: positions.length / 4.5,
        nodes,
      });
      positions = nonoverlapForce.layout();
    }
    // move the graph to center
    positions.forEach((p, i) => {
      nodes[i].x = p[0] + center[0];
      nodes[i].y = p[1] + center[1];
    });
  }
  public run() {
    const self = this;
    const maxIteration = self.maxIteration;
    const positions = self.positions;
    const W = self.weights;
    const eIdealDis = self.eIdealDistances;
    const radii = self.radii;
    for (let i = 0; i <= maxIteration; i++) {
      const param = i / maxIteration;
      self.oneIteration(param, positions, radii, eIdealDis, W);
    }
  }

  private oneIteration(param, positions, radii, D, W) {
    const self = this;
    const vparam = 1 - param;
    const focusIndex = self.focusIndex;
    positions.forEach((v, i) => {
      // v
      const originDis = getEDistance(v, [0, 0]);
      const reciODis = originDis === 0 ? 0 : 1 / originDis;
      if (i === focusIndex) {
        return;
      }
      let xMolecule = 0;
      let yMolecule = 0;
      let denominator = 0;
      positions.forEach((u, j) => {
        // u
        if (i === j) {
          return;
        }
        // the euclidean distance between v and u
        const edis = getEDistance(v, u);
        const reciEdis = edis === 0 ? 0 : 1 / edis;
        const idealDis = D[j][i];
        // same for x and y
        denominator += W[i][j];
        // x
        xMolecule += W[i][j] * (u[0] + idealDis * (v[0] - u[0]) * reciEdis);
        // y
        yMolecule += W[i][j] * (u[1] + idealDis * (v[1] - u[1]) * reciEdis);
      });
      const reciR = radii[i] === 0 ? 0 : 1 / radii[i];
      denominator *= vparam;
      denominator += param * Math.pow(reciR, 2);
      // x
      xMolecule *= vparam;
      xMolecule += param * reciR * v[0] * reciODis;
      v[0] = xMolecule / denominator;
      // y
      yMolecule *= vparam;
      yMolecule += param * reciR * v[1] * reciODis;
      v[1] = yMolecule / denominator;
    });
  }

  private eIdealDisMatrix() {
    const self = this;
    const D = self.distances;
    const linkDis = self.linkDistance;
    const radii = self.radii;
    const unitRadius = self.unitRadius;
    const result = [];
    const nodes = self.nodes;
    D.forEach((row, i) => {
      const newRow: number[] = [];
      row.forEach((v, j) => {
        if (i === j) {
          newRow.push(0);
        } else if (radii[i] === radii[j]) { // i and j are on the same circle	
          if (self.sortBy === 'data') { // sort the nodes on the same circle according to the ordering of the data	
            newRow.push(v * (Math.abs(i - j) * self.sortStrength) / (radii[i] / unitRadius));	
          } else if (self.sortBy) { // sort the nodes on the same circle according to the attributes	
            let iValue: number | string = nodes[i][self.sortBy] as number | string || 0;
            let jValue: number | string = nodes[j][self.sortBy] as number | string || 0;
            if (isString(iValue)) {	
              iValue = iValue.charCodeAt(0);	
            }
            if (isString(jValue)) {	
              jValue = jValue.charCodeAt(0);	
            }	
            newRow.push(v * (Math.abs(iValue - jValue) * self.sortStrength) / (radii[i] / unitRadius));	
          } else {	
            newRow.push(v * linkDis / (radii[i] / unitRadius));	
          }	
        } else { // i and j are on different circle
          // i and j are on different circle
          const link = (linkDis + unitRadius) / 2;
          newRow.push(v * link);
        }
      });
      result.push(newRow);
    });
    return result;
  }

  private handleInfinity(matrix, focusIndex, step) {
    const length = matrix.length;
    // 遍历 matrix 中遍历 focus 对应行
    for (let i = 0; i < length; i++) {
      // matrix 关注点对应行的 Inf 项
      if (matrix[focusIndex][i] === Infinity) {
        matrix[focusIndex][i] = step;
        matrix[i][focusIndex] = step;
        // 遍历 matrix 中的 i 行，i 行中非 Inf 项若在 focus 行为 Inf，则替换 focus 行的那个 Inf
        for (let j = 0; j < length; j++) {
          if (matrix[i][j] !== Infinity && matrix[focusIndex][j] === Infinity) {
            matrix[focusIndex][j] = step + matrix[i][j];
            matrix[j][focusIndex] = step + matrix[i][j];
          }
        }
      }
    }
    // 处理其他行的 Inf。根据该行对应点与 focus 距离以及 Inf 项点 与 focus 距离，决定替换值
    for (let i = 0; i < length; i++) {
      if (i === focusIndex) {
        continue;
      }
      for (let j = 0; j < length; j++) {
        if (matrix[i][j] === Infinity) {
          let minus = Math.abs(matrix[focusIndex][i] - matrix[focusIndex][j]);
          minus = minus === 0 ? 1 : minus;
          matrix[i][j] = minus;
        }
      }
    }
  }

  private maxToFocus(matrix, focusIndex) {
    let max = 0;
    for (let i = 0; i < matrix[focusIndex].length; i++) {
      if (matrix[focusIndex][i] === Infinity) {
        continue;
      }
      max = matrix[focusIndex][i] > max ? matrix[focusIndex][i] : max;
    }
    return max;
  }
}
