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
    graph.on('beforeinit', () => {
      const layout = graph.get('layout');
      if (!layout) {
        graph.set('layout', this.layout);
      }
      this.graph.activeItem = this.activeItem;
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
        return {
          endArrow: true,
          stroke: '#4F7DAB',
          strokeOpacity: 0.65
        };
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
      style: {
        stroke: '#fff',
        lineWidth: 2
      }
    });
  }
  activeItem(item) {
    if (Util.isString(item)) {
      this.find(item);
    }
    let style = {};
    if (item.type === 'node') {
      style = {
        stroke: '#fff',
        lineWidth: 2,
        shadowColor: '#6a80aa',
        shadowBlur: 20
      };
    } else if (item.type === 'edge') {
      style = {
        endArrow: true,
        stroke: '#000',
        strokeOpacity: 0.65
      };
    } else return;
    this.update(item, {
      style
    });
  }
  setListener() {
    let clickOnNode = null;
    const graph = this.graph;
    graph.on('mouseenter', item => {
      if (item.item != null) {
        graph.activeItem(item.item);
      }

    });
    graph.on('mouseleave', item => {
      let style = {};
      if (item.item != null) {
        switch (item.item.type) {
          case 'node':
            style = {
              stroke: '#fff',
              lineWidth: 2
            };
            break;
          case 'edge':
            style = {
              endArrow: true,
              stroke: '#4F7DAB',
              strokeOpacity: 0.65
            };
            break;
          default: break;
        }
      }
      graph.update(item.item, {
        style
      });
    });

    graph.on('click', ({
      shape,
      item,
      domEvent
    }) => {
      if (shape && item.isNode) {
        const menu = document.getElementById('myMenu');
        menu.style.display = 'block';
        menu.style.left = domEvent.clientX + 'px';
        menu.style.top = domEvent.clientY + 'px';
        clickOnNode = item;
        graph.draw();
      } else {
        const menu = document.getElementById('myMenu');
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

    const menu = document.getElementById('myMenu');
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
          break;
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
