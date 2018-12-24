/**
 * @fileOverview item
 * @author huangtonger@aliyun.com
 */

const Util = require('../util/');
const Shape = require('../shape');

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
    }
    this._cfg.model = cfg;
    this.set('id', cfg.id);
    this.set('graph', cfg.graph);
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
    const graph = self.get('graph');
    const parent = graph.get(self.get('type') + 'Group') || graph.get('group');
    const group = parent.addGroup({ id: self.get('id'), model: self.get('model') });
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
    if (factory) {
      const shapeType = this.get('model').type;
      this.set('shapeObj', Shape.getFactory(factory).getShape(shapeType));
    }
  }
  shouldDraw() {
    return true;
  }
  _beforeDraw() {
    this.get('graph').emit('beforeitemdraw', {
      item: this
    });
  }
  _drawInner() {
    const shapeObj = this.get('shapeObj');
    if (!shapeObj) {
      return;
    }
    const keyShape = shapeObj.draw(this.get('model'), this);
    if (keyShape) {
      keyShape.isKeyShape = true;
      this.set('keyShape', keyShape);
    }
    shapeObj.afterDraw && shapeObj.afterDraw(this);
  }
  getStates() {
    return this.get('states');
  }
  setState(state, enable) {
    const graph = this.get('graph');
    const states = this.get('states');
    const shapeObj = this.get('shapeObj');
    const index = states.indexOf(state);
    if (enable) {
      if (~index) {
        return this;
      }
      states.push(state);
    } else if (~index) {
      states.splice(states.indexOf(state), 1);
    }
    graph.emit('beforestatechange', { item: this });
    if (shapeObj && shapeObj.setState) {
      shapeObj.setState(state, enable, this);
    }
    graph.emit('afterstatechange', { item: this });
  }
  _afterDraw() {
    this.get('graph').emit('afteritemdraw', {
      item: this
    });
    const shapeObj = this.get('shapeObj');
    if (shapeObj && shapeObj.afterDraw) {
      shapeObj.afterDraw(this.get('group'), this);
    }
  }
  isVisible() {
    return this.get('visible');
  }
  update(cfg) {
    const shapeObj = this.get('shapeObj');
    const model = Util.mix({}, this.get('model'), cfg);
    if (shapeObj.update) {
      shapeObj.update(cfg, this);
      this.set('model', model);
    } else {
      this.set('model', model);
      this.draw();
    }
    return this;
  }
  draw() {
    if (!this.shouldDraw()) {
      return;
    }
    const group = this.get('group');
    const model = this.get('model');
    group.resetMatrix();
    group.clear();
    group.translate(model.x, model.y);
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
    const group = this.get('group');
    const graph = this.get('graph');
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
      const animate = this.get('animate');
      const graph = this.get('graph');
      const group = this.get('group');
      graph.emit('beforeitemdestroy', {
        item: this
      });
      if (animate) {
        group.stopAnimate();
      }
      group.remove();
      this._cfg = null;
      this.destroyed = true;
      graph.emit('afteritemdestroy', {
        item: this
      });
    }
  }
}

module.exports = Item;
