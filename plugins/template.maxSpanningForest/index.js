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
require('../tool.textDisplay/');
require('../tool.highlightSubgraph/');
require('../tool.fisheye/');
require('../util.extractSubgraph/');
require('../edge.quadraticCurve/');
require('../behaviour.analysis/');
let pre_navi = {};
const node_style = {
  stroke: '#fff',
  lineWidth: 2
};
const edge_style = {
  endArrow: true,
  stroke: '#4F7DAB',
  strokeOpacity: 0.65
};

class Plugin {
  constructor(options) {
    Util.mix(this, {
      layout: {
        auto: 'once', // true false once
        processer: new Layout({
          kr: 120,
          kg: 8.0,
          mode: 'common',
          prev_overlapping: true,
          dissuade_hubs: false,
          max_iteration: 1000,
          barnes_hut: true,
          ks: 0.1,
          ksmax: 10,
          tao: 0.1,
          ...options.layoutCfg
        })
      },
      ...options
    });
  }
  init() {
    const graph = this.graph;
    const highlighter = new G6.Plugins['tool.highlightSubgraph']();
    const fisheye = new G6.Plugins['tool.fisheye']({
      radius: 200
    });
    const textDisplay = new G6.Plugins['tool.textDisplay']();
    graph.addPlugin(highlighter);
    graph.addPlugin(fisheye);
    graph.addPlugin(textDisplay);
    graph.on('beforeinit', () => {
      const layout = graph.get('layout');
      if (!layout) {
        graph.set('layout', this.layout);
      }
      this.graph.activeItem = this.activeItem;
      this.graph.createMenu = this.createMenu;
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
      this.setListener();
    });
  }
  createMenu(detailListener) {
    const hover_color = '#6af';
    const custom_color = '#777';
    const li_style = 'padding: 5px 10px; cursor: pointer;';
    const menuHtml = `<ul id="menu" style = "
      color: ` + custom_color + `;
      list-style: none;
      width: 150px;
      border: 1px solid #ccc;
      position: absolute;
      display: none;
      background-color: #fff">
    <li id="menu_sources" class = "menu_li" style = "` + li_style + `  color: #777;">来源</li>
    <li id="menu_targets" class = "menu_li" style = "` + li_style + `  color: #777;">去向</li>
    <li id="menu_both" class = "menu_li" style = "` + li_style + `  color: #777;">来源去向</li>
    <li id='menu_detail' class = "menu_li" style = "` + li_style + `
      color: #6af;
      border-top: 1px solid #ccc;">查看单页分析详情</li></ul>`;

    const menu = Util.createDOM(menuHtml);
    const body = document.getElementsByTagName('body')[0];
    body.appendChild(menu);

    const lis = document.getElementsByClassName('menu_li');
    for (let i = 0; i < lis.length - 1; i += 1) {
      lis[i].addEventListener('mouseover', function() {
        this.style.setProperty('color', hover_color);
      });
      lis[i].addEventListener('mouseout', function() {
        this.style.setProperty('color', custom_color);
      });
    }

    if (detailListener !== undefined) {
      const detail_menu = document.getElementById('menu_detail');
      detail_menu.addEventListener('click', detailListener);
    }
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
      style() {
        return edge_style;
      }
    });
    graph.node({
      label(model) {
        return {
          text: model.id,
          fill: 'black',
          stroke: '#fff',
          lineWidth: 4
        };
      },
      style: node_style
    });
  }
  activeItem(item) {
    if (Util.isString(item)) {
      item = this.find(item);
    }
    let style = {};
    let pre_style = {};
    if (item.type === 'node') {
      style = {
        stroke: '#fff',
        lineWidth: 2,
        shadowColor: '#6a80aa',
        shadowBlur: 20
      };
      pre_style = node_style;
    } else if (item.type === 'edge edge') {
      style = {
        endArrow: true,
        stroke: '#000',
        strokeOpacity: 0.65
      };
      pre_style = edge_style;
    } else return;

    // // unactive the previous navigate node
    if (pre_navi !== {} && pre_navi !== null && pre_navi !== undefined) {
      this.update(pre_navi.item, {
        style: pre_navi.style
      });
    }

    this.update(item, {
      style
    });
    pre_navi = { item, style: pre_style };
  }
  setListener() {
    let clickOnNode = null;
    const graph = this.graph;
    graph.on('node:mouseenter', item => {
      if (item.item != null) {
        graph.activeItem(item.item);
      }
    });
    graph.on('node:mouseleave', item => {
      graph.update(item.item, {
        style: node_style
      });
    });

    graph.on('edge:mouseenter', item => {
      if (item.item != null) {
        graph.activeItem(item.item);
      }
    });
    graph.on('edge:mouseleave', item => {
      graph.update(item.item, {
        style: edge_style
      });
    });

    const menu = document.getElementById('menu');
    graph.on('click', ({
      shape,
      item,
      domEvent
    }) => {
      if (shape && item.isNode) {
        menu.style.display = 'block';
        menu.style.left = domEvent.clientX + 'px';
        menu.style.top = domEvent.clientY + 'px';
        clickOnNode = item;
        graph.draw();
      } else {
        menu.style.display = 'none';
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

    menu.addEventListener('click', function(ev) {
      let type = 'in';
      switch (ev.target.id) {
        case 'menu_sources':
          type = 'in';
          break;
        case 'menu_targets':
          type = 'out';
          break;
        case 'menu_both':
          type = 'bi';
          break;
        default:
          return;
      }
      const {
        re_nodes,
        re_edges
      } = Util.extract(graph, type, 1, [ clickOnNode ]);
      graph.highlightSubgraph({
        re_nodes,
        re_edges
      });
      // show the hided edge, which is not tree edge and it is in the es
      // and the source and targert of the edge are both visible
      const edges = graph.getEdges();
      Util.each(edges, edge => {
        if (!edge.isVisible() && !edge.getModel().isTreeEdge &&
          edge.getSource().isVisible() && edge.getTarget().isVisible()) {
          Util.each(re_edges, e => {
            if (edge.id === e.id) {
              edge.show();
            }
          });
        }
      });
      menu.style.display = 'none';
    }, false);
  }
}

G6.Plugins['template.maxSpanningForest'] = Plugin;

module.exports = Plugin;
