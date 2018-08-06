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
        width: (box.maxX - box.minX) * 1.2,
        height: (box.maxY - box.minY) * 1.2,
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
    this.graph.on('afterinit', () => {
      this.graph.highlightSubgraph = this.highlightSubgraph;
      this.graph.restoreGraph = this.restoreGraph;
    });
  }
  highlightSubgraph(hl_items) {
    this.restoreGraph();
    // sort the group items
    const ns = hl_items.re_nodes;
    const es = hl_items.re_edges;
    const group = this.getItemGroup();
    const items = this.getItems();
    Util.each(items, i => {
      if (i.type === 'edge') {
        Util.each(es, e => {
          if (i.id !== e.id) {
            this.toFront(i, group);
          }
        });
      }
    });
    Util.each(items, i => {
      if (i.type === 'node') {
        Util.each(ns, n => {
          if (i.id !== n.id) {
            this.toFront(i, group);
          }
        });
      }
    });
    let mask;
    Util.each(items, i => {
      if (i.type === 'guide') {
        mask = i;
        this.toFront(i, group);
        return;
      }
    });
    if (mask === undefined) {
      mask = this.add('guide', {
        shape: 'mask'
      });
      this.toFront(mask, group);
    }
    mask.show();
    Util.each(items, i => {
      if (i.type === 'edge') {
        Util.each(es, e => {
          if (i.id === e.id) {
            this.toFront(i, group);
          }
        });
      }
    });
    Util.each(items, i => {
      if (i.type === 'node') {
        Util.each(ns, n => {
          if (i.id === n.id) {
            this.toFront(i, group);
          }
        });
      }
    });
    this.draw();
  }
  restoreGraph() {
    // hide the mask
    const items = this.getItems();
    let mask;
    Util.each(items, i => {
      if (i.type === 'guide') {
        mask = i;
        return;
      }
    });
    if (mask !== undefined) {
      mask.hide();
    }
    this.draw();
  }
}

G6.Plugins['tool.highlightSubgraph'] = Plugin;
module.exports = Plugin;
