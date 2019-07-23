/**
 * @fileOverview graph
 * @author huangtonger@aliyun.com
 */

const G = require('@antv/g/lib');
const EventEmitter = G.EventEmitter;
const Util = require('../util');
const Global = require('../global');

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
       * 注册插件
       */
      plugins: [],
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
      itemMap: {},
      /**
       * 边直接连接到节点的中心，不再考虑锚点
       * @type {Boolean}
       */
      linkCenter: false,
      /**
       * 默认的节点配置，data 上定义的配置会覆盖这些配置。例如：
       * defaultNode: {
       *  shape: 'rect',
       *  size: [60, 40]
       * }
       * 若数据项为 { id: 'node', x: 100, y: 100 }
       * 实际创建的节点模型是 { id: 'node', x: 100, y: 100， shape: 'rect', size: [60, 40] }
       * 若数据项为 { id: 'node', x: 100, y: 100, shape: 'circle' }
       * 实际创建的节点模型是 { id: 'node', x: 100, y: 100， shape: 'circle', size: [60, 40] }
       */
      defaultNode: {},
      /**
       * 默认边配置，data 上定义的配置会覆盖这些配置。用法同 defaultNode
       */
      defaultEdge: {},
      /**
       * 节点默认样式，也可以添加状态样式
       * 例如：
       * const graph = new G6.Graph({
       *  nodeStyle: {
       *    default: { fill: '#fff' },
       *    selected: { fill: '#ccc', stroke: '#666' },
       *    active: { lineWidth: 2 }
       *  },
       *  ...
       * });
       *
       */
      nodeStyle: {},
      /**
       * 边默认样式，用法同nodeStyle
       */
      edgeStyle: {},
      /**
       * graph 状态
       */
      states: {},
      /**
       * 是否启用全局动画
       * @type {Boolean}
       */
      animate: false,
      /**
       * 动画设置,仅在 animate 为 true 时有效
       * @type {Object}
       */
      animateCfg: {
        /**
         * 帧回调函数，用于自定义节点运动路径，为空时线性运动
         * @type {Function|null}
         */
        onFrame: null,
        /**
         * 动画时长(ms)
         * @type {Number}
         */
        duration: 500,
        /**
         * 指定动画动效
         * @type {String}
         */
        easing: 'easeLinear'
      },
      callback: null
    };
  }

  constructor(inputCfg) {
    super();
    this._cfg = Util.deepMix(this.getDefaultCfg(), inputCfg);    // merge graph configs
    this._init();
  }
  _init() {
    this._initCanvas();
    const eventController = new Controller.Event(this);
    const viewController = new Controller.View(this);
    const modeController = new Controller.Mode(this);
    const itemController = new Controller.Item(this);
    const stateController = new Controller.State(this);
    this.set({ eventController, viewController, modeController, itemController, stateController });
    this._initPlugins();
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
  _initPlugins() {
    const self = this;
    Util.each(self.get('plugins'), plugin => {
      if (!plugin.destroyed && plugin.initPlugin) {
        plugin.initPlugin(self);
      }
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

  /**
   * 更新元素
   * @param {string|object} item 元素id或元素实例
   * @param {object} cfg 需要更新的数据
   */
  update(item, cfg) {
    this.updateItem(item, cfg);
  }

  /**
   * 更新元素
   * @param {string|object} item 元素id或元素实例
   * @param {object} cfg 需要更新的数据
   */
  updateItem(item, cfg) {
    this.get('itemController').updateItem(item, cfg);
  }

  /**
   * 设置元素状态
   * @param {string|object} item 元素id或元素实例
   * @param {string} state 状态
   * @param {boolean} enabled 是否启用状态
   */
  setItemState(item, state, enabled) {
    if (Util.isString(item)) {
      item = this.findById(item);
    }
    this.get('itemController').setItemState(item, state, enabled);
    this.get('stateController').updateState(item, state, enabled);
  }

  /**
   * 清理元素多个状态
   * @param {string|object} item 元素id或元素实例
   * @param {Array|String|null} states 状态
   */
  clearItemStates(item, states) {
    if (Util.isString(item)) {
      item = this.findById(item);
    }
    this.get('itemController').clearItemStates(item, states);
    if (!states) {
      states = item.get('states');
    }
    this.get('stateController').updateStates(item, states, false);
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
   * 设置各个节点样式，以及在各种状态下节点 keyShape 的样式。
   * 若是自定义节点切在各种状态下
   * graph.node(node => {
   *  return {
   *    default: {
   *      fill: 'red',
   *      opacity: 1
   *    },
   *    selected: {
   *      style: {
   *        fill: 'blue',
   *        opacity: 0.2
   *      }
   *    }
   *  }
   * });
   * @param {function} nodeFn 指定每个节点样式
   */
  node(nodeFn) {
    if (typeof nodeFn === 'function') {
      this.set('nodeMapper', nodeFn);
    }
  }

  /**
   * 设置各个边样式
   * @param {function} edgeFn 指定每个边的样式,用法同 node
   */
  edge(edgeFn) {
    if (typeof edgeFn === 'function') {
      this.set('edgeMapper', edgeFn);
    }
  }

  /**
   * 刷新元素
   * @param {string|object} item 元素id或元素实例
   */
  refreshItem(item) {
    this.get('itemController').refreshItem(item);
  }

  /**
   * 当源数据在外部发生变更时，根据新数据刷新视图。但是不刷新节点位置
   */
  refresh() {
    const self = this;
    const autoPaint = self.get('autoPaint');
    self.setAutoPaint(false);
    self.emit('beforegraphrefresh');
    if (self.get('animate')) {
      self.positionsAnimate();
    } else {
      const nodes = self.get('nodes');
      const edges = self.get('edges');
      Util.each(nodes, node => {
        node.refresh();
      });
      Util.each(edges, edge => {
        edge.refresh();
      });
    }
    self.setAutoPaint(autoPaint);
    self.emit('aftergraphrefresh');
    self.autoPaint();
  }

  /**
   * 当节点位置在外部发生改变时，刷新所有节点位置，重计算边
   */
  refreshPositions() {
    const self = this;
    self.emit('beforegraphrefreshposition');
    const nodes = self.get('nodes');
    const edges = self.get('edges');
    let model;
    Util.each(nodes, node => {
      model = node.getModel();
      node.updatePosition(model);
    });
    Util.each(edges, edge => {
      edge.refresh();
    });
    self.emit('aftergraphrefreshposition');
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
   * 接收数据进行渲染
   * @Param {Object} data 初始化数据
   */
  read(data) {
    this.data(data);
    this.render();
  }

  /**
   * 更改源数据，根据新数据重新渲染视图
   * @param {object} data 源数据
   * @return {object} this
   */
  changeData(data) {
    const self = this;
    if (!data) {
      return this;
    }
    if (!self.get('data')) {
      self.data(data);
      self.render();
    }
    const autoPaint = this.get('autoPaint');
    const itemMap = this.get('itemMap');
    const items = {
      nodes: [],
      edges: []
    };
    this.setAutoPaint(false);
    this._diffItems(NODE, items, data.nodes);
    this._diffItems(EDGE, items, data.edges);
    Util.each(itemMap, (item, id) => {
      if (items.nodes.indexOf(item) < 0 && items.edges.indexOf(item) < 0) {
        delete itemMap[id];
        self.remove(item);
      }
    });
    this.set({ nodes: items.nodes, edges: items.edges });
    if (self.get('animate')) {
      self.positionsAnimate();
    } else {
      this.paint();
    }
    this.setAutoPaint(autoPaint);
    return this;
  }
  _diffItems(type, items, models) {
    const self = this;
    let item;
    const itemMap = this.get('itemMap');
    Util.each(models, model => {
      item = itemMap[model.id];
      if (item) {
        if (self.get('animate') && type === NODE) {
          const containerMatrix = item.getContainer().getMatrix();
          item.set('originAttrs', {
            x: containerMatrix[6],
            y: containerMatrix[7]
          });
        }
        self.updateItem(item, model);
      } else {
        item = self.addItem(type, model);
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
    Util.each(this.get('nodes'), node => {
      nodes.push(node.getModel());
    });
    Util.each(this.get('edges'), edge => {
      edges.push(edge.getModel());
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
   * 平移画布
   * @param {number} dx 水平方向位移
   * @param {number} dy 垂直方向位移
   */
  translate(dx, dy) {
    const group = this.get('group');
    group.translate(dx, dy);
    this.emit('viewportchange', { action: 'translate', matrix: group.getMatrix() });
    this.autoPaint();
  }

  /**
   * 平移画布到某点
   * @param {number} x 水平坐标
   * @param {number} y 垂直坐标
   */
  moveTo(x, y) {
    const group = this.get('group');
    group.move(x, y);
    this.emit('viewportchange', { action: 'move', matrix: group.getMatrix() });
    this.autoPaint();
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
   * 获取当前图中所有节点的item实例
   * @return {array} item数组
   */
  getNodes() {
    return this.get('nodes');
  }

  /**
   * 获取当前图中所有边的item实例
   * @return {array} item数组
   */
  getEdges() {
    return this.get('edges');
  }

  /**
   * 伸缩视口
   * @param {number} ratio 伸缩比例
   * @param {object} center 以center的x, y坐标为中心缩放
   */
  zoom(ratio, center) {
    const matrix = Util.clone(this.get('group').getMatrix());
    const minZoom = this.get('minZoom');
    const maxZoom = this.get('maxZoom');
    if (center) {
      Util.mat3.translate(matrix, matrix, [ -center.x, -center.y ]);
      Util.mat3.scale(matrix, matrix, [ ratio, ratio ]);
      Util.mat3.translate(matrix, matrix, [ center.x, center.y ]);
    } else {
      Util.mat3.scale(matrix, matrix, [ ratio, ratio ]);
    }
    if (minZoom && matrix[0] < minZoom) {
      return;
    }
    if (maxZoom && matrix[0] > maxZoom) {
      return;
    }
    this.get('group').setMatrix(matrix);
    this.emit('viewportchange', { action: 'zoom', matrix });
    this.autoPaint();
  }

  /**
   * 伸缩视口到一固定比例
   * @param {number} toRatio 伸缩比例
   * @param {object} center 以center的x, y坐标为中心缩放
   */
  zoomTo(toRatio, center) {
    const ratio = toRatio / this.getZoom();
    this.zoom(ratio, center);
  }

  /**
   * 根据 graph 上的 animateCfg 进行视图中节点位置动画接口
   */
  positionsAnimate() {
    const self = this;
    self.emit('beforeanimate');
    const animateCfg = self.get('animateCfg');
    const onFrame = animateCfg.onFrame;
    const nodes = self.getNodes();
    const toNodes = nodes.map(node => {
      const model = node.getModel();
      return {
        id: model.id,
        x: model.x,
        y: model.y
      };
    });
    if (self.isAnimating()) {
      self.stopAnimate();
    }
    self.get('canvas').animate({
      onFrame(ratio) {
        Util.each(toNodes, data => {
          const node = self.findById(data.id);
          if (!node || node.destroyed) {
            return;
          }
          let originAttrs = node.get('originAttrs');
          const model = node.get('model');
          if (!originAttrs) {
            const containerMatrix = node.getContainer().getMatrix();
            originAttrs = {
              x: containerMatrix[6],
              y: containerMatrix[7]
            };
            node.set('originAttrs', originAttrs);
          }
          if (onFrame) {
            const attrs = onFrame(node, ratio, data, originAttrs);
            node.set('model', Util.mix(model, attrs));
          } else {
            model.x = originAttrs.x + (data.x - originAttrs.x) * ratio;
            model.y = originAttrs.y + (data.y - originAttrs.y) * ratio;
          }
        });
        self.refreshPositions();
      }
    }, animateCfg.duration, animateCfg.easing, () => {
      Util.each(nodes, node => {
        node.set('originAttrs', null);
      });
      if (animateCfg.callback) {
        animateCfg.callback();
      }
      self.emit('afteranimate');
      self.animating = false;
    });
  }

  stopAnimate() {
    this.get('canvas').stopAnimate();
  }

  isAnimating() {
    return this.animating;
  }

  /**
   * 将元素移动到视口中心
   * @param {string|object} item 指定元素
   */
  focusItem(item) {
    this.get('viewController').focus(item);
    this.autoPaint();
  }

  /**
   * 将屏幕坐标转换为视口坐标
   * @param {number} clientX 屏幕x坐标
   * @param {number} clientY 屏幕y坐标
   * @return {object} 视口坐标
   */
  getPointByClient(clientX, clientY) {
    return this.get('viewController').getPointByClient(clientX, clientY);
  }

  /**
   * 将视口坐标转换为屏幕坐标
   * @param {number} x 视口x坐标
   * @param {number} y 视口y坐标
   * @return {object} 视口坐标
   */
  getClientByPoint(x, y) {
    return this.get('viewController').getClientByPoint(x, y);
  }

  /**
   * 将画布坐标转换为视口坐标
   * @param {number} canvasX 屏幕x坐标
   * @param {number} canvasY 屏幕y坐标
   * @return {object} 视口坐标
   */
  getPointByCanvas(canvasX, canvasY) {
    return this.get('viewController').getPointByCanvas(canvasX, canvasY);
  }

  /**
   * 将视口坐标转换为画布坐标
   * @param {number} x 屏幕x坐标
   * @param {number} y 屏幕y坐标
   * @return {object} 画布坐标
   */
  getCanvasByPoint(x, y) {
    return this.get('viewController').getCanvasByPoint(x, y);
  }

  /**
   * 显示元素
   * @param {string|object} item 指定元素
   */
  showItem(item) {
    this.get('itemController').changeItemVisibility(item, true);
  }

  /**
   * 隐藏元素
   * @param {string|object} item 指定元素
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
    return this.get('itemMap')[id];
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
   * 返回图表的 dataUrl 用于生成图片
   * @return {string/Object} 图片 dataURL
   */
  toDataURL() {
    const canvas = this.get('canvas');
    const renderer = canvas.getRenderer();
    const canvasDom = canvas.get('el');
    let dataURL = '';
    if (renderer === 'svg') {
      const clone = canvasDom.cloneNode(true);
      const svgDocType = document.implementation.createDocumentType(
        'svg', '-//W3C//DTD SVG 1.1//EN', 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'
      );
      const svgDoc = document.implementation.createDocument('http://www.w3.org/2000/svg', 'svg', svgDocType);
      svgDoc.replaceChild(clone, svgDoc.documentElement);
      const svgData = (new XMLSerializer()).serializeToString(svgDoc);
      dataURL = 'data:image/svg+xml;charset=utf8,' + encodeURIComponent(svgData);
    } else if (renderer === 'canvas') {
      dataURL = canvasDom.toDataURL('image/png');
    }
    return dataURL;
  }

  /**
   * 画布导出图片
   * @param {String} name 图片的名称
   */
  downloadImage(name) {
    const self = this;
    if (self.isAnimating()) {
      self.stopAnimate();
    }
    const canvas = self.get('canvas');
    const renderer = canvas.getRenderer();
    const fileName = (name || 'graph') + (renderer === 'svg' ? '.svg' : '.png');
    const link = document.createElement('a');
    setTimeout(() => {
      const dataURL = self.toDataURL();
      if (window.Blob && window.URL && renderer !== 'svg') {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const blobObj = new Blob([ u8arr ], { type: mime });
        if (window.navigator.msSaveBlob) {
          window.navigator.msSaveBlob(blobObj, fileName);
        } else {
          link.addEventListener('click', function() {
            link.download = fileName;
            link.href = window.URL.createObjectURL(blobObj);
          });
        }
      } else {
        link.addEventListener('click', function() {
          link.download = fileName;
          link.href = dataURL;
        });
      }
      const e = document.createEvent('MouseEvents');
      e.initEvent('click', false, false);
      link.dispatchEvent(e);
    }, 16);
  }


  /**
   * 添加插件
   * @param {object} plugin 插件实例
   */
  addPlugin(plugin) {
    const self = this;
    if (plugin.destroyed) {
      return;
    }
    self.get('plugins').push(plugin);
    plugin.initPlugin(self);
  }

  /**
   * 添加插件
   * @param {object} plugin 插件实例
   */
  removePlugin(plugin) {
    const plugins = this.get('plugins');
    const index = plugins.indexOf(plugin);
    if (index >= 0) {
      plugin.destroyPlugin();
      plugins.splice(index, 1);
    }
  }

  /**
   * 清除画布元素
   * @return {object} this
   */
  clear() {
    const canvas = this.get('canvas');
    canvas.clear();
    this._initGroups();
    this.set({ itemMap: {}, nodes: [], edges: [] });
    return this;
  }

  /**
   * 销毁画布
   */
  destroy() {
    this.clear();
    Util.each(this.get('plugins'), plugin => {
      plugin.destroyPlugin();
    });
    this.get('eventController').destroy();
    this.get('itemController').destroy();
    this.get('modeController').destroy();
    this.get('viewController').destroy();
    this.get('stateController').destroy();
    this.get('canvas').destroy();
    this._cfg = null;
    this.destroyed = true;
  }
}

module.exports = Graph;
