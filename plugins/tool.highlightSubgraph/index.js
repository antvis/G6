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
  showAnimation: 'fadeIn',
  hideAnimation: 'fadeOut',
  bboxCalculation: false,
  filter: false
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
    const mask = this.find('mask');
    // cache origin item children children zindex
    const itemGroup = this.getItemGroup();
    const children = itemGroup.get('children');
    this.originChildren = [];
    children.forEach(child => {
      this.originChildren.push(child);
    });
    mask.toFront();
    items.forEach(item => {
      const group = item.getGraphicGroup();
      group.toFront();
    });
    this.show(mask);
  }
  unhighlightGraph() {
    // hide the mask
    const itemGroup = this.getItemGroup();

    // reset origin item children children zindex
    // TODO: canvas render only. svg renderer will not work
    const originChildren = this.originChildren;
    originChildren && itemGroup.set('children', originChildren);
    this.hide('mask');
  }
}

G6.Plugins['tool.highlightSubgraph'] = Plugin;
module.exports = Plugin;
