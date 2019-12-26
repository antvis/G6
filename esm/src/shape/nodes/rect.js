import { __assign, __rest } from "tslib";
import deepMix from '@antv/util/lib/deep-mix';
import Global from '../../global';
import Shape from '../shape';
Shape.registerNode('rect', {
    // 自定义节点时的配置
    options: {
        size: [100, 30],
        style: {
            radius: 0,
            stroke: Global.defaultShapeStrokeColor,
            fill: Global.defaultShapeFillColor,
            lineWidth: 1,
            fillOpacity: 1
        },
        // 文本样式配置
        labelCfg: {
            style: {
                fill: '#595959',
                fontSize: 12
            }
        },
        // 节点上左右上下四个方向上的链接circle配置
        linkPoints: {
            top: false,
            right: false,
            bottom: false,
            left: false,
            // circle的大小
            size: 3,
            lineWidth: 1,
            fill: '#72CC4A',
            stroke: '#72CC4A'
        },
        // 连接点，默认为左右
        anchorPoints: [{ x: 0, y: 0.5 }, { x: 1, y: 0.5 }]
    },
    shapeType: 'rect',
    labelPosition: 'center',
    drawShape: function (cfg, group) {
        var style = this.getShapeStyle(cfg);
        var keyShape = group.addShape('rect', {
            attrs: style,
            className: 'rect-keyShape'
        });
        this.drawLinkPoints(cfg, group);
        return keyShape;
    },
    /**
     * 绘制节点上的LinkPoints
     * @param {Object} cfg data数据配置项
     * @param {Group} group Group实例
     */
    drawLinkPoints: function (cfg, group) {
        var defaultLinkPoints = this.options.linkPoints;
        var linkPoints = deepMix({}, defaultLinkPoints, cfg.linkPoints);
        var top = linkPoints.top, left = linkPoints.left, right = linkPoints.right, bottom = linkPoints.bottom, markSize = linkPoints.size, markStyle = __rest(linkPoints, ["top", "left", "right", "bottom", "size"]);
        var size = this.getSize(cfg);
        var width = size[0];
        var height = size[1];
        if (left) {
            // left circle
            group.addShape('circle', {
                attrs: __assign(__assign({}, markStyle), { x: -width / 2, y: 0, r: markSize }),
                className: 'rect-mark-left',
                isAnchorPoint: true
            });
        }
        if (right) {
            // right circle
            group.addShape('circle', {
                attrs: __assign(__assign({}, markStyle), { x: width / 2, y: 0, r: markSize }),
                className: 'rect-mark-right',
                isAnchorPoint: true
            });
        }
        if (top) {
            // top circle
            group.addShape('circle', {
                attrs: __assign(__assign({}, markStyle), { x: 0, y: -height / 2, r: markSize }),
                className: 'rect-mark-top',
                isAnchorPoint: true
            });
        }
        if (bottom) {
            // bottom circle
            group.addShape('circle', {
                attrs: __assign(__assign({}, markStyle), { x: 0, y: height / 2, r: markSize }),
                className: 'rect-mark-bottom',
                isAnchorPoint: true
            });
        }
    },
    /**
     * 获取节点的样式，供基于该节点自定义时使用
     * @param {Object} cfg 节点数据模型
     * @return {Object} 节点的样式
     */
    getShapeStyle: function (cfg) {
        var defaultStyle = this.options.style;
        var strokeStyle = {
            stroke: cfg.color
        };
        // 如果设置了color，则覆盖默认的stroke属性
        var style = deepMix({}, defaultStyle, strokeStyle, cfg.style);
        var size = this.getSize(cfg);
        var width = size[0];
        var height = size[1];
        var styles = Object.assign({}, {
            x: -width / 2,
            y: -height / 2,
            width: width,
            height: height
        }, style);
        return styles;
    },
    update: function (cfg, item) {
        var _a = this.options, defaultStyle = _a.style, defaultLabelCfg = _a.labelCfg;
        var style = deepMix({}, defaultStyle, cfg.style);
        var size = this.getSize(cfg);
        var width = size[0];
        var height = size[1];
        var keyShape = item.get('keyShape');
        keyShape.attr(__assign({ x: -width / 2, y: -height / 2, width: width,
            height: height }, style));
        var group = item.getContainer();
        var labelCfg = deepMix({}, defaultLabelCfg, cfg.labelCfg);
        var labelStyle = this.getLabelStyle(cfg, labelCfg, group);
        var text = group.find(function (element) { return element.get('className') === 'node-label'; });
        if (text) {
            text.attr(__assign({}, labelStyle));
        }
        this.updateLinkPoints(cfg, group);
    },
    /**
     * 更新linkPoints
     * @param {Object} cfg 节点数据配置项
     * @param {Group} group Item所在的group
     */
    updateLinkPoints: function (cfg, group) {
        var defaultLinkPoints = this.options.linkPoints;
        var linkPoints = deepMix({}, defaultLinkPoints, cfg.linkPoints);
        var markSize = linkPoints.size, markFill = linkPoints.fill, markStroke = linkPoints.stroke, borderWidth = linkPoints.lineWidth;
        var size = this.getSize(cfg);
        var width = size[0];
        var height = size[1];
        var markLeft = group.find(function (element) { return element.get('className') === 'rect-mark-left'; });
        if (markLeft) {
            markLeft.attr({
                x: -width / 2,
                y: 0,
                r: markSize,
                fill: markFill,
                stroke: markStroke,
                lineWidth: borderWidth
            });
        }
        var markRight = group.find(function (element) { return element.get('className') === 'rect-mark-right'; });
        if (markRight) {
            markRight.attr({
                x: width / 2,
                y: 0,
                r: markSize,
                fill: markFill,
                stroke: markStroke,
                lineWidth: borderWidth
            });
        }
        var markTop = group.find(function (element) { return element.get('className') === 'rect-mark-top'; });
        if (markTop) {
            markTop.attr({
                x: 0,
                y: -height / 2,
                r: markSize,
                fill: markFill,
                stroke: markStroke,
                lineWidth: borderWidth
            });
        }
        var markBottom = group.find(function (element) { return element.get('className') === 'rect-mark-bottom'; });
        if (markBottom) {
            markBottom.attr({
                x: 0,
                y: height / 2,
                r: markSize,
                fill: markFill,
                stroke: markStroke,
                lineWidth: borderWidth
            });
        }
    }
}, 'single-node');
//# sourceMappingURL=rect.js.map