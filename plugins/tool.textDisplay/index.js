/**
 * @fileOverview text display
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
  _textDisplay(text, nodeBox) {
    if (!text) return;
    const graph = this.graph;
    const textBox = text.getBBox();
    const zoom = graph.getZoom();
    const labelWidth = (textBox.maxX - textBox.minX) * (1 / zoom);
    const nodeWidth = nodeBox.maxX - nodeBox.minX;

    if (labelWidth === 0) return;
    const ratio = labelWidth / nodeWidth;
    if (ratio > this.ratio) {
      text.hide();
    } else {
      text.show();
    }
  }
  textDisplay() {
    const graph = this.graph;
    const nodes = graph.getNodes();
    Util.each(nodes, node => {
      const group = node.getGraphicGroup();
      const nodeBox = node.getBBox();
      group.deepEach(child => {
        child.get('type') === 'text' && this._textDisplay(child, nodeBox);
      });
    });
    graph.draw();
  }
}

G6.Plugins['tool.textDisplay'] = Plugin;
module.exports = Plugin;
