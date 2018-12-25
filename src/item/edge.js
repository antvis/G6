/**
 * @fileOverview edge item
 * @author huangtonger@aliyun.com
 */

const Util = require('../util/');
const Item = require('./item');

class Edge extends Item {
  getDefaultCfg() {
    return {
      type: 'edge'
    };
  }
  init() {
    super.init();
    this._setNodes();
  }
  _setNodes() {
    const model = this.get('model');
    let source = model.source;
    let target = model.target;
    const graph = this.get('graph');
    if (!source || !target) {
      return;
    }
    if (Util.isString(source)) {
      source = graph.itemById[source];
    }
    if (Util.isString(target)) {
      target = graph.itemById(target);
    }
    this.set({ source, target });
    if (source && target) {
      source.addNeighbor(target);
      if (!graph.get('directed')) {
        target.addNeighbor(source);
      }
    }
  }
  _afterDraw() {
    if (!this.linkedItemVisible()) {
      this.hide();
    }
    this._addArrow();
    super._afterDraw();
  }
  _addArrow() {
    const model = this.get('model');
    const keyShape = this.get('keyShape');
    if (keyShape.type === 'path') {
      const shapeObj = this.get('shapeObj');
      const styleEndArrow = keyShape.attr('endArrow');
      const styleStartArrow = keyShape.attr('startArrow');
      const endArrow = model.endArrow || styleEndArrow;
      const startArrow = model.startArrow || styleStartArrow;
      styleStartArrow && keyShape.attr('startArrow', false);
      styleEndArrow && keyShape.attr('endArrow', false);
      endArrow && this._drawArrow(shapeObj.endArrow, 'end');
      startArrow && this._drawArrow(shapeObj.startArrow, 'start');
    }
  }
  _drawArrow({ path, shorten, tangent, ratio, style }, type) {
    tangent = tangent(this);
    shorten = shorten(this);
    path = path(this);
    style = style(this);
    ratio = ratio();
    const group = this.group;
    const keyShape = this.keyShape;
    const keyShapePath = Util.parsePathString(keyShape.attr('path'));
    const lastSegment = keyShapePath[keyShapePath.length - 1];
    const startSegment = keyShapePath[0];
    const point = keyShape.getPoint(ratio);
    if (!point || isNaN(point.x)) {
      return;
    }
    const marker = group.addShape('path', {
      attrs: {
        path,
        ...style
      }
    });
    const x = tangent[1][0] - tangent[0][0];
    const y = tangent[1][1] - tangent[0][1];
    const tangentLength = Math.sqrt(x * x + y * y);
    const shortenRatio = shorten / tangentLength;
    const vShorten = [ -x * shortenRatio, -y * shortenRatio ];
    let deg = 0;
    const tan = Math.atan(x / y);
    if (y === 0 && x < 0) {
      deg = Math.PI;
    } else if (x > 0 && y > 0) {
      deg = Math.PI / 2 - tan;
    } else if (x < 0 && y < 0) {
      deg = -Math.PI / 2 - tan;
    } else if (x >= 0 && y < 0) {
      deg = -tan - Math.PI / 2;
    } else if (x <= 0 && y > 0) {
      deg = Math.PI / 2 - tan;
    }
    marker.rotate(deg);
    marker.translate(point.x, point.y);
    if (type === 'end') {
      lastSegment[lastSegment.length - 1] = vShorten[1] + point.y;
      lastSegment[lastSegment.length - 2] = vShorten[0] + point.x;
    } else {
      startSegment[startSegment.length - 1] = vShorten[1] + point.y;
      startSegment[startSegment.length - 2] = vShorten[0] + point.x;
    }
    keyShape.attr('path', keyShapePath);
    this[type + 'Arrow'] = marker;
  }
  shouldDraw() {
    return super.shouldDraw() && this.linkedItemVisible();
  }
  _getPoint(point) {
    if (point.isItem) {
      const box = point.getBBox();
      return {
        x: box.centerX,
        y: box.centerY
      };
    }
    return {
      x: point.x,
      y: point.y
    };
  }
  linkedItemVisible() {
    const source = this.get('source');
    const target = this.get('target');
    return Util.isPlainObject(source) || Util.isPlainObject(target)
    || source.isVisible() || target.isVisible();
  }
  getSource() {
    const source = this.source;
    const collapsedParent = source.collapsedParent;
    const itemMap = this.itemMap;
    if (collapsedParent) {
      return itemMap[collapsedParent.id];
    }
    return source;
  }
  getTarget() {
    const target = this.target;
    const collapsedParent = target.collapsedParent;
    const itemMap = this.itemMap;
    if (collapsedParent) {
      return itemMap[collapsedParent.id];
    }
    return target;
  }
  getPoints() {
    const source = this.getSource();
    const target = this.getTarget();
    const model = this.model;
    const controlPoints = model.controlPoints;
    const sourcePoint = this._getPoint(source);
    const targetPoint = this._getPoint(target);
    const points = [ sourcePoint ].concat(controlPoints).concat([ targetPoint ]);
    const psl = points.length;

    if (source.isItem) {
      const point = (Util.isNumber(this.model.sourceAnchor) && source.id === model.source) ? this.model.sourceAnchor : points[1];
      const interPoint = source.getLinkPoints(point);
      points[0] = interPoint[0];
    }
    if (target.isItem) {
      const point = (Util.isNumber(this.model.targetAnchor) && target.id === model.target) ? this.model.targetAnchor : points[psl - 2];
      const interPoint = target.getLinkPoints(point);
      points[psl - 1] = interPoint[0];
    }
    return points;
  }
  destroy() {
    const source = this.get('source');
    const target = this.get('target');
    if (source) {
      source.removeNeighbor(target);
    }
    if (!this.get('graph').get('directed')) {
      target.removeNeighbor(source);
    }
    super.destroy();
  }
}

module.exports = Edge;
