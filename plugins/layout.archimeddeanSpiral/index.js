/**
 * @fileOverview 阿基米德螺线布局
 * @author huangtonger@aliyun.com
 */

const G6 = require('@antv/g6');
const Layout = require('./layout');

G6.Layouts.ArchimeddeanSpiral = Layout;

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

G6.Plugins['layout.archimeddeanSpiral'] = Plugin;

module.exports = Plugin;
