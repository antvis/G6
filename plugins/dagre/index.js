const dagre = require('dagre');
const Base = require('../base');

const DEFAULT_SIZE = 40;

class Dagre extends Base {
  getDefaultCfgs() {
    return {
      rankdir: 'TB',             // layout 方向, 可选 TB, BT, LR, RL
      align: undefined,          // 节点对齐方式，可选 UL, UR, DL, DR
      nodesep: 50,               // 节点水平间距(px)
      edgesep: 50,               // 边水平间距(px)
      ranksep: 50,               // 每一层节点之间间距
      marginx: 0,                // 图的 x 边距
      marginy: 0,                // 图的 y 边距
      controlPoints: true,       // 是否保留布局连线的控制点
      getNodeSize: null          // 节点大小回调函数
    };
  }
  layout(data) {
    const g = new dagre.graphlib.Graph();
    const cfgs = this._cfgs;
    g.setDefaultEdgeLabel(function() { return {}; });
    g.setGraph(cfgs);
    const nodeSize = cfgs.getNodeSize;
    data.nodes.forEach(node => {
      let width = DEFAULT_SIZE;
      let height = DEFAULT_SIZE;
      let size = node.size;
      if (nodeSize) {
        size = nodeSize(node);
      }
      if (size) {
        if (Array.isArray(size)) {
          width = size[0];
          height = size[1];
        } else {
          width = size;
          height = size;
        }
      }
      g.setNode(node.id, { width, height });
    });
    data.edges.forEach(edge => {
      g.setEdge(edge.source, edge.target);
    });
    dagre.layout(g);
    let coord;
    g.nodes().forEach((node, i) => {
      coord = g.node(node);
      data.nodes[i].x = coord.x;
      data.nodes[i].y = coord.y;
    });
    g.edges().forEach((edge, i) => {
      coord = g.edge(edge);
      data.edges[i].startPoint = coord.points[0];
      data.edges[i].endPoint = coord.points[coord.points.length - 1];
      if (cfgs.controlPoints) {
        data.edges[i].controlPoints = coord.points.slice(1, coord.points.length - 1);
      }
    });
  }
  updateLayout(cfgs) {
    const self = this;
    Object.keys(cfgs).forEach(key => {
      self.set(key, cfgs[key]);
    });
  }
}
module.exports = Dagre;
