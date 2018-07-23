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
const Forest = require('./maxSpanningForest');
const Layout = require('../layout.forceAtlas2/layout');
const Util = G6.Util;

const maxSpanningForest = {
  span(graph, layoutCfg) {
    // class Plugin {
    //   constructor(options) {

    const layout = {
      auto: 'once', // true false once
      processer: new Layout({
        kr: 50,
        kg: 8.0,
        mode: 'common',
        prev_overlapping: true,
        dissuade_hubs: false,
        max_iteration: 1000,
        barnes_hut: true,
        ks: 0.1,
        ksmax: 10,
        tao: 0.1,
        ...layoutCfg
      })
    };

    graph.on('beforeinit', () => {
      const graph_layout = graph.get('layout');
      if (!graph_layout) {
        graph.set('layout', layout);
      }
    });
    graph.on('beforerender', () => {
      const data = graph.getSource();
      const {
        nodes,
        edges
      } = data;
      const forest = Forest(nodes, edges);
      forest.edges.forEach(edge => {
        edge.isTreeEdge = true;
      });
      graph.addFilter(item => {
        return !item.isEdge || item.getModel().isTreeEdge;
      });
    });
  }
};

Util.mix(Util, maxSpanningForest);
