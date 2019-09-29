/**
 * @fileOverview common node shape
 * @author huangtonger@aliyun.com
 */

const Shape = require('./shape');
const Util = require('../util/index');
const Global = require('../global');
const SingleShapeMixin = require('./single-shape-mixin');

// 注册 Node 的工厂方法
Shape.registerFactory('node', {
  defaultShapeType: 'circle'
});

const singleNodeDefinition = Util.mix({}, SingleShapeMixin, {
  itemType: 'node',
  // 单个图形的类型
  shapeType: '',
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
  getSize(cfg) {
    const customOptions = this.getCustomConfig(cfg) || {};
    let size = cfg.size || customOptions.size || this.options.size || Global.defaultNode.size;
    if (!Util.isArray(size)) {
      size = [ size, size ];
    }
    return size;
  },
  // 私有方法，不希望扩展的节点复写这个方法
  getLabelStyleByPosition(cfg, labelCfg) {
    const labelPosition = labelCfg.position || this.labelPosition;
    // 默认的位置（最可能的情形），所以放在最上面
    if (labelPosition === 'center') {
      return { x: 0, y: 0 };
    }
    const size = this.getSize(cfg);
    const width = size[0];
    const height = size[1];
    let offset = labelCfg.offset;
    if (Util.isNil(offset)) { // 考虑 offset = 0 的场景，不用用 labelCfg.offset || Global.nodeLabel.offset
      offset = Global.nodeLabel.offset; // 不居中时的偏移量
    }
    let style;
    switch (labelPosition) {
      case 'top':
        style = {
          x: 0,
          y: 0 - height / 2 - offset,
          textBaseline: 'bottom' // 文本在图形的上面
        };
        break;
      case 'bottom':
        style = {
          x: 0,
          y: height / 2 + offset,
          textBaseline: 'top'
        };
        break;
      case 'left':
        style = {
          x: 0 - width / 2 - offset,
          y: 0,
          textAlign: 'right'
        };
        break;
      default:
        style = {
          x: width / 2 + offset,
          y: 0,
          textAlign: 'left'
        };
        break;
    }
    return style;
  },
  drawShape(cfg, group) {
    const shapeType = this.shapeType; // || this.type，都已经加了 shapeType
    const style = this.getShapeStyle(cfg);
    const shape = group.addShape(shapeType, {
      attrs: style
    });
    return shape;
  }
});
// 单个图形的基础，可以有 label，默认 label 居中
Shape.registerNode('single-shape', singleNodeDefinition);

/**
 * 基本的图片，可以添加文本，默认文本在图片的下面
 */
Shape.registerNode('image', {
  shapeType: 'image',
  labelPosition: 'bottom',
  getShapeStyle(cfg) {
    const size = this.getSize(cfg);
    const img = cfg.img;
    const width = size[0];
    const height = size[1];
    const style = Util.mix({}, {
      x: 0 - width / 2, // 节点的位置在上层确定，所以这里仅使用相对位置即可
      y: 0 - height / 2,
      width,
      height,
      img
    }, cfg.style);
    return style;
  }
}, 'single-shape');

