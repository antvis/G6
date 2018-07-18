/**
 * @fileOverview 图分析模版
 * @author huangtonger@aliyun.com
 * 保留字段:
 * node.vx, node.vy, node.x, node.y
 * node.to, node.from
 * node.visited, node.edges, node.links
 * edge.isTreeEdge、edge.lineWidth
 * 可配置字段:
 * node.rank  分层权重
 * node.label 节点标签
 */
const G6 = require('@antv/g6');
const maxSpanningForest = require('./maxSpanningForest');
const Layout = require('../layout.forceAtlas2/layout');
const Util = G6.Util;

class Plugin {
  constructor(options) {
    Util.mix(this, {
      layout: new Layout({
        kr: 50,
        kg: 8.0,
        mode: 'common',
        prev_overlapping: true,
        dissuade_hubs: false,
        max_iteration: 1000,
        barnes_hut: true,
        ks: 0.1,
        ksmax: 10,
        tao: 0.1
      }, options),
      ...options
    });
  }
  init() {
    const graph = this.graph;
    graph.on('beforeinit', () => {
      const layout = graph.get('layout');
      if (!layout) {
        graph.set('layout', this.layout);
      }
    });
    graph.on('beforerender', () => {
      const data = graph.getSource();
      const {
        nodes,
        edges
      } = data;
      const forest = maxSpanningForest(nodes, edges);
      forest.edges.forEach(edge => {
        edge.isTreeEdge = true;
      });
      graph.addFilter(item => {
        return !item.isEdge || item.getModel().isTreeEdge;
      });
    });
  }
}

G6.Plugins['template.maxSpanningForest'] = Plugin;

module.exports = Plugin;
