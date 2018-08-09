/**
 * @fileOverview 图分析模版
 * @author huangtonger@aliyun.com
 * read only:
 * edge.isTreeEdge
 * read && write:
 * node.rank - node rank the max rank would be the root node
 * edge.weight - edge weight
 */
const G6 = require('@antv/g6');
const maxSpanningForest = require('./maxSpanningForest');
const Layout = require('../layout.forceAtlas2/layout');
const Util = G6.Util;
const Menu = require('./menu');
require('../tool.textDisplay/');
require('../tool.highlightSubgraph/');
require('../tool.fisheye/');
require('../util.extractSubgraph/');
require('../edge.quadraticCurve/');
require('../behaviour.analysis/');

class Plugin {
  constructor(options) {
    options = options ? options : {};
    Util.mix(true, this, {
      menuCfg: {
        lists: [{
          html: '来源',
          callBack: 'showSource'
        },
        {
          html: '去向',
          callBack: 'showTargets'
        },
        {
          html: '来源去向',
          callBack: 'showAll'
        }]
      },
      layout: {
        auto: 'once', // true false once
        processer: new Layout({
          kr: 120,
          kg: 8.0,
          mode: 'common',
          prevOverlapping: true,
          dissuadeHubs: false,
          maxIteration: 1000,
          barnesHut: true,
          ks: 0.1,
          ksmax: 10,
          tao: 0.1,
          ...options.layoutCfg
        })
      },
      fisheye: true,
      menu: null,
      preNavi: {},
      edgeStyle: {
        endArrow: true,
        stroke: '#4F7DAB',
        strokeOpacity: 0.65
      },
      nodeStyle: {
        stroke: '#696969',
        strokeOpacity: 0.4,
        lineWidth: 1
      },
      node_label(model) {
        return {
          text: model.id,
          fill: 'black',
          stroke: '#fff',
          lineWidth: 2.5
        };
      },
      interactive: true,
      textDisplay: true,
      ...options
    });
  }
  init() {
    const graph = this.graph;
    const highlighter = new G6.Plugins['tool.highlightSubgraph']();
    if (this.fisheye) {
      const fisheye = new G6.Plugins['tool.fisheye']({
        radius: 200
      });
      graph.addPlugin(fisheye);
    }
    if (this.textDisplay) {
      const textDisplay = new G6.Plugins['tool.textDisplay']();
      graph.addPlugin(textDisplay);
    }
    graph.addPlugin(highlighter);
    graph.on('beforeinit', () => {
      const layout = graph.get('layout');
      if (!layout) {
        graph.set('layout', this.layout);
      }
      this.graph.activeItem = item => {
        this.activeItem(item);
      };
    });
    graph.on('beforerender', () => {
      const data = graph.getSource();
      let {
        nodes,
        edges
      } = data;
      nodes = nodes.map((node, index) => {
        return {
          ...node,
          index
        };
      });
      edges = edges.map((edge, index) => {
        return {
          ...edge,
          index
        };
      });
      const forest = maxSpanningForest(nodes, edges);
      forest.edges.forEach(edge => {
        const {
          index
        } = edge;
        data.edges[index].isTreeEdge = true;
      });
      graph.addFilter(item => {
        return !item.isEdge || item.getModel().isTreeEdge;
      });

      this.setStyle();
      this.interactive && this.setListener();
      const menuCfg = this.menuCfg;
      this.menu = new Menu({ menuCfg, graph });
    });
  }
  setStyle() {
    const graph = this.graph;
    const data = graph.getSource();
    const {
      edges
    } = data;
    for (let i = 0; i < edges.length; i += 1) {
      const model = edges[i];
      if (!model.isTreeEdge || typeof model.isTreeEdge === 'undefined') model.shape = 'quadraticCurve';
    }
    graph.edge({
      style: this.edgeStyle
    });
    graph.node({
      label: this.node_label,
      style: this.nodeStyle
    });
  }
  activeItem(item) {
    const graph = this.graph;
    const preNavi = this.preNavi;
    if (Util.isString(item)) {
      item = graph.find(item);
    }
    let style = {};
    let preStyle = {};
    if (item.type === 'node') {
      style = {
        stroke: '#fff',
        lineWidth: 1,
        shadowColor: '#6a80aa',
        shadowBlur: 20
      };
      preStyle = this.nodeStyle;
    } else if (item.type === 'edge') {
      style = {
        endArrow: true,
        stroke: '#4C7295',
        strokeOpacity: 1
      };
      preStyle = this.edgeStyle;
    } else return;

    // unactive the previous navigate node
    if (preNavi !== {} && preNavi !== null && preNavi !== undefined && preNavi.item !== null) {
      graph.update(preNavi.item, {
        style: preNavi.style
      });
    }

    graph.update(item, {
      style
    });
    this.preNavi = {
      item,
      style: preStyle
    };
  }
  setListener() {
    const graph = this.graph;
    graph.on('node:mouseenter', ev => {
      if (ev.item != null) {
        graph.activeItem(ev.item);
      }
      graph.css({
        cursor: 'pointer'
      });
    });
    graph.on('node:mouseleave', ev => {
      graph.update(ev.item, {
        style: this.nodeStyle
      });
      graph.css({
        cursor: '-webkit-grab'
      });
    });

    graph.on('edge:mouseenter', ev => {
      if (ev.item != null) {
        graph.activeItem(ev.item);
      }
    });
    graph.on('edge:mouseleave', ev => {
      graph.update(ev.item, {
        style: this.edgeStyle
      });
    });

    graph.on('click', ({
      shape,
      item
    }) => {
      if (shape && item.isNode) {
        const menuX = item.getModel().x * graph.getMatrix()[0] + graph.getMatrix()[6];
        const menuY = item.getModel().y * graph.getMatrix()[0] + graph.getMatrix()[7];
        this.menu.show(item, menuX, menuY);
        graph.draw();
      } else {
        this.menu.hide();
        // restore the highlighted graph and hide the edges which are not tree edges.
        graph.restoreGraph();
        const edges = graph.getEdges();
        Util.each(edges, edge => {
          if (edge.isVisible() && !edge.getModel().isTreeEdge) {
            edge.hide();
          }
        });
        graph.draw();
      }
    });
  }
}

G6.Plugins['template.maxSpanningForest'] = Plugin;

module.exports = Plugin;
