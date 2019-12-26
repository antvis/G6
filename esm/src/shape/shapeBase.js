import each from '@antv/util/lib/each';
import { cloneDeep, get, merge } from 'lodash';
import Global from '../global';
var CLS_SHAPE_SUFFIX = '-shape';
var CLS_LABEL_SUFFIX = '-label';
// 单个 shape 带有一个 label，共用这段代码
export var shapeBase = {
    // 默认样式及配置
    options: {},
    itemType: '',
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
    draw: function (cfg, group) {
        var shape = this.drawShape(cfg, group);
        shape.set('className', this.itemType + CLS_SHAPE_SUFFIX);
        if (cfg.label) {
            var label = this.drawLabel(cfg, group);
            label.set('className', this.itemType + CLS_LABEL_SUFFIX);
        }
        return shape;
    },
    /**
     * 绘制完成后的操作，便于用户继承现有的节点、边
     * @param cfg
     * @param group
     * @param keyShape
     */
    afterDraw: function (cfg, group, keyShape) {
    },
    drawShape: function (cfg, group) {
        return null;
    },
    drawLabel: function (cfg, group) {
        var defaultLabelCfg = this.options.labelCfg;
        var labelCfg = merge({}, defaultLabelCfg, cfg.labelCfg);
        var labelStyle = this.getLabelStyle(cfg, labelCfg, group);
        var label = group.addShape('text', {
            attrs: labelStyle
        });
        return label;
    },
    getLabelStyleByPosition: function (cfg, labelCfg, group) {
        return {};
    },
    /**
     * 获取文本的配置项
     * @param cfg 节点的配置项
     * @param labelCfg 文本的配置项
     * @param group 父容器，label 的定位可能与图形相关
     */
    getLabelStyle: function (cfg, labelCfg, group) {
        var calculateStyle = this.getLabelStyleByPosition(cfg, labelCfg, group);
        calculateStyle.text = cfg.label;
        var attrName = this.itemType + 'Label'; // 取 nodeLabel，edgeLabel 的配置项
        var defaultStyle = Global[attrName] ? Global[attrName].style : null;
        var labelStyle = Object.assign({}, defaultStyle, calculateStyle, labelCfg.style);
        return labelStyle;
    },
    /**
     * 获取图形的配置项
     * @param cfg
     */
    getShapeStyle: function (cfg) {
        return cfg.style;
    },
    /**
     * 更新节点，包含文本
     * @override
     * @param  {Object} cfg 节点/边的配置项
     * @param  {G6.Item} item 节点/边
     */
    update: function (cfg, item) {
        var group = item.getContainer();
        var shapeClassName = this.itemType + CLS_SHAPE_SUFFIX;
        var shape = group.find(function (element) { return element.get('className') === shapeClassName; });
        var shapeStyle = this.getShapeStyle(cfg);
        shape && shape.attr(shapeStyle);
        var labelClassName = this.itemType + CLS_LABEL_SUFFIX;
        var label = group.find(function (element) { return element.get('className') === labelClassName; });
        // 此时需要考虑之前是否绘制了 label 的场景存在三种情况
        // 1. 更新时不需要 label，但是原先存在 label，此时需要删除
        // 2. 更新时需要 label, 但是原先不存在，创建节点
        // 3. 如果两者都存在，更新
        if (!cfg.label) {
            label && label.remove();
        }
        else {
            if (!label) {
                var newLabel = this.drawLabel(cfg, group);
                newLabel.set('className', labelClassName);
            }
            else {
                var labelCfg = cfg.labelCfg || {};
                var labelStyle = this.getLabelStyle(cfg, labelCfg, group);
                /**
                 * fixme g中shape的rotate是角度累加的，不是label的rotate想要的角度
                 * 由于现在label只有rotate操作，所以在更新label的时候如果style中有rotate就重置一下变换
                 * 后续会基于g的Text复写一个Label出来处理这一类问题
                 */
                label.resetMatrix();
                label.attr(labelStyle);
            }
        }
    },
    // update(cfg, item) // 默认不定义
    afterUpdate: function (cfg, item) {
    },
    /**
     * 设置节点的状态，主要是交互状态，业务状态请在 draw 方法中实现
     * 单图形的节点仅考虑 selected、active 状态，有其他状态需求的用户自己复写这个方法
     * @override
     * @param  {String} name 状态名称
     * @param  {String | Boolean} value 状态值
     * @param  {G6.Item} item 节点
     */
    setState: function (name, value, item) {
        var shape = item.get('keyShape');
        if (!shape) {
            return;
        }
        var itemStateStyle = item.getStateStyle(name);
        var stateStyle = this.getStateStyle(name, value, item);
        var styles = merge({}, stateStyle, itemStateStyle);
        if (value) { // 如果设置状态,在原本状态上叠加绘图属性
            shape.attr(styles);
        }
        else { // 取消状态时重置所有状态，依次叠加仍有的状态
            var style_1 = item.getCurrentStatesStyle();
            // 如果默认状态下没有设置attr，在某状态下设置了，需要重置到没有设置的状态
            each(styles, function (val, attr) {
                if (!style_1[attr]) {
                    style_1[attr] = null;
                }
            });
            shape.attr(style_1);
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
    getStateStyle: function (name, value, item) {
        var model = item.getModel();
        var defaultStyle = this.options.style;
        // const { style: defaultStyle, stateStyles: defaultStateStyle } = this.options
        var currentStateStyle = defaultStyle;
        // if (defaultStateStyle[name]) {
        //   currentStateStyle = defaultStateStyle[name]
        // }
        if (value) {
            return merge({}, currentStateStyle, model.style);
        }
        var states = item.getStates();
        var style = cloneDeep(defaultStyle);
        states.forEach(function (state) {
            merge(style, get(defaultStyle, state, {}), state, model.style);
        });
        return style;
    },
    /**
     * 获取控制点
     * @param  {Object} cfg 节点、边的配置项
     * @return {Array|null} 控制点的数组,如果为 null，则没有控制点
     */
    getControlPoints: function (cfg) {
        return cfg.controlPoints;
    },
    /**
     * 获取控制点
     * @param  {Object} cfg 节点、边的配置项
     * @return {Array|null} 锚点的数组,如果为 null，则没有锚点
     */
    getAnchorPoints: function (cfg) {
        var defaultAnchorPoints = this.options.anchorPoints;
        var anchorPoints = cfg.anchorPoints || defaultAnchorPoints;
        return anchorPoints;
    }
};
//# sourceMappingURL=shapeBase.js.map