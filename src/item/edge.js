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
    super._afterDraw();
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
    if (point.linkable) {
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
  layoutUpdate() {
    const group = this.getGraphicGroup();
    const children = group.get('children');
    if (children.length === 1) {
      const keyShape = this.keyShape;
      const shapeObj = this.shapeObj;
      keyShape.attr('path', shapeObj.getPath(this));
    }
    this._afterDraw();
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

    if (source.linkable) {
      const point = (Util.isNumber(this.model.sourceAnchor) && source.id === model.source) ? this.model.sourceAnchor : points[1];
      const interPoint = source.getLinkPoints(point);
      points[0] = interPoint[0];
    }
    if (target.linkable) {
      const point = (Util.isNumber(this.model.targetAnchor) && target.id === model.target) ? this.model.targetAnchor : points[psl - 2];
      const interPoint = target.getLinkPoints(point);
      points[psl - 1] = interPoint[0];
    }
    return points;
  }
}

module.exports = Edge;
