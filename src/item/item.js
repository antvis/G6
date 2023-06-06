/**
 * @fileOverview item
 * @author huangtonger@aliyun.com
 */

const Util = require('../util/');
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
      type: null,

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
       * cache model for diff
       * @type {object}
       */
      modelCache: {}
    };
    Util.mix(this, defaultCfg, cfg);
    this._init();
  }
  _init() {
    this._setIndex();
    this._mapping();
    this._setShapeObj();
    this._initGroup();
    this.draw();
  }
  _setIndex() {
    const model = this.model;
    if (Util.isNil(model.index)) {
      model.index = this.zIndex;
    }
  }
  _mapping() {
    const mapper = this.mapper;
    const model = this.model;
    mapper.mapping(model);
  }
  _initGroup() {
    const group = this.group;
    const model = this.model;
    const type = this.type;
    group.isItemContainer = true;
    group.id = model.id;
    group.itemType = type;
    group.model = model;
  }
  _calculateBBox() {
    const keyShape = this.keyShape;
    const group = this.group;
    const bbox = Util.getBBox(keyShape, group);
    bbox.width = bbox.maxX - bbox.minX;
    bbox.height = bbox.maxY - bbox.minY;
    bbox.centerX = (bbox.minX + bbox.maxX) / 2;
    bbox.centerY = (bbox.minY + bbox.maxY) / 2;
    return bbox;
  }
  getLabel() {
    const group = this.group;
    return group.findByClass('label')[0];
  }
  getGraph() {
    return this.graph;
  }
  getEnterAnimate() {
    const shapeObj = this.shapeObj;
    const graph = this.graph;
    return shapeObj.enterAnimate ? shapeObj.enterAnimate : graph.get('_enterAnimate');
  }
  getLeaveAnimate() {
    const shapeObj = this.shapeObj;
    const graph = this.graph;
    return shapeObj.leaveAnimate ? shapeObj.leaveAnimate : graph.get('_leaveAnimate');
  }
  _setShapeObj() {
    const graph = this.graph;
    const type = this.type;
    const model = this.getModel();
    this.shapeObj = graph.getShapeObj(type, model);
  }
  _afterDraw() {
    const graph = this.graph;
    this._setGId();
    this._cacheModel();
    graph.emit('afteritemdraw', {
      item: this
    });
  }
  _cacheModel() {
    this.modelCache = Util.mix({}, this.model);
  }
  _setGId() {
    const group = this.group;
    const id = this.id;
    const type = this.type;
    group.gid = id;
    group.deepEach((child, parent, index) => {
      const parentGid = parent.gid;
      child.id = id;
      child.eventPreFix = type;
      child.gid = parentGid + '-' + index;
    });
  }
  _beforeDraw() {
    const graph = this.graph;
    graph.emit('beforeitemdraw', {
      item: this
    });
    this.updateCollapsedParent();
    this._setShapeObj();
  }
  _shouldDraw() {
    return true;
  }
  _getDiff() {
    const diff = [];
    const model = this.model;
    const modelCache = this.modelCache;

    Util.each(model, (v, k) => {
      if (!Util.isEqual(v, modelCache[k])) {
        diff.push(k);
      }
    });
    if (diff.length === 0) {
      return false;
    }
    return diff;
  }
  _drawInner() {
    const animate = this.animate;
    const group = this.group;
    group.clear(!animate);
    const shapeObj = this.shapeObj;
    const keyShape = shapeObj.draw(this);
    if (keyShape) {
      keyShape.isKeyShape = true;
      this.keyShape = keyShape;
    }
    shapeObj.afterDraw && shapeObj.afterDraw(this);
  }
  deepEach(callback, getParent) {
    Util.traverseTree(this, callback, getParent ? getParent : parent => {
      return parent.getChildren();
    });
  }
  getShapeObj() {
    return this.shapeObj;
  }
  updateCollapsedParent() {
    const dataMap = this.dataMap;
    this.collapsedParent = getCollapsedParent(this.model, dataMap);
  }
  isVisible() {
    const group = this.group;
    return group.get('visible');
  }
  hide() {
    const group = this.group;
    const graph = this.graph;
    graph.emit('beforeitemhide', {
      item: this
    });
    group.hide();
    graph.emit('afteritemhide', {
      item: this
    });
  }
  show() {
    const group = this.group;
    const graph = this.graph;
    graph.emit('beforeitemshow', {
      item: this
    });
    group.show();
    graph.emit('afteritemshow', {
      item: this
    });
  }
  draw() {
    this._beforeDraw();
    if (this._shouldDraw()) {
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
    return (this.bbox || this._calculateBBox());
  }
  layoutUpdate() {
    this.draw();
  }
  update() {
    this.draw();
  }
  getModel() {
    return this.model;
  }
  getKeyShape() {
    return this.keyShape;
  }
  getGraphicGroup() {
    return this.group;
  }
  getParent() {
    const model = this.model;
    const itemMap = this.itemMap;
    return itemMap[model.parent];
  }
  getAllParents() {
    const model = this.model;
    const itemMap = this.itemMap;
    const parents = [];
    let parentModel = model.parent;
    while (parentModel && itemMap[parentModel]) {
      parents.push(itemMap[parentModel]);
      parentModel = parentModel.parent;
    }
    return parents;
  }
  // deep get all children
  getAllChildren() {
    const rst = [];
    this.deepEach(child => {
      rst.push(child);
    });
    return rst;
  }
  // get children
  getChildren() {
    const id = this.id;
    const graph = this.graph;
    const items = graph.getItems();

    return items.filter(item => {
      return item.model.parent === id;
    });
  }
  destroy() {
    if (!this.destroyed) {
      const animate = this.animate;
      const graph = this.graph;
      graph.emit('beforeitemdestroy', {
        item: this
      });
      this.group.remove(!animate);
      this.destroyed = true;
      graph.emit('afteritemdestroy', {
        item: this
      });
    }
  }
}

module.exports = Item;
