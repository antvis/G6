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
const maxSpanningForest = require('../util.backbone/maxSpanningForest');
const Layout = require('../layout.forceAtlas2/layout');
const Util = G6.Util;
const Menu = require('./menu');
require('../tool.textDisplay/');
require('../tool.highlightSubgraph/');
require('../tool.fisheye/');
require('../util.extractSubgraph/');
require('../edge.quadraticCurve/');
require('../behaviour.analysis/');
require('../tool.freezeSize/');

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
      layoutCfg: {
        kr: 0,
        kg: 0,
        prevOverlapping: true,
        maxIteration: 0,
        barnesHut: false,
        useWorker: true
      },
      fisheye: true,
      menu: null,
      edgeStyle: {
        stroke: '#4F7DAB',
        strokeOpacity: 0.65,
        endArrow: true
      },
      activedEdgeStyle: {
        stroke: '#4C7295',
        strokeOpacity: 1
      },
      nodeStyle: {
        stroke: '#696969',
        strokeOpacity: 0.4,
        shadowColor: null
      },
      activedNodeStyle: {
        stroke: '#fff',
        shadowColor: '#6a80aa',
        shadowBlur: 20
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
      textDisplay: true
    }, options);
  }
  init() {
    const graph = this.graph;
    if (this.fisheye) {
      const fisheye = new G6.Plugins['tool.fisheye']({
        radius: 100
      });
      graph.addPlugin(fisheye);
    }
    if (this.textDisplay) {
      const textDisplay = new G6.Plugins['tool.textDisplay']();
      this.interactive && graph.addPlugin(textDisplay);
    }
    const freezeSize = new G6.Plugins['tool.freezeSize']();
    graph.addPlugin(freezeSize);
    graph.on('afteritemdraw', ({ item }) => {
      const label = item.getLabel();
      if (label) {
        label.set('freezePoint', {
          x: 0,
          y: 0
        });
      }
    });
    graph.on('afterinit', () => {
      const highlighter = new G6.Plugins['tool.highlightSubgraph']();
      this.interactive && graph.addPlugin(highlighter);
    });
    graph.on('beforeinit', () => {
      let layout = graph.get('layout');
      if (!layout) {
        const { kr, kg, prevOverlapping, maxIteration, barnesHut, useWorker } = this.layoutCfg;
        layout = {
          auto: 'once', // true false once
          processer: new Layout({
            kr, kg, prevOverlapping,
            maxIteration, barnesHut, useWorker
          })
        };
        graph.set('layout', layout);
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
      const forest = maxSpanningForest({ nodes, edges });
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
      if (menuCfg !== null) {
        this.menu = new Menu({ menuCfg, graph });
      }
    });
    graph.on('afterdestroy', () => {
      this.menu.destroy();
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
      style: model => {
        if (model.actived) {
          return this.activedEdgeStyle;
        }
        return Util.isFunction(this.edgeStyle) ? this.edgeStyle(model) : this.edgeStyle;
      }
    });
    graph.node({
      label: this.node_label,
      style: this.nodeStyle
    });
  }
  activeItem(item) {
    const graph = this.graph;
    item = graph.getItem(item);
    if (item.isNode) {
      item.getKeyShape().attr(this.activedNodeStyle);
      graph.draw();
    } else if (item.isEdge) {
      graph.simpleUpdate(item, {
        actived: true
      });
    }
  }
  unActiveItem(item) {
    const graph = this.graph;
    item = graph.getItem(item);
    if (item.isNode) {
      item.getKeyShape().attr(this.nodeStyle);
      graph.draw();
    } else if (item.isEdge) {
      graph.simpleUpdate(item, {
        actived: false
      });
    }
  }
  setListener() {
    const graph = this.graph;
    graph.on('node:mouseenter', ev => {
      this.activeItem(ev.item);
      ev.item.isNode && graph.css({
        cursor: 'pointer'
      });
    });
    graph.on('edge:mouseenter', ev => {
      this.activeItem(ev.item);
    });
    graph.on('node:mouseleave', ev => {
      this.unActiveItem(ev.item);
      !ev.toShape && graph.css({
        cursor: '-webkit-grab'
      });
    });
    graph.on('edge:mouseleave', ev => {
      this.unActiveItem(ev.item);
      !ev.toShape && graph.css({
        cursor: '-webkit-grab'
      });
    });
    graph.on('click', ({
      shape,
      item
    }) => {
      if (this.menuCfg !== null) {
        if (shape && item.isNode) {
          const menuX = item.getModel().x * graph.getMatrix()[0] + graph.getMatrix()[6];
          const menuY = item.getModel().y * graph.getMatrix()[0] + graph.getMatrix()[7];
          this.menu.show(item, menuX, menuY);
          graph.draw();
        } else {
          this.menu.hide();
          // restore the highlighted graph and hide the edges which are not tree edges.
          graph.unhighlightGraph();
          const edges = graph.getEdges();
          Util.each(edges, edge => {
            if (edge.isVisible() && !edge.getModel().isTreeEdge) {
              edge.hide();
            }
          });
          graph.draw();
        }
      }
    });
  }
}

G6.Plugins['template.maxSpanningForest'] = Plugin;

module.exports = Plugin;
