/**
 * @fileOverview Mind Map Layout
 * @author huangtonger@aliyun.com
 */

const Hierarchy = require('@antv/hierarchy');
const TreeBase = require('./base');

class MindmapLayout extends TreeBase {
  constructor(options) {
    super(options);
    this.layout = Hierarchy.mindmap;
  }
}

module.exports = MindmapLayout;
