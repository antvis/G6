/**
 * @fileOverview 自定义节点和边的过程中，发现大量重复代码
 * @author dxq613@gmail.com
 */
import GGroup from '@antv/g-canvas/lib/group';
import { IShape } from '@antv/g-canvas/lib/interfaces'
import deepMix from '@antv/util/lib/deep-mix';
import each from '@antv/util/lib/each'
import { ShapeOptions, ILabelConfig } from '../interface/shape'
import { IPoint, Item, LabelStyle, ModelConfig, ShapeStyle } from '../../types';
import { cloneDeep, get, merge } from 'lodash'
import Global from '../global'
import { mat3, transform } from '@antv/matrix-util';

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
  draw(cfg: ModelConfig, group: GGroup): IShape {
    const shape: IShape = this.drawShape(cfg, group)
    shape.set('className', this.itemType + CLS_SHAPE_SUFFIX)
    if (cfg.label) {
      const label = this.drawLabel(cfg, group)
      label.set('className', this.itemType + CLS_LABEL_SUFFIX)
    }
    return shape
  },
  /**
   * 绘制完成后的操作，便于用户继承现有的节点、边
   * @param cfg 
   * @param group 
   * @param keyShape 
   */
  afterDraw(cfg?: ModelConfig, group?: GGroup, keyShape?: IShape) {

  },
  drawShape(cfg?: ModelConfig, group?: GGroup): IShape {
    return null;
  },
  drawLabel(cfg: ModelConfig, group: GGroup): IShape {
    const { labelCfg: defaultLabelCfg } = this.options

    const labelCfg = merge({}, defaultLabelCfg, cfg.labelCfg)
    const labelStyle = this.getLabelStyle(cfg, labelCfg, group)
    const label = group.addShape('text', {
      attrs: labelStyle,
      capture: false,
      className: 'text-shape',
      name: 'text-shape',
    })
    return label
  },
  getLabelStyleByPosition(cfg?: ModelConfig, labelCfg?: ILabelConfig, group?: GGroup): LabelStyle {
    return { text: cfg.label };
  },

  /**
   * 获取文本的配置项
   * @param cfg 节点的配置项
   * @param labelCfg 文本的配置项
   * @param group 父容器，label 的定位可能与图形相关
   */
  getLabelStyle(cfg: ModelConfig, labelCfg, group: GGroup): LabelStyle {
    const calculateStyle = this.getLabelStyleByPosition(cfg, labelCfg, group)
    const attrName = this.itemType + 'Label' // 取 nodeLabel，edgeLabel 的配置项
    const defaultStyle = Global[attrName] ? Global[attrName].style : null
    const labelStyle = Object.assign({}, defaultStyle, calculateStyle, labelCfg.style)
    return labelStyle
  },
  
  /**
   * 获取图形的配置项
   * @param cfg 
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
  update(cfg: ModelConfig, item: Item) {
    this.updateShapeStyle(cfg, item);
    this.updateLabel(cfg, item);
  },
  updateShapeStyle(cfg: ModelConfig, item: Item) {
    const group = item.getContainer()
    const shapeClassName = this.itemType + CLS_SHAPE_SUFFIX
    const shape = group.find(element => element.get('className') === shapeClassName)
    const shapeStyle = deepMix({}, shape.attr(), cfg.style);
    if (shape) {
      shape.attr(shapeStyle)
    }
  },

  updateLabel(cfg: ModelConfig, item: Item) {
    const group = item.getContainer();
    const { labelCfg: defaultLabelCfg } = this.options;
    const labelClassName = this.itemType + CLS_LABEL_SUFFIX
    const label = group.find(element => element.get('className') === labelClassName)

    if (cfg.label) { // 若传入的新配置中有 label，（用户没传入但原先有 label，label 也会有值）
      if (!label) { // 若原先不存在 label，则绘制一个新的 label
        const newLabel = this.drawLabel(cfg, group)
        newLabel.set('className', labelClassName)
      } else { // 若原先存在 label，则更新样式。与 getLabelStyle 不同在于这里需要融合当前 label 的样式
        // 用于融合 style 以外的属性：position, offset, ...
        const labelCfg = deepMix({}, defaultLabelCfg, cfg.labelCfg);

        // 获取位置信息
        const calculateStyle = this.getLabelStyleByPosition(cfg, labelCfg, group)

        // 取 nodeLabel，edgeLabel 的配置项
        const cfgStyle = cfg.labelCfg ? cfg.labelCfg.style : undefined;

        // 需要融合当前 label 的样式 label.attr()。不再需要全局/默认样式，因为已经应用在当前的 label 上
        const labelStyle = Object.assign({}, label.attr(), calculateStyle, cfgStyle)

        // 计算 label 的旋转矩阵
        if (labelStyle.rotate) {
          // if G 4.x define the rotateAtStart, use it directly instead of using the following codes
          let rotateMatrix = mat3.create(); 
          rotateMatrix = transform(rotateMatrix, [
            [ 't', -labelStyle.x, -labelStyle.y ],
            [ 'r', labelStyle.rotate ],
            [ 't', labelStyle.x, labelStyle.y ]
          ]);
          label.resetMatrix()
          label.attr({...labelStyle, matrix: rotateMatrix})
        } else {
          label.resetMatrix()
          label.attr(labelStyle)
        }

      }
    }
  },

  // update(cfg, item) // 默认不定义
  afterUpdate(cfg?: ModelConfig, item?: Item) {

  },
	/**
	 * 设置节点的状态，主要是交互状态，业务状态请在 draw 方法中实现
	 * 单图形的节点仅考虑 selected、active 状态，有其他状态需求的用户自己复写这个方法
	 * @override
	 * @param  {String} name 状态名称
	 * @param  {String | Boolean} value 状态值
	 * @param  {G6.Item} item 节点
	 */
  setState(name: string, value: boolean, item: Item) {
    const shape: IShape = item.get('keyShape')
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
  getStateStyle(name: string, value: string | boolean, item: Item): ShapeStyle {
    const model = item.getModel()

    const { style: defaultStyle } = this.options
    
    if (value) {
      const modelStateStyle = model.stateStyles ? model.stateStyles[name] : undefined;
      return merge({}, model.style, modelStateStyle)
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
