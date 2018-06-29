/**
 * @fileOverview Indented Tree Layout
 * @author huangtonger@aliyun.com
 */

const Hierarchy = require('@antv/hierarchy');
const TreeBase = require('./base');

class IndentedTreeLayout extends TreeBase {
  constructor(options) {
    super(options);
    this.layout = Hierarchy.indented;
  }
}

module.exports = IndentedTreeLayout;
