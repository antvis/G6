/**
 * @fileOverview 自定义 Shape 的基类
 * @author dxq613@gmail.com
 */

import { upperFirst } from '@antv/util'
import { G } from '@antv/g/lib'
import { IShape } from '@g6/interface/shape'
import { IItem } from '@g6/interface/item'
import { ModelConfig, IPoint } from '@g6/types'
import SingleShape from './single-shape-mixin'

const cache = {} // ucfirst 开销过大，进行缓存
// 首字母大写
function ucfirst(str) {
  if (!cache[str]) {
    cache[str] = upperFirst(str)
  }
  return cache[str]
}

/**
 * 工厂方法的基类
 * @type Shape.FactoryBase
 */
class ShapeFactoryBase {
  /**
   * 默认的形状，当没有指定/匹配 shapeType 时，使用默认的
   * @type {String}
   */
  defaultShapeType: string = 'defaultType'
  /**
   * 形状的 className，用于搜索
   * @type {String}
   */
  className: string = null
  /**
   * 获取绘制 Shape 的工具类，无状态
   * @param  {String} type 类型
   * @return {Shape} 工具类
   */
  getShape(type?: string): IShape {
    const self = this
    const shape = self[type] || self[self.defaultShapeType]
    return shape
  }
  /**
   * 绘制图形
   * @param  {String} type  类型
   * @param  {Object} cfg 配置项
   * @param  {G.Group} group 图形的分组
   * @return {G.Shape} 图形对象
   */
  draw(type: string, cfg: ModelConfig, group: G.Group): G.Shape {
    const shape = this.getShape(type)
    console.log('drawdraw', type, shape);
    const rst = shape.draw(cfg, group)
    console.log('keyshapekeyshape', rst);
    shape.afterDraw(cfg, group, rst)
    return rst
  }
  /**
   * 更新
   * @param  {String} type  类型
   * @param  {Object} cfg 配置项
   * @param  {G6.Item} item 节点、边、分组等
   */
  update(type: string, cfg: ModelConfig, item: IItem) {
    const shape = this.getShape(type)
    if (shape.update) { // 防止没定义 update 函数
      shape.update(cfg, item)
      shape.afterUpdate(cfg, item)
    }
  }
  /**
   * 设置状态
   * @param {String} type  类型
   * @param {String} name  状态名
   * @param {String | Boolean} value 状态值
   * @param {G6.Item} item  节点、边、分组等
   */
  setState(type: string, name: string, value: string | boolean, item: IItem) {
    const shape = this.getShape(type)
    shape.setState(name, value, item)
  }
  /**
   * 是否允许更新，不重新绘制图形
   * @param  {String} type 类型
   * @return {Boolean} 是否允许使用更新
   */
  shouldUpdate(type: string): boolean {
    const shape = this.getShape(type)
    return !!shape.update
  }
  getControlPoints(type: string, cfg: ModelConfig): IPoint[] {
    const shape = this.getShape(type)
    return shape.getControlPoints(cfg)
  }
  /**
   * 获取控制点
   * @param {String} type 节点、边类型
   * @param  {Object} cfg 节点、边的配置项
   * @return {Array|null} 控制点的数组,如果为 null，则没有控制点
   */
  getAnchorPoints(type: string, cfg: ModelConfig): IPoint[] {
    const shape = this.getShape(type)
    return shape.getAnchorPoints(cfg)
  }
}

// 统一 registerNode, registerEdge, registerGuide 的实现
// function addRegister(shapeFactory: {
//   className: string,
//   getShape: Function
// }) {
//   const functionName = 'register' + shapeFactory.className
//   Shape[functionName] = function(shapeType: string, cfg: ModelConfig, extendShapeType?: string): object {
    
