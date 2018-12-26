/**
 * @fileOverview graph
 * @author huangtonger@aliyun.com
 */

const EventEmitter = require('@antv/g/lib/').EventEmitter;
const G = require('@antv/g');
const Util = require('../util');
const Global = require('../global');
const Node = require('../item/node');
const Edge = require('../item/edge');

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
      event: true,
      /**
       * group node & edges into different graphic groups
       * @private
       * @type boolean
       */
      groupByTypes: true,
      /**
       * determine if it's a directed graph
       * @type boolean
       */
      directed: false
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
    this._initCanvas();
    const eventController = new Controller.Event(this);
    const viewController = new Controller.FitView(this);
    const modeController = new Controller.Mode(this);
    this.set({ eventController, viewController, modeController });
    if (this.get('fitView')) {
      viewController.fitView();
    }
  }
  _initCanvas() {
    let container = this.get('container');
    if (Util.isString(container)) {
      container = document.getElementById(container);
      this.set('container', container);
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
    const id = canvas.get('el').id;
    const group = canvas.addGroup({ id: id + '-root', className: Global.rootContainerClassName });
    if (this.get('groupByTypes')) {
      const edgeGroup = group.addGroup({ id: id + '-edge', className: Global.edgeContainerClassName });
      const nodeGroup = group.addGroup({ id: id + '-node', className: Global.nodeContainerClassName });
      this.set({ nodeGroup, edgeGroup });
    }
    this.set({ canvas, group });
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
  render() {
    this.emit('beforerender');
    this.get('canvas').draw();
    this.emit('afterrender');
  }
  updateNode(node, cfg) {
    return this._updateItem(node, cfg);
  }
  updateEdge(edge, cfg) {
    return this._updateItem(edge, cfg);
  }
  _updateItem(item, cfg) {
    if (Util.isString(item)) {
      item = this.itemById[item];
    }
    item.update(cfg);
    return item;
  }
  addNode(model) {
    const parent = this.get('nodeGroup') || this.get('group');
    const node = new Node(model, parent.addGroup());
    this._addItem('nodes', node);
    return node;
  }
  addEdge(model) {
    const parent = this.get('edgeGroup') || this.get('group');
    if (Util.isString(model.source)) {
      model.source = this.itemById[model.source];
    }
    if (Util.isString(model.target)) {
      model.target = this.itemById[model.target];
    }
    const edge = new Edge(model, parent.addGroup());
    this._addItem('edges', edge);
    return edge;
  }
  _addItem(type, item) {
    this[type].push(item);
    this.itemById[item.get('id')] = item;
  }
  /**
   * @return {G.Canvas} canvas
   */
  getCanvas() {
    return this.get('canvas');
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
  destroy() {
    this.get('eventController').destroy();
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
  update(item, cfg) {
    if (Util.isString(item)) {
      item = this.itemById[item];
    }
    item.update(cfg);
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
    const rootGroup = this.get('group');
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
    this.get('group').translate(x, y);
  }
  move(dx, dy) {
    this.get('group').move(dx, dy);
  }
  fitView() {
    this.get('viewController').fitView();
  }
  addBehaviors(behaviors, modes) {
    this.get('modeController').manipulateBehaviors(behaviors, modes, true);
    return this;
  }
  removeBehaviors(behaviors, modes) {
    this.get('modeController').manipulateBehaviors(behaviors, modes, false);
    return this;
  }
  setMode(mode) {
    this.set('mode', mode);
    this.get('modeController').setMode(mode);
    return this;
  }
  currentMode() {
    return this.get('mode');
  }
  getZoom() {
    return this.get('group').getMatrix()[0];
  }
  zoom(ratio, center) {
    const matrix = Util.clone(this.get('group').getMatrix());
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
    item.destroy();
  }
}

module.exports = Graph;
