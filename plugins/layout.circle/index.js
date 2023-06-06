/**
 * @fileOverview 圆图布局
 * @author huangtonger@aliyun.com
 */

const G6 = require('@antv/g6');
const Layout = require('./layout');

G6.Layouts.Circle = Layout;

class Plugin {
  constructor(options) {
    this.options = options;
  }
  init() {
    const graph = this.graph;
    graph.on('beforeinit', () => {
      const layout = new Layout({
        graph,
        ...this.options
      });
      graph.set('layout', layout);
    });
  }
}

G6.Plugins['layout.circle'] = Plugin;

module.exports = Plugin;
