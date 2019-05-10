/**
 * @fileOverview item
 * @author huangtonger@aliyun.com
 */

const Util = require('../util/');
const Shape = require('../shape');
const Global = require('../global');
const CACHE_BBOX = 'bboxCache';
const GLOBAL_STATE_STYLE_SUFFIX = 'StateStyle';
const NAME_STYLE = 'Style'; // cache 缓存的状态属性的名字
const RESERVED_STYLES = [ 'fillStyle', 'strokeStyle', 'path', 'points', 'img', 'symbol' ];

class Item {
  constructor(cfg) {
    const defaultCfg = {
      /**
       * id
       * @type {string}
       */
      id: null,

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
    this._cfg = Util.mix(defaultCfg, this.getDefaultCfg(), cfg);
    const group = cfg.group;
    group.set('item', this);
    let id = this.get('model').id;
    if (!id || id === '') {
      id = Util.uniqueId(this.get('type'));
    }
    this.set('id', id);
    group.set('id', id);
    this.init();
    this.draw();
  }

  /**
   * 是否是 Item 对象，悬空边情况下进行判定
   * @return {Boolean} 是否是 Item 对象
   */
  isItem() {
    return true;
  }

  /**
   * 获取属性
   * @internal 仅内部类使用
   * @param  {String} key 属性名
   * @return {*} 属性值
   */
  get(key) {
    return this._cfg[key];
  }

  /**
   * 设置属性
   * @internal 仅内部类使用
   * @param {String|Object} key 属性名，也可以是对象
   * @param {*} val 属性值
   */
  set(key, val) {
    if (Util.isPlainObject(key)) {
      this._cfg = Util.mix({}, this._cfg, key);
    } else {
      this._cfg[key] = val;
    }
  }
  /**
   * 获取默认的配置项
   * @protected 供子类复写
   * @return {Object} 配置项
   */
  getDefaultCfg() {
    return {};
  }
  /**
   * 初始化
   * @protected
   */
  init() {
    const shapeFactory = Shape.getFactory(this.get('type'));
    this.set('shapeFactory', shapeFactory);
  }
  // 根据 keyshape 计算包围盒
  _calculateBBox() {
    const keyShape = this.get('keyShape');
    const group = this.get('group');
    // 因为 group 可能会移动，所以必须通过父元素计算才能计算出正确的包围盒
    const bbox = Util.getBBox(keyShape, group);
    bbox.x = bbox.minX;
    bbox.y = bbox.minY;
    bbox.width = bbox.maxX - bbox.minX;
    bbox.height = bbox.maxY - bbox.minY;
    bbox.centerX = (bbox.minX + bbox.maxX) / 2;
    bbox.centerY = (bbox.minY + bbox.maxY) / 2;
    return bbox;
  }

  // 绘制
  _drawInner() {
    const self = this;
    const shapeFactory = self.get('shapeFactory');
    const group = self.get('group');
    const model = self.get('model');
    group.clear();

    if (!shapeFactory) {
      return;
    }
    self.updatePosition(model);
    const cfg = self.getShapeCfg(model); // 可能会附加额外信息
    const shapeType = cfg.shape;
    const keyShape = shapeFactory.draw(shapeType, cfg, group);
    if (keyShape) {
      keyShape.isKeyShape = true;
      self.set('keyShape', keyShape);
      self.set('originStyle', this.getKeyShapeStyle());
    }
    // 防止由于用户外部修改 model 中的 shape 导致 shape 不更新
    this.set('currentShape', shapeType);
    this._resetStates(shapeFactory, shapeType);
  }

  getKeyShapeStyle() {
    const keyShape = this.getKeyShape();
    if (keyShape) {
      const styles = {};
      Util.each(keyShape.attr(), (val, key) => {
        if (RESERVED_STYLES.indexOf(key) < 0) {
          styles[key] = val;
        }
      });
      return styles;
    }
  }

  _resetStates(shapeFactory, shapeType) {
    const self = this;
    const states = self.get('states');
    Util.each(states, state => {
      shapeFactory.setState(shapeType, state, true, self);
    });
  }

  /**
   * 获取当前元素的所有状态
   * @return {Array} 元素的所有状态
   */
  getStates() {
    return this.get('states');
  }

  /**
   * 当前元素是否处于某状态
   * @param {String} state 状态名
   * @return {Boolean} 是否处于某状态
   */
  hasState(state) {
    return this.get('states').indexOf(state) >= 0;
  }

  getStateStyle(state) {
    const self = this;
    // Global.nodeStateStyle
    const globalStyle = Global[self.getType() + GLOBAL_STATE_STYLE_SUFFIX][state];
    const styles = this.get('styles');
    const defaultStyle = styles && styles[state];
    // 状态名 + style（activeStyle) 存储在 item 中，如果 item 中不存在这些信息，则使用默认的样式
    const fieldName = state + NAME_STYLE;
    return Util.mix({}, globalStyle, defaultStyle, self.get(fieldName));
  }

  getOriginStyle() {
    return this.get('originStyle');
  }

  getCurrentStatesStyle() {
    const self = this;
    const originStyle = Util.mix({}, self.getOriginStyle());
    Util.each(self.getStates(), state => {
      Util.mix(originStyle, self.getStateStyle(state));
    });
    return originStyle;
  }

  /**
   * 更改元素状态， visible 不属于这个范畴
   * @internal 仅提供内部类 graph 使用
   * @param {String} state 状态名
   * @param {Boolean} enable 节点状态值
   */
  setState(state, enable) {
    const states = this.get('states');
    const shapeFactory = this.get('shapeFactory');
    const index = states.indexOf(state);
    if (enable) {
      if (index > -1) {
        return;
      }
      states.push(state);
    } else if (index > -1) {
      states.splice(index, 1);
    }
    if (shapeFactory) {
      const model = this.get('model');
      shapeFactory.setState(model.shape, state, enable, this);
    }
  }

  clearStates(states) {
    const self = this;
    const originStates = self.getStates();
    const shapeFactory = self.get('shapeFactory');
    const shape = self.get('model').shape;
    if (!states) {
      self.set('states', []);
      shapeFactory.setState(shape, originStates[0], false, self);
      return;
    }
    if (Util.isString(states)) {
      states = [ states ];
    }
    const newStates = originStates.filter(state => {
      shapeFactory.setState(shape, state, false, self);
      if (states.indexOf(state) >= 0) {
        return false;
      }
      return true;
    });
    self.set('states', newStates);
  }

  /**
   * 节点的图形容器
   * @return {G.Group} 图形容器
   */
  getContainer() {
    return this.get('group');
  }

  /**
   * 节点的关键形状，用于计算节点大小，连线截距等
   * @return {G.Shape} 关键形状
   */
  getKeyShape() {
    return this.get('keyShape');
  }

  /**
   * 节点数据模型
   * @return {Object} 数据模型
   */
  getModel() {
    return this.get('model');
  }

  /**
   * 节点类型
   * @return {string} 节点的类型
   */
  getType() {
    return this.get('type');
  }


  /**
   * 渲染前的逻辑，提供给子类复写
   * @protected
   */
  beforeDraw() {

  }
  /**
   * 渲染后的逻辑，提供给子类复写
   * @protected
   */
  afterDraw() {

  }

  getShapeCfg(model) {
    const styles = this.get('styles');
    if (styles && styles.default) {
      // merge graph的item样式与数据模型中的样式
      const newModel = Util.mix({}, model);
      newModel.style = Util.mix({}, styles.default, model.style);
      return newModel;
    }
    return model;
  }

  /**
   * 刷新一般用于处理几种情况
   * 1. item model 在外部被改变
   * 2. 边的节点位置发生改变，需要重新计算边
   *
   * 因为数据从外部被修改无法判断一些属性是否被修改，直接走位置和 shape 的更新
   */
  refresh() {
    const model = this.get('model');
    // 更新元素位置
    this.updatePosition(model);
    // 更新元素内容，样式
    this.updateShape();
    // 做一些更新之后的操作
    this.afterUpdate();
    // 清除缓存
    this.clearCache();
  }

  /**
   * 将更新应用到 model 上，刷新属性
   * @internal 仅提供给 Graph 使用，外部直接调用 graph.update 接口
   * @param  {Object} cfg       配置项，可以是增量信息
   */
  update(cfg) {
    const model = this.get('model');
    const originPosition = { x: model.x, y: model.y };
    // 直接将更新合到原数据模型上，可以保证用户在外部修改源数据然后刷新时的样式符合期待。
    Util.mix(model, cfg);
    const onlyMove = this._isOnlyMove(cfg);
    // 仅仅移动位置时，既不更新，也不重绘
    if (onlyMove) {
      this.updatePosition(model);
    } else {
      // 如果 x,y 有变化，先重置位置
      if (originPosition.x !== model.x || originPosition.y !== model.y) {
        this.updatePosition(model);
      }
      this.updateShape();
    }
    this.afterUpdate();
    this.clearCache();
  }

  /**
   * 更新元素内容，样式
   */
  updateShape() {
    const shapeFactory = this.get('shapeFactory');
    const model = this.get('model');
    const shape = model.shape;
    // 判定是否允许更新
    // 1. 注册的节点允许更新
    // 2. 更新后的 shape 等于原先的 shape
    if (shapeFactory.shouldUpdate(shape) && shape === this.get('currentShape')) {
      const updateCfg = this.getShapeCfg(model);
      shapeFactory.update(shape, updateCfg, this);
    } else {
      // 如果不满足上面两种状态，重新绘制
      this.draw();
    }
    this.set('originStyle', this.getKeyShapeStyle());
    // 更新后重置节点状态
    this._resetStates(shapeFactory, shape);
  }

  /**
   * 更新位置，避免整体重绘
   * @param {object} cfg 待更新数据
   */
  updatePosition(cfg) {
    const model = this.get('model');

    const x = Util.isNil(cfg.x) ? model.x : cfg.x;
    const y = Util.isNil(cfg.y) ? model.y : cfg.y;

    const group = this.get('group');
    if (Util.isNil(x) || Util.isNil(y)) {
      return;
    }
    group.resetMatrix();
    group.translate(x, y);
    model.x = x;
    model.y = y;
    this.clearCache();     // 位置更新后需要清除缓存
  }

  /**
   * 更新后做一些工作
   * @protected
   */
  afterUpdate() {

  }

  /**
   * 更新/刷新等操作后，清除 cache
   */
  clearCache() {
    this.set(CACHE_BBOX, null);
  }

  /**
   * 绘制元素
   */
  draw() {
    this.beforeDraw();
    this._drawInner();
    this.afterDraw();
  }

  /**
   * 获取元素的包围盒
   * @return {Object} 包含 x,y,width,height, centerX, centerY
   */
  getBBox() {
    let bbox = this.get(CACHE_BBOX);
    if (!bbox) { // 计算 bbox 开销有些大，缓存
      bbox = this._calculateBBox();
      this.set(CACHE_BBOX, bbox);
    }
    return bbox;
  }

  /**
   * 将元素放到最前面
   */
  toFront() {
    this.get('group').toFront();
  }

  /**
   * 将元素放到最后面
   */
  toBack() {
    this.get('group').toBack();
  }

  /**
   * 显示元素
   */
  show() {
    this.changeVisibility(true);
  }

  /**
   * 隐藏元素
   */
  hide() {
    this.changeVisibility(false);
  }

  /**
   * 更改是否显示
   * @param  {Boolean} visible 是否显示
   */
  changeVisibility(visible) {
    const group = this.get('group');
    if (visible) {
      group.show();
    } else {
      group.hide();
    }
    this.set('visible', visible);
  }

  /**
   * 是否拾取及出发该元素的交互事件
   * @param {Boolean} enable 标识位
   */
  enableCapture(enable) {
    const group = this.get('group');
    group && group.attr('capture', enable);
  }

  isVisible() {
    return this.get('visible');
  }
  /**
   * 析构函数
   */
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