//     let extendShape = ShapeBase
//     if (extendShapeType) {
//       extendShape = shapeFactory.getShape(extendShapeType)
//     } else {
//       extendShape = shapeFactory.className === 'Node' ? shapeFactory.getShape('single-shape') : shapeFactory.getShape('single-line');
//     }
//     const shapeObj = Object.assign({}, extendShape, cfg)
//     shapeObj['type'] = shapeType
//     shapeFactory[shapeType] = shapeObj
//     return shapeObj
//   }
// }

export default class Shape {
  public static registerFactory(factoryType: string, cfg: object): object {
    const className = ucfirst(factoryType)
    const factoryBase = ShapeFactoryBase.prototype
    const shapeFactory = Object.assign({}, factoryBase, cfg)
    Shape[className] = shapeFactory
    shapeFactory.className = className
    // addRegister(shapeFactory)
    return shapeFactory
  }
  public static getFactory(factoryType: string) {
    // const self = this
    factoryType = ucfirst(factoryType)
    return Shape[factoryType]
  }
  public static registerNode(shapeType: string, nodeDefinition: object, extendShapeType?: string) {
    const shapeFactory = Shape['Node'];
    console.log('shapeFactory', shapeFactory);
    let extendShape = Object.assign({}, SingleShape.prototype, new SingleShape()) 
    // let extendShape = SingleShape.prototype
    if (extendShapeType) {
      extendShape = shapeFactory.getShape(extendShapeType)
    } else if (shapeFactory.getShape('single-shape')){
      extendShape = shapeFactory.getShape('single-shape');
    }
    const shapeObj = Object.assign({}, extendShape, nodeDefinition)
    shapeObj['type'] = shapeType
    shapeObj['itemType'] = 'node'
    shapeFactory[shapeType] = shapeObj
    return shapeObj
  }
  public static registerEdge(shapeType: string, edgeDefinition: object, extendShapeType?: string) {
    const shapeFactory = Shape['Edge'];
    let extendShape = Object.assign({}, SingleShape.prototype, new SingleShape()) // SingleShape.prototype
    console.log('SingleShapeSingleShape', Object.assign({}, SingleShape.prototype, new SingleShape()))
    if (extendShapeType) {
      extendShape = shapeFactory.getShape(extendShapeType)
    } else if (shapeFactory.getShape('single-line')){
      extendShape = shapeFactory.getShape('single-line');
    }
    const shapeObj = Object.assign({}, extendShape, edgeDefinition)
    console.log('shapeObjshapeObjshapeObj', shapeObj, extendShape);
    shapeObj['type'] = shapeType
    shapeObj['itemType'] = 'edge'
    shapeFactory[shapeType] = shapeObj
    return shapeObj
  }
  // public static registerNode(shapeType: string, nodeDefinition: IShape | object, extendShapeType?: string) {
  //   const factoryBase = ShapeFactoryBase.prototype
  //   const shapeFactory = Object.assign({
  //     defaultShapeType: 'circle'
  //   }, factoryBase)
  //   Shape['Node'] = shapeFactory
  //   shapeFactory.className = 'Node';

  //   let shapeObj = nodeDefinition;
  //   if (extendShapeType) {
  //     shapeObj = Object.assign({}, shapeFactory.getShape(extendShapeType), nodeDefinition)
  //   }
  //   shapeObj['type'] = shapeType

  //   shapeFactory[shapeType] = shapeObj
  //   return shapeObj
  // }
  // public static registerEdge(shapeType: string, edgeDefinition: IShape | object, extendShapeType?: string) {
  //   const factoryBase = ShapeFactoryBase.prototype
  //   const shapeFactory = Object.assign({
  //     defaultShapeType: 'line'
  //   }, factoryBase)
  //   Shape['Edge'] = shapeFactory
  //   shapeFactory.className = 'Edge';

  //   let shapeObj = edgeDefinition;
  //   if (extendShapeType) {
  //     shapeObj = Object.assign({}, shapeFactory.getShape(extendShapeType), edgeDefinition)
  //   }
  //   shapeObj['type'] = shapeType
  //   shapeFactory[shapeType] = shapeObj
  //   return shapeObj
  // }
}
