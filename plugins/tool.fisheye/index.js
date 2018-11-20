/**
 * @fileOverview fisheye zoom
 * @author shiwu.wyy@antfin.com
 */

const G6 = require('@antv/g6');
const Util = G6.Util;
const Fisheye = require('./tool');

class Plugin {
  constructor(options) {
    Util.mix(this, options);
    this.options = options;
  }
  init() {
    const graph = this.graph;
    this.oriPos = new Map();
    this.preMoveNodes = [];
    graph.on('beforeinit', () => {
      const fisheye = new Fisheye({
        graph,
        ...this.options
      });
      graph.on('mousemove', Util.throttle(ev => {
        if (graph.destroyed) return;
        const nodes = graph.getNodes();
        const size = nodes.length;
        if (this.oriPos.size !== size) return;
        for (let i = 0; i < this.preMoveNodes.length; i += 1) {
          const preModel = this.preMoveNodes[i].getModel();
          preModel.x = this.oriPos.get(this.preMoveNodes[i].id).x;
          preModel.y = this.oriPos.get(this.preMoveNodes[i].id).y;
        }
        graph.preventAnimate(() => {
          graph.updateNodePosition(this.preMoveNodes);
        });
        this.preMoveNodes = fisheye.zoom(ev.x, ev.y);
      }, 30)
    );
    });
    const cacheLocation = Util.debounce(ev => {
      if (graph.destroyed) return;
      const nodes = graph.getNodes();
      const size = nodes.length;
      this.preMoveNodes = [];

      if (ev === undefined || ev.item === undefined) {
        for (let i = 0; i < size; i++) {
          if (nodes[i].getModel().x === undefined) return;
          this.oriPos.set(nodes[i].id, { x: nodes[i].getModel().x, y: nodes[i].getModel().y });
        }
      } else if (ev.item.type !== 'node' || (ev.updateModel.x === undefined && ev.updateModel.y === undefined)) {
        return;
      } else {
        this.oriPos.set(ev.originModel.id, { x: ev.updateModel.x, y: ev.updateModel.y });
      }
    }, 30);
    // record the layout positions, in order to restore the positions after fisheye zooming
    graph.on('afterchange', cacheLocation);
    graph.on('afterlayout', cacheLocation);
  }
}

G6.Plugins['tool.fisheye'] = Plugin;

module.exports = Plugin;
