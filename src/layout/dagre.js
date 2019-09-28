/**
 * @fileOverview random layout
 * @author shiwu.wyy@antfin.com
 */

const dagre = require('dagre');
const Layout = require('./layout');

/**
 * 随机布局
 */
Layout.registerLayout('dagre', {
  getDefaultCfg() {
    return {
      rankdir: 'TB',             // layout 方向, 可选 TB, BT, LR, RL
      align: undefined,          // 节点对齐方式，可选 UL, UR, DL, DR
      nodeSize: [ 40, 40 ],      // 节点大小
      nodesep: 50,               // 节点水平间距(px)
      ranksep: 50,               // 每一层节点之间间距
      controlPoints: true        // 是否保留布局连线的控制点
    };
  },
  /**
   * 执行布局
   */
  execute() {
    const self = this;
    const nodes = self.nodes;
    const edges = self.edges;
    const g = new dagre.graphlib.Graph();
    const nodeSize = self.nodeSize;
    let width;
    let height;
    if (Array.isArray(nodeSize)) {
      width = nodeSize[0];
      height = nodeSize[1];
    } else {
      width = nodeSize;
      height = nodeSize;
    }
    let horisep = self.nodesep;
    let vertisep = self.ranksep;
    const rankdir = self.rankdir;
    if (rankdir === 'LR' || rankdir === 'RL') {
      horisep = self.ranksep;
      vertisep = self.nodesep;
    }
    width += 2 * horisep;
    height += 2 * vertisep;
    g.setDefaultEdgeLabel(function() { return {}; });
    g.setGraph(self);
    nodes.forEach(node => {
      g.setNode(node.id, { width, height });
    });
    edges.forEach(edge => {
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
});
