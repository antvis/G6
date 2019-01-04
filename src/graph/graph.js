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
const NODE = 'node';
const EDGE = 'edge';

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
    const itemController = new Controller.Item(this);
    this.set({ eventController, viewController, modeController, itemController });
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

  /**
   * 更新元素
   * @param {string|object} item 元素id或元素实例
   * @param {object} cfg 需要更新的数据
   * @return {object} 元素实例
   */
  update(item, cfg) {
    return this.updateItem(item, cfg);
  }

  /**
   * 更新元素
   * @param {string|object} item 元素id或元素实例
   * @param {object} cfg 需要更新的数据
   * @return {object} 元素实例
   */
  updateItem(item, cfg) {
    return this.get('itemController').updateItem(item, cfg);
  }

  /**
   * 设置元素状态
   * @param {string|object} item 元素id或元素实例
   * @param {string} state 状态
   * @param {boolean} enabled 是否启用状态
   * @return {object} 元素实例
   */
  setItemState(item, state, enabled) {
    return this.get('itemController').setItemState(item, state, enabled);
  }

  /**
   * 新增元素
   * @param {string} type 元素类型(node | edge)
   * @param {object} model 元素数据模型
   * @return {object} 元素实例
   */
  add(type, model) {
    return this.addItem(type, model);
  }

  /**
   * 新增元素
   * @param {string} type 元素类型(node | edge)
   * @param {object} model 元素数据模型
   * @return {object} 元素实例
   */
  addItem(type, model) {
    return this.get('itemController').addItem(type, model);
  }

  /**
   * 删除元素
   * @param {string|object} item 元素id或元素实例
   */
  remove(item) {
    this.removeItem(item);
  }

  /**
   * 删除元素
   * @param {string|object} item 元素id或元素实例
   */
  removeItem(item) {
    this.get('itemController').removeItem(item);
  }

  /**
   * 设置视图初始化数据
   * @param {object} data 初始化数据
   */
  data(data) {
    this.set('data', data);
  }

  /**
   * 刷新元素
   * @param {string|object} item 元素id或元素实例
   * @return {object} 被刷新元素实例
   */
  refreshItem(item) {
    return this.get('itemController').refreshItem(item);
  }

  /**
   * 刷新现有视图
   */
  refresh() {
    const self = this;
    self.emit('beforegraphrefresh');
    const nodes = self.get('nodes');
    const edges = self.get('edges');
    Util.each(edges, edge => {
      edge.refresh();
    });
    Util.each(nodes, node => {
      node.refresh();
    });
    self.emit('aftergraphrefresh');
    self.autoPaint();
  }

  /**
   * 根据data接口的数据渲染视图
   */
  render() {
    const self = this;
    const data = this.get('data');
    if (!data) {
      throw new Error('data must be defined first');
    }
    this.clear();
    this.emit('beforerender');
    const autoPaint = this.get('autoPaint');
    this.setAutoPaint(false);
    Util.each(data.nodes, node => {
      self.add(NODE, node);
    });
    Util.each(data.edges, edge => {
      self.add(EDGE, edge);
    });
    if (self.get('fitView')) {
      self.get('viewController')._fitView();
    }
    self.paint();
    self.setAutoPaint(autoPaint);
    self.emit('afterrender');
  }

  /**
   * 更改源数据，根据新数据重新渲染视图
   * @param {object} data 源数据
   * @return {object} this
   */
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
    this.setAutoPaint(false);
    this._diffItems(NODE, items, data.nodes);
    this._diffItems(EDGE, items, data.edges);
    Util.each(itemById, (item, id) => {
      if (items.nodes.indexOf(item) < 0 && items.edges.indexOf(item) < 0) {
        delete itemById[id];
        self.remove(item);
      }
    });
    this.node = items.node;
    this.edge = items.edge;
    this.paint();
    this.setAutoPaint(autoPaint);
    return this;
  }
  _diffItems(type, items, models) {
    const self = this;
    let item;
    const itemById = this.get('itemById');
    const itemType = Util.upperFirst(type);
    Util.each(models, model => {
      item = itemById[model.id];
      if (item) {
        self.updateItem(item, model);
      } else {
        item = new Item[itemType](model);
        itemById[item.get('id')] = item;
      }
      items[type + 's'].push(item);
    });
  }

  /**
   * 仅画布重新绘制
   */
  paint() {
    this.emit('beforepaint');
    this.get('canvas').draw();
    this.emit('afterpaint');
  }

  /**
   * 自动重绘
   * @internal 仅供内部更新机制调用，外部根据需求调用 render 或 paint 接口
   */
  autoPaint() {
    if (this.get('autoPaint')) {
      this.paint();
    }
  }

  /**
   * 导出图数据
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
   * 改变画布大小
   * @param  {number} width  画布宽度
   * @param  {number} height 画布高度
   * @return {object} this
   */
  changeSize(width, height) {
    this.get('viewController').changeSize(width, height);
    this.autoPaint();
    return this;
  }

  /**
   * 改变画布大小
   * @private 仅供内部更新视口使用
   * @param {array} matrix group矩阵
   */
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

  /**
   * 平移画布
   * @param {number} dx 水平方向位移
   * @param {number} dy 垂直方向位移
   */
  translate(dx, dy) {
    this.get('group').translate(dx, dy);
    this.autoPaint();
  }

  /**
   * 平移画布到某点
   * @param {number} x 水平坐标
   * @param {number} y 垂直坐标
   */
  moveTo(x, y) {
    this.get('group').move(x, y);
  }

  /**
   * 调整视口适应视图
   * @param {object} padding 四周围边距
   */
  fitView(padding) {
    if (padding) {
      this.set('fitViewPadding', padding);
    }
    this.get('viewController')._fitView();
    this.paint();
  }

  /**
   * 新增行为
   * @param {string|array} behaviors 添加的行为
   * @param {string|array} modes 添加到对应的模式
   * @return {object} this
   */
  addBehaviors(behaviors, modes) {
    this.get('modeController').manipulateBehaviors(behaviors, modes, true);
    return this;
  }

  /**
   * 移除行为
   * @param {string|array} behaviors 移除的行为
   * @param {string|array} modes 从指定的模式中移除
   * @return {object} this
   */
  removeBehaviors(behaviors, modes) {
    this.get('modeController').manipulateBehaviors(behaviors, modes, false);
    return this;
  }

  /**
   * 切换行为模式
   * @param {string} mode 指定模式
   * @return {object} this
   */
  setMode(mode) {
    this.set('mode', mode);
    this.get('modeController').setMode(mode);
    return this;
  }

  /**
   * 获取当前的行为模式
   * @return {string} 当前行为模式
   */
  getCurrentMode() {
    return this.get('mode');
  }

  /**
   * 获取当前视口伸缩比例
   * @return {number} 比例
   */
  getZoom() {
    return this.get('group').getMatrix()[0];
  }

  /**
   * 伸缩视口
   * @param {number} ratio 伸缩比例
   * @param {object} center 以center的x, y坐标为中心缩放
   */
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
    this.autoPaint();
  }

  /**
   * 将元素移动到视口中心
   * @param {string|obect} item 指定元素
   */
  focusItem(item) {
    this.get('viewController').focus(item);
    this.autoPaint();
  }

  /**
   * 显示元素
   * @param {string|obect} item 指定元素
   */
  showItem(item) {
    this.get('itemController').changeItemVisibility(item, true);
  }

  /**
   * 隐藏元素
   * @param {string|obect} item 指定元素
   */
  hideItem(item) {
    this.get('itemController').changeItemVisibility(item, false);
  }

  /**
   * 查找对应id的元素
   * @param {string} id 元素id
   * @return {object} 元素实例
   */
  findById(id) {
    return this.get('itemById')[id];
  }

  /**
   * 根据对应规则查找单个元素
   * @param {string} type 元素类型(node|edge)
   * @param {string} fn 指定规则
   * @return {object} 元素实例
   */
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

  /**
   * 查找所有满足规则的元素
   * @param {string} type 元素类型(node|edge)
   * @param {string} fn 指定规则
   * @return {array} 元素实例
   */
  findAll(type, fn) {
    const result = [];
    Util.each(this.get(type + 's'), (item, i) => {
      if (fn(item, i)) {
        result.push(item);
      }
    });
    return result;
  }

  /**
   * 查找所有处于指定状态的元素
   * @param {string} type 元素类型(node|edge)
   * @param {string} state z状态
   * @return {object} 元素实例
   */
  findAllByState(type, state) {
    return this.findAll(type, item => {
      return item.hasState(state);
    });
  }

  /**
   * 设置是否在更新/刷新后自动重绘
   * @param {boolean} auto 自动重绘
   */
  setAutoPaint(auto) {
    this.set('autoPaint', auto);
  }

  /**
   * 清除画布元素
   * @return {object} this
   */
  clear() {
    const canvas = this.get('canvas');
    canvas.clear();
    this._initGroups();
    this.set({ itemById: {}, nodes: [], edges: [] });
    return this;
  }

  /**
   * 销毁画布
   */
  destroy() {
    this.clear();
    this.get('eventController').destroy();
    this.canvas.destroy();
    this.destroyed = true;
  }
}

module.exports = Graph;
