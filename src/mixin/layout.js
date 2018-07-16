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
        processer: layout
      };
    }
    return null;
  },
  layout() {
    this._getController('layout').layout();
    return this;
  },
  /**
   * @return {Graph} this
   */
  updateNodePosition() {
    const nodes = this.getNodes();
    const groups = this.getGroups();
    const edges = this.getEdges();
    const guides = this.getGuides();

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
    this.draw();
    return this;
  },
  changeLayout(processer) {
    this._getController('layout').changeLayout(processer);
    return this;
  },
  getLayout() {
    return this._getController('layout').getLayoutProcesser();
  }
};

module.exports = Mixin;
