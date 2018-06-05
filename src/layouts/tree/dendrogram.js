/**
 * @fileOverview Dendrogram Tree Layout
 * @author huangtonger@aliyun.com
 */

const Hierarchy = require('@antv/hierarchy');
const TreeBase = require('./base');

class DendrogramTreeLayout extends TreeBase {
  constructor(options) {
    super(options);
    this.layout = Hierarchy.dendrogram;
  }
}

module.exports = DendrogramTreeLayout;
