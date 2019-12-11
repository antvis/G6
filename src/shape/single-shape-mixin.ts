/**
 * @fileOverview 自定义节点和边的过程中，发现大量重复代码
 * @author dxq613@gmail.com
 */
import Global from '../global'
import each from '@antv/util/lib/each'
import { get, cloneDeep, merge } from 'lodash'
import { IShape } from '../interface/shape'
import { G } from '@antv/g/lib'
import { IItem } from '../interface/item'
import { IModelConfig } from '../../types/index'

const CLS_SHAPE_SUFFIX = '-shape'
const CLS_LABEL_SUFFIX = '-label'

// 单个 shape 带有一个 label，共用这段代码
export default class SingleShape implements IShape {
  // 默认样式及配置
  options: {
    labelCfg?: object
    style?: object
    stateStyles?: object
    size: number
  }
  /**
	 * 用户自定义节点或边的样式，初始渲染时使用
	 * @override
	 * @param  {Object} model 节点的配置项
	 */
  getCustomConfig(cfg: IModelConfig): IModelConfig {
    return null;
  }
  itemType: string // node, edge, group, anchor 等
	/**
	 * 绘制节点/边，包含文本
	 * @override
	 * @param  {Object} cfg 节点的配置项
	 * @param  {G.Group} group 节点的容器
	 * @return {G.Shape} 绘制的图形
	 */
  draw(cfg: IModelConfig, group: G.Group): G.Shape {
    const shape: G.Shape = this.drawShape(cfg, group)
    shape.set('className', this.itemType + CLS_SHAPE_SUFFIX)
    if (cfg.label) {
      const label = this.drawLabel(cfg, group)
      label.set('className', this.itemType + CLS_LABEL_SUFFIX)
    }
    return shape
  }
  drawShape(cfg?: IModelConfig, group?: G.Group) {

  }
  drawLabel(cfg: IModelConfig, group: G.Group): G.Shape {
    const customOptions = this.getCustomConfig(cfg) || { labelCfg: null }
    const { labelCfg: defaultLabelCfg } = this.options
    const { labelCfg: customLabelCfg } = customOptions

    const labelCfg = merge({}, defaultLabelCfg, customLabelCfg, cfg.labelCfg)
    const labelStyle = this.getLabelStyle(cfg, labelCfg, group)
    const label = group.addShape('text', {
      attrs: labelStyle
    })
    return label
  }
  getLabelStyleByPosition(cfg?: IModelConfig, labelCfg?: object, group?: G.Group): {
    x: number
    y: number
    text?: string
  } {
    return null;
  }
  /**
	 * 获取文本的配置项
	 * @internal 用户创建和更新节点/边时，同时会更新文本
	 * @param  {Object} cfg 节点的配置项
   * @param {Object} labelCfg 文本的配置项
	 * @param {G.Group} group 父容器，label 的定位可能与图形相关
	 * @return {Object} 图形的配置项
	 */
  getLabelStyle(cfg: IModelConfig, labelCfg, group: G.Group): object {
    const calculateStyle = this.getLabelStyleByPosition(cfg, labelCfg, group)
    calculateStyle.text = cfg.label
    const attrName = this.itemType + 'Label' // 取 nodeLabel，edgeLabel 的配置项
    const defaultStyle = Global[attrName] ? Global[attrName].style : null
    const labelStyle = Object.assign({}, defaultStyle, calculateStyle, labelCfg.style)
    return labelStyle
  }
  /**
	 * 获取图形的配置项
	 * @internal 仅在定义这一类节点使用，用户创建和更新节点
	 * @param  {Object} cfg 节点的配置项
	 * @return {Object} 图形的配置项
	 */
  getShapeStyle(cfg: IModelConfig): object {
    return cfg.style
  }
	/**
	 * 更新节点，包含文本
	 * @override
	 * @param  {Object} cfg 节点/边的配置项
	 * @param  {G6.Item} item 节点/边
	 */
  update(cfg: IModelConfig, item: IItem) {
    const group = item.getContainer()
    const shapeClassName = this.itemType + CLS_SHAPE_SUFFIX
    const shape = group.findByClassName(shapeClassName)
    const shapeStyle = this.getShapeStyle(cfg)
    shape && shape.attr(shapeStyle)
    const labelClassName = this.itemType + CLS_LABEL_SUFFIX
    const label = group.findByClassName(labelClassName)
		// 此时需要考虑之前是否绘制了 label 的场景存在三种情况
		// 1. 更新时不需要 label，但是原先存在 label，此时需要删除
		// 2. 更新时需要 label, 但是原先不存在，创建节点
		// 3. 如果两者都存在，更新
    if (!cfg.label) {
      label && label.remove()
    } else {
      if (!label) {
        const newLabel = this.drawLabel(cfg, group)
        newLabel.set('className', labelClassName)
      } else {
        const labelCfg = cfg.labelCfg || {}
        const labelStyle = this.getLabelStyle(cfg, labelCfg, group)
        /**
         * fixme g中shape的rotate是角度累加的，不是label的rotate想要的角度
         * 由于现在label只有rotate操作，所以在更新label的时候如果style中有rotate就重置一下变换
         * 后续会基于g的Text复写一个Label出来处理这一类问题
         */
        label.resetMatrix()
        label.attr(labelStyle)
      }
    }
  }

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
  }
  /**
   * 获取不同状态下的样式
   *
   * @param {string} name 状态名称
   * @param {boolean} value 是否启用该状态
   * @param {Item} item Node或Edge的实例
   * @return {object} 样式
   */
  getStateStyle(name: string, value: string | boolean, item: IItem) {
    const model = item.getModel()
    const customOptions = this.getCustomConfig(model) || {}
    const { style: defaultStyle, stateStyles: defaultStateStyle } = this.options
    const { style: customStyle, stateStyles: customStateStyle } = customOptions

    const stateStyles = merge({}, defaultStateStyle, customStateStyle)
    let currentStateStyle = defaultStyle

    if (stateStyles[name]) {
      currentStateStyle = stateStyles[name]
    }
    if (value) {
      return merge({}, currentStateStyle, model.style)
    }

    const states = item.getStates()
    const resultStyle = merge({}, defaultStyle, customStyle)
    const style = cloneDeep(resultStyle)
    states.forEach(state => {
      merge(style, get(defaultStyle, state, {}), get(customStyle, state, {}), model.style)
    })
    return style
  }
}
