/**
 * @fileOverview random layout
 * @author shiwu.wyy@antfin.com
 */

import { EdgeConfig, IPointTuple, NodeConfig, NodeIdxMap } from '../types';
import { BaseLayout } from './layout';
import { getDegree } from '../util/math';
import { clone } from '@antv/util';

type Node = NodeConfig & {
  degree: number;
  children: string[];
  parent: string[];
};
type Edge = EdgeConfig;

function initHierarchy(nodes: Node[], edges: Edge[], nodeMap: NodeIdxMap, directed: boolean) {
  nodes.forEach((_, i: number) => {
    nodes[i].children = [];
    nodes[i].parent = [];
  });
  if (directed) {
    edges.forEach((e) => {
      let sourceIdx = 0;
      if (e.source) {
        sourceIdx = nodeMap[e.source];
      }
      let targetIdx = 0;
      if (e.target) {
        targetIdx = nodeMap[e.target];
      }
      nodes[sourceIdx].children.push(nodes[targetIdx].id);
      nodes[targetIdx].parent.push(nodes[sourceIdx].id);
    });
  } else {
    edges.forEach((e) => {
      let sourceIdx = 0;
      if (e.source) {
        sourceIdx = nodeMap[e.source];
      }
      let targetIdx = 0;
      if (e.target) {
        targetIdx = nodeMap[e.target];
      }
      nodes[sourceIdx].children.push(nodes[targetIdx].id);
      nodes[targetIdx].children.push(nodes[sourceIdx].id);
    });
  }
}

function connect(a: Node, b: Node, edges: Edge[]) {
  const m = edges.length;
  for (let i = 0; i < m; i++) {
    if (
      (a.id === edges[i].source && b.id === edges[i].target) ||
      (b.id === edges[i].source && a.id === edges[i].target)
    ) {
      return true;
    }
  }
  return false;
}

function compareDegree(a: Node, b: Node) {
  if (a.degree < b.degree) {
    return -1;
  }
  if (a.degree > b.degree) {
    return 1;
  }
  return 0;
}

/**
 * 圆形布局
 */
export default class CircularLayout extends BaseLayout {
  /** 布局中心 */
  public center: IPointTuple = [0, 0];

  /** 固定半径，若设置了 radius，则 startRadius 与 endRadius 不起效 */
  public radius: number | null = null;

  /** 起始半径 */
  public startRadius: number | null = null;

  /** 终止半径 */
  public endRadius: number | null = null;

  /** 起始角度 */
  public startAngle: number = 0;

  /** 终止角度 */
  public endAngle: number = 2 * Math.PI;

  /** 是否顺时针 */
  public clockwise: boolean = true;

  /** 节点在环上分成段数（几个段将均匀分布），在 endRadius - startRadius != 0 时生效 */
  public divisions: number = 1;

  /** 节点在环上排序的依据，可选: 'topology', 'degree', 'null' */
  public ordering: 'topology' | 'topology-directed' | 'degree' | null = null;

  /** how many 2*pi from first to last nodes */
  public angleRatio = 1;

  public nodes: Node[] = [];

  public edges: Edge[] = [];

  private nodeMap: NodeIdxMap = {};

  private degrees: number[] = [];

  private astep: number | undefined;

  public width: number = 300;

  public height: number = 300;

