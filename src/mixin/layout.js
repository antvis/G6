/**
 * @fileOverview layout mixin
 * @author huangtonger@aliyun.com
 */

const Util = require('../util/');
const Layout = require('../controller/layout');
const Mixin = {};
Mixin.CFG = {
  /**
   * Layout cfg
   * @type {object|function|undefined}
   */
  layout: undefined
};
Mixin.INIT = '_initLayout';
Mixin.AUGMENT = {
  _initLayout() {
    const controllers = this.get('_controllers');
    const layoutCfg = this._getLayoutCfg();
    if (layoutCfg) {
      controllers.layout = new Layout(Util.mix({
        graph: this
      }, layoutCfg));
    }
  },
  _getLayoutCfg() {
    const layout = this.get('layout');
    if (Util.isPlainObject(layout)) {
      return layout;
    } else if (Util.isFunction(layout) || Util.isObject(layout)) {
      return {
        processor: layout
      };
    }
    return null;
  },
  /**
   * @param  {boolean} animate - use animate or not
   * @return {Graph} this
   */
  layout(animate) {
    this._getController('layout').layout(animate);
    return this;
  },
  /**
   * @param  {array} nodes - nodes need update position
   * @param  {boolean} animate - use animate or not
   * @return {Graph} this
   */
  updateNodePosition(nodes, animate) {
    const guides = this.getGuides();
    const ev = {
      animate
    };
    let groups = [];
    let edges = [];
    this.emit('beforeupdatenodeposition', ev);
    if (nodes) {
      nodes.forEach(node => {
        node.getEdges().forEach(edge => {
          edges.push(edge);
        });
        const parent = node.getParent();
        parent && groups.push(parent);
      });
      edges = Util.uniq(edges);
      groups = Util.uniq(groups);
    } else {
      nodes = this.getNodes();
      groups = this.getGroups();
      edges = this.getEdges();
    }
    nodes.forEach(node => {
      node.layoutUpdate();
    });
    groups.forEach(group => {
      group.layoutUpdate();
    });
    edges.forEach(edge => {
      edge.layoutUpdate();
    });
    guides.forEach(guide => {
      guide.layoutUpdate();
    });
    this.emit('afterupdatenodeposition', ev);
    return this;
  },
  /**
   * @param  {object} processor - layout processer
   * @param  {boolean} animate - use animate or not
   * @return {Graph} this
   */
  changeLayout(processor, animate) {
    this._getController('layout').changeLayout(processor, animate);
    return this;
  },
  getLayout() {
    return this._getController('layout').getLayoutProcessor();
  }
};

module.exports = Mixin;
