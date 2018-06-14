/**
 * @fileOverview DAG 分层布局
 * dagre layout wiki: https://github.com/cpettitt/dagre/wiki
 * @author huangtonger@aliyun.com
 */
const G6 = require('@antv/g6');
const dagre = require('dagre');
const { Util } = G6;

class Layout {
  constructor(options) {
    Util.mix(this, {
      rankdir: 'TB',
      align: undefined,
      nodesep: 50,
      edgesep: 10,
      ranksep: 50,
      marginx: 0,
      marginy: 0,
      acyclicer: undefined,
      useEdgeControlPoint: true,
      ranker: 'network-simplex',
      callback: null
    }, options);
  }
  getValue(name) {
    const value = this[name];
    if (Util.isFunction(value)) {
      return value();
    }
    return value;
  }
  // 执行布局
  execute() {
    const nodes = this.nodes;
    const edges = this.edges;
    const nodeMap = {};
    const g = new dagre.graphlib.Graph();
    const useEdgeControlPoint = this.useEdgeControlPoint;
    g.setGraph({
      rankdir: this.getValue('rankdir'),
      align: this.getValue('align'),
      nodesep: this.getValue('nodesep'),
      edgesep: this.getValue('edgesep'),
      ranksep: this.getValue('ranksep'),
      marginx: this.getValue('marginx'),
      marginy: this.getValue('marginy'),
      acyclicer: this.getValue('acyclicer'),
      ranker: this.getValue('ranker')
    });
    g.setDefaultEdgeLabel(function() { return {}; });
    nodes.forEach(node => {
      g.setNode(node.id, { width: node.width, height: node.height });
      nodeMap[node.id] = node;
    });
    edges.forEach(edge => {
      g.setEdge(edge.source, edge.target);
    });
    dagre.layout(g);
    g.nodes().forEach(v => {
      const node = g.node(v);
      nodeMap[v].x = node.x;
      nodeMap[v].y = node.y;
    });
    g.edges().forEach((e, i) => {
      const edge = g.edge(e);
      if (useEdgeControlPoint) {
        edges[i].controlPoints = edge.points.slice(1, edge.points.length - 1);
      }
    });
  }
}

module.exports = Layout;
