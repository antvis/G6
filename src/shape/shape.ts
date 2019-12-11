/**
 * @fileOverview 自定义 Shape 的基类
 * @author dxq613@gmail.com
 */


import { upperFirst } from '@antv/util'
import { G } from '@antv/g/lib'
import { IShape } from '../interface/shape'
import { IItem } from '../interface/item'
import { IModelConfig, IPoint } from '../../types/index'


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
  defaultShapeType: 'defaultType'
  /**
   * 形状的 className，用于搜索
   * @type {String}
   */
  className: null
  /**
   * 获取绘制 Shape 的工具类，无状态
   * @param  {String} type 类型
   * @return {Shape} 工具类
   */
  getShape(type: string): IShape {
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
  draw(type: string, cfg: IModelConfig, group: G.Group): G.Shape {
    const shape = this.getShape(type)
    const rst = shape.draw(cfg, group)
    shape.afterDraw(cfg, group, rst)
    return rst
  }
  /**
   * 更新
   * @param  {String} type  类型
   * @param  {Object} cfg 配置项
   * @param  {G6.Item} item 节点、边、分组等
   */
  update(type: string, cfg: IModelConfig, item: IItem) {
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
  getControlPoints(type: string, cfg: IModelConfig): Array<{x: number, y: number}> | null {
    const shape = this.getShape(type)
    return shape.getControlPoints(cfg)
  }
  /**
   * 获取控制点
   * @param {String} type 节点、边类型
   * @param  {Object} cfg 节点、边的配置项
   * @return {Array|null} 控制点的数组,如果为 null，则没有控制点
   */
  getAnchorPoints(type: string, cfg: IModelConfig): Array<{x: number, y: number}> | null {
    const shape = this.getShape(type)
    return shape.getAnchorPoints(cfg)
  }
}

/**
 * 绘制元素的工具类基类
 * @class Shape.ShapeBase
 */
export class ShapeBase implements IShape {
  // 默认样式及配置
  options: {
    anchorPoints?: IPoint[]
    size?: number
  }
  /**
	 * 用户自定义节点或边的样式，初始渲染时使用
	 * @override
	 * @param  {Object} cfg 节点的配置项
	 */
  getCustomConfig(cfg: IModelConfig): IModelConfig {
    return null;
  }
  /**
   * 绘制
   */
  draw(/* cfg, group */) {
      return null;
  }
  /**
   * 绘制完成后的操作，便于用户继承现有的节点、边
   */
  afterDraw(/* cfg, group */) {

  }
  /**
   * 设置节点、边状态
   */
  setState(/* name, value, item */) {

  }
  /**
   * 获取控制点
   * @param  {Object} cfg 节点、边的配置项
   * @return {Array|null} 控制点的数组,如果为 null，则没有控制点
   */
  getControlPoints(cfg: IModelConfig): Array<{x: number, y: number}> | null {
    return cfg.controlPoints
  }
  /**
   * 获取控制点
   * @param  {Object} cfg 节点、边的配置项
   * @return {Array|null} 锚点的数组,如果为 null，则没有锚点
   */
  getAnchorPoints(cfg: IModelConfig): Array<{x: number, y: number}> | null {
    const customOptions = this.getCustomConfig(cfg) || { anchorPoints: null }
    const { anchorPoints: defaultAnchorPoints } = this.options
    const { anchorPoints: customAnchorPoints } = customOptions
    const anchorPoints = cfg.anchorPoints || customAnchorPoints || defaultAnchorPoints
    return anchorPoints
  }
}


// 统一 registerNode, registerEdge, registerGuide 的实现
function addRegister(shapeFactory: {
  className: string,
  getShape: Function
}) {
  const functionName = 'register' + shapeFactory.className
  Shape[functionName] = function(shapeType: string, cfg: IModelConfig, extendShapeType: string): object {
    const extendShape = extendShapeType ? shapeFactory.getShape(extendShapeType) : ShapeBase
    const shapeObj = Object.assign({}, extendShape, cfg)
    shapeObj.type = shapeType
    shapeFactory[shapeType] = shapeObj
    return shapeObj
  }
}

export default class Shape {
  public static registerFactory<T, U>(factoryType: string, cfg: object): object {
    const className = ucfirst(factoryType)
    const factoryBase = new ShapeFactoryBase()
    const shapeFactory = Object.assign({}, factoryBase, cfg)
    Shape[className] = shapeFactory
    shapeFactory.className = className
    addRegister(shapeFactory)
    return shapeFactory
  }
  public static getFactory(factoryType: string) {
    const self = this
    factoryType = ucfirst(factoryType)
    return self[factoryType]
  }
}
