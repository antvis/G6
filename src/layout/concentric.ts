/**
 * @fileOverview concentric layout
 * @author shiwu.wyy@antfin.com
 * this algorithm refers to <cytoscape.js> - https://github.com/cytoscape/cytoscape.js/
 */

import { EdgeConfig, IPointTuple, NodeConfig, NodeIdxMap } from '../types';

import isArray from '@antv/util/lib/is-array';
import isString from '@antv/util/lib/is-string';
import { BaseLayout } from './layout';
import { getDegree } from '../util/math';
import { isNumber } from '@antv/util';

type Node = NodeConfig & {
  [key: string]: number;
};
type Edge = EdgeConfig;

type NodeMap = {
  [key: string]: Node;
};

/**
 * 同心圆布局
 */
export default class ConcentricLayout extends BaseLayout {
  /** 布局中心 */
  public center: IPointTuple = [0, 0];

  public nodeSize: number | IPointTuple = 30;

  /** min spacing between outside of nodes (used for radius adjustment) */
  public minNodeSpacing: number = 10;

  /** prevents node overlap, may overflow boundingBox if not enough space */
  public preventOverlap: boolean = false;

  /** how many radians should be between the first and last node (defaults to full circle) */
  public sweep: number | undefined;

  /** whether levels have an equal radial distance betwen them, may cause bounding box overflow */
  public equidistant: boolean = false;

  /** where nodes start in radians */
  public startAngle: number = (3 / 2) * Math.PI;

  /** whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false) */
  public clockwise: boolean = true;

  /** the letiation of concentric values in each level */
  public maxLevelDiff: undefined | number;

  /** 根据 sortBy 指定的属性进行排布，数值高的放在中心，如果是 sortBy 则会计算节点度数，度数最高的放在中心 */
  public sortBy: string = 'degree';

  public nodes: Node[] = [];

  public edges: Edge[] = [];

  public width: number = 300;

  public height: number = 300;

  private maxValueNode: Node | undefined;

  private counterclockwise: boolean | undefined;

  public getDefaultCfg() {
    return {
      center: [0, 0],
      nodeSize: 30,
      minNodeSpacing: 10,
      preventOverlap: false,
      sweep: undefined,
      equidistant: false,
      startAngle: (3 / 2) * Math.PI,
      clockwise: true,
      maxLevelDiff: undefined,
      sortBy: 'degree',
    };
  }

  /**
   * 执行布局
   */
  public execute() {
    const self = this;
    const nodes = self.nodes;
    const edges = self.edges;
    const n = nodes.length;
    const center = self.center;
    if (n === 0) {
      return;
    }
    if (n === 1) {
      nodes[0].x = center[0];
      nodes[0].y = center[1];
      return;
    }

    const layoutNodes: Node[] = [];
    let maxNodeSize: number;
    if (isArray(self.nodeSize)) {
      maxNodeSize = Math.max(self.nodeSize[0], self.nodeSize[1]);
    } else {
      maxNodeSize = self.nodeSize;
    }
    nodes.forEach((node) => {
      layoutNodes.push(node);
      let nodeSize: number = maxNodeSize;
      if (isArray(node.size)) {
        nodeSize = Math.max(node.size[0], node.size[1]);
      } else if (isNumber(node.size)) {
        nodeSize = node.size;
      }
      maxNodeSize = Math.max(maxNodeSize, nodeSize);
    });

    if (!self.width && typeof window !== 'undefined') {
      self.width = window.innerWidth;
    }
    if (!self.height && typeof window !== 'undefined') {
      self.height = window.innerHeight;
    }
    self.clockwise = self.counterclockwise !== undefined ? !self.counterclockwise : self.clockwise;

    // layout
    const nodeMap: NodeMap = {};
    const nodeIdxMap: NodeIdxMap = {};
    layoutNodes.forEach((node, i) => {
      nodeMap[node.id] = node;
      nodeIdxMap[node.id] = i;
    });

    // get the node degrees
    if (
      self.sortBy === 'degree' ||
      !isString(self.sortBy) ||
      layoutNodes[0][self.sortBy] === undefined
    ) {
      self.sortBy = 'degree';
      if (!isNumber(nodes[0].degree)) {
        const values = getDegree(nodes.length, nodeIdxMap, edges);
        layoutNodes.forEach((node, i) => {
          node.degree = values[i];
        });
      }
    }
    // sort nodes by value
    layoutNodes.sort((n1: Node, n2: Node) => n2[self.sortBy] - n1[self.sortBy]);

    self.maxValueNode = layoutNodes[0];

    self.maxLevelDiff = self.maxLevelDiff || self.maxValueNode[self.sortBy] / 4;

    // put the values into levels
    const levels: any[] = [[]];
    let currentLevel = levels[0];
    layoutNodes.forEach((node) => {
      if (currentLevel.length > 0) {
        const diff = Math.abs(currentLevel[0][self.sortBy] - node[self.sortBy]);
        if (self.maxLevelDiff && diff >= self.maxLevelDiff) {
          currentLevel = [];
          levels.push(currentLevel);
        }
      }
      currentLevel.push(node);
    });

    // create positions for levels
    let minDist = maxNodeSize + self.minNodeSpacing; // min dist between nodes
    if (!self.preventOverlap) {
      // then strictly constrain to bb
      const firstLvlHasMulti = levels.length > 0 && levels[0].length > 1;
      const maxR = Math.min(self.width, self.height) / 2 - minDist;
      const rStep = maxR / (levels.length + (firstLvlHasMulti ? 1 : 0));

      minDist = Math.min(minDist, rStep);
    }

    // find the metrics for each level
    let r = 0;
    levels.forEach((level) => {
      let sweep = self.sweep;
      if (sweep === undefined) {
        sweep = 2 * Math.PI - (2 * Math.PI) / level.length;
      }
      const dTheta = (level.dTheta = sweep / Math.max(1, level.length - 1));

      // calculate the radius
      if (level.length > 1 && self.preventOverlap) {
        // but only if more than one node (can't overlap)
        const dcos = Math.cos(dTheta) - Math.cos(0);
        const dsin = Math.sin(dTheta) - Math.sin(0);
        const rMin = Math.sqrt((minDist * minDist) / (dcos * dcos + dsin * dsin)); // s.t. no nodes overlapping

        r = Math.max(rMin, r);
      }
      level.r = r;
      r += minDist;
    });

    if (self.equidistant) {
      let rDeltaMax = 0;
      let rr = 0;
      for (let i = 0; i < levels.length; i++) {
        const level = levels[i];
        const rDelta = level.r - rr;
        rDeltaMax = Math.max(rDeltaMax, rDelta);
      }
      rr = 0;
      levels.forEach((level, i) => {
        if (i === 0) {
          rr = level.r;
        }
        level.r = rr;
        rr += rDeltaMax;
      });
    }

    // calculate the node positions
    levels.forEach((level) => {
      const dTheta = level.dTheta;
      const rr = level.r;
      level.forEach((node: Node, j: number) => {
        const theta = self.startAngle + (self.clockwise ? 1 : -1) * dTheta * j;
        node.x = center[0] + rr * Math.cos(theta);
        node.y = center[1] + rr * Math.sin(theta);
      });
    });
  }
}
