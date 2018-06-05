/**
 * @fileOverview Compact Box Tree Layout
 * @author huangtonger@aliyun.com
 */

const Hierarchy = require('@antv/hierarchy');
const TreeBase = require('./base');

class CompactBoxTreeLayout extends TreeBase {
  constructor(options) {
    super(options);
    this.layout = Hierarchy.compactBox;
  }
}

module.exports = CompactBoxTreeLayout;
