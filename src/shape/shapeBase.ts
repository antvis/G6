/**
 * @fileOverview 自定义节点和边的过程中，发现大量重复代码
 * @author dxq613@gmail.com
 */
import Global from '../global'
import each from '@antv/util/lib/each'
import { get, cloneDeep, merge } from 'lodash'
import { ShapeOptions } from '@g6/interface/shape'
import { G } from '@antv/g/lib'
import { ILabelConfig } from '@g6/interface/shape'
import { IItem } from '@g6/interface/item'
import { ModelConfig, IPoint, LabelStyle, ShapeStyle } from '@g6/types'

const CLS_SHAPE_SUFFIX = '-shape'
const CLS_LABEL_SUFFIX = '-label'

// 单个 shape 带有一个 label，共用这段代码
export const shapeBase: ShapeOptions = {
  // 默认样式及配置
  options: {},
  itemType: '', // node, edge, group, anchor 等
  /**
   * 形状的类型，例如 circle，ellipse，polyline...
   */
  type: '',

	/**
	 * 绘制节点/边，包含文本
	 * @override
	 * @param  {Object} cfg 节点的配置项
	 * @param  {G.Group} group 节点的容器
	 * @return {G.Shape} 绘制的图形
	 */
  draw(cfg: ModelConfig, group: G.Group): G.Shape {
    const shape: G.Shape = this.drawShape(cfg, group)
    shape.set('className', this.itemType + CLS_SHAPE_SUFFIX)
    if (cfg.label) {
      const label = this.drawLabel(cfg, group)
      label.set('className', this.itemType + CLS_LABEL_SUFFIX)
    }
    return shape
  },
  /**
  * 绘制完成后的操作，便于用户继承现有的节点、边
  */
  afterDraw(cfg?: ModelConfig, group?: G.Group, keyShape?: G.Shape) {

  },
  drawShape(cfg?: ModelConfig, group?: G.Group): G.Shape {

  },
  drawLabel(cfg: ModelConfig, group: G.Group): G.Shape {
    const { labelCfg: defaultLabelCfg } = this.options

    const labelCfg = merge({}, defaultLabelCfg, cfg.labelCfg)
    const labelStyle = this.getLabelStyle(cfg, labelCfg, group)
    const label = group.addShape('text', {
      attrs: labelStyle
    })
    return label
  },
  getLabelStyleByPosition(cfg?: ModelConfig, labelCfg?: ILabelConfig, group?: G.Group): LabelStyle {
    return {};
  },
  /**
	 * 获取文本的配置项
	 * @internal 用户创建和更新节点/边时，同时会更新文本
	 * @param  {Object} cfg 节点的配置项
   * @param {Object} labelCfg 文本的配置项
	 * @param {G.Group} group 父容器，label 的定位可能与图形相关
	 * @return {Object} 图形的配置项
	 */
  getLabelStyle(cfg: ModelConfig, labelCfg, group: G.Group): LabelStyle {
    const calculateStyle = this.getLabelStyleByPosition(cfg, labelCfg, group)
    calculateStyle.text = cfg.label
    const attrName = this.itemType + 'Label' // 取 nodeLabel，edgeLabel 的配置项
    const defaultStyle = Global[attrName] ? Global[attrName].style : null
    const labelStyle = Object.assign({}, defaultStyle, calculateStyle, labelCfg.style)
    return labelStyle
  },
  /**
	 * 获取图形的配置项
	 * @internal 仅在定义这一类节点使用，用户创建和更新节点
	 * @param  {Object} cfg 节点的配置项
	 * @return {Object} 图形的配置项
	 */
  getShapeStyle(cfg: ModelConfig): ShapeStyle {
    return cfg.style
  },
	/**
	 * 更新节点，包含文本
	 * @override
	 * @param  {Object} cfg 节点/边的配置项
	 * @param  {G6.Item} item 节点/边
	 */
  update(cfg: ModelConfig, item: IItem) {
    // TODO: after findByClassName is defined by G

    // const group = item.getContainer()
    // const shapeClassName = this.itemType + CLS_SHAPE_SUFFIX
    // const shape = group.findByClassName(shapeClassName)
    // const shapeStyle = this.getShapeStyle(cfg)
    // shape && shape.attr(shapeStyle)
    // const labelClassName = this.itemType + CLS_LABEL_SUFFIX
    // const label = group.findByClassName(labelClassName)
		// // 此时需要考虑之前是否绘制了 label 的场景存在三种情况
		// // 1. 更新时不需要 label，但是原先存在 label，此时需要删除
		// // 2. 更新时需要 label, 但是原先不存在，创建节点
		// // 3. 如果两者都存在，更新
    // if (!cfg.label) {
    //   label && label.remove()
    // } else {
    //   if (!label) {
    //     const newLabel = this.drawLabel(cfg, group)
    //     newLabel.set('className', labelClassName)
    //   } else {
    //     const labelCfg = cfg.labelCfg || {}
    //     const labelStyle = this.getLabelStyle(cfg, labelCfg, group)
    //     /**
    //      * fixme g中shape的rotate是角度累加的，不是label的rotate想要的角度
    //      * 由于现在label只有rotate操作，所以在更新label的时候如果style中有rotate就重置一下变换
    //      * 后续会基于g的Text复写一个Label出来处理这一类问题
    //      */
    //     label.resetMatrix()
    //     label.attr(labelStyle)
    //   }
    // }
  },

  // update(cfg, item) // 默认不定义
  afterUpdate(cfg?: ModelConfig, item?: IItem) {

  },
	/**
	 * 设置节点的状态，主要是交互状态，业务状态请在 draw 方法中实现
	 * 单图形的节点仅考虑 selected、active 状态，有其他状态需求的用户自己复写这个方法
	 * @override
	 * @param  {String} name 状态名称
	 * @param  {String | Boolean} value 状态值
	 * @param  {G6.Item} item 节点
	 */
  setState(name: string, value: boolean, item: IItem) {
    const shape: G.Shape = item.get('keyShape')
    if (!shape) {
      return
    }
    const itemStateStyle = item.getStateStyle(name)
    const stateStyle = this.getStateStyle(name, value, item)
    const styles = merge({}, stateStyle, itemStateStyle)
    if (value) { // 如果设置状态,在原本状态上叠加绘图属性
      shape.attr(styles)
    } else { // 取消状态时重置所有状态，依次叠加仍有的状态
      const style = item.getCurrentStatesStyle()
      // 如果默认状态下没有设置attr，在某状态下设置了，需要重置到没有设置的状态
      each(styles, (val, attr) => {
        if (!style[attr]) {
          style[attr] = null
        }
      })
      shape.attr(style)
    }
  },
  /**
   * 获取不同状态下的样式
   *
   * @param {string} name 状态名称
   * @param {boolean} value 是否启用该状态
   * @param {Item} item Node或Edge的实例
   * @return {object} 样式
   */
  getStateStyle(name: string, value: string | boolean, item: IItem): ShapeStyle {
    const model = item.getModel()
    const { style: defaultStyle, stateStyles: defaultStateStyle } = this.options

    let currentStateStyle: string | number | object | object[] = defaultStyle

    if (defaultStateStyle[name]) {
      currentStateStyle = defaultStateStyle[name]
    }
    if (value) {
      return merge({}, currentStateStyle, model.style)
    }

    const states = item.getStates()
    const style = cloneDeep(defaultStyle)
    states.forEach(state => {
      merge(style, get(defaultStyle, state, {}), state, model.style)
    })
    return style
  },
  /**
   * 获取控制点
   * @param  {Object} cfg 节点、边的配置项
   * @return {Array|null} 控制点的数组,如果为 null，则没有控制点
   */
  getControlPoints(cfg: ModelConfig): IPoint[] {
    return cfg.controlPoints
  },
  /**
   * 获取控制点
   * @param  {Object} cfg 节点、边的配置项
   * @return {Array|null} 锚点的数组,如果为 null，则没有锚点
   */
  getAnchorPoints(cfg: ModelConfig): IPoint[] {
    const { anchorPoints: defaultAnchorPoints } = this.options
    const anchorPoints = cfg.anchorPoints || defaultAnchorPoints
    return anchorPoints
  }
}
