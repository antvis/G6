/**
 * @fileOverview path util
 * @author huangtonger@aliyun.com
 */
const G = require('@antv/g/lib');
const BaseUtil = require('./base');
const vec2 = BaseUtil.vec2;

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
  },
  /**
   * 根据起始点、相对位置、偏移量计算控制点
   * @param  {Object} startPoint 起始点，包含 x,y
   * @param  {Object} endPoint  结束点, 包含 x,y
   * @param  {Number} percent   相对位置,范围 0-1
   * @param  {Number} offset    偏移量
   * @return {Object} 控制点，包含 x,y
   */
  getControlPoint(startPoint, endPoint, percent, offset) {
    const point = {
      x: (1 - percent) * startPoint.x + percent * endPoint.x,
      y: (1 - percent) * startPoint.y + percent * endPoint.y
    };
    const tangent = []; // 类似于 C 语言的写法，真难用
    vec2.normalize(tangent, [ endPoint.x - startPoint.x, endPoint.y - startPoint.y ]);
    const perpendicular = [ -tangent[1] * offset, tangent[0] * offset ];  // 垂直向量
    point.x += perpendicular[0];
    point.y += perpendicular[1];
    return point;
  }
};
