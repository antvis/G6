/**
 * @fileOverview common node shape
 * @author huangtonger@aliyun.com
 */

const Shape = require('./shape');
const Text = require('@antv/g/lib').Text;
const Dom = require('@antv/g/lib').Dom;
const Util = require('../util/index');
const Global = require('../global');
const SingleShapeMixin = require('./single-shape-mixin');
const { CLS_LABEL_SUFFIX, CLS_SHAPE_SUFFIX } = require('../const');
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
    let size = cfg.size || Global.defaultNode.size;
    if (!Util.isArray(size)) {
      size = [ size, size ];
    }
    return size;
  },

  draw(cfg, group, graph) {
    let label;
    if (cfg.label) {
      label = this.createLabel(cfg, group, graph);
      if (cfg.fitLabel && (this.getLabelPosition(cfg) === 'center')) {
        const [ width, height ] = cfg.labelSize;
        const padding = cfg.labelCfg.padding;
        cfg.size = [ width + padding[1] + padding[3], height + padding[0] + padding[2] ];
      }
      label.set('className', this.itemType + CLS_LABEL_SUFFIX);
    }
    const shape = this.drawShape(cfg, group);
    shape.set('className', this.itemType + CLS_SHAPE_SUFFIX);
    if (cfg.label) {
      this.drawLabel(cfg, group, label);
      this.layoutLabel(cfg, group, label);
    }
    return shape;
  },

  createLabel(cfg, group, graph) {
    const labelCfg = cfg.labelCfg || {};
    cfg.labelCfg = labelCfg;
    const labelStyle = this.getLabelStyle(cfg, labelCfg, group, false);

    let label,
      textBBox;
    if (labelCfg.type !== 'html') {
      label = new Text({ attrs: labelStyle });
      textBBox = label.getBBox();
    } else {
      const labelDiv = Util.createDom(labelStyle.text);
      textBBox = graph.testHtmlLabelSize(labelDiv, labelStyle);
      const { width, height } = textBBox;
      label = new Dom({ attrs: { ...labelStyle, html: labelDiv, width, height } });
    }

    const labelSize = [ textBBox.width, textBBox.height ];
    if (cfg.fitLabel && (this.getLabelPosition(cfg) === 'center')) {
      let padding = labelCfg.padding || 0;
      if (!Array.isArray(padding)) {
        padding = new Array(4).fill(+padding);
      }
      if (padding.length === 2) {
        padding = padding.concat(padding);
      } else if (padding.length === 3) {
        padding = padding.push(padding[1]);
      } else if (padding.length === 1) {
        padding = new Array(4).fill(+padding[0]);
      }
      labelCfg.padding = padding;
    }
    cfg.labelSize = labelSize;
    return label;
  },


  layoutLabel(cfg, group, label) {
    const positionStyle = this.getLabelStyleByPosition(cfg, cfg.labelCfg, group);
    label.attr(positionStyle);
  },

  drawLabel(cfg, group, label) {
    label = label || this.createLabel(cfg);
    group.add(label);
    return label;
  },


  getLabelPosition(cfg) {
    return (cfg && cfg.labelCfg && cfg.labelCfg.position) || this.labelPosition;
  },

  // 私有方法，不希望扩展的节点复写这个方法
  getLabelStyleByPosition(cfg, labelCfg) {
    const labelPosition = this.getLabelPosition(cfg);
    const labelPadding = labelCfg.padding || [ 0, 0, 0, 0 ];
    const size = this.getSize(cfg);
    const width = size[0];
    const height = size[1];
    const labelSize = cfg.labelSize;
    const [ labelWidth, labelHeight ] = labelSize;
    const isHtmlLabel = labelCfg.type === 'html';
    // 默认的位置（最可能的情形），所以放在最上面
    if (labelPosition === 'center') { // labelType为 html 时，foreignObject的原点（0，0）在 node 的中心点，需要进行额外的平移
      const x = (labelPadding[3] - labelPadding[1]) / 2 - (isHtmlLabel ? labelWidth / 2 : 0);
      const y = (labelPadding[0] - labelPadding[2]) / 2 - (isHtmlLabel ? labelHeight / 2 : 0);
      return { x, y };
    }
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
  },

  update(cfg, item) {
    const group = item.getContainer();
    const labelClassName = this.itemType + CLS_LABEL_SUFFIX;
    const label = group.findByClassName(labelClassName);
    // 考虑到节点大小可能需要适应 label，首先更新 label，再更新节点
    if (!cfg.label) {
      label && label.remove();
    } else {
      if (!label) {
        const newLabel = this.drawLabel(cfg, group);
        newLabel.set('className', labelClassName);
      } else {
        const labelCfg = cfg.labelCfg || {};
        const labelStyle = this.getLabelStyle(cfg, labelCfg, group);
        /**
         * fixme g中shape的rotate是角度累加的，不是label的rotate想要的角度
         * 由于现在label只有rotate操作，所以在更新label的时候如果style中有rotate就重置一下变换
         * 后续会基于g的Text复写一个Label出来处理这一类问题
         */
        label.resetMatrix();
        label.attr(labelStyle);
      }
    }
    const shapeClassName = this.itemType + CLS_SHAPE_SUFFIX;
    const shape = group.findByClassName(shapeClassName);
    const shapeStyle = this.getShapeStyle(cfg);
    shape.attr(shapeStyle);
  }
});
// 单个图形的基础，可以有 label，默认 label 居中
Shape.registerNode('single-shape', singleNodeDefinition);

/**
 * 基本的圆，可以添加文本，默认文本居中
 */
Shape.registerNode('circle', {
  shapeType: 'circle',
  getShapeStyle(cfg) {
    const size = this.getSize(cfg);
    const color = cfg.color || Global.defaultNode.color;
    const style = Util.mix({}, {
      x: 0, // 节点的位置在上层确定，所以这里仅使用相对位置即可
      y: 0,
      r: size[0] / 2, // size 一般可以提供宽高信息
      stroke: color
    }, Global.defaultNode.style, cfg.style);
    return style;
  }
}, 'single-shape');

/**
 * 基本的椭圆，可以添加文本，默认文本居中
 */
Shape.registerNode('ellipse', {
  shapeType: 'ellipse',
  getShapeStyle(cfg) {
    const size = this.getSize(cfg);
    const rx = size[0] / 2;
    const ry = size[1] / 2;
    const color = cfg.color || Global.defaultNode.color;
    const style = Util.mix({}, {
      x: 0, // 节点的位置在上层确定，所以这里仅使用相对位置即可
      y: 0,
      rx, // size 一般可以提供宽高信息
      ry,
      stroke: color
    }, Global.defaultNode.style, cfg.style);
    return style;
  }
}, 'single-shape');

/**
 * 基本的矩形，可以添加文本，默认文本居中
 */
Shape.registerNode('rect', {
  shapeType: 'rect',
  getShapeStyle(cfg) {
    const size = this.getSize(cfg);
    const width = size[0];
    const height = size[1];
    const color = cfg.color || Global.defaultNode.color;
    const style = Util.mix({}, Global.defaultNode.style, {
      x: 0 - width / 2, // 节点的位置在上层确定，所以这里仅使用相对位置即可
      y: 0 - height / 2,
      width,
      height,
      stroke: color
    }, cfg.style);
    return style;
  }
}, 'single-shape');

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

