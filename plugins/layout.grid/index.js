/**
 * @fileOverview 栅格布局
 * @author huangtonger@aliyun.com
 */
const G6 = require('../../src/index');
const Layout = require('./layout');

G6.Layouts.Grid = Layout;

class Plugin {
  constructor(options) {
    this.options = options;
  }
  init() {
    const graph = this.graph;
    graph.on('beforeinit', () => {
      const layout = new Layout(this.options);
      graph.set('layout', layout);
    });
  }
}

G6.Plugins['layout.grid'] = Plugin;

module.exports = Plugin;
