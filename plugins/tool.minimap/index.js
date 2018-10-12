/**
 * @fileOverview 缩略图
 * @author huangtonger@aliyun.com
 */
const G6 = require('@antv/g6');
const Minimap = require('./minimap');

class Plugin {
  constructor(options) {
    this.options = options;
  }
  init() {
    const graph = this.graph;
    const minimap = new Minimap({
      getGraph() {
        return graph;
      },
      ...this.options
    });
    minimap.bindGraph(graph);
    this.minimap = minimap;
  }
  destroy() {
    this.minimap.destroy();
  }
}
G6.Plugins['tool.minimap'] = Plugin;

G6.Components.Minimap = Minimap;

module.exports = Plugin;
