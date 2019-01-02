/**
 * @fileOverview graph
 * @author huangtonger@aliyun.com
 */

const EventEmitter = require('@antv/g/lib/').EventEmitter;
const G = require('@antv/g/lib');
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
       * Fit view padding (client scale)
       * @type {number|array}
       */
      fitViewPadding: 10,
      /**
       * Minimum scale size
       * @type {number}
       */
      minZoom: 0.2,
      /**
       * Maxmum scale size
       * @type {number}
       */
      maxZoom: 10,
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
       * @type boolean
       */
      autoPaint: true,
      /**
       * store all the node instances
       * @type [object]
       */
      nodes: [],
      /**
       * store all the edge instances
       * @type [object]
       */
      edges: [],
      /**
       * all the instances indexed by id
       * @type object
       */
      itemById: {}
    };
  }

  constructor(inputCfg) {
    super();
    this._cfg = Util.mix({}, this.getDefaultCfg(), inputCfg);    // merge graph configs
    this._init();
  }
  _init() {
    this._initCanvas();
    const eventController = new Controller.Event(this);
    const viewController = new Controller.View(this);
    const modeController = new Controller.Mode(this);
    this.set({ eventController, viewController, modeController });
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
    this.set('canvas', canvas);
    this._initGroups();
  }
  _initGroups() {
    const canvas = this.get('canvas');
    const id = this.get('canvas').get('el').id;
    const group = canvas.addGroup({ id: id + '-root', className: Global.rootContainerClassName });
    if (this.get('groupByTypes')) {
      const edgeGroup = group.addGroup({ id: id + '-edge', className: Global.edgeContainerClassName });
      const nodeGroup = group.addGroup({ id: id + '-node', className: Global.nodeContainerClassName });
      this.set({ nodeGroup, edgeGroup });
    }
    this.set('group', group);
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
    const itemById = this.get('itemById');
    if (Util.isString(item)) {
      item = itemById[item];
    }
    if (cfg.source) {
      let source = cfg.source;
      if (Util.isString(source)) {
        source = itemById[source];
        item.setSource(source);
      }
    }
    if (cfg.target) {
      let target = cfg.target;
      if (Util.isString(target)) {
        target = itemById[target];
        item.setTarget(target);
      }
    }
    item.update(cfg);
    this._autoPaint();
    return item;
  }
  add(type, model) {
    const parent = this.get(type + 'Group') || this.get('group');
    let item;
    if (type === 'edge') {
      let source = model.source;
      let target = model.target;
      if (source && Util.isString(source)) {
        source = this.get('itemById')[source];
      }
      if (target && Util.isString(target)) {
        target = this.get('itemById')[target];
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
    this.get(type + 's').push(item);
    this.get('itemById')[item.get('id')] = item;
    this._autoPaint();
    return item;
  }
  remove(item) {
    if (Util.isString(item)) {
      item = this.get('itemById')[item];
    }
    if (!item) {
      return;
    }
    const self = this;
    const type = item.getType();
    const items = self.get(item.getType() + 's');
    const index = items.indexOf(item);
    items.splice(index, 1);
    delete this.get('itemById')[item.get('id')];
    if (type === 'node') {
      Util.each(item.getEdges(), edge => {
        self.remove(edge);
      });
    }
    item.destroy();
    this._autoPaint();
  }
  data(data) {
    this.set('data', data);
  }
  refresh(item) {
    const self = this;
    if (item) {
      item.refresh();
    } else {
      const nodes = self.get('nodes');
      const edges = self.get('edges');
      Util.each(edges, edge => {
        edge.refresh();
      });
      Util.each(nodes, node => {
        node.refresh();
      });
    }
    self._autoPaint();
  }
  render() {
    const self = this;
    const data = this.get('data');
    if (!data) {
      throw new Error('data must be defined first');
    }
    this.clear();
    this.emit('beforerender');
    const autoPaint = this.get('autoPaint');
    this.set('autoPaint', false);
    Util.each(data.nodes, node => {
      self.add('node', node);
    });
    Util.each(data.edges, edge => {
      self.add('edge', edge);
    });
    if (self.get('fitView')) {
      self.get('viewController')._fitView();
    }
    self.paint();
    self.set('autoPaint', autoPaint);
    self.emit('afterrender');
  }
  changeData(data) {
    if (!data) {
      return;
    }
    const autoPaint = this.get('autoPaint');
    const self = this;
    const itemById = this.get('itemById');
    const items = {
      nodes: [],
      edges: []
    };
    this.set('autoPaint', false);
    this._diffItem('node', items, data.nodes);
    this._diffItem('edge', items, data.edges);
    Util.each(itemById, (item, id) => {
      if (items.nodes.indexOf(item) < 0 && items.edges.indexOf(item) < 0) {
        delete itemById[id];
        self.remove(item);
      }
    });
    this.node = items.node;
    this.edge = items.edge;
    this.paint();
    this.set('autoPaint', autoPaint);
    return this;
  }
  _diffItem(type, items, models) {
    const self = this;
    let item;
    const itemById = this.get('itemById');
    const itemType = Util.upperFirst(type);
    Util.each(models, model => {
      item = itemById[model.id];
      if (item) {
        self.update(item, model);
      } else {
        item = new Item[itemType](model);
        itemById[item.get('id')] = item;
      }
      items[type + 's'].push(item);
    });
  }
  paint() {
    this.emit('beforepaint');
    this.get('canvas').draw();
    this.emit('afterpaint');
  }
  _autoPaint() {
    if (this.get('autoPaint')) {
      this.paint();
    }
  }
  /**
   * @return {object} data
   */
  save() {
    const nodes = [];
    const edges = [];
    Util.each(this.node, node => {
      nodes.push(node.get('model'));
    });
    Util.each(this.edge, edge => {
      edges.push(edge.get('model'));
    });
    return { nodes, edges };
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
    if (minZoom && matrix[0] < minZoom) {
      return;
    }
    if (maxZoom && matrix[0] > maxZoom) {
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
  fitView(padding) {
    if (padding) {
      this.set('fitViewPadding', padding);
    }
    this.get('viewController')._fitView();
    this.paint();
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
  getCurrentMode() {
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
    this.get('viewController').focus(item);
    this._autoPaint();
  }
  findById(id) {
    return this.get('itemById')[id];
  }
  find(type, fn) {
    let result;
    const items = this.get(type + 's');
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
    Util.each(this.get(type + 's'), (item, i) => {
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
    const canvas = this.get('canvas');
    canvas.clear();
    this._initGroups();
    this.set({ itemById: {}, nodes: [], edges: [] });
    return this;
  }
  destroy() {
    this.clear();
    this.get('eventController').destroy();
    this.canvas.destroy();
    this.destroyed = true;
    return this;
  }
}

module.exports = Graph;
