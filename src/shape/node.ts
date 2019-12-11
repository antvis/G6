/**
 * @fileOverview common node shape
 * @author huangtonger@aliyun.com
 */

import Shape from './shape'
import { isNil, isArray } from '@antv/util/lib'
import Global from '../global'
import SingleShape from './single-shape-mixin'
import { ILabelConfig } from '../interface/shape'
import { INodeConfig } from '../../types/index'
import { G } from '@antv/g/lib'


// 注册 Node 的工厂方法
Shape.registerFactory('node', {
  defaultShapeType: 'circle'
})

class SingleNode extends SingleShape {
  itemType: 'node'
  // 单个图形的类型
  shapeType: ''
  /**
   * 文本相对图形的位置，默认以中心点
   * 位置包括： top, bottom, left, right, center
   * @type {String}
   */
  labelPosition: 'center'
  options: {
    size: 10
  }
  /**
   * 获取节点宽高
   * @internal 返回节点的大小，以 [width, height] 的方式维护
   * @param  {Object} cfg 节点的配置项
   * @return {Array} 宽高
   */
  getSize(cfg: INodeConfig): number | Array<number> {
    const customOptions = this.getCustomConfig(cfg) || { size: null }
    let size: number | Array<number> = cfg.size || customOptions.size || this.options.size || Global.defaultNode.size
    if (!isArray(size)) {
      size = [ size, size ]
    }
    return size
  }
  // 私有方法，不希望扩展的节点复写这个方法
  getLabelStyleByPosition(cfg: INodeConfig, labelCfg: ILabelConfig):{
    x: number
    y: number
    textBaseline?: string
    textAlign?: string
  }
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
    return style
  }
  drawShape(cfg: INodeConfig, group: G.Group): G.Shape {
    const shapeType = this.shapeType // || this.type，都已经加了 shapeType
    const style = this.getShapeStyle(cfg)
    const shape = group.addShape(shapeType, {
      attrs: style
    })
    return shape
  }
}

const singleNodeDefinition = new SingleNode();
// 单个图形的基础，可以有 label，默认 label 居中
Shape.registerNode('single-shape', singleNodeDefinition)
