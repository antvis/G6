/**
 * @fileOverview common node shape
 * @author huangtonger@aliyun.com
 */

const Shape = require('./shape');
const Util = require('../util/index');
const Global = require('../global');

const CLS_SHAPE = 'node-shape';
const CLS_LABEL = 'node-label';
const SUFFIX_STATE = '-state-style';

// 根据指定的属性获取图形当前的属性
function getCurrentStyle(shape, style) {
  const rst = {};
  Util.each(style, (v, k) => {
    rst[k] = shape.attr(k);
  });
  return rst;
}

// 注册 Node 的工厂方法
Shape.registerFactory('node', {
  defaultShapeType: 'circle'
});

// 单个图形的基础，可以有 label，默认 label 居中
Shape.registerNode('single-shape', {
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
    let size = cfg.size || Global.nodeSize;
    if (!Util.isArray(size)) {
      size = [ size, size ];
    }
    return size;
  },
	/**
	 * 获取图形的配置项
	 * @internal 仅在定义这一类节点使用，用户创建和更新节点
	 * @param  {Object} cfg 节点的配置项
	 * @return {Object} 图形的配置项
	 */
  getShapeStyle(cfg) {
    return cfg.style;
  },
	// 私有方法，不希望扩展的节点复写这个方法
  _getLabelStyleByPosition(cfg) {
    const labelPosition = cfg.labelPosition || this.labelPosition;
		// 默认的位置（最可能的情形），所以放在最上面
    if (labelPosition === 'center') {
      return { x: 0, y: 0 };
    }
    const size = this.getSize(cfg);
    const width = size[0];
    const height = size[1];
    const offset = Global.nodeLabel.offset; // 不居中时的偏移量
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
	/**
	 * 获取文本的配置项
	 * @internal 仅在定义这一类节点使用，用户创建和更新节点
	 * @param  {Object} cfg 节点的配置项
	 * @return {Object} 图形的配置项
	 */
  getLabelStyle(cfg) {
    const calculateStyle = this._getLabelStyleByPosition(cfg);
    calculateStyle.text = cfg.label;
    const labelStyle = Util.mix({}, Global.nodeLabel.style, calculateStyle, cfg.labelStyle);
    return labelStyle;
  },
  drawLabel(cfg, group) {
    const labelStyle = this.getLabelStyle(cfg);
    const label = group.addShape('text', {
      className: CLS_LABEL,
      attrs: labelStyle
    });
    return label;
  },
	/**
	 * 绘制节点，包含文本
	 * @override
	 * @param  {Object} cfg 节点的配置项
	 * @param  {G.Group} group 节点的容器
	 * @return {G.Shape} 绘制的图形
	 */
  draw(cfg, group) {
    const shapeType = this.shapeType || this.type;
    const style = this.getShapeStyle(cfg);
    const shape = group.addShape(shapeType, {
      className: CLS_SHAPE,
      attrs: style
    });
    if (cfg.label) {
      this.drawLabel(cfg, group);
    }
    return shape;
  },
	/**
	 * 更新节点，包含文本
	 * @override
	 * @param  {Object} cfg 节点的配置项
	 * @param  {G6.Node} node 节点
	 */
  update(cfg, node) {
    const group = node.getContainer();
    const shape = group.findByClassName(CLS_SHAPE);
    const shapeStyle = this.getShapeStyle(cfg);
    shape.attr(shapeStyle);
    const label = group.findByClassName(CLS_LABEL);
		// 此时需要考虑之前是否绘制了 label 的场景存在三种情况
		// 1. 更新时不需要 label，但是原先存在 label，此时需要删除
		// 2. 更新时需要 label, 但是原先不存在，创建节点
		// 3. 如果两者都存在，更新
    if (!cfg.label) {
      label && label.remove();
    } else {
      if (!label) {
        this.drawLabel(cfg, group);
      } else {
        const labelStyle = this.getLabelStyle(cfg);
        label.attr(labelStyle);
      }
    }
  },
  getStateStyle(name, node) {
    const defaultStyle = Global.nodeStateStyle[name];
    const fieldName = name + 'Style'; // 状态名 + style（activeStyle) 存储在 node 中，如果 item 中不存在这些信息，则使用默认的样式
    const style = Util.mix({}, defaultStyle, node.get(fieldName));
    return style;
  },
	/**
	 * 设置节点的状态，主要是交互状态，业务状态请在 draw 方法中实现
	 * 单图形的节点仅考虑 selected、active 状态，有其他状态需求的用户自己复写这个方法
	 * @override
	 * @param  {String} name 状态名称
	 * @param  {Object} value 状态值
	 * @param  {G6.Node} node 节点
	 */
  setState(name, value, node) {
    const group = node.getContainer();
    const shape = group.findByClassName(CLS_SHAPE);
    const cacheName = name + SUFFIX_STATE;

    if (value) { // 如果设置状态
      const style = this.getStateStyle(name, node);
      const cacheStyle = getCurrentStyle(shape, style);
      shape.attr(style);
      shape.set(cacheName, cacheStyle);
    } else { // 取消状态
      const originStyle = shape.get(cacheName);
      if (originStyle) {
        shape.attr(originStyle);
      }
    }
  }
});

/**
 * 基本的圆，可以添加文本，默认文本居中
 */
Shape.registerNode('circle', {
  shapeType: 'circle',
  getShapeStyle(cfg) {
    const size = this.getSize(cfg);
    const color = cfg.color || Global.nodeColor;
    const style = Util.mix({}, {
      x: 0, // 节点的位置在上层确定，所以这里仅使用相对位置即可
      y: 0,
      r: size[0] / 2, // size 一般可以提供宽高信息
      stroke: color,
      fill: 'white'
    }, cfg.style);
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
    const color = cfg.color || Global.nodeColor;
    const style = Util.mix({}, {
      x: 0, // 节点的位置在上层确定，所以这里仅使用相对位置即可
      y: 0,
      rx, // size 一般可以提供宽高信息
      ry,
      stroke: color,
      fill: 'white'
    }, cfg.style);
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
    const color = cfg.color || Global.nodeColor;
    const style = Util.mix({}, {
      x: 0 - width / 2, // 节点的位置在上层确定，所以这里仅使用相对位置即可
      y: 0 - height / 2,
      width,
      height,
      stroke: color,
      fill: 'white'
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
    const shape = cfg.shape;
    const img = Util.isArray(shape) ? shape[1] : shape;
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

