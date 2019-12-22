/**
 * @fileOverview common node shape
 * @author huangtonger@aliyun.com
 */
import GGroup from '@antv/g-canvas/lib/group';
import { IShape } from '@antv/g-canvas/lib/interfaces'
import { isArray, isNil } from '@antv/util/lib'
import { ILabelConfig, ShapeOptions } from '@g6/interface/shape'
import { LabelStyle, NodeConfig } from '@g6/types'
import Global from '../global'
import Shape from './shape'
import { shapeBase } from './shapeBase'
import deepMix from '@antv/util/lib/deep-mix';



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
  drawShape(cfg: NodeConfig, group: GGroup): IShape {
    const shapeType = this.shapeType // || this.type，都已经加了 shapeType
    const style = this.getShapeStyle(cfg)
    const shape = group.addShape(shapeType, {
      attrs: style
    })
    return shape
  },

  /**
   * 更新linkPoints
   * @param {Object} cfg 节点数据配置项
   * @param {Group} group Item所在的group
   */
  updateLinkPoints(cfg: NodeConfig, group: GGroup) {
    const { linkPoints: defaultLinkPoints } = this.options;

    const markLeft = group.find(element => { return element.get('className') === 'link-point-left'})
    const markRight= group.find(element => { return element.get('className') === 'link-point-right'})
    const markTop = group.find(element => { return element.get('className') === 'link-point-top'})
    const markBottom = group.find(element => { return element.get('className') === 'link-point-bottom'})

    let currentLinkPoints = undefined;
    if (markLeft) {
      currentLinkPoints = markLeft.get('attrs');
    }
    if (markRight && !currentLinkPoints) {
      currentLinkPoints = markRight.get('attrs');
    }
    if (markTop && !currentLinkPoints) {
      currentLinkPoints = markTop.get('attrs');
    }
    if (markBottom && !currentLinkPoints) {
      currentLinkPoints = markBottom.get('attrs');
    }
    if (!currentLinkPoints) currentLinkPoints = defaultLinkPoints;

    const linkPoints = deepMix({}, currentLinkPoints, cfg.linkPoints);

    const { fill: markFill, stroke: markStroke, lineWidth: borderWidth } = linkPoints;
    let markSize = linkPoints.size;
    if (!markSize) markSize = linkPoints.r;
    const { left, right, top, bottom } = cfg.linkPoints ? cfg.linkPoints : { left: undefined, right: undefined, top: undefined, bottom: undefined};

    const size = this.getSize(cfg);
    const width = size[0];
    const height = size[1];
    const styles = {
      r: markSize,
      fill: markFill,
      stroke: markStroke,
      lineWidth: borderWidth
    }

    if (markLeft) {
      if (!left && left !== undefined) {
        markLeft.remove();
      } else {
        markLeft.attr({
          x: -width / 2,
          y: 0,
          ...styles
        });
      }
    } else if (left) {
      group.addShape('circle', {
        attrs: {
          x: -width / 2,
          y: 0,
          ...styles
        },
        className: 'link-point-left',
        isAnchorPoint: true
      });
    }

    if (markRight) {
      if (!right && right !== undefined) {
        markRight.remove();
      }
      markRight.attr({
        x: width / 2,
        y: 0,
        ...styles
      });
    } else if (right) {
      group.addShape('circle', {
        attrs: {
          x: width / 2,
          y: 0,
          ...styles
        },
        className: 'link-point-right',
        isAnchorPoint: true
      });
    }

    if (markTop) {
      if (!top && top !== undefined) {
        markTop.remove();
      }
      markTop.attr({
        x: 0,
        y: -height / 2,
        ...styles
      });
    } else if (top) {
      group.addShape('circle', {
        attrs: {
          x: 0,
          y: -height / 2,
          ...styles
        },
        className: 'link-point-top',
        isAnchorPoint: true
      });
    }

    if (markBottom) {
      if (!bottom && bottom !== undefined) {
        markBottom.remove();
      } else {
        markBottom.attr({
          x: 0,
          y: height / 2,
          ...styles
        });
      }
    } else if (bottom) {
      group.addShape('circle', {
        attrs: {
          x: 0,
          y: height / 2,
          ...styles
        },
        className: 'link-point-bottom',
        isAnchorPoint: true
      });
    }
  }
}

const singleNodeDef = Object.assign({}, shapeBase, singleNode)
Shape.registerNode('single-node', singleNodeDef)