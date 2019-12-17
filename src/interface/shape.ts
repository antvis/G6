import { Point } from '@antv/g-base/lib/types';
import GGroup from '@antv/g-canvas/lib/group';
import { IShape } from '@antv/g-canvas/lib/interfaces'
import { IItemBase } from '@g6/interface/item'
import { IPoint, LabelStyle, ModelConfig, ModelStyle, ShapeStyle } from '@g6/types'


export type ILabelConfig = Partial<{
  position: string;
  offset: number;
  refX: number;
  refY: number;
  autoRotate: boolean;
}>

export type ShapeOptions = Partial<{
  options: ModelStyle
  /**
   * 形状的类型，例如 circle，ellipse，polyline...
   */
  type: string

  itemType: string
  shapeType: string
  labelPosition: string
  labelAutoRotate: boolean
  [key: string]: unknown

  /**
   * 绘制
   */
  draw(cfg?: ModelConfig, group?: GGroup): IShape

  drawShape(cfg?: ModelConfig, group?: GGroup): IShape
  drawLabel(cfg: ModelConfig, group: GGroup): IShape
  getLabelStyleByPosition(cfg?: ModelConfig, labelCfg?: ILabelConfig, group?: GGroup): LabelStyle
  getLabelStyle(cfg: ModelConfig, labelCfg, group: GGroup): LabelStyle
  getShapeStyle(cfg: ModelConfig): ShapeStyle
  getStateStyle(name: string, value: string | boolean, item: IItemBase): ShapeStyle

  /**
   * 绘制完成后的操作，便于用户继承现有的节点、边
   */
  afterDraw(cfg?: ModelConfig, group?: GGroup, rst?: IShape)

  afterUpdate(cfg?: ModelConfig, item?: IItemBase)

  /**
   * 设置节点、边状态
   */
  setState(name?: string, value?: string | boolean, item?: IItemBase)


  /**
   * 获取控制点
   * @param  {Object} cfg 节点、边的配置项
   * @return {Array|null} 控制点的数组,如果为 null，则没有控制点
   */
  getControlPoints(cfg: ModelConfig): IPoint[]
  
  /**
   * 获取控制点
   * @param  {Object} cfg 节点、边的配置项
   * @return {Array|null} 控制点的数组,如果为 null，则没有控制点
   */
  getAnchorPoints(cfg: ModelConfig): IPoint[]

  // 如果没定义 update 方法，每次都调用 draw 方法
  update(cfg: ModelConfig, item: IItemBase)

  // 获取节点的大小，只对节点起效
  getSize: (cfg: ModelConfig) => number | number[]

  // 获取路径
  // getPath: (cfg?: ModelConfig) => Array<Array<string | number>>
  // getPath: (points?: Point[]) => Array<Array<string | number>>
  // getPath: (points: Point[], routeCfg) => Array<Array<string | number>> | string
  getPath: (...args: Point[] | object[] | ModelConfig[]) => Array<Array<string | number>> | string

  // 获取文本对齐方式，只对边起效
  _getTextAlign: (labelPosition: string, angle: number) => void

  /**
   * @internal 处理需要重计算点和边的情况
   * @param {Object} cfg 边的配置项
   * @return {Object} 边的配置项
   */
  getPathPoints: (cfg: ModelConfig) => ModelConfig

  // [key: string]: (...args: string[] | number[] | object[] | ModelConfig[]) => unknown
}>