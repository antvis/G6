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
const d3 = require('d3');
const { forceSimulation, forceLink, forceManyBody, forceCenter, forceCollide } = d3;
const Util = G6.Util;

class Plugin {
  constructor(options) {
    Util.mix(this, {
      layout(nodes, edges, graph) {
        const width = graph.getWidth();
        const height = graph.getHeight();
        const simulation = forceSimulation(nodes)
          .force('charge', forceManyBody().distanceMax(width * 3))
          .force('link', forceLink(Util.cloneDeep(edges))
            .id(model => {
              return model.id;
            })
            .strength(1)
          )
          .force('center', forceCenter(width / 2, height / 2))
          .force('collision', forceCollide().radius(model => {
            return model.width / 2 * 1.2;
          }));
        simulation.stop();
        for (let i = 0, n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())); i < n; ++i) {
          simulation.tick();
        }
        nodes.forEach(node => {
          delete node.vx;
          delete node.vy;
        });
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
      const { nodes, edges } = data;
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
