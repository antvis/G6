/**
 * @fileOverview body
 * @author shiwu.wyy@antfin.com
 */
const G6 = require('@antv/g6');
const Util = G6.Util;

// represents a body(a point mass) and its position
class Menu {
  constructor(options) {
    Util.mix(true, this, {
      clickType: 'in'
    }, options);
    this.createMenu();
  }
  show(node, x, y) {
    this.menu.style.display = 'block';
    this.menu.style.left = x + 'px';
    this.menu.style.top = y + 'px';
    this.node = node;
  }
  hide() {
    this.menu.style.display = 'none';
  }
  createMenu() {
    const graph = this.graph;
    const menuCfg = this.menuCfg;

    const menuHtml = `<ul class="menu" style = "
      position: absolute;
      display: none;"></ul>`;
    const menu = Util.createDOM(menuHtml);
    const parent = graph.getGraphContainer();
    parent.appendChild(menu);
    this.menu = menu;

    const list = menuCfg.lists;
    for (let i = 0; i < list.length; i += 1) {
      const liHtml = '<li class = "menu_li">' + list[i].html + '</li>';
      const li = Util.createDOM(liHtml);
      menu.appendChild(li);
      li.on('click', () => {
        const node = this.getNode();
        if (Util.isString(list[i].callBack)) {
          this[list[i].callBack](node);
        }
        if (Util.isFunction(list[i].callBack)) {
          list[i].callBack(node);
        }
      });
    }
    this.menu = menu;
    this.hide();
  }
  getNode() {
    return this.node;
  }
  showSource(node) {
    const graph = this.graph;
    const {
      reNodes,
      reEdges
    } = Util.extract(graph, 'in', 1, [ node ]);
    graph.highlightSubgraph({
      reNodes,
      reEdges
    });
    // show the hided edge, which is not tree edge and it is in the es
    // and the source and targert of the edge are both visible
    const edges = graph.getEdges();
    Util.each(edges, edge => {
      if (!edge.isVisible() && !edge.getModel().isTreeEdge &&
        edge.getSource().isVisible() && edge.getTarget().isVisible()) {
        Util.each(reEdges, e => {
          if (edge.id === e.id) {
            edge.show();
          }
        });
      }
    });
    this.hide();

  }

  showTargets(node) {
    const graph = this.graph;
    const {
      reNodes,
      reEdges
    } = Util.extract(graph, 'out', 1, [ node ]);
    graph.highlightSubgraph({
      reNodes,
      reEdges
    });
    // show the hided edge, which is not tree edge and it is in the es
    // and the source and targert of the edge are both visible
    const edges = graph.getEdges();
    Util.each(edges, edge => {
      if (!edge.isVisible() && !edge.getModel().isTreeEdge &&
        edge.getSource().isVisible() && edge.getTarget().isVisible()) {
        Util.each(reEdges, e => {
          if (edge.id === e.id) {
            edge.show();
          }
        });
      }
    });
    this.hide();

  }
  showAll(node) {
    const graph = this.graph;
    const {
      reNodes,
      reEdges
    } = Util.extract(graph, 'bi', 1, [ node ]);
    graph.highlightSubgraph({
      reNodes,
      reEdges
    });
    // show the hided edge, which is not tree edge and it is in the es
    // and the source and targert of the edge are both visible
    const edges = graph.getEdges();
    Util.each(edges, edge => {
      if (!edge.isVisible() && !edge.getModel().isTreeEdge &&
        edge.getSource().isVisible() && edge.getTarget().isVisible()) {
        Util.each(reEdges, e => {
          if (edge.id === e.id) {
            edge.show();
          }
        });
      }
    });
    this.hide();
  }
  destroy() {
    this.menu.destroy();
  }
}

module.exports = Menu;
