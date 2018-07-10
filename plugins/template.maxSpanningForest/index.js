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
const forceAtlas2 = require('./ForceAtlas2');
// const d3 = require('d3');
// const {
//   forceSimulation,
//   forceLink,
//   forceManyBody,
//   forceCenter,
//   forceCollide
// } = d3;
const Util = G6.Util;

class Plugin {
  constructor(options) {
    Util.mix(this, {
      layout(nodes, edges, graph) {

        // force atlas 2
        const params = {
          kr: 50,
          kg: 1.0,
          mode: 'common',
          prev_overlapping: true,
          dissuade_hubs: false,
          max_iteration: 500,
          barnes_hut: false,
          ks: 0.1,
          ksmax: 10,
          tao: 0.1
        };
        forceAtlas2(graph, nodes, edges, params);

        // d3 force directed
        // const width = graph.getWidth();
        // const height = graph.getHeight();
        // const simulation = forceSimulation(nodes)
        //   .force('charge', forceManyBody().distanceMax(width * 3))
        //   .force('link', forceLink(Util.cloneDeep(edges))
        //     .id(model => {
        //       return model.id;
        //     })
        //     .strength(1)
        //   )
        //   .force('center', forceCenter(width / 2, height / 2))
        //   .force('collision', forceCollide().radius(model => {
        //     return model.width / 2 * 1.2;
        //   }));
        // simulation.stop();
        // for (let i = 0, n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())); i < n; ++i) {
        //   simulation.tick();
        // }
        // nodes.forEach(node => {
        //   delete node.vx;
        //   delete node.vy;
        // });
      },
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
      // const params = { kr: 0.1, kg: 0.1, cons_step: 0.1, mode: 'common', prev_overlapping: 'false', dissuade_hubs: 'false' };
      // const forest = forceAtlas2(graph, nodes, edges, params);
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
// G6.Plugins['template.forceAtlas2'] = Plugin;

module.exports = Plugin;
