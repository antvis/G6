import { IItem } from '../interface/item'
import { G } from '@antv/g/lib'
import { IModelConfig, IModelStyle } from '../../types/index'

// // item 的配置项
// export interface IModelConfig {
//   /**
//    * control points
//    */
//   controlPoints?: Array<{x: number, y: number}> | null
//   /**
//    * anchor points (ports)
//    */
//   anchorPoints?: Array<{x: number, y: number}> | null
//   /**
//    * label
//    */
//   label?: string
//   labelCfg?: object
//   style?: object
//   stateStyles?: object
//   size: number

// }

export interface ILabelConfig {
  position?: string;
  offset?: number
}

export interface IShape {
  options: IModelStyle

  /**
	 * 用户自定义节点或边的样式，初始渲染时使用
	 * @override
	 * @param  {Object} cfg 节点的配置项
	 */
  getCustomConfig(cfg: IModelConfig): IModelConfig

  /**
   * 绘制
   */
  draw(cfg?: IModelConfig, group?: G.Group): G.Shape

  /**
   * 绘制完成后的操作，便于用户继承现有的节点、边
   */
  afterDraw?(cfg?: IModelConfig, group?: G.Group, rst?: G.Shape)

  afterUpdate?(cfg?: IModelConfig, item?: IItem)

  /**
   * 设置节点、边状态
   */
  setState(name?: string, value?: string | boolean, item?: IItem)


  /**
   * 获取控制点
   * @param  {Object} cfg 节点、边的配置项
   * @return {Array|null} 控制点的数组,如果为 null，则没有控制点
   */
  getControlPoints?(cfg: IModelConfig): Array<{x: number, y: number}> | null
  
  /**
   * 获取控制点
   * @param  {Object} cfg 节点、边的配置项
   * @return {Array|null} 控制点的数组,如果为 null，则没有控制点
   */
  getAnchorPoints?(cfg: IModelConfig): Array<{x: number, y: number}> | null

  // 如果没定义 update 方法，每次都调用 draw 方法
  update?(cfg: IModelConfig, item: IItem)
}
