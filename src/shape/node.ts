/**
 * @fileOverview common node shape
 * @author huangtonger@aliyun.com
 */
import Shape from './shape'
import { shapeBase } from './shapeBase'
import { isNil, isArray } from '@antv/util/lib'
import Global from '../global'
import { ILabelConfig, ShapeOptions } from '@g6/interface/shape'
import { NodeConfig, LabelStyle } from '@g6/types'
import { G } from '@antv/g/lib'


const singleNode: ShapeOptions = {
  itemType: 'node',
  // 单个图形的类型
  shapeType: 'single-node',
  /**
   * 文本相对图形的位置，默认以中心点
   * 位置包括： top, bottom, left, right, center
   * @type {String}
   */
  labelPosition: 'center',
  /**
   * 获取节点宽高
   * @internal 返回节点的大小，以 [width, height] 的方式维护
   * @param  {Object} cfg 节点的配置项
   * @return {Array} 宽高
   */
  getSize(cfg: NodeConfig): number | number[] {
    let size: number | number[] = cfg.size || this.options.size || Global.defaultNode.size
    if (!isArray(size)) {
      size = [ size, size ]
    }
    return size
  },
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
    return style
  },
  drawShape(cfg: NodeConfig, group: G.Group): G.Shape {
    const shapeType = this.shapeType // || this.type，都已经加了 shapeType
    const style = this.getShapeStyle(cfg)
    const shape = group.addShape(shapeType, {
      attrs: style
    })
    return shape
  }
}

const singleNodeDef = Object.assign({}, shapeBase, singleNode)
Shape.registerNode('single-node', singleNodeDef)