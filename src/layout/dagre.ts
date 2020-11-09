/**
 * @fileOverview random layout
 * @author shiwu.wyy@antfin.com
 */

import dagre from 'dagre';

import isArray from '@antv/util/lib/is-array';
import { BaseLayout } from './layout';
import { isNumber } from '@antv/util';

/**
 * 层次布局
 */
export default class DagreLayout extends BaseLayout {
  /** layout 方向, 可选 TB, BT, LR, RL */
  public rankdir: 'TB' | 'BT' | 'LR' | 'RL' = 'TB';

  /** 节点对齐方式，可选 UL, UR, DL, DR */
  public align: undefined | 'UL' | 'UR' | 'DL' | 'DR';

  /** 节点大小 */
  public nodeSize: number | number[] | undefined;

  /** 节点水平间距(px) */
  public nodesepFunc: ((d?: any) => number) | undefined;

  /** 每一层节点之间间距 */
  public ranksepFunc: ((d?: any) => number) | undefined;

  /** 节点水平间距(px) */
  public nodesep: number = 50;

  /** 每一层节点之间间距 */
  public ranksep: number = 50;

  /** 是否保留布局连线的控制点 */
  public controlPoints: boolean = false;

  /** 每层节点是否根据节点数据中的 comboId 进行排序，以放置同层 combo 重叠 */
  public sortByCombo: boolean = false;

  public getDefaultCfg() {
    return {
      rankdir: 'TB', // layout 方向, 可选 TB, BT, LR, RL
      align: undefined, // 节点对齐方式，可选 UL, UR, DL, DR
      nodeSize: undefined, // 节点大小
      nodesepFunc: undefined, // 节点水平间距(px)
      ranksepFunc: undefined, // 每一层节点之间间距
      nodesep: 50, // 节点水平间距(px)
      ranksep: 50, // 每一层节点之间间距
      controlPoints: false, // 是否保留布局连线的控制点
    };
  }

  /**
   * 执行布局
   */
  public execute() {
    const self = this;
    const { nodes, nodeSize, rankdir } = self;
    if (!nodes) return;
    const edges = self.edges || [];
    const g = new dagre.graphlib.Graph();

    let nodeSizeFunc: (d?: any) => number[];
    if (!nodeSize) {
      nodeSizeFunc = (d: any) => {
        if (d.size) {
          if (isArray(d.size)) {
            return d.size;
          }
          return [d.size, d.size];
        }
        return [40, 40];
      };
    } else if (isArray(nodeSize)) {
      nodeSizeFunc = () => nodeSize;
    } else {
      nodeSizeFunc = () => [nodeSize, nodeSize];
    }
    let horisep: Function = getFunc(self.nodesepFunc, self.nodesep, 50);
    let vertisep: Function = getFunc(self.ranksepFunc, self.ranksep, 50);

    if (rankdir === 'LR' || rankdir === 'RL') {
      horisep = getFunc(self.ranksepFunc, self.ranksep, 50);
      vertisep = getFunc(self.nodesepFunc, self.nodesep, 50);
    }
    g.setDefaultEdgeLabel(() => ({}));
    g.setGraph(self);
    nodes.forEach((node) => {
      const size = nodeSizeFunc(node);
      const verti = vertisep(node);
      const hori = horisep(node);
      const width = size[0] + 2 * hori;
      const height = size[1] + 2 * verti;
      g.setNode(node.id, { width, height });
    });
    edges.forEach((edge) => {
      // dagrejs Wiki https://github.com/dagrejs/dagre/wiki#configuring-the-layout
      g.setEdge(edge.source, edge.target, {
        weight: edge.weight || 1,
      });
    });
    dagre.layout(g);
    let coord;
    g.nodes().forEach((node: any) => {
      coord = g.node(node);
      const i = nodes.findIndex((it) => it.id === node);
      nodes[i].x = coord.x;
      nodes[i].y = coord.y;
    });
    g.edges().forEach((edge: any) => {
      coord = g.edge(edge);
      const i = edges.findIndex((it) => it.source === edge.v && it.target === edge.w);
      if (self.controlPoints && edges[i].type !== 'loop') {
        edges[i].controlPoints = coord.points.slice(1, coord.points.length - 1);
      }
    });

    if (self.sortByCombo) {
      self.sortLevel('comboId');
    }
  }

  public sortLevel(propertyName: string) {
    const self = this;
    const { nodes } = self;

    const levels = {};
    nodes.forEach((node) => {
      if (!levels[node.y]) levels[node.y] = { y: node.y, nodes: [] };
      levels[node.y].nodes.push(node);
    });

    Object.keys(levels).forEach((key) => {
      const levelNodes = levels[key].nodes;
      const nodesNum = levelNodes.length;
      const comboCenters = {};
      levelNodes.forEach((lnode) => {
        const lnodeCombo = lnode.comboId;
        if (!comboCenters[lnodeCombo]) comboCenters[lnodeCombo] = { x: 0, y: 0, count: 0 };
        comboCenters[lnodeCombo].x += lnode.x;
        comboCenters[lnodeCombo].y += lnode.y;
        comboCenters[lnodeCombo].count++;
      });
      Object.keys(comboCenters).forEach((ckey) => {
        comboCenters[ckey].x /= comboCenters[ckey].count;
        comboCenters[ckey].y /= comboCenters[ckey].count;
      });

      if (nodesNum === 1) return;
      const sortedByX = levelNodes.sort((a, b) => {
        return a.x - b.x;
      });
      const minX = sortedByX[0].x;
      const maxX = sortedByX[nodesNum - 1].x;
      const gap = (maxX - minX) / (nodesNum - 1);

      const sortedByCombo = levelNodes.sort((a, b) => {
        const aValue = a[propertyName] || 'undefined';
        const bValue = b[propertyName] || 'undefined';
        if (aValue < bValue) {
          return -1;
        }
        if (aValue > bValue) {
          return 1;
        }
        return 0;
      });
      sortedByCombo.forEach((node, i) => {
        node.x = minX + i * gap;
      });
    });
  }
}

function getFunc(
  func: ((d?: any) => number) | undefined,
  value: number,
  defaultValue: number,
): Function {
  let resultFunc;
  if (func) {
    resultFunc = func;
  } else if (isNumber(value)) {
    resultFunc = () => value;
  } else {
    resultFunc = () => defaultValue;
  }
  return resultFunc;
}
