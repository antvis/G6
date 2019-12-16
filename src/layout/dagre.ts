/**
 * @fileOverview random layout
 * @author shiwu.wyy@antfin.com
 */

import dagre from 'dagre';

import isArray from '@antv/util/lib/is-array';
import { BaseLayout } from './layout';

/**
 * 随机布局
 */
export default class DagreLayout extends BaseLayout {
  /** layout 方向, 可选 TB, BT, LR, RL */
  public rankdir: 'TB' | 'BT' | 'LR' | 'RL';
  /** 节点对齐方式，可选 UL, UR, DL, DR */
  public align: undefined | 'UL' | 'UR' | 'DL' | 'DR';
  /** 节点大小 */
  public nodeSize: number;
  /** 节点水平间距(px) */
  public nodesepFunc: () => number;
  /** 每一层节点之间间距 */
  public ranksepFunc: () => number;
  /** 节点水平间距(px) */
  public nodesep: number;
  /** 每一层节点之间间距 */
  public ranksep: number;
  /** 是否保留布局连线的控制点 */
  public controlPoints: boolean;

  public getDefaultCfg() {
    return {
      rankdir: 'TB', // layout 方向, 可选 TB, BT, LR, RL
      align: undefined, // 节点对齐方式，可选 UL, UR, DL, DR
      nodeSize: undefined, // 节点大小
      nodesepFunc() {
        return 50;
      }, // 节点水平间距(px)
      ranksepFunc() {
        return 50;
      }, // 每一层节点之间间距
      nodesep: 50, // 节点水平间距(px)
      ranksep: 50, // 每一层节点之间间距
      controlPoints: true, // 是否保留布局连线的控制点
    };
  }

  /**
   * 执行布局
   */
  public execute() {
    const self = this;
    const nodes = self.nodes;
    const edges = self.edges;
    const g = new dagre.graphlib.Graph();
    const nodeSize = self.nodeSize;
    let nodeSizeFunc;
    if (!nodeSize) {
      nodeSizeFunc = (d) => {
        if (d.size) {
          if (isArray(d.size)) {
            return d.size;
          }
          return [d.size, d.size];
        }
        return [40, 40];
      };
    } else if (isArray(nodeSize)) {
      nodeSizeFunc = () => {
        return nodeSize;
      };
    } else {
      nodeSizeFunc = () => {
        return [nodeSize, nodeSize];
      };
    }
    let horisep = self.nodesep;
    if (self.nodesepFunc) {
      horisep = self.nodesepFunc();
    }
    let vertisep = self.ranksep;
    if (self.ranksepFunc) {
      vertisep = self.ranksepFunc();
    }
    const rankdir = self.rankdir;
    if (rankdir === 'LR' || rankdir === 'RL') {
      horisep = self.ranksep;
      if (self.ranksepFunc) {
        horisep = self.ranksepFunc();
      }
      vertisep = self.nodesep;
      if (self.nodesepFunc) {
        vertisep = self.nodesepFunc();
      }
    }
    g.setDefaultEdgeLabel(() => ({}));
    g.setGraph(self);
    nodes.forEach((node) => {
      const size = nodeSizeFunc(node);
      const hori = horisep;
      const verti = vertisep;
      const width = size[0] + 2 * hori;
      const height = size[1] + 2 * verti;
      g.setNode(node.id, { width, height });
    });
    edges.forEach((edge) => {
      g.setEdge(edge.source, edge.target);
    });
    dagre.layout(g);
    let coord;
    g.nodes().forEach((node, i) => {
      coord = g.node(node);
      nodes[i].x = coord.x;
      nodes[i].y = coord.y;
    });
    g.edges().forEach((edge, i) => {
      coord = g.edge(edge);
      edges[i].startPoint = coord.points[0];
      edges[i].endPoint = coord.points[coord.points.length - 1];
      if (self.controlPoints) {
        edges[i].controlPoints = coord.points.slice(1, coord.points.length - 1);
      }
    });
  }
}
