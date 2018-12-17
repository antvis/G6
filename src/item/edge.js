/**
 * @fileOverview edge item
 * @author huangtonger@aliyun.com
 */

const Util = require('../util/');
const Item = require('./item');

class Edge extends Item {
  constructor(cfg) {
    const defaultCfg = {
      type: 'edge',
      isEdge: true,
      zIndex: 2
    };
    Util.mix(defaultCfg, cfg);
    super(defaultCfg);
  }
  _init() {
    // this.cacheEdges();
    super._init();
  }
  // cache edge into node
  // cacheEdges() {
  //   const itemMap = this.itemMap;
  //   const model = this.model;
  //   const source = itemMap[model.source];
  //   const target = itemMap[model.target];
  //   if (source && source.isItem) {
  //     source.edges.push(this);
  //     source.edges = Util.uniq(source.edges);
  //   }
  //   if (target && target.isItem) {
  //     target.edges.push(this);
  //     target.edges = Util.uniq(target.edges);
  //   }
  // }
  _beforeDraw() {
    const model = this.model;
    const itemMap = this.itemMap;
    if (!Util.isObject(model.source)) {
      this.source = itemMap[model.source];
    } else {
      this.source = model.source;
    }
    if (!Util.isObject(model.target)) {
      this.target = itemMap[model.target];
    } else {
      this.target = model.target;
    }
    super._beforeDraw();
  }
  _afterDraw() {
    if (!this.linkedItemVisible()) {
      this.hide();
    }
    this._addArrow();
    super._afterDraw();
  }
  _addArrow() {
    const model = this.model;
    const keyShape = this.keyShape;
    if (keyShape.get('type') === 'path') {
      const shapeObj = this.shapeObj;
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
  _getControlPoints() {
    const controlPoints = this.model.controlPoints;
    if (Util.isArray(controlPoints)) {
      return controlPoints;
    }
    return [];
  }
  _shouldDraw() {
    return super._shouldDraw() && this.linkedItemVisible();
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
    const source = this.source;
    const target = this.target;
    return Util.isPlainObject(source) || Util.isPlainObject(target)
    || source.isVisible() || target.isVisible()
    || (source.collapsedParent !== target.collapsedParent);
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
    const controlPoints = this._getControlPoints();
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
    const itemMap = this.itemMap;
    const model = this.model;
    const source = itemMap[model.source];
    const target = itemMap[model.target];
    source && source.isItem && Util.Array.remove(source.edges, this);
    target && target.isItem && Util.Array.remove(target.edges, this);
    super.destroy();
  }
}

module.exports = Edge;
