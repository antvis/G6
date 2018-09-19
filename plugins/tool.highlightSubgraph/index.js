/**
 * @fileOverview fisheye zoom
 * @author shiwu.wyy@antfin.com
 */

const G6 = require('@antv/g6');
const Util = G6.Util;

function getMaskRect(graph) {
  const width = graph.getWidth();
  const height = graph.getHeight();
  const tl = graph.getPointByDom({
    x: 0,
    y: 0
  });
  const br = graph.getPointByDom({
    x: width,
    y: height
  });
  return {
    x: tl.x,
    y: tl.y,
    width: br.x - tl.x,
    height: br.y - tl.y
  };
}

G6.registerGuide('mask', {
  draw(item) {
    const group = item.getGraphicGroup();
    const graph = item.getGraph();
    const maskRect = getMaskRect(graph);
    const model = item.getModel();
    const { style } = model;
    return group.addShape('rect', {
      attrs: {
        ...maskRect,
        ...style
      },
      capture: false
    });
  },
  bboxCalculation: false
});

class Plugin {
  constructor(options) {
    Util.mix(this, {
      maskStyle: {
        fill: 'rgb(255, 255, 255)',
        fillOpacity: 0.8
      }
    }, options);
  }
  init() {
    const graph = this.graph;
    graph.highlightSubgraph = this.highlightSubgraph;
    graph.unhighlightGraph = this.unhighlightGraph;
    graph.on('afterchange', () => {
      let mask = graph.find('mask');
      if (!mask) {
        mask = graph.add('guide', {
          shape: 'mask',
          id: 'mask',
          style: this.maskStyle
        });
        mask.hide();
      }
    });
    graph.on('afterviewportchange', () => {
      const mask = graph.find('mask');
      if (mask) {
        mask.forceUpdate();
      }
    });
  }
  highlightSubgraph(items) {
    this.unhighlightGraph();
    const mask = this.find('mask');
    mask.toFront();
    mask.show();
    items.forEach(item => {
      const group = item.getGraphicGroup();
      group.toFront();
    });
    this.draw();
  }
  unhighlightGraph() {
    // hide the mask
    this.find('mask').hide();
    this.draw();
  }
}

G6.Plugins['tool.highlightSubgraph'] = Plugin;
module.exports = Plugin;
