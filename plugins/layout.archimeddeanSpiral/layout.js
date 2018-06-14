/**
 * @fileOverview 阿基米德螺线布局
 * https://zh.wikipedia.org/wiki/%E9%98%BF%E5%9F%BA%E7%B1%B3%E5%BE%B7%E8%9E%BA%E7%BA%BF
 * @author huangtonger@aliyun.com
 */
const G6 = require('@antv/g6');
const Util = G6.Util;

class Layout {
  constructor(options) {
    Util.mix(this, {
      /**
       * 宽
       * @type  {number}
       */
      width: null,

      /**
       * 高
       * @type  {number}
       */
      height: null,

      /**
       * 图中心
       * @type  {object}
       */
      center: null,

      /**
       * 参数 a
       * @type  {number}
       */
      a: 16,

      /**
       * 参数 b
       * @type  {number}
       */
      b: 5,

      /**
       * 最大角度
       * @type  {number}
       */
      maxAngle: 12 * Math.PI
    }, options);
  }
  // 执行布局
  execute() {
    const { graph, nodes, a, b, maxAngle } = this;
    const width = this.width ? this.width : graph.getWidth();
    const height = this.height ? this.height : graph.getHeight();
    const center = this.center ? this.center : {
      x: width / 2,
      y: height / 2
    };
    const l = nodes.length;
    const angleStep = maxAngle / l;
    const getAngle = i => {
      return i * angleStep;
    };
    const getRadius = angle => {
      return a + b * angle;
    };
    this.sort && nodes.sort(this.sort);
    nodes.forEach((node, i) => {
      const angle = getAngle(i);
      const radius = getRadius(angle);
      node.x = center.x + radius * Math.cos(angle);
      node.y = center.y + radius * Math.sin(angle);
    });
  }
}
module.exports = Layout;
