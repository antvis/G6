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
    this.graph.on('afterzoom', () => {
      this.textDisplay();
    });
  }
  textDisplay() {
    const graph = this.graph;
    const nodes = graph.getNodes();
    const scale = graph.getMatrix()[0];
    Util.each(nodes, node => {
      const model = node.getModel();
      const label = node.getLabel();
      const labelBox = label.getBBox();
      const labelWidth = labelBox.maxX - labelBox.minX;
      const nodeWidth = model.size * scale;
      if (labelWidth === 0) return;
      const ratio = labelWidth / nodeWidth;
      if (ratio > 2) {
        label.hide();
      } else {
        label.show();
      }
      graph.draw();
    });
  }
}

G6.Plugins['tool.textDisplay'] = Plugin;
module.exports = Plugin;
