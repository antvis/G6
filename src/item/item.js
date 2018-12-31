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
    this._cfg = Util.mix(defaultCfg, this.getDefaultCfg(), cfg);
    const group = cfg.group;
    group.set('item', this);
    group.set('id', cfg.id);
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
    const group = this.group;
    // 因为 group 可能会移动，所以必须通过父元素计算才能计算出正确的包围盒
    const bbox = Util.getBBox(keyShape, group);
    bbox.width = bbox.maxX - bbox.minX;
    bbox.height = bbox.maxY - bbox.minY;
    bbox.centerX = (bbox.minX + bbox.maxX) / 2;
    bbox.centerY = (bbox.minY + bbox.maxY) / 2;
    return bbox;
  }

  /**
   * 更新位置，避免整体重绘
   * @param {Object} cfg 位置信息
   */
  updatePoistion(cfg) {
    if (cfg.x && cfg.y) {
      const group = this.get('group');
      group.resetMatrix();
      group.translate(cfg.x, cfg.y);
    }
  }

  // 绘制
  _drawInner() {
    const self = this;
    const shapeFactory = self.get('shapeFactory');
    const group = self.get('group');
    const model = self.get('model');
    const shapeType = model.shape;
    group.clear();

    if (!shapeFactory) {
      return;
    }
    self.updatePoistion(model);
    const cfg = this.getDrawCfg(model); // 可能会附加额外信息
    const keyShape = shapeFactory.draw(shapeType, cfg, group);
    const states = self.get('states');
    if (keyShape) {
      keyShape.isKeyShape = true;
      self.set('keyShape', keyShape);
    }
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
  /**
   * 节点的图形容器
   * @return {G.Group} 图形容器
   */
  getContainer() {
    return this.get('group');
  }

  getModel() {
    return this.get('model');
  }

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

  getDrawCfg(model) {
    return model;
  }

  /**
   * 刷新，一般用于处理几种情况
   * 1. model 在外部被改变
   * 2. 边的节点位置发生改变，需要重新计算边
   */
  refresh() {
    this.update(); // 更新时不设置任何属性
  }

  /**
   * 更新元素
   * @internal 仅提供给 Graph 使用，外部直接调用 graph.update 接口
   * @param  {Object} cfg 配置项，可以是增量信息
   */
  update(cfg) {
    const model = this.get('model');
    const shapeFactory = this.get('shapeFactory');
    const shape = model.shape;
    const newModel = Util.mix({}, model, cfg);
    // 判定是否允许更新
    // 1. 注册的元素（node, edge）允许更新
    // 2. 更新的信息中没有指定 shape
    // 3. 更新信息中指定了 shape 同时等于原先的 shape
    if (shapeFactory.shouldUpdate(shape) && newModel.shape === shape) {
      const updateCfg = this.getDrawCfg(newModel);
      // 如果 x,y 发生改变，则重置位置
      if (newModel.x !== model.x || newModel.y !== model.y) {
        this.updatePoistion(newModel);
      }
      shapeFactory.update(shape, updateCfg, this);
      // 设置 model 在更新后，防止在更新时取原始 model
      this.set('model', newModel);
    } else { // 如果不满足上面 3 种状态，重新绘制
      this.set('model', newModel);
      // 绘制元素时，需要最新的 model
      this.draw();
    }
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
    return this.bbox || this._calculateBBox();
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
   * 更改是否显示
   * @param  {Boolean} visible 是否显示
   */
  changeVisible(visible) {
    const group = this.get('group');
    if (visible) {
      group.show();
    } else {
      group.hide();
    }
    this.set('visible', visible);
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
