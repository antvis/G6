/**
 * @fileOverview fisheye zoom
 * @author shiwu.wyy@antfin.com
 */

const G6 = require('@antv/g6');
const Util = G6.Util;

class Plugin {
  constructor(options) {
    Util.mix(this, options);
  }
  init() {
    this.graph.on('afterchange', () => {
      this.textDisplay();
    });
    this.graph.on('afterviewportchange', () => {
      this.textDisplay();
    });
    this.graph.on('afterzoom', () => {
      this.textDisplay();
    });
  }
  textDisplay() {
    const graph = this.graph;
    const nodes = graph.getNodes();
    const scale = graph.getMatrix()[0];
    Util.each(nodes, node => {
      const label = node.getLabel();
      const model = node.getModel();
      const labelBox = label.getBBox();
      const label_width = labelBox.maxX - labelBox.minX;
      const node_width = model.size * scale;
      if (label_width === 0) return;
      const ratio = label_width / node_width;
      if (ratio > 2) {
        label.hide();
      } else {
        label.show();
      }
    });
    graph.draw();
  }
}

G6.Plugins['tool.textDisplay'] = Plugin;
module.exports = Plugin;
