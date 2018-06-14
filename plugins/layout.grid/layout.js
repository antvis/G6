/**
 * @fileOverview 栅格布局
 * @author huangtonger@aliyun.com
 */
const G6 = require('@antv/g6');
const Util = G6.Util;

class Layout {
  constructor(options) {
    Util.mix(this, {
      row: 10,
      col: 10,
      marginx: 20,
      marginy: 20,
      width: null,
      height: null
    }, options);
  }
  // 执行布局
  execute() {
    const graph = this.graph;
    const nodes = this.nodes;
    const width = this.width ? this.width : graph.getWidth();
    const height = this.height ? this.height : graph.getHeight();
    const center = this.center ? this.center : {
      x: width / 2,
      y: height / 2
    };
    const row = this.row;
    const col = this.col;
    this.sort && nodes.sort(this.sort);
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      node.x = (center.x - width / 2) + i % row / row * width + this.marginx;
      node.y = (center.y - height / 2) + parseInt(i / col) / col * height + this.marginy;
    }
  }
}

module.exports = Layout;
