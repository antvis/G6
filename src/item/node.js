/**
 * @fileOverview node item
 * @author huangtonger@aliyun.com
 */

const Util = require('../util/');
const Item = require('./item');

class Node extends Item {
  getDefaultCfg() {
    return {
      type: 'node',
      anchors: [],
      edges: [],
      status: []
    };
  }

  // getNeighbors() {
  //   const nodes = [];
  //   let node = null;
  //   Util.each(this.get('edges'), edge => {
  //     if (edge.get('source') === this) {
  //       node = edge.get('target');
  //     } else {
  //       node = edge.get('source');
  //     }
  //     if (nodes.indexOf(node) < 0) {
  //       nodes.push(node);
  //     }
  //   });
  //   return nodes;
  // }
  getEdges() {
    return this.get('edges');
  }

  getInEdges() {
    const self = this;
    return this.get('edges').filter(edge => {
      return edge.get('target') === self;
    });
  }

  getOutEdges() {
    const self = this;
    return this.get('edges').filter(edge => {
      return edge.get('source') === self;
    });
  }

  // showAnchors() {
  //   // todo
  // }
  // hideAnchors() {

  // }

  /**
    * get anchor points, if there is anchors return the points sorted by arc , others return the link point
    * @param {Object | Number} point - start point
    * @return {array} - all anchor points sorted by angle, ASC
    */
  getLinkPoint(point) {
    // const model = this.get('model');
    const keyShape = this.get('keyShape');
    const type = keyShape.get('type');
    const bbox = this.getBBox();
    const { centerX, centerY } = bbox;
    let linkPoint;
    switch (type) {
      case 'circle':
        linkPoint = Util.getCircleIntersectByPoint({
          x: centerX,
          y: centerY,
          r: bbox.width / 2
        }, point);
        break;
      case 'ellipse':
        linkPoint = Util.getEllispeIntersectByPoint({
          x: centerX,
          y: centerY,
          rx: bbox.width / 2,
          ry: bbox.height / 2
        }, point);
        break;
      default:
        linkPoint = Util.getRectIntersectByPoint(bbox, point); // 函数定义不统一，但是这样比较方便点
    }
    // TO DO 计算锚点
    return linkPoint;
  }

  addEdge(edge) {
    this.get('edges').push(edge);
  }

  removeEdge(edge) {
    const edges = this.getEdges();
    const index = edges.indexOf(edge);
    if (index > -1) {
      edges.splice(index, 1);
    }
  }

  /**
   * get position of anchor points
   * @param {number} index the index of points
   * @return {array} anchorPoints
   */
  getAnchorPoints(index) {
    const shapeObj = this.shapeObj;
    const bbox = this.getBBox();
    const anchorPoints = [];
    const anchor = shapeObj.anchor || {};
    let points;
    if (Util.isArray(anchor)) {
      points = anchor;
    } else if (Util.isFunction(anchor)) {
      points = anchor(this);
    } else {
      if (Util.isFunction(anchor.points)) {
        points = anchor.points(this);
      } else {
        points = anchor.points;
      }
    }
    Util.each(points, (pointArr, index) => {
      const anchorPoint = Util.mix({
        x: bbox.minX + pointArr[0] * bbox.width,
        y: bbox.minY + pointArr[1] * bbox.height
      }, pointArr[2], {
        index
      });
      anchorPoints.push(anchorPoint);
    });
    this._anchorPoints = anchorPoints;
    if (Util.isNumber(index)) {
      return this._anchorPoints[index];
    }
    return this._anchorPoints;
  }
}
module.exports = Node;
