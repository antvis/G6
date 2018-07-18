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
    // const height = graph.getHeight();
    return group.addShape('rect', {
      attrs: {
        x: box.minX - 100,
        y: box.minY - 100,
        width: box.maxX * 1.5,
        height: box.maxY * 1.5,
        fill: 'rgba(255, 255, 255, 0.7)'
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
            i.getModel().shape = 'quadraticCurve';
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

    // show the hided edge, which is not tree edge and it is in the es
    // and the source and targert of the edge are both visible
    const edges = this.getEdges();
    Util.each(edges, edge => {
      if (!edge.isVisible() && !edge.getModel().isTreeEdge
        && edge.getSource().isVisible() && edge.getTarget().isVisible()) {
        Util.each(es, e => {
          if (edge.id === e.id) {
            edge.show();
            edge.getModel().shape = 'quadraticCurve';
          }
        });
      }
    });
    this.changeLayout();
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
    // hide the edges, which are not tree edges
    const edges = this.getEdges();
    Util.each(edges, edge => {
      edge.getModel().shape = 'edge';
      if (edge.isVisible() && !edge.getModel().isTreeEdge) {
        edge.hide();
      }
    });
    this.changeLayout();
  }
}

G6.Plugins['tool.highlightSubgraph'] = Plugin;
module.exports = Plugin;
