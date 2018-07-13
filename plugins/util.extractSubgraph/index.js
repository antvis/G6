/**
 * @fileOverview G6 Mapper Plugin base on d3 tech stack
 * d3-scale  https://github.com/d3/d3-scale
 * d3-legend https://github.com/susielu/d3-legend
 * @author shiwu.wyy@antfin.com
 */

const G6 = require('@antv/g6');
const Util = G6.Util;

const extractSubgraph = {
  extract(graph, type, step, focusNodes) {
    const re_edges = [];
    Util.each(focusNodes, fn => {
      if (type === 'in') {
        const in_edges = fn.getInEdges();
        Util.each(in_edges, ie => {
          re_edges.push(ie);
        });
      } else if (type === 'out') {
        const out_edges = fn.getOutEdges();
        Util.each(out_edges, oe => {
          re_edges.push(oe);
        });
      } else {
        const in_edges = fn.getInEdges();
        Util.each(in_edges, ie => {
          re_edges.push(ie);
        });
        const out_edges = fn.getOutEdges();
        Util.each(out_edges, oe => {
          re_edges.push(oe);
        });
      }
    });

    const re_nodes = [];
    Util.each(focusNodes, fn => {
      re_nodes.push(fn);
      Util.each(re_edges, e => {
        const source = e.getSource();
        const target = e.getTarget();
        if (source.id !== fn.id) re_nodes.push(source);
        if (target.id !== fn.id) re_nodes.push(target);
      });
    });

    return {
      re_nodes,
      re_edges
    };
  },
  setZIndex(ns, es, min_z) {
    const graph = this.graph;
    const nodes = graph.getNodes();
    const edges = graph.getEdges();
    Util.each(nodes, node => {
      Util.each(ns, n => {
        if (node.id === n.id) node.getGraphicGroup().setSilent('zIndex', min_z + 2);
      });
    });
    Util.each(edges, edge => {
      Util.each(es, e => {
        if (edge.id === e.id) edge.getGraphicGroup().setSilent('zIndex', min_z + 1);
      });
    });
    graph.getItemGroup().sort();
  }
};
Util.mix(Util, extractSubgraph);
