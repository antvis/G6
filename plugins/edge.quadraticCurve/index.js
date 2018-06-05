/**
 * @fileOverview 拓展二阶贝塞尔曲线
 * @author huangtonger@aliyun.com
 */
const G6 = require('@antv/g6');

G6.registerEdge('quadraticCurve', {
  getPath(item) {
    const points = item.getPoints();
    const start = points[0];
    const source = item.getSource();
    const target = item.getTarget();
    const end = points[points.length - 1];
    const q = 0.5; // 向量方向长度系数
    const v1 = [ start.x + (end.x - start.x) * q, start.y + (end.y - start.y) * q ];
    const v2 = [ v1[0] - start.x, v1[1] - start.y ];
    const v3 = [ -v2[1], v2[0] ];
    // 控制点
    const cp = {
      x: v3[0] + v2[0] + start.x,
      y: v3[1] + v2[1] + start.y
    };
    const sp = source.getLinkPoints(cp)[0];
    const tp = target.getLinkPoints(cp)[0];
    return [
      [ 'M', sp.x, sp.y ],
      [ 'Q', cp.x, cp.y, tp.x, tp.y ]
    ];
  }
});

