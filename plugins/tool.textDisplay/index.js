/**
 * @fileOverview fisheye zoom
 * @author shiwu.wyy@antfin.com
 */

const G6 = require('@antv/g6');
const Util = G6.Util;

class Plugin {
  constructor(options) {
    Util.mix(this, {
      ratio: 2
    }, options);
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
    this.graph.textDisplay = () => {
      this.textDisplay();
    };
  }
  textDisplay() {
    const graph = this.graph;
    const nodes = graph.getNodes();
    Util.each(nodes, node => {
      const label = node.getLabel();
      const labelBox = label.getBBox();
      const zoom = graph.getZoom();
      const labelWidth = (labelBox.maxX - labelBox.minX) * (1 / zoom);
      const nodeBox = node.getBBox();
      const nodeWidth = nodeBox.maxX - nodeBox.minX;

      if (labelWidth === 0) return;
      const ratio = labelWidth / nodeWidth;
      if (ratio > this.ratio) {
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
