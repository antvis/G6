/**
 * @fileOverview graph
 * @author huangtonger@aliyun.com
 */

const EventEmitter = require('@antv/g/lib/').EventEmitter;
const G = require('@antv/g');
const Util = require('../util');
const Global = require('../global');
const Item = require('../item');

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
      directed: false,
      /**
       * when data or shape changed, should canvas draw automatically
       */
      autoPaint: true
    };
  }

  constructor(inputCfg) {
    super();
    this._cfg = Util.mix({}, this.getDefaultCfg(), inputCfg);    // merge graph configs
    this.node = [];                                              // all the node instances
    this.edge = [];                                              // all the edge instances
    this.itemById = {};                                          // all the item indexed by id
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
  update(item, cfg) {
    if (Util.isString(item)) {
      item = this.itemById[item];
    }
    item.update(cfg);
    if (this.get('autoPaint')) {
      this.paint();
    }
    return item;
  }
  add(type, model) {
    const parent = this.get(type + 'Group') || this.get('group');
    let item;
    if (type === 'edge') {
      let source = model.source;
      let target = model.target;
      if (source && Util.isString(source)) {
        source = this.itemById[source];
      }
      if (target && Util.isString(target)) {
        target = this.itemById[target];
      }
      item = new Item[Util.upperFirst(type)]({
        model,
        source,
        target,
        group: parent.addGroup()
      });
    } else {
      item = new Item[Util.upperFirst(type)]({
        model,
        group: parent.addGroup()
      });
    }
    // 这个地方存一个 Map 就好了，为什么数组和map 都存储
    this[type].push(item);
    this.itemById[item.get('id')] = item;
    return item;
  }
  remove(item) {
    if (Util.isString(item)) {
      item = this.itemById[item];
    }
    if (!item) {
      return;
    }
    const items = this[item.get('type')];
    const index = items.indexOf(item);
    items.splice(index, 1);
    delete this.itemById[item.get('id')];
    item.destroy();
  }
  data(data) {
    this.set('data', data);
  }
  render() {
    const self = this;
    const data = this.get('data');
    if (!data) {
      throw new Error('data must be defined first');
    }
    this.clear();
    let item;
    this.emit('beforerender');
    Util.each(data, model => {
      item = new Item[model.type](model);
      self[item].push(item);
    });
    this.paint();
    this.emit('afterrender');
  }
  changeData(data) {
    if (!data) {
      return;
    }
    const self = this;
    const items = {
      node: [],
      edge: []
    };
    let item;
    Util.each(data, model => {
      item = self.itemById[model.id];
      if (item) {
        item._update(model);
      } else {
        item = new Item[model.type](model);
      }
      items[model.type].push(item);
    });
    Util.each(self.itemById, item => {
      if (items.node.indexOf(item) < 0 && items.edge.indexOf(item) < 0) {
        self.remove(item);
      }
    });
    this.node = items.node;
    this.edge = items.edge;
    this.paint();
    return this;
  }
  paint() {
    this.get('canvas').draw();
  }
  /**
   * @return {object} data
   */
  save() {
    // TODO
    return this;
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
  _updateMatrix(matrix) {
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
  translate(dx, dy) {
    this.get('group').translate(dx, dy);
  }
  moveTo(x, y) {
    this.get('group').move(x, y);
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
    this._updateMatrix(matrix);
  }
  focus(item) {
    this.get('ViewController').focus(item);
  }
  findById(id) {
    return this.itemById[id];
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
  setAutoPaint(auto) {
    this.set('autoPaint', auto);
  }
  clear() {
    const group = this.get('group');
    Util.each(this.node, node => {
      node.destroy();
    });
    Util.each(this.edge, edge => {
      edge.destroy();
    });
    group.clear();
    this.node = [];
    this.edge = [];
    return this;
  }
  destroy() {
    this.clear();
    this.get('eventController').destroy();
    this.canvas.destroy();
    this.itemById = null;
    this.destroyed = true;
    return this;
  }
}

module.exports = Graph;
