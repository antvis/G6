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
  // /**
  //  * path translate
  //  * @param {array} segments path segments
  //  * @param {number} x translate x distance
  //  * @param {number} y translate y distance
  //  * @return {array} path
  //  */
  // pathTranslate(segments, x, y) {
  //   // y is optional
  //   y = y || 0;

  //   return segments.map(function(segment) {
  //     const cmd = segment[0];

  //     // Shift coords only for commands with absolute values
  //     if ('ACHLMRQSTVZ'.indexOf(cmd) === -1) {
  //       return segment;
  //     }

  //     const name = cmd.toLowerCase();

  //     // V is the only command, with shifted coords parity
  //     if (name === 'v') {
  //       segment[1] += y;
  //       return segment;
  //     }

  //     // ARC is: ['A', rx, ry, x-axis-rotation, large-arc-flag, sweep-flag, x, y]
  //     // touch x, y only
  //     if (name === 'a') {
  //       segment[6] += x;
  //       segment[7] += y;
  //       return segment;
  //     }

  //     return segment.map(function(val, i) {
  //       if (!i) {
  //         return val;
  //       }
  //       return i % 2 ? val + x : val + y;
  //     });
  //   });
  // },
  // /**
  //  * path scale
  //  * @param {array} segments path segments
  //  * @param {number} sx scalex
  //  * @param {number} sy scaley
  //  * @return {array} path
  //  */
  // pathScale(segments, sx, sy) {
  //   sy = (!sy && (sy !== 0)) ? sx : sy;

  //   return segments.map(function(segment) {
  //     const name = segment[0].toLowerCase();

  //     // V & v are the only command, with shifted coords parity
  //     if (name === 'v') {
  //       segment[1] *= sy;
  //       return segment;
  //     }

  //     // ARC is: ['A', rx, ry, x-axis-rotation, large-arc-flag, sweep-flag, x, y]
  //     // touch rx, ry, x, y only
  //     if (name === 'a') {
  //       segment[1] *= sx;
  //       segment[2] *= sy;
  //       segment[6] *= sx;
  //       segment[7] *= sy;
  //       return segment;
  //     }

  //     return segment.map(function(val, i) {
  //       if (!i) {
  //         return val;
  //       }
  //       return (val *= i % 2 ? sx : sy);
  //     });
  //   });
  // },
});

module.exports = PathUtil;