  public getDefaultCfg() {
    return {
      center: [0, 0],
      radius: null,
      startRadius: null,
      endRadius: null,
      startAngle: 0,
      endAngle: 2 * Math.PI,
      clockwise: true,
      divisions: 1,
      ordering: null,
      angleRatio: 1,
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

    let radius = self.radius;
    let startRadius = self.startRadius;
    let endRadius = self.endRadius;
    const divisions = self.divisions;
    const startAngle = self.startAngle;
    const endAngle = self.endAngle;
    const angleStep = (endAngle - startAngle) / n;
    // layout
    const nodeMap: NodeIdxMap = {};
    nodes.forEach((node, i) => {
      nodeMap[node.id] = i;
    });
    self.nodeMap = nodeMap;
    const degrees = getDegree(nodes.length, nodeMap, edges);
    self.degrees = degrees;

    if (!self.width && typeof window !== 'undefined') {
      self.width = window.innerWidth;
    }
    if (!self.height && typeof window !== 'undefined') {
      self.height = window.innerHeight;
    }
    if (!radius && !startRadius && !endRadius) {
      radius = self.height > self.width ? self.width / 2 : self.height / 2;
    } else if (!startRadius && endRadius) {
      startRadius = endRadius;
    } else if (startRadius && !endRadius) {
      endRadius = startRadius;
    }
    const angleRatio = self.angleRatio;
    const astep = angleStep * angleRatio;
    self.astep = astep;

    const ordering = self.ordering;
    let layoutNodes = [];
    if (ordering === 'topology') {
      // layout according to the topology
      layoutNodes = self.topologyOrdering();
    } else if (ordering === 'topology-directed') {
      // layout according to the topology
      layoutNodes = self.topologyOrdering(true);
    } else if (ordering === 'degree') {
      // layout according to the descent order of degrees
      layoutNodes = self.degreeOrdering();
    } else {
      // layout according to the original order in the data.nodes
      layoutNodes = nodes;
    }

    const clockwise = self.clockwise;
    const divN = Math.ceil(n / divisions); // node number in each division
    for (let i = 0; i < n; ++i) {
      let r = radius;
      if (!r && startRadius !== null && endRadius !== null) {
        r = startRadius + (i * (endRadius - startRadius)) / (n - 1);
      }
      if (!r) {
        r = 10 + (i * 100) / (n - 1);
      }
      let angle =
        startAngle + (i % divN) * astep + ((2 * Math.PI) / divisions) * Math.floor(i / divN);
      if (!clockwise) {
        angle = endAngle - (i % divN) * astep - ((2 * Math.PI) / divisions) * Math.floor(i / divN);
      }
      layoutNodes[i].x = center[0] + Math.cos(angle) * r;
      layoutNodes[i].y = center[1] + Math.sin(angle) * r;
      layoutNodes[i].weight = degrees[i];
    }
  }

  /**
   * 根据节点的拓扑结构排序
   * @return {array} orderedNodes 排序后的结果
   */
  public topologyOrdering(directed: boolean = false) {
    const self = this;
    const degrees = self.degrees;
    const edges = self.edges;
    const nodes = self.nodes;
    const cnodes = clone(nodes);
    const nodeMap = self.nodeMap;
    const orderedCNodes = [cnodes[0]];
    const resNodes = [nodes[0]];
    const pickFlags: boolean[] = [];
    const n = nodes.length;
    pickFlags[0] = true;
    initHierarchy(cnodes, edges, nodeMap, directed);
    let k = 0;
    cnodes.forEach((cnode, i) => {
      if (i !== 0) {
        if (
          (i === n - 1 ||
            degrees[i] !== degrees[i + 1] ||
            connect(orderedCNodes[k], cnode, edges)) &&
          pickFlags[i] !== true
        ) {
          orderedCNodes.push(cnode);
          resNodes.push(nodes[nodeMap[cnode.id]]);
          pickFlags[i] = true;
          k++;
        } else {
          const children = orderedCNodes[k].children;
          let foundChild = false;
          for (let j = 0; j < children.length; j++) {
            const childIdx = nodeMap[children[j]];
            if (degrees[childIdx] === degrees[i] && pickFlags[childIdx] !== true) {
              orderedCNodes.push(cnodes[childIdx]);
              resNodes.push(nodes[nodeMap[cnodes[childIdx].id]]);
              pickFlags[childIdx] = true;
              foundChild = true;
              break;
            }
          }
          let ii = 0;
          while (!foundChild) {
            if (!pickFlags[ii]) {
              orderedCNodes.push(cnodes[ii]);
              resNodes.push(nodes[nodeMap[cnodes[ii].id]]);
              pickFlags[ii] = true;
              foundChild = true;
            }
            ii++;
            if (ii === n) {
              break;
            }
          }
        }
      }
    });
    return resNodes;
  }

  /**
   * 根据节点度数大小排序
   * @return {array} orderedNodes 排序后的结果
   */
  public degreeOrdering(): Node[] {
    const self = this;
    const nodes = self.nodes;
    const orderedNodes: Node[] = [];
    const degrees = self.degrees;
    nodes.forEach((node, i) => {
      node.degree = degrees[i];
      orderedNodes.push(node);
    });
    orderedNodes.sort(compareDegree);
    return orderedNodes;
  }
}
