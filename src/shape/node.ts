/**
 * @fileOverview common node shape
 * @author huangtonger@aliyun.com
 */
import Shape from './shape'
import SingleShape from './single-shape-mixin'
import { isNil, isArray } from '@antv/util/lib'
import Global from '../global'
import { ILabelConfig } from '@g6/interface/shape'
import { NodeConfig, LabelStyle } from '@g6/types'
import { G } from '@antv/g/lib'

// 注册 Node 的工厂方法
Shape.registerFactory('node', {
  defaultShapeType: 'circle'
});

export default class SingleNode extends SingleShape {
  itemType = 'node'
  // 单个图形的类型
  shapeType = ''
  /**
   * 文本相对图形的位置，默认以中心点
   * 位置包括： top, bottom, left, right, center
   * @type {String}
   */
  labelPosition = 'center'
  // constructor(cfg) {
  //   super();
  //   this.itemType = cfg.itemType;
  // }
  /**
   * 获取节点宽高
   * @internal 返回节点的大小，以 [width, height] 的方式维护
   * @param  {Object} cfg 节点的配置项
   * @return {Array} 宽高
   */
  getSize(cfg: NodeConfig): number | number[] {
    console.log('sizesizesize', cfg, this.options, Global.defaultNode)
    let size: number | number[] = cfg.size || this.options.size || Global.defaultNode.size
    if (!isArray(size)) {
      size = [ size, size ]
    }
    return size
  }
  // 私有方法，不希望扩展的节点复写这个方法
  getLabelStyleByPosition(cfg?: NodeConfig, labelCfg?: ILabelConfig): LabelStyle
  {
    const labelPosition = labelCfg.position || this.labelPosition

    // 默认的位置（最可能的情形），所以放在最上面
    if (labelPosition === 'center') {
      return { x: 0, y: 0 }
    }

    let offset = labelCfg.offset
    if (isNil(offset)) { // 考虑 offset = 0 的场景，不用用 labelCfg.offset || Global.nodeLabel.offset
      offset = Global.nodeLabel.offset // 不居中时的偏移量
    }
    const size = this.getSize(cfg)
    const width = size[0]
    const height = size[1]

    let style
    switch (labelPosition) {
      case 'top':
        style = {
          x: 0,
          y: 0 - height / 2 - offset,
          textBaseline: 'bottom' // 文本在图形的上面
        }
        break
      case 'bottom':
        style = {
          x: 0,
          y: height / 2 + offset,
          textBaseline: 'top'
        }
        break
      case 'left':
        style = {
          x: 0 - width / 2 - offset,
          y: 0,
          textAlign: 'right'
        }
        break
      default:
        style = {
          x: width / 2 + offset,
          y: 0,
          textAlign: 'left'
        }
        break
    }
    console.log('style from get by position', style);
    return style
  }
  drawShape(cfg: NodeConfig, group: G.Group): G.Shape {
    console.log('draw shape in node');
    const shapeType = this.shapeType // || this.type，都已经加了 shapeType
    const style = this.getShapeStyle(cfg)
    const shape = group.addShape(shapeType, {
      attrs: style
    })
    return shape
  }
};

const obj = Object.assign({}, SingleShape.prototype, SingleNode.prototype);
console.log('Objectoooo',SingleNode.prototype, new SingleNode());

// 单个图形的基础，可以有 label，默认 label 居中
Shape.registerNode('single-shape', Object.assign({}, SingleShape.prototype, SingleNode.prototype, new SingleNode()))

