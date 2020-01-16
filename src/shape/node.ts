/**
 * @fileOverview common node shape
 * @author huangtonger@aliyun.com
 */
import GGroup from '@antv/g-canvas/lib/group';
import { IShape } from '@antv/g-canvas/lib/interfaces'
import { isArray, isNil } from '@antv/util/lib'
import deepMix from '@antv/util/lib/deep-mix';
import { ILabelConfig, ShapeOptions } from '../interface/shape'
import { Item, LabelStyle, NodeConfig } from '../../types';
import Global from '../global'
import Shape from './shape'
import { shapeBase } from './shapeBase'



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
   * 文本相对偏移，当 labelPosition 不为 center 时有效
   * @type {Number}
   */
  offset: Global.nodeLabel.offset,
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
      return { x: 0, y: 0, text: cfg.label }
    }

    let offset = labelCfg.offset
    if (isNil(offset)) { // 考虑 offset = 0 的场景，不用用 labelCfg.offset || Global.nodeLabel.offset
      offset = this.offset // 不居中时的偏移量
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
    style.text = cfg.label
    return style
  },
  drawShape(cfg: NodeConfig, group: GGroup): IShape {
    const shapeType = this.shapeType // || this.type，都已经加了 shapeType
    const style = this.getShapeStyle(cfg)
    const shape = group.addShape(shapeType, {
      attrs: style,
      draggable: true,
      name: 'node-shape'
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

    const markLeft = group.find(element => element.get('className') === 'link-point-left')
    const markRight= group.find(element => element.get('className') === 'link-point-right')
    const markTop = group.find(element => element.get('className') === 'link-point-top')
    const markBottom = group.find(element => element.get('className') === 'link-point-bottom')

    let currentLinkPoints;
    if (markLeft) {
      currentLinkPoints = markLeft.attr();
    }
    if (markRight && !currentLinkPoints) {
      currentLinkPoints = markRight.attr();
    }
    if (markTop && !currentLinkPoints) {
      currentLinkPoints = markTop.attr();
    }
    if (markBottom && !currentLinkPoints) {
      currentLinkPoints = markBottom.attr();
    }
    if (!currentLinkPoints) currentLinkPoints = defaultLinkPoints;

    const linkPoints = deepMix({}, currentLinkPoints, cfg.linkPoints);

    const { fill: markFill, stroke: markStroke, lineWidth: borderWidth } = linkPoints;
    let markSize = linkPoints.size / 2;
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
          ...styles,
          x: -width / 2,
          y: 0
        });
      }
    } else if (left) {
      group.addShape('circle', {
        attrs: {
          ...styles,
          x: -width / 2,
          y: 0
        },
        className: 'link-point-left',
        name: 'link-point-left',
        isAnchorPoint: true
      });
    }

    if (markRight) {
      if (!right && right !== undefined) {
        markRight.remove();
      }
      markRight.attr({
        ...styles,
        x: width / 2,
        y: 0
      });
    } else if (right) {
      group.addShape('circle', {
        attrs: {
          ...styles,
          x: width / 2,
          y: 0
        },
        className: 'link-point-right',
        name: 'link-point-right',
        isAnchorPoint: true
      });
    }

    if (markTop) {
      if (!top && top !== undefined) {
        markTop.remove();
      }
      markTop.attr({
        ...styles,
        x: 0,
        y: -height / 2
      });
    } else if (top) {
      group.addShape('circle', {
        attrs: {
          ...styles,
          x: 0,
          y: -height / 2
        },
        className: 'link-point-top',
        name: 'link-point-top',
        isAnchorPoint: true
      });
    }

    if (markBottom) {
      if (!bottom && bottom !== undefined) {
        markBottom.remove();
      } else {
        markBottom.attr({
          ...styles,
          x: 0,
          y: height / 2
        });
      }
    } else if (bottom) {
      group.addShape('circle', {
        attrs: {
          ...styles,
          x: 0,
          y: height / 2
        },
        className: 'link-point-bottom',
        name: 'link-point-bottom',
        isAnchorPoint: true
      });
    }
  },
  updateShape(cfg: NodeConfig, item: Item, keyShapeStyle: object, hasIcon: boolean) {
    const keyShape = item.get('keyShape');
    keyShape.attr({
      ...keyShapeStyle
    });

    this.updateLabel(cfg, item);
    // special for some types of nodes
    hasIcon && this.updateIcon(cfg, item);
  },
  updateIcon(cfg, item) {
    const group = item.getContainer();
    const { icon: defaultIcon } = this.options;
    const icon = deepMix({}, defaultIcon, cfg.icon);
    const { show } = cfg.icon ? cfg.icon : { show: undefined };
    const iconShape = group.find(element => element.get('className') === `${this.type}-icon`)
    if (iconShape) { // 若原先存在 icon
      if (show || show === undefined) { // 若传入 show: true, 或没有设置，则更新原有的 icon 样式
        const iconConfig = deepMix({}, defaultIcon, iconShape.attr(), cfg.icon);
        const { width: w, height: h } = iconConfig;
        iconShape.attr({
          ...iconConfig,
          x: -w / 2,
          y: -h / 2
        });
      } else { // 若传入了 show: false 则删除原先的 icon
        iconShape.remove();
      }
    } else if (show) { // 如果原先不存在 icon，但传入了 show: true，则新增 icon
      const { width: w, height: h } = icon;
      group.addShape('image', {
        attrs: {
          ...icon,
          x: -w / 2,
          y: -h / 2,
        },
        className: `${this.type}-icon`,
        name: `${this.type}-icon`
      });
      // to ensure the label is on the top of all the shapes
      const labelShape = group.find(element => element.get('className') === `node-label`)
      if (labelShape) {
        labelShape.toFront();
      }
    }
  }
}

const singleNodeDef = Object.assign({}, shapeBase, singleNode)
Shape.registerNode('single-node', singleNodeDef)