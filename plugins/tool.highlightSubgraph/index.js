/**
 * @fileOverview fisheye zoom
 * @author shiwu.wyy@antfin.com
 */

const G6 = require('@antv/g6');
const Util = G6.Util;

G6.registerGuide('mask', {
  draw(item) {
    const group = item.getGraphicGroup();
    const graph = item.getGraph();
    const box = graph.getBBox();

    return group.addShape('rect', {
      attrs: {
        x: box.minX - 100,
        y: box.minY - 100,
        width: (box.maxX - box.minX) * 1.4,
        height: (box.maxY - box.minY) * 1.4,
        fill: 'rgba(255, 255, 255, 0.8)'
      },
      capture: false
    });
  }
});

class Plugin {
  constructor(options) {
    Util.mix(this, options);
  }
  init() {
    const graph = this.graph;
    graph.on('afterinit', () => {
      this.graph.highlightSubgraph = this.highlightSubgraph;
      this.graph.unhighlightGraph = this.unhighlightGraph;
    });
  }
  highlightSubgraph(items) {
    this.unhighlightGraph();
    this.add('guide', {
      shape: 'mask',
      id: 'mask'
    });
    items.forEach(item=>{
      this.toFront(item);
    });
  }
  unhighlightGraph() {
    // hide the mask
    const mask = this.find('mask');
    mask && this.remove(mask);
  }
}

G6.Plugins['tool.highlightSubgraph'] = Plugin;
module.exports = Plugin;
