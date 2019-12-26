import { __assign, __rest } from "tslib";
import deepMix from '@antv/util/lib/deep-mix';
import Global from '../../global';
import Shape from '../shape';
// 带有图标的圆，可用于拓扑图中
Shape.registerNode('circle', {
    // 自定义节点时的配置
    options: {
        size: 60,
        style: {
            x: 0,
            y: 0,
            stroke: Global.defaultShapeStrokeColor,
            fill: Global.defaultShapeFillColor,
            lineWidth: 1
        },
        labelCfg: {
            style: {
                fill: '#595959'
            },
            offset: 0
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
        // 节点中icon配置
        icon: {
            // 是否显示icon，值为 false 则不渲染icon
            show: false,
            // icon的地址，字符串类型
            img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
            width: 16,
            height: 16
        }
    },
    shapeType: 'circle',
    // 文本位置
    labelPosition: 'center',
    drawShape: function (cfg, group) {
        var defaultIcon = this.options.icon;
        var style = this.getShapeStyle(cfg);
        var icon = deepMix({}, defaultIcon, cfg.icon);
        var keyShape = group.addShape('circle', {
            attrs: style
        });
        var width = icon.width, height = icon.height, show = icon.show;
        if (show) {
            var image = group.addShape('image', {
                attrs: __assign({ x: -width / 2, y: -height / 2 }, icon),
                className: 'circle-icon'
            });
            image.set('capture', false);
        }
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
        var r = size[0] / 2;
        if (left) {
            // left circle
            group.addShape('circle', {
                attrs: __assign(__assign({}, markStyle), { x: -r, y: 0, r: markSize }),
                className: 'circle-mark-left',
                isAnchorPoint: true
            });
        }
        if (right) {
            // right circle
            group.addShape('circle', {
                attrs: __assign(__assign({}, markStyle), { x: r, y: 0, r: markSize }),
                className: 'circle-mark-right',
                isAnchorPoint: true
            });
        }
        if (top) {
            // top circle
            group.addShape('circle', {
                attrs: __assign(__assign({}, markStyle), { x: 0, y: -r, r: markSize }),
                className: 'circle-mark-top',
                isAnchorPoint: true
            });
        }
        if (bottom) {
            // bottom circle
            group.addShape('circle', {
                attrs: __assign(__assign({}, markStyle), { x: 0, y: r, r: markSize }),
                className: 'circle-mark-bottom',
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
        var r = size[0] / 2;
        var styles = Object.assign({}, {
            x: 0,
            y: 0,
            r: r
        }, style);
        return styles;
    },
    update: function (cfg, item) {
        var _a = this.options, defaultStyle = _a.style, defaultIcon = _a.icon, defaultLabelCfg = _a.labelCfg;
        var style = deepMix({}, defaultStyle, cfg.style);
        var icon = deepMix({}, defaultIcon, cfg.icon);
        var size = this.getSize(cfg);
        var r = size[0] / 2;
        var group = item.getContainer();
        var keyShape = item.get('keyShape');
        keyShape.attr(__assign(__assign({}, style), { r: r }));
        var labelCfg = deepMix({}, defaultLabelCfg, cfg.labelCfg);
        var labelStyle = this.getLabelStyle(cfg, labelCfg, group);
        var text = group.find(function (element) { return element.get('className') === 'node-label'; });
        if (text) {
            text.attr(__assign({}, labelStyle));
        }
        var circleIcon = group.find(function (element) { return element.get('className') === 'circle-icon'; });
        var w = icon.width, h = icon.height;
        if (circleIcon) {
            circleIcon.attr(__assign({ x: -w / 2, y: -h / 2 }, icon));
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
        var r = size[0] / 2;
        var markLeft = group.find(function (element) { return element.get('className') === 'circle-mark-left'; });
        if (markLeft) {
            markLeft.attr({
                x: -r,
                y: 0,
                r: markSize,
                fill: markFill,
                stroke: markStroke,
                lineWidth: borderWidth
            });
        }
        var markRight = group.find(function (element) { return element.get('className') === 'circle-mark-right'; });
        if (markRight) {
            markRight.attr({
                x: r,
                y: 0,
                r: markSize,
                fill: markFill,
                stroke: markStroke,
                lineWidth: borderWidth
            });
        }
        var markTop = group.find(function (element) { return element.get('className') === 'circle-mark-top'; });
        if (markTop) {
            markTop.attr({
                x: 0,
                y: -r,
                r: markSize,
                fill: markFill,
                stroke: markStroke,
                lineWidth: borderWidth
            });
        }
        var markBottom = group.find(function (element) { return element.get('className') === 'circle-mark-bottom'; });
        if (markBottom) {
            markBottom.attr({
                x: 0,
                y: r,
                r: markSize,
                fill: markFill,
                stroke: markStroke,
                lineWidth: borderWidth
            });
        }
    }
}, 'single-node');
//# sourceMappingURL=circle.js.map