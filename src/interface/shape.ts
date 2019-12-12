import { IItem } from '@g6/interface/item'
import { G } from '@antv/g/lib'
import { ModelConfig, ModelStyle, IPoint } from '@g6/types'


export interface ILabelConfig {
  position?: string;
  offset?: number;
  refX?: number;
  refY?: number;
  autoRotate?: boolean;
}

export interface IShape {
  options?: ModelStyle

  /**
   * 形状的类型，例如 circle，ellipse，polyline...
   */
  type?: string

  /**
   * 绘制
   */
  draw?(cfg?: ModelConfig, group?: G.Group): G.Shape

  /**
   * 绘制完成后的操作，便于用户继承现有的节点、边
   */
  afterDraw?(cfg?: ModelConfig, group?: G.Group, rst?: G.Shape)

  afterUpdate?(cfg?: ModelConfig, item?: IItem)

  /**
   * 设置节点、边状态
   */
  setState(name?: string, value?: string | boolean, item?: IItem)


  /**
   * 获取控制点
   * @param  {Object} cfg 节点、边的配置项
   * @return {Array|null} 控制点的数组,如果为 null，则没有控制点
   */
  getControlPoints?(cfg: ModelConfig): IPoint[]
  
  /**
   * 获取控制点
   * @param  {Object} cfg 节点、边的配置项
   * @return {Array|null} 控制点的数组,如果为 null，则没有控制点
   */
  getAnchorPoints?(cfg: ModelConfig): IPoint[]

  // 如果没定义 update 方法，每次都调用 draw 方法
  update?(cfg: ModelConfig, item: IItem)
}