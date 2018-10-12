/**
 * @fileOverview extractSubgraph
 * @author shiwu.wyy@antfin.com
 */

const G6 = require('@antv/g6');
const Util = G6.Util;

const extractSubgraph = {
  /**
   * extract sub graph by focus node
   * @param  {string} type - could be in, out, all
   * @param  {array} focusNodes - input item
   * @return {object} sub graph
   */
  extract(type, focusNodes) {
    let reEdges = [];
    Util.each(focusNodes, focusNode => {
      if (type === 'in') {
        reEdges = focusNode.getInEdges();
      } else if (type === 'out') {
        reEdges = focusNode.getOutEdges();
      } else {
        reEdges = focusNode.getEdges();
      }
    });

    const reNodes = [];
    Util.each(focusNodes, fn => {
      reNodes.push(fn);
      Util.each(reEdges, e => {
        const source = e.getSource();
        const target = e.getTarget();
        if (source.id !== fn.id) reNodes.push(source);
        if (target.id !== fn.id) reNodes.push(target);
      });
    });

    return {
      reNodes,
      reEdges
    };
  }
};
Util.mix(Util, extractSubgraph);
