/**
 * @fileOverview 自定义 Shape 的基类
 * @author dxq613@gmail.com
 */


const Util = require('../util/');
require('./extend/group');
const Shape = {};
const cache = {}; // ucfirst 开销过大，进行缓存
// 首字母大写
function ucfirst(str) {
  return cache[str] || Util.upperFirst(str);
}

/**
 * 工厂方法的基类
 * @type Shape.FactoryBase
 */
const ShapeFactoryBase = {
  /**
   * 默认的形状，当没有指定/匹配 shapeType 时，使用默认的
   * @type {String}
   */
  defaultShapeType: null,
  /**
   * 获取绘制 Shape 的工具类，无状态
   * @param  {String} type 类型
   * @return {Object} 工具类
   */
  getShape(type) {
    const self = this;
    const shape = self[type] || self[self.defaultShapeType];
    return shape;
  },
  /**
   * 绘制图形
   * @param  {String} type  类型
   * @param  {Object} cfg 配置项
   * @param  {G.Group} group 图形的分组
   * @return {G.Shape} 图形对象
   */
  draw(type, cfg, group) {
    const shape = this.getShape(type);
    const rst = shape.draw(cfg, group);
    shape.afterDraw(cfg, group, rst);
    return rst;
  },
  /**
   * 更新
   * @param  {String} type  类型
   * @param  {Object} cfg 配置项
   * @param  {G6.Item} item 节点、边、分组等
   */
  update(type, cfg, item) {
    const shape = this.getShape(type);
    if (shape.update) { // 防止没定义 update 函数
      shape.update(cfg, item);
      shape.afterUpdate(cfg, item);
    }
  },
  /**
   * 设置状态
   * @param {String} type  类型
   * @param {String} name  状态名
   * @param {String} value 状态值
   * @param {G6.Item} item  节点、边、分组等
   */
  setState(type, name, value, item) {
    const shape = this.getShape(type);
    shape.setState(name, value, item);
  },
  /**
   * 是否允许更新，不重新绘制图形
   * @param  {String} type 类型
   * @return {Boolean} 是否允许使用更新
   */
  shouldUpdate(type) {
    const shape = this.getShape(type);
    return !!shape.update;
  },
  getControlPoints(type, cfg) {
    const shape = this.getShape(type);
    return shape.getControlPoints(cfg);
  },
  /**
   * 获取控制点
   * @param {String} type 节点、边类型
   * @param  {Object} cfg 节点、边的配置项
   * @return {Array|null} 控制点的数组,如果为 null，则没有控制点
   */
  getAnchorPoints(type, cfg) {
    const shape = this.getShape(type);
    return shape.getAnchorPoints(cfg);
  }
};

/**
 * 绘制元素的工具类基类
 * @class Shape.ShapeBase
 */
const ShapeBase = {
  /**
   * 绘制
   */
  draw(/* cfg, group */) {

  },
  /**
   * 绘制完成后的操作，便于用户继承现有的节点、边
   */
  afterDraw(/* cfg, group */) {

  },
  // update(cfg, item) // 默认不定义
  afterUpdate(/* cfg, item */) {

  },
  /**
   * 设置节点、边状态
   */
  setState(/* name, value, item */) {

  },
  /**
   * 获取控制点
   * @param  {Object} cfg 节点、边的配置项
   * @return {Array|null} 控制点的数组,如果为 null，则没有控制点
   */
  getControlPoints(cfg) {
    return cfg.controlPoints;
  },
  /**
   * 获取控制点
   * @param  {Object} cfg 节点、边的配置项
   * @return {Array|null} 控制点的数组,如果为 null，则没有控制点
   */
  getAnchorPoints(cfg) {
    return cfg.anchorPoints;
  }
  /* 如果没定义 update 方法，每次都调用 draw 方法
  update(cfg, item) {

  }
  */
};

// 注册 Geometry 获取图形的入口
Shape.registerFactory = function(factoryType, cfg) {
  const className = ucfirst(factoryType);
  const shapeFactory = Util.mix({}, ShapeFactoryBase, cfg);
  Shape[className] = shapeFactory;
  shapeFactory.className = className;
  addRegister(shapeFactory);
  return shapeFactory;
};

// 统一 registerNode, registerEdge, registerGuide 的实现
function addRegister(shapeFactory) {
  const functionName = 'register' + shapeFactory.className;
  Shape[functionName] = function(shapeType, cfg, extendShapeType) {
    const extendShape = extendShapeType ? shapeFactory.getShape(extendShapeType) : ShapeBase;
    const shapeObj = Util.mix({}, extendShape, cfg);
    shapeObj.type = shapeType;
    shapeFactory[shapeType] = shapeObj;
    return shapeObj;
  };
}

// 获得 ShapeFactory
Shape.getFactory = function(factoryType) {
  const self = this;
  factoryType = ucfirst(factoryType);
  return self[factoryType];
};

module.exports = Shape;
