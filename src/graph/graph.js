/**
 * @fileOverview graph
 * @author huangtonger@aliyun.com
 */

const EventEmitter = require('@antv/g/lib/').EventEmitter;
const G = require('@antv/g');
const Util = require('../util');

const Controller = require('./controller');

class Graph extends EventEmitter {
  /**
   * Access to the default configuration properties
   * @return {object} default configuration
   */
  getDefaultCfg() {
    return {
      /**
       * Container could be dom object or dom id
       * @type {object|string|undefined}
       */
      container: undefined,

      /**
       * Canvas width
       * @type {number|undefined}
       * unit pixel if undefined force fit width
       */
      width: undefined,

      /**
       * Canvas height
       * @type {number|undefined}
       * unit pixel if undefined force fit height
       */
      height: undefined,
      /**
       * renderer canvas or svg
       * @type {string}
       */
      renderer: 'canvas',
      /**
       * control graph behaviors
       * @type Array
       */
      mode: [],
      /**
       * source data
       * @type object
       */
      data: null,
      /**
       *  capture events
       *  @type boolean
       */
      event: true
    };
  }

  constructor(inputCfg) {
    super();
    this._cfg = Util.mix({}, this.getDefaultCfg(), inputCfg);     // merge graph configs
    this.nodes = [];                                              // all the node instances
    this.edges = [];                                              // all the edge instances
    this.itemById = {};                                           // all the item indexed by id
    this._init();
  }
  _init() {
    // todo init controllers & G.Canvas etc..
    this._initCanvas();
    const viewController = new Controller.fitView(this);
    this.set('viewController', viewController);
    if (this.get('fitView')) {
      viewController.fitView();
    }
  }
  _initCanvas() {
    let container = this.get('container');
    if (Util.isString(container)) {
      container = document.getElementById(container);
    }
    if (!container) {
      throw Error('invalid container');
    }
    const canvas = new G.Canvas({
      containerDOM: container,
      width: this.get('width'),
      height: this.get('height'),
      renderer: this.get('renderer'),
      pixelRatio: this.get('pixelRatio')
    });
    this.canvas = canvas;
    const group = canvas.addGroup({ id: 'g6-root' });
    this.group = group;
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
  draw() {}
  render() {}
  _drawInner() {}
  _clearInner() {}
  addNode(type, cfgs) {
    return { type, cfgs };
  }
  addEdge(type, cfgs) {
    return { type, cfgs };
  }
  // move(dx, dy) {}
  // translate(x, y) {}
  // zoom(scale, center) {}
  /**
   * @param  {string} type item type
   * @param  {object} model data model
   * @return {object} shapeObj
   */
  getShapeObj(type, model) {
    return { type, model };
  }
  /**
   * @return {G.Canvas} canvas
   */
  getCanvas() {
    return this.get('_canvas');
  }
  /**
   * @return {G.Group} rootGroup
   */
  getRootGroup() {
    return this;
  }
  /**
   * @return {G.Group} itemGroup
   */
  getItemGroup() {
    return this.group;
  }
  getBBox() {
    return this.group.getBBox();
  }
  /**
   * @param  {object} data source data
   * @return {Graph} this
   */
  source(data) {
    return data;
  }
  /**
   * @return {Graph} - this
   */
  reRender() {
    const data = this.get('_sourceData');
    this.read(data);
    return this;
  }
  /**
   * @return {Graph} - this
   */
  destroy() {
    this.removeEvent();
    this.canvas.destroy();
    this.nodes = [];
    this.edges = null;
    this.itemById = null;
    return this;
  }
  /**
   * @return {object} data
   */
  save() {
    return this;
  }
  update(item) {
    return item;
  }
  /**
   * change data
   * @param {object} data - source data
   * @return {Graph} this
   */
  read(data) {
    return data;
  }
  /**
   * @return {Graph} this
   */
  clear() {
    return this;
  }
  /**
   * @return {Graph} this
   */
  getWidth() {
    return this.get('width');
  }
  /**
   * @return {Graph} this
   */
  getHeight() {
    return this.get('height');
  }
  /**
   * change canvas size
   * @param  {number} width  input width
   * @param  {number} height input height
   * @return {object} this
   */
  changeSize(width, height) {
    this.get('viewController').changeSize(width, height);
    return this;
  }
  updateMatrix(matrix) {
    const rootGroup = this.group;
    const minZoom = this.get('minZoom');
    const maxZoom = this.get('maxZoom');
    if (minZoom && matrix.elements[0] < minZoom) {
      return;
    }
    if (maxZoom && matrix.elements[0] > maxZoom) {
      return;
    }
    rootGroup.setMatrix(matrix);
  }
  translate(x, y) {
    this.group.translate(x, y);
  }
  move(dx, dy) {
    this.group.move(dx, dy);
  }
  fitView() {
    this.get('viewController').fitView();
  }
  getZoom() {
    return this.group.getMatrix()[0];
  }
  zoom(ratio, center) {
    const matrix = Util.clone(this.group.getMatrix());
    if (center) {
      Util.mat3.translate(matrix, matrix, [ -center.x, -center.y ]);
      Util.mat3.scale(matrix, matrix, [ ratio, ratio ]);
      Util.mat3.translate(matrix, matrix, [ center.x, center.y ]);
    } else {
      Util.mat3.scale(matrix, matrix, [ ratio, ratio ]);
    }
    this.updateMatrix(matrix);
  }
  focus(item) {
    this.get('ViewController').focus(item);
  }
  findById(id) {
    return this.itemById[id];
  }
  findNode(fn) {
    return this.find('nodes', fn);
  }
  findEdge(fn) {
    return this.find('edges', fn);
  }
  findAllNodes(fn) {
    this.findAll('nodes', fn);
  }
  findAllEdges(fn) {
    return this.findAll('edges', fn);
  }
  find(type, fn) {
    let result;
    const items = this[type];
    Util.each(items, (item, i) => {
      if (fn(item, i)) {
        result = item;
        return false;
      }
    });
    return result;
  }
  findAll(type, fn) {
    const result = [];
    Util.each(this[type], (item, i) => {
      if (fn(item, i)) {
        result.push(item);
      }
    });
    return result;
  }
  removeNode(node) {
    this.remove('nodes', node);
    return this;
  }
  removeEdge(edge) {
    this.remove('edges', edge);
    return this;
  }
  remove(type, item) {
    if (Util.isString(item)) {
      item = this.itemById[item];
    }
    if (!item) {
      return;
    }
    const items = this[type];
    const index = items.indexOf(item);
    items.splice(index, 1);
    delete this.itemById[item.get('id')];
    item.remove();
  }
}

module.exports = Graph;
