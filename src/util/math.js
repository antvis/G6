/**
 * @fileOverview math util
 * @author huangtonger@aliyun.com
 */

const BaseUtil = require('./base');
const tolerance = 0.001;
const MathUtil = {
  /**
   * 是否在区间内
   * @param   {number}       value  值
   * @param   {number}       min    最小值
   * @param   {number}       max    最大值
   * @return  {boolean}      bool   布尔
   */
  isBetween(value, min, max) {
    return value >= min && value <= max;
  },
  /**
   * 两线段交点
   * @param  {object}  p0 第一条线段起点
   * @param  {object}  p1 第一条线段终点
   * @param  {object}  p2 第二条线段起点
   * @param  {object}  p3 第二条线段终点
   * @return {object}  交点
   */
  getLineIntersect(p0, p1, p2, p3) {
    const E = {
      x: p2.x - p0.x,
      y: p2.y - p0.y
    };
    const D0 = {
      x: p1.x - p0.x,
      y: p1.y - p0.y
    };
    const D1 = {
      x: p3.x - p2.x,
      y: p3.y - p2.y
    };
    const kross = D0.x * D1.y - D0.y * D1.x;
    const sqrKross = kross * kross;
    const sqrLen0 = D0.x * D0.x + D0.y * D0.y;
    const sqrLen1 = D1.x * D1.x + D1.y * D1.y;
    let point = null;
    if (sqrKross > tolerance * sqrLen0 * sqrLen1) {
      const s = (E.x * D1.y - E.y * D1.x) / kross;
      const t = (E.x * D0.y - E.y * D0.x) / kross;
      if (MathUtil.isBetween(s, 0, 1) && MathUtil.isBetween(t, 0, 1)) {
        point = {
          x: p0.x + s * D0.x,
          y: p0.y + s * D0.y
        };
      }
    }
    return point;
  },
  /**
   * point and rectangular intersection point
   * @param  {object} rect  rect
   * @param  {object} point point
   * @return {object} rst;
   */
  getIntersectPointRect(rect, point) {
    const x = rect.minX;
    const y = rect.minY;
    const width = (rect.maxX - rect.minX);
    const height = (rect.maxY - rect.minY);
    const cx = x + width / 2;
    const cy = y + height / 2;
    const points = [];
    const center = {
      x: cx,
      y: cy
    };
    points.push({
      x,
      y
    });
    points.push({
      x: x + width,
      y
    });
    points.push({
      x: x + width,
      y: y + height
    });
    points.push({
      x,
      y: y + height
    });
    points.push({
      x,
      y
    });
    let rst = null;
    for (let i = 1; i < points.length; i++) {
      rst = MathUtil.getLineIntersect(points[i - 1], points[i], center, point);
      if (rst) {
        break;
      }
    }
    return rst;
  },
  /**
   * get point and circle inIntersect
   * @param  {number} x   point x
   * @param  {number} y   point y
   * @param  {number} cx  circle center x
   * @param  {number} cy  circle center y
   * @param  {number} cr  circle radius
   * @return {object} applied point
   */
  getIntersectPointCircle(x, y, cx, cy, cr) {
    const d = Math.sqrt(Math.pow((x - cx), 2) + Math.pow((y - cy), 2));
    if (d < cr) {
      return null;
    }
    const dx = (x - cx);
    const dy = (y - cy);
    const signX = Math.sign(dx);
    const signY = Math.sign(dy);
    const angle = Math.atan(dy / dx);
    return {
      x: cx + Math.abs(cr * Math.cos(angle)) * signX,
      y: cy + Math.abs(cr * Math.sin(angle)) * signY
    };
  },
  /**
   * coordinate matrix transformation
   * @param  {number} point   coordinate
   * @param  {number} matrix  matrix
   * @param  {number} tag     could be 0 or 1
   * @return {object} transformed point
   */
  applyMatrix(point, matrix, tag = 1) {
    const vector = [ point.x, point.y, tag ];
    BaseUtil.vec3.transformMat3(vector, vector, matrix);
    return {
      x: vector[0],
      y: vector[1]
    };
  },
  /**
   * coordinate matrix invert transformation
   * @param  {number} point   coordinate
   * @param  {number} matrix  matrix
   * @param  {number} tag     could be 0 or 1
   * @return {object} transformed point
   */
  invertMatrix(point, matrix, tag = 1) {
    const inversedMatrix = BaseUtil.mat3.invert([], matrix);
    const vector = [ point.x, point.y, tag ];
    BaseUtil.vec3.transformMat3(vector, vector, inversedMatrix);
    return {
      x: vector[0],
      y: vector[1]
    };
  },
  /**
   * radix sort
   * @param  {array} arr unsorted child node set
   * @param  {function} callback callback
   * @return {array} after sorting child node set
   */
  radixSort(arr, callback) {
    let mod = 10;
    let dev = 1;
    const counter = []; // 桶
    let maxDigit = 1; // 最大位数
    let rank;
    let length;
    let i;
    let j;
    let bucket;
    let pos;
    let value;

    for (i = 0; i < arr.length; i++) {
      rank = callback(arr[i]);
      rank = parseInt(rank, 10);
      length = rank.toString().length;
      if (rank.toString().length > maxDigit) {
        maxDigit = length;
      }
    }
    for (i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
      for (j = 0; j < arr.length; j++) {
        bucket = callback(arr[j]);
        bucket = parseInt((bucket % mod) / dev, 10);
        if (counter[bucket] === undefined) {
          counter[bucket] = [];
        }
        counter[bucket].push(arr[j]);
      }
      pos = 0;
      for (j = 0; j < counter.length; j++) {
        value = undefined;
        if (counter[j] !== undefined) {
          value = counter[j].shift();
          while (value !== undefined) {
            arr[pos++] = value;
            value = counter[j].shift();
          }
        }
      }
    }
    return arr;
  },
  /**
    * get arc of two vertors
    * @param {object} vector1 - vector1
    * @param {object} vector2 - vector2
    * @return {number} - arc
    */
  getArcOfVectors(vector1, vector2) {
    const { x: x1, y: y1 } = vector1;
    const { x: x2, y: y2 } = vector2;
    const v1 = Math.sqrt(x1 * x1 + y1 * y1);
    const v2 = Math.sqrt(x2 * x2 + y2 * y2);
    return Math.acos((x1 * x2 + y1 * y2) / (v1 * v2));
  }
};
module.exports = BaseUtil.mix({}, BaseUtil, MathUtil);
