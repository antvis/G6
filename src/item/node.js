/**
 * @fileOverview node item
 * @author huangtonger@aliyun.com
 */

const Util = require('../util/');
const Item = require('./item');

class Node extends Item {
  constructor(cfg) {
    const defaultCfg = {
      type: 'node',
      linkable: true,
      isNode: true,
      zIndex: 3
    };
    Util.mix(defaultCfg, cfg);
    super(defaultCfg);
  }
  updatePosition() {
    const group = this.group;
    const model = this.model;
    group.setMatrix([ 1, 0, 0, 0, 1, 0, model.x ? model.x : 0, model.y ? model.y : 0, 1 ]);
    this.bbox = this._calculateBBox();
  }
  _shouldDraw() {
    const diff = this._getDiff();
    const superBool = super._shouldDraw();

    return diff &&
    !(diff.length === 2 && diff.indexOf('x') !== -1 && diff.indexOf('y') !== -1) &&
    !(diff.length === 1 && (diff[0] === 'x' || diff[0] === 'y')) && superBool;
  }
  _afterDraw() {
    this.updatePosition();
    super._afterDraw();
  }
  layoutUpdate() {
    this._afterDraw();
  }
  getEdges(callback) {
    const id = this.id;
    const itemMap = this.itemMap;
    const edges = itemMap._edges;
    const rst = [];
    Util.each(edges, edge => {
      if (callback) {
        if (callback(edge)) {
          rst.push(edge);
        }
        return;
      }
      const edgeModel = edge.getModel();
      if (id === edgeModel.target || id === edgeModel.source) {
        rst.push(edge);
      }
    });
    return rst;
  }
  getInEdges() {
    return this.getEdges(edge => {
      return edge.target === this;
    });
  }
  getOutEdges() {
    return this.getEdges(edge => {
      return edge.source === this;
    });
  }
  /**
    * get anchor points, if there is anchors return the points sorted by arc , others return the link point
    * @param {Object | Number} point - start point
    * @return {array} - all anchor points sorted by angle, ASC
    */
  getLinkPoints(point) {
    const anchorPoints = this.getAnchorPoints();
    if (Util.isNumber(point) && anchorPoints[point]) {
      return [ anchorPoints[point] ];
    }
    const { x, y } = point;
    const bbox = this.getBBox();
    const { centerX, centerY } = bbox;
    const x1 = x - centerX;
    const y1 = y - centerY;
    const anchor = this.shapeObj.anchor || {};
    const defaultIntersectBox = this.defaultIntersectBox;
    let points = [];
    if (Util.isEmpty(anchorPoints)) {
      // get link point if there are no default anchors
      let type = anchor.type || defaultIntersectBox;
      if (Util.isFunction(type)) {
        type = type(this);
      }
      switch (type) {
        case 'rect':
          points = [ Util.getIntersectPointRect(bbox, point) ];
          break;
        case 'path':
          if (this.keyShape && this.keyShape.get('type') === 'path') {
            const linePath = Util.parsePathArray([ 'M', x, y, 'L', centerX, centerY ]);
            points = [ Util.intersection(linePath, this.keyShape.get('path')) ];
          }
          break;
        default:
          // default circle
          points = [ Util.getIntersectPointCircle(x, y, bbox.centerX, bbox.centerY, Math.max(bbox.width, bbox.height) / 2) ];
          break;
      }
      // if no link points return center
      if (Util.isEmpty(points[0])) {
        points = [{
          x: centerX,
          y: centerY
        }];
      }
    } else {
      // get sorted points by arc if there are default points
      points = anchorPoints.map(p => {
        const x2 = p.x - centerX;
        const y2 = p.y - centerY;
        const arc = Util.getArcOfVectors({ x: x1, y: y1 }, { x: x2, y: y2 });
        return Util.mix({}, p, {
          arc
        });
      })
        .sort((a, b) => {
          return a.arc - b.arc;
        });
    }
    return points;
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
      points = anchor.points;
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
