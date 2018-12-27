/**
 * @fileOverview 自定义节点和边的过程中，发现大量重复代码
 * @author dxq613@gmail.com
 */
const Global = require('../global');
const Util = require('../util/index');

const CLS_SHAPE_SUFFIX = '-shape';
const CLS_LABEL_SUFFIX = '-label';
const STYLE_STATE_SUFFIX = '-state-style';
const GLOBAL_STATE_STYLE_SUFFIX = 'StateStyle';
const NAME_STYLE = 'Style'; // cache 缓存的状态属性的名字


// 根据指定的属性获取图形当前的属性
function getCurrentStyle(shape, style) {
  const rst = {};
  Util.each(style, (v, k) => {
    rst[k] = shape.attr(k);
  });
  return rst;
}

// 单个 shape 带有一个 label，共用这段代码
const SingleShape = {
  itemType: '', // node, edge, group, anchor 等
	/**
	 * 绘制节点/边，包含文本
	 * @override
	 * @param  {Object} cfg 节点的配置项
	 * @param  {G.Group} group 节点的容器
	 * @return {G.Shape} 绘制的图形
	 */
  draw(cfg, group) {
    const shape = this.drawShape(cfg, group);
    if (cfg.label) {
      this.drawLabel(cfg, group);
    }
    return shape;
  },
  drawShape(/* cfg, group */) {

  },
  drawLabel(cfg, group) {
    const labelCfg = cfg.labelCfg || {};
    const labelStyle = this.getLabelStyle(cfg, labelCfg, group);
    const label = group.addShape('text', {
      className: this.itemType + CLS_LABEL_SUFFIX,
      attrs: labelStyle
    });
    return label;
  },
  getLabelStyleByPosition(/* cfg, labelCfg, group */) {

  },
  /**
	 * 获取文本的配置项
	 * @internal 用户创建和更新节点/边时，同时会更新文本
	 * @param  {Object} cfg 节点的配置项
	 * @param {G.Group} group 父容器，label 的定位可能与图形相关
	 * @return {Object} 图形的配置项
	 */
  getLabelStyle(cfg, labelCfg, group) {
    const calculateStyle = this.getLabelStyleByPosition(cfg, labelCfg, group);
    calculateStyle.text = cfg.label;
    const attrName = this.itemType + 'Label'; // 取 nodeLabel，edgeLabel 的配置项
    const defaultStyle = Global[attrName] ? Global[attrName].style : null;
    const labelStyle = Util.mix({}, defaultStyle, calculateStyle, labelCfg.style);
    return labelStyle;
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
	/**
	 * 更新节点，包含文本
	 * @override
	 * @param  {Object} cfg 节点/边的配置项
	 * @param  {G6.Item} item 节点/边
	 */
  update(cfg, item) {
    const group = item.getContainer();
    const shapeClassName = this.itemType + CLS_SHAPE_SUFFIX;
    const shape = group.findByClassName(shapeClassName);
    const shapeStyle = this.getShapeStyle(cfg);
    shape.attr(shapeStyle);
    const labelClassName = this.itemType + CLS_LABEL_SUFFIX;
    const label = group.findByClassName(labelClassName);
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
        const labelCfg = cfg.labelCfg || {};
        const labelStyle = this.getLabelStyle(cfg, labelCfg, group);
        label.attr(labelStyle);
      }
    }
  },
  getStateStyle(name, item) {
    const itemType = this.itemType;
    const defaultStyle = Global[itemType + GLOBAL_STATE_STYLE_SUFFIX][name]; // Global.nodeStateStyle
    const fieldName = name + NAME_STYLE; // 状态名 + style（activeStyle) 存储在 item 中，如果 item 中不存在这些信息，则使用默认的样式
    const style = Util.mix({}, defaultStyle, item.get(fieldName));
    return style;
  },
	/**
	 * 设置节点的状态，主要是交互状态，业务状态请在 draw 方法中实现
	 * 单图形的节点仅考虑 selected、active 状态，有其他状态需求的用户自己复写这个方法
	 * @override
	 * @param  {String} name 状态名称
	 * @param  {Object} value 状态值
	 * @param  {G6.Item} item 节点
	 */
  setState(name, value, item) {
    const group = item.getContainer();
    const shapeClassName = this.itemType + CLS_SHAPE_SUFFIX;
    const shape = group.findByClassName(shapeClassName);
    const cacheName = name + STYLE_STATE_SUFFIX;

    if (value) { // 如果设置状态
      const style = this.getStateStyle(name, item);
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
};

module.exports = SingleShape;
