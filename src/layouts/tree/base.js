/**
 * @fileOverview tree layout base
 * @author huangtonger@aliyun.com
 */

const Base = require('../base');

class CompactBoxTreeLayout extends Base {
  constructor(options) {
    super();
    this.options = options;
  }
  execute() {
    const options = this.options;
    const roots = this.roots;
    roots.forEach(root => {
      const layoutedRoot = this.layout(root, options);
      layoutedRoot.eachNode(node => {
        node.data.x = node.x + node.data.width / 2 + node.hgap;
        node.data.y = node.y + node.data.height / 2 + node.vgap;
      });
    });
  }
}

module.exports = CompactBoxTreeLayout;
