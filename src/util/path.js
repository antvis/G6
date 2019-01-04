/**
 * @fileOverview path util
 * @author huangtonger@aliyun.com
 */
const G = require('@antv/g/lib');

module.exports = {
  getSpline(points) {
    const data = [];
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      data.push(point.x);
      data.push(point.y);
    }
    const splinePath = G.PathUtil.catmullRomToBezier(data);
    splinePath.unshift([ 'M', points[0].x, points[0].y ]);
    return splinePath;
  }
};
