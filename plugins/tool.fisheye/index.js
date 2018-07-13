/**
 * @fileOverview fisheye zoom
 * @author shiwu.wyy@antfin.com
 */

const G6 = require('@antv/g6');
const Util = G6.Util;
const Fisheye = require('./tool');
class Plugin {
  constructor(options) {
    this.options = options;
  }
  init() {
    const graph = this.graph;
    graph.on('beforeinit', () => {
      const fisheye = new Fisheye({
        graph,
        ...this.options
      });
      graph.on('mousemove', Util.throttle(ev => {
      // graph.on('mousemove', ev => {
        const nodes = graph.getNodes();
        const size = nodes.length;
        for (let i = 0; i < size; i += 1) {
          nodes[i].getModel().x = nodes[i].getModel().ori_x;
          nodes[i].getModel().y = nodes[i].getModel().ori_y;
        }
        fisheye.zoom(ev.x, ev.y);
        graph.changeLayout();
      }, 10)
    );
    });
  }
}

G6.Plugins['tool.fisheye'] = Plugin;

module.exports = Plugin;
