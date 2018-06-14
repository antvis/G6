/**
 * @fileOverview 圆形布局
 * @author huangtonger@aliyun.com
 */
const G6 = require('@antv/g6');
const Util = G6.Util;


class Layout {
  constructor(options) {
    Util.mix(this, {
      /**
       * 节点集
       * @type  {Array}
       */
      nodes: null,

      /**
       * 圆半径
       * @type  {number}
       */
      radius: null,

      /**
       * 起始点和结束点之间有多少个弧度
       * @type  {number}
       */
      sweep: null,

      /**
       * 是否避免重叠
       * @type  {boolean}
       */
      avoidOverlap: false,

      /**
       * 顺逆时针
       * @type  {boolean}
       */
      clockwise: true,

      /**
       * 起始角度
       * @type  {boolean}
       */
      startAngle: 3 / 2 * Math.PI,

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
      center: null
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
    const avoidOverlap = this.avoidOverlap;
    const clockwise = this.clockwise;
    const sweep = Util.isNil(this.sweep) ? 2 * Math.PI - 2 * Math.PI / nodes.length : this.sweep;
    const dTheta = sweep / (Math.max(1, nodes.length - 1));
    let radius = this.radius;
    let minDistance = 0;
    let i;

    for (i = 0; i < nodes.length; i++) {
      const node = nodes[ i ];
      const width = node.width;
      const height = node.height;
      minDistance = Math.max(minDistance, width, height);
    }
    if (Util.isNumber(this.radius)) {
      radius = this.radius;
    } else if (nodes.length <= 1) {
      radius = 0;
    } else {
      radius = Math.min(height, width) / 2 - minDistance;
    }
    if (nodes.length > 1 && avoidOverlap) {
      minDistance *= 1.75;
      const dcos = Math.cos(dTheta) - Math.cos(0);
      const dsin = Math.sin(dTheta) - Math.sin(0);
      const rMin = Math.sqrt(minDistance * minDistance / (dcos * dcos + dsin * dsin));
      radius = Math.max(rMin, radius);
    }
    this.sort && nodes.sort(this.sort);
    Util.each(nodes, (node, i) => {
      const theta = this.startAngle + i * dTheta * (clockwise ? 1 : -1);
      const rx = radius * Math.cos(theta);
      const ry = radius * Math.sin(theta);
      node.x = center.x + rx;
      node.y = center.y + ry;
    });
  }
}
module.exports = Layout;
