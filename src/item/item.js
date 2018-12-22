/**
 * @fileOverview item
 * @author huangtonger@aliyun.com
 */

const Util = require('../util/');
const Shape = require('../shape');

function getCollapsedParent(node, dataMap) {
  const parent = dataMap[node.parent];
  if (!parent) {
    return false;
  }
  if (parent) {
    const rst = getCollapsedParent(parent, dataMap);
    if (rst) {
      return rst;
    }
  }
  if (parent.collapsed) {
    return parent;
  }
}

class Item {
  constructor(cfg) {
    const defaultCfg = {
      /**
       * id
       * @type {string}
       */
      id: '',

      /**
       * 类型
       * @type {string}
       */
      type: 'item',

      /**
       * data model
       * @type {object}
       */
      model: {},

      /**
       * g group
       * @type {G.Group}
       */
      group: null,

      /**
       * is open animate
       * @type {boolean}
       */
      animate: false,
      /**
       * visible - not group visible
       * @type {boolean}
       */
      visible: true,
      /**
       * capture event
       * @type {boolean}
       */
      event: true,
      /**
       * key shape to calculate item's bbox
       */
      keyShape: null
    };
    this._cfg = Util.mix(defaultCfg, this.getDefaultCfg());
    if (!cfg.id) {
      cfg.id = Util.uniqueId();
    }
    this._cfg.model = cfg;
    this.set('id', cfg.id);
    this.set('parent', cfg.group);
    this.init();
  }
  getDefaultCfg() {}
  init() {
    this._initGroup();
    this._setShapeObj();
    this.draw();
  }
  _initGroup() {
    const self = this;
    const group = self.get('parent').addGroup({ id: self.get('id') });
    group.item = this;
    this.set('group', group);
  }
  _calculateBBox() {
    const keyShape = this.get('keyShape');
    const group = this.group;
    const bbox = Util.getBBox(keyShape, group);
    bbox.width = bbox.maxX - bbox.minX;
    bbox.height = bbox.maxY - bbox.minY;
    bbox.centerX = (bbox.minX + bbox.maxX) / 2;
    bbox.centerY = (bbox.minY + bbox.maxY) / 2;
    return bbox;
  }

  _setShapeObj() {
    const itemType = this.get('type');
    const factory = Shape.getFactory(itemType);
    const shapeType = this.get('model').type;
    this.set('shapeObj', Shape.getFactory(factory).getShape(shapeType));
  }
  _afterDraw() {
    this.graph.emit('afteritemdraw', {
      item: this
    });
  }
  _beforeDraw() {
    const graph = this.graph;
    const group = this.group;
    graph.emit('beforeitemdraw', {
      item: this
    });
    group.resetMatrix();
    this.updateCollapsedParent();
  }
  shouldDraw() {
    return true;
  }
  _drawInner() {
    const animate = this.animate;
    const group = this.group;
    group.clear(!animate);
    this._setShapeObj();
    const shapeObj = this.shapeObj;
    const keyShape = shapeObj.draw(this);
    if (keyShape) {
      keyShape.isKeyShape = true;
      this.keyShape = keyShape;
    }
    shapeObj.afterDraw && shapeObj.afterDraw(this);
  }
  getShapeObj() {
    return this.shapeObj;
  }
  updateCollapsedParent() {
    const dataMap = this.dataMap;
    this.collapsedParent = getCollapsedParent(this.model, dataMap);
  }
  isVisible() {
    return this.visible;
  }
  draw() {
    this._beforeDraw();
    if (this.shouldDraw()) {
      this._drawInner();
    }
    this._afterDraw();
  }
  forceUpdate() {
    this._beforeDraw();
    this._drawInner();
    this._afterDraw();
  }
  getCenter() {
    const bbox = this.getBBox();
    return {
      x: bbox.centerX,
      y: bbox.centerY
    };
  }
  getBBox() {
    return this.bbox || this._calculateBBox();
  }
  update() {
    this.draw();
  }
  geContainer() {
    return this.get('group');
  }
  toFront() {
    this.get('group').toFront();
  }
  toBack() {
    this.get('group').toBack();
  }
  getType() {
    return this.get('type');
  }
  hide() {
    const group = this.group;
    const graph = this.graph;
    graph.emit('beforeitemhide', {
      item: this
    });
    group.hide();
    this.set('visible', false);
    graph.emit('afteritemhide', {
      item: this
    });
  }
  show() {
    const group = this.get('group');
    const graph = this.get('graph');
    graph.emit('beforeitemshow', {
      item: this
    });
    group.show();
    this.set('visible', true);
    graph.emit('afteritemshow', {
      item: this
    });
  }
  get(key) {
    return this._cfg[key];
  }
  set(key, val) {
    if (Util.isPlainObject(key)) {
      this._cfg = Util.mix({}, this._cfg, key);
    } else {
      this._cfg[key] = val;
    }
    return this;
  }
  destroy() {
    if (!this.destroyed) {
      const animate = this.animate;
      const graph = this.graph;
      graph.emit('beforeitemdestroy', {
        item: this
      });
      if (animate) {
        this.group.stopAnimate();
      }
      this.group.remove();
      this.destroyed = true;
      graph.emit('afteritemdestroy', {
        item: this
      });
    }
  }
}

module.exports = Item;
