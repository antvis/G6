/**
 * @fileOverview quadraticCurve
 * model configurable:
 * cpd - control point distance detail {number} could be 0 ~ 1
 * @author huangtonger@aliyun.com
 */

const G6 = require('@antv/g6');
const Util = G6.Util;

G6.registerEdge('quadraticCurve', {
  getPath(item) {
    const points = item.getPoints();
    const model = item.getModel();
    const start = points[0];
    const source = item.getSource();
    const target = item.getTarget();
    const end = points[points.length - 1];
    const cpd = !Util.isNil(model.cpd) ? model.cpd : 0.5; // 向量方向长度系数
    const v1 = [ (end.x + start.x) * 0.5 - start.x, (end.y + start.y) * 0.5 - start.y ];
    const v2 = [ -v1[1] * cpd, v1[0] * cpd ];

    // 控制点
    const cp = {
      x: v1[0] + v2[0] + start.x,
      y: v1[1] + v2[1] + start.y
    };
    const sp = source.getLinkPoints(cp)[0];
    const tp = target.getLinkPoints(cp)[0];
    return [
      [ 'M', sp.x, sp.y ],
      [ 'Q', cp.x, cp.y, tp.x, tp.y ]
    ];
  }
});

