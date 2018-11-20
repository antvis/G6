/**
 * @fileOverview path util
 * @author huangtonger@aliyun.com
 */

const G = require('@antv/g/lib');
const BaseUtil = require('./base');
const PathUtil = {};

BaseUtil.mix(PathUtil, G.PathUtil, {
  getRectPath: G.PathUtil.rectPath,
  /**
   * points to polygon
   * TODO improve performance
   * @param {array}  points input points
   * @param {Boolen} z if close path
   * @return {string} Path
   */
  pointsToPolygon(points) {
    const path = [
      [ 'M', points[0].x, points[0].y ]
    ];
    for (let index = 1; index < points.length; index++) {
      const point = points[index];
      path.push([ 'L', point.x, point.y ]);
    }
    return path;
  },
  /**
   * get ellipse path
   * @param {number} x  horizontal coordinates
   * @param {number} y  vertical coordinates
   * @param {number} rx horizontal radius
   * @param {number} ry vertical radius
   * @return {array} path
   */
  getEllipsePath(x, y, rx, ry) {
    const rst = [
      [ 'M', x, y - ry ],
      [ 'a', rx, ry, 0, 1, 1, 0, 2 * ry ],
      [ 'a', rx, ry, 0, 1, 1, 0, -2 * ry ],
      [ 'z' ]
    ];
    return rst;
  }
});

module.exports = PathUtil;
