/**
 * @fileOverview item
 * @author huangtonger@aliyun.com
 */

const Util = require('../util/');
const Shape = require('../shape');

class Item {
  constructor(cfg, group) {
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
       * @type object
       */
      keyShape: null,
      /**
       * item's states, such as selected or active
       * @type Array
       */
      states: []
    };
    this._cfg = Util.mix(defaultCfg, this.getDefaultCfg());
    if (!cfg.id) {
      cfg.id = Util.uniqueId();
      group.set('id', cfg.id);
    }
    this._cfg.model = cfg;
    this.set('id', cfg.id);
    this.set('group', group);
    group.item = this;
    this.init();
    this.draw();
  }
  getDefaultCfg() {}
  init() {
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
  _drawInner() {
    const shapeFactory = Shape.getFactory(this.getType());
    const group = this.get('group');
    const model = this.get('model');
    group.clear();
    group.resetMatrix();
    group.translate(model.x, model.y);
    if (!shapeFactory) {
      return;
    }
    const keyShape = shapeFactory.draw(model.type, model, group);
    if (keyShape) {
      keyShape.isKeyShape = true;
      this.set('keyShape', keyShape);
    }
  }
  getStates() {
    return this.get('states');
  }
  _setState(state, enable) {
    const states = this.get('states');
    const shapeFactory = Shape.getFactory(this.getType());
    const index = states.indexOf(state);
    if (enable) {
      if (index > -1) {
        return this;
      }
      states.push(state);
    } else if (index > -1) {
      states.splice(states.indexOf(state), 1);
    }
    if (state === 'visible') {
      this._changeVisible(enable);
      return;
    }
    if (shapeFactory && shapeFactory.setState) {
      shapeFactory.setState(this.get('model').type, state, enable, this);
    }
  }
  getContainer() {
    return this.get('group');
  }
  beforeDraw() {}
  afterDraw() {}
  isVisible() {
    return this.get('visible');
  }
  _update(cfg) {
    const shapeFactory = Shape.getFactory(this.getType());
    const model = this.get('model');
    const type = this.get('model').type;
    const newModel = Util.mix({}, model, cfg);

    if (shapeFactory.update && (!cfg.type || cfg.type === type)) {
      shapeFactory.update(type, cfg, this);
      this.set('model', newModel);
    } else {
      this.set('model', newModel);
      this.draw();
    }
    return this;
  }
  draw() {
    this.beforeDraw();
    this._drawInner();
    this.afterDraw();
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
  _changeVisible(visible) {
    const group = this.get('group');
    if (visible) {
      group.show();
    } else {
      group.hide();
    }
    this.set('visible', visible);
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
      const animate = this.get('animate');
      const group = this.get('group');
      if (animate) {
        group.stopAnimate();
      }
      group.remove();
      this._cfg = null;
      this.destroyed = true;
    }
  }
}

module.exports = Item;
